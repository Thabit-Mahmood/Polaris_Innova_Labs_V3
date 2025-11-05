'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

function UnsubscribeForm() {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get('email');
  
  const [email, setEmail] = useState(emailParam || '');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('تم إلغاء الاشتراك بنجاح');
      } else {
        setStatus('error');
        setMessage(data.error || 'حدث خطأ');
      }
    } catch (error) {
      setStatus('error');
      setMessage('حدث خطأ في الاتصال');
    }
  };

  return (
    <div className="min-h-screen bg-dark-400 flex items-center justify-center p-4">
      <div className="glass rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-white mb-6 font-cairo text-center">
          إلغاء الاشتراك
        </h1>

        {status === 'success' ? (
          <div className="text-center space-y-4">
            <FaCheckCircle className="text-6xl text-primary mx-auto" />
            <p className="text-xl text-white font-tajawal">{message}</p>
            <p className="text-gray-400 font-tajawal">
              نأسف لرؤيتك تغادر. يمكنك الاشتراك مرة أخرى في أي وقت.
            </p>
          </div>
        ) : status === 'error' ? (
          <div className="text-center space-y-4">
            <FaTimesCircle className="text-6xl text-red-500 mx-auto" />
            <p className="text-xl text-white font-tajawal">{message}</p>
            <button
              onClick={() => setStatus('idle')}
              className="btn-outline"
            >
              حاول مرة أخرى
            </button>
          </div>
        ) : (
          <form onSubmit={handleUnsubscribe} className="space-y-4">
            <p className="text-gray-300 font-tajawal mb-4">
              أدخل بريدك الإلكتروني لإلغاء الاشتراك من النشرة البريدية
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="بريدك الإلكتروني"
              required
              disabled={status === 'loading'}
              className="w-full px-4 py-3 rounded-lg bg-dark-200 text-white border border-gray-700 focus:border-primary focus:outline-none font-tajawal"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary w-full"
            >
              {status === 'loading' ? 'جاري الإلغاء...' : 'إلغاء الاشتراك'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-dark-400 flex items-center justify-center p-4">
        <div className="glass rounded-2xl p-8 max-w-md w-full text-center">
          <p className="text-white font-tajawal">جاري التحميل...</p>
        </div>
      </div>
    }>
      <UnsubscribeForm />
    </Suspense>
  );
}
