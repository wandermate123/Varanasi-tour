#!/usr/bin/env node

/**
 * WanderMate AI - Complete API Setup Script
 * This script helps you set up all the necessary API keys and services
 * for the most advanced AI travel agent.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const envTemplate = `# ========================================
# WanderMate AI - Complete API Configuration
# Copy this to .env.local and fill in your API keys
# ========================================

# ===== AI & Language Processing =====
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_key_here
GOOGLE_AI_API_KEY=your_google_ai_key_here

# ===== Maps & Location Services =====
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
MAPBOX_ACCESS_TOKEN=your_mapbox_token_here
GOOGLE_PLACES_API_KEY=your_google_places_key_here

# ===== Weather Services =====
OPENWEATHER_API_KEY=your_openweather_key_here
WEATHERAPI_KEY=your_weatherapi_key_here

# ===== Travel & Booking APIs =====
BOOKING_COM_AFFILIATE_ID=your_booking_affiliate_id_here
AGODA_API_KEY=your_agoda_api_key_here
AMADEUS_API_KEY=your_amadeus_key_here
AMADEUS_API_SECRET=your_amadeus_secret_here
SKYSCANNER_API_KEY=your_skyscanner_key_here

# ===== Indian Transport APIs =====
IRCTC_API_KEY=your_irctc_key_here
REDBUS_API_KEY=your_redbus_key_here
OLA_API_KEY=your_ola_key_here
UBER_API_KEY=your_uber_key_here

# ===== Payment Gateways =====
RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_secret_here
STRIPE_PUBLISHABLE_KEY=your_stripe_public_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key_here
PAYTM_MERCHANT_ID=your_paytm_merchant_id_here
PAYTM_MERCHANT_KEY=your_paytm_key_here

# ===== Database & Cache =====
PINECONE_API_KEY=your_pinecone_api_key_here
PINECONE_ENVIRONMENT=your_pinecone_environment_here
UPSTASH_REDIS_URL=your_upstash_redis_url_here
UPSTASH_REDIS_TOKEN=your_upstash_redis_token_here
MONGODB_URI=your_mongodb_connection_string_here

# ===== Voice & Speech Services =====
AZURE_SPEECH_KEY=your_azure_speech_key_here
AZURE_SPEECH_REGION=your_azure_region_here
ELEVEN_LABS_API_KEY=your_eleven_labs_key_here
GOOGLE_CLOUD_TTS_KEY=your_google_tts_key_here

# ===== Translation Services =====
GOOGLE_TRANSLATE_API_KEY=your_google_translate_key_here
AZURE_TRANSLATOR_KEY=your_azure_translator_key_here

# ===== Communication APIs =====
TWILIO_ACCOUNT_SID=your_twilio_sid_here
TWILIO_AUTH_TOKEN=your_twilio_token_here
WHATSAPP_API_KEY=your_whatsapp_key_here

# ===== Analytics & Monitoring =====
GOOGLE_ANALYTICS_ID=your_ga_id_here
MIXPANEL_TOKEN=your_mixpanel_token_here
SENTRY_DSN=your_sentry_dsn_here

# ===== Currency & Exchange =====
FIXER_API_KEY=your_fixer_key_here
CURRENCYLAYER_API_KEY=your_currency_key_here

# ===== Local Services (India) =====
ZOMATO_API_KEY=your_zomato_key_here
SWIGGY_API_KEY=your_swiggy_key_here
JUSTDIAL_API_KEY=your_justdial_key_here

# ===== Emergency & Safety =====
EMERGENCY_API_KEY=your_emergency_service_key_here

# ===== App Configuration =====
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here
NODE_ENV=development`;

const apiServices = [
  {
    name: 'OpenAI',
    url: 'https://platform.openai.com/api-keys',
    description: 'Core AI intelligence and language processing',
    required: true,
    envKey: 'OPENAI_API_KEY'
  },
  {
    name: 'Google Maps',
    url: 'https://console.cloud.google.com/apis/credentials',
    description: 'Maps, navigation, and location services',
    required: true,
    envKey: 'NEXT_PUBLIC_GOOGLE_MAPS_API_KEY'
  },
  {
    name: 'OpenWeatherMap',
    url: 'https://openweathermap.org/api',
    description: 'Real-time weather data',
    required: true,
    envKey: 'OPENWEATHER_API_KEY'
  },
  {
    name: 'Upstash Redis',
    url: 'https://upstash.com/',
    description: 'Conversation memory and caching',
    required: true,
    envKey: 'UPSTASH_REDIS_URL'
  },
  {
    name: 'Razorpay',
    url: 'https://dashboard.razorpay.com/',
    description: 'Payment processing for bookings',
    required: false,
    envKey: 'RAZORPAY_KEY_ID'
  },
  {
    name: 'ElevenLabs',
    url: 'https://elevenlabs.io/',
    description: 'Advanced text-to-speech',
    required: false,
    envKey: 'ELEVEN_LABS_API_KEY'
  },
  {
    name: 'Amadeus',
    url: 'https://developers.amadeus.com/',
    description: 'Flight and hotel booking',
    required: false,
    envKey: 'AMADEUS_API_KEY'
  },
  {
    name: 'Booking.com',
    url: 'https://www.booking.com/affiliate-program/',
    description: 'Hotel booking integration',
    required: false,
    envKey: 'BOOKING_COM_AFFILIATE_ID'
  }
];

function showWelcome() {
  console.log(`
🌟 ========================================
🌟 WanderMate AI - Complete Setup Wizard
🌟 ========================================

Welcome! This script will help you set up the most advanced
AI travel agent with all necessary API integrations.

Your WanderMate AI will have:
✅ Advanced conversational AI (14+ languages)
✅ Real-time maps and navigation
✅ Weather-aware suggestions
✅ Hotel and transport booking
✅ Voice interaction (speech-to-text & text-to-speech)
✅ Cultural insights and storytelling
✅ Emergency assistance
✅ Memory across conversations
✅ Live data integration

Let's get started!
`);
}

function showAPIServices() {
  console.log('\n📋 Required API Services:\n');
  
  apiServices.forEach((service, index) => {
    const status = service.required ? '🔴 REQUIRED' : '🟡 OPTIONAL';
    console.log(`${index + 1}. ${service.name} (${status})`);
    console.log(`   ${service.description}`);
    console.log(`   🔗 ${service.url}\n`);
  });
}

function createEnvFile() {
  const envPath = path.join(process.cwd(), '.env.local');
  
  if (fs.existsSync(envPath)) {
    console.log('⚠️  .env.local already exists. Creating backup...');
    fs.copyFileSync(envPath, `${envPath}.backup.${Date.now()}`);
  }
  
  fs.writeFileSync(envPath, envTemplate);
  console.log('✅ Created .env.local file with all API key placeholders');
}

function showQuickStart() {
  console.log(`
🚀 Quick Start Guide:

1. Essential APIs (Start with these):
   • OpenAI: Get your API key from https://platform.openai.com/api-keys
   • Google Maps: Enable Maps JavaScript API at https://console.cloud.google.com/
   • OpenWeatherMap: Free API at https://openweathermap.org/api
   • Upstash Redis: Free Redis database at https://upstash.com/

2. Optional APIs (Add later for enhanced features):
   • Razorpay for payments
   • ElevenLabs for better voice
   • Amadeus for flight booking
   • Booking.com for hotels

3. Next Steps:
   • Fill in your API keys in .env.local
   • Run: npm run dev
   • Open http://localhost:3000
   • Click the WanderMate AI button to test!

🎯 Minimum Setup for Testing:
Just add OPENAI_API_KEY and you can start chatting!
Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY for maps.
Add OPENWEATHER_API_KEY for weather data.

💡 Pro Tip: Start with free tiers of all services!
`);
}

async function main() {
  showWelcome();
  
  await new Promise(resolve => {
    rl.question('Press Enter to continue...', () => resolve());
  });
  
  showAPIServices();
  createEnvFile();
  showQuickStart();
  
  console.log('\n🎉 Setup complete! Your WanderMate AI is ready to configure.');
  console.log('📝 Edit .env.local with your API keys and start the development server.');
  
  rl.close();
}

if (require.main === module) {
  main().catch(console.error);
} 