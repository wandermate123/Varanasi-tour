// AI Configuration for Enhanced Travel Guide
export const AI_CONFIG = {
  // OpenAI Configuration
  openai: {
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || '',
    model: 'gpt-4o-mini', // More cost-effective than GPT-4
    maxTokens: 1000,
    temperature: 0.7,
    systemPrompt: `You are an expert AI travel guide for Varanasi, India. You have deep knowledge about:
    - Hindu temples, rituals, and spiritual practices
    - Ganga ghats and their significance
    - Local cuisine and famous food spots
    - Boat rides and river activities
    - Cultural events and festivals
    - Historical sites and their stories
    - Local transportation and navigation
    - Shopping areas and authentic crafts
    - Photography spots and best times
    - Safety tips and travel etiquette
    
    Always provide practical, accurate, and culturally sensitive information. Include specific timings, prices, and locations when relevant. Be respectful of religious traditions and local customs.`
  },

  // Google Cloud Configuration
  googleCloud: {
    speechToText: {
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_SPEECH_API_KEY || '',
      languageCode: 'en-US',
      alternativeLanguageCodes: ['hi-IN', 'en-IN']
    },
    textToSpeech: {
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_TTS_API_KEY || '',
      voiceSettings: {
        'en': { languageCode: 'en-US', name: 'en-US-Studio-M' },
        'hi': { languageCode: 'hi-IN', name: 'hi-IN-Standard-A' },
        'es': { languageCode: 'es-ES', name: 'es-ES-Standard-A' },
        'fr': { languageCode: 'fr-FR', name: 'fr-FR-Standard-A' },
        'de': { languageCode: 'de-DE', name: 'de-DE-Standard-A' },
        'ja': { languageCode: 'ja-JP', name: 'ja-JP-Standard-A' },
        'zh': { languageCode: 'zh-CN', name: 'zh-CN-Standard-A' },
        'ar': { languageCode: 'ar-XA', name: 'ar-XA-Standard-A' }
      }
    },
    translate: {
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY || '',
      targetLanguages: ['hi', 'es', 'fr', 'de', 'ja', 'zh', 'ar']
    },
    maps: {
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
      defaultCenter: { lat: 25.3176, lng: 83.0168 }, // Dashashwamedh Ghat, Varanasi
      defaultZoom: 14,
      libraries: ['places', 'geometry', 'directions'] as const
    }
  },

  // Alternative AI Services (Backup options)
  alternatives: {
    // Anthropic Claude
    anthropic: {
      apiKey: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || '',
      model: 'claude-3-haiku-20240307'
    },
    
    // Azure Cognitive Services
    azure: {
      speechKey: process.env.NEXT_PUBLIC_AZURE_SPEECH_KEY || '',
      speechRegion: process.env.NEXT_PUBLIC_AZURE_SPEECH_REGION || 'eastus',
      translatorKey: process.env.NEXT_PUBLIC_AZURE_TRANSLATOR_KEY || '',
      translatorRegion: process.env.NEXT_PUBLIC_AZURE_TRANSLATOR_REGION || 'eastus'
    }
  },

  // Local fallback knowledge base
  knowledgeBase: {
    temples: {
      'kashi-vishwanath': {
        name: 'Kashi Vishwanath Temple',
        timings: '3:00 AM - 11:00 PM',
        location: { lat: 25.3109, lng: 83.0107 },
        description: 'Most sacred Shiva temple in Varanasi',
        tips: ['Book online to skip queues', 'Dress traditionally', 'No photography inside'],
        nearbyAttractions: ['Dashashwamedh Ghat', 'Annapurna Temple'],
        averageVisitTime: '1-2 hours'
      },
      'sankat-mochan': {
        name: 'Sankat Mochan Hanuman Temple',
        timings: '5:00 AM - 10:00 PM',
        location: { lat: 25.2644, lng: 82.9911 },
        description: 'Famous Hanuman temple founded by Tulsidas',
        specialEvents: ['Tuesday and Saturday special prayers'],
        tips: ['Visit early morning for peaceful darshan', 'Free prasadam available']
      }
    },
    
    food: {
      'blue-lassi': {
        name: 'Blue Lassi Shop',
        location: 'Near Kashi Vishwanath Temple',
        specialty: 'Traditional thick lassi',
        priceRange: '₹20-100',
        timings: '8:00 AM - 10:00 PM',
        description: 'Legendary lassi shop running since 1925'
      },
      'kachori-gali': {
        name: 'Kachori Gali',
        location: 'Vishwanath Gali',
        specialty: 'Kachori with spicy potato curry',
        priceRange: '₹15-30',
        timings: '6:00 AM - 11:00 AM',
        description: 'Best breakfast spot for traditional Banarasi kachori'
      }
    },

          activities: {
        'ganga-aarti': {
          name: 'Ganga Aarti at Dashashwamedh Ghat',
          timings: 'Winter: 6:45 PM, Summer: 7:00 PM',
          duration: '30-45 minutes',
          cost: 'Free viewing, Boat rides: ₹200-500',
          description: 'Magnificent evening prayer ceremony',
          tips: ['Arrive 30 minutes early', 'Respect the religious ceremony']
        },
        'sunrise-boat-ride': {
          name: 'Sunrise Boat Ride',
          timings: '5:30 AM - 7:30 AM',
          cost: '₹200-400 per person',
          duration: '2 hours',
          highlights: ['Sunrise over Ganga', 'Morning rituals', 'Peaceful atmosphere']
        }
      },

      // Popular locations in Varanasi with coordinates
      locations: {
        'dashashwamedh-ghat': {
          name: 'Dashashwamedh Ghat',
          coordinates: { lat: 25.3176, lng: 83.0168 },
          type: 'ghat',
          description: 'Main ghat famous for evening Ganga Aarti',
          walkingTime: '5 min from Kashi Vishwanath',
          activities: ['Ganga Aarti', 'Boat rides', 'Photography']
        },
        'assi-ghat': {
          name: 'Assi Ghat',
          coordinates: { lat: 25.2644, lng: 83.0032 },
          type: 'ghat',
          description: 'Peaceful ghat popular with tourists and locals',
          walkingTime: '15 min from BHU',
          activities: ['Morning yoga', 'Sunrise viewing', 'Cafes']
        },
        'manikarnika-ghat': {
          name: 'Manikarnika Ghat',
          coordinates: { lat: 25.3073, lng: 83.0081 },
          type: 'ghat',
          description: 'Sacred cremation ghat, most holy for Hindus',
          walkingTime: '10 min from Kashi Vishwanath',
          activities: ['Spiritual observation', 'Photography (respectful)']
        },
        'bhu-campus': {
          name: 'Banaras Hindu University',
          coordinates: { lat: 25.2677, lng: 83.0081 },
          type: 'university',
          description: 'Large university campus with New Vishwanath Temple',
          walkingTime: '30 min from city center',
          activities: ['Temple visit', 'Campus tour', 'Shopping']
        },
        'sarnath': {
          name: 'Sarnath',
          coordinates: { lat: 25.3792, lng: 83.0233 },
          type: 'historical',
          description: 'Where Buddha gave his first sermon',
          walkingTime: '45 min drive from Varanasi',
          activities: ['Buddhist temples', 'Museum visit', 'Meditation']
        }
      }
  }
};

// Language configurations
export const LANGUAGE_CONFIG = {
  supported: [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
    { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
    { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' }
  ],
  
  rtlLanguages: ['ar'],
  
  greetings: {
    en: "🙏 Namaste! I'm your AI travel companion for Varanasi.",
    hi: "🙏 नमस्ते! मैं वाराणसी के लिए आपका AI ट्रैवल कंपैनियन हूं।",
    es: "🙏 ¡Namaste! Soy tu compañero de viaje con IA para Varanasi.",
    fr: "🙏 Namaste ! Je suis votre compagnon de voyage IA pour Varanasi.",
    de: "🙏 Namaste! Ich bin Ihr KI-Reisebegleiter für Varanasi.",
    ja: "🙏 ナマステ！私はバラナシのためのあなたのAI旅行コンパニオンです。",
    zh: "🙏 合十礼！我是您瓦拉纳西的AI旅行伴侣。",
    ar: "🙏 ناماستي! أنا رفيق السفر بالذكاء الاصطناعي لفاراناسي."
  }
};

// API Rate limiting and caching
export const API_CONFIG = {
  rateLimit: {
    maxRequestsPerMinute: 60,
    maxRequestsPerHour: 1000
  },
  
  cache: {
    ttl: 300000, // 5 minutes
    maxSize: 100
  },
  
  retry: {
    maxAttempts: 3,
    backoffMs: 1000
  }
}; 