import express from 'express';
import { body, validationResult } from 'express-validator';
import Booking from '../models/Booking.js';
import Service from '../models/Service.js';
import Staff from '../models/Staff.js';
import { sendBookingConfirmation, sendBookingUpdate } from '../utils/emailService.js';
const router = express.Router();

// Get all bookings with filters
router.get('/', async (req, res) => {
  try {
    const { status, date, staffId, search, page = 1, limit = 50 } = req.query;
    
    let query = {};
    
    // Apply filters
    if (status && status !== 'all') {
      query.status = status;
    }
    
    if (date && date !== 'all') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      switch (date) {
        case 'today':
          query.date = {
            $gte: today,
            $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
          };
          break;
        case 'upcoming':
          query.date = { $gte: today };
          break;
        case 'past':
          query.date = { $lt: today };
          break;
      }
    }
    
    if (staffId) {
      query.staffId = staffId;
    }
    
    if (search) {
      query.$or = [
        { customerName: { $regex: search, $options: 'i' } },
        { customerEmail: { $regex: search, $options: 'i' } },
        { customerPhone: { $regex: search, $options: 'i' } }
      ];
    }
    
    const bookings = await Booking.find(query)
      .populate('serviceId', 'name price duration category')
      .populate('staffId', 'name title')
      .sort({ date: 1, time: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Booking.countDocuments(query);
    
    res.json({
      bookings,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
});

// Get booking statistics
router.get('/stats', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const stats = await Promise.all([
      Booking.countDocuments(),
      Booking.countDocuments({ status: 'pending' }),
      Booking.countDocuments({ status: 'confirmed' }),
      Booking.countDocuments({ 
        date: {
          $gte: today,
          $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
        }
      }),
      Booking.aggregate([
        { $match: { status: { $in: ['confirmed', 'completed'] } } },
        { $group: { _id: null, total: { $sum: '$totalPrice' } } }
      ])
    ]);
    
    res.json({
      totalBookings: stats[0],
      pendingBookings: stats[1],
      confirmedBookings: stats[2],
      todayBookings: stats[3],
      revenue: stats[4][0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats', error: error.message });
  }
});

// Create new booking
router.post('/', [
  body('serviceId').notEmpty().withMessage('Service is required'),
  body('staffId').notEmpty().withMessage('Staff is required'),
  body('customerName').trim().notEmpty().withMessage('Customer name is required'),
  body('customerEmail').isEmail().withMessage('Valid email is required'),
  body('customerPhone').notEmpty().withMessage('Phone number is required'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('time').notEmpty().withMessage('Time is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { serviceId, staffId, customerName, customerEmail, customerPhone, date, time, notes } = req.body;
    
    // Verify service and staff exist
    const [service, staff] = await Promise.all([
      Service.findById(serviceId),
      Staff.findById(staffId)
    ]);
    
    if (!service || !staff) {
      return res.status(404).json({ message: 'Service or staff not found' });
    }
    
    // Check for conflicts
    const existingBooking = await Booking.findOne({
      staffId,
      date: new Date(date),
      time,
      status: { $in: ['pending', 'confirmed'] }
    });
    
    if (existingBooking) {
      return res.status(409).json({ message: 'Time slot already booked' });
    }
    
    // Create booking
    const booking = new Booking({
      serviceId,
      staffId,
      customerName,
      customerEmail,
      customerPhone,
      date: new Date(date),
      time,
      notes,
      totalPrice: service.price
    });
    
    await booking.save();
    
    // Populate the booking for response
    await booking.populate('serviceId staffId');
    
    // Send confirmation email
    try {
      await sendBookingConfirmation(booking);
      booking.confirmationSent = true;
      await booking.save();
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }
    
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
});

// Update booking
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const booking = await Booking.findByIdAndUpdate(
      id,
      { ...updates, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).populate('serviceId staffId');
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Send update email if status changed
    if (updates.status && ['confirmed', 'cancelled'].includes(updates.status)) {
      try {
        await sendBookingUpdate(booking);
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
      }
    }
    
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking', error: error.message });
  }
});

// Delete booking
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const booking = await Booking.findByIdAndDelete(id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting booking', error: error.message });
  }
});

// Get available time slots
router.get('/available-slots/:staffId/:date', async (req, res) => {
  try {
    const { staffId, date } = req.params;
    const { duration = 60 } = req.query;
    
    const staff = await Staff.findById(staffId);
    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }
    
    const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const workingHours = staff.workingHours[dayOfWeek];
    
    if (!workingHours.isWorking) {
      return res.json([]);
    }
    
    // Get existing bookings for this staff on this date
    const existingBookings = await Booking.find({
      staffId,
      date: new Date(date),
      status: { $in: ['pending', 'confirmed'] }
    });
    
    // Generate time slots
    const slots = [];
    const [startHour, startMinute] = workingHours.start.split(':').map(Number);
    const [endHour, endMinute] = workingHours.end.split(':').map(Number);
    
    const startTime = startHour * 60 + startMinute;
    const endTime = endHour * 60 + endMinute;
    
    for (let time = startTime; time <= endTime - duration; time += 30) {
      const hours = Math.floor(time / 60);
      const minutes = time % 60;
      const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      
      // Check if this slot conflicts with existing bookings
      const isBooked = existingBookings.some(booking => {
        const [bookingHour, bookingMinute] = booking.time.split(':').map(Number);
        const bookingStartTime = bookingHour * 60 + bookingMinute;
        const bookingEndTime = bookingStartTime + 60; // Assume 60 min duration
        
        return (time >= bookingStartTime && time < bookingEndTime) || 
               (time + duration > bookingStartTime && time < bookingStartTime);
      });
      
      // Skip past times for today
      const now = new Date();
      const today = now.toISOString().split('T')[0];
      const currentTime = now.getHours() * 60 + now.getMinutes();
      const isPastTime = date === today && time <= currentTime;
      
      if (!isBooked && !isPastTime) {
        slots.push({
          time: timeString,
          available: true,
          staffId
        });
      }
    }
    
    res.json(slots);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching available slots', error: error.message });
  }
});

export default router;