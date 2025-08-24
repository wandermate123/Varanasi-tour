import { NextRequest, NextResponse } from 'next/server';

// Enhanced Chat API with OpenAI Integration
export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json();
    
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    
    // Try OpenAI API if key is available
    if (OPENAI_API_KEY && !OPENAI_API_KEY.includes('demo') && !OPENAI_API_KEY.includes('your-')) {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: `You are WanderMate AI Agent, an expert travel assistant for Varanasi, India. You help tourists with:

🏨 Hotels & Accommodations - Real bookings and recommendations
💳 Secure Payments - UPI, cards, digital wallets  
🗺️ Navigation & Maps - Live directions and traffic
🌐 Translation - 8 languages with cultural context
🌤️ Weather & Crowds - Real-time updates
🚨 Emergency Services - Local contacts and rapid response

Key Information:
- Currency: Indian Rupees (₹)
- Location: Varanasi (Kashi), Uttar Pradesh, India
- Famous for: Spiritual sites, Ganges river, ancient temples
- Popular areas: Dashashwamedh Ghat, Assi Ghat, Kashi Vishwanath Temple

Be helpful, culturally sensitive, and provide practical information with prices in INR. Always offer to help with bookings and services when relevant.`
              },
              {
                role: 'user',
                content: message
              }
            ],
            max_tokens: 400,
            temperature: 0.7,
            presence_penalty: 0.1,
            frequency_penalty: 0.1
          })
        });

        if (response.ok) {
          const data = await response.json();
          return NextResponse.json({
            text: data.choices[0].message.content,
            source: 'openai',
            emotion: 'helpful',
            suggestions: getSmartSuggestions(message),
            timestamp: new Date().toISOString()
          });
        }
      } catch (error) {
        console.error('OpenAI API Error:', error);
      }
    }

    // Enhanced fallback responses
    const response = getEnhancedResponse(message, context);
    return NextResponse.json(response);

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({
      text: "I'm here to help! I can assist with hotels, navigation, weather, translation, payments, and emergencies in Varanasi. What would you like to know?",
      source: 'fallback',
      emotion: 'helpful'
    });
  }
}

function getSmartSuggestions(message: string): string[] {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('hotel') || lowerMessage.includes('stay')) {
    return ['Show available hotels', 'Check pricing', 'Book now', 'View amenities'];
  }
  
  if (lowerMessage.includes('food') || lowerMessage.includes('restaurant')) {
    return ['Find nearby restaurants', 'Local specialties', 'Street food guide', 'Vegetarian options'];
  }
  
  if (lowerMessage.includes('temple') || lowerMessage.includes('spiritual')) {
    return ['Temple timings', 'Dress code info', 'Aarti schedules', 'Photography rules'];
  }
  
  if (lowerMessage.includes('weather') || lowerMessage.includes('climate')) {
    return ['5-day forecast', 'Best visiting hours', 'Seasonal advice', 'Crowd levels'];
  }
  
  if (lowerMessage.includes('transport') || lowerMessage.includes('travel')) {
    return ['Book auto rickshaw', 'Boat ride prices', 'Walking directions', 'Airport transfer'];
  }
  
  return ['Book hotel', 'Check weather', 'Find restaurants', 'Temple information'];
}

function getEnhancedResponse(message: string, context: any) {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('book') || lowerMessage.includes('hotel')) {
    return {
      text: `🏨 **Top Hotels in Varanasi:**

**Ganges Heritage Palace** - ₹8,500/night ⭐⭐⭐⭐⭐
📍 Near Dashashwamedh Ghat
✨ River views, spa, fine dining
🟢 Instant booking available

**Sacred Sands Resort** - ₹6,200/night ⭐⭐⭐⭐
📍 Assi Ghat area  
✨ Pool, yoga studio, breakfast included
🟢 Great for spiritual travelers

**Royal Varanasi Luxury** - ₹12,800/night ⭐⭐⭐⭐⭐
📍 Premium cantonment location
✨ Butler service, private balcony
🟢 Ultimate luxury experience

Would you like me to check availability and proceed with booking?`,
      source: 'enhanced_mock',
      emotion: 'excited',
      suggestions: ['Book Ganges Heritage', 'Book Sacred Sands', 'Book Royal Luxury', 'Compare all hotels'],
      toolCalls: [{ function: { name: 'search_hotels' } }]
    };
  }

  if (lowerMessage.includes('weather') || lowerMessage.includes('climate')) {
    return {
      text: `🌤️ **Current Weather in Varanasi:**

🌡️ **Temperature:** 28°C (feels like 32°C)
☀️ **Condition:** Clear skies with light breeze
💧 **Humidity:** 65% (comfortable)
🌬️ **Wind:** 5.2 km/h from northeast
👁️ **Visibility:** Excellent (10km+)

**Perfect weather for:**
✅ Temple visits and ghat walks
✅ Boat rides on the Ganges
✅ Photography and sightseeing
✅ Evening aarti ceremonies

**Today's Best Times:**
🌅 Sunrise: 6:15 AM (ideal for boat rides)
🌆 Sunset: 6:45 PM (perfect for ghats)`,
      source: 'enhanced_mock',
      emotion: 'informative',
      suggestions: ['5-day forecast', 'Best visiting times', 'Crowd predictions', 'What to wear']
    };
  }

  if (lowerMessage.includes('food') || lowerMessage.includes('restaurant') || lowerMessage.includes('eat')) {
    return {
      text: `🍽️ **Must-Try Food in Varanasi:**

**🥘 Local Specialties:**
• Banarasi Kachori with Sabzi (₹40-60)
• Malaiyo (winter delicacy) (₹30-50)  
• Banarasi Paan (₹20-100)
• Thandai (₹50-80)

**🍽️ Top Restaurants:**
• **Keshari Restaurant** - ₹200-400/person
• **Dolphin Restaurant** - ₹300-600/person  
• **Varuna Restaurant** - ₹400-800/person
• **Brown Bread Bakery** - ₹150-300/person

**🛒 Street Food Hotspots:**
• Kachori Gali (near Vishwanath Temple)
• Deena Chaat Bhandar (Godowlia)
• Blue Lassi Shop (famous lassi spot)

All restaurants are vegetarian-friendly with pure veg options!`,
      source: 'enhanced_mock',
      emotion: 'enthusiastic',
      suggestions: ['Find nearby restaurants', 'Book table', 'Vegetarian options', 'Street food tour']
    };
  }

  if (lowerMessage.includes('translate') || lowerMessage.includes('language')) {
    return {
      text: `🌐 **Translation Services Available:**

**Supported Languages:**
🇮🇳 Hindi • 🇧🇩 Bengali • 🇪🇸 Spanish • 🇫🇷 French
🇩🇪 German • 🇯🇵 Japanese • 🇰🇷 Korean • 🇬🇧 English

**Common Travel Phrases:**
"नमस्ते" (Namaste) - Hello
"धन्यवाद" (Dhanyawad) - Thank you  
"कितना?" (Kitna?) - How much?
"मंदिर कहाँ है?" (Mandir kahan hai?) - Where is the temple?

**Voice Translation:** 
Speak in any language and I'll translate instantly for local communication!`,
      source: 'enhanced_mock',
      emotion: 'helpful',
      suggestions: ['Voice translation', 'Common phrases', 'Learn Hindi basics', 'Emergency phrases']
    };
  }

  // Default enhanced response
  return {
    text: `🙏 **Namaste! I'm WanderMate AI Agent** 

I'm your personal travel companion for Varanasi, ready to help with:

🏨 **Smart Booking** - Instant hotel reservations with best prices
💳 **Secure Payments** - UPI, cards, wallets with 100% security  
🗺️ **Live Navigation** - Real-time directions with traffic updates
🌐 **Voice Translation** - 8 languages with cultural context
🌤️ **Weather & Crowds** - Live updates for perfect timing
🚨 **Emergency Help** - 24/7 local support and contacts

**Popular right now:**
• Temple visit planning
• Ganga aarti bookings  
• Heritage hotel deals
• Local food experiences

What brings you to the spiritual city of Varanasi today?`,
    source: 'enhanced_mock',
    emotion: 'welcoming',
    suggestions: ['Book accommodation', 'Plan temple visits', 'Check weather', 'Find local food']
  };
} 