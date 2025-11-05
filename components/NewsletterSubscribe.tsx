'use client';

import { useState } from 'react';
import { FaPaperPlane, FaCheckCircle } from 'react-icons/fa';

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setEmail('');
        setMessage('تم الاشتراك بنجاح! 🎉');
      } else {
        setStatus('error');
        setMessage(data.error || 'حدث خطأ، حاول مرة أخرى');
      }
    } catch (error) {
      setStatus('error');
      setMessage('حدث خطأ في الاتصال');
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white font-cairo">اشترك في نشرتنا البريدية</h3>
      <p className="text-gray-400 font-tajawal text-sm">
        احصل على آخر المقالات والنصائح التقنية مباشرة في بريدك
      </p>

      {status === 'success' ? (
        <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 flex items-center space-x-3 space-x-reverse">
          <FaCheckCircle className="text-primary text-xl flex-shrink-0" />
          <p className="text-primary font-tajawal text-sm">{message}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="بريدك الإلكتروني"
            required
            disabled={status === 'loading'}
            className="flex-1 px-4 py-2 rounded-lg bg-dark-200 text-white border border-gray-700 focus:border-primary focus:outline-none font-tajawal text-sm"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-primary flex items-center justify-center space-x-2 space-x-reverse px-6 py-2 text-sm whitespace-nowrap"
          >
            <FaPaperPlane className="text-sm" />
            <span>{status === 'loading' ? 'جاري الإرسال...' : 'اشترك'}</span>
          </button>
        </form>
      )}

      {status === 'error' && (
        <p className="text-red-400 font-tajawal text-sm">{message}</p>
      )}
    </div>
  );
}
