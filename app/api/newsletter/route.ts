import { NextRequest, NextResponse } from 'next/server';
import { newsletterSchema, sanitizeInput, getClientIp, checkRateLimit, securityHeaders } from '@/lib/security';
import { queries } from '@/lib/database';
import { sendNewsletterConfirmation } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);

    // Rate limit
    const rateLimit = checkRateLimit(`newsletter_${clientIp}`, 3, 15 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'لقد تجاوزت الحد المسموح. حاول لاحقاً.' },
        { status: 429, headers: securityHeaders }
      );
    }

    const body = await request.json();
    const validationResult = newsletterSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني غير صحيح' },
        { status: 400, headers: securityHeaders }
      );
    }

    const { email } = validationResult.data;
    const sanitizedEmail = sanitizeInput(email);

    // Check if already subscribed
    const existing = queries.checkSubscription(sanitizedEmail);
    if (existing) {
      return NextResponse.json(
        { error: 'أنت مشترك بالفعل في النشرة البريدية' },
        { status: 400, headers: securityHeaders }
      );
    }

    // Subscribe
    try {
      queries.insertNewsletter(sanitizedEmail, clientIp);
      await sendNewsletterConfirmation(sanitizedEmail);

      return NextResponse.json(
        { success: true, message: 'تم الاشتراك بنجاح!' },
        { status: 200, headers: securityHeaders }
      );
    } catch (error) {
      console.error('Newsletter error:', error);
      return NextResponse.json(
        { error: 'حدث خطأ. حاول مرة أخرى.' },
        { status: 500, headers: securityHeaders }
      );
    }
  } catch (error) {
    console.error('Newsletter error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ غير متوقع' },
      { status: 500, headers: securityHeaders }
    );
  }
}
