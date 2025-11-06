'use client';

import { useState, useEffect } from 'react';

export default function DiagnosticsPage() {
  const [diagnostics, setDiagnostics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [testEmail, setTestEmail] = useState('');
  const [emailResult, setEmailResult] = useState<any>(null);
  const [smtpTest, setSmtpTest] = useState<any>(null);
  const [testingSMTP, setTestingSMTP] = useState(false);

  useEffect(() => {
    loadDiagnostics();
  }, []);

  const loadDiagnostics = async () => {
    try {
      const response = await fetch('/api/admin/diagnostics');
      const data = await response.json();
      setDiagnostics(data);
    } catch (error) {
      console.error('Failed to load diagnostics:', error);
    } finally {
      setLoading(false);
    }
  };

  const testSMTPConnection = async () => {
    setTestingSMTP(true);
    setSmtpTest(null);
    try {
      const response = await fetch('/api/test-smtp');
      const data = await response.json();
      setSmtpTest(data);
    } catch (error) {
      setSmtpTest({ error: 'Failed to test SMTP connection' });
    } finally {
      setTestingSMTP(false);
    }
  };

  const testEmailSending = async () => {
    if (!testEmail) {
      alert('الرجاء إدخال بريد إلكتروني');
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Test User',
          email: testEmail,
          message: 'This is a test message from diagnostics page',
        }),
      });

      const data = await response.json();
      setEmailResult(data);
    } catch (error) {
      setEmailResult({ error: 'Failed to send test email' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-400 flex items-center justify-center">
        <p className="text-white text-xl">جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-400 p-8">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-white mb-8 font-cairo">صفحة التشخيص</h1>

        {/* Environment Variables */}
        <div className="glass rounded-xl p-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4 font-cairo">متغيرات البيئة</h2>
          <div className="space-y-2 font-mono text-sm">
            {diagnostics?.environment && Object.entries(diagnostics.environment).map(([key, value]: [string, any]) => (
              <div key={key} className="flex justify-between items-center p-2 bg-dark-200 rounded">
                <span className="text-gray-400">{key}:</span>
                <span className={value === 'NOT SET' || value === false ? 'text-red-500' : 'text-primary'}>
                  {String(value)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Database Status */}
        <div className="glass rounded-xl p-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4 font-cairo">حالة قاعدة البيانات</h2>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-dark-200 rounded">
              <span className="text-gray-400">الحالة:</span>
              <span className={diagnostics?.database?.status === 'OK' ? 'text-primary' : 'text-red-500'}>
                {diagnostics?.database?.status}
              </span>
            </div>
            {diagnostics?.database?.error && (
              <div className="p-4 bg-red-500/20 border border-red-500 rounded text-red-400">
                {diagnostics.database.error}
              </div>
            )}
            <div className="flex justify-between items-center p-2 bg-dark-200 rounded">
              <span className="text-gray-400">عدد المقالات:</span>
              <span className="text-white">{diagnostics?.database?.blogCount}</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-dark-200 rounded">
              <span className="text-gray-400">عدد المشتركين:</span>
              <span className="text-white">{diagnostics?.database?.subscriberCount}</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-dark-200 rounded">
              <span className="text-gray-400">عدد الرسائل:</span>
              <span className="text-white">{diagnostics?.database?.contactCount}</span>
            </div>
          </div>

          {diagnostics?.database?.tables && (
            <div className="mt-4">
              <h3 className="text-lg font-bold text-white mb-2">الجداول:</h3>
              <div className="flex flex-wrap gap-2">
                {diagnostics.database.tables.map((table: any) => (
                  <span key={table.name} className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                    {table.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* SMTP Connection Test */}
        <div className="glass rounded-xl p-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4 font-cairo">اختبار اتصال SMTP</h2>
          <div className="space-y-4">
            <p className="text-gray-400 font-tajawal">
              هذا الاختبار يتحقق من إعدادات SMTP ويرسل بريد تجريبي إلى {diagnostics?.environment?.SMTP_TO?.split(',')[0] || 'البريد المحدد'}
            </p>
            <button
              onClick={testSMTPConnection}
              disabled={testingSMTP}
              className="px-6 py-3 bg-primary text-dark-400 rounded-lg font-bold hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {testingSMTP ? 'جاري الاختبار...' : 'اختبار اتصال SMTP'}
            </button>

            {smtpTest && (
              <div className={`p-4 rounded-lg ${smtpTest.success ? 'bg-primary/20 border border-primary' : 'bg-red-500/20 border border-red-500'}`}>
                <pre className="text-white text-sm overflow-auto">
                  {JSON.stringify(smtpTest, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Email Test */}
        <div className="glass rounded-xl p-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4 font-cairo">اختبار نموذج الاتصال</h2>
          <div className="space-y-4">
            <p className="text-gray-400 font-tajawal">
              هذا الاختبار يرسل رسالة عبر نموذج الاتصال (مثل ما يفعله المستخدم)
            </p>
            <input
              type="email"
              placeholder="أدخل بريدك الإلكتروني للاختبار"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-dark-200 text-white border border-gray-700 focus:border-primary focus:outline-none"
            />
            <button
              onClick={testEmailSending}
              className="px-6 py-3 bg-primary text-dark-400 rounded-lg font-bold hover:bg-primary/90 transition-colors"
            >
              إرسال رسالة تجريبية
            </button>

            {emailResult && (
              <div className={`p-4 rounded-lg ${emailResult.success ? 'bg-primary/20 border border-primary' : 'bg-red-500/20 border border-red-500'}`}>
                <pre className="text-white text-sm overflow-auto">
                  {JSON.stringify(emailResult, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Errors */}
        {diagnostics?.errors && diagnostics.errors.length > 0 && (
          <div className="glass rounded-xl p-6 mb-6">
            <h2 className="text-2xl font-bold text-red-500 mb-4 font-cairo">الأخطاء</h2>
            <ul className="space-y-2">
              {diagnostics.errors.map((error: string, index: number) => (
                <li key={index} className="p-3 bg-red-500/20 border border-red-500 rounded text-red-400">
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Raw Data */}
        <div className="glass rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4 font-cairo">البيانات الكاملة</h2>
          <pre className="text-white text-xs overflow-auto bg-dark-200 p-4 rounded">
            {JSON.stringify(diagnostics, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
