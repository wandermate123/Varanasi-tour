# 📱 WhatsApp Business API Setup Guide for WanderMate AI

## Overview
This guide will help you set up WhatsApp Business API integration for the WanderMate AI Travel Assistant, enabling users to interact with your AI through WhatsApp.

## 🚀 Quick Start (15 minutes)

### Step 1: Create Meta Developer Account
1. Go to [Meta for Developers](https://developers.facebook.com/)
2. Click "Get Started" and create a developer account
3. Verify your email and phone number

### Step 2: Create WhatsApp Business App
1. In Meta Developer Console, click "Create App"
2. Select "Business" as the app type
3. Choose "WhatsApp" as the product
4. Fill in your app details:
   - **App Name:** WanderMate AI Travel Assistant
   - **App Contact Email:** your-email@domain.com
   - **Business Account:** Create new or select existing

### Step 3: Configure WhatsApp Business API
1. In your app dashboard, go to "WhatsApp" → "Getting Started"
2. Add your phone number:
   - Click "Add phone number"
   - Enter your business phone number (must be verified)
   - Select your country and timezone
3. Note down your **Phone Number ID** (you'll need this later)

### Step 4: Generate Access Token
1. Go to "WhatsApp" → "API Setup"
2. Click "Generate token"
3. Copy the **Access Token** (keep it secure!)
4. Note the **App Secret** (also needed)

### Step 5: Set Up Webhook
1. In "WhatsApp" → "Configuration"
2. Set **Webhook URL:** `https://yourdomain.com/api/whatsapp/webhook`
3. Set **Verify Token:** Generate a random string (use the utility function)
4. Subscribe to these webhook fields:
   - `messages`
   - `message_deliveries`
   - `message_reads`

### Step 6: Configure Environment Variables
Add these to your `.env.local` file:

```env
# WhatsApp Business API Configuration
WHATSAPP_ACCESS_TOKEN=your_access_token_here
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id_here
WHATSAPP_APP_SECRET=your_app_secret_here
WHATSAPP_VERIFY_TOKEN=your_webhook_verify_token_here
WHATSAPP_WEBHOOK_URL=https://yourdomain.com/api/whatsapp/webhook
```

## 🔧 Advanced Configuration

### Message Templates (Optional)
For first-time users, you can create message templates:

1. Go to "WhatsApp" → "Message Templates"
2. Create templates like:
   - **Welcome Template:** "Welcome to WanderMate! Your AI travel companion for Varanasi. How can I help you today?"
   - **Help Template:** "Need help? I can assist with trip planning, bookings, and local recommendations."

### Business Profile
1. Go to "WhatsApp" → "Business Profile"
2. Add your business information:
   - Business name: "WanderMate AI Travel Assistant"
   - Description: "Your AI-powered travel companion for Varanasi"
   - Address: "Varanasi, Uttar Pradesh, India"
   - Website: Your website URL
   - Business hours: 24/7 (AI assistant)

## 🧪 Testing Your Setup

### Test Webhook Verification
```bash
curl "https://yourdomain.com/api/whatsapp/webhook?hub.mode=subscribe&hub.verify_token=YOUR_VERIFY_TOKEN&hub.challenge=test"
```

### Test Message Sending
```bash
curl -X POST "https://yourdomain.com/api/whatsapp/test" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "919876543210",
    "message": "Hello from WanderMate AI!",
    "test": true
  }'
```

### Test AI Integration
```bash
curl -X POST "https://yourdomain.com/api/whatsapp/test-ai" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "I want to visit Kashi Vishwanath Temple",
    "phoneNumber": "919876543210"
  }'
```

## 📱 User Experience Flow

### First-Time User Journey
1. **User sends:** "Hi" or "Hello"
2. **AI responds:** Welcome message with quick reply buttons
3. **User selects:** "🗺️ Plan My Trip"
4. **AI asks:** "When are you arriving in Varanasi?"
5. **User responds:** "Tomorrow"
6. **AI provides:** Personalized Day 1 itinerary

### Example Conversation Flow
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

## 🔒 Security Best Practices

### Webhook Security
- Always verify webhook signatures
- Use HTTPS for webhook URLs
- Implement rate limiting
- Log all webhook events

### Token Security
- Never commit tokens to version control
- Rotate access tokens regularly
- Use environment variables
- Monitor token usage

### Data Privacy
- Encrypt user data at rest
- Implement data retention policies
- Comply with WhatsApp's data policies
- Get user consent for data collection

## 🚨 Troubleshooting

### Common Issues

#### Webhook Not Receiving Messages
- Check webhook URL is accessible
- Verify webhook is subscribed to correct fields
- Check server logs for errors
- Ensure HTTPS is properly configured

#### Messages Not Sending
- Verify access token is valid
- Check phone number ID is correct
- Ensure user has opted in
- Check message format compliance

#### AI Not Responding
- Verify OpenAI API key is configured
- Check AI service is running
- Review conversation memory setup
- Check for rate limiting

### Debug Commands
```bash
# Check webhook status
curl "https://graph.facebook.com/v18.0/YOUR_PHONE_NUMBER_ID/webhook"

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

## 📊 Monitoring & Analytics

### Key Metrics to Track
- **Message Volume:** Daily/weekly message counts
- **Response Time:** AI response latency
- **User Engagement:** Active conversations
- **Error Rates:** Failed message deliveries
- **User Satisfaction:** Response quality scores

### Logging Setup
```javascript
// Add to your webhook handler
console.log('📱 WhatsApp webhook received:', {
  timestamp: new Date().toISOString(),
  phoneNumber: message.from,
  messageType: message.type,
  messageLength: message.text?.body?.length || 0
});
```

## 🎯 Next Steps

### Phase 2 Enhancements
1. **Voice Messages:** Integrate Whisper for voice processing
2. **Image Recognition:** Handle photo queries
3. **Payment Integration:** Direct booking through WhatsApp
4. **Multi-language:** Support Hindi and other languages
5. **Analytics Dashboard:** User behavior insights

### Integration with Other Services
- **Booking APIs:** Hotel, transport, activity bookings
- **Payment Gateways:** Razorpay, Stripe integration
- **Maps & Navigation:** Google Maps integration
- **Weather Services:** Real-time weather updates
- **Emergency Services:** Local emergency contacts

## 📞 Support

### Resources
- [WhatsApp Business API Documentation](https://developers.facebook.com/docs/whatsapp)
- [Meta for Developers](https://developers.facebook.com/)
- [WhatsApp Business Policy](https://www.whatsapp.com/legal/business-policy/)

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

Your WanderMate AI is now ready to serve travelers through WhatsApp! 🌟 