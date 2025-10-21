import { services } from '@/lib/servicesData';
import Link from 'next/link';
import { FaCheckCircle, FaArrowLeft } from 'react-icons/fa';

export const metadata = {
  title: 'خدماتنا - Polaris Innova Labs',
  description: '10 أنواع من المواقع الاحترافية: متاجر إلكترونية، مواقع شركات، منصات تعليمية، وأكثر',
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-dark-400 pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-dark-400 via-dark-300 to-dark-400 relative overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow"></div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-slide-up">
            <span className="text-primary font-bold text-sm uppercase tracking-wider font-cairo mb-4 block">
              خدماتنا
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-cairo">
              10 أنواع من <span className="gradient-text">المواقع الاحترافية</span>
            </h1>
            <p className="text-xl text-gray-300 font-tajawal leading-relaxed">
              حلول تقنية متكاملة لجميع أنواع الأعمال
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-dark-300">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className="glass rounded-xl p-6 hover:border-primary/50 transition-all duration-300 group card-hover flex flex-col scroll-mt-24"
              >
                {/* Header */}
                <div className="flex items-center space-x-3 space-x-reverse mb-4">
                  <div className="text-4xl">{service.icon}</div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-white group-hover:text-primary transition-colors font-cairo">
                      {service.title}
                    </h2>
                    <p className="text-xs text-gray-500 font-tajawal">{service.subtitle}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-400 font-tajawal leading-relaxed text-sm mb-4 flex-grow">
                  {service.description}
                </p>

                {/* Key Features - Only 3 */}
                <div className="space-y-2 mb-4">
                  {service.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-2 space-x-reverse text-gray-400 font-tajawal text-xs">
                      <FaCheckCircle className="text-primary mt-0.5 flex-shrink-0 text-sm" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.technologies.slice(0, 2).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-dark-200 text-primary text-xs rounded-full font-tajawal border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                  {service.technologies.length > 2 && (
                    <span className="px-2 py-1 bg-dark-200 text-gray-500 text-xs rounded-full font-tajawal">
                      +{service.technologies.length - 2}
                    </span>
                  )}
                </div>

                {/* CTA */}
                <Link
                  href="/#contact"
                  className="btn-outline inline-flex items-center justify-center space-x-2 space-x-reverse w-full text-sm group"
                >
                  <span>احصل على عرض سعر</span>
                  <FaArrowLeft className="group-hover:translate-x-1 transition-transform text-xs" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-padding bg-dark-400">
        <div className="container-custom">
          <div className="glass rounded-2xl p-12 text-center max-w-4xl mx-auto border-primary/20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-cairo">
              لم تجد ما تبحث عنه؟
            </h2>
            <p className="text-xl text-gray-300 font-tajawal mb-8 leading-relaxed">
              نحن نقدم حلول مخصصة لكل احتياجاتك. تواصل معنا وأخبرنا عن مشروعك.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
              <Link href="/#contact" className="btn-primary">
                تواصل معنا الآن
              </Link>
              <Link href="/" className="btn-outline">
                العودة للرئيسية
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
