import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

export async function GET() {
  try {
    const diagnostics: any = {
      timestamp: new Date().toISOString(),
      environment: {},
      database: {},
      errors: []
    };

    // Check environment variables
    diagnostics.environment = {
      SMTP_HOST: process.env.SMTP_HOST || 'NOT SET',
      SMTP_PORT: process.env.SMTP_PORT || 'NOT SET',
      SMTP_USER: process.env.SMTP_USER ? 'SET' : 'NOT SET',
      SMTP_PASSWORD: process.env.SMTP_PASSWORD ? 'SET' : 'NOT SET',
      SMTP_FROM: process.env.SMTP_FROM || 'NOT SET',
      SMTP_TO: process.env.SMTP_TO || 'NOT SET',
      NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL || 'NOT SET',
      NODE_ENV: process.env.NODE_ENV || 'NOT SET',
    };

    // Check database
    try {
      const db = getDatabase();
      
      // Check if tables exist
      const tables = db.prepare(`
        SELECT name FROM sqlite_master WHERE type='table'
      `).all();
      
      diagnostics.database.tables = tables;
      
      // Count records
      try {
        const blogCount = db.prepare('SELECT COUNT(*) as count FROM blogs').get() as any;
        diagnostics.database.blogCount = blogCount.count;
      } catch (e) {
        diagnostics.database.blogCount = 'ERROR: ' + (e instanceof Error ? e.message : 'Unknown');
      }
      
      try {
        const subscriberCount = db.prepare('SELECT COUNT(*) as count FROM newsletter').get() as any;
        diagnostics.database.subscriberCount = subscriberCount.count;
      } catch (e) {
        diagnostics.database.subscriberCount = 'ERROR: ' + (e instanceof Error ? e.message : 'Unknown');
      }
      
      try {
        const contactCount = db.prepare('SELECT COUNT(*) as count FROM contacts').get() as any;
        diagnostics.database.contactCount = contactCount.count;
      } catch (e) {
        diagnostics.database.contactCount = 'ERROR: ' + (e instanceof Error ? e.message : 'Unknown');
      }
      
      diagnostics.database.status = 'OK';
    } catch (dbError) {
      diagnostics.database.status = 'ERROR';
      diagnostics.database.error = dbError instanceof Error ? dbError.message : 'Unknown database error';
      diagnostics.errors.push('Database connection failed');
    }

    return NextResponse.json(diagnostics, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      error: 'Diagnostics failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
