'use client';

import { useState } from 'react';
import { FaRobot, FaUser } from 'react-icons/fa';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: 'كم تستغرق مدة تطوير الموقع؟',
    answer: 'عادةً نسلم المواقع خلال 7-14 يوم عمل حسب حجم المشروع. نحن نلتزم 100٪ بالمواعيد المتفق عليها ونستخدم أساليب التطوير السريع لضمان جودة عالية في وقت قياسي.',
    category: 'عام'
  },
  {
    id: 2,
    question: 'كم تكلفة تطوير موقع إلكتروني؟',
    answer: 'التكلفة تعتمد على نوع الموقع والمميزات المطلوبة. نحن نوفر 40-70٪ من التكلفة مقارنة بالشركات التقليدية، مع باقات بأسعار ثابتة لكل نوع موقع. تواصل معنا للحصول على عرض سعر مخصص.',
    category: 'تسعير'
  },
  {
    id: 3,
    question: 'هل المواقع آمنة ضد الاختراق؟',
    answer: 'نعم! جميع مواقعنا محمية 100٪ ضد SQL Injection و XSS وجميع الهجمات الأمنية الشائعة. نستخدم أحدث معايير الأمان وننفذ Rate Limiting والتحقق من المدخلات والتشفير.',
    category: 'تقني'
  },
  {
    id: 4,
    question: 'هل تقدمون الدعم بعد التسليم؟',
    answer: 'بالتأكيد! نقدم دعم فني متواصل 24/7. كما نوفر صيانة دورية وتحديثات وتطويرات مستقبلية حسب احتياجاتك.',
    category: 'دعم'
  },
  {
    id: 5,
    question: 'ما التقنيات التي تستخدمونها؟',
    answer: 'نستخدم أحدث التقنيات: Next.js 14، React 18، TypeScript، Tailwind CSS، Node.js. هذه التقنيات تضمن موقع سريع وآمن ومستقبلي.',
    category: 'تقني'
  },
  {
    id: 6,
    question: 'هل المواقع متجاوبة على الموبايل؟',
    answer: 'نعم 100٪! جميع مواقعنا متجاوبة بالكامل وتعمل بشكل مثالي على الموبايل والتابلت والحاسوب. نختبر كل موقع على جميع الأجهزة قبل التسليم.',
    category: 'تقني'
  },
  {
    id: 7,
    question: 'هل يمكنني تعديل الموقع بنفسي لاحقاً؟',
    answer: 'نعم! نوفر لوحة تحكم سهلة الاستخدام لتحديث المحتوى والصور والمنتجات بدون الحاجة لمعرفة برمجية. كما نقدم تدريب مجاني على استخدام اللوحة.',
    category: 'عام'
  },
  {
    id: 8,
    question: 'هل تساعدون في تحسين SEO؟',
    answer: 'بالطبع! جميع مواقعنا مُحسّنة لمحركات البحث من البداية. نستخدم أفضل ممارسات SEO لضمان ظهورك في نتائج جوجل الأولى.',
    category: 'تسويق'
  }
];

export default function FAQChatbot() {
  const [messages, setMessages] = useState<Array<{type: 'bot' | 'user' | 'typing', text: string}>>([
    { type: 'bot', text: 'مرحباً! أنا مساعد Polaris Innova Labs\n\nكيف يمكنني مساعدتك؟ اختر سؤالك من الأسئلة أدناه:' }
  ]);

  const handleQuestionClick = (faq: FAQ) => {
    // Clear chat and add user message
    setMessages([
      { type: 'user', text: faq.question }
    ]);

    // Show typing indicator
    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'typing', text: '' }]);
    }, 800);

    // Remove typing and add bot response
    setTimeout(() => {
      setMessages(prev => prev.filter(m => m.type !== 'typing').concat({ type: 'bot', text: faq.answer }));
    }, 2500);
  };

  return (
    <section id="faq" className="section-padding bg-dark-400 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <span className="text-primary font-bold text-sm uppercase tracking-wider font-cairo mb-4 block">
            الأسئلة الشائعة
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-cairo">
            لديك <span className="gradient-text">أسئلة؟</span> نحن هنا!
          </h2>
          <p className="text-lg text-gray-400 font-tajawal leading-relaxed">
            تحدث مع مساعدنا الذكي للحصول على إجابات فورية
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Chatbot Interface */}
          <div className="glass rounded-2xl p-6 border-primary/30">
            {/* Chat Messages */}
            <div className="h-[400px] overflow-y-auto mb-6 space-y-4 scroll-smooth">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-3 space-x-reverse animate-slide-up ${
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.type === 'bot' && (
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <FaRobot className="text-dark-400 text-xl" />
                    </div>
                  )}

                  {message.type === 'typing' && (
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <FaRobot className="text-dark-400 text-xl" />
                    </div>
                  )}

                  {message.type === 'typing' ? (
                    <div className="bg-dark-200 text-white border border-primary/20 px-4 py-3 rounded-2xl">
                      <div className="flex gap-1.5 items-center justify-center">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                        message.type === 'bot'
                          ? 'bg-dark-200 text-white border border-primary/20'
                          : 'bg-primary text-dark-400'
                      }`}
                    >
                      <p className="font-tajawal leading-relaxed whitespace-pre-line">
                        {message.text}
                      </p>
                    </div>
                  )}

                  {message.type === 'user' && (
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 border-2 border-primary">
                      <FaUser className="text-primary" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Question Tags */}
            <div className="pt-4 border-t border-gray-800">
              <div className="flex flex-wrap gap-2 justify-center">
                {faqs.map((faq) => (
                  <button
                    key={faq.id}
                    onClick={() => handleQuestionClick(faq)}
                    className="px-3 py-1.5 rounded-full bg-dark-200 text-gray-300 hover:bg-primary hover:text-dark-400 transition-all text-xs font-tajawal border border-primary/20 hover:border-primary"
                  >
                    {faq.question}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact CTA - Wider */}
          <div className="mt-12 glass rounded-2xl p-10 text-center border-primary/20 max-w-3xl mx-auto">
            <p className="text-2xl text-white font-cairo font-bold mb-4">
              هل لديك أسئلة؟ تواصل معنا عبر واتساب! 👋
            </p>
            <p className="text-gray-400 font-tajawal mb-6">
              فريقنا جاهز للرد على استفساراتك في أي وقت
            </p>
            <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer" className="btn-primary inline-block">
              تواصل معنا الآن عبر واتساب
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
