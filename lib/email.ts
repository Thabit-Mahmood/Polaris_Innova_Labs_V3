import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendContactEmail(data: {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}) {
  try {
    // Send notification to admin
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_TO,
      subject: `طلب تواصل جديد من ${data.name}`,
      html: `
        <!DOCTYPE html>
        <html dir="rtl" lang="ar">
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: 'Cairo', Arial, sans-serif;
              background-color: #f4f4f4;
              padding: 20px;
              direction: rtl;
            }
            .container {
              background-color: #ffffff;
              border-radius: 10px;
              padding: 30px;
              max-width: 600px;
              margin: 0 auto;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .header {
              background: linear-gradient(135deg, #daff00 0%, #a8cc00 100%);
              color: #0a0a0a;
              padding: 20px;
              border-radius: 8px;
              text-align: center;
              margin-bottom: 30px;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
            }
            .field {
              margin-bottom: 20px;
              padding-bottom: 20px;
              border-bottom: 1px solid #e0e0e0;
            }
            .field:last-child {
              border-bottom: none;
            }
            .label {
              font-weight: bold;
              color: #333;
              margin-bottom: 5px;
              display: block;
            }
            .value {
              color: #666;
              line-height: 1.6;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 2px solid #daff00;
              color: #999;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚀 طلب تواصل جديد</h1>
            </div>

            <div class="field">
              <span class="label">الاسم:</span>
              <span class="value">${data.name}</span>
            </div>

            <div class="field">
              <span class="label">البريد الإلكتروني:</span>
              <span class="value">${data.email}</span>
            </div>

            ${data.phone ? `
            <div class="field">
              <span class="label">رقم الهاتف:</span>
              <span class="value">${data.phone}</span>
            </div>
            ` : ''}

            ${data.service ? `
            <div class="field">
              <span class="label">نوع الخدمة:</span>
              <span class="value">${data.service}</span>
            </div>
            ` : ''}

            <div class="field">
              <span class="label">الرسالة:</span>
              <div class="value">${data.message}</div>
            </div>

            <div class="footer">
              <p>Polaris Innova Labs © ${new Date().getFullYear()}</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    // Send thank you email to customer
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: data.email,
      subject: 'شكراً لتواصلك مع Polaris Innova Labs',
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
              box-shadow: 0 2px 20px rgba(218, 255, 0, 0.2);
              color: #ffffff;
            }
            .header {
              background: linear-gradient(135deg, #daff00 0%, #a8cc00 100%);
              color: #0a0a0a;
              padding: 30px;
              border-radius: 8px;
              text-align: center;
              margin-bottom: 30px;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
            }
            .content {
              line-height: 1.8;
              color: #e0e0e0;
              font-size: 16px;
            }
            .content p {
              margin-bottom: 15px;
            }
            .highlight {
              color: #daff00;
              font-weight: bold;
            }
            .cta {
              text-align: center;
              margin: 30px 0;
            }
            .cta a {
              display: inline-block;
              background: linear-gradient(135deg, #daff00 0%, #a8cc00 100%);
              color: #0a0a0a;
              padding: 15px 40px;
              border-radius: 8px;
              text-decoration: none;
              font-weight: bold;
              font-size: 18px;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 2px solid #daff00;
              color: #999;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✨ شكراً ${data.name}!</h1>
            </div>

            <div class="content">
              <p>نشكرك على تواصلك مع <span class="highlight">Polaris Innova Labs</span></p>

              <p>تم استلام رسالتك بنجاح وسيقوم فريقنا بالرد عليك في أقرب وقت ممكن (عادةً خلال 24 ساعة).</p>

              <p>نحن متحمسون للعمل معك ومساعدتك في تحقيق أهدافك الرقمية! 🚀</p>

              <p style="margin-top: 25px; padding: 20px; background-color: #141414; border-right: 4px solid #daff00; border-radius: 5px;">
                <strong>هل تعلم؟</strong><br>
                البرمجة ١٠٪ بس من المعادلة الكلية — نحنا نصمّم نتائج أعمال، مو بس كود
              </p>
            </div>

            <div class="cta">
              <a href="https://wa.me/${process.env.WHATSAPP_NUMBER || '966XXXXXXXXX'}">تواصل معنا عبر واتساب</a>
            </div>

            <div class="footer">
              <p>Polaris Innova Labs - شركة تطوير المواقع في السعودية</p>
              <p>© ${new Date().getFullYear()} جميع الحقوق محفوظة</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    throw new Error('فشل في إرسال البريد الإلكتروني');
  }
}

export async function sendNewsletterConfirmation(email: string) {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'مرحباً بك في نشرتنا الإخبارية - Polaris Innova Labs',
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
              box-shadow: 0 2px 20px rgba(218, 255, 0, 0.2);
              color: #ffffff;
            }
            .header {
              background: linear-gradient(135deg, #daff00 0%, #a8cc00 100%);
              color: #0a0a0a;
              padding: 30px;
              border-radius: 8px;
              text-align: center;
              margin-bottom: 30px;
            }
            .content {
              line-height: 1.8;
              color: #e0e0e0;
              text-align: center;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 2px solid #daff00;
              color: #999;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 مرحباً بك!</h1>
            </div>
            <div class="content">
              <p>شكراً لاشتراكك في نشرتنا الإخبارية</p>
              <p>ستصلك آخر الأخبار والعروض الحصرية من Polaris Innova Labs</p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Polaris Innova Labs</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Newsletter email error:', error);
    throw new Error('فشل في إرسال بريد التأكيد');
  }
}
