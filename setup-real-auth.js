const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('🚀 Setting up Real Authentication for WanderMate...\n');

// Generate a secure NextAuth secret
const generateSecret = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Environment variables template
const envTemplate = `# Database
DATABASE_URL="file:./dev.db"

# NextAuth.js Configuration
NEXTAUTH_SECRET="${generateSecret()}"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth Configuration (Optional - Get from Google Cloud Console)
# Instructions: https://console.cloud.google.com/apis/credentials
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Email Configuration (Optional - for sending verification emails)
EMAIL_FROM="noreply@wandermate.com"
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER=""
EMAIL_SERVER_PASSWORD=""

# Development
NODE_ENV="development"
`;

// Create .env.local if it doesn't exist
const envPath = path.join(__dirname, '.env.local');
if (!fs.existsSync(envPath)) {
  fs.writeFileSync(envPath, envTemplate);
  console.log('✅ Created .env.local with authentication configuration');
} else {
  console.log('⚠️  .env.local already exists. Please check it has the required variables.');
}

console.log('\n📋 Authentication Setup Complete!');
console.log('\n🔧 Next Steps:');
console.log('1. Open .env.local and add your Google OAuth credentials (optional)');
console.log('2. Run: npm run dev');
console.log('3. Test registration at: http://localhost:3000/auth/signup');
console.log('4. Test login at: http://localhost:3000/auth/signin');

console.log('\n🔑 Google OAuth Setup (Optional):');
console.log('1. Go to: https://console.cloud.google.com/apis/credentials');
console.log('2. Create a new OAuth 2.0 Client ID');
console.log('3. Add authorized redirect URI: http://localhost:3000/api/auth/callback/google');
console.log('4. Copy Client ID and Secret to .env.local');

console.log('\n🎯 Test Accounts:');
console.log('After registration, you can create test accounts with:');
console.log('- Email: test@wandermate.com');
console.log('- Password: TestPassword123!');
console.log('');
console.log('The system now supports:');
console.log('✅ Real user registration with email/password');
console.log('✅ Secure password hashing with bcrypt');
console.log('✅ Database storage with Prisma');
console.log('✅ Google OAuth (when configured)');
console.log('✅ Session management with NextAuth.js');
console.log('✅ User profile and membership tracking');

console.log('\n🚀 Authentication is now fully functional!'); 