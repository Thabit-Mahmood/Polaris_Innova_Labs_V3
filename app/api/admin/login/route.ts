import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';
import { config } from '@/lib/config';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { error: 'كلمة المرور مطلوبة' },
        { status: 400 }
      );
    }

    // Check if password is stored in database
    const db = getDatabase();
    
    try {
      const result = db.prepare('SELECT value FROM settings WHERE key = ?').get('admin_password') as { value: string } | undefined;
      
      const correctPassword = result?.value || config.admin.password;
      
      if (password === correctPassword) {
        return NextResponse.json({ success: true });
      } else {
        return NextResponse.json(
          { error: 'كلمة مرور خاطئة' },
          { status: 401 }
        );
      }
    } catch (dbError) {
      // If settings table doesn't exist, use default password
      if (password === config.admin.password) {
        return NextResponse.json({ success: true });
      } else {
        return NextResponse.json(
          { error: 'كلمة مرور خاطئة' },
          { status: 401 }
        );
      }
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ' },
      { status: 500 }
    );
  }
}
