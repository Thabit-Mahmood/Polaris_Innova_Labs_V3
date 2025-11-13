'use client';

import { useState } from 'react';
import { FaEnvelope, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { services } from '@/lib/servicesData';

// TEMPORARY HIDE: WhatsApp and Phone contact info
// To show again, uncomment the imports and sections below
// import { FaWhatsapp, FaPhone } from 'react-icons/fa';

// Common industry sectors in Saudi Arabia and Gulf region
const industrySectors = [
  'التجزئة والتجارة الإلكترونية',
  'الخدمات المالية والبنوك',
  'الرعاية الصحية والطب',
  'التعليم والتدريب',
  'العقارات والإنشاءات',
  'الضيافة والسياحة',
  'النفط والغاز والطاقة',
  'التصنيع والإنتاج',
  'النقل واللوجستيات',
  'التقنية والاتصالات',
  'الأغذية والمشروبات',
  'الأزياء والجمال',
  'الخدمات المهنية والاستشارات',
  'الإعلام والترفيه',
  'المنظمات غير الربحية',
  'أخرى',
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    industrySector: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhoneChange = (value: string | undefined) => {
    setFormData({
      ...formData,
      phone: value || '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    // Validate that at least email or phone is provided
    if (!formData.email && !formData.phone) {
      setSubmitStatus('error');
      setErrorMessage('يرجى إدخال البريد الإلكتروني أو رقم الهاتف على الأقل');
      setIsSubmitting(false);
      return;
    }

    try {
      // Extract country code and phone number
      let countryCode = '';
      let phoneNumber = '';
      
      if (formData.phone) {
        // Phone is in E.164 format (e.g., +966501234567)
        const match = formData.phone.match(/^(\+\d{1,4})(.*)$/);
        if (match) {
          countryCode = match[1];
          phoneNumber = match[2];
        } else {
          phoneNumber = formData.phone;
        }
      }

      const submitData = {
        name: formData.name.trim(),
        email: formData.email.trim() || undefined,
        countryCode: countryCode || undefined,
        phone: phoneNumber || undefined,
        service: formData.service.trim() || undefined,
        industrySector: formData.industrySector.trim() || undefined,
        message: formData.message.trim(),
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          industrySector: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
        // Show detailed validation errors if available
        if (data.details && data.details.length > 0) {
          const errorMessages = data.details.map((err: any) => err.message).join(', ');
          setErrorMessage(errorMessages);
        } else {
          setErrorMessage(data.error || 'حدث خطأ أثناء إرسال الرسالة');
        }
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-dark-300 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <span className="text-primary font-bold text-sm uppercase tracking-wider font-cairo mb-4 block">
            تواصل معنا
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-cairo">
            جاهز لبدء <span className="gradient-text">مشروعك؟</span>
          </h2>
          <p className="text-lg text-gray-400 font-tajawal leading-relaxed">
            دعنا نناقش مشروعك ونحوّل فكرتك إلى واقع رقمي يحقق نتائج حقيقية
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Info - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* TEMPORARY HIDE: WhatsApp Contact */}
            {/* Uncomment to show WhatsApp contact info
            <div className="glass rounded-xl p-6 hover:border-primary/50 transition-all group cursor-pointer">
              <a
                href="https://wa.me/966540768136"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start space-x-4 space-x-reverse"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl group-hover:bg-primary group-hover:text-dark-400 transition-all">
                  <FaWhatsapp />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2 font-cairo group-hover:text-primary transition-colors">
                    واتساب
                  </h3>
                  <p className="text-gray-400 font-tajawal mb-3">
                    تواصل معنا مباشرة عبر واتساب - نرد خلال دقائق
                  </p>
                  <span className="text-primary font-bold font-cairo">
                    ابدأ المحادثة →
                  </span>
                </div>
              </a>
            </div>
            */}

            {/* Email */}
            <div className="glass rounded-xl p-6 hover:border-primary/50 transition-all group">
              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl group-hover:bg-primary group-hover:text-dark-400 transition-all">
                  <FaEnvelope />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2 font-cairo">
                    البريد الإلكتروني
                  </h3>
                  <p className="text-gray-400 font-tajawal mb-2">
                    راسلنا عبر البريد الإلكتروني
                  </p>
                  <a
                    href="mailto:services@polaris-innova-labs.com"
                    className="text-primary font-bold font-tajawal hover:underline"
                  >
                    services@polaris-innova-labs.com
                  </a>
                </div>
              </div>
            </div>

            {/* TEMPORARY HIDE: Phone Contact */}
            {/* Uncomment to show phone contact info
            <div className="glass rounded-xl p-6 hover:border-primary/50 transition-all group">
              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl group-hover:bg-primary group-hover:text-dark-400 transition-all">
                  <FaPhone />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2 font-cairo">
                    الهاتف
                  </h3>
                  <p className="text-gray-400 font-tajawal mb-2">
                    اتصل بنا مباشرة
                  </p>
                  <a
                    href="tel:+966540768136"
                    className="text-primary font-bold font-tajawal hover:underline"
                    dir="ltr"
                  >
                    +966 54 076 8136
                  </a>
                </div>
              </div>
            </div>
            */}

            {/* Trust Badge */}
            <div className="glass rounded-xl p-6 bg-primary/5 border-primary/30">
              <p className="text-lg text-primary font-cairo font-bold text-center leading-relaxed">
                البرمجة ١٠٪ بس من المعادلة الكلية — نحنا نصمّم نتائج أعمال، مو بس كود
              </p>
            </div>
          </div>

          {/* Contact Form - 3 columns */}
          <div className="lg:col-span-3">
            <div className="glass rounded-2xl p-8 border-glow">
              {submitStatus === 'success' ? (
                <div className="text-center py-12 animate-burst">
                  <FaCheckCircle className="text-6xl text-primary mx-auto mb-6" />
                  <h3 className="text-3xl font-bold text-white mb-4 font-cairo">
                    شكراً لتواصلك! 🎉
                  </h3>
                  <p className="text-lg text-gray-300 font-tajawal mb-8">
                    تم استلام رسالتك بنجاح. سنتواصل معك في أقرب وقت ممكن (عادةً خلال 24 ساعة).
                  </p>
                  <button
                    onClick={() => setSubmitStatus('idle')}
                    className="btn-outline"
                  >
                    إرسال رسالة أخرى
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-white font-cairo font-bold mb-2">
                      الاسم <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      minLength={2}
                      maxLength={100}
                      className="w-full px-4 py-3 rounded-lg bg-dark-200 text-white border border-gray-700 focus:border-primary focus:outline-none font-tajawal"
                      placeholder="اسمك الكامل"
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-white font-cairo font-bold mb-2">
                        البريد الإلكتروني
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-dark-200 text-white border border-gray-700 focus:border-primary focus:outline-none font-tajawal"
                        placeholder="email@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-white font-cairo font-bold mb-2">
                        رقم الهاتف
                      </label>
                      <PhoneInput
                        international
                        defaultCountry="SA"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        className="phone-input-custom"
                        placeholder="أدخل رقم الهاتف"
                        numberInputProps={{
                          className: 'w-full px-4 py-3 rounded-lg bg-dark-200 text-white border border-gray-700 focus:border-primary focus:outline-none font-tajawal'
                        }}
                      />
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 font-tajawal -mt-3">
                    * يرجى إدخال البريد الإلكتروني أو رقم الهاتف على الأقل
                  </p>

                  {/* Service Selection & Industry Sector */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="service" className="block text-white font-cairo font-bold mb-2">
                        نوع الخدمة المطلوبة
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-dark-200 text-white border border-gray-700 focus:border-primary focus:outline-none font-tajawal max-h-48 overflow-y-auto"
                      >
                        <option value="">اختر نوع الخدمة</option>
                        {services.map((service) => (
                          <option key={service.id} value={service.title}>
                            {service.icon} {service.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="industrySector" className="block text-white font-cairo font-bold mb-2">
                        القطاع الصناعي
                      </label>
                      <select
                        id="industrySector"
                        name="industrySector"
                        value={formData.industrySector}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-dark-200 text-white border border-gray-700 focus:border-primary focus:outline-none font-tajawal max-h-48 overflow-y-auto"
                      >
                        <option value="">اختر القطاع الصناعي</option>
                        {industrySectors.map((sector, index) => (
                          <option key={index} value={sector}>
                            {sector}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-white font-cairo font-bold mb-2">
                      رسالتك <span className="text-primary">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      minLength={5}
                      maxLength={2000}
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg bg-dark-200 text-white border border-gray-700 focus:border-primary focus:outline-none font-tajawal resize-none"
                      placeholder="أخبرنا عن مشروعك وأهدافك..."
                    ></textarea>
                  </div>

                  {/* Error Message */}
                  {submitStatus === 'error' && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                      <p className="text-red-400 font-tajawal">{errorMessage}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full flex items-center justify-center space-x-2 space-x-reverse disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="loading"></div>
                        <span>جاري الإرسال...</span>
                      </>
                    ) : (
                      <>
                        <FaPaperPlane />
                        <span>إرسال الرسالة</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-sm text-gray-500 font-tajawal">
                    بإرسال هذا النموذج، أنت توافق على سياسة الخصوصية الخاصة بنا
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .phone-input-custom {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .phone-input-custom .PhoneInputCountry {
          padding: 0.75rem;
          background-color: #1a1a1a;
          border: 1px solid #374151;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .phone-input-custom .PhoneInputCountry:hover {
          border-color: #daff00;
        }

        .phone-input-custom .PhoneInputCountryIcon {
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 0.25rem;
          overflow: hidden;
        }

        .phone-input-custom .PhoneInputCountryIcon img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .phone-input-custom .PhoneInputCountrySelect {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }

        .phone-input-custom .PhoneInputCountrySelectArrow {
          color: #9ca3af;
          margin-left: 0.25rem;
          font-size: 0.75rem;
        }

        .phone-input-custom input {
          flex: 1;
        }

        .phone-input-custom .PhoneInputInput {
          background-color: #1a1a1a !important;
          color: white !important;
          border: 1px solid #374151 !important;
          border-radius: 0.5rem !important;
          padding: 0.75rem 1rem !important;
          font-family: 'Tajawal', sans-serif !important;
          width: 100% !important;
        }

        .phone-input-custom .PhoneInputInput:focus {
          border-color: #daff00 !important;
          outline: none !important;
        }

        .phone-input-custom .PhoneInputInput::placeholder {
          color: #6b7280;
        }
      `}</style>
    </section>
  );
}
