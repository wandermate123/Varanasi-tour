#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n🚀 WanderMate AI Agent - API Setup Wizard\n');
console.log('This wizard will help you configure API keys for enhanced functionality.\n');
console.log('You can skip any service by pressing Enter without typing anything.\n');

const apiKeys = {};

function askQuestion(question, key) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      if (answer.trim()) {
        apiKeys[key] = answer.trim();
      }
      resolve();
    });
  });
}

async function runSetup() {
  console.log('📝 Please enter your API keys (or press Enter to skip):\n');

  // OpenAI API
  await askQuestion('🤖 OpenAI API Key (for enhanced AI chat): ', 'NEXT_PUBLIC_OPENAI_API_KEY');
  
  // Google Cloud APIs  
  await askQuestion('🗺️  Google Maps API Key: ', 'NEXT_PUBLIC_GOOGLE_MAPS_API_KEY');
  await askQuestion('🌐 Google Translate API Key: ', 'NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY');
  
  // OpenWeather API
  await askQuestion('🌤️  OpenWeather API Key: ', 'NEXT_PUBLIC_OPENWEATHER_API_KEY');
  
  // Stripe API
  await askQuestion('💳 Stripe Publishable Key: ', 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY');
  await askQuestion('🔐 Stripe Secret Key: ', 'STRIPE_SECRET_KEY');
  
  // Optional APIs
  await askQuestion('🎯 ElevenLabs API Key (optional): ', 'NEXT_PUBLIC_ELEVENLABS_API_KEY');
  
  // Create .env.local file
  const envContent = Object.entries(apiKeys)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  if (envContent) {
    fs.writeFileSync('.env.local', envContent + '\n');
    console.log('\n✅ .env.local file created successfully!');
    console.log(`📊 Configured ${Object.keys(apiKeys).length} API keys.`);
  } else {
    console.log('\n⚠️  No API keys were provided. The app will use mock data.');
  }

  console.log('\n🎯 Next Steps:');
  console.log('1. Run: npm run dev');
  console.log('2. Open: http://localhost:3000');
  console.log('3. Test the enhanced AI features!');
  
  console.log('\n💡 Pro Tips:');
  console.log('• Start with OpenAI API key for the best experience');
  console.log('• Google Maps & Weather APIs are highly recommended');
  console.log('• All APIs have generous free tiers for personal use');
  
  console.log('\n📚 Need API keys? Check: API_INTEGRATION_GUIDE.md');
  console.log('\n🌟 Happy traveling with WanderMate AI Agent!');

  rl.close();
}

runSetup().catch(console.error); 