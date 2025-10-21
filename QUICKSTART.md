# 🚀 دليل البدء السريع - Polaris Innova Labs

## الخطوات السريعة للتشغيل

### 1. تثبيت المتطلبات
```bash
npm install
```

### 2. إعداد البيئة
انسخ محتوى `.env.local` وعدّله بمعلوماتك:

```env
# Gmail SMTP
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=your-email@gmail.com
SMTP_TO=recipient@gmail.com

# WhatsApp (مثال: 966501234567)
NEXT_PUBLIC_WHATSAPP_NUMBER=966XXXXXXXXX

# معلومات الاتصال
NEXT_PUBLIC_EMAIL=info@polarisinnovalabs.com
NEXT_PUBLIC_PHONE=+966 XX XXX XXXX
```

### 3. الحصول على Gmail App Password
1. اذهب إلى https://myaccount.google.com/security
2. فعّل "التحقق بخطوتين"
3. اذهب إلى https://myaccount.google.com/apppasswords
4. أنشئ كلمة مرور للتطبيق واستخدمها في `SMTP_PASSWORD`

### 4. تشغيل الموقع
```bash
npm run dev
```

افتح http://localhost:3000

## ✨ المميزات الجاهزة

✅ تصميم داكن احترافي مع تأثيرات حركية
✅ 10 أنواع من الخدمات مع carousel تفاعلي
✅ نموذج تواصل مع إرسال بريد إلكتروني
✅ تكامل WhatsApp
✅ أمان متقدم ضد الهجمات
✅ تصميم متجاوب 100%
✅ RTL ودعم اللغة العربية
✅ قاعدة بيانات SQLite

## 🎨 التخصيص السريع

### تغيير اللون الأساسي
في `tailwind.config.ts`:
```typescript
primary: '#daff00'  // غيّر هذا اللون
```

### تعديل الخدمات
في `lib/servicesData.ts` - عدّل مصفوفة `services`

### تخصيص النصوص
- `components/HeroSection.tsx` - قسم البطل
- `components/UseCasesSection.tsx` - حالات الاستخدام
- `components/EngineeringProcessSection.tsx` - العملية الهندسية

## 📦 البناء للإنتاج
```bash
npm run build
npm start
```

## 🌐 النشر على Vercel
```bash
npm install -g vercel
vercel
```

لا تنسَ إضافة متغيرات البيئة في Vercel Dashboard!

## 🔒 الأمان

الموقع محمي ضد:
- SQL Injection ✅
- XSS Attacks ✅
- CSRF ✅
- Rate Limiting ✅

## 📞 الدعم

إذا واجهت أي مشكلة، راجع `README.md` للتفاصيل الكاملة.

---

**البرمجة ١٠٪ بس من المعادلة الكلية — نحنا نصمّم نتائج أعمال، مو بس كود** 🚀
