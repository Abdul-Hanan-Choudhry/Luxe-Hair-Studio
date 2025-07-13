import express from 'express';
import { body, validationResult } from 'express-validator';
import { sendBookingConfirmation, sendBookingUpdate } from '../utils/emailService.js';
const router = express.Router();

// Helper to convert string to ObjectId
import { ObjectId } from 'mongodb';

// Get all bookings with filters
router.get('/', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const { status, date, staffId, search, page = 1, limit = 50 } = req.query;
    let query = {};
    // Apply filters
    if (status && status !== 'all') query.status = status;
    if (date && date !== 'all') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      switch (date) {
        case 'today':
          query.date = { $gte: today, $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) };
          break;
        case 'upcoming':
          query.date = { $gte: today };
          break;
        case 'past':
          query.date = { $lt: today };
          break;
      }
    }
    if (staffId) query.staffId = staffId;
    if (search) {
      query.$or = [
        { customerName: { $regex: search, $options: 'i' } },
        { customerEmail: { $regex: search, $options: 'i' } },
        { customerPhone: { $regex: search, $options: 'i' } }
      ];
    }
    const bookings = await db.collection('bookings')
      .find(query)
      .sort({ date: 1, time: 1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .toArray();
    const total = await db.collection('bookings').countDocuments(query);
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
    const db = req.app.locals.db;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [totalBookings, pendingBookings, confirmedBookings, todayBookings, revenueAgg] = await Promise.all([
      db.collection('bookings').countDocuments(),
      db.collection('bookings').countDocuments({ status: 'pending' }),
      db.collection('bookings').countDocuments({ status: 'confirmed' }),
      db.collection('bookings').countDocuments({ date: { $gte: today, $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) } }),
      db.collection('bookings').aggregate([
        { $match: { status: { $in: ['confirmed', 'completed'] } } },
        { $group: { _id: null, total: { $sum: '$totalPrice' } } }
      ]).toArray()
    ]);
    res.json({
      totalBookings,
      pendingBookings,
      confirmedBookings,
      todayBookings,
      revenue: revenueAgg[0]?.total || 0
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
    const db = req.app.locals.db;
    const { serviceId, staffId, customerName, customerEmail, customerPhone, date, time, notes } = req.body;
    // Verify service and staff exist
    const [service, staff] = await Promise.all([
      db.collection('services').findOne({ _id: new ObjectId(serviceId) }),
      db.collection('staff').findOne({ _id: new ObjectId(staffId) })
    ]);
    if (!service || !staff) {
      return res.status(404).json({ message: 'Service or staff not found' });
    }
    // Check for conflicts
    const existingBooking = await db.collection('bookings').findOne({
      staffId,
      date: new Date(date),
      time,
      status: { $in: ['pending', 'confirmed'] }
    });
    if (existingBooking) {
      return res.status(409).json({ message: 'Time slot already booked' });
    }
    // Create booking
    const bookingDoc = {
      serviceId,
      staffId,
      customerName,
      customerEmail,
      customerPhone,
      date: new Date(date),
      time,
      notes,
      totalPrice: service.price,
      status: 'pending',
      paymentStatus: 'pending',
      reminderSent: false,
      confirmationSent: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const result = await db.collection('bookings').insertOne(bookingDoc);
    const booking = { ...bookingDoc, _id: result.insertedId };
    
    // Send confirmation email
    try {
      // Populate service and staff data for email
      const populatedBooking = { ...booking };
      if (booking.serviceId) {
        const service = await db.collection('services').findOne({ _id: new ObjectId(booking.serviceId) });
        populatedBooking.serviceId = service;
      }
      if (booking.staffId) {
        const staff = await db.collection('staff').findOne({ _id: new ObjectId(booking.staffId) });
        populatedBooking.staffId = staff;
      }
      
      await sendBookingConfirmation(populatedBooking);
      await db.collection('bookings').updateOne({ _id: booking._id }, { $set: { confirmationSent: true } });
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
    const db = req.app.locals.db;
    const { id } = req.params;
    const updates = req.body;
    
    console.log('Updating booking:', { id, updates });
    
    // Validate ObjectId format
    if (!ObjectId.isValid(id)) {
      console.log('Invalid ObjectId format:', id);
      return res.status(400).json({ message: 'Invalid booking ID format' });
    }
    
    console.log('ObjectId is valid, proceeding with update...');
    
    // First check if booking exists
    const existingBooking = await db.collection('bookings').findOne({ _id: new ObjectId(id) });
    if (!existingBooking) {
      console.log('Booking not found in database');
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Update the booking
    const result = await db.collection('bookings').updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updates, updatedAt: new Date() } }
    );
    
    console.log('Update result:', result);
    
    if (result.matchedCount === 0) {
      console.log('No booking matched for update');
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Get the updated booking
    const updatedBooking = await db.collection('bookings').findOne({ _id: new ObjectId(id) });
    
    console.log('Booking updated successfully, checking for email...');
    
    // Send update email if status changed
    if (updates.status && ['confirmed', 'cancelled'].includes(updates.status)) {
      try {
        console.log('Preparing to send email for status change...');
        // Populate service and staff data for email
        const populatedBooking = { ...updatedBooking };
        if (updatedBooking.serviceId) {
          const service = await db.collection('services').findOne({ _id: new ObjectId(updatedBooking.serviceId) });
          populatedBooking.serviceId = service;
          console.log('Service populated:', service ? 'Yes' : 'No');
        }
        if (updatedBooking.staffId) {
          const staff = await db.collection('staff').findOne({ _id: new ObjectId(updatedBooking.staffId) });
          populatedBooking.staffId = staff;
          console.log('Staff populated:', staff ? 'Yes' : 'No');
        }
        
        await sendBookingUpdate(populatedBooking);
        console.log('Email sent successfully');
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
      }
    }
    
    console.log('Sending success response');
    console.log('Response data:', updatedBooking);
    res.json(updatedBooking);
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ message: 'Error updating booking', error: error.message });
  }
});

// Delete booking
router.delete('/:id', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const { id } = req.params;
    
    console.log('Deleting booking:', { id });
    
    if (!ObjectId.isValid(id)) {
      console.log('Invalid ObjectId format:', id);
      return res.status(400).json({ message: 'Invalid booking ID format' });
    }
    
    // First check if booking exists
    const existingBooking = await db.collection('bookings').findOne({ _id: new ObjectId(id) });
    if (!existingBooking) {
      console.log('Booking not found in database');
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Delete the booking
    const result = await db.collection('bookings').deleteOne({ _id: new ObjectId(id) });
    
    console.log('Delete result:', result);
    
    if (result.deletedCount === 0) {
      console.log('No booking was deleted');
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    console.log('Booking deleted successfully');
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ message: 'Error deleting booking', error: error.message });
  }
});

// Get available time slots
router.get('/available-slots/:staffId/:date', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const { staffId, date } = req.params;
    const { duration = 60 } = req.query;
    
    const staff = await db.collection('staff').findOne({ _id: new ObjectId(staffId) });
    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }
    
    const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const workingHours = staff.workingHours[dayOfWeek];
    
    if (!workingHours.isWorking) {
      return res.json([]);
    }
    
    // Get existing bookings for this staff on this date
    const existingBookings = await db.collection('bookings').find({
      staffId,
      date: new Date(date),
      status: { $in: ['pending', 'confirmed'] }
    }).toArray();
    
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