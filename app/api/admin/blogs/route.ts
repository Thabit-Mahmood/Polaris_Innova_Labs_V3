import { NextRequest, NextResponse } from 'next/server';
import { queries } from '@/lib/database';
import { sendBlogNotification } from '@/lib/email';

export async function GET() {
  try {
    const blogs = queries.getAllBlogs(false);
    return NextResponse.json({ blogs });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = queries.insertBlog(body);

    // If blog is published, send notifications to subscribers
    if (body.published) {
      try {
        const subscribers = queries.getAllSubscribers() as any[];
        const emails = subscribers.map(sub => sub.email);

        if (emails.length > 0) {
          await sendBlogNotification(emails, {
            title: body.title,
            excerpt: body.excerpt,
            slug: body.slug,
            image_url: body.image_url,
          });
          console.log(`✅ Sent blog notifications to ${emails.length} subscribers`);
        }
      } catch (emailError) {
        console.error('Failed to send blog notifications:', emailError);
        // Don't fail the blog creation if email fails
      }
    }

    return NextResponse.json({ success: true, id: result.lastInsertRowid });
  } catch (error) {
    console.error('Blog creation error:', error);
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}
