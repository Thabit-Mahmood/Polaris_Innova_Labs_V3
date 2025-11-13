# How to Restore WhatsApp & Phone Numbers

## Quick Restoration Guide

All WhatsApp and phone number references have been temporarily hidden with clear comment markers. Follow these simple steps to restore them:

---

## Step 1: Restore Imports

### File: `components/Header.tsx`
**Find:**
```typescript
import { FaBars, FaTimes } from 'react-icons/fa';
// TEMPORARY HIDE: WhatsApp button
// import { FaWhatsapp } from 'react-icons/fa';
```

**Change to:**
```typescript
import { FaBars, FaTimes, FaWhatsapp } from 'react-icons/fa';
```

### File: `components/Footer.tsx`
**Find:**
```typescript
import { FaEnvelope, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
// TEMPORARY HIDE: WhatsApp and Phone icons
// import { FaWhatsapp, FaPhone } from 'react-icons/fa';
```

**Change to:**
```typescript
import { FaWhatsapp, FaEnvelope, FaPhone, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
```

### File: `components/ContactSection.tsx`
**Find (at top of file):**
```typescript
// TEMPORARY HIDE: WhatsApp and Phone contact info
// To show again, uncomment the imports and sections below
// import { FaWhatsapp, FaPhone } from 'react-icons/fa';
```

**Change to:**
```typescript
import { FaWhatsapp, FaEnvelope, FaPhone, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
```

### File: `app/layout.tsx`
**Find:**
```typescript
// TEMPORARY HIDE: WhatsApp floating button
// import WhatsAppButton from '@/components/WhatsAppButton'
```

**Change to:**
```typescript
import WhatsAppButton from '@/components/WhatsAppButton'
```

---

## Step 2: Restore Components

### File: `app/layout.tsx`
**Find:**
```typescript
<FloatingDoodles />
{/* TEMPORARY HIDE: WhatsApp floating button */}
{/* <WhatsAppButton /> */}
<Header />
```

**Change to:**
```typescript
<FloatingDoodles />
<WhatsAppButton />
<Header />
```

---

## Step 3: Restore Header Buttons

### File: `components/Header.tsx`

#### Desktop WhatsApp Button
**Find:**
```typescript
{/* TEMPORARY HIDE: WhatsApp Button - Desktop */}
{/* Uncomment to show WhatsApp button
<div className="hidden md:block absolute left-0">
  <a
    href="https://wa.me/966540768136"
    target="_blank"
    rel="noopener noreferrer"
    className="btn-primary flex items-center space-x-2 space-x-reverse"
  >
    <FaWhatsapp className="text-xl" />
    <span>واتساب</span>
  </a>
</div>
*/}
```

**Change to:**
```typescript
{/* WhatsApp Button - Desktop */}
<div className="hidden md:block absolute left-0">
  <a
    href="https://wa.me/966540768136"
    target="_blank"
    rel="noopener noreferrer"
    className="btn-primary flex items-center space-x-2 space-x-reverse"
  >
    <FaWhatsapp className="text-xl" />
    <span>واتساب</span>
  </a>
</div>
```

#### Mobile WhatsApp Button
**Find:**
```typescript
{/* TEMPORARY HIDE: WhatsApp Button - Mobile */}
{/* Uncomment to show WhatsApp button
<a
  href="https://wa.me/966540768136"
  target="_blank"
  rel="noopener noreferrer"
  className="btn-primary flex items-center justify-center space-x-2 space-x-reverse w-full mt-4"
  onClick={() => setIsMobileMenuOpen(false)}
>
  <FaWhatsapp className="text-xl" />
  <span>تواصل عبر واتساب</span>
</a>
*/}
```

**Change to:**
```typescript
<a
  href="https://wa.me/966540768136"
  target="_blank"
  rel="noopener noreferrer"
  className="btn-primary flex items-center justify-center space-x-2 space-x-reverse w-full mt-4"
  onClick={() => setIsMobileMenuOpen(false)}
>
  <FaWhatsapp className="text-xl" />
  <span>تواصل عبر واتساب</span>
</a>
```

---

## Step 4: Restore Footer Contact Info

### File: `components/Footer.tsx`

**Find:**
```typescript
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
```

**Change to:**
```typescript
<ul className="space-y-4">
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
  <li>
    <a
      href="mailto:services@polaris-innova-labs.com"
      className="flex items-center space-x-3 space-x-reverse text-gray-400 hover:text-primary transition-colors group"
    >
      <FaEnvelope className="text-xl group-hover:scale-110 transition-transform" />
      <span className="font-tajawal">services@polaris-innova-labs.com</span>
    </a>
  </li>
  <li>
    <a
      href="tel:+966540768136"
      className="flex items-center space-x-3 space-x-reverse text-gray-400 hover:text-primary transition-colors group"
    >
      <FaPhone className="text-xl group-hover:scale-110 transition-transform" />
      <span className="font-tajawal" dir="ltr">+966 54 076 8136</span>
    </a>
  </li>
</ul>
```

---

## Step 5: Restore Contact Section Cards

### File: `components/ContactSection.tsx`

Look for the section with Email contact card and restore the WhatsApp and Phone cards around it.

**Find the WhatsApp card comment** (around line 165) and **uncomment it**.
**Find the Phone card comment** (around line 226) and **uncomment it**.

---

## Step 6: Restore FAQ Page Buttons

### File: `app/faq/page.tsx`

**Find:**
```typescript
<div className="flex flex-col sm:flex-row gap-4 justify-center">
  {/* TEMPORARY HIDE: WhatsApp button */}
  {/* Uncomment to show WhatsApp button
  <a
    href="https://wa.me/966540768136"
    target="_blank"
    rel="noopener noreferrer"
    className="btn-primary text-lg px-8 py-4"
  >
    تواصل عبر واتساب
  </a>
  */}
  <a
    href="mailto:services@polaris-innova-labs.com"
    className="btn-primary text-lg px-8 py-4"
  >
    راسلنا عبر البريد
  </a>
</div>
```

**Change to:**
```typescript
<div className="flex flex-col sm:flex-row gap-4 justify-center">
  <a
    href="https://wa.me/966540768136"
    target="_blank"
    rel="noopener noreferrer"
    className="btn-primary text-lg px-8 py-4"
  >
    تواصل عبر واتساب
  </a>
  <a
    href="mailto:services@polaris-innova-labs.com"
    className="btn-secondary text-lg px-8 py-4"
  >
    راسلنا عبر البريد
  </a>
</div>
```

---

## Step 7: Restore FAQ Chatbot Button

### File: `components/FAQChatbot.tsx`

**Find:**
```typescript
{/* TEMPORARY HIDE: WhatsApp button */}
{/* Uncomment to show WhatsApp button
<a href="https://wa.me/966540768136" target="_blank" rel="noopener noreferrer" className="btn-primary inline-block text-lg px-8 py-4">
  تواصل معنا الآن عبر واتساب
</a>
*/}
<a href="mailto:services@polaris-innova-labs.com" className="btn-primary inline-block text-lg px-8 py-4">
  راسلنا عبر البريد الإلكتروني
</a>
```

**Change to:**
```typescript
<a href="https://wa.me/966540768136" target="_blank" rel="noopener noreferrer" className="btn-primary inline-block text-lg px-8 py-4">
  تواصل معنا الآن عبر واتساب
</a>
```

---

## Quick Checklist

- [ ] Restore imports in Header.tsx
- [ ] Restore imports in Footer.tsx
- [ ] Restore imports in ContactSection.tsx
- [ ] Restore import in layout.tsx
- [ ] Restore WhatsAppButton in layout.tsx
- [ ] Restore desktop WhatsApp button in Header.tsx
- [ ] Restore mobile WhatsApp button in Header.tsx
- [ ] Restore WhatsApp contact in Footer.tsx
- [ ] Restore Phone contact in Footer.tsx
- [ ] Restore WhatsApp card in ContactSection.tsx
- [ ] Restore Phone card in ContactSection.tsx
- [ ] Restore WhatsApp button in faq/page.tsx
- [ ] Restore WhatsApp button in FAQChatbot.tsx
- [ ] Test all pages to ensure everything works

---

## Testing After Restoration

1. Check the header (desktop and mobile)
2. Check the footer
3. Check the contact section on homepage
4. Check the FAQ page
5. Check the floating WhatsApp button
6. Test all WhatsApp links open correctly
7. Test phone number links work on mobile

---

## Notes

- All phone numbers are: **+966 54 076 8136**
- All WhatsApp links use: **https://wa.me/966540768136**
- The restoration is designed to be simple - just remove comment markers
- No code changes needed, just uncomment existing code
- All functionality is preserved and ready to use
