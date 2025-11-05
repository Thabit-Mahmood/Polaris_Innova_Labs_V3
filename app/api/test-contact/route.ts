import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('=== TEST CONTACT RECEIVED ===');
    console.log('Body:', JSON.stringify(body, null, 2));
    
    return NextResponse.json({ 
      success: true, 
      received: body 
    });
  } catch (error) {
    console.error('Test error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
