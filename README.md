# Polaris Innova Labs Website

موقع إلكتروني احترافي لشركة Polaris Innova Labs - شركة تطوير المواقع في السعودية.

## 🚀 المميزات

- ✨ تصميم داكن مذهل مع تأثيرات حركية سلسة
- 🎨 واجهة مستخدم عربية احترافية (RTL)
- 🔒 أمان متقدم ضد SQL Injection و XSS
- 📱 تصميم متجاوب بالكامل
- ⚡ أداء فائق مع Next.js 14
- 🎯 10 أنواع من الخدمات مع carousel تفاعلي
- 📧 نموذج تواصل مع Gmail SMTP
- 💬 تكامل WhatsApp
- 🗄️ قاعدة بيانات SQLite
- 🎭 رسومات هندسية متحركة (Floating Doodles)

## 📋 المتطلبات

- Node.js 18.x أو أحدث
- npm أو yarn
- حساب Gmail مع App Password

## 🛠️ التثبيت

1. **استنساخ المشروع أو تحميل الملفات**

2. **تثبيت الحزم**
```bash
npm install
```

3. **إعداد ملف البيئة**

أنشئ ملف `.env.local` في المجلد الرئيسي وأضف المتغيرات التالية:

```env
# Gmail SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=your-email@gmail.com
SMTP_TO=recipient@gmail.com

# WhatsApp Contact
NEXT_PUBLIC_WHATSAPP_NUMBER=966XXXXXXXXX

# Contact Info
NEXT_PUBLIC_EMAIL=info@polarisinnovalabs.com
NEXT_PUBLIC_PHONE=+966 XX XXX XXXX
```

### 📧 كيفية الحصول على Gmail App Password:

1. اذهب إلى [Google Account Security](https://myaccount.google.com/security)
2. فعّل "التحقق بخطوتين" (2-Step Verification)
3. اذهب إلى [App Passwords](https://myaccount.google.com/apppasswords)
4. أنشئ كلمة مرور جديدة للتطبيق (اختر "Mail")
5. انسخ كلمة المرور المكونة من 16 حرف واستخدمها في `SMTP_PASSWORD`

## 🎯 التشغيل

### وضع التطوير:
```bash
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000) في المتصفح.

### البناء للإنتاج:
```bash
npm run build
npm start
```

## 📁 هيكل المشروع

```
polaris-innova-labs/
├── app/                      # صفحات Next.js
│   ├── api/                  # API Routes
│   │   └── contact/          # نقطة نهاية نموذج التواصل
│   ├── about/                # صفحة من نحن
│   ├── services/             # صفحة الخدمات
│   ├── layout.tsx            # Layout الرئيسي
│   ├── page.tsx              # الصفحة الرئيسية
│   └── globals.css           # Styles عامة
├── components/               # مكونات React
│   ├── Header.tsx            # رأس الموقع
│   ├── Footer.tsx            # تذييل الموقع
│   ├── HeroSection.tsx       # قسم البطل مع Carousel
│   ├── UseCasesSection.tsx   # قسم حالات الاستخدام
│   ├── EngineeringProcessSection.tsx
│   ├── ContactSection.tsx    # نموذج التواصل
│   ├── FeaturesSection.tsx   # قسم المميزات
│   ├── StatsSection.tsx      # قسم الإحصائيات
│   └── FloatingDoodles.tsx   # الرسومات المتحركة
├── lib/                      # المكتبات والأدوات
│   ├── database.ts           # إعداد SQLite
│   ├── email.ts              # إرسال البريد الإلكتروني
│   ├── security.ts           # إجراءات الأمان
│   └── servicesData.ts       # بيانات الخدمات
├── data/                     # قاعدة البيانات
│   └── contacts.db           # SQLite database
├── public/                   # ملفات عامة
└── .env.local               # متغيرات البيئة
```

## 🔒 الأمان

الموقع محمي ضد:

- ✅ SQL Injection (استخدام Prepared Statements)
- ✅ XSS Attacks (تنظيف المدخلات)
- ✅ CSRF Attacks
- ✅ Rate Limiting (5 طلبات كل 15 دقيقة)
- ✅ Security Headers (HSTS, X-Frame-Options, CSP, etc.)
- ✅ Input Validation (باستخدام Zod)

## 🎨 التخصيص

### الألوان الأساسية:
في ملف `tailwind.config.ts`:
```typescript
colors: {
  primary: '#daff00',  // اللون الأساسي للعلامة التجارية
}
```

### الخطوط:
الموقع يستخدم:
- Cairo (للعناوين)
- Tajawal (للنصوص)

يمكنك تغييرها في `globals.css` و `tailwind.config.ts`.

### الخدمات:
عدّل بيانات الخدمات في `lib/servicesData.ts`.

## 📧 نموذج التواصل

عند إرسال نموذج التواصل:
1. يتم التحقق من صحة البيانات
2. تُحفظ البيانات في قاعدة بيانات SQLite
3. يُرسل بريد إلكتروني إلى الإدارة
4. يُرسل بريد شكر للعميل

## 📱 التكامل مع WhatsApp

اضبط رقم WhatsApp في `.env.local`:
```env
NEXT_PUBLIC_WHATSAPP_NUMBER=966XXXXXXXXX
```

## 🌐 النشر

### Vercel (موصى به):
```bash
npm install -g vercel
vercel
```

لا تنسَ إضافة متغيرات البيئة في لوحة تحكم Vercel.

### خوادم أخرى:
```bash
npm run build
npm start
```

## 📊 قاعدة البيانات

يتم إنشاء قاعدة بيانات SQLite تلقائياً في `data/contacts.db` مع الجداول التالية:
- `contacts` - رسائل التواصل
- `newsletter` - اشتراكات النشرة الإخبارية
- `rate_limits` - تتبع حدود الطلبات

## 🐛 استكشاف الأخطاء

### مشكلة في إرسال البريد الإلكتروني:
- تأكد من تفعيل "التحقق بخطوتين" في حساب Google
- تأكد من استخدام App Password وليس كلمة مرور الحساب العادية
- تحقق من أن SMTP settings صحيحة

### مشكلة في قاعدة البيانات:
- تأكد من وجود مجلد `data/`
- تحقق من صلاحيات الكتابة على المجلد

## 📝 الترخيص

جميع الحقوق محفوظة © 2025 Polaris Innova Labs

## 📞 الدعم

للمساعدة والدعم:
- 📧 البريد الإلكتروني: info@polarisinnovalabs.com
- 💬 WhatsApp: [الرقم هنا]

---

**صُنع بـ ❤️ في المملكة العربية السعودية**

البرمجة ١٠٪ بس من المعادلة الكلية — نحنا نصمّم نتائج أعمال، مو بس كود
