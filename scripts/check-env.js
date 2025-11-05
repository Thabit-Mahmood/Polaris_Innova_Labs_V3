// Environment Variables Checker for Railway
// Run this to verify all required variables are set

const requiredVars = [
  'NEXT_PUBLIC_URL',
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASSWORD',
  'SMTP_FROM',
  'SMTP_TO',
  'WHATSAPP_NUMBER',
  'NEXT_PUBLIC_WHATSAPP_NUMBER',
  'NEXT_PUBLIC_PHONE',
  'NEXT_PUBLIC_EMAIL',
  'ADMIN_PASSWORD',
  'NEXT_PUBLIC_ADMIN_PASSWORD',
  'RATE_LIMIT_MAX',
  'RATE_LIMIT_WINDOW_MS',
];

console.log('🔍 Checking Environment Variables...\n');

let missing = [];
let present = [];

requiredVars.forEach(varName => {
  if (process.env[varName]) {
    present.push(varName);
    console.log(`✅ ${varName}`);
  } else {
    missing.push(varName);
    console.log(`❌ ${varName} - MISSING!`);
  }
});

console.log('\n' + '='.repeat(50));
console.log(`\n📊 Summary:`);
console.log(`✅ Present: ${present.length}/${requiredVars.length}`);
console.log(`❌ Missing: ${missing.length}/${requiredVars.length}`);

if (missing.length > 0) {
  console.log('\n⚠️  Missing Variables:');
  missing.forEach(v => console.log(`   - ${v}`));
  console.log('\n🔧 Add these in Railway Dashboard → Variables tab');
  process.exit(1);
} else {
  console.log('\n✅ All environment variables are set!');
  process.exit(0);
}
