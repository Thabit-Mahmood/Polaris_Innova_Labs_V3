import { NextResponse } from 'next/server';
import { queries } from '@/lib/database';

export async function GET() {
  try {
    const subscribers = queries.getAllSubscribers();
    return NextResponse.json({ subscribers });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 });
  }
}
