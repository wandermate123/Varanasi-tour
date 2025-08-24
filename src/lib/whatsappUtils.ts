import crypto from 'crypto';

// WhatsApp Business API utilities
export interface WhatsAppMessage {
  fromNumber: string;
  message: string;
  messageType: string;
  mediaUrl?: string;
  timestamp: number;
  phoneNumberId: string;
}

export interface WhatsAppResponse {
  text: string;
  quickReplies?: string[];
  buttons?: Array<{
    type: 'reply' | 'url';
    title: string;
    payload?: string;
    url?: string;
  }>;
  media?: {
    type: 'image' | 'audio' | 'document';
    url: string;
    caption?: string;
  };
}

// Verify WhatsApp webhook signature
export function verifyWhatsAppSignature(body: string, signature: string | null): boolean {
  if (!signature) {
    console.warn('No WhatsApp signature provided');
    return false;
  }

  const appSecret = process.env.WHATSAPP_APP_SECRET;
  if (!appSecret) {
    console.warn('WHATSAPP_APP_SECRET not configured');
    return false;
  }

  const expectedSignature = crypto
    .createHmac('sha256', appSecret)
    .update(body)
    .digest('hex');

  const receivedSignature = signature.replace('sha256=', '');
  
  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature, 'hex'),
    Buffer.from(receivedSignature, 'hex')
  );
}

// Generate WhatsApp webhook verification token
export function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Parse WhatsApp phone number format
export function parsePhoneNumber(whatsappNumber: string): string {
  // Remove any non-numeric characters and ensure proper format
  const cleanNumber = whatsappNumber.replace(/\D/g, '');
  
  // If it starts with country code, return as is
  if (cleanNumber.startsWith('91')) {
    return cleanNumber;
  }
  
  // Add India country code if not present
  return `91${cleanNumber}`;
}

// Format message for WhatsApp (handle character limits, emojis, etc.)
export function formatWhatsAppMessage(text: string): string {
  // WhatsApp message limit is 4096 characters
  const maxLength = 4000; // Leave some buffer
  
  if (text.length <= maxLength) {
    return text;
  }
  
  // Truncate and add continuation indicator
  return text.substring(0, maxLength - 3) + '...';
}

// Create quick reply buttons for WhatsApp
export function createQuickReplies(options: string[]): Array<{ type: 'reply'; title: string; payload: string }> {
  return options.slice(0, 3).map(option => ({
    type: 'reply' as const,
    title: option,
    payload: option.toLowerCase().replace(/\s+/g, '_')
  }));
}

// Create interactive buttons for WhatsApp
export function createInteractiveButtons(buttons: Array<{ title: string; payload?: string; url?: string }>) {
  return buttons.slice(0, 3).map(button => ({
    type: button.url ? 'url' as const : 'reply' as const,
    title: button.title,
    payload: button.payload,
    url: button.url
  }));
}

// Detect language from message content
export function detectLanguage(text: string): string {
  // Simple language detection based on common patterns
  const hindiPattern = /[\u0900-\u097F]/; // Devanagari script
  const englishPattern = /[a-zA-Z]/;
  
  if (hindiPattern.test(text)) {
    return 'hi';
  } else if (englishPattern.test(text)) {
    return 'en';
  }
  
  return 'en'; // Default to English
}

// Extract location information from message
export function extractLocationFromMessage(text: string): string | null {
  const locationKeywords = [
    'varanasi', 'kashi', 'banaras', 'ghat', 'temple', 'dashashwamedh', 
    'assi ghat', 'manikarnika', 'kashi vishwanath', 'sarnath'
  ];
  
  const lowerText = text.toLowerCase();
  for (const keyword of locationKeywords) {
    if (lowerText.includes(keyword)) {
      return keyword;
    }
  }
  
  return null;
}

// Generate session ID for WhatsApp user
export function generateSessionId(phoneNumber: string): string {
  return `whatsapp_${phoneNumber}_${Date.now()}`;
}

// Validate WhatsApp phone number format
export function isValidWhatsAppNumber(phoneNumber: string): boolean {
  // Basic validation for Indian phone numbers
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  return cleanNumber.length >= 10 && cleanNumber.length <= 13;
}

// Create welcome message for new users
export function createWelcomeMessage(language: string = 'en'): string {
  const messages = {
    en: `🙏 *Namaste!* Welcome to WanderMate - your AI travel companion for Varanasi!

I'm here to help you discover the spiritual heart of India. Here's what I can do for you:

🗺️ *Plan Your Trip* - Personalized itineraries
🏨 *Book Hotels* - Best deals and recommendations  
🚕 *Arrange Transport* - Cabs, autos, and boat rides
🍽️ *Find Food* - Local restaurants and street food
📸 *Book Services* - Photography, guides, spa
🚨 *Emergency Help* - 24/7 support and assistance

Just tell me what you need! You can also use the quick reply buttons below.`,
    
    hi: `🙏 *नमस्ते!* वाराणसी के लिए WanderMate में आपका स्वागत है!

मैं आपकी यात्रा में मदद करने के लिए यहाँ हूँ। मैं यह कर सकता हूँ:

🗺️ *यात्रा की योजना* - व्यक्तिगत कार्यक्रम
🏨 *होटल बुकिंग* - सर्वोत्तम सौदे
🚕 *परिवहन* - कैब, ऑटो, नाव की सवारी
🍽️ *भोजन* - स्थानीय रेस्तरां
📸 *सेवाएं* - फोटोग्राफी, गाइड, स्पा
🚨 *आपातकालीन सहायता* - 24/7 सहायता

बस मुझे बताएं कि आपको क्या चाहिए!`
  };
  
  return messages[language as keyof typeof messages] || messages.en;
}

// Create quick reply options based on user intent
export function createIntentBasedQuickReplies(intent: string): string[] {
  const quickReplies: Record<string, string[]> = {
    planning: ['🗺️ Plan My Trip', '🏨 Book Hotel', '🚕 Arrange Transport'],
    booking: ['🏨 Hotels', '🚕 Transport', '📸 Services'],
    food: ['🍽️ Restaurants', '🥘 Street Food', '☕ Cafes'],
    culture: ['🛕 Temples', '🌊 Ghats', '📚 History'],
    emergency: ['🚨 Emergency', '🏥 Medical', '👮 Police'],
    general: ['🗺️ Plan Trip', '🍽️ Find Food', '📸 Book Services']
  };
  
  return quickReplies[intent] || quickReplies.general;
} 