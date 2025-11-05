# 🚀 Railway Deployment Guide - Polaris Innova Labs

## ✅ Pre-Deployment Checklist

Your app is ready to deploy! Everything has been configured:
- ✅ Build succeeds locally
- ✅ Database auto-creates directories
- ✅ All type errors fixed
- ✅ Port configuration correct
- ✅ Node 20 configured
- ✅ No basePath conflicts

---

## 📋 Step 1: Push to GitHub

```bash
git add .
git commit -m "Ready for Railway deployment"
git push origin main
```

---

## 🚂 Step 2: Deploy on Railway

1. Go to [railway.app](https://railway.app)
2. Click **New Project**
3. Select **Deploy from GitHub repo**
4. Choose your repository: `Polaris_Invo_Labs_V3`
5. Railway will automatically start building

---

## 🌐 Step 3: Generate Public Domain

1. Once deployed, click on your service
2. Go to **Settings** tab
3. Find **Networking** section
4. Click **⚡ Generate Domain**
5. Copy the generated URL (e.g., `https://polaris-innova-labs-v3-production.up.railway.app`)

---

## ⚙️ Step 4: Add Environment Variables

Go to **Variables** tab and add these:

```env
NEXT_PUBLIC_URL=https://your-railway-url.up.railway.app
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

**Important:** Replace `https://your-railway-url.up.railway.app` with your actual Railway URL!

---

## 💾 Step 5: Add Volumes (CRITICAL!)

### Option A: Using Railway CLI (Recommended)

```bash
# Install CLI
npm install -g @railway/cli

# Login
railway login

# Link to project
railway link

# Add volumes
railway volume add --mount-path /app/data
railway volume add --mount-path /app/public/uploads
```

### Option B: Using Railway Dashboard

1. Go to **Settings** tab
2. Scroll to **Volumes** section
3. Click **+ New Volume**
4. Mount path: `/app/data`
5. Click **Add**
6. Repeat for `/app/public/uploads`

**Without volumes, all data (database, images) will be deleted on each deploy!**

---

## 🌍 Step 6: Connect Custom Domain (Namecheap)

### In Railway:

1. Go to **Settings** → **Networking**
2. Click **+ Custom Domain**
3. Enter your domain: `polarisinnovalabs.com`
4. Copy the CNAME target shown (e.g., `polaris-innova-labs-v3-production.up.railway.app`)

### In Namecheap:

1. Login to Namecheap
2. Go to **Domain List** → **Manage**
3. Click **Advanced DNS** tab
4. Add these records:

**Record 1 (Root domain):**
- Type: `CNAME Record`
- Host: `@`
- Value: `polaris-innova-labs-v3-production.up.railway.app`
- TTL: Automatic

**Record 2 (WWW subdomain):**
- Type: `CNAME Record`
- Host: `www`
- Value: `polaris-innova-labs-v3-production.up.railway.app`
- TTL: Automatic

5. Click **Save All Changes**

### Back in Railway:

1. Add both domains:
   - `polarisinnovalabs.com`
   - `www.polarisinnovalabs.com`
2. Wait 5-30 minutes for DNS propagation
3. Railway will auto-generate SSL certificates

### Update Environment Variable:

Once domain is connected:
1. Go to **Variables** tab
2. Update `NEXT_PUBLIC_URL` to: `https://polarisinnovalabs.com`
3. Railway will auto-redeploy

---

## ✅ Step 7: Verify Deployment

Test these URLs:

- **Homepage:** `https://your-domain.com`
- **Admin Panel:** `https://your-domain.com/admin`
- **Blog:** `https://your-domain.com/blog`
- **FAQ:** `https://your-domain.com/faq`

Test these features:

- [ ] Contact form sends emails
- [ ] Newsletter subscription works
- [ ] Admin login works (password: admin123)
- [ ] Create a blog post
- [ ] Upload an image
- [ ] Publish blog (subscribers should receive email)
- [ ] WhatsApp button works

---

## 🔧 Troubleshooting

### Build Fails
- Check Railway logs for errors
- Verify all files are pushed to GitHub
- Make sure `package.json` has all dependencies

### App Crashes on Start
- Check if `PORT` environment variable is set (Railway sets this automatically)
- Verify `NODE_ENV=production` is set
- Check Railway logs for error messages

### Database Errors
- Make sure `/app/data` volume is added
- Check if data directory has write permissions
- Verify database queries in logs

### Images Not Uploading
- Make sure `/app/public/uploads` volume is added
- Check file size limits (max 5MB)
- Verify upload directory permissions

### Emails Not Sending
- Verify SMTP credentials are correct
- Check Gmail app password is valid
- Look for email errors in Railway logs

### Domain Not Connecting
- Wait up to 24 hours for DNS propagation
- Check DNS at [whatsmydns.net](https://whatsmydns.net)
- Verify CNAME records in Namecheap
- Make sure no conflicting A records exist

---

## 📊 Post-Deployment Tasks

### Change Admin Password
1. Go to `/admin`
2. Login with default password: `admin123`
3. Click **Settings** tab
4. Click **Change Password**
5. Enter new password
6. Verification code will be sent to: services@polaris-innova-labs.com

### Create First Blog Post
1. Go to `/admin`
2. Click **Blogs** tab
3. Click **Add New Blog**
4. Upload images
5. Write content
6. Publish
7. Subscribers will receive email notification

### Test Email System
1. Submit contact form
2. Check if you receive email at: services@polaris-innova-labs.com
3. Check if customer receives thank you email
4. Subscribe to newsletter
5. Publish a blog post
6. Verify newsletter email is sent

---

## 🎯 Success Indicators

Your deployment is successful when:

- ✅ Site loads without errors
- ✅ All pages are accessible
- ✅ Contact form works
- ✅ Emails are being sent
- ✅ Admin panel is accessible
- ✅ Blog posts can be created
- ✅ Images can be uploaded
- ✅ Database persists data
- ✅ Custom domain works with SSL

---

## 📞 Support

If you encounter issues:
- Email: services@polaris-innova-labs.com
- WhatsApp: +966 54 076 8136

---

## 🎉 You're Done!

Your website is now live and fully functional!
