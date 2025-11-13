'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaEnvelope, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
// TEMPORARY HIDE: WhatsApp and Phone icons
// import { FaWhatsapp, FaPhone } from 'react-icons/fa';
import { getAssetPath } from '@/lib/basePath';
import NewsletterSubscribe from './NewsletterSubscribe';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    { label: 'متجر إلكتروني', href: '/services#ecommerce' },
    { label: 'موقع شركة', href: '/services#company-profile' },
    { label: 'حجز مواعيد', href: '/services#appointment-booking' },
    { label: 'منصة تعليمية', href: '/services#elearning' },
  ];

  const quickLinks = [
    { label: 'الرئيسية', href: '/' },
    { label: 'خدماتنا', href: '/services' },
    { label: 'المدونة', href: '/blog' },
    { label: 'من نحن', href: '/about' },
    { label: 'الأسئلة الشائعة', href: '/faq' },
    { label: 'تواصل معنا', href: '/#contact' },
  ];

  return (
    <footer className="bg-dark-300 border-t border-primary/10 pt-16">
      <div className="container-custom pb-16">
        {/* Newsletter Section */}
        <div className="mb-12 max-w-2xl mx-auto">
          <NewsletterSubscribe />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                <img
                  src={getAssetPath('/logo.jpg')}
                  alt="Polaris Innova Labs"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-white font-cairo">Polaris Innova Labs</span>
                <span className="text-xs text-primary font-tajawal">تطوير مواقع احترافية</span>
              </div>
            </div>
            <p className="text-gray-400 font-tajawal leading-relaxed">
              شركة تطوير مواقع احترافية في السعودية. نقدم حلول تقنية متكاملة بأحدث التقنيات وأسعار تنافسية.
            </p>
            <div className="pt-4">
              <p className="text-primary font-cairo font-bold text-sm leading-relaxed">
                البرمجة ١٠٪ بس من المعادلة الكلية — نحنا نصمّم نتائج أعمال، مو بس كود
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 font-cairo">خدماتنا</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    href={service.href}
                    className="text-gray-400 hover:text-primary transition-colors font-tajawal flex items-center group"
                  >
                    <span className="w-2 h-2 bg-primary rounded-full ml-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 font-cairo">روابط سريعة</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors font-tajawal flex items-center group"
                  >
                    <span className="w-2 h-2 bg-primary rounded-full ml-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 font-cairo">تواصل معنا</h3>
            <ul className="space-y-4">
              {/* TEMPORARY HIDE: WhatsApp Contact */}
              {/* Uncomment to show WhatsApp contact
              <li>
                <a
                  href="https://wa.me/966540768136"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 space-x-reverse text-gray-400 hover:text-primary transition-colors group"
                >
                  <FaWhatsapp className="text-xl group-hover:scale-110 transition-transform" />
                  <span className="font-tajawal" dir="ltr">+966 54 076 8136</span>
                </a>
              </li>
              */}
              <li>
                <a
                  href="mailto:services@polaris-innova-labs.com"
                  className="flex items-center space-x-3 space-x-reverse text-gray-400 hover:text-primary transition-colors group"
                >
                  <FaEnvelope className="text-xl group-hover:scale-110 transition-transform" />
                  <span className="font-tajawal">services@polaris-innova-labs.com</span>
                </a>
              </li>
              {/* TEMPORARY HIDE: Phone Contact */}
              {/* Uncomment to show phone contact
              <li>
                <a
                  href="tel:+966540768136"
                  className="flex items-center space-x-3 space-x-reverse text-gray-400 hover:text-primary transition-colors group"
                >
                  <FaPhone className="text-xl group-hover:scale-110 transition-transform" />
                  <span className="font-tajawal" dir="ltr">+966 54 076 8136</span>
                </a>
              </li>
              */}
            </ul>

            {/* Social Media */}
            <div className="mt-6">
              <div className="flex items-center space-x-4 space-x-reverse">
                <a
                  href="https://www.linkedin.com/company/polaris-innova-labs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-dark-200 rounded-full flex items-center justify-center text-gray-400 hover:bg-primary hover:text-dark-400 transition-all hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://x.com/polanov_labs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-dark-200 rounded-full flex items-center justify-center text-gray-400 hover:bg-primary hover:text-dark-400 transition-all hover:scale-110"
                  aria-label="Twitter"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://www.instagram.com/polaris_innova_labs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-dark-200 rounded-full flex items-center justify-center text-gray-400 hover:bg-primary hover:text-dark-400 transition-all hover:scale-110"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-4 pb-4 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 font-tajawal text-sm text-center md:text-right">
              © {currentYear} Polaris Innova Labs. جميع الحقوق محفوظة.
            </p>
            <p className="text-gray-600 font-tajawal text-xs">
              صُنع بـ <span className="text-primary">❤️</span> في المملكة العربية السعودية
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
