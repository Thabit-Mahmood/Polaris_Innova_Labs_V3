'use client';

import { useState, useEffect } from 'react';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show button after page load
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Show tooltip after 2 seconds
      setTimeout(() => {
        setShowTooltip(true);
        // Hide tooltip after 5 seconds
        setTimeout(() => {
          setShowTooltip(false);
        }, 5000);
      }, 2000);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    window.open(
      `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '966XXXXXXXXX'}?text=${encodeURIComponent('مرحباً، أريد الاستفسار عن خدماتكم')}`,
      '_blank'
    );
  };

  return (
    <div
      className={`fixed bottom-6 left-6 z-50 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-0 mb-4 animate-slide-up">
          <div className="bg-white text-dark-400 px-6 py-4 rounded-lg shadow-xl relative min-w-[280px] max-w-md">
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute top-1 left-1 text-gray-500 hover:text-gray-700"
              aria-label="إغلاق"
            >
              <FaTimes className="text-sm" />
            </button>
            <p className="font-tajawal text-base pr-6">
              هل لديك أسئلة؟ تواصل معنا عبر واتساب! 👋
            </p>
            <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white transform rotate-45"></div>
          </div>
        </div>
      )}

      {/* WhatsApp Button */}
      <button
        onClick={handleClick}
        className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-3xl shadow-2xl hover:scale-110 transition-all duration-300 group relative overflow-hidden"
        aria-label="تواصل عبر واتساب"
      >
        {/* Pulse Animation */}
        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></span>

        {/* Icon */}
        <FaWhatsapp className="relative z-10 group-hover:rotate-12 transition-transform" />
      </button>
    </div>
  );
}
