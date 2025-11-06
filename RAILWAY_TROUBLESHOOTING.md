# Railway Deployment Troubleshooting Guide

## Quick Diagnosis

Visit this URL on your deployed site to see what's wrong:
```
https://your-railway-url.up.railway.app/test-diagnostics
```

This page will show you:
- ✅ Which environment variables are set
- ✅ Database status and record counts
- ✅ Email sending test

## Common Issues & Solutions

### 1. Email Not Sending (Contact Form Says Success But No Email)

**Problem**: SMTP environment variables not set in Railway

**Solution**:
1. Go to Railway Dashboard → Your Project → Variables tab
2. Add these variables (copy from `.env.production.example`):

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=thabit252@gmail.com
SMTP_PASSWORD=tgxqqbutzqftbomi
SMTP_FROM=thabit252@gmail.com
SMTP_TO=services@polaris-innova-labs.com,hadil.alsewaiee@gmail.com
```

3. Click "Deploy" or wait for auto-redeploy
4. Test using the diagnostics page

**Important**: Make sure your Gmail account has:
- 2-Factor Authentication enabled
- App Password generated (not your regular password)
- "Less secure app access" is NOT needed with app passwords

### 2. Blog Creation Shows "حدث خطأ"

**Possible Causes**:
- Database not initialized
- Missing required fields
- Database file permissions

**Solution**:

Check the diagnostics page first. If database shows errors:

1. **Verify Volume Mount** (Railway Dashboard):
   - Go to Settings → Volumes
   - Make sure volume is mounted at `/app/data`
   - If not, add a volume and mount it

2. **Check Logs** (Railway Dashboard):
   - Go to Deployments → Latest → View Logs
   - Look for database errors
   - Share the error messages if you need help

3. **Test Database Manually**:
   Visit: `https://your-url.up.railway.app/api/admin/diagnostics`
   
   Should show:
   ```json
   {
     "database": {
       "status": "OK",
       "blogCount": 0,
       "subscriberCount": 0,
       "tables": [...]
     }
   }
   ```

### 3. Subscribers Don't Show Up

**Problem**: Database query failing or no subscribers exist

**Solution**:

1. Check diagnostics page - look at `subscriberCount`
2. If count is 0, try subscribing via the newsletter form on your site
3. If count shows but admin panel is empty, check browser console for errors:
   - Open admin panel
   - Press F12 → Console tab
   - Look for red errors
   - Share the error message

### 4. All Environment Variables Not Set

**Quick Fix**:

Copy ALL variables from `.env.production.example` to Railway:

```bash
# In Railway Dashboard → Variables → Raw Editor, paste:

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

**Important**: Replace `your-actual-railway-url.up.railway.app` with your real Railway URL!

## Step-by-Step Verification

### Step 1: Check Environment Variables
```
Visit: /test-diagnostics
Look at: "متغيرات البيئة" section
Expected: All should show "SET" or actual values, not "NOT SET"
```

### Step 2: Check Database
```
Visit: /test-diagnostics
Look at: "حالة قاعدة البيانات" section
Expected: Status = "OK", tables should include: blogs, newsletter, contacts
```

### Step 3: Test Email
```
Visit: /test-diagnostics
Enter your email in the test form
Click "إرسال رسالة تجريبية"
Expected: Should show success: true, emailSent: true
Check your inbox (and spam folder)
```

### Step 4: Test Blog Creation
```
1. Go to /admin
2. Login with password: admin123
3. Click "إضافة مقال جديد"
4. Fill in all fields (title, slug, excerpt, content)
5. Click "حفظ"
Expected: Should show "تم إضافة المقال"
```

### Step 5: Test Subscriber Display
```
1. Go to homepage
2. Subscribe to newsletter in footer
3. Go to /admin → "المشتركين" tab
Expected: Should see your email in the list
```

## Railway Logs

To see detailed error messages:

1. Railway Dashboard → Your Project
2. Click on the deployment
3. Click "View Logs"
4. Look for lines with ❌ or "ERROR"

Common log patterns:
- `❌ Email error:` → SMTP issue
- `❌ Database error:` → Database issue
- `❌ Blog creation error:` → Blog creation issue

## Still Having Issues?

1. Visit `/test-diagnostics` and take a screenshot
2. Check Railway logs and copy any error messages
3. Open browser console (F12) on admin page and copy errors
4. Share all of the above

## Quick Commands

### View Railway Logs (CLI)
```bash
railway logs
```

### Redeploy
```bash
railway up
```

### Check Environment Variables (CLI)
```bash
railway variables
```

## Security Notes

⚠️ **Important**: 
- Never commit `.env.local` or `.env.production` to git
- Keep your SMTP password secure
- Change `ADMIN_PASSWORD` from default `admin123`
- Use strong passwords in production

## Contact

If you need help, provide:
1. Screenshot of `/test-diagnostics` page
2. Railway deployment logs (last 50 lines)
3. Browser console errors (if any)
4. Description of what you're trying to do
