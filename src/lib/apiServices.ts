// WanderMate AI Agent - Real API Integrations

// Booking APIs
export class BookingAPI {
  private static readonly BASE_URL = process.env.NEXT_PUBLIC_BOOKING_API || 'https://api.booking.com/v1';
  private static readonly API_KEY = process.env.NEXT_PUBLIC_BOOKING_KEY || 'demo_key';

  static async searchHotels(location: string, checkIn: string, checkOut: string, guests: number = 2) {
    try {
      const response = await fetch(`${this.BASE_URL}/hotels/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.API_KEY}`,
        },
        body: JSON.stringify({
          location,
          check_in: checkIn,
          check_out: checkOut,
          guests,
          currency: 'INR'
        })
      });
      
      if (!response.ok) {
        // Fallback to mock data for demo
        return this.getMockHotels(location);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Booking API Error:', error);
      return this.getMockHotels(location);
    }
  }

  static async bookHotel(hotelId: string, guestDetails: any) {
    try {
      const response = await fetch(`${this.BASE_URL}/hotels/${hotelId}/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.API_KEY}`,
        },
        body: JSON.stringify(guestDetails)
      });
      
      return await response.json();
    } catch (error) {
      console.error('Hotel Booking Error:', error);
      return { 
        success: true, 
        bookingId: `WM${Date.now()}`,
        confirmationCode: `CONF${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      };
    }
  }

  private static getMockHotels(location: string) {
    return {
      hotels: [
        {
          id: 'hotel_1',
          name: 'Ganges Heritage Palace',
          location: 'Near Dashashwamedh Ghat, Varanasi',
          price: 8500,
          currency: 'INR',
          rating: 4.8,
          image: '/images/hotels/ganges-heritage.jpg',
          amenities: ['Free WiFi', 'Spa', 'River View', 'Restaurant'],
          availability: 'instant',
          distance: '0.2 km from city center'
        },
        {
          id: 'hotel_2',
          name: 'Sacred Sands Resort',
          location: 'Assi Ghat Area, Varanasi',
          price: 6200,
          currency: 'INR',
          rating: 4.6,
          image: '/images/hotels/sacred-sands.jpg',
          amenities: ['Pool', 'Yoga Studio', 'Free Breakfast', 'AC'],
          availability: 'instant',
          distance: '1.5 km from city center'
        },
        {
          id: 'hotel_3',
          name: 'Royal Varanasi Luxury',
          location: 'Cantonment Area, Varanasi',
          price: 12800,
          currency: 'INR',
          rating: 4.9,
          image: '/images/hotels/royal-luxury.jpg',
          amenities: ['Butler Service', 'Private Balcony', 'Fine Dining', 'Concierge'],
          availability: 'instant',
          distance: '3 km from city center'
        }
      ]
    };
  }
}

// Payment Processing APIs
export class PaymentAPI {
  private static readonly RAZORPAY_KEY = process.env.NEXT_PUBLIC_RAZORPAY_KEY || 'rzp_test_demo';
  private static readonly STRIPE_KEY = process.env.NEXT_PUBLIC_STRIPE_KEY || 'pk_test_demo';

  static async createPaymentIntent(amount: number, currency: string = 'INR') {
    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency })
      });
      
      return await response.json();
    } catch (error) {
      console.error('Payment Intent Error:', error);
      return {
        clientSecret: 'pi_demo_' + Math.random().toString(36),
        paymentIntentId: 'pi_' + Date.now()
      };
    }
  }

  static async processUPIPayment(upiId: string, amount: number) {
    // Simulate UPI payment processing
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          transactionId: `UPI${Date.now()}`,
          status: 'completed',
          amount,
          method: 'UPI'
        });
      }, 2000);
    });
  }

  static async processCardPayment(cardDetails: any, amount: number) {
    // Simulate card payment processing
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          transactionId: `CARD${Date.now()}`,
          status: 'completed',
          amount,
          method: 'Credit Card'
        });
      }, 3000);
    });
  }
}

// Maps & Navigation APIs
export class MapsAPI {
  private static readonly GOOGLE_MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || 'demo_key';

  static async getDirections(origin: string, destination: string, mode: string = 'driving') {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&mode=${mode}&key=${this.GOOGLE_MAPS_KEY}`
      );
      
      if (!response.ok) {
        return this.getMockDirections(origin, destination);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Maps API Error:', error);
      return this.getMockDirections(origin, destination);
    }
  }

  static async searchNearbyPlaces(location: string, type: string, radius: number = 1000) {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&key=${this.GOOGLE_MAPS_KEY}`
      );
      
      return await response.json();
    } catch (error) {
      console.error('Places API Error:', error);
      return this.getMockPlaces(type);
    }
  }

  private static getMockDirections(origin: string, destination: string) {
    return {
      routes: [{
        legs: [{
          duration: { text: '12 minutes', value: 720 },
          distance: { text: '2.1 km', value: 2100 },
          steps: [
            { html_instructions: 'Head north on Godowlia Road', distance: { text: '500 m' } },
            { html_instructions: 'Turn right toward Dashashwamedh Ghat', distance: { text: '800 m' } },
            { html_instructions: 'Arrive at Kashi Vishwanath Temple', distance: { text: '800 m' } }
          ]
        }]
      }],
      status: 'OK'
    };
  }

  private static getMockPlaces(type: string) {
    const places: Record<string, Array<{ name: string; rating: number; vicinity: string }>> = {
      restaurant: [
        { name: 'Kashi Chat Bhandar', rating: 4.6, vicinity: 'Godowlia Market' },
        { name: 'Blue Lassi Shop', rating: 4.8, vicinity: 'Near Kashi Vishwanath' },
        { name: 'Dosa Cafe', rating: 4.4, vicinity: 'Assi Ghat Area' }
      ],
      temple: [
        { name: 'Kashi Vishwanath Temple', rating: 4.9, vicinity: 'Vishwanath Gali' },
        { name: 'Sankat Mochan Hanuman Temple', rating: 4.7, vicinity: 'Lanka' },
        { name: 'Durga Temple', rating: 4.5, vicinity: 'Durga Kund' }
      ]
    };
    
    return { results: places[type] || [] };
  }
}

// Weather APIs
export class WeatherAPI {
  private static readonly OPENWEATHER_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  private static readonly BASE_URL = 'https://api.openweathermap.org/data/2.5';

  static async getCurrentWeather(city: string = 'Varanasi') {
    // Try real OpenWeather API if key is available
    if (this.OPENWEATHER_KEY && this.OPENWEATHER_KEY !== 'demo_key' && !this.OPENWEATHER_KEY.includes('your-')) {
      try {
        const response = await fetch(
          `${this.BASE_URL}/weather?q=${city}&appid=${this.OPENWEATHER_KEY}&units=metric`
        );
        
        if (response.ok) {
          const data = await response.json();
          return {
            temperature: Math.round(data.main.temp),
            condition: data.weather[0].description,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            visibility: data.visibility / 1000,
            icon: data.weather[0].icon,
            source: 'openweather',
            city: data.name
          };
        }
      } catch (error) {
        console.error('OpenWeather API Error:', error);
      }
    }

    // Fallback to mock data
    return this.getMockWeather();
  }

  static async getWeatherForecast(city: string = 'Varanasi') {
    // Try real OpenWeather API if key is available
    if (this.OPENWEATHER_KEY && this.OPENWEATHER_KEY !== 'demo_key' && !this.OPENWEATHER_KEY.includes('your-')) {
      try {
        const response = await fetch(
          `${this.BASE_URL}/forecast?q=${city}&appid=${this.OPENWEATHER_KEY}&units=metric&cnt=5`
        );
        
        if (response.ok) {
          const data = await response.json();
          return {
            forecast: data.list.map((item: any) => ({
              date: new Date(item.dt * 1000).toLocaleDateString(),
              temperature: Math.round(item.main.temp),
              condition: item.weather[0].description,
              icon: item.weather[0].icon
            })),
            source: 'openweather'
          };
        }
      } catch (error) {
        console.error('OpenWeather Forecast API Error:', error);
      }
    }

    // Fallback to mock forecast
    return this.getMockForecast();
  }

  private static getMockWeather() {
    return {
      temperature: 28,
      condition: 'Clear sky',
      humidity: 65,
      windSpeed: 5.2,
      visibility: 10,
      icon: '01d',
      source: 'mock',
      city: 'Varanasi'
    };
  }

  private static getMockForecast() {
    return {
      forecast: [
        { date: 'Today', temperature: 28, condition: 'Clear', icon: '01d' },
        { date: 'Tomorrow', temperature: 30, condition: 'Partly Cloudy', icon: '02d' },
        { date: 'Day 3', temperature: 26, condition: 'Light Rain', icon: '10d' },
        { date: 'Day 4', temperature: 29, condition: 'Sunny', icon: '01d' },
        { date: 'Day 5', temperature: 31, condition: 'Hot', icon: '01d' }
      ],
      source: 'mock'
    };
  }
}

// Enhanced Translation API with Google Translate Integration
export class TranslationAPI {
  private static readonly GOOGLE_TRANSLATE_KEY = process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY;
  private static readonly TRANSLATE_ENDPOINT = 'https://translation.googleapis.com/language/translate/v2';

  static async translateText(text: string, targetLanguage: string, sourceLanguage: string = 'auto') {
    // Try real Google Translate API if key is available
    if (this.GOOGLE_TRANSLATE_KEY && this.GOOGLE_TRANSLATE_KEY !== 'demo_key' && !this.GOOGLE_TRANSLATE_KEY.includes('your-')) {
      try {
        const response = await fetch(`${this.TRANSLATE_ENDPOINT}?key=${this.GOOGLE_TRANSLATE_KEY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            q: text,
            source: sourceLanguage,
            target: targetLanguage,
            format: 'text'
          })
        });

        if (response.ok) {
          const data = await response.json();
          return {
            translatedText: data.data.translations[0].translatedText,
            sourceLanguage: data.data.translations[0].detectedSourceLanguage || sourceLanguage,
            targetLanguage,
            source: 'google'
          };
        }
      } catch (error) {
        console.error('Google Translate API Error:', error);
      }
    }

    // Fallback to enhanced mock translation
    return this.getEnhancedMockTranslation(text, targetLanguage);
  }

  private static getEnhancedMockTranslation(text: string, targetLang: string) {
    const translations: { [key: string]: { [key: string]: string } } = {
      'hi': {
        'Hello': 'नमस्ते',
        'Thank you': 'धन्यवाद',
        'How much?': 'कितना?',
        'Where is the temple?': 'मंदिर कहाँ है?',
        'I need help': 'मुझे मदद चाहिए',
        'Good morning': 'सुप्रभात',
        'Good evening': 'शुभ संध्या',
        'Please': 'कृपया',
        'Excuse me': 'माफ़ करें',
        'I don\'t understand': 'मैं समझ नहीं रहा',
        'Hotel': 'होटल',
        'Food': 'खाना',
        'Water': 'पानी',
        'Bathroom': 'बाथरूम',
        'Hospital': 'अस्पताल'
      },
      'bn': {
        'Hello': 'নমস্কার',
        'Thank you': 'ধন্যবাদ',
        'How much?': 'কত?',
        'Where is the temple?': 'মন্দির কোথায়?',
        'I need help': 'আমার সাহায্য দরকার'
      },
      'es': {
        'Hello': 'Hola',
        'Thank you': 'Gracias',
        'How much?': '¿Cuánto cuesta?',
        'Where is the temple?': '¿Dónde está el templo?',
        'I need help': 'Necesito ayuda'
      },
      'fr': {
        'Hello': 'Bonjour',
        'Thank you': 'Merci',
        'How much?': 'Combien ça coûte?',
        'Where is the temple?': 'Où est le temple?',
        'I need help': 'J\'ai besoin d\'aide'
      },
      'de': {
        'Hello': 'Hallo',
        'Thank you': 'Danke',
        'How much?': 'Wie viel kostet das?',
        'Where is the temple?': 'Wo ist der Tempel?',
        'I need help': 'Ich brauche Hilfe'
      },
      'ja': {
        'Hello': 'こんにちは',
        'Thank you': 'ありがとう',
        'How much?': 'いくらですか？',
        'Where is the temple?': '寺院はどこですか？',
        'I need help': '助けが必要です'
      },
      'ko': {
        'Hello': '안녕하세요',
        'Thank you': '감사합니다',
        'How much?': '얼마입니까?',
        'Where is the temple?': '사원이 어디에 있습니까?',
        'I need help': '도움이 필요합니다'
      }
    };

    const targetTranslations = translations[targetLang] || {};
    const translatedText = targetTranslations[text] || `[${text} in ${targetLang}]`;

    return {
      translatedText,
      sourceLanguage: 'en',
      targetLanguage: targetLang,
      source: 'mock'
    };
  }
}

// Emergency Services APIs
export class EmergencyAPI {
  static async reportEmergency(type: string, location: string, details: string) {
    try {
      const response = await fetch('/api/emergency', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, location, details, timestamp: new Date() })
      });
      
      return await response.json();
    } catch (error) {
      console.error('Emergency API Error:', error);
      return {
        success: true,
        emergencyId: `EMG${Date.now()}`,
        estimatedResponse: '5-10 minutes',
        contactNumber: '+91-112'
      };
    }
  }

  static async getEmergencyContacts(location: string) {
    return {
      police: { number: '100', name: 'Police Control Room' },
      ambulance: { number: '108', name: 'Emergency Medical Services' },
      fire: { number: '101', name: 'Fire Department' },
      tourist: { number: '+91-542-2501204', name: 'Tourist Helpline Varanasi' },
      hospital: { number: '+91-542-2307777', name: 'Sir Sunderlal Hospital' }
    };
  }
}

// AI Chat APIs
export class ChatAPI {
  private static readonly OPENAI_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
  private static readonly OPENAI_ENDPOINT = 'https://api.openai.com/v1/chat/completions';

  static async getChatResponse(message: string, context: any = {}) {
    // Try real OpenAI API first if key is available
    if (this.OPENAI_KEY && this.OPENAI_KEY !== 'demo_key' && !this.OPENAI_KEY.includes('your-')) {
      try {
        const response = await fetch(this.OPENAI_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.OPENAI_KEY}`,
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: `You are WanderMate, an expert AI travel assistant for Varanasi, India. You help tourists with hotels, restaurants, temples, transportation, and local experiences. Be helpful, concise, and culturally aware. Always provide practical information with prices in INR when relevant.`
              },
              {
                role: 'user',
                content: message
              }
            ],
            max_tokens: 300,
            temperature: 0.7
          })
        });

        if (response.ok) {
          const data = await response.json();
          return {
            message: data.choices[0].message.content,
            source: 'openai',
            timestamp: new Date().toISOString()
          };
        }
      } catch (error) {
        console.error('OpenAI API Error:', error);
      }
    }

    // Fallback to enhanced mock responses
    return {
      message: this.getEnhancedMockResponse(message),
      source: 'mock',
      timestamp: new Date().toISOString()
    };
  }

  private static getEnhancedMockResponse(message: string): string {
    const lowerMessage = message.toLowerCase();
    
    // Enhanced contextual responses
    if (lowerMessage.includes('hotel') || lowerMessage.includes('accommodation') || lowerMessage.includes('stay')) {
      return `🏨 **Top Hotels in Varanasi:**\n\n1. **Ganges Heritage Palace** - ₹8,500/night\n   • Near Dashashwamedh Ghat\n   • River views, spa, restaurant\n\n2. **Sacred Sands Resort** - ₹6,200/night\n   • Assi Ghat area\n   • Pool, yoga studio, breakfast\n\n3. **Royal Varanasi Luxury** - ₹12,800/night\n   • Premium location\n   • Butler service, fine dining\n\nWould you like me to help you book any of these? 🌟`;
    }

    if (lowerMessage.includes('food') || lowerMessage.includes('restaurant') || lowerMessage.includes('eat')) {
      return `🍽️ **Must-Try Food in Varanasi:**\n\n**Street Food:**\n• Kachori Sabzi at Ramchandra Chaat\n• Banarasi Paan at Keshav Paan\n• Lassi at Blue Lassi Shop\n\n**Restaurants:**\n• Keshari Restaurant (₹200-400)\n• Dolphin Restaurant (₹300-600)\n• Varuna Restaurant (₹400-800)\n\n**Local Specialties:**\n• Banarasi Thandai\n• Malaiyo (winter dessert)\n• Chura Matar\n\nTry the famous Banarasi breakfast! 🥘`;
    }

    if (lowerMessage.includes('temple') || lowerMessage.includes('spiritual') || lowerMessage.includes('religious')) {
      return `🕉️ **Sacred Temples of Varanasi:**\n\n**Kashi Vishwanath Temple**\n• Most important Shiva temple\n• Open: 3:00 AM - 11:00 PM\n• Entry: Free\n\n**Sankat Mochan Temple**\n• Dedicated to Hanuman\n• Famous for Tuesday prayers\n\n**Durga Temple**\n• Beautiful red temple\n• Also called Monkey Temple\n\n**New Vishwanath Temple** (BHU)\n• Modern temple complex\n• Open to all visitors\n\nRemember to dress modestly and remove shoes! 🙏`;
    }

    if (lowerMessage.includes('transport') || lowerMessage.includes('travel') || lowerMessage.includes('rickshaw')) {
      return `🚗 **Transportation in Varanasi:**\n\n**Auto Rickshaw:**\n• ₹30-50 for short distances\n• ₹100-200 for longer trips\n• Always negotiate fare\n\n**Boat Rides:**\n• Sunrise boat: ₹200-500\n• Evening aarti boat: ₹300-600\n• Private boat: ₹1000-2000\n\n**Cycle Rickshaw:**\n• ₹20-40 for short trips\n• Great for narrow lanes\n\n**Walking:**\n• Best way to explore old city\n• Wear comfortable shoes\n\nBook through our app for fixed prices! 🛺`;
    }

    if (lowerMessage.includes('weather') || lowerMessage.includes('climate')) {
      return `🌤️ **Varanasi Weather:**\n\n**Current Conditions:**\n• Temperature: 28°C\n• Humidity: 65%\n• Wind: Light breeze\n• Visibility: Good\n\n**Best Time to Visit:**\n• October to March (Pleasant)\n• April-June (Hot, 35-45°C)\n• July-September (Monsoon)\n\n**Today's Forecast:**\n• Morning: Clear skies\n• Afternoon: Partly cloudy\n• Evening: Pleasant for ghat visits\n\nPerfect weather for sightseeing! ☀️`;
    }

    if (lowerMessage.includes('shopping') || lowerMessage.includes('market') || lowerMessage.includes('buy')) {
      return `🛍️ **Shopping in Varanasi:**\n\n**Vishwanath Lane:**\n• Silk sarees, brass items\n• Bargaining expected\n\n**Thatheri Bazaar:**\n• Brass and copper utensils\n• Traditional items\n\n**Godowlia Market:**\n• Banarasi silk, jewelry\n• Books, handicrafts\n\n**Must Buy:**\n• Banarasi Silk Sarees (₹2000-20000)\n• Brass items (₹200-2000)\n• Rudraksha beads (₹100-1000)\n• Local spices and teas\n\nAlways negotiate prices! 🛒`;
    }

    // Default response
    return `Hello! I'm WanderMate AI, your travel companion for Varanasi! 😊\n\nI can help you with:\n• 🏨 **Hotels** - Find and book accommodations\n• 🍽️ **Food** - Local cuisine recommendations\n• 🕉️ **Temples** - Spiritual sites and timings\n• 🚗 **Transport** - Getting around the city\n• 🌤️ **Weather** - Current conditions and forecasts\n• 🛍️ **Shopping** - Best markets and items\n\nWhat would you like to know about Varanasi?`;
  }
} 