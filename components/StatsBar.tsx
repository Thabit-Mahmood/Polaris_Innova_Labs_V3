'use client';

export default function StatsBar() {
  const stats = [
    {
      number: '10+',
      label: 'أنواع المواقع',
      icon: '🎯'
    },
    {
      number: '40-70%',
      label: 'توفير في التكلفة',
      icon: '💰'
    },
    {
      number: '24/7',
      label: 'دعم فني',
      icon: '🔧'
    },
    {
      number: '100%',
      label: 'رضا العملاء',
      icon: '⭐'
    },
  ];

  return (
    <section className="bg-dark-300 border-y border-primary/10 py-12">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="text-4xl mb-3 group-hover:animate-bounce">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2 font-cairo">
                {stat.number}
              </div>
              <div className="text-sm md:text-base text-gray-400 font-tajawal">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
