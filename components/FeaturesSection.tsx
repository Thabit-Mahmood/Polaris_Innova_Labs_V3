'use client';

import { FaRocket, FaShieldAlt, FaMobile, FaBolt, FaChartLine, FaCog } from 'react-icons/fa';

export default function FeaturesSection() {
  const features = [
    {
      icon: <FaRocket className="text-4xl" />,
      title: 'تطوير سريع',
      description: 'نسلّم مشروعك في وقت قياسي دون المساومة على الجودة باستخدام منهجيات تطوير حديثة',
      color: 'from-yellow-500 to-primary'
    },
    {
      icon: <FaShieldAlt className="text-4xl" />,
      title: 'أمان متقدم',
      description: 'حماية 100% ضد SQL Injection و XSS وجميع الهجمات الأمنية الشائعة',
      color: 'from-primary to-green-500'
    },
    {
      icon: <FaMobile className="text-4xl" />,
      title: 'تصميم متجاوب',
      description: 'موقعك يعمل بشكل مثالي على جميع الأجهزة - موبايل، تابلت، وسطح المكتب',
      color: 'from-blue-500 to-primary'
    },
    {
      icon: <FaBolt className="text-4xl" />,
      title: 'أداء فائق',
      description: 'سرعة تحميل خارقة وأداء محسّن لتجربة مستخدم استثنائية',
      color: 'from-primary to-yellow-500'
    },
    {
      icon: <FaChartLine className="text-4xl" />,
      title: 'تحسين SEO',
      description: 'موقعك يظهر في الصفحة الأولى من جوجل مع تحسينات SEO احترافية',
      color: 'from-purple-500 to-primary'
    },
    {
      icon: <FaCog className="text-4xl" />,
      title: 'أحدث التقنيات',
      description: 'نستخدم React و Next.js وأحدث الأدوات لضمان موقع عصري ومستقبلي',
      color: 'from-primary to-blue-500'
    },
  ];

  return (
    <section className="section-padding bg-dark-300 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/3 rounded-full blur-3xl"></div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <span className="text-primary font-bold text-sm uppercase tracking-wider font-cairo mb-4 block">
            لماذا نحن مختلفون
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-cairo">
            مواصفات <span className="gradient-text">احترافية</span> في كل موقع
          </h2>
          <p className="text-lg text-gray-400 font-tajawal leading-relaxed">
            نجمع بين الجمال والوظائف القوية والأمان المتقدم في كل مشروع نطوره
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass rounded-xl p-8 hover:border-primary/50 transition-all duration-300 group card-hover animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon with Gradient Background */}
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-dark-400 mb-6 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-4 font-cairo group-hover:text-primary transition-colors">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 font-tajawal leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
