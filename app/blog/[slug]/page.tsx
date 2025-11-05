import { queries } from '@/lib/database';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FaCalendar, FaUser, FaArrowRight } from 'react-icons/fa';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const blog = queries.getBlogBySlug(params.slug) as any;

  if (!blog || !blog.published) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-dark-400">
      {/* Header */}
      <section className="section-padding bg-gradient-to-b from-dark-300 to-dark-400">
        <div className="container-custom">
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 space-x-reverse text-primary hover:text-primary/80 transition-colors mb-8 font-cairo"
          >
            <FaArrowRight />
            <span>العودة للمدونة</span>
          </Link>

          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-cairo leading-tight">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-400 font-tajawal">
              <div className="flex items-center space-x-2 space-x-reverse">
                <FaUser className="text-primary" />
                <span>{blog.author}</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <FaCalendar className="text-primary" />
                  <span dir="ltr">{new Date(blog.created_at).toLocaleDateString('ar-SA', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse text-sm">
                  <FaCalendar className="text-primary/60" />
                  <span dir="ltr">{new Date(blog.created_at).toLocaleDateString('ar-SA-u-ca-islamic', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Main Image */}
            {blog.image_url && (
              <div className="aspect-video rounded-2xl overflow-hidden mb-12">
                <img
                  src={blog.image_url}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Article Content */}
            <div
              className="prose prose-invert prose-lg max-w-none font-tajawal"
              style={{
                direction: 'rtl',
                textAlign: 'right',
              }}
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Additional Images Gallery */}
            {blog.images && JSON.parse(blog.images).length > 1 && (
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-white mb-6 font-cairo">معرض الصور</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {JSON.parse(blog.images).map((img: string, index: number) => (
                    img !== blog.image_url && (
                      <div key={index} className="rounded-xl overflow-hidden">
                        <img
                          src={img}
                          alt={`صورة ${index + 1}`}
                          className="w-full h-64 object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-dark-300">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto glass rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4 font-cairo">
              هل أعجبك المقال؟
            </h2>
            <p className="text-lg text-gray-300 font-tajawal mb-8">
              اشترك في نشرتنا البريدية للحصول على المزيد من المقالات المفيدة
            </p>
            <Link href="/#contact" className="btn-primary inline-block">
              تواصل معنا
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
