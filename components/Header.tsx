'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBars, FaTimes, FaWhatsapp } from 'react-icons/fa';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'الرئيسية', href: '/' },
    { label: 'خدماتنا', href: '/services' },
    { label: 'من نحن', href: '/about' },
    { label: 'تواصل معنا', href: '/#contact' },
  ];

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark-300/95 backdrop-blur-lg shadow-lg border-b border-primary/10'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-center h-20 relative">
          {/* Logo - Left Side */}
          <div className="absolute right-0">
            <Link href="/" className="flex items-center space-x-3 space-x-reverse group">
              <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                <img
                  src="/logo.jpg"
                  alt="Polaris Innova Labs"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="font-bold text-lg text-white font-cairo">Polaris Innova Labs</span>
                <span className="text-xs text-primary font-tajawal">تطوير مواقع احترافية</span>
              </div>
            </Link>
          </div>

          {/* Centered Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-gray-300 hover:text-primary transition-colors font-cairo font-medium relative group"
              >
                {item.label}
                <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* WhatsApp Button - Desktop */}
          <div className="hidden md:block absolute left-0">
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '966XXXXXXXXX'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center space-x-2 space-x-reverse"
            >
              <FaWhatsapp className="text-xl" />
              <span>واتساب</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden absolute left-0 text-white text-2xl focus:outline-none hover:text-primary transition-colors"
            aria-label="القائمة"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 right-0 left-0 bg-dark-300/98 backdrop-blur-lg border-b border-primary/20 shadow-xl animate-slide-down">
            <div className="container-custom py-6 space-y-4">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gray-300 hover:text-primary transition-colors font-cairo font-medium text-lg py-2 border-b border-gray-800 hover:border-primary/30"
                >
                  {item.label}
                </Link>
              ))}

              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '966XXXXXXXXX'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center justify-center space-x-2 space-x-reverse w-full mt-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaWhatsapp className="text-xl" />
                <span>تواصل عبر واتساب</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
