import dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';

// Debugging output for environment variables
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '***' : undefined);
console.log('EMAIL_PORT:', process.env.EMAIL_PORT);
console.log('EMAIL_HOST:', process.env.EMAIL_HOST);
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.warn('⚠️  EMAIL_USER or EMAIL_PASS is missing from environment variables!');
}

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT) : 587,
  secure: process.env.EMAIL_PORT === '465', // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify email configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email configuration error:', error);
  } else {
    console.log('✅ Email service ready');
  }
});

// Format date for emails
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Format time for emails
const formatTime = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

// Send booking confirmation email
const sendBookingConfirmation = async (booking) => {
  const mailOptions = {
    from: `"Luxe Hair Studio" <${process.env.EMAIL_USER}>`,
    to: booking.customerEmail,
    subject: '✨ Your Luxe Hair Studio Appointment is Confirmed!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Booking Confirmation</title>
        <style>
          body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8f9fa; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #f43f5e, #ec4899); color: white; padding: 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; font-weight: bold; }
          .header p { margin: 10px 0 0 0; opacity: 0.9; }
          .content { padding: 30px; }
          .booking-details { background: #fef7f7; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #f43f5e; }
          .detail-row { display: flex; justify-content: space-between; margin: 10px 0; padding: 8px 0; border-bottom: 1px solid #f1f5f9; }
          .detail-label { font-weight: bold; color: #64748b; }
          .detail-value { color: #1e293b; }
          .price { font-size: 24px; font-weight: bold; color: #059669; }
          .footer { background: #f8fafc; padding: 20px; text-align: center; color: #64748b; font-size: 14px; }
          .button { display: inline-block; background: linear-gradient(135deg, #f43f5e, #ec4899); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 10px 0; }
          .contact-info { background: #f0f9ff; border-radius: 8px; padding: 15px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✨ Booking Confirmed!</h1>
            <p>Your luxury appointment at Luxe Hair Studio</p>
          </div>
          
          <div class="content">
            <p>Dear ${booking.customerName},</p>
            
            <p>Thank you for choosing Luxe Hair Studio! We're excited to pamper you with our premium services. Your appointment has been confirmed with the following details:</p>
            
            <div class="booking-details">
              <h3 style="margin-top: 0; color: #f43f5e;">Appointment Details</h3>
              
              <div class="detail-row">
                <span class="detail-label">Service:</span>
                <span class="detail-value">${booking.serviceId.name}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Stylist:</span>
                <span class="detail-value">${booking.staffId.name}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Date:</span>
                <span class="detail-value">${formatDate(booking.date)}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Time:</span>
                <span class="detail-value">${formatTime(booking.time)}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Duration:</span>
                <span class="detail-value">${booking.serviceId.duration} minutes</span>
              </div>
              
              <div class="detail-row" style="border-bottom: none; margin-top: 15px; padding-top: 15px; border-top: 2px solid #f43f5e;">
                <span class="detail-label">Total Investment:</span>
                <span class="detail-value price">$${booking.totalPrice}</span>
              </div>
            </div>
            
            ${booking.notes ? `
            <div style="background: #fef3c7; border-radius: 8px; padding: 15px; margin: 20px 0; border-left: 4px solid #f59e0b;">
              <h4 style="margin-top: 0; color: #92400e;">Special Notes:</h4>
              <p style="margin-bottom: 0;">${booking.notes}</p>
            </div>
            ` : ''}
            
            <div class="contact-info">
              <h4 style="margin-top: 0; color: #1e40af;">Salon Information</h4>
              <p style="margin: 5px 0;"><strong>📍 Address:</strong> 9876 Rodeo Drive, Beverly Hills, CA 90210</p>
              <p style="margin: 5px 0;"><strong>📞 Phone:</strong> (555) 123-LUXE</p>
              <p style="margin: 5px 0;"><strong>🌐 Website:</strong> www.luxehairstudio.com</p>
            </div>
            
            <h3 style="color: #f43f5e;">What to Expect:</h3>
            <ul style="color: #64748b;">
              <li>Arrive 10 minutes early for your consultation</li>
              <li>Complimentary beverages and WiFi available</li>
              <li>Premium products and luxury experience</li>
              <li>Free parking validation provided</li>
            </ul>
            
            <p style="margin-top: 30px;">We can't wait to see you! If you need to reschedule or have any questions, please call us at (555) 123-LUXE.</p>
            
            <p>With love and luxury,<br><strong>The Luxe Hair Studio Team</strong></p>
          </div>
          
          <div class="footer">
            <p>This is an automated confirmation email. Please save this for your records.</p>
            <p>© 2025 Luxe Hair Studio. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  return transporter.sendMail(mailOptions);
};

// Send booking update email
const sendBookingUpdate = async (booking) => {
  const statusMessages = {
    confirmed: {
      subject: '✅ Your Appointment is Confirmed!',
      message: 'Great news! Your appointment has been confirmed.',
      color: '#059669'
    },
    cancelled: {
      subject: '❌ Appointment Cancelled',
      message: 'We\'re sorry to inform you that your appointment has been cancelled.',
      color: '#dc2626'
    },
    completed: {
      subject: '🎉 Thank You for Visiting Us!',
      message: 'Thank you for choosing Luxe Hair Studio! We hope you loved your new look.',
      color: '#7c3aed'
    }
  };

  const statusInfo = statusMessages[booking.status] || statusMessages.confirmed;

  const mailOptions = {
    from: `"Luxe Hair Studio" <${process.env.EMAIL_USER}>`,
    to: booking.customerEmail,
    subject: statusInfo.subject,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Booking Update</title>
        <style>
          body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8f9fa; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .header { background: ${statusInfo.color}; color: white; padding: 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; font-weight: bold; }
          .content { padding: 30px; }
          .booking-details { background: #f8fafc; border-radius: 8px; padding: 20px; margin: 20px 0; }
          .detail-row { display: flex; justify-content: space-between; margin: 10px 0; padding: 8px 0; border-bottom: 1px solid #e2e8f0; }
          .detail-label { font-weight: bold; color: #64748b; }
          .detail-value { color: #1e293b; }
          .footer { background: #f8fafc; padding: 20px; text-align: center; color: #64748b; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Appointment Update</h1>
          </div>
          
          <div class="content">
            <p>Dear ${booking.customerName},</p>
            
            <p>${statusInfo.message}</p>
            
            <div class="booking-details">
              <h3 style="margin-top: 0;">Appointment Details</h3>
              
              <div class="detail-row">
                <span class="detail-label">Service:</span>
                <span class="detail-value">${booking.serviceId.name}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Stylist:</span>
                <span class="detail-value">${booking.staffId.name}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Date:</span>
                <span class="detail-value">${formatDate(booking.date)}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Time:</span>
                <span class="detail-value">${formatTime(booking.time)}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Status:</span>
                <span class="detail-value" style="color: ${statusInfo.color}; font-weight: bold; text-transform: capitalize;">${booking.status}</span>
              </div>
            </div>
            
            ${booking.status === 'cancelled' ? `
              <p>If you'd like to reschedule, please call us at (555) 123-LUXE or visit our website to book a new appointment.</p>
            ` : ''}
            
            ${booking.status === 'completed' ? `
              <p>We hope you're absolutely in love with your new look! Don't forget to share your transformation on social media and tag us @luxehairstudio.</p>
              <p>We'd love to see you again soon for your next beauty appointment!</p>
            ` : ''}
            
            <p>Best regards,<br><strong>The Luxe Hair Studio Team</strong></p>
          </div>
          
          <div class="footer">
            <p>Questions? Call us at (555) 123-LUXE</p>
            <p>© 2025 Luxe Hair Studio. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  return transporter.sendMail(mailOptions);
};

// Send test email
const sendTestEmail = async () => {
  const mailOptions = {
    from: `"Luxe Hair Studio" <${process.env.EMAIL_USER}>`,
    to: process.env.TEST_EMAIL,
    subject: '🧪 Test Email from Luxe Hair Studio',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Test Email</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f43f5e, #ec4899); color: white; padding: 20px; text-align: center; border-radius: 8px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Email Service Working!</h1>
            <p>This is a test email from Luxe Hair Studio booking system.</p>
          </div>
          <div style="padding: 20px;">
            <p>If you're receiving this email, the email service is configured correctly!</p>
            <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>From:</strong> ${process.env.EMAIL_USER}</p>
            <p><strong>Service:</strong> ${process.env.EMAIL_SERVICE}</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  return transporter.sendMail(mailOptions);
};

export { sendBookingConfirmation, sendBookingUpdate, sendTestEmail };