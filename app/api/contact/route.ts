import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema, sanitizeInput, getClientIp, checkRateLimit, securityHeaders } from '@/lib/security';
import { queries } from '@/lib/database';
import { sendContactEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIp = getClientIp(request);

    // Check rate limit (5 requests per 15 minutes)
    const rateLimit = checkRateLimit(`contact_${clientIp}`, 5, 15 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'لقد تجاوزت الحد المسموح من الطلبات. يرجى المحاولة لاحقاً.' },
        { status: 429, headers: securityHeaders }
      );
    }

    // Parse request body
    const body = await request.json();

    // Validate input
    const validationResult = contactFormSchema.safeParse(body);
    if (!validationResult.success) {
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
    } catch (dbError) {
      console.error('Database error:', dbError);
      // Continue even if database insert fails
    }

    // Send emails
    try {
      await sendContactEmail({
        name: sanitizedData.name,
        email: sanitizedData.email,
        phone: sanitizedData.phone,
        service: sanitizedData.service,
        message: sanitizedData.message,
      });
    } catch (emailError) {
      console.error('Email error:', emailError);
      return NextResponse.json(
        { error: 'حدث خطأ أثناء إرسال البريد الإلكتروني. يرجى المحاولة مرة أخرى أو التواصل عبر واتساب.' },
        { status: 500, headers: securityHeaders }
      );
    }

    return NextResponse.json(
      { success: true, message: 'تم إرسال رسالتك بنجاح!' },
      { status: 200, headers: securityHeaders }
    );
  } catch (error) {
    console.error('Contact form error:', error);
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
