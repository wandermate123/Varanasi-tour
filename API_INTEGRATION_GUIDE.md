# 🚀 WanderMate AI Agent - API Integration Guide

## Overview
This guide will help you integrate real API keys to unlock the full potential of WanderMate AI Agent with live services.

## 🔑 Required API Keys

### 1. OpenAI API (Primary AI Brain)
**Purpose**: Enhanced conversational AI, smart responses, and contextual understanding
- **Get API Key**: [OpenAI Platform](https://platform.openai.com/api-keys)
- **Cost**: Pay-per-use (very affordable for personal use)
- **Benefits**: 
  - Natural conversation flow
  - Context-aware responses
  - Smart travel recommendations
  - Better understanding of user queries

### 2. Google Cloud APIs (Multiple Services)
**Purpose**: Maps, Translation, Speech, and Places
- **Get API Keys**: [Google Cloud Console](https://console.cloud.google.com/)
- **Required APIs**:
  - Google Maps JavaScript API
  - Google Places API
  - Google Translate API
  - Google Speech-to-Text API
  - Google Text-to-Speech API

### 3. OpenWeather API (Weather Services)
**Purpose**: Real-time weather data for travel planning
- **Get API Key**: [OpenWeather](https://openweathermap.org/api)
- **Cost**: Free tier available (1000 calls/day)
- **Benefits**:
  - Live weather updates
  - 5-day forecasts
  - Weather alerts
  - Travel-specific weather advice

### 4. Stripe API (Payment Processing)
**Purpose**: Secure hotel bookings and transactions
- **Get API Key**: [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
- **Benefits**:
  - Secure payment processing
  - International card support
  - UPI integration
  - Real booking confirmations

### 5. Booking.com API (Hotel Search)
**Purpose**: Real hotel availability and pricing
- **Get API Key**: [Booking.com Partner Hub](https://partners.booking.com/)
- **Benefits**:
  - Live hotel availability
  - Real-time pricing
  - Actual booking capabilities
  - Reviews and ratings

## 🛠️ Setup Instructions

### Step 1: Create Environment File
Create a `.env.local` file in your project root:

```bash
# OpenAI API (Primary AI service)
NEXT_PUBLIC_OPENAI_API_KEY=sk-your-openai-key-here
OPENAI_API_KEY=sk-your-openai-key-here

# Google Cloud APIs
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-key
NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY=your-google-translate-key
NEXT_PUBLIC_GOOGLE_SPEECH_API_KEY=your-google-speech-key
NEXT_PUBLIC_GOOGLE_TTS_API_KEY=your-google-tts-key

# OpenWeather API
NEXT_PUBLIC_OPENWEATHER_API_KEY=your-openweather-key

# Stripe Payment API
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-key
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key

# Booking.com API
NEXT_PUBLIC_BOOKING_API_KEY=your-booking-api-key

# Optional: Enhanced Services
NEXT_PUBLIC_ELEVENLABS_API_KEY=your-elevenlabs-key
NEXT_PUBLIC_AZURE_SPEECH_KEY=your-azure-speech-key
NEXT_PUBLIC_AZURE_SPEECH_REGION=eastus
```

### Step 2: Install Additional Dependencies
```bash
npm install stripe openai google-translate-api axios
```

### Step 3: Restart Development Server
```bash
npm run dev
```

## 🔧 Current Mock vs Real API Comparison

| Service | Mock Data | Real API Benefits |
|---------|-----------|-------------------|
| **Chat AI** | Predefined responses | Natural conversation, context awareness |
| **Hotels** | 3 static hotels | Live availability, pricing, real bookings |
| **Weather** | Static Varanasi weather | Live weather, forecasts, alerts |
| **Translation** | Basic phrase translation | Accurate translation, 100+ languages |
| **Maps** | Static directions | Live traffic, real-time navigation |
| **Payments** | Simulated transactions | Real payment processing |

## 🌟 Enhanced Features with Real APIs

### 1. Smart Conversational AI
- **Without API**: Basic predefined responses
- **With OpenAI**: Natural conversation, context understanding, personalized recommendations

### 2. Live Hotel Booking
- **Without API**: Mock hotel data
- **With Booking.com**: Real availability, pricing, instant bookings

### 3. Real-time Weather
- **Without API**: Static weather data
- **With OpenWeather**: Live updates, forecasts, travel advisories

### 4. Advanced Translation
- **Without API**: Basic phrase translation
- **With Google Translate**: Accurate translation, voice input/output

### 5. Live Navigation
- **Without API**: Static directions
- **With Google Maps**: Real-time traffic, live directions, nearby places

### 6. Secure Payments
- **Without API**: Simulated transactions
- **With Stripe**: Real payment processing, secure transactions

## 🚀 Quick Start Commands

1. **Get your API keys** from the links above
2. **Create `.env.local`** with your keys
3. **Restart the app**: `npm run dev`
4. **Test the enhanced features** in the AI chat

## 🔒 Security Best Practices

1. **Never commit API keys** to version control
2. **Use environment variables** for all secrets
3. **Implement rate limiting** for API calls
4. **Monitor API usage** to avoid unexpected charges
5. **Use test keys** for development

## 📊 Expected Costs (Monthly)

- **OpenAI API**: $5-20 (depending on usage)
- **Google Cloud APIs**: $10-30 (generous free tier)
- **OpenWeather API**: Free (up to 1000 calls/day)
- **Stripe**: 2.9% + $0.30 per transaction
- **Booking.com**: Commission-based (no upfront cost)

## 🎯 Priority Integration Order

1. **OpenAI API** - Most impactful for user experience
2. **Google Maps API** - Essential for navigation
3. **OpenWeather API** - Important for travel planning
4. **Google Translate API** - Critical for multilingual support
5. **Stripe API** - For real booking capabilities
6. **Booking.com API** - For live hotel data

## 🐛 Troubleshooting

### Common Issues:
1. **API key not working**: Check environment variable names
2. **CORS errors**: Verify domain settings in API console
3. **Rate limiting**: Implement proper error handling
4. **Billing issues**: Monitor usage dashboards

### Debug Commands:
```bash
# Check environment variables
echo $NEXT_PUBLIC_OPENAI_API_KEY

# Restart with fresh environment
npm run dev
```

---

**Ready to unlock the full potential?** Get your API keys and let WanderMate AI Agent become your ultimate travel companion! 🌟 