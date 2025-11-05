import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';

// Import verification codes from request-password-change
const verificationCodes = new Map<string, { code: string; expires: number }>();

export async function POST(request: NextRequest) {
  try {
    const { code, newPassword } = await request.json();
    const email = 'services@polaris-innova-labs.com';

    const stored = verificationCodes.get(email);

    if (!stored) {
      return NextResponse.json({ error: 'لم يتم طلب رمز تحقق' }, { status: 400 });
    }

    if (Date.now() > stored.expires) {
      verificationCodes.delete(email);
      return NextResponse.json({ error: 'انتهت صلاحية الرمز' }, { status: 400 });
    }

    if (stored.code !== code) {
      return NextResponse.json({ error: 'رمز التحقق غير صحيح' }, { status: 400 });
    }

    // Save new password to .env.local
    const envPath = path.join(process.cwd(), '.env.local');
    let envContent = await readFile(envPath, 'utf-8');

    // Update or add ADMIN_PASSWORD
    if (envContent.includes('ADMIN_PASSWORD=')) {
      envContent = envContent.replace(/ADMIN_PASSWORD=.*/g, `ADMIN_PASSWORD=${newPassword}`);
    } else {
      envContent += `\n\n# Admin Panel\nADMIN_PASSWORD=${newPassword}\n`;
    }

    await writeFile(envPath, envContent);

    // Clear verification code
    verificationCodes.delete(email);

    return NextResponse.json({ success: true, message: 'تم تغيير كلمة المرور بنجاح' });
  } catch (error) {
    console.error('Error changing password:', error);
    return NextResponse.json({ error: 'فشل تغيير كلمة المرور' }, { status: 500 });
  }
}
