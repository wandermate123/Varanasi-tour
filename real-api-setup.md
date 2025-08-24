# 🚀 WanderMate Real API Integration Setup Guide

## Overview
Transform your WanderMate AI assistant from mock APIs to production-ready real-world integrations with payment processing, SMS, email, maps, weather, and more!

## 📋 Quick Start Checklist

### 🔥 Phase 1: Essential APIs (15 minutes)
- [ ] **OpenAI** - AI conversations + Speech-to-text ✅ (Already working)
- [ ] **ElevenLabs** - Human-like voice synthesis 🎤
- [ ] **Google Maps** - Location services
- [ ] **OpenWeatherMap** - Weather data
- [ ] **Stripe/Razorpay** - Payment processing
- [ ] **Twilio** - SMS/OTP services
- [ ] **Resend** - Email notifications

### 🌟 Phase 2: Advanced Features (30 minutes)
- [ ] **Google Translate** - Multi-language support
- [ ] **Cloudinary** - Image management
- [ ] **Currency Exchange** - Real-time rates
- [ ] **Amadeus** - Flight/hotel booking

## 🛠️ Step-by-Step Setup

### 1. 🗺️ Google Maps API (10 minutes)

**What it enables:** Real location search, place details, nearby attractions, autocomplete

**Setup:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable these APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API
4. Create credentials → API Key
5. Add restrictions (HTTP referrers for security)

**Add to .env.local:**
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSy...your_key_here
```

**Test endpoint:**
```bash
curl "http://localhost:3000/api/maps/places?action=search&query=restaurants near me"
```

**Free tier:** $200 credit/month

---

### 2. 🌤️ OpenWeatherMap API (5 minutes)

**What it enables:** Real weather data, forecasts, travel advice

**Setup:**
1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Get your free API key
3. No setup required - instant activation

**Add to .env.local:**
```env
OPENWEATHER_API_KEY=your_api_key_here
```

**Test endpoint:**
```bash
curl "http://localhost:3000/api/weather/real?city=New York"
```

**Free tier:** 1,000 calls/day

---

### 3. 🎤 ElevenLabs Voice Synthesis (10 minutes)

**What it enables:** Realistic human-like speech with emotions, natural pauses, and conversational patterns

**Features:**
- Multiple personality voices (Maya, Alex, Sage, Jordan)
- Emotional speech synthesis (excited, calm, thoughtful, etc.)
- Natural speech patterns with "umm", pauses, and breaks
- Real-time streaming audio
- Voice cloning capabilities

**Setup:**
1. Sign up at [ElevenLabs](https://elevenlabs.io/)
2. Go to Profile → API Key
3. Copy your API key

**Add to .env.local:**
```env
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
```

**Test endpoint:**
```bash
curl -X POST "http://localhost:3000/api/voice/elevenlabs" \
  -H "Content-Type: application/json" \
  -d '{
    "action":"synthesize",
    "text":"Well, hello there! I am so excited to help you plan your amazing journey... Let me think about the best places to visit!",
    "voiceType":"friendly-guide",
    "emotion":"excited",
    "context":"travel"
  }' \
  --output speech.mp3
```

**Test conversational AI:**
```bash
# Start a conversation session
curl -X POST "http://localhost:3000/api/conversation" \
  -H "Content-Type: application/json" \
  -d '{
    "action":"start",
    "sessionId":"test123",
    "userId":"user456",
    "userPreferences":{
      "personality":"enthusiastic-host",
      "voiceType":"enthusiastic-host",
      "responseLength":"medium"
    }
  }'

# Send a message
curl -X POST "http://localhost:3000/api/conversation" \
  -H "Content-Type: application/json" \
  -d '{
    "action":"message",
    "sessionId":"test123",
    "message":"I want to visit Paris and need help planning!"
  }'
```

**Available personalities:**
- **Maya (Friendly Guide):** Warm, conversational, uses natural speech patterns
- **Alex (Enthusiastic Host):** Energetic, passionate, gets excited about recommendations  
- **Sage (Calm Narrator):** Serene, thoughtful, takes time to think with longer pauses
- **Jordan (Professional Advisor):** Knowledgeable, businesslike, confident expert advice

**Free tier:** 10,000 characters/month ($5/month for 30,000 characters)

---

### 4. 💳 Payment Processing

#### Option A: Razorpay (For India) - 10 minutes

**What it enables:** UPI, cards, net banking, wallets, EMI

**Setup:**
1. Sign up at [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Complete KYC verification
3. Get test API keys from Settings → API Keys

**Add to .env.local:**
```env
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_secret_key
```

**Test endpoint:**
```bash
curl -X POST "http://localhost:3000/api/payments/razorpay" \
  -H "Content-Type: application/json" \
  -d '{"action":"create_order","amount":100,"currency":"INR"}'
```

#### Option B: Stripe (International) - 10 minutes

**What it enables:** Credit cards, Apple Pay, Google Pay worldwide

**Setup:**
1. Sign up at [Stripe Dashboard](https://dashboard.stripe.com/)
2. Get test API keys from Developers → API keys

**Add to .env.local:**
```env
STRIPE_SECRET_KEY=sk_test_your_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
```

**Test endpoint:**
```bash
curl -X POST "http://localhost:3000/api/payments/stripe" \
  -H "Content-Type: application/json" \
  -d '{"amount":100,"currency":"usd"}'
```

---

### 5. 📱 Twilio SMS/OTP (10 minutes)

**What it enables:** OTP verification, booking confirmations, travel alerts

**Setup:**
1. Sign up at [Twilio Console](https://console.twilio.com/)
2. Get phone number from Phone Numbers → Manage → Buy a number
3. Find Account SID and Auth Token in Account → General

**Add to .env.local:**
```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890
```

**Test endpoint:**
```bash
curl -X POST "http://localhost:3000/api/sms/twilio" \
  -H "Content-Type: application/json" \
  -d '{"action":"send_otp","phoneNumber":"+1234567890"}'
```

**Free tier:** $15 credit on signup

---

### 6. 📧 Resend Email (5 minutes)

**What it enables:** Booking confirmations, OTP emails, receipts

**Setup:**
1. Sign up at [Resend](https://resend.com/)
2. Verify your domain (or use resend.dev for testing)
3. Create API key from Settings → API Keys

**Add to .env.local:**
```env
RESEND_API_KEY=re_your_api_key_here
FROM_EMAIL=noreply@yourdomain.com
```

**Test endpoint:**
```bash
curl -X POST "http://localhost:3000/api/email/resend" \
  -H "Content-Type: application/json" \
  -d '{
    "action":"send_otp_email",
    "to":"user@example.com",
    "otp":"123456",
    "customerName":"John Doe"
  }'
```

**Free tier:** 3,000 emails/month

---

## 🧪 Testing Your Real APIs

### 1. Test All Endpoints

```bash
# Test conversational AI
curl -X POST "http://localhost:3000/api/conversation" \
  -H "Content-Type: application/json" \
  -d '{
    "action":"start",
    "sessionId":"test_session",
    "userId":"test_user",
    "userPreferences":{"personality":"friendly-guide"}
  }'

# Test voice synthesis (save audio to file)
curl -X POST "http://localhost:3000/api/voice/elevenlabs" \
  -H "Content-Type: application/json" \
  -d '{
    "action":"synthesize",
    "text":"Hello! Welcome to WanderMate. I am Maya, your friendly travel guide, and I am so excited to help you discover amazing places today!",
    "voiceType":"friendly-guide",
    "emotion":"welcoming"
  }' --output welcome.mp3

# Test weather
curl "http://localhost:3000/api/weather/real?city=Mumbai"

# Test places
curl "http://localhost:3000/api/maps/places?action=nearby&location=19.0760,72.8777&type=restaurant"

# Test payment order creation
curl -X POST "http://localhost:3000/api/payments/razorpay" \
  -H "Content-Type: application/json" \
  -d '{"action":"create_order","amount":100}'

# Test SMS OTP
curl -X POST "http://localhost:3000/api/sms/twilio" \
  -H "Content-Type: application/json" \
  -d '{"action":"send_otp","phoneNumber":"+91xxxxxxxxxx"}'

# Test email
curl -X POST "http://localhost:3000/api/email/resend" \
  -H "Content-Type: application/json" \
  -d '{"action":"send_otp_email","to":"test@example.com","otp":"123456"}'
```

### 2. Integration Test Flow

1. **User Registration Flow:**
   - Send OTP via SMS/Email → Verify OTP → Create user

2. **Booking Flow:**
   - Search places → Get weather → Create booking → Process payment → Send confirmations

3. **AI Integration:**
   - Ask AI to "book a hotel in Mumbai" → Real search → Real booking → Real payment

## 🔧 Advanced Integrations

### Google Cloud Translation (Multi-language)

```env
GOOGLE_TRANSLATE_API_KEY=your_translate_key
```

### Cloudinary (Image Management)

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Currency Exchange

```env
EXCHANGE_RATE_API_KEY=your_exchange_rate_key
```

## 💰 Cost Estimation (Monthly)

| Service | Free Tier | Paid (Small Scale) |
|---------|-----------|-------------------|
| OpenAI | - | $5-20 |
| ElevenLabs | 10K chars/month | $5 (30K chars) |
| Google Maps | $200 credit | $10-50 |
| OpenWeatherMap | 1K calls/day | $40 (1M calls) |
| Twilio SMS | $15 credit | $20-100 |
| Resend Email | 3K emails | $20 (100K) |
| Razorpay | - | 2% transaction fee |
| Stripe | - | 2.9% + 30¢ |

**Total monthly cost for moderate usage: $35-120**

## 🛡️ Security Best Practices

1. **API Key Security:**
   - Never commit .env.local to git
   - Use different keys for development/production
   - Rotate keys regularly
   - Set up API key restrictions

2. **Payment Security:**
   - Always verify payments server-side
   - Use webhook signatures
   - Implement proper error handling
   - Log all transactions

3. **Rate Limiting:**
   - Implement API rate limiting
   - Add request throttling
   - Monitor usage patterns

## 🚀 Production Deployment

1. **Environment Variables:**
   - Set all API keys in production environment
   - Use secrets management (Vercel/Railway secrets)
   - Enable production mode for payment gateways

2. **Domain Configuration:**
   - Set up custom domain
   - Configure CORS properly
   - Update webhook URLs

3. **Monitoring:**
   - Set up error tracking (Sentry)
   - Monitor API usage and costs
   - Set up alerts for failures

## 📞 Support & Resources

### Documentation Links:
- [OpenAI API Docs](https://platform.openai.com/docs)
- [ElevenLabs API Docs](https://docs.elevenlabs.io/)
- [Google Maps API](https://developers.google.com/maps/documentation)
- [Razorpay API](https://razorpay.com/docs/)
- [Stripe API](https://stripe.com/docs/api)
- [Twilio API](https://www.twilio.com/docs)
- [Resend API](https://resend.com/docs)

### Community Support:
- Join our Discord for help
- Check GitHub issues for common problems
- Contribute to the project!

---

## 🎉 Congratulations!

You now have a production-ready travel platform with:
- ✅ Real AI conversations with human-like personalities
- ✅ Realistic voice synthesis with emotions and natural speech
- ✅ Speech-to-text with conversation analysis
- ✅ Live maps and places
- ✅ Actual weather data
- ✅ Real payment processing
- ✅ SMS/Email notifications
- ✅ Multi-language support

Your WanderMate AI is now ready to serve real users with real bookings and real payments! 🌟 