import { NextResponse } from 'next/server';
import { queries } from '@/lib/database';

export async function GET() {
  try {
    console.log('👥 Fetching all subscribers...');
    const subscribers = queries.getAllSubscribers();
    console.log(`✅ Found ${subscribers.length} subscribers`);
    return NextResponse.json({ subscribers });
  } catch (error) {
    console.error('❌ Error fetching subscribers:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch subscribers',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
