import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email-service';
import { config } from '@/lib/config';

export async function GET() {
  try {
    const testEmail = config.smtp.to.split(',')[0];
    
    const result = await sendEmail({
      to: testEmail,
      subject: 'Test Email from Polaris Innova Labs',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #daff00;">✅ Email Test Successful!</h1>
            <p>This is a test email from your Polaris Innova Labs website.</p>
            <p>If you received this email, your email configuration is working correctly.</p>
            <hr style="border: 1px solid #daff00; margin: 20px 0;">
            <p style="color: #666; font-size: 14px;">
              Sent at: ${new Date().toISOString()}<br>
              Using: ${process.env.RESEND_API_KEY ? 'Resend API' : 'SMTP'}<br>
              To: ${testEmail}
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      details: {
        messageId: result.messageId,
        to: testEmail,
        service: process.env.RESEND_API_KEY ? 'Resend' : 'SMTP',
      }
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Email test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
