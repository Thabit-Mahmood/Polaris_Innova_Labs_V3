import FAQChatbot from '@/components/FAQChatbot';

export const metadata = {
  title: 'الأسئلة الشائعة - Polaris Innova Labs',
  description: 'إجابات على جميع أسئلتك حول خدمات تطوير المواقع والتطبيقات. تواصل مع مساعدنا الذكي للحصول على إجابات فورية.',
};

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-dark-400">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-dark-300 to-dark-400 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>

        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <span className="text-primary font-bold text-sm uppercase tracking-wider font-cairo mb-4 block">
              مركز المساعدة
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-cairo leading-tight">
              الأسئلة <span className="gradient-text">الشائعة</span>
            </h1>
            <p className="text-xl text-gray-300 font-tajawal leading-relaxed mb-8">
              نجيب على جميع أسئلتك حول خدماتنا، الأسعار، التقنيات، والدعم الفني
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#faq-chatbot" className="btn-primary">
                ابدأ المحادثة
              </a>
              <a href="/#contact" className="btn-secondary">
                تواصل معنا
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Chatbot Section */}
      <div id="faq-chatbot">
        <FAQChatbot />
      </div>

      {/* Additional Info Section */}
      <section className="section-padding bg-dark-300">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="glass rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-cairo">
                لم تجد إجابة لسؤالك؟
              </h2>
              <p className="text-lg text-gray-300 font-tajawal mb-8 leading-relaxed">
                فريقنا متاح 24/7 للإجابة على جميع استفساراتك. تواصل معنا الآن وسنرد عليك في أقرب وقت ممكن!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/966540768136"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-lg px-8 py-4"
                >
                  تواصل عبر واتساب
                </a>
                <a
                  href="mailto:services@polaris-innova-labs.com"
                  className="btn-secondary text-lg px-8 py-4"
                >
                  راسلنا عبر البريد
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="section-padding bg-dark-400">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="glass rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2 font-cairo">24/7</div>
              <p className="text-gray-300 font-tajawal">دعم فني متواصل</p>
            </div>
            <div className="glass rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2 font-cairo">{'<'} 24h</div>
              <p className="text-gray-300 font-tajawal">وقت الاستجابة</p>
            </div>
            <div className="glass rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2 font-cairo">100%</div>
              <p className="text-gray-300 font-tajawal">رضا العملاء</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
