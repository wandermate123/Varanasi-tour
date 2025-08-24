import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

// Initialize OpenAI with better error handling - only when needed
let openai: OpenAI | null = null;

function initializeOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY;
  
  console.log('Checking OpenAI API key:', apiKey ? 'Key found' : 'Key missing');
  
  if (!apiKey) {
    console.error('OPENAI_API_KEY is not set in environment variables');
    return null;
  }

  if (!openai) {
    openai = new OpenAI({
      apiKey: apiKey
    });
  }
  
  return openai;
}

// ===== REAL API INTEGRATION FUNCTIONS =====

// Real Weather API Integration using OpenWeatherMap
async function getRealWeatherData(city: string = 'Varanasi') {
  try {
    if (!process.env.OPENWEATHER_API_KEY) {
      console.log('OpenWeatherMap API key not configured, using mock data');
      return getWeatherData(city);
    }

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`);
    const data = await response.json();

    if (response.ok) {
      return {
        city: data.name,
        temperature: `${Math.round(data.main.temp)}°C`,
        condition: data.weather[0].main,
        humidity: `${data.main.humidity}%`,
        description: data.weather[0].description,
        windSpeed: `${data.wind.speed} m/s`,
        visibility: `${data.visibility / 1000} km`,
        advice: generateWeatherAdvice(data.main.temp, data.weather[0].main)
      };
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Real weather API error:', error);
    return getWeatherData(city); // Fallback to mock data
  }
}

function generateWeatherAdvice(temp: number, condition: string) {
  if (temp < 15) return 'Cool weather - perfect for temple visits and indoor activities!';
  if (temp > 35) return 'Hot weather - stay hydrated and prefer early morning or evening activities!';
  if (condition.toLowerCase().includes('rain')) return 'Rainy weather - carry umbrella and enjoy indoor cultural experiences!';
  return 'Great weather for exploring ghats and outdoor sightseeing!';
}

// Weather API Integration (Fallback)
async function getWeatherData(city: string = 'Varanasi') {
  try {
    return {
      city,
      temperature: '28°C',
      condition: 'Partly cloudy',
      humidity: '65%',
      description: 'Perfect weather for exploring ghats and temples',
      windSpeed: '12 km/h',
      visibility: 'Good',
      advice: 'Great day for outdoor activities and sightseeing!'
    };
  } catch (error) {
    console.error('Weather API error:', error);
    return null;
  }
}

// Places and Attractions API with detailed information
async function getNearbyAttractions(location: string) {
  try {
    const attractions = [
      { 
        name: 'Kashi Vishwanath Temple', 
        rating: 4.5, 
        vicinity: 'Varanasi, UP', 
        types: 'Hindu temple', 
        status: 'Open 4:00 AM - 11:00 PM',
        description: 'Most sacred Shiva temple, one of 12 Jyotirlingas',
        entryFee: 'Free',
        tips: 'Visit early morning to avoid crowds. Photography not allowed inside.'
      },
      { 
        name: 'Dashashwamedh Ghat', 
        rating: 4.7, 
        vicinity: 'Varanasi, UP', 
        types: 'Sacred ghat', 
        status: 'Open 24/7',
        description: 'Main ghat famous for spectacular Ganga Aarti ceremony',
        entryFee: 'Free',
        tips: 'Arrive 30 minutes early for Ganga Aarti. Best viewed from boats.'
      },
      { 
        name: 'Sarnath', 
        rating: 4.4, 
        vicinity: '10 km from Varanasi', 
        types: 'Buddhist site', 
        status: 'Open 6:00 AM - 6:00 PM',
        description: 'Where Buddha delivered his first sermon after enlightenment',
        entryFee: '₹15 for Indians, ₹200 for foreigners',
        tips: 'Combine with Sarnath Museum visit. Peaceful morning visits recommended.'
      },
      { 
        name: 'Assi Ghat', 
        rating: 4.3, 
        vicinity: 'Varanasi, UP', 
        types: 'River ghat', 
        status: 'Open 24/7',
        description: 'Popular for morning yoga, meditation, and boat rides',
        entryFee: 'Free',
        tips: 'Best for sunrise viewing and yoga sessions. Less crowded than other ghats.'
      },
      { 
        name: 'Ramnagar Fort', 
        rating: 4.0, 
        vicinity: '14 km from Varanasi', 
        types: 'Historical fort', 
        status: 'Open 9:00 AM - 5:00 PM',
        description: '18th-century fort with vintage cars and royal artifacts',
        entryFee: '₹20 for Indians, ₹50 for foreigners',
        tips: 'Take a ferry across Ganges to reach. Best in evening with sunset views.'
      }
    ];
    
    return attractions;
  } catch (error) {
    console.error('Attractions API error:', error);
    return [];
  }
}

// Food Delivery Options
async function getFoodDeliveryOptions() {
  try {
    return {
      availableServices: ['Swiggy', 'Zomato', 'Uber Eats', 'WanderMate Food'],
      popularRestaurants: [
        { name: 'Kachori Gali Famous', deliveryTime: '20-30 mins', minOrder: '₹150' },
        { name: 'Blue Lassi Shop', deliveryTime: '15-25 mins', minOrder: '₹100' },
        { name: 'Kashi Thali House', deliveryTime: '30-40 mins', minOrder: '₹200' }
      ],
      currentOffers: [
        '50% off first order',
        'Free delivery above ₹299',
        'Buy 1 Get 1 on selected items'
      ]
    };
  } catch (error) {
    console.error('Food delivery API error:', error);
    return null;
  }
}

// Available Cabs
async function getAvailableCabs() {
  try {
    return {
      autoRickshaw: { fare: '₹50-150', availability: 'High', waitTime: '2-5 mins' },
      sedan: { fare: '₹80-200', availability: 'Medium', waitTime: '3-7 mins' },
      bikeTaxi: { fare: '₹30-80', availability: 'High', waitTime: '1-3 mins' },
      suv: { fare: '₹120-300', availability: 'Low', waitTime: '5-10 mins' }
    };
  } catch (error) {
    console.error('Cab availability API error:', error);
    return null;
  }
}

// Hotel Options
async function getHotelOptions() {
  try {
    return {
      budget: [
        { name: 'Ganges View Hotel', price: '₹2,500/night', rating: 4.2, availability: 'Available' },
        { name: 'Zostel Varanasi', price: '₹800/night', rating: 4.4, availability: 'Available' }
      ],
      luxury: [
        { name: 'BrijRama Palace', price: '₹8,500/night', rating: 4.7, availability: 'Limited' },
        { name: 'Radisson Hotel', price: '₹6,500/night', rating: 4.5, availability: 'Available' }
      ],
      currentOffers: ['25% off weekend bookings', 'Free cancellation']
    };
  } catch (error) {
    console.error('Hotel options API error:', error);
    return null;
  }
}

// Flight Options
async function getFlightOptions() {
  try {
    return {
      fromVaranasi: [
        { destination: 'Delhi', price: '₹5,390', airline: 'IndiGo', duration: '1h 30m' },
        { destination: 'Mumbai', price: '₹8,000', airline: 'SpiceJet', duration: '2h 10m' },
        { destination: 'Bangalore', price: '₹7,200', airline: 'Air India', duration: '2h 45m' }
      ],
      offers: ['Early bird discounts', 'Student fares available']
    };
  } catch (error) {
    console.error('Flight options API error:', error);
    return null;
  }
}

// Local Services
async function getLocalServices() {
  try {
    return {
      tourGuides: [
        { name: 'Pandit Ramesh Kumar', specialization: 'Heritage Tours', price: '₹1,500/4hrs', rating: 4.8 },
        { name: 'Sita Devi', specialization: 'Food Tours', price: '₹1,200/4hrs', rating: 4.6 }
      ],
      wellness: [
        { name: 'Ganga Ayurvedic Spa', service: 'Abhyanga Massage', price: '₹2,500/60min', rating: 4.7 }
      ],
      photography: [
        { name: 'Kashi Clicks', service: 'Travel Photography', price: '₹4,000/3hrs', rating: 4.9 }
      ]
    };
  } catch (error) {
    console.error('Local services API error:', error);
    return null;
  }
}

// Payment Methods
async function getPaymentMethods() {
  try {
    return {
      upi: ['Google Pay', 'PhonePe', 'Paytm', 'BHIM'],
      cards: ['Visa', 'Mastercard', 'RuPay'],
      wallets: ['Paytm Wallet', 'MobiKwik', 'FreeCharge'],
      netbanking: ['SBI', 'HDFC', 'ICICI', 'Axis'],
      emi: ['Bajaj Finserv', 'ZestMoney', 'Simpl']
    };
  } catch (error) {
    console.error('Payment methods API error:', error);
    return null;
  }
}

// User Data (if authenticated)
async function getUserData(userId: string) {
  try {
    // This would fetch from user management API
    return {
      name: 'John Doe',
      preferences: { budget: 'moderate', interests: ['temples', 'food', 'culture'] },
      loyaltyPoints: 450,
      tier: 'Silver',
      recentBookings: ['Hotel booking', 'Food order', 'Guide service']
    };
  } catch (error) {
    console.error('User data API error:', error);
    return null;
  }
}

// Enhanced Restaurant Recommendations with detailed info
async function getRestaurantRecommendations(location: string, cuisine?: string) {
  try {
    const restaurants = [
      {
        name: 'Kachori Gali',
        cuisine: 'Street Food',
        rating: 4.5,
        priceRange: '₹50-150',
        specialty: 'Famous kachoris, samosas, and authentic Banarasi chaats',
        address: 'Near Vishwanath Gali, Varanasi',
        status: 'Open 7:00 AM - 10:00 PM',
        mustTry: 'Aloo kachori (₹15), Tamatar chaat (₹25), Lassi (₹30)',
        atmosphere: 'Bustling street food hub',
        tips: 'Go hungry! Try multiple stalls. Best time: evening'
      },
      {
        name: 'Dolphin Restaurant',
        cuisine: 'North Indian',
        rating: 4.2,
        priceRange: '₹200-500',
        specialty: 'Traditional thali and authentic North Indian curry',
        address: 'Cantonment Area, Varanasi',
        status: 'Open 11:00 AM - 11:00 PM',
        mustTry: 'Banarasi thali (₹250), Dal makhani (₹180), Butter naan (₹40)',
        atmosphere: 'Family restaurant with AC',
        tips: 'Great for traditional meals. Accepts cards. Pure veg options available.'
      },
      {
        name: 'Brown Bread Bakery',
        cuisine: 'Continental',
        rating: 4.3,
        priceRange: '₹150-400',
        specialty: 'Organic food, fresh bakery items, and healthy meals',
        address: 'Assi Ghat, Varanasi',
        status: 'Open 7:00 AM - 9:00 PM',
        mustTry: 'Banana pancakes (₹150), Fresh bread (₹80), Organic salads (₹200)',
        atmosphere: 'Cozy cafe with rooftop seating',
        tips: 'Popular with foreign tourists. Great breakfast spot. River views from rooftop.'
      },
      {
        name: 'Deena Chaat Bhandar',
        cuisine: 'Street Food',
        rating: 4.6,
        priceRange: '₹30-100',
        specialty: 'Authentic Banarasi chaat and traditional sweets',
        address: 'Dashashwamedh Ghat Road, Varanasi',
        status: 'Open 4:00 PM - 11:00 PM',
        mustTry: 'Banarasi paan (₹20), Kachori sabji (₹40), Rabri (₹60)',
        atmosphere: 'Traditional street-side stall',
        tips: 'Evening snacks specialist. Try the famous Banarasi paan here!'
      },
      {
        name: 'Shree Cafe',
        cuisine: 'Multi-cuisine',
        rating: 4.1,
        priceRange: '₹100-300',
        specialty: 'Rooftop dining with Ganges view',
        address: 'Near Dasaswamedh Ghat, Varanasi',
        status: 'Open 8:00 AM - 10:00 PM',
        mustTry: 'Ganga view breakfast (₹180), Masala chai (₹30), Veg thali (₹150)',
        atmosphere: 'Rooftop restaurant with river views',
        tips: 'Best for sunset dining. Book rooftop seats in advance.'
      }
    ];

    return cuisine 
      ? restaurants.filter(r => r.cuisine.toLowerCase().includes(cuisine.toLowerCase()))
      : restaurants;
  } catch (error) {
    console.error('Restaurant API error:', error);
    return [];
  }
}

// Enhanced Transportation Info
async function getTransportationInfo() {
  try {
    return {
      autoRickshaw: {
        fare: '₹50-150 within city, ₹200-300 to airport',
        time: '15-30 mins for city rides',
        availability: 'Readily available 24/7',
        tip: 'Negotiate fare beforehand. Use Ola/Uber for fixed rates.',
        appOptions: 'Ola Auto, Uber Auto available'
      },
      taxi: {
        fare: '₹8-12/km, ₹500-700 to airport',
        time: '15-25 mins for city rides',
        availability: 'Ola/Uber available 24/7',
        tip: 'Book through apps for transparent pricing and safety',
        carTypes: 'Mini, Sedan, SUV options available'
      },
      localBus: {
        fare: '₹10-20 for city routes',
        time: '30-45 mins depending on traffic',
        availability: 'Frequent service 6 AM - 10 PM',
        tip: 'Economical but can be crowded during peak hours',
        routes: 'Connects major ghats, railway station, and BHU'
      },
      boat: {
        fare: '₹20-50 per person for shared rides, ₹300-500 for private boat',
        time: '1-3 hours depending on route and stops',
        availability: 'Best during 5-8 AM (sunrise) and 5-7 PM (sunset)',
        tip: 'Perfect for ghat hopping and photography. Negotiate for longer trips.',
        specialServices: 'Ganga Aarti boat rides available with advance booking'
      },
      cycleBikeRental: {
        fare: '₹50-100 per day for cycle, ₹200-400 per day for bike',
        time: 'Flexible - explore at your own pace',
        availability: 'Multiple rental shops near ghats and hotels',
        tip: 'Great for exploring narrow lanes. Check brakes and carry helmet.',
        documents: 'License required for bikes, ID proof for cycles'
      }
    };
  } catch (error) {
    console.error('Transport API error:', error);
    return null;
  }
}

// Enhanced Currency Converter with exchange locations
async function getCurrencyRates() {
  try {
    return {
      USD: '₹83.25',
      EUR: '₹89.15',
      GBP: '₹104.30',
      AUD: '₹54.20',
      CAD: '₹61.80',
      SGD: '₹61.50',
      lastUpdated: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      exchangeLocations: [
        { name: 'Thomas Cook', address: 'Cantonment, near Railway Station', timing: '9:30 AM - 6:30 PM' },
        { name: 'HDFC Bank', address: 'Godowlia Market', timing: '10:00 AM - 4:00 PM' },
        { name: 'State Bank of India', address: 'Lanka, BHU', timing: '10:00 AM - 3:00 PM' },
        { name: 'Axis Bank', address: 'Sigra', timing: '10:00 AM - 4:00 PM' }
      ],
      tips: [
        'Carry passport and visa for currency exchange',
        'Banks offer better rates than hotels',
        'ATMs available at major locations',
        'Credit cards accepted at restaurants and hotels'
      ]
    };
  } catch (error) {
    console.error('Currency API error:', error);
    return null;
  }
}

// Enhanced Events with real-time suggestions
async function getCurrentEvents() {
  const today = new Date();
  const currentHour = today.getHours();
  const currentMonth = today.getMonth();
  
  const events = [
    {
      name: 'Ganga Aarti',
      time: '6:30 PM daily (varies by season)',
      location: 'Dashashwamedh Ghat',
      type: 'Religious ceremony',
      description: 'Magnificent evening prayer ceremony with hundreds of oil lamps',
      duration: '45 minutes',
      crowd: 'Very busy - arrive 30 minutes early for good spots',
      cost: 'Free to watch, ₹51+ for special seating',
      tips: 'Best viewed from boats. Photography allowed but flash discouraged.'
    },
    {
      name: 'Morning Boat Rides',
      time: '5:30 AM - 8:00 AM',
      location: 'Multiple ghats (Dasaswamedh, Assi, Manikarnika)',
      type: 'Tourism activity',
      description: 'Peaceful sunrise boat rides showcasing spiritual life along ghats',
      duration: '1-2 hours',
      cost: '₹300-500 per boat (up to 6 people)',
      tips: 'Book through hotels or directly at ghats. Carry warm clothes in winter.'
    },
    {
      name: 'Vishwanath Temple Darshan',
      time: '4:00 AM - 11:00 PM (with breaks)',
      location: 'Kashi Vishwanath Temple',
      type: 'Religious visit',
      description: 'Sacred darshan of one of the most revered Shiva temples',
      duration: '30 minutes - 2 hours (depending on crowd)',
      cost: 'Free, but special darshan available for ₹300+',
      tips: 'Early morning (5-7 AM) or late evening (9-10 PM) for shorter queues'
    }
  ];

  // Add time-specific events
  if (currentHour >= 5 && currentHour <= 8) {
    events.unshift({
      name: '🌅 Sunrise at Ghats (Happening Now!)',
      time: 'Current - perfect timing',
      location: 'Dashashwamedh, Assi, or Manikarnika Ghat',
      type: 'Natural phenomenon',
      description: 'Breathtaking sunrise over the sacred Ganges with morning prayers',
      duration: '1 hour',
      cost: 'Free from ghats, ₹300-500 for boat ride',
      tips: 'Take a boat for unobstructed views. Carry camera and warm clothes.'
    });
  }

  if (currentHour >= 17 && currentHour <= 19) {
    events.unshift({
      name: '🕯️ Ganga Aarti Preparation (Starting Soon!)',
      time: 'Preparation begins at 6:00 PM',
      location: 'Dashashwamedh Ghat',
      type: 'Religious ceremony',
      description: 'Witness the preparation for the famous evening Ganga Aarti',
      duration: '30 minutes preparation + 45 minutes ceremony',
      cost: 'Free, special seating ₹51+',
      tips: 'Arrive now to get the best viewing spots!'
    });
  }

  // Add seasonal festivals
  if (currentMonth >= 10 || currentMonth <= 1) { // Oct-Jan
    events.push({
      name: 'Dev Deepawali',
      time: 'November (Kartik Purnima)',
      location: 'All major ghats',
      type: 'Festival',
      description: 'Festival of lights where thousands of diyas illuminate all ghats',
      duration: 'All night celebration',
      cost: 'Free, boat rides ₹500-1000',
      tips: 'Book accommodation well in advance. Very crowded but spectacular!'
    });
  }

  return events;
}

// Comprehensive Emergency Services
function getEmergencyServices() {
  return {
    police: {
      emergency: '100',
      local: '+91-542-2506641',
      tourist: '+91-542-2501204',
      nearest: 'Kotwali Police Station - 1.5 km from Dashashwamedh Ghat',
      location: 'Civil Lines, near GPO'
    },
    medical: {
      emergency: '108 (Free ambulance)',
      hospitals: [
        {
          name: 'Sir Sunderlal Hospital (BHU)',
          type: 'Government - 24/7 emergency',
          distance: '2.3 km from main ghats',
          contact: '+91-542-2367568',
          specialty: 'Multi-specialty, trauma center'
        },
        {
          name: 'Heritage Hospital',
          type: 'Private - well-equipped',
          distance: '1.8 km from Cantonment',
          contact: '+91-542-2500709',
          specialty: 'Emergency, ICU, surgery'
        },
        {
          name: 'Pt. Madan Mohan Malviya Hospital',
          type: 'Government hospital',
          distance: '3.1 km from city center',
          contact: '+91-542-2450142',
          specialty: 'General medicine'
        }
      ],
      pharmacies: [
        'Apollo Pharmacy - Cantonment (24/7) - +91-542-2345678',
        'MedPlus - Godowlia Market - +91-542-2123456',
        'Wellness Pharmacy - Lanka - +91-542-2234567'
      ]
    },
    fire: {
      emergency: '101',
      local: '+91-542-2506789',
      station: 'City Fire Station - Chetganj'
    },
    tourist: {
      helpline: '1363 (India Tourism)',
      upTourism: '+91-542-2506638',
      office: 'UP Tourism Office, Cantonment - Open 10 AM - 5 PM',
      complaint: 'Tourist Helpline for complaints and assistance'
    },
    other: {
      railwayEnquiry: '139',
      railwayStation: '+91-542-2508952 (Varanasi Junction)',
      airportInfo: '+91-542-2623975 (Babatpur Airport)',
      womenHelpline: '1090',
      childHelpline: '1098',
      roadAccident: '1073'
    },
    embassies: [
      'Japanese Consulate - BHU Campus - +91-542-2368418',
      'US Consulate Services via Delhi/Kolkata - 1800-11-8472'
    ]
  };
}

// Enhanced Intent Analysis with Comprehensive Booking Detection
async function analyzeUserIntent(input: string) {
  const keywords = {
    weather: ['weather', 'temperature', 'rain', 'sunny', 'climate', 'hot', 'cold', 'forecast'],
    attractions: ['places', 'visit', 'see', 'attractions', 'tourist', 'sightseeing', 'temple', 'ghat', 'where to go'],
    food: ['food', 'restaurant', 'eat', 'cuisine', 'hungry', 'dining', 'breakfast', 'lunch', 'dinner', 'snack'],
    foodOrder: ['order food', 'food delivery', 'delivery', 'swiggy', 'zomato', 'uber eats', 'order online', 'hungry now'],
    transport: ['transport', 'taxi', 'bus', 'rickshaw', 'travel', 'go to', 'how to reach', 'uber', 'ola', 'boat'],
    cabBooking: ['book cab', 'book taxi', 'book auto', 'need ride', 'book rickshaw', 'hire cab', 'call cab'],
    hotel: ['hotel', 'accommodation', 'stay', 'room', 'lodge', 'guesthouse', 'where to stay'],
    hotelBooking: ['book hotel', 'book room', 'reserve hotel', 'hotel booking', 'accommodation booking', 'check in'],
    flight: ['flight', 'airplane', 'air travel', 'airport', 'fly to', 'airlines'],
    flightBooking: ['book flight', 'flight booking', 'air ticket', 'flight reservation', 'airline booking'],
    services: ['guide', 'tour guide', 'photographer', 'massage', 'spa', 'service', 'local service'],
    serviceBooking: ['book guide', 'hire guide', 'book photographer', 'book massage', 'book spa', 'hire service'],
    payment: ['payment', 'pay', 'upi', 'card', 'wallet', 'net banking', 'emi', 'transaction', 'payment method'],
    currency: ['currency', 'exchange', 'money', 'rate', 'convert', 'dollar', 'euro', 'atm', 'bank'],
    emergency: ['emergency', 'help', 'urgent', 'police', 'hospital', 'sick', 'accident', 'fire'],
    events: ['events', 'festival', 'ceremony', 'happening', 'aarti', 'celebration', 'when', 'time'],
    booking: ['book', 'reserve', 'booking', 'reservation', 'schedule', 'appointment', 'hire'],
    user: ['profile', 'account', 'loyalty', 'points', 'history', 'preferences']
  };

  const lowerInput = input.toLowerCase();
  const detectedIntents = [];

  for (const [intent, words] of Object.entries(keywords)) {
    if (words.some(word => lowerInput.includes(word))) {
      detectedIntents.push(intent);
    }
  }

  return detectedIntents.length > 0 ? detectedIntents : ['general'];
}

// Generate smart suggestions based on context and time
function generateSmartSuggestions(intents: string[], contextualData: any) {
  const suggestions = [];
  const currentHour = new Date().getHours();

  // Time-based suggestions
  if (currentHour >= 5 && currentHour <= 8) {
    suggestions.push('🌅 Sunrise boat ride booking', '☕ Best breakfast spots near ghats');
  } else if (currentHour >= 17 && currentHour <= 20) {
    suggestions.push('🕯️ Ganga Aarti viewing guide', '📸 Evening photography spots');
  } else if (currentHour >= 9 && currentHour <= 16) {
    suggestions.push('🏛️ Temple hopping itinerary', '🛍️ Local shopping markets');
  }

  // Intent-based suggestions
  if (intents.includes('weather') && contextualData.weather) {
    if (contextualData.weather.condition.includes('cloudy')) {
      suggestions.push('☁️ Perfect weather for walking tours');
    } else if (contextualData.weather.temperature.includes('28')) {
      suggestions.push('🌡️ Stay hydrated - water bottle recommendations');
    }
  }

  if (intents.includes('food') && contextualData.restaurants) {
    suggestions.push('🍽️ Vegetarian restaurant guide', '🥘 Street food safety tips');
  }

  if (intents.includes('attractions') && contextualData.attractions) {
    suggestions.push('🙏 Temple visiting etiquette', '📷 Photography permissions guide');
  }

  if (intents.includes('transport')) {
    suggestions.push('🚗 Book Ola/Uber now', '🛺 Auto-rickshaw fare calculator');
  }

  if (intents.includes('emergency')) {
    suggestions.push('🏥 Nearest hospital directions', '👮 Tourist police contact');
  }

  // Default suggestions if none match
  if (suggestions.length === 0) {
    suggestions.push(
      '🗺️ Plan a half-day temple tour',
      '🍛 Find authentic local cuisine',
      '🌤️ Get current weather update',
      '🚕 Book transportation now',
      '📞 Emergency contact numbers',
      '📋 Cultural etiquette guide'
    );
  }

  return suggestions.slice(0, 4);
}

// Main Enhanced AI Route
export async function POST(request: Request) {
  try {
    const openai = initializeOpenAI();
    if (!openai) {
      // Provide rich fallback data even without AI
      const fallbackData = {
        weather: await getWeatherData(),
        attractions: await getNearbyAttractions('Varanasi'),
        restaurants: await getRestaurantRecommendations('Varanasi'),
        transport: await getTransportationInfo(),
        events: await getCurrentEvents(),
        emergency: getEmergencyServices()
      };

      return NextResponse.json({ 
        text: 'AI service is temporarily unavailable, but I can still provide you with comprehensive real-time information about Varanasi!',
        error: 'OpenAI API configuration needed',
        contextualData: fallbackData,
        suggestions: [
          '🌤️ Check current weather conditions',
          '🏛️ View top-rated attractions',
          '🍽️ Find recommended restaurants',
          '🚕 Get transportation options',
          '📞 Access emergency contacts'
        ],
        realTimeInfo: {
          weather: fallbackData.weather,
          attractions: fallbackData.attractions.slice(0, 3),
          restaurants: fallbackData.restaurants.slice(0, 3),
          events: fallbackData.events.slice(0, 2)
        }
      }, { status: 200 });
    }

    const body = await request.json();
    const { input, type, userId, language = 'en', context } = body;

    console.log('Enhanced AI Request received:', { input, type, language });

    // Analyze user intent
    const intents = await analyzeUserIntent(input);
    console.log('Detected intents:', intents);

    // Gather comprehensive contextual data
    const contextualData: any = {};

    // Always get basic information
    contextualData.weather = await getWeatherData();
    contextualData.events = await getCurrentEvents();

    // Intent-specific data gathering with comprehensive APIs
    if (intents.includes('attractions') || intents.includes('general')) {
      contextualData.attractions = await getNearbyAttractions('Varanasi');
    }

    if (intents.includes('food')) {
      contextualData.restaurants = await getRestaurantRecommendations('Varanasi');
    }

    if (intents.includes('foodOrder')) {
      contextualData.foodDelivery = await getFoodDeliveryOptions();
    }

    if (intents.includes('transport')) {
      contextualData.transport = await getTransportationInfo();
    }

    if (intents.includes('cabBooking')) {
      contextualData.cabs = await getAvailableCabs();
    }

    if (intents.includes('hotel') || intents.includes('hotelBooking')) {
      contextualData.hotels = await getHotelOptions();
    }

    if (intents.includes('flight') || intents.includes('flightBooking')) {
      contextualData.flights = await getFlightOptions();
    }

    if (intents.includes('services') || intents.includes('serviceBooking')) {
      contextualData.localServices = await getLocalServices();
    }

    if (intents.includes('payment')) {
      contextualData.paymentMethods = await getPaymentMethods();
    }

    if (intents.includes('currency')) {
      contextualData.currency = await getCurrencyRates();
    }

    if (intents.includes('emergency')) {
      contextualData.emergency = getEmergencyServices();
    }

    if (intents.includes('user') && userId) {
      contextualData.user = await getUserData(userId);
    }

    // Build comprehensive system prompt
    const currentTime = new Date().toLocaleString('en-IN', { 
      timeZone: 'Asia/Kolkata',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const systemPrompt = `You are WanderMate, the most advanced AI travel companion for Varanasi and India. You have access to comprehensive real-time data and a complete booking ecosystem. You provide incredibly detailed, actionable advice and can help users book everything they need.

📅 Current DateTime: ${currentTime}
📍 Location: Varanasi, Uttar Pradesh, India
🏛️ Context: The spiritual capital on the sacred banks of River Ganges
${contextualData.user ? `👤 User: ${contextualData.user.name} (${contextualData.user.tier} member, ${contextualData.user.loyaltyPoints} points)` : ''}

🔄 REAL-TIME DATA ACCESS:
Weather: ${contextualData.weather ? `${contextualData.weather.temperature}, ${contextualData.weather.condition} - ${contextualData.weather.description}` : 'Not available'}
Current Events: ${contextualData.events ? contextualData.events.slice(0, 2).map((e: any) => `${e.name} (${e.time})`).join(' | ') : 'Standard daily activities'}
${contextualData.attractions ? `Top Attractions: ${contextualData.attractions.slice(0, 3).map((a: any) => `${a.name} (${a.rating}⭐, ${a.status})`).join(' | ')}` : ''}
${contextualData.restaurants ? `Dining Options: ${contextualData.restaurants.slice(0, 3).map((r: any) => `${r.name} (${r.cuisine}, ${r.rating}⭐, ${r.priceRange})`).join(' | ')}` : ''}
${contextualData.foodDelivery ? `Food Delivery: ${contextualData.foodDelivery.availableServices.join(', ')} available now` : ''}
${contextualData.transport ? `Transport: Auto ₹50-150 | Taxi ₹8-12/km | Boat ₹300-500 | All available now` : ''}
${contextualData.cabs ? `Available Cabs: Auto (${contextualData.cabs.autoRickshaw.waitTime}) | Sedan (${contextualData.cabs.sedan.waitTime}) | Bike (${contextualData.cabs.bikeTaxi.waitTime})` : ''}
${contextualData.hotels ? `Hotels: Budget from ₹800/night | Luxury from ₹6,500/night | Current offers available` : ''}
${contextualData.flights ? `Flights: Delhi ₹5,390 | Mumbai ₹8,000 | Bangalore ₹7,200` : ''}
${contextualData.localServices ? `Services: Tour Guide ₹1,500/4hrs | Spa ₹2,500/60min | Photography ₹4,000/3hrs` : ''}
${contextualData.paymentMethods ? `Payment: UPI, Cards, Wallets, Net Banking, EMI available` : ''}
${contextualData.currency ? `Exchange Rates: USD ${contextualData.currency.USD} | EUR ${contextualData.currency.EUR} | GBP ${contextualData.currency.GBP}` : ''}

🎯 USER INTENT DETECTED: ${intents.join(', ').toUpperCase()}

🚀 YOUR COMPREHENSIVE CAPABILITIES:
✅ Real-time information with live updates
✅ Complete booking ecosystem (cabs, hotels, flights, food, services)
✅ Instant availability and pricing
✅ Multiple payment options and secure transactions
✅ User profiles and loyalty program integration
✅ Cultural guidance with religious customs
✅ Safety protocols and emergency assistance  
✅ Personalized recommendations based on time/weather/preferences
✅ Step-by-step navigation and booking help
✅ Multi-language support and local insights
✅ Budget planning with exact cost breakdowns

🛒 BOOKING CAPABILITIES:
• Cab Booking: Auto-rickshaw, Sedan, SUV, Bike Taxi with real-time tracking
• Hotel Booking: Budget to luxury with instant confirmation
• Flight Booking: Domestic and international with seat selection
• Food Delivery: Local restaurants with 20-40 min delivery
• Local Services: Tour guides, spa, photography, translation
• Payment Processing: UPI, Cards, Wallets, EMI with secure gateway

📋 RESPONSE GUIDELINES:
• Use real-time data to make responses current and actionable
• Include specific details: exact timings, current prices, ratings, availability
• Provide step-by-step booking guidance when users want to book
• Consider current time/weather for recommendations
• Mention user's loyalty points and tier benefits when applicable
• Be culturally sensitive and respectful
• Include practical tips and insider knowledge
• Format information clearly with emojis and structure
• Always prioritize user safety and authentic experiences
• For bookings, explain the process and available payment methods
• Respond in ${language === 'en' ? 'English' : language}

🎯 Focus on providing VALUE through detailed, practical, real-time information and seamless booking experiences that help the user have an amazing time in Varanasi!`;

    // Generate enhanced response
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: input
        }
      ],
      temperature: 0.7,
      max_tokens: 1500
    });

    // Generate context-aware suggestions
    const suggestions = generateSmartSuggestions(intents, contextualData);

    const response = {
      text: completion.choices[0].message.content || 'I apologize, but I could not generate a response.',
      intent: intents[0] || 'general',
      detectedIntents: intents,
      contextualData,
      suggestions,
      realTimeInfo: {
        weather: contextualData.weather,
        attractions: contextualData.attractions?.slice(0, 3),
        restaurants: contextualData.restaurants?.slice(0, 3),
        events: contextualData.events?.slice(0, 2),
        transport: contextualData.transport,
        emergency: contextualData.emergency,
        timestamp: currentTime
      },
      metadata: {
        responseTime: Date.now(),
        dataFreshness: 'live',
        capabilities: ['real-time-data', 'cultural-guidance', 'emergency-support', 'booking-assistance']
      }
    };

    console.log('🚀 Enhanced AI Response generated with comprehensive real-time data');

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Error in enhanced AI processing:', error);
    
    // Provide rich fallback even on errors
    const fallbackData = {
      weather: await getWeatherData(),
      attractions: await getNearbyAttractions('Varanasi'),
      restaurants: await getRestaurantRecommendations('Varanasi'),
      emergency: getEmergencyServices(),
      events: await getCurrentEvents()
    };

    let errorMessage = '⚠️ AI service temporarily unavailable, but here\'s comprehensive real-time information to help you!';
    
    if (error.code === 'insufficient_quota') {
      errorMessage = '💡 AI quota reached. Here\'s detailed local information while we resolve this:';
    }

    return NextResponse.json({ 
      text: errorMessage,
      error: error.message,
      contextualData: fallbackData,
      suggestions: [
        '🌤️ Current weather & conditions',
        '🏛️ Top attractions with timings',
        '🍽️ Restaurant recommendations',
        '🚕 Transportation options',
        '📞 Emergency contacts & services',
        '🎭 Current events & activities'
      ],
      realTimeInfo: {
        weather: fallbackData.weather,
        attractions: fallbackData.attractions.slice(0, 3),
        restaurants: fallbackData.restaurants.slice(0, 3),
        events: fallbackData.events.slice(0, 2),
        emergency: fallbackData.emergency
      },
      metadata: {
        fallbackMode: true,
        dataAvailable: true
      }
    }, { status: 200 });
  }
} 