import { Resend } from 'resend';
import { config } from './config';

// Initialize Resend (works with Railway)
const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  try {
    // Use Resend if API key is available (recommended for Railway)
    if (process.env.RESEND_API_KEY) {
      const recipients = Array.isArray(to) ? to : [to];
      
      const { data, error } = await resend.emails.send({
        from: config.smtp.from,
        to: recipients,
        subject,
        html,
      });

      if (error) {
        throw new Error(`Resend error: ${error.message}`);
      }

      return { success: true, messageId: data?.id };
    } else {
      // Fallback to nodemailer (for local development)
      const nodemailer = require('nodemailer');
      
      const transporter = nodemailer.createTransport({
        host: config.smtp.host,
        port: config.smtp.port === 587 ? 465 : config.smtp.port,
        secure: true,
        auth: {
          user: config.smtp.user,
          pass: config.smtp.password,
        },
      });

      const info = await transporter.sendMail({
        from: config.smtp.from,
        to,
        subject,
        html,
      });

      transporter.close();
      return { success: true, messageId: info.messageId };
    }
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
}
