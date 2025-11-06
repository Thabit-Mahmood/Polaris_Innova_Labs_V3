import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema, sanitizeInput, getClientIp, checkRateLimit, securityHeaders } from '@/lib/security';
import { sendContactEmail } from '@/lib/email';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const { queries } = await import('@/lib/database');
  try {
    console.log('📧 Contact form submission started');
    
    // Get client IP for rate limiting
    const clientIp = getClientIp(request);
    console.log('Client IP:', clientIp);

    // Check rate limit (5 requests per 15 minutes)
    const rateLimit = checkRateLimit(`contact_${clientIp}`, 5, 15 * 60 * 1000);
    if (!rateLimit.allowed) {
      console.log('❌ Rate limit exceeded');
      return NextResponse.json(
        { error: 'لقد تجاوزت الحد المسموح من الطلبات. يرجى المحاولة لاحقاً.' },
        { status: 429, headers: securityHeaders }
      );
    }

    // Parse request body
    const body = await request.json();
    console.log('📝 Form data received');

    // Validate input
    const validationResult = contactFormSchema.safeParse(body);
    if (!validationResult.success) {
      console.error('Validation failed:', validationResult.error.errors);
      console.error('Received data:', body);
      return NextResponse.json(
        { error: 'البيانات المدخلة غير صحيحة', details: validationResult.error.errors },
        { status: 400, headers: securityHeaders }
      );
    }

    const { name, email, phone, service, message } = validationResult.data;

    // Sanitize inputs to prevent XSS
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      phone: phone ? sanitizeInput(phone) : undefined,
      service: service ? sanitizeInput(service) : undefined,
      message: sanitizeInput(message),
    };

    // Get user agent for logging
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Save to database (using prepared statements to prevent SQL injection)
    try {
      queries.insertContact({
        name: sanitizedData.name,
        email: sanitizedData.email,
        phone: sanitizedData.phone,
        service: sanitizedData.service,
        message: sanitizedData.message,
        ip_address: clientIp,
        user_agent: userAgent,
      });

      // Auto-subscribe to newsletter if not already subscribed
      try {
        const existing = queries.checkSubscription(sanitizedData.email);
        if (!existing) {
          queries.insertNewsletter(sanitizedData.email, clientIp);
        }
      } catch (newsletterError) {
        // Ignore if already subscribed
        console.log('Newsletter subscription skipped (may already exist)');
      }
    } catch (dbError) {
      console.error('Database error:', dbError);
      // Continue even if database insert fails
    }

    // Send emails
    console.log('📧 Attempting to send emails...');
    console.log('SMTP Config:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER,
      hasPassword: !!process.env.SMTP_PASSWORD,
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_TO,
    });

    let emailSent = false;
    try {
      await sendContactEmail({
        name: sanitizedData.name,
        email: sanitizedData.email,
        phone: sanitizedData.phone,
        service: sanitizedData.service,
        message: sanitizedData.message,
      });
      console.log('✅ Emails sent successfully');
      emailSent = true;
    } catch (emailError) {
      console.error('❌ Email error:', emailError);
      console.error('❌ Email error details:', emailError instanceof Error ? emailError.message : 'Unknown');
    }

    console.log('✅ Contact form submission completed');
    return NextResponse.json(
      { 
        success: true, 
        message: 'تم إرسال رسالتك بنجاح!',
        emailSent: emailSent,
        warning: !emailSent ? 'تم حفظ رسالتك لكن لم يتم إرسال البريد الإلكتروني' : undefined
      },
      { status: 200, headers: securityHeaders }
    );
  } catch (error) {
    console.error('❌ Contact form error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.' },
      { status: 500, headers: securityHeaders }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return NextResponse.json(
    {},
    { status: 200, headers: securityHeaders }
  );
}
