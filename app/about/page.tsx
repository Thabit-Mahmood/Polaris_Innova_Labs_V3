import Link from 'next/link';
import { FaRocket, FaUsers, FaLightbulb, FaHeart, FaCheckCircle } from 'react-icons/fa';
import StorySection from '@/components/StorySection';

export const metadata = {
  title: 'من نحن - Polaris Innova Labs',
  description: 'شركة تطوير مواقع احترافية في السعودية - نقدم حلول تقنية متكاملة بأحدث التقنيات',
};

export default function AboutPage() {
  const values = [
    {
      icon: <FaRocket className="text-4xl" />,
      title: 'الابتكار',
      description: 'نستخدم أحدث التقنيات ونبتكر حلول إبداعية لكل تحدي',
    },
    {
      icon: <FaUsers className="text-4xl" />,
      title: 'التركيز على العميل',
      description: 'نجاحك هو نجاحنا - نضع أهدافك في قلب كل قرار نتخذه',
    },
    {
      icon: <FaLightbulb className="text-4xl" />,
      title: 'الجودة',
      description: 'لا نساوم على الجودة مهما كان الموعد النهائي',
    },
    {
      icon: <FaHeart className="text-4xl" />,
      title: 'الشغف',
      description: 'نحب ما نفعله ونستمتع بتحويل الأفكار إلى واقع',
    },
  ];

  const whyUs = [
    'فريق محترف من المطورين والمصممين المتخصصين',
    'استخدام أحدث التقنيات (React، Next.js، وغيرها)',
    'توفير 40-70٪ في التكلفة مقارنة بالشركات التقليدية',
    'تسليم سريع دون المساومة على الجودة',
    'دعم فني متواصل 24/7',
    'أمان متقدم وحماية ضد جميع الهجمات الإلكترونية',
    'تصميم متجاوب يعمل على جميع الأجهزة',
    'تحسين SEO احترافي للظهور في نتائج البحث الأولى',
  ];

  return (
    <div className="min-h-screen bg-dark-400 pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-dark-400 via-dark-300 to-dark-400 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow"></div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-slide-up">
            <span className="text-primary font-bold text-sm uppercase tracking-wider font-cairo mb-4 block">
              من نحن
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-cairo">
              نحن <span className="gradient-text">Polaris Innova Labs</span>
            </h1>
            <p className="text-xl text-gray-300 font-tajawal leading-relaxed mb-8">
              شركة تطوير مواقع احترافية في السعودية، نحول أفكارك إلى منتجات رقمية استثنائية
            </p>

            <div className="inline-block glass rounded-2xl p-8 border-primary/20">
              <p className="text-2xl text-primary font-cairo font-bold leading-relaxed">
                البرمجة ١٠٪ بس من المعادلة الكلية — نحنا نصمّم نتائج أعمال، مو بس كود
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section with Animations */}
      <StorySection />

      {/* Values Section */}
      <section className="section-padding bg-dark-400">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-cairo">
              قيمنا
            </h2>
            <p className="text-lg text-gray-400 font-tajawal leading-relaxed">
              القيم التي نؤمن بها وتوجه كل عمل نقوم به
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="glass rounded-xl p-8 text-center hover:border-primary/50 transition-all group card-hover"
              >
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6 group-hover:bg-primary group-hover:text-dark-400 transition-all">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 font-cairo group-hover:text-primary transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-400 font-tajawal leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="section-padding bg-dark-300">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-cairo">
              لماذا تختار <span className="gradient-text">Polaris Innova Labs</span>
            </h2>
            <p className="text-lg text-gray-400 font-tajawal leading-relaxed">
              ما يميزنا عن شركات تطوير المواقع الأخرى
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {whyUs.map((reason, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 space-x-reverse glass rounded-xl p-6 hover:border-primary/50 transition-all"
              >
                <FaCheckCircle className="text-primary text-2xl mt-1 flex-shrink-0" />
                <p className="text-gray-300 font-tajawal text-lg">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-dark-400">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl mb-4">🚀</div>
              <div className="text-4xl font-bold text-primary mb-2 font-cairo">تسليم سريع</div>
              <div className="text-gray-400 font-tajawal">جودة عالية في وقت قياسي</div>
            </div>
            <div>
              <div className="text-5xl mb-4">💰</div>
              <div className="text-4xl font-bold text-primary mb-2 font-cairo">40-70%</div>
              <div className="text-gray-400 font-tajawal">توفير في التكلفة</div>
            </div>
            <div>
              <div className="text-5xl mb-4">🎯</div>
              <div className="text-4xl font-bold text-primary mb-2 font-cairo">10+</div>
              <div className="text-gray-400 font-tajawal">أنواع المواقع</div>
            </div>
            <div>
              <div className="text-5xl mb-4">⭐</div>
              <div className="text-4xl font-bold text-primary mb-2 font-cairo">100%</div>
              <div className="text-gray-400 font-tajawal">رضا العملاء</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-dark-300">
        <div className="container-custom">
          <div className="glass rounded-2xl p-12 text-center max-w-4xl mx-auto border-primary/20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-cairo">
              جاهز لبدء مشروعك؟
            </h2>
            <p className="text-xl text-gray-300 font-tajawal mb-8 leading-relaxed">
              دعنا نحول فكرتك إلى موقع احترافي يحقق أهدافك ويزيد أرباحك
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
              <Link href="/#contact" className="btn-primary">
                ابدأ مشروعك الآن
              </Link>
              <Link href="/services" className="btn-outline">
                اكتشف خدماتنا
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
