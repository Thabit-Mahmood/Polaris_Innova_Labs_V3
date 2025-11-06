import { NextRequest, NextResponse } from 'next/server';
import { newsletterSchema, sanitizeInput, getClientIp, checkRateLimit, securityHeaders } from '@/lib/security';
import { sendNewsletterConfirmation } from '@/lib/email';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const { queries } = await import('@/lib/database');
  try {
    console.log('📧 Newsletter subscription started');
    const clientIp = getClientIp(request);
    console.log('Client IP:', clientIp);

    // Rate limit
    const rateLimit = checkRateLimit(`newsletter_${clientIp}`, 3, 15 * 60 * 1000);
    if (!rateLimit.allowed) {
      console.log('❌ Rate limit exceeded');
      return NextResponse.json(
        { error: 'لقد تجاوزت الحد المسموح. حاول لاحقاً.' },
        { status: 429, headers: securityHeaders }
      );
    }

    const body = await request.json();
    console.log('Request body:', body);
    
    const validationResult = newsletterSchema.safeParse(body);

    if (!validationResult.success) {
      console.error('❌ Validation failed:', validationResult.error);
      return NextResponse.json(
        { error: 'البريد الإلكتروني غير صحيح' },
        { status: 400, headers: securityHeaders }
      );
    }

    const { email } = validationResult.data;
    const sanitizedEmail = sanitizeInput(email);
    console.log('Sanitized email:', sanitizedEmail);

    // Check if already subscribed
    console.log('Checking if already subscribed...');
    try {
      const existing = queries.checkSubscription(sanitizedEmail);
      if (existing) {
        console.log('⚠️ Already subscribed');
        return NextResponse.json(
          { error: 'أنت مشترك بالفعل في النشرة البريدية' },
          { status: 400, headers: securityHeaders }
        );
      }
    } catch (checkError) {
      console.error('❌ Error checking subscription:', checkError);
      // Continue anyway, will fail on insert if duplicate
    }

    // Subscribe
    console.log('Attempting to insert into database...');
    try {
      queries.insertNewsletter(sanitizedEmail, clientIp);
      console.log('✅ Inserted into database');
      
      console.log('Sending confirmation email...');
      try {
        await sendNewsletterConfirmation(sanitizedEmail);
        console.log('✅ Confirmation email sent');
      } catch (emailError) {
        console.error('⚠️ Email sending failed but subscription saved:', emailError);
        // Don't fail the subscription if email fails
      }

      return NextResponse.json(
        { success: true, message: 'تم الاشتراك بنجاح!' },
        { status: 200, headers: securityHeaders }
      );
    } catch (error) {
      console.error('❌ Newsletter subscription error:', error);
      console.error('Error details:', error instanceof Error ? error.message : 'Unknown');
      console.error('Error stack:', error instanceof Error ? error.stack : 'No stack');
      return NextResponse.json(
        { 
          error: 'حدث خطأ. حاول مرة أخرى.',
          details: error instanceof Error ? error.message : 'Unknown error'
        },
        { status: 500, headers: securityHeaders }
      );
    }
  } catch (error) {
    console.error('❌ Newsletter outer error:', error);
    console.error('Error details:', error instanceof Error ? error.message : 'Unknown');
    return NextResponse.json(
      { 
        error: 'حدث خطأ غير متوقع',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500, headers: securityHeaders }
    );
  }
}
