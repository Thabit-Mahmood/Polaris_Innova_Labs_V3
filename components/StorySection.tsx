'use client';

import { useEffect, useRef, useState } from 'react';

export default function StorySection() {
  const [visibleParagraphs, setVisibleParagraphs] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Reveal paragraphs one by one
          [0, 1, 2, 3].forEach((index) => {
            setTimeout(() => {
              setVisibleParagraphs((prev) => [...prev, index]);
            }, index * 400);
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

  const paragraphs = [
    {
      text: 'بدأنا Polaris Innova Labs من إيمان بسيط: ',
      highlight: 'كل شركة تستحق موقع إلكتروني احترافي يحقق نتائج حقيقية',
      rest: '، بغض النظر عن حجم ميزانيتها.',
    },
    {
      text: 'رأينا الكثير من الشركات تدفع أموال طائلة للحصول على ',
      highlight: 'مواقع بطيئة وغير آمنة ولا تحقق أي عائد',
      rest: '. قررنا تغيير هذا الواقع.',
    },
    {
      text: 'نستخدم ',
      highlight: 'أحدث التقنيات ومنهجيات التطوير السريع',
      rest: ' لنقدم لك موقع احترافي بجودة عالمية وتكلفة معقولة. نوفر لك 40-70٪ من التكلفة دون المساومة على الجودة أو الأمان.',
    },
    {
      text: '',
      highlight: 'البرمجة عندنا هي 10٪ فقط من المعادلة',
      rest: ' - نحن نصمم نتائج أعمال، ليس فقط كود.',
    },
  ];

  return (
    <section ref={sectionRef} className="section-padding bg-dark-300">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 font-cairo text-center">
            قصتنا
          </h2>
          <div className="space-y-8">
            {paragraphs.map((para, index) => (
              <p
                key={index}
                className={`text-2xl md:text-3xl text-gray-300 font-tajawal leading-relaxed transition-all duration-1000 ${
                  visibleParagraphs.includes(index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {para.text}
                <span className="text-primary font-bold">{para.highlight}</span>
                {para.rest}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
