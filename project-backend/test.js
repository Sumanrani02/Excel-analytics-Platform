import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const testMsg = {
  to: 'your-email@example.com',
  from: process.env.EMAIL_FROM,
  subject: 'Test Email',
  text: 'This is a test email from SendGrid',
};

sgMail.send(testMsg)
  .then(() => console.log('Test email sent'))
  .catch((err) => console.error('SendGrid test error:', err));
console.log('SendGrid API key:', process.env.SENDGRID_API_KEY);
