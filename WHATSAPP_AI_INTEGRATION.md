# 📱 WanderMate WhatsApp AI Integration

## 🎉 Overview

WanderMate now features a complete WhatsApp Business API integration that allows travelers to interact with our AI travel assistant directly through WhatsApp. This integration provides a seamless, conversational experience for planning trips, booking services, and getting local recommendations for Varanasi.

## ✨ Key Features

### 🤖 AI-Powered Conversations
- **OpenAI GPT Integration**: Intelligent responses using the existing AI system
- **Context Awareness**: Remembers conversation history and user preferences
- **Multi-language Support**: English and Hindi responses
- **Intent Detection**: Automatically identifies user needs (planning, booking, food, etc.)

### 📱 WhatsApp Business API
- **Real-time Messaging**: Instant message delivery and responses
- **Interactive Buttons**: Quick reply options for better UX
- **Media Support**: Handles text, voice, and image messages
- **Webhook Security**: Verified signatures and secure message processing

### 🗺️ Travel-Specific Capabilities
- **Trip Planning**: Personalized itineraries based on preferences
- **Hotel Booking**: Recommendations and booking assistance
- **Transportation**: Cab, auto, and boat ride arrangements
- **Food Recommendations**: Local restaurants and street food spots
- **Cultural Insights**: Temple visits, ghat experiences, spiritual guidance
- **Emergency Support**: 24/7 assistance and local contacts

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   WhatsApp      │    │   WanderMate     │    │   OpenAI GPT    │
│   Business API  │───▶│   Webhook        │───▶│   AI Service    │
│                 │    │   Handler        │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌──────────────────┐
                       │   Message        │
                       │   Processor      │
                       └──────────────────┘
                                │
                                ▼
                       ┌──────────────────┐
                       │   WhatsApp       │
                       │   Sender         │
                       └──────────────────┘
```

## 📁 File Structure

```
src/
├── app/
│   └── api/
│       └── whatsapp/
│           ├── webhook/
│           │   └── route.ts          # Main webhook handler
│           ├── test/
│           │   └── route.ts          # Test message sending
│           └── test-ai/
│               └── route.ts          # Test AI integration
├── lib/
│   ├── whatsappUtils.ts              # Utility functions
│   ├── whatsappProcessor.ts          # Message processing logic
│   └── whatsappSender.ts             # Message sending functions
├── components/
│   └── WhatsAppAIDemo.tsx            # Frontend demo component
└── app/
    └── whatsapp-demo/
        └── page.tsx                  # Demo page
```

## 🚀 Quick Start

### 1. Environment Setup

Add these variables to your `.env.local`:

```env
# WhatsApp Business API Configuration
WHATSAPP_ACCESS_TOKEN=your_access_token_here
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id_here
WHATSAPP_APP_SECRET=your_app_secret_here
WHATSAPP_VERIFY_TOKEN=your_webhook_verify_token_here
WHATSAPP_WEBHOOK_URL=https://yourdomain.com/api/whatsapp/webhook
```

### 2. Test the Integration

```bash
# Test webhook verification
curl "http://localhost:3000/api/whatsapp/webhook?hub.mode=subscribe&hub.verify_token=YOUR_TOKEN&hub.challenge=test"

# Test message sending
curl -X POST "http://localhost:3000/api/whatsapp/test" \
  -H "Content-Type: application/json" \
  -d '{"to": "919876543210", "message": "Hello from WanderMate!", "test": true}'

# Test AI integration
curl -X POST "http://localhost:3000/api/whatsapp/test-ai" \
  -H "Content-Type: application/json" \
  -d '{"message": "I want to visit Kashi Vishwanath Temple", "phoneNumber": "919876543210"}'
```

### 3. View Demo

Visit `http://localhost:3000/whatsapp-demo` to see the interactive demo.

## 🔧 API Endpoints

### Webhook Handler
- **POST** `/api/whatsapp/webhook` - Receives WhatsApp messages
- **GET** `/api/whatsapp/webhook` - Webhook verification

### Test Endpoints
- **POST** `/api/whatsapp/test` - Send test messages
- **GET** `/api/whatsapp/test` - Check configuration status
- **POST** `/api/whatsapp/test-ai` - Test AI integration
- **GET** `/api/whatsapp/test-ai` - Test AI processing

## 💬 Conversation Flow

### First-Time User
```
👤 User: Hi
🤖 Bot: 🙏 Namaste! Welcome to WanderMate - your AI travel companion for Varanasi!

🗺️ Plan Your Trip - Personalized itineraries
🏨 Book Hotels - Best deals and recommendations  
🚕 Arrange Transport - Cabs, autos, and boat rides
🍽️ Find Food - Local restaurants and street food
📸 Book Services - Photography, guides, spa
🚨 Emergency Help - 24/7 support and assistance

[🗺️ Plan Trip] [🏨 Book Hotel] [🍽️ Find Food]
```

### Trip Planning Example
```
👤 User: 🗺️ Plan Trip
🤖 Bot: Great! Let's plan your perfect Varanasi experience.

When are you arriving?
📆 [Today] [Tomorrow] [In 2-3 Days] [Next Week]

👤 User: Tomorrow
🤖 Bot: Perfect! How long are you staying?
📍 [1 Day] [2-3 Days] [4-7 Days] [More]

👤 User: 2-3 Days
🤖 Bot: What kind of experience are you looking for?
🧘 [Spiritual] 🍽️ [Food Exploration] 🛍️ [Shopping] 📷 [Photography]

👤 User: 🧘 Spiritual
🤖 Bot: Here's your custom Day 1 spiritual journey 🙏

🌅 **Sunrise Aarti @ Assi Ghat** (5:30 AM)
🛕 **Darshan at Kashi Vishwanath** (7:00 AM)
🧘 **Meditation at Sarnath** (10:00 AM)
🍽️ **Lunch at Blue Lassi Shop** (1:00 PM)
🌊 **Evening Ganga Aarti** (6:45 PM)

Would you like to save this as Day 1?
👍 [Yes] 🔁 [Change Plan] 📅 [Show Day 2]
```

## 🛠️ Core Components

### 1. Webhook Handler (`/api/whatsapp/webhook/route.ts`)
- Verifies WhatsApp webhook signatures
- Processes incoming messages
- Handles different message types (text, voice, images)
- Routes messages to AI processor

### 2. Message Processor (`lib/whatsappProcessor.ts`)
- Manages user sessions and conversation history
- Detects user intent and language
- Integrates with existing AI system
- Generates contextual responses

### 3. Message Sender (`lib/whatsappSender.ts`)
- Sends responses back to WhatsApp
- Handles different message types
- Manages quick replies and interactive buttons
- Provides typing indicators

### 4. Utilities (`lib/whatsappUtils.ts`)
- Signature verification
- Phone number formatting
- Language detection
- Message formatting

## 🔒 Security Features

### Webhook Security
- **Signature Verification**: Validates all incoming webhooks
- **HTTPS Required**: Secure webhook URLs only
- **Token Validation**: Verifies webhook setup tokens

### Data Privacy
- **Session Management**: In-memory sessions (use Redis in production)
- **Message Encryption**: WhatsApp's built-in encryption
- **Data Retention**: Configurable conversation history limits

## 📊 Monitoring & Analytics

### Key Metrics
- **Message Volume**: Daily/weekly message counts
- **Response Time**: AI response latency
- **User Engagement**: Active conversations
- **Error Rates**: Failed message deliveries

### Logging
```javascript
// Webhook events
console.log('📱 WhatsApp webhook received:', {
  timestamp: new Date().toISOString(),
  phoneNumber: message.from,
  messageType: message.type,
  messageLength: message.text?.body?.length || 0
});

// AI responses
console.log('🤖 AI response generated:', {
  userMessage: message,
  aiResponse: response.text,
  responseTime: Date.now() - startTime
});
```

## 🎯 Use Cases

### 1. Trip Planning
- **User**: "I'm visiting Varanasi for 3 days"
- **AI**: Provides personalized itinerary with timings, costs, and recommendations

### 2. Hotel Booking
- **User**: "I need a hotel near Dashashwamedh Ghat"
- **AI**: Suggests hotels with prices, availability, and booking assistance

### 3. Food Recommendations
- **User**: "Where should I eat in Varanasi?"
- **AI**: Lists famous restaurants, street food spots, and food tours

### 4. Cultural Guidance
- **User**: "Tell me about Kashi Vishwanath Temple"
- **AI**: Provides timings, dress code, booking info, and cultural context

### 5. Emergency Support
- **User**: "I need medical help"
- **AI**: Provides local hospital contacts, pharmacy locations, and assistance

## 🔄 Integration with Existing Services

### AI System Integration
- Uses existing OpenAI GPT integration
- Leverages conversation memory system
- Integrates with emotional voice features
- Connects to personality engine

### Booking System Integration
- Hotel booking through existing APIs
- Transport booking (cabs, autos, boats)
- Activity booking (photography, guides, spa)
- Payment processing integration

### Real-time Data
- Weather information for travel planning
- Live availability for bookings
- Current events and festivals
- Emergency service contacts

## 🚨 Troubleshooting

### Common Issues

#### Webhook Not Receiving Messages
```bash
# Check webhook status
curl "https://graph.facebook.com/v18.0/YOUR_PHONE_NUMBER_ID/webhook"

# Verify webhook URL is accessible
curl -I "https://yourdomain.com/api/whatsapp/webhook"
```

#### Messages Not Sending
```bash
# Test message delivery
curl -X POST "https://graph.facebook.com/v18.0/YOUR_PHONE_NUMBER_ID/messages" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "messaging_product": "whatsapp",
    "to": "919876543210",
    "type": "text",
    "text": {"body": "Test message"}
  }'
```

#### AI Not Responding
- Check OpenAI API key configuration
- Verify AI service is running
- Review conversation memory setup
- Check for rate limiting

## 📈 Performance Optimization

### Response Time Optimization
- **Caching**: Cache common responses and recommendations
- **Async Processing**: Handle long-running tasks asynchronously
- **Connection Pooling**: Reuse HTTP connections
- **Message Queuing**: Queue messages during high load

### Scalability Considerations
- **Redis Sessions**: Use Redis for session storage in production
- **Load Balancing**: Distribute webhook load across multiple instances
- **Database Optimization**: Index conversation history for fast retrieval
- **CDN**: Use CDN for static assets and media files

## 🎨 Customization

### Response Templates
```javascript
// Custom welcome message
const welcomeMessage = {
  en: "Welcome to WanderMate! Your AI travel companion for Varanasi.",
  hi: "वाराणसी के लिए WanderMate में आपका स्वागत है!"
};

// Custom quick replies
const quickReplies = {
  planning: ['🗺️ Plan My Trip', '🏨 Book Hotel', '🚕 Arrange Transport'],
  food: ['🍽️ Restaurants', '🥘 Street Food', '☕ Cafes'],
  culture: ['🛕 Temples', '🌊 Ghats', '📚 History']
};
```

### AI Personality
```javascript
// Custom AI personality for WhatsApp
const whatsappPersonality = {
  tone: 'friendly and helpful',
  language: 'conversational',
  emojis: true,
  quickReplies: true,
  culturalContext: true
};
```

## 🔮 Future Enhancements

### Phase 2 Features
1. **Voice Messages**: Whisper integration for voice processing
2. **Image Recognition**: Handle photo queries and location sharing
3. **Payment Integration**: Direct booking and payment through WhatsApp
4. **Multi-language**: Support for more Indian languages
5. **Analytics Dashboard**: User behavior insights and reporting

### Advanced Integrations
- **Google Maps**: Location sharing and navigation
- **Weather API**: Real-time weather updates
- **Translation API**: Multi-language support
- **Emergency Services**: Direct emergency contact integration

## 📞 Support

### Documentation
- [WhatsApp Business API Docs](https://developers.facebook.com/docs/whatsapp)
- [Meta for Developers](https://developers.facebook.com/)
- [WanderMate Setup Guide](WHATSAPP_SETUP_GUIDE.md)

### Community
- Join our Discord for technical support
- Check GitHub issues for common problems
- Contribute to the project!

---

## 🎉 Congratulations!

You now have a fully functional WhatsApp AI Travel Assistant that can:
- ✅ Receive and process WhatsApp messages
- ✅ Provide intelligent AI responses
- ✅ Handle multiple message types (text, voice, images)
- ✅ Support quick replies and interactive buttons
- ✅ Maintain conversation context
- ✅ Support multiple languages
- ✅ Integrate with existing AI services
- ✅ Provide real-time travel assistance

Your WanderMate AI is now ready to serve travelers through WhatsApp! 🌟 