import express from 'express';
import { sendBookingConfirmation, sendBookingUpdate, sendTestEmail } from '../utils/emailService.js';
import Booking from '../models/Booking.js';
const router = express.Router();

// Send test email
router.post('/test', async (req, res) => {
  try {
    await sendTestEmail();
    res.json({ message: 'Test email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending test email', error: error.message });
  }
});

// Resend booking confirmation
router.post('/resend-confirmation/:bookingId', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId)
      .populate('serviceId staffId');
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    await sendBookingConfirmation(booking);
    
    booking.confirmationSent = true;
    await booking.save();
    
    res.json({ message: 'Confirmation email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending confirmation email', error: error.message });
  }
});

// Send booking update
router.post('/send-update/:bookingId', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId)
      .populate('serviceId staffId');
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    await sendBookingUpdate(booking);
    
    res.json({ message: 'Update email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending update email', error: error.message });
  }
});

export default router;