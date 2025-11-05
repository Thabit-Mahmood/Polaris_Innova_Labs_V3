# Railway Deployment Guide

## ✅ Build Fixed!

The build errors have been resolved. Your app is now ready to deploy on Railway.

## Quick Deploy Steps

### 1. Push to GitHub

```bash
git add .
git commit -m "Ready for Railway deployment"
git push origin main
```

### 2. Railway Setup

1. Go to [Railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. Railway will automatically detect Next.js and deploy

### 3. Environment Variables

Add these in Railway Dashboard → Variables:

```env
# REQUIRED - Your production URL (Railway will provide this)
NEXT_PUBLIC_URL=https://your-app.railway.app

# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=thabit252@gmail.com
SMTP_PASSWORD=tgxqqbutzqftbomi
SMTP_FROM=thabit252@gmail.com
SMTP_TO=services@polaris-innova-labs.com,hadil.alsewaiee@gmail.com

# Contact Info
WHATSAPP_NUMBER=966540768136
NEXT_PUBLIC_WHATSAPP_NUMBER=966540768136
NEXT_PUBLIC_PHONE=+966540768136
NEXT_PUBLIC_EMAIL=services@polaris-innova-labs.com

# Admin Panel
ADMIN_PASSWORD=admin123
NEXT_PUBLIC_ADMIN_PASSWORD=admin123

# Security
RATE_LIMIT_MAX=5
RATE_LIMIT_WINDOW_MS=900000
```

### 4. After First Deploy

1. Railway will give you a URL like: `https://your-app.railway.app`
2. Update `NEXT_PUBLIC_URL` variable with this URL
3. Redeploy (Railway will auto-redeploy on variable change)

## What Was Fixed

### 1. Type Errors ✅
- Moved verification codes to separate utility file
- Fixed Next.js API route export restrictions

### 2. Suspense Boundary ✅
- Wrapped `useSearchParams` in Suspense
- Added loading fallback for unsubscribe page

### 3. Build Configuration ✅
- Created `railway.json` for optimal Railway deployment
- Configured build and start commands

## Database on Railway

Railway uses ephemeral storage, so your SQLite database will reset on each deploy. For production, consider:

### Option 1: Railway Volume (Recommended)
1. In Railway Dashboard → Settings
2. Add a Volume
3. Mount path: `/app/data`
4. This persists your database across deploys

### Option 2: External Database
- Use Railway PostgreSQL addon
- Update database.ts to use PostgreSQL instead of SQLite

## File Uploads on Railway

Railway also has ephemeral storage for uploads. For production:

### Option 1: Railway Volume
- Mount volume at `/app/public/uploads`

### Option 2: Cloud Storage (Recommended)
- Use Cloudinary, AWS S3, or similar
- Update upload API to use cloud storage

## Testing Deployment

After deployment, test:
- [ ] Homepage loads
- [ ] Contact form works
- [ ] Newsletter subscription works
- [ ] Admin panel login
- [ ] Blog creation
- [ ] Image uploads
- [ ] Email notifications

## Troubleshooting

### Build Fails
- Check Railway logs
- Ensure all dependencies are in package.json
- Verify Node version compatibility

### Database Issues
- Add Railway Volume for persistence
- Check file permissions

### Email Not Sending
- Verify SMTP credentials
- Check Railway logs for errors
- Test with a simple email first

### Images Not Loading
- Check NEXT_PUBLIC_URL is set correctly
- Verify uploads directory exists
- Consider using cloud storage

## Support

Need help? Contact:
- Email: services@polaris-innova-labs.com
- WhatsApp: +966 54 076 8136

## Next Steps

1. Deploy to Railway
2. Add Volume for database persistence
3. Set up cloud storage for images (optional)
4. Configure custom domain (optional)
5. Set up monitoring and backups
