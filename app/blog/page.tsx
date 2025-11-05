import Link from 'next/link';
import { queries } from '@/lib/database';
import { FaCalendar, FaUser, FaArrowLeft } from 'react-icons/fa';

export const metadata = {
  title: 'المدونة - Polaris Innova Labs',
  description: 'اقرأ آخر المقالات والنصائح التقنية حول تطوير المواقع والتطبيقات',
};

export default function BlogPage() {
  const blogs = queries.getAllBlogs(true) as any[];

  return (
    <main className="min-h-screen bg-dark-400">
      {/* Hero */}
      <section className="section-padding bg-gradient-to-b from-dark-300 to-dark-400">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-cairo">
              <span className="gradient-text">المدونة</span>
            </h1>
            <p className="text-xl text-gray-300 font-tajawal">
              مقالات ونصائح تقنية لمساعدتك في بناء مشروعك الرقمي
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="section-padding">
        <div className="container-custom">
          {blogs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-400 font-tajawal">لا توجد مقالات حالياً</p>
              <p className="text-gray-500 font-tajawal mt-4">تابعنا للحصول على آخر المقالات</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog: any) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  className="glass rounded-xl overflow-hidden hover:border-primary/50 transition-all group"
                >
                  {blog.image_url && (
                    <div className="aspect-video bg-dark-200 overflow-hidden">
                      <img
                        src={blog.image_url}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-white mb-3 font-cairo group-hover:text-primary transition-colors">
                      {blog.title}
                    </h2>
                    <p className="text-gray-400 font-tajawal mb-4 line-clamp-3">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 font-tajawal">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <FaUser className="text-primary" />
                        <span>{blog.author}</span>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <FaCalendar className="text-primary" />
                        <span dir="ltr">{new Date(blog.created_at).toLocaleDateString('ar-SA')}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-primary font-cairo font-bold group-hover:gap-2 transition-all">
                      <span>اقرأ المزيد</span>
                      <FaArrowLeft className="text-sm" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
