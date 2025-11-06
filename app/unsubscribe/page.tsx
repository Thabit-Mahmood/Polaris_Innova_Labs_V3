'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Link from 'next/link';

export default function UnsubscribePage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!email) {
      setStatus('error');
      setMessage('البريد الإلكتروني غير موجود');
      return;
    }

    const unsubscribe = async () => {
      try {
        const response = await fetch('/api/newsletter/unsubscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (response.ok) {
          setStatus('success');
          setMessage('تم إلغاء اشتراكك بنجاح');
        } else {
          setStatus('error');
          setMessage(data.error || 'حدث خطأ');
        }
      } catch (error) {
        setStatus('error');
        setMessage('حدث خطأ في الاتصال');
      }
    };

    unsubscribe();
  }, [email]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-dark-400 flex items-center justify-center p-4 pt-24">
        <div className="glass rounded-2xl p-8 max-w-md w-full text-center">
          {status === 'loading' && (
            <>
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-white font-tajawal">جاري إلغاء الاشتراك...</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="text-6xl mb-4">✅</div>
              <h1 className="text-3xl font-bold text-white mb-4 font-cairo">{message}</h1>
              <p className="text-gray-400 font-tajawal mb-6">
                لن تتلقى المزيد من رسائل البريد الإلكتروني منا
              </p>
              <Link href="/" className="btn-primary inline-block">
                العودة للرئيسية
              </Link>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="text-6xl mb-4">❌</div>
              <h1 className="text-3xl font-bold text-white mb-4 font-cairo">{message}</h1>
              <Link href="/" className="btn-primary inline-block">
                العودة للرئيسية
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
