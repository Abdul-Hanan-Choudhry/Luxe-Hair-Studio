import express from 'express';
import { sendBookingConfirmation, sendBookingUpdate, sendTestEmail } from '../utils/emailService.js';
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

export default router;