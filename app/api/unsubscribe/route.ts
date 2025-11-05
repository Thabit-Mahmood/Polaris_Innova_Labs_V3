import { NextRequest, NextResponse } from 'next/server';
import { queries } from '@/lib/database';
import { securityHeaders } from '@/lib/security';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني مطلوب' },
        { status: 400, headers: securityHeaders }
      );
    }

    const existing = queries.checkSubscription(email);
    if (!existing) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني غير مشترك' },
        { status: 404, headers: securityHeaders }
      );
    }

    queries.unsubscribeNewsletter(email);

    return NextResponse.json(
      { success: true, message: 'تم إلغاء الاشتراك بنجاح' },
      { status: 200, headers: securityHeaders }
    );
  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ غير متوقع' },
      { status: 500, headers: securityHeaders }
    );
  }
}
