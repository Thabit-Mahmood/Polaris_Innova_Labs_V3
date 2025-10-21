'use client';

import { engineeringProcess } from '@/lib/servicesData';
import { useState, useEffect, useRef } from 'react';

export default function EngineeringProcessSection() {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Reveal steps one by one
          engineeringProcess.forEach((_, index) => {
            setTimeout(() => {
              setVisibleSteps((prev) => [...prev, index]);
            }, index * 200);
          });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} id="process" className="section-padding bg-dark-400 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <span className="text-primary font-bold text-sm uppercase tracking-wider font-cairo mb-4 block">
            عملية احترافية
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-cairo">
            رحلتنا معك من <span className="gradient-text">الفكرة إلى الإطلاق</span>
          </h2>
          <p className="text-lg text-gray-400 font-tajawal leading-relaxed">
            عملية منظمة وشفافة من 7 خطوات تضمن لك الحصول على موقع احترافي يحقق أهدافك
          </p>
        </div>

        {/* Process Steps - Desktop View */}
        <div className="hidden lg:block relative">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-l from-primary/0 via-primary/30 to-primary/0 transform -translate-y-1/2"></div>

          <div className="grid grid-cols-7 gap-4 relative">
            {engineeringProcess.map((step, index) => (
              <div
                key={index}
                className={`relative transition-all duration-700 ${
                  visibleSteps.includes(index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Step Circle */}
                <div className="flex flex-col items-center group">
                  <div
                    className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl mb-4 transition-all duration-300 cursor-pointer border-2 border-primary/30 group-hover:bg-primary group-hover:text-dark-400 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-primary/50 ${
                      visibleSteps.includes(index)
                        ? 'bg-dark-200'
                        : 'bg-dark-200 opacity-50'
                    }`}
                  >
                    {step.icon}
                  </div>

                  {/* Step Number */}
                  <div
                    className="w-8 h-8 rounded-full bg-dark-300 text-primary border border-primary/30 flex items-center justify-center font-bold mb-2 group-hover:bg-primary group-hover:text-dark-400 transition-all"
                  >
                    {step.step}
                  </div>

                  {/* Step Title */}
                  <h3
                    className="text-center font-cairo font-bold mb-3 text-white group-hover:text-primary transition-colors"
                  >
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-400 font-tajawal text-center leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Steps - Mobile/Tablet View */}
        <div className="lg:hidden space-y-6">
          {engineeringProcess.map((step, index) => (
            <div
              key={index}
              className={`glass rounded-xl p-6 hover:border-primary/50 transition-all cursor-pointer group ${
                visibleSteps.includes(index)
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms`, transition: 'all 0.7s ease-out' }}
            >
              <div className="flex items-start space-x-4 space-x-reverse">
                {/* Icon & Number */}
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-16 h-16 rounded-full bg-dark-200 border-2 border-primary/30 flex items-center justify-center text-3xl group-hover:bg-primary group-hover:text-dark-400 transition-all">
                    {step.icon}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-dark-300 text-primary border border-primary/30 flex items-center justify-center font-bold text-sm group-hover:bg-primary group-hover:text-dark-400 transition-all">
                    {step.step}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-3 font-cairo group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 font-tajawal leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass rounded-xl p-6 text-center hover:border-primary/50 transition-all group">
            <div className="text-4xl mb-3">⚡</div>
            <div className="text-3xl font-bold text-primary mb-2 font-cairo">تسليم سريع</div>
            <div className="text-gray-400 font-tajawal">جودة عالية في وقت قياسي</div>
          </div>

          <div className="glass rounded-xl p-6 text-center hover:border-primary/50 transition-all group">
            <div className="text-4xl mb-3">🎯</div>
            <div className="text-3xl font-bold text-primary mb-2 font-cairo">100%</div>
            <div className="text-gray-400 font-tajawal">الالتزام بالمواعيد</div>
          </div>

          <div className="glass rounded-xl p-6 text-center hover:border-primary/50 transition-all group">
            <div className="text-4xl mb-3">💎</div>
            <div className="text-3xl font-bold text-primary mb-2 font-cairo">جودة عالمية</div>
            <div className="text-gray-400 font-tajawal">بمعايير دولية</div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a href="/#contact" className="btn-primary inline-block">
            جاهز للبدء؟ دعنا نبدأ رحلتك الآن
          </a>
        </div>
      </div>
    </section>
  );
}
