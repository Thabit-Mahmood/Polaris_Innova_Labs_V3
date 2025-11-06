import { NextRequest, NextResponse } from 'next/server';
import { sendBlogNotification } from '@/lib/email';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { queries } = await import('@/lib/database');
  try {
    const body = await request.json();
    const blogId = parseInt(params.id);

    // Get the old blog to check if it was unpublished before
    const oldBlog = queries.getBlogBySlug(body.slug) as any;
    const wasUnpublished = oldBlog && !oldBlog.published;

    queries.updateBlog(blogId, body);

    // If blog is being published for the first time (was draft, now published)
    if (body.published && wasUnpublished) {
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
        // Don't fail the blog update if email fails
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Blog update error:', error);
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { queries } = await import('@/lib/database');
  
  try {
    queries.deleteBlog(parseInt(params.id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}
