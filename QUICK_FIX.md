# 🚀 Quick Fix Guide

## Step 1: Visit Diagnostics Page
```
https://your-railway-url.up.railway.app/test-diagnostics
```

## Step 2: Check What's Wrong

### ❌ If Environment Variables show "NOT SET":
1. Go to Railway Dashboard
2. Click your project → Variables tab
3. Click "Raw Editor"
4. Paste this (replace the URL with your actual Railway URL):

```
NEXT_PUBLIC_URL=https://your-actual-railway-url.up.railway.app
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=thabit252@gmail.com
SMTP_PASSWORD=tgxqqbutzqftbomi
SMTP_FROM=thabit252@gmail.com
SMTP_TO=services@polaris-innova-labs.com,hadil.alsewaiee@gmail.com
WHATSAPP_NUMBER=966540768136
NEXT_PUBLIC_WHATSAPP_NUMBER=966540768136
NEXT_PUBLIC_PHONE=+966540768136
NEXT_PUBLIC_EMAIL=services@polaris-innova-labs.com
ADMIN_PASSWORD=admin123
NEXT_PUBLIC_ADMIN_PASSWORD=admin123
RATE_LIMIT_MAX=5
RATE_LIMIT_WINDOW_MS=900000
NODE_ENV=production
```

5. Click "Deploy" button
6. Wait 2-3 minutes for deployment
7. Refresh diagnostics page

### ❌ If Database Status shows "ERROR":
1. Railway Dashboard → Settings → Volumes
2. Add a volume if not exists
3. Mount path: `/app/data`
4. Redeploy

### ❌ If SMTP Test Fails:
1. Make sure environment variables are set (see above)
2. Check if Gmail password is correct (it's an App Password, not your regular password)
3. Click "اختبار اتصال SMTP" button on diagnostics page
4. Check the error message

## Step 3: Test Everything

On the diagnostics page:

1. **Test SMTP**: Click "اختبار اتصال SMTP"
   - Should show: `"success": true`
   - Check your email inbox

2. **Test Contact Form**: 
   - Enter your email
   - Click "إرسال رسالة تجريبية"
   - Should show: `"emailSent": true`
   - Check your email inbox

3. **Test Blog Creation**:
   - Go to `/admin`
   - Login (password: admin123)
   - Click "إضافة مقال جديد"
   - Fill all fields
   - Click "حفظ"
   - Should show success message

4. **Test Subscribers**:
   - Go to homepage
   - Subscribe in footer
   - Go to `/admin` → "المشتركين" tab
   - Should see your email

## Common Issues

### "حدث خطأ" when creating blog
- Check diagnostics page → Database section
- Make sure all fields are filled (title, slug, excerpt, content)
- Check Railway logs for detailed error

### Email says "success" but no email received
- Check spam folder
- Run SMTP test on diagnostics page
- Verify SMTP_PASSWORD is the App Password (not regular Gmail password)
- Check SMTP_TO has correct email addresses

### Subscribers don't show
- Check diagnostics page → subscriberCount
- If 0, try subscribing first
- If > 0 but not showing, check browser console (F12) for errors

## Need Help?

1. Take screenshot of `/test-diagnostics` page
2. Copy Railway logs (last 50 lines)
3. Copy browser console errors (F12 → Console tab)
4. Share all of the above

## Important URLs

- Diagnostics: `/test-diagnostics`
- Admin Panel: `/admin`
- Blog Page: `/blog`
- API Diagnostics: `/api/admin/diagnostics`
- SMTP Test: `/api/test-smtp`
