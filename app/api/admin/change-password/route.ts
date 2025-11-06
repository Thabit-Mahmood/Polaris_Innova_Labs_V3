import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

// Import verification codes from request route
let verificationCodes: Map<string, { code: string; expires: number }>;
try {
  const requestModule = require('./request-password-change/route');
  verificationCodes = requestModule.verificationCodes;
} catch {
  verificationCodes = new Map();
}

export async function POST(request: NextRequest) {
  try {
    const { code, newPassword } = await request.json();

    if (!code || !newPassword) {
      return NextResponse.json(
        { error: 'الرمز وكلمة المرور الجديدة مطلوبان' },
        { status: 400 }
      );
    }

    // Verify code
    const stored = verificationCodes.get('admin');
    if (!stored) {
      return NextResponse.json(
        { error: 'لم يتم طلب تغيير كلمة المرور' },
        { status: 400 }
      );
    }

    if (stored.expires < Date.now()) {
      verificationCodes.delete('admin');
      return NextResponse.json(
        { error: 'انتهت صلاحية الرمز' },
        { status: 400 }
      );
    }

    if (stored.code !== code) {
      return NextResponse.json(
        { error: 'الرمز غير صحيح' },
        { status: 400 }
      );
    }

    // Update password in environment (this is a simplified approach)
    // In production, you'd want to store this in a database or secure storage
    process.env.ADMIN_PASSWORD = newPassword;
    process.env.NEXT_PUBLIC_ADMIN_PASSWORD = newPassword;

    // Clear verification code
    verificationCodes.delete('admin');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Password change error:', error);
    return NextResponse.json(
      { error: 'فشل تغيير كلمة المرور' },
      { status: 500 }
    );
  }
}
