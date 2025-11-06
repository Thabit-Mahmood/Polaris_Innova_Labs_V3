import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET() {
  try {
    console.log('🔍 Testing SMTP configuration...');
    
    const config = {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    };

    console.log('SMTP Config:', {
      host: config.host,
      port: config.port,
      user: config.auth.user,
      hasPassword: !!config.auth.pass,
    });

    // Check if credentials are set
    if (!config.auth.user || !config.auth.pass) {
      return NextResponse.json({
        success: false,
        error: 'SMTP credentials not configured',
        details: {
          user: config.auth.user ? 'SET' : 'NOT SET',
          password: config.auth.pass ? 'SET' : 'NOT SET',
        }
      }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      ...config,
      pool: false,
      maxConnections: 1,
      connectionTimeout: 5000,
      greetingTimeout: 5000,
      socketTimeout: 5000,
    });

    // Try to send a test email
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_TO?.split(',')[0] || process.env.SMTP_USER, // Send to first recipient or self
      subject: 'Test Email from Polaris Innova Labs',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #daff00;">✅ SMTP Test Successful!</h1>
            <p>This is a test email from your Polaris Innova Labs website.</p>
            <p>If you received this email, your SMTP configuration is working correctly.</p>
            <hr style="border: 1px solid #daff00; margin: 20px 0;">
            <p style="color: #666; font-size: 14px;">
              Sent at: ${new Date().toISOString()}<br>
              From: ${process.env.SMTP_FROM}<br>
              Host: ${config.host}:${config.port}
            </p>
          </div>
        </div>
      `,
    });

    transporter.close();

    return NextResponse.json({
      success: true,
      message: 'SMTP connection successful and test email sent',
      details: {
        messageId: info.messageId,
        from: process.env.SMTP_FROM,
        to: process.env.SMTP_TO?.split(',')[0] || process.env.SMTP_USER,
        host: config.host,
        port: config.port,
      }
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'SMTP test failed',
      details: error instanceof Error ? {
        message: error.message,
        code: (error as any).code,
        command: (error as any).command,
      } : 'Unknown error'
    }, { status: 500 });
  }
}
