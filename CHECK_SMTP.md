# SMTP Configuration Check

## Current Issue
Emails are not being sent when:
- Contact form is submitted
- Newsletter subscription happens

## What You Need to Verify in Railway

Go to Railway Dashboard → Variables and check these EXACT values:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=services@polaris-innova-labs.com
SMTP_PASSWORD=[your app password]
SMTP_FROM=services@polaris-innova-labs.com
SMTP_TO=services@polaris-innova-labs.com,hadil.alsewaiee@gmail.com
```

## Important Notes

1. **SMTP_USER and SMTP_FROM must match!**
   - If SMTP_USER is `services@polaris-innova-labs.com`
   - Then SMTP_FROM must also be `services@polaris-innova-labs.com`

2. **SMTP_PASSWORD must be an App Password**
   - NOT your regular Gmail password
   - Must be generated from Google Account settings
   - Format: 16 characters, no spaces

3. **Gmail App Password Setup**
   - Go to: https://myaccount.google.com/apppasswords
   - Sign in with services@polaris-innova-labs.com
   - Create new app password for "Mail"
   - Copy the 16-character password
   - Use that as SMTP_PASSWORD

## Test SMTP After Setting

Visit this URL after deployment:
```
https://polarisinnovalabsv3-production.up.railway.app/api/test-smtp
```

Should return:
```json
{
  "success": true,
  "message": "SMTP connection successful and test email sent"
}
```

If it fails, check the error message in the response.

## Common Errors

**"Invalid login"** → Wrong SMTP_PASSWORD or SMTP_USER

**"SMTP_FROM mismatch"** → SMTP_FROM doesn't match SMTP_USER

**"Connection timeout"** → Wrong SMTP_HOST or SMTP_PORT

**"Authentication failed"** → Need to enable 2FA and create App Password

## After Fixing SMTP

Test these:
1. Contact form → Should send 2 emails
2. Newsletter subscription → Should send confirmation email
3. Blog publish → Should send to all subscribers
