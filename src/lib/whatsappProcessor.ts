import { WhatsAppMessage, WhatsAppResponse, detectLanguage, extractLocationFromMessage, generateSessionId, createWelcomeMessage, createIntentBasedQuickReplies } from './whatsappUtils';
import { conversationMemory } from './conversationMemory';
import { emotionalVoice, EmotionalState } from './emotionalVoice';

// In-memory user sessions (use Redis in production)
const userSessions = new Map<string, any>();

// Process incoming WhatsApp messages through AI
export async function processWhatsAppMessage(messageData: WhatsAppMessage): Promise<WhatsAppResponse | null> {
  try {
    const { fromNumber, message, messageType, mediaUrl, timestamp } = messageData;
    
    // Get or create user session
    const sessionId = generateSessionId(fromNumber);
    let userSession = userSessions.get(fromNumber);
    
    if (!userSession) {
      userSession = {
        sessionId,
        phoneNumber: fromNumber,
        firstMessage: true,
        language: 'en',
        preferences: {},
        conversationHistory: [],
        lastActivity: timestamp
      };
      userSessions.set(fromNumber, userSession);
    }

    // Update last activity
    userSession.lastActivity = timestamp;

    // Handle first-time users
    if (userSession.firstMessage) {
      userSession.firstMessage = false;
      const language = detectLanguage(message);
      userSession.language = language;
      
      return {
        text: createWelcomeMessage(language),
        quickReplies: createIntentBasedQuickReplies('general')
      };
    }

    // Handle different message types
    let processedMessage = message;
    
    if (messageType === 'audio' && mediaUrl) {
      // Process voice message with Whisper
      processedMessage = await processVoiceMessage(mediaUrl, userSession.language);
    } else if (messageType === 'image' && mediaUrl) {
      // Handle image messages (future enhancement)
      processedMessage = `[Image received: ${mediaUrl}]`;
    }

    // Detect user intent and language
    const language = detectLanguage(processedMessage);
    const location = extractLocationFromMessage(processedMessage);
    const intent = detectUserIntent(processedMessage);

    // Get AI response using existing AI system
    const aiResponse = await getAIResponse(processedMessage, {
      sessionId: userSession.sessionId,
      language,
      location,
      intent,
      userPreferences: userSession.preferences,
      conversationHistory: userSession.conversationHistory
    });

    // Update conversation history
    userSession.conversationHistory.push({
      user: processedMessage,
      ai: aiResponse.text,
      timestamp,
      intent
    });

    // Keep only last 10 messages to avoid memory issues
    if (userSession.conversationHistory.length > 10) {
      userSession.conversationHistory = userSession.conversationHistory.slice(-10);
    }

    // Generate quick replies based on intent
    const quickReplies = createIntentBasedQuickReplies(intent);

    return {
      text: aiResponse.text,
      quickReplies,
      buttons: aiResponse.buttons
    };

  } catch (error) {
    console.error('Error processing WhatsApp message:', error);
    return {
      text: "I'm having trouble processing your message right now. Please try again in a moment! 🙏",
      quickReplies: ['🗺️ Plan Trip', '🍽️ Find Food', '📸 Book Services']
    };
  }
}

// Process voice messages using Whisper
async function processVoiceMessage(mediaUrl: string, language: string): Promise<string> {
  try {
    // This would integrate with the existing Whisper API
    // For now, return a placeholder
    return '[Voice message processed]';
  } catch (error) {
    console.error('Error processing voice message:', error);
    return '[Voice message received]';
  }
}

// Detect user intent from message
function detectUserIntent(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  // Planning and itinerary
  if (lowerMessage.includes('plan') || lowerMessage.includes('itinerary') || lowerMessage.includes('schedule')) {
    return 'planning';
  }
  
  // Booking related
  if (lowerMessage.includes('book') || lowerMessage.includes('reservation') || lowerMessage.includes('hotel')) {
    return 'booking';
  }
  
  // Food and dining
  if (lowerMessage.includes('food') || lowerMessage.includes('restaurant') || lowerMessage.includes('eat') || lowerMessage.includes('dinner')) {
    return 'food';
  }
  
  // Cultural and spiritual
  if (lowerMessage.includes('temple') || lowerMessage.includes('ghat') || lowerMessage.includes('spiritual') || lowerMessage.includes('culture')) {
    return 'culture';
  }
  
  // Emergency
  if (lowerMessage.includes('emergency') || lowerMessage.includes('help') || lowerMessage.includes('urgent')) {
    return 'emergency';
  }
  
  // Transport
  if (lowerMessage.includes('transport') || lowerMessage.includes('cab') || lowerMessage.includes('auto') || lowerMessage.includes('boat')) {
    return 'transport';
  }
  
  return 'general';
}

// Get AI response using existing AI system
async function getAIResponse(message: string, context: any): Promise<{ text: string; buttons?: any[] }> {
  try {
    // Use the existing AI system
    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: message,
        type: 'whatsapp',
        userId: context.sessionId,
        language: context.language,
        context: {
          location: context.location,
          intent: context.intent,
          userPreferences: context.userPreferences,
          conversationHistory: context.conversationHistory
        }
      })
    });

    if (response.ok) {
      const data = await response.json();
      return {
        text: data.text,
        buttons: data.suggestions ? data.suggestions.map((s: string) => ({
          type: 'reply',
          title: s,
          payload: s.toLowerCase().replace(/\s+/g, '_')
        })) : undefined
      };
    }

    // Fallback to enhanced mock responses
    return getEnhancedMockResponse(message, context);

  } catch (error) {
    console.error('Error getting AI response:', error);
    return getEnhancedMockResponse(message, context);
  }
}

// Enhanced mock responses for WhatsApp
function getEnhancedMockResponse(message: string, context: any): { text: string; buttons?: any[] } {
  const lowerMessage = message.toLowerCase();
  const language = context.language || 'en';

  // Hindi responses
  if (language === 'hi') {
    if (lowerMessage.includes('नमस्ते') || lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return {
        text: `🙏 नमस्ते! मैं आपकी वाराणसी यात्रा में कैसे मदद कर सकता हूँ?`,
        buttons: [
          { type: 'reply', title: '🗺️ यात्रा की योजना', payload: 'plan_trip' },
          { type: 'reply', title: '🏨 होटल बुकिंग', payload: 'book_hotel' },
          { type: 'reply', title: '🍽️ भोजन की जगह', payload: 'find_food' }
        ]
      };
    }
    
    if (lowerMessage.includes('मंदिर') || lowerMessage.includes('temple')) {
      return {
        text: `🛕 काशी विश्वनाथ मंदिर सबसे पवित्र मंदिर है! 

⏰ *समय:* सुबह 3 बजे - रात 11 बजे
🎫 *प्रवेश:* निःशुल्क (VIP दर्शन ₹300)
👔 *ड्रेस कोड:* पारंपरिक पोशाक पसंदीदा
💡 *सुझाव:* ऑनलाइन बुकिंग करें लंबी कतार से बचने के लिए

क्या आप मंदिर के बारे में और जानना चाहते हैं?`
      };
    }
  }

  // English responses
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('namaste')) {
    return {
      text: `🙏 Namaste! I'm your AI travel companion for Varanasi. How can I help you plan your spiritual journey today?`,
      buttons: [
        { type: 'reply', title: '🗺️ Plan My Trip', payload: 'plan_trip' },
        { type: 'reply', title: '🏨 Book Hotel', payload: 'book_hotel' },
        { type: 'reply', title: '🍽️ Find Food', payload: 'find_food' }
      ]
    };
  }

  if (lowerMessage.includes('temple') || lowerMessage.includes('kashi')) {
    return {
      text: `🏛️ *Kashi Vishwanath Temple* is the most sacred temple in Varanasi!

⏰ *Timings:* 3 AM - 11 PM daily
🎫 *Entry:* Free (VIP darshan ₹300)
👔 *Dress code:* Traditional attire preferred
💡 *Tip:* Book online to skip long queues

Would you like to know more about temple visits or other spiritual sites?`
    };
  }

  if (lowerMessage.includes('ghat') || lowerMessage.includes('ganga')) {
    return {
      text: `🌊 *Ganga Aarti* at Dashashwamedh Ghat is absolutely magical!

⏰ *Timing:* 6:45 PM - 7:15 PM (winter), 7:00 PM - 7:30 PM (summer)
🎫 *Cost:* Free to watch from ghat steps
🚣 *Premium:* Boat ride during aarti (₹200-500/person)
📸 *Photography:* Allowed but be respectful during prayers

Would you like to book a boat ride or know about other ghats?`
    };
  }

  if (lowerMessage.includes('food') || lowerMessage.includes('restaurant') || lowerMessage.includes('eat')) {
    return {
      text: `🍽️ *Must-try Varanasi food:*

1️⃣ **Kashi Chaat Bhandar** - Famous aloo tikki chaat
2️⃣ **Blue Lassi Shop** - Legendary thick lassi since 1925
3️⃣ **Kachori Gali** - Best kachori sabzi breakfast
4️⃣ **Deena Chaat Bhandar** - Tamatar chaat specialty
5️⃣ **Dolphin Restaurant** - South Indian with Ganga view

💡 *Pro tip:* Street food is generally safe but carry hand sanitizer!

Would you like me to help you find these places or book a food tour?`
    };
  }

  if (lowerMessage.includes('hotel') || lowerMessage.includes('stay') || lowerMessage.includes('accommodation')) {
    return {
      text: `🏨 *Hotel options in Varanasi:*

💰 *Budget:* ₹800-1500/night
🏨 *Mid-range:* ₹1500-4000/night  
🌟 *Luxury:* ₹4000-15000/night

📍 *Best areas:* Near Dashashwamedh Ghat, Assi Ghat, or Godowlia

Would you like me to:
• Show you specific hotels?
• Book a room for you?
• Check availability for your dates?`
    };
  }

  if (lowerMessage.includes('transport') || lowerMessage.includes('cab') || lowerMessage.includes('auto')) {
    return {
      text: `🚕 *Transport options in Varanasi:*

🛺 *Auto-rickshaw:* ₹50-150 (short distances)
🚗 *Taxi:* ₹8-12/km
🚣 *Boat:* ₹300-500 (ghat to ghat)
🚌 *Bus:* ₹20-50 (city routes)

💡 *Pro tip:* Negotiate prices before boarding!

Would you like me to:
• Book transport for you?
• Show you routes?
• Arrange airport pickup?`
    };
  }

  // Default response
  return {
    text: `I'm here to help you explore Varanasi! You can ask me about:

🗺️ Trip planning and itineraries
🏨 Hotel bookings and recommendations
🚕 Transportation and navigation
🍽️ Food and restaurants
🛕 Temples and spiritual sites
📸 Photography and tours
🚨 Emergency assistance

What would you like to know?`,
    buttons: [
      { type: 'reply', title: '🗺️ Plan Trip', payload: 'plan_trip' },
      { type: 'reply', title: '🏨 Book Hotel', payload: 'book_hotel' },
      { type: 'reply', title: '🍽️ Find Food', payload: 'find_food' }
    ]
  };
} 