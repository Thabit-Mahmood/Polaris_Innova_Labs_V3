import { NextRequest, NextResponse } from 'next/server';
import { verificationCodes } from '@/lib/verification-codes';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

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

    // Store new password in database
    // For now, we'll use a simple file-based approach
    // In production, use a proper secrets management system
    const { queries } = await import('@/lib/database');
    
    try {
      // Store in a settings table
      const db = (await import('@/lib/database')).getDatabase();
      
      // Create settings table if it doesn't exist
      db.exec(`
        CREATE TABLE IF NOT EXISTS settings (
          key TEXT PRIMARY KEY,
          value TEXT NOT NULL,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
      
      // Update or insert password
      const stmt = db.prepare(`
        INSERT INTO settings (key, value) VALUES (?, ?)
        ON CONFLICT(key) DO UPDATE SET value = ?, updated_at = datetime('now')
      `);
      stmt.run('admin_password', newPassword, newPassword);
      
      // Clear verification code
      verificationCodes.delete('admin');

      return NextResponse.json({ 
        success: true,
        message: 'تم تغيير كلمة المرور بنجاح. يرجى تسجيل الدخول مرة أخرى.'
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      throw dbError;
    }
  } catch (error) {
    console.error('Password change error:', error);
    return NextResponse.json(
      { error: 'فشل تغيير كلمة المرور' },
      { status: 500 }
    );
  }
}
