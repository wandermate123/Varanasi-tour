#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function setupEnvironment() {
  console.log('🚀 WanderMate AI Environment Setup');
  console.log('=====================================\n');

  const envPath = '.env.local';
  let envContent = '';

  try {
    // Check if .env.local already exists
    if (fs.existsSync(envPath)) {
      console.log('✅ Found existing .env.local file');
      const useExisting = await question('Do you want to update it? (y/n): ');
      if (useExisting.toLowerCase() !== 'y') {
        console.log('Setup cancelled.');
        rl.close();
        return;
      }
      envContent = fs.readFileSync(envPath, 'utf8');
    }

    console.log('\n📝 Let\'s set up your API keys:\n');

    // Google Maps API Key
    console.log('🗺️  Google Maps API Key');
    console.log('   Get it from: https://console.cloud.google.com/apis/credentials');
    console.log('   Make sure to enable: Maps JavaScript API, Places API');
    const googleMapsKey = await question('   Enter your Google Maps API key (starts with AIzaSy): ');
    
    if (googleMapsKey && !googleMapsKey.startsWith('AIzaSy')) {
      console.log('   ⚠️  Warning: Google Maps API keys usually start with "AIzaSy"');
    }

    // OpenAI API Key
    console.log('\n🤖 OpenAI API Key (for AI features)');
    console.log('   Get it from: https://platform.openai.com/api-keys');
    const openaiKey = await question('   Enter your OpenAI API key (starts with sk-): ');

    // Weather API Key
    console.log('\n🌤️  Weather API Key (optional)');
    console.log('   Get it from: https://openweathermap.org/api');
    const weatherKey = await question('   Enter your OpenWeather API key (optional): ');

    // Build environment file content
    const newEnvContent = `# WanderMate AI - Environment Configuration
# Generated on ${new Date().toISOString()}

# Google Maps API (REQUIRED for maps functionality)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=${googleMapsKey || 'your_google_maps_api_key_here'}

# OpenAI API (REQUIRED for AI features)
OPENAI_API_KEY=${openaiKey || 'your_openai_api_key_here'}

# Weather API (optional)
OPENWEATHER_API_KEY=${weatherKey || 'your_weather_api_key_here'}

# Redis for memory (optional - get from https://upstash.com/)
UPSTASH_REDIS_URL=your_redis_url_here
UPSTASH_REDIS_TOKEN=your_redis_token_here

# Payment processing (optional)
RAZORPAY_KEY_ID=your_razorpay_key_here
RAZORPAY_KEY_SECRET=your_razorpay_secret_here

# App configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here
NODE_ENV=development

# Voice/Speech APIs (optional)
ELEVEN_LABS_API_KEY=your_eleven_labs_key_here

# Additional APIs (optional)
AMADEUS_API_KEY=your_amadeus_key_here
AMADEUS_API_SECRET=your_amadeus_secret_here
`;

    // Write the file
    fs.writeFileSync(envPath, newEnvContent);
    
    console.log('\n✅ Environment file created successfully!');
    console.log('\n📋 Next steps:');
    console.log('   1. Add any missing API keys to .env.local');
    console.log('   2. Restart your development server: npm run dev');
    console.log('   3. Visit http://localhost:3000/maps-test to test your setup');
    
    // Validate the setup
    console.log('\n🔍 Validating your setup:');
    
    if (googleMapsKey && googleMapsKey.startsWith('AIzaSy')) {
      console.log('   ✅ Google Maps API key format looks correct');
    } else {
      console.log('   ❌ Google Maps API key missing or incorrect format');
    }
    
    if (openaiKey && openaiKey.startsWith('sk-')) {
      console.log('   ✅ OpenAI API key format looks correct');
    } else {
      console.log('   ❌ OpenAI API key missing or incorrect format');
    }

    console.log('\n🎉 Setup complete! Happy coding!');

  } catch (error) {
    console.error('Error setting up environment:', error);
  } finally {
    rl.close();
  }
}

// Run the setup
setupEnvironment(); 