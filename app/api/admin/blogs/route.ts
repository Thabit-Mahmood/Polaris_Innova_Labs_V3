import { NextRequest, NextResponse } from 'next/server';
import { sendBlogNotification } from '@/lib/email';

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
    console.log('📚 Fetching all blogs...');
    const blogs = queries.getAllBlogs(false);
    console.log(`✅ Found ${blogs.length} blogs`);
    return NextResponse.json({ 
      blogs,
      count: blogs.length 
    }, { 
      headers: corsHeaders 
    });
  } catch (error) {
    console.error('❌ Error fetching blogs:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch blogs',
      details: error instanceof Error ? error.message : 'Unknown error',
      blogs: []
    }, { 
      status: 500,
      headers: corsHeaders 
    });
  }
}

export async function POST(request: NextRequest) {
  const { queries } = await import('@/lib/database');
  
  try {
    console.log('📝 Creating new blog post...');
    const body = await request.json();
    console.log('Blog data received:', JSON.stringify(body, null, 2));
    
    // Validate required fields
    if (!body.title || !body.slug || !body.excerpt || !body.content) {
      console.error('❌ Missing required fields');
      return NextResponse.json({ 
        error: 'حقول مطلوبة مفقودة', 
        details: 'يجب ملء العنوان والرابط والمقتطف والمحتوى'
      }, { status: 400 });
    }
    
    console.log('Attempting to insert into database...');
    try {
      const result = queries.insertBlog(body);
      console.log('✅ Blog created with ID:', result.lastInsertRowid);

      // If blog is published, send notifications to subscribers
      if (body.published) {
        console.log('📧 Blog is published, sending notifications...');
        try {
          const subscribers = queries.getAllSubscribers() as any[];
          const emails = subscribers.map(sub => sub.email);

          if (emails.length > 0) {
            console.log(`Sending to ${emails.length} subscribers...`);
            await sendBlogNotification(emails, {
              title: body.title,
              excerpt: body.excerpt,
              slug: body.slug,
              image_url: body.image_url,
            });
            console.log(`✅ Sent blog notifications to ${emails.length} subscribers`);
          } else {
            console.log('ℹ️ No subscribers to notify');
          }
        } catch (emailError) {
          console.error('❌ Failed to send blog notifications:', emailError);
          // Don't fail the blog creation if email fails
        }
      }

      return NextResponse.json({ 
        success: true, 
        id: result.lastInsertRowid,
        message: 'تم إنشاء المقال بنجاح'
      }, { 
        headers: corsHeaders 
      });
    } catch (dbError) {
      console.error('❌ Database error:', dbError);
      throw dbError;
    }
  } catch (error) {
    console.error('❌ Blog creation error:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return NextResponse.json({ 
      success: false,
      error: 'فشل في إنشاء المقال', 
      details: error instanceof Error ? error.message : 'خطأ غير معروف',
      stack: error instanceof Error ? error.stack : undefined
    }, { 
      status: 500,
      headers: corsHeaders 
    });
  }
}
