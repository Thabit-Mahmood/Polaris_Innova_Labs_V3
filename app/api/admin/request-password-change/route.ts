import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email-service';
import { config } from '@/lib/config';
import { verificationCodes } from '@/lib/verification-codes';

export async function POST() {
  try {
    // Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store code with 15 minute expiration
    verificationCodes.set('admin', {
      code,
      expires: Date.now() + 15 * 60 * 1000,
    });

    // Send email
    await sendEmail({
      to: config.smtp.to.split(',')[0], // Send to first admin email
      subject: 'رمز تغيير كلمة المرور - Polaris Innova Labs',
      html: `
        <!DOCTYPE html>
        <html dir="rtl" lang="ar">
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; direction: rtl; text-align: right; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .code { font-size: 32px; font-weight: bold; color: #daff00; text-align: center; padding: 20px; background: #1a1a1a; border-radius: 10px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>رمز تغيير كلمة المرور</h1>
            <p>تم طلب تغيير كلمة مرور لوحة التحكم</p>
            <div class="code">${code}</div>
            <p>هذا الرمز صالح لمدة 15 دقيقة</p>
            <p>إذا لم تطلب هذا التغيير، يرجى تجاهل هذه الرسالة</p>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Password change request error:', error);
    return NextResponse.json(
      { error: 'فشل إرسال الرمز' },
      { status: 500 }
    );
  }
}
