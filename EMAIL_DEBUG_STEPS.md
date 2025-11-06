# Email Debugging Steps

## After Deployment (wait 2-3 minutes)

### Step 1: Test Contact Form

1. Go to your website homepage
2. Fill out the contact form
3. Submit it
4. **Immediately** go to Railway Dashboard → View Logs
5. Look for these log messages:

```
📧 Attempting to send emails...
Creating email transporter with config:
📧 Sending admin notification email...
✅ Admin notification sent: <message-id>
📧 Sending customer thank you email...
✅ Customer thank you email sent: <message-id>
✅ All contact emails sent successfully
```

### Step 2: Check for Errors

If you see any of these errors in the logs:

**"Invalid login"** or **"Authentication failed"**
- SMTP_PASSWORD is wrong
- Make sure it's the 16-character App Password (no spaces)
- Regenerate App Password from Google Account

**"SMTP_FROM mismatch"** or **"Sender address rejected"**
- SMTP_FROM must match SMTP_USER exactly
- Both should be: services@polaris-innova-labs.com

**"Connection timeout"**
- SMTP_HOST or SMTP_PORT is wrong
- Should be: smtp.gmail.com and 587

**"Recipient address rejected"**
- SMTP_TO has invalid email address
- Check for typos

### Step 3: Check Spam Folder

If logs show emails sent successfully but you don't receive them:
1. Check spam/junk folder in both emails
2. Add services@polaris-innova-labs.com to contacts
3. Mark as "Not Spam" if found

### Step 4: Verify Gmail Settings

For services@polaris-innova-labs.com:

1. **2-Factor Authentication**: Must be enabled
2. **App Password**: Must be generated and used as SMTP_PASSWORD
3. **Less secure apps**: NOT needed (we use App Password)

To generate App Password:
1. Go to: https://myaccount.google.com/apppasswords
2. Sign in with services@polaris-innova-labs.com
3. Select "Mail" and your device
4. Copy the 16-character password (no spaces)
5. Use this as SMTP_PASSWORD in Railway

## Image Display Issues

### Check Image Paths

Images might not display if:

1. **Relative paths used**: `/uploads/image.jpg`
   - Need full URL: `https://your-domain.com/uploads/image.jpg`

2. **Images not uploaded**: Check if files exist in `/public/uploads/`

3. **Wrong image URLs**: Check in admin panel what URLs are saved

### To Fix Image Display:

1. Go to `/admin`
2. Edit a blog post
3. Look at the image URLs in the form
4. They should be full URLs like: `https://polarisinnovalabsv3-production.up.railway.app/uploads/...`
5. If they're relative paths like `/uploads/...`, the upload system needs fixing

### Test Image Upload:

1. Go to `/admin`
2. Create new blog
3. Upload an image
4. Check browser console (F12) for upload response
5. Should return full URL

## Quick Checklist

After deployment, verify in Railway Variables:

```
✅ SMTP_HOST=smtp.gmail.com
✅ SMTP_PORT=587
✅ SMTP_USER=services@polaris-innova-labs.com
✅ SMTP_PASSWORD=[16-char app password]
✅ SMTP_FROM=services@polaris-innova-labs.com (MUST MATCH SMTP_USER!)
✅ SMTP_TO=services@polaris-innova-labs.com,hadil.alsewaiee@gmail.com
```

## What to Share if Still Not Working

1. **Railway Logs** (last 50 lines after submitting contact form)
2. **Browser Console** (F12 → Console tab, any errors)
3. **Screenshot** of Railway Variables (hide SMTP_PASSWORD)
4. **Error message** from email test: `/api/test-smtp`

## Expected Behavior

When everything works:

1. **Contact Form**: 
   - User submits form
   - Sees success message
   - Admin receives notification email
   - User receives thank you email

2. **Newsletter**:
   - User subscribes
   - Receives confirmation email
   - Appears in admin subscribers list

3. **Blog Publish**:
   - Admin publishes blog
   - All subscribers receive notification email

4. **Images**:
   - Display on blog listing page
   - Display on individual blog post
   - Display in admin panel
