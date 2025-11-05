import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { setVerificationCode } from '@/lib/verification-codes';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function POST() {
  try {
    const email = 'services@polaris-innova-labs.com';
    
    // Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = Date.now() + 15 * 60 * 1000; // 15 minutes

    setVerificationCode(email, code, expires);

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'رمز تغيير كلمة المرور - Polaris Innova Labs',
      html: `
        <!DOCTYPE html>
        <html dir="rtl" lang="ar">
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: 'Cairo', Arial, sans-serif;
              background-color: #0a0a0a;
              padding: 20px;
              direction: rtl;
            }
            .container {
              background-color: #1a1a1a;
              border-radius: 10px;
              padding: 30px;
              max-width: 600px;
              margin: 0 auto;
              color: #ffffff;
              text-align: center;
            }
            .code {
              font-size: 48px;
              font-weight: bold;
              color: #daff00;
              letter-spacing: 10px;
              margin: 30px 0;
              padding: 20px;
              background-color: #141414;
              border-radius: 10px;
            }
            .warning {
              color: #ff6b6b;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>رمز التحقق</h1>
            <p>استخدم الرمز التالي لتغيير كلمة المرور:</p>
            <div class="code">${code}</div>
            <p>الرمز صالح لمدة 15 دقيقة</p>
            <p class="warning">⚠️ إذا لم تطلب هذا الرمز، تجاهل هذه الرسالة</p>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true, message: 'تم إرسال رمز التحقق' });
  } catch (error) {
    console.error('Error sending verification code:', error);
    return NextResponse.json({ error: 'فشل إرسال الرمز' }, { status: 500 });
  }
}
