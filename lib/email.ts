import nodemailer from 'nodemailer';

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

export async function sendContactEmail(data: {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}) {
  const transporter = createTransporter();
  
  try {
    // Send notification to admin
    const adminResult = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_TO,
      subject: `طلب تواصل جديد من ${data.name}`,
      html: `
        <!DOCTYPE html>
        <html dir="rtl" lang="ar">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: 'Tajawal', 'Cairo', 'Segoe UI', Tahoma, Arial, sans-serif;
              background-color: #f4f4f4;
              padding: 20px;
              direction: rtl;
              text-align: right;
            }
            .container {
              background-color: #ffffff;
              border-radius: 10px;
              padding: 30px;
              max-width: 600px;
              margin: 0 auto;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              direction: rtl;
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
              font-family: 'Cairo', sans-serif;
              font-weight: 700;
            }
            .field {
              margin-bottom: 20px;
              padding-bottom: 20px;
              border-bottom: 1px solid #e0e0e0;
              text-align: right;
              direction: rtl;
            }
            .field:last-child {
              border-bottom: none;
            }
            .label {
              font-weight: 700;
              color: #333;
              margin-bottom: 8px;
              display: block;
              font-family: 'Cairo', sans-serif;
            }
            .value {
              color: #666;
              line-height: 1.8;
              font-family: 'Tajawal', sans-serif;
              white-space: pre-wrap;
              word-wrap: break-word;
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
    const customerResult = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: data.email,
      subject: 'شكراً لتواصلك مع Polaris Innova Labs',
      html: `
        <!DOCTYPE html>
        <html dir="rtl" lang="ar">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: 'Tajawal', 'Cairo', 'Segoe UI', Tahoma, Arial, sans-serif;
              background-color: #0a0a0a;
              padding: 20px;
              direction: rtl;
              text-align: right;
            }
            .container {
              background-color: #1a1a1a;
              border-radius: 10px;
              padding: 30px;
              max-width: 600px;
              margin: 0 auto;
              box-shadow: 0 2px 20px rgba(218, 255, 0, 0.2);
              color: #ffffff;
              direction: rtl;
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
              font-family: 'Cairo', sans-serif;
              font-weight: 700;
            }
            .content {
              line-height: 1.8;
              color: #e0e0e0;
              font-size: 16px;
              text-align: right;
              direction: rtl;
              font-family: 'Tajawal', sans-serif;
            }
            .content p {
              margin-bottom: 15px;
              text-align: right;
            }
            .highlight {
              color: #daff00;
              font-weight: 700;
              font-family: 'Cairo', sans-serif;
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
              font-weight: 700;
              font-size: 18px;
              font-family: 'Cairo', sans-serif;
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

              <p style="margin-top: 25px; padding: 20px; background-color: #141414; border-right: 4px solid #daff00; border-radius: 5px; text-align: right; direction: rtl;">
                <strong style="font-family: 'Cairo', sans-serif; font-weight: 700;">هل تعلم؟</strong><br><br>
                <span style="font-family: 'Tajawal', sans-serif;">البرمجة ١٠٪ بس من المعادلة الكلية — نحنا نصمّم نتائج أعمال، مو بس كود</span>
              </p>
            </div>

            <div class="cta">
              <a href="https://wa.me/966540768136">تواصل معنا عبر واتساب</a>
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

    // Close the transporter connection
    transporter.close();
    
    return { success: true };
  } catch (error) {
    transporter.close();
    throw error;
  }
}

export async function sendBlogNotification(
  subscribers: string[],
  blog: {
    title: string;
    excerpt: string;
    slug: string;
    image_url?: string;
  }
) {
  const transporter = createTransporter();
  
  try {
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
    const blogUrl = `${baseUrl}/blog/${blog.slug}`;
    
    // Convert relative image URL to absolute URL
    const imageUrl = blog.image_url 
      ? (blog.image_url.startsWith('http') 
          ? blog.image_url 
          : `${baseUrl}${blog.image_url}`)
      : null;

    for (const email of subscribers) {
      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: email,
        subject: `مقال جديد: ${blog.title} - Polaris Innova Labs`,
        html: `
          <!DOCTYPE html>
          <html dir="rtl" lang="ar">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet">
            <style>
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              body {
                font-family: 'Tajawal', 'Cairo', 'Segoe UI', Tahoma, Arial, sans-serif;
                background-color: #0a0a0a;
                padding: 20px;
                direction: rtl;
                text-align: right;
              }
              .container {
                background-color: #1a1a1a;
                border-radius: 10px;
                padding: 30px;
                max-width: 600px;
                margin: 0 auto;
                box-shadow: 0 2px 20px rgba(218, 255, 0, 0.2);
                color: #ffffff;
                direction: rtl;
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
                font-family: 'Cairo', sans-serif;
                font-weight: 700;
                font-size: 24px;
              }
              .blog-image {
                width: 100%;
                height: 250px;
                object-fit: cover;
                border-radius: 10px;
                margin-bottom: 20px;
              }
              .content {
                line-height: 1.8;
                color: #e0e0e0;
                text-align: right;
                font-family: 'Tajawal', sans-serif;
              }
              .content h2 {
                font-family: 'Cairo', sans-serif;
                font-weight: 700;
                color: #daff00;
                margin-bottom: 15px;
              }
              .content p {
                margin-bottom: 15px;
                text-align: right;
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
                font-weight: 700;
                font-size: 18px;
                font-family: 'Cairo', sans-serif;
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
                <h1>📝 مقال جديد من Polaris Innova Labs</h1>
              </div>

              ${imageUrl ? `<img src="${imageUrl}" alt="${blog.title}" class="blog-image">` : ''}

              <div class="content">
                <h2>${blog.title}</h2>
                <p>${blog.excerpt}</p>
              </div>

              <div class="cta">
                <a href="${blogUrl}">اقرأ المقال كاملاً</a>
              </div>

              <div class="footer">
                <p>© ${new Date().getFullYear()} Polaris Innova Labs</p>
                <p style="margin-top: 10px; font-size: 12px;">
                  <a href="${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/unsubscribe?email=${encodeURIComponent(email)}" style="color: #999; text-decoration: underline;">
                    إلغاء الاشتراك
                  </a>
                </p>
              </div>
            </div>
          </body>
          </html>
        `,
      });
    }

    transporter.close();
    return { success: true };
  } catch (error) {
    transporter.close();
    throw error;
  }
}

export async function sendNewsletterConfirmation(email: string) {
  const transporter = createTransporter();
  
  try {
    console.log('📧 Sending newsletter confirmation to:', email);
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'مرحباً بك في نشرتنا الإخبارية - Polaris Innova Labs',
      html: `
        <!DOCTYPE html>
        <html dir="rtl" lang="ar">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: 'Tajawal', 'Cairo', 'Segoe UI', Tahoma, Arial, sans-serif;
              background-color: #0a0a0a;
              padding: 20px;
              direction: rtl;
              text-align: right;
            }
            .container {
              background-color: #1a1a1a;
              border-radius: 10px;
              padding: 30px;
              max-width: 600px;
              margin: 0 auto;
              box-shadow: 0 2px 20px rgba(218, 255, 0, 0.2);
              color: #ffffff;
              direction: rtl;
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
              font-family: 'Cairo', sans-serif;
              font-weight: 700;
            }
            .content {
              line-height: 1.8;
              color: #e0e0e0;
              text-align: center;
              font-family: 'Tajawal', sans-serif;
            }
            .content p {
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
              <p style="margin-top: 10px; font-size: 12px;">
                <a href="${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/unsubscribe?email=${encodeURIComponent(email)}" style="color: #999; text-decoration: underline;">
                  إلغاء الاشتراك
                </a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    transporter.close();
    return { success: true };
  } catch (error) {
    transporter.close();
    throw error;
  }
}
