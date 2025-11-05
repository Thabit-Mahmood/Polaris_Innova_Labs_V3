# 🔧 Railway Troubleshooting Guide

## ❌ Current Issues & Solutions

### Issue 1: Logo Not Showing
**Cause:** basePath was set to `/Polaris_Innova_Labs_V3` in production
**Status:** ✅ FIXED
**Solution:** Updated `lib/basePath.ts` to remove base path

### Issue 2: Emails Not Sending
**Cause:** Missing SMTP environment variables in Railway
**Status:** ⚠️ NEEDS CONFIGURATION

### Issue 3: Blog Creation Fails
**Cause:** Database volume not mounted
**Status:** ⚠️ NEEDS VOLUME

### Issue 4: Contact Form Shows Success But Doesn't Work
**Cause:** API continues even if email fails (by design), but email isn't configured
**Status:** ⚠️ NEEDS SMTP CONFIG

---

## 🔍 Step-by-Step Diagnosis

### Step 1: Check Railway Logs

1. Go to Railway Dashboard
2. Click your service
3. Click **Deployments** tab
4. Click latest deployment
5. Click **View Logs**

**Look for these errors:**
- `❌ Email error:` - SMTP not configured
- `Cannot open database` - Volume not mounted
- `ECONNREFUSED` - Can't connect to SMTP server
- `Invalid login` - Wrong SMTP credentials

---

### Step 2: Verify Environment Variables

Go to Railway → **Variables** tab

**Required Variables (Check ALL are present):**

```env
✅ NEXT_PUBLIC_URL=https://polarisinnovalabsv3-production.up.railway.app
✅ SMTP_HOST=smtp.gmail.com
✅ SMTP_PORT=587
✅ SMTP_USER=thabit252@gmail.com
✅ SMTP_PASSWORD=tgxqqbutzqftbomi
✅ SMTP_FROM=thabit252@gmail.com
✅ SMTP_TO=services@polaris-innova-labs.com,hadil.alsewaiee@gmail.com
✅ WHATSAPP_NUMBER=966540768136
✅ NEXT_PUBLIC_WHATSAPP_NUMBER=966540768136
✅ NEXT_PUBLIC_PHONE=+966540768136
✅ NEXT_PUBLIC_EMAIL=services@polaris-innova-labs.com
✅ ADMIN_PASSWORD=admin123
✅ NEXT_PUBLIC_ADMIN_PASSWORD=admin123
✅ RATE_LIMIT_MAX=5
✅ RATE_LIMIT_WINDOW_MS=900000
✅ NODE_ENV=production
```

**If ANY are missing, add them now!**

---

### Step 3: Check Volumes

**Critical:** Without volumes, database and images are lost on each deploy!

#### Check if Volumes Exist:

1. Go to Railway → **Settings** tab
2. Scroll to **Volumes** section
3. You should see:
   - Volume 1: `/app/data`
   - Volume 2: `/app/public/uploads`

#### If Volumes Don't Exist:

**Option A: Using Railway CLI**
```bash
railway login
railway link
railway volume add --mount-path /app/data
railway volume add --mount-path /app/public/uploads
```

**Option B: Contact Railway Support**
If you can't see volumes in UI, your plan might not support them.
Upgrade to Hobby plan ($5/month) or use PostgreSQL instead.

---

### Step 4: Test SMTP Connection

The SMTP password might be wrong or expired. Test it:

1. Go to [Google Account](https://myaccount.google.com/apppasswords)
2. Generate a NEW app password for "Mail"
3. Copy the 16-character password (no spaces)
4. Update `SMTP_PASSWORD` in Railway variables
5. Redeploy

---

### Step 5: Check Database

In Railway logs, look for:
```
✅ Blog created with ID: 1
```

If you see:
```
❌ Cannot open database
```

**Solution:** Add volume at `/app/data`

---

## 🚀 Quick Fix Checklist

Run through this checklist:

### Environment Variables
- [ ] All 15 variables are added in Railway
- [ ] `NEXT_PUBLIC_URL` matches your Railway URL
- [ ] `SMTP_PASSWORD` is correct (16 chars, no spaces)
- [ ] `SMTP_USER` and `SMTP_FROM` are the same email

### Volumes
- [ ] Volume exists at `/app/data`
- [ ] Volume exists at `/app/public/uploads`
- [ ] Service redeployed after adding volumes

### Code Changes
- [ ] Latest code pushed to GitHub
- [ ] Railway auto-deployed latest commit
- [ ] No build errors in Railway logs

### Testing
- [ ] Logo shows up on homepage
- [ ] Contact form submits (check logs for email status)
- [ ] Admin panel loads
- [ ] Can create blog post (check logs)
- [ ] Images can be uploaded

---

## 🔧 Common Fixes

### Fix 1: Emails Not Sending

**Check Railway Logs for:**
```
❌ Email error: Invalid login
```

**Solution:**
1. Generate new Gmail app password
2. Update `SMTP_PASSWORD` in Railway
3. Make sure it's the 16-character password (remove spaces)
4. Redeploy

### Fix 2: Database Errors

**Check Railway Logs for:**
```
❌ Cannot open database because the directory does not exist
```

**Solution:**
1. Add volume: `/app/data`
2. Redeploy
3. Check logs again

### Fix 3: Images Not Uploading

**Check Railway Logs for:**
```
❌ ENOENT: no such file or directory
```

**Solution:**
1. Add volume: `/app/public/uploads`
2. Redeploy

### Fix 4: Logo Not Showing

**Status:** ✅ Fixed in latest code
**Action:** Push latest code and redeploy

---

## 📊 Expected Behavior After Fixes

### Contact Form:
1. User submits form
2. Logs show: `📧 Contact form submission started`
3. Logs show: `✅ Emails sent successfully`
4. Admin receives email at: services@polaris-innova-labs.com
5. User receives thank you email

### Blog Creation:
1. Admin creates blog
2. Logs show: `📝 Creating new blog post...`
3. Logs show: `✅ Blog created with ID: X`
4. If published, logs show: `📧 Sending to X subscribers...`
5. Subscribers receive email

### Image Upload:
1. Admin uploads image
2. Image saved to `/app/public/uploads/`
3. Image URL returned
4. Image displays in blog post

---

## 🆘 Still Not Working?

### Get Detailed Logs:

1. Railway Dashboard → Your Service
2. Deployments → Latest → View Logs
3. Copy the last 50 lines
4. Look for any ❌ or ERROR messages

### Check These Specific Things:

**For Email Issues:**
- Is `SMTP_PASSWORD` exactly 16 characters?
- Is `SMTP_USER` a valid Gmail address?
- Is 2-Step Verification enabled on Gmail?
- Is the app password still valid?

**For Database Issues:**
- Does `/app/data` volume exist?
- Check logs for "Cannot open database"
- Try redeploying after adding volume

**For Image Issues:**
- Does `/app/public/uploads` volume exist?
- Check file size (max 5MB)
- Check logs for upload errors

---

## 📞 Need Help?

If issues persist:
1. Copy Railway logs
2. Note which specific feature isn't working
3. Check if it works locally (it should)
4. Contact: services@polaris-innova-labs.com

---

## ✅ Success Indicators

Your deployment is working when:
- ✅ Logo shows on all pages
- ✅ Contact form sends emails (check inbox)
- ✅ Blog posts can be created
- ✅ Images can be uploaded
- ✅ Subscribers receive blog notifications
- ✅ No errors in Railway logs
