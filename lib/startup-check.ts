// Startup environment check
export function checkEnvironment() {
  const required = [
    'SMTP_HOST',
    'SMTP_PORT', 
    'SMTP_USER',
    'SMTP_PASSWORD',
    'SMTP_FROM',
    'SMTP_TO',
  ];

  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.warn('⚠️  Missing environment variables:', missing.join(', '));
    console.warn('⚠️  Email functionality will not work!');
    console.warn('⚠️  Add these in Railway Dashboard → Variables tab');
  } else {
    console.log('✅ All required environment variables are set');
  }
}
