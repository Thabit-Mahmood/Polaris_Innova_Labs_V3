import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET() {
  const { queries } = await import('@/lib/database');
  try {
    console.log('👥 Fetching all subscribers...');
    const subscribers = queries.getAllSubscribers();
    console.log(`✅ Found ${subscribers.length} subscribers:`, subscribers);
    return NextResponse.json({ 
      subscribers,
      count: subscribers.length 
    }, { 
      headers: corsHeaders 
    });
  } catch (error) {
    console.error('❌ Error fetching subscribers:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack');
    return NextResponse.json({ 
      error: 'Failed to fetch subscribers',
      details: error instanceof Error ? error.message : 'Unknown error',
      subscribers: []
    }, { 
      status: 500,
      headers: corsHeaders 
    });
  }
}
