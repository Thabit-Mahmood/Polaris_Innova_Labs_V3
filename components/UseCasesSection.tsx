'use client';

import { useState, useEffect, useRef } from 'react';
import { services } from '@/lib/servicesData';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export default function UseCasesSection() {
  const [selectedService, setSelectedService] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isAutoScrolling) {
      scrollIntervalRef.current = setInterval(() => {
        setSelectedService((prev) => (prev + 1) % services.length);
      }, 5000);
    }

    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, [isAutoScrolling]);

  const handleServiceSelect = (index: number) => {
    setSelectedService(index);
    setIsAutoScrolling(false);
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
    }
  };

  return (
    <section id="use-cases" className="section-padding bg-dark-300 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <span className="text-primary font-bold text-sm uppercase tracking-wider font-cairo mb-4 block">
            حلول لكل مشكلة
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-cairo">
            مشاكل حقيقية. <span className="gradient-text">حلول مبتكرة</span>
          </h2>
          <p className="text-lg text-gray-400 font-tajawal leading-relaxed">
            نفهم التحديات التي تواجهها. إليك كيف نحوّل مشكلتك إلى فرصة نجاح.
          </p>
        </div>

        {/* Service Selector - Compact Pills */}
        <div className="mb-12 flex justify-center">
          <div className="inline-flex flex-wrap gap-3 justify-center max-w-4xl">
            {services.map((service, index) => (
              <button
                key={index}
                onClick={() => handleServiceSelect(index)}
                className={`px-4 py-2 rounded-full font-cairo font-bold transition-all text-sm ${
                  selectedService === index
                    ? 'bg-primary text-dark-400 shadow-lg scale-105'
                    : 'bg-dark-200 text-gray-400 hover:bg-dark-100 hover:text-white'
                }`}
              >
                <span className="ml-1">{service.icon}</span>
                {service.title}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Service Content - Auto-scroll */}
        <div className="max-w-6xl mx-auto">
          {/* Business Type Badge */}
          <div className="text-center mb-8">
            <span className="inline-block bg-primary/10 text-primary px-6 py-3 rounded-lg font-cairo font-bold text-xl border-2 border-primary/30">
              {services[selectedService].icon} {services[selectedService].title}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Problem Side */}
            <div className="glass rounded-2xl p-6 border-2 border-red-500/30 h-full transform transition-all duration-500 hover:scale-105">
              <div className="flex items-center space-x-3 space-x-reverse mb-4">
                <FaTimesCircle className="text-3xl text-red-500 flex-shrink-0" />
                <h3 className="text-xl font-bold text-white font-cairo">المشكلة</h3>
              </div>

              <p className="text-lg text-gray-300 font-tajawal leading-relaxed">
                {services[selectedService].problem}
              </p>
            </div>

            {/* Solution Side */}
            <div className="glass rounded-2xl p-6 border-2 border-primary/30 glow-primary h-full transform transition-all duration-500 hover:scale-105">
              <div className="flex items-center space-x-3 space-x-reverse mb-4">
                <FaCheckCircle className="text-3xl text-primary flex-shrink-0" />
                <h3 className="text-xl font-bold text-white font-cairo">الحل</h3>
              </div>

              <p className="text-lg text-gray-300 font-tajawal leading-relaxed mb-6">
                {services[selectedService].solution}
              </p>

              <a
                href="/#contact"
                className="btn-primary inline-block text-center w-full"
              >
                احصل على الحل الآن
              </a>
            </div>
          </div>

          {/* Auto-scroll Indicator */}
          <div className="flex items-center justify-center mt-8 space-x-2 space-x-reverse">
            {services.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  index === selectedService
                    ? 'w-12 bg-primary'
                    : 'w-1.5 bg-gray-600'
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center glass rounded-2xl p-8 max-w-3xl mx-auto animate-fade-in">
          <p className="text-2xl text-primary font-cairo font-bold mb-4">
            البرمجة ١٠٪ بس من المعادلة الكلية
          </p>
          <p className="text-lg text-gray-300 font-tajawal">
            نحنا نصمّم نتائج أعمال، مو بس كود. نحل مشاكلك الحقيقية بحلول تقنية مبتكرة.
          </p>
        </div>
      </div>
    </section>
  );
}
