'use client';

import { useState, useEffect } from 'react';
import { services } from '@/lib/servicesData';
import Link from 'next/link';
import { FaArrowLeft, FaRocket } from 'react-icons/fa';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const handleNext = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % services.length);
      setIsAnimating(false);
    }, 300);
  };

  const handlePrev = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
      setIsAnimating(false);
    }, 300);
  };

  const currentService = services[currentSlide];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-dark-400 via-dark-300 to-dark-400 pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8 animate-slide-right">
            {/* Main Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-cairo leading-tight">
              <span className="text-white">تطوير مواقع</span>
              <br />
              <span className="gradient-text">احترافية وسريعة</span>
            </h1>

            {/* Dynamic Subtitle */}
            <div
              className={`transition-all duration-300 ${
                isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
              }`}
            >
              <div className="flex items-center space-x-3 space-x-reverse mb-4">
                <span className="text-4xl">{currentService.icon}</span>
                <h2 className="text-2xl md:text-3xl font-bold text-white font-cairo">
                  {currentService.title}
                </h2>
              </div>
              <p className="text-xl md:text-2xl text-primary font-tajawal font-bold">
                {currentService.heroText}
              </p>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-300 font-tajawal leading-relaxed max-w-2xl">
              نقدم مواقع احترافية مخصصة باستخدام أحدث التقنيات. توفير في التكلفة 40-70٪ مع باقات بأسعار ثابتة وجودة عالمية.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse pt-4">
              <Link href="/#contact" className="btn-primary flex items-center space-x-2 space-x-reverse group w-full sm:w-auto justify-center">
                <FaRocket className="group-hover:animate-bounce" />
                <span>ابدأ مشروعك الآن</span>
              </Link>

              <Link href="/services" className="btn-outline w-full sm:w-auto flex items-center justify-center space-x-2 space-x-reverse group">
                <span>اكتشف خدماتنا</span>
                <FaArrowLeft className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Side - Service Carousel */}
          <div className="relative animate-slide-left">
            <div className="relative">
              {/* Main Card */}
              <div
                className={`glass rounded-2xl p-8 border-glow transition-all duration-300 ${
                  isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-6xl">{currentService.icon}</span>
                  <span className="text-sm text-gray-400 font-tajawal">
                    {currentSlide + 1} / {services.length}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2 font-cairo">
                  {currentService.title}
                </h3>
                <p className="text-sm text-gray-400 mb-4 font-tajawal">
                  {currentService.subtitle}
                </p>
                <p className="text-gray-300 font-tajawal leading-relaxed">
                  {currentService.description}
                </p>

                {/* Features Preview */}
                <div className="mt-6 space-y-2">
                  {currentService.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 space-x-reverse text-sm text-gray-400 font-tajawal">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center justify-center space-x-4 space-x-reverse mt-8">
                <button
                  onClick={handlePrev}
                  className="w-12 h-12 rounded-full bg-dark-200 hover:bg-primary hover:text-dark-400 text-white transition-all flex items-center justify-center group"
                  aria-label="السابق"
                >
                  <FaArrowLeft className="transform rotate-180 group-hover:scale-110 transition-transform" />
                </button>

                {/* Dots */}
                <div className="flex items-center space-x-2 space-x-reverse">
                  {services.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === currentSlide
                          ? 'w-8 bg-primary'
                          : 'w-2 bg-gray-600 hover:bg-gray-500'
                      }`}
                      aria-label={`الشريحة ${index + 1}`}
                    ></button>
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="w-12 h-12 rounded-full bg-dark-200 hover:bg-primary hover:text-dark-400 text-white transition-all flex items-center justify-center group"
                  aria-label="التالي"
                >
                  <FaArrowLeft className="group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
