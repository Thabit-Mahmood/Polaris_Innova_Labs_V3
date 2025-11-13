import type { Metadata, Viewport } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingDoodles from '@/components/FloatingDoodles'
// TEMPORARY HIDE: WhatsApp floating button
// import WhatsAppButton from '@/components/WhatsAppButton'
import { checkEnvironment } from '@/lib/startup-check'

// Check environment on startup
if (typeof window === 'undefined') {
  checkEnvironment();
}

export const metadata: Metadata = {
  title: 'Polaris Innova Labs - شركة تطوير المواقع في السعودية',
  description: 'شركة تطوير المواقع الإلكترونية في السعودية - نقدم مواقع احترافية مخصصة باستخدام أحدث التقنيات وأساليب التطوير السريعة. نوفر توفيرًا في التكلفة يتراوح بين 40-70٪ مع باقات بأسعار ثابتة.',
  keywords: 'تطوير مواقع, السعودية, تصميم مواقع, متاجر إلكترونية, مواقع شركات, حجز مواقع',
  authors: [{ name: 'Polaris Innova Labs' }],
  openGraph: {
    title: 'Polaris Innova Labs - شركة تطوير المواقع في السعودية',
    description: 'شركة تطوير المواقع الإلكترونية في السعودية',
    type: 'website',
    locale: 'ar_SA',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="font-cairo bg-dark-400 text-white antialiased">
        <FloatingDoodles />
        {/* TEMPORARY HIDE: WhatsApp floating button */}
        {/* <WhatsAppButton /> */}
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
