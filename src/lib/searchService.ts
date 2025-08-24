import { searchProducts, getProductsByCategory } from '@/data/products';
import type { Product } from '@/data/products';

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'product' | 'service' | 'event' | 'location' | 'temple' | 'food';
  category: string;
  image?: string;
  price?: string;
  location?: string;
  time?: string;
  link: string;
  relevance: number;
  tags: string[];
}

export interface SearchSuggestion {
  title: string;
  category: string;
  type: string;
  icon: string;
  link?: string;
}

// Comprehensive search data
const searchData = {
  temples: [
    {
      id: 'kashi-vishwanath',
      title: 'Kashi Vishwanath Temple',
      description: 'The most sacred temple dedicated to Lord Shiva, located in the heart of Varanasi',
      type: 'temple' as const,
      category: 'Sacred Temples',
      image: '/images/temples/kashi-vishwanath.jpg',
      location: 'Vishwanath Gali, Varanasi',
      link: '/explore/temples',
      tags: ['shiva', 'sacred', 'golden temple', 'spiritual']
    },
    {
      id: 'sankat-mochan',
      title: 'Sankat Mochan Temple',
      description: 'Ancient temple dedicated to Lord Hanuman, known for its spiritual significance',
      type: 'temple' as const,
      category: 'Sacred Temples',
      image: '/images/temples/sankat-mochan.jpg',
      location: 'Sankat Mochan Road, Varanasi',
      link: '/explore/temples',
      tags: ['hanuman', 'ancient', 'spiritual', 'monkey temple']
    },
    {
      id: 'durga-temple',
      title: 'Durga Temple',
      description: 'Famous temple dedicated to Goddess Durga, known for its red color and monkeys',
      type: 'temple' as const,
      category: 'Sacred Temples',
      image: '/images/temples/durga-temple.jpg',
      location: 'Durga Kund, Varanasi',
      link: '/explore/temples',
      tags: ['durga', 'goddess', 'red temple', 'monkeys']
    }
  ],
  services: [
    {
      id: 'heritage-walk',
      title: 'Heritage Walking Tour',
      description: 'Guided tour through ancient Varanasi streets, discovering hidden temples and historical sites',
      type: 'service' as const,
      category: 'Walking Tours',
      image: '/images/heritage-walk.jpg',
      price: '₹299',
      location: 'Old Varanasi',
      link: '/explore/ghats',
      tags: ['heritage', 'walking', 'guided', 'historical', 'culture']
    },
    {
      id: 'boat-ride-sunrise',
      title: 'Sunrise Boat Ride',
      description: 'Peaceful morning boat rides on the Ganges witnessing spiritual activities',
      type: 'service' as const,
      category: 'Boat Rides',
      image: '/images/hero2.jpg',
      price: '₹300-500',
      location: 'Multiple Ghats',
      time: '5:30 AM - 8:00 AM',
      link: '/explore/ghats',
      tags: ['boat', 'sunrise', 'ganges', 'spiritual', 'morning']
    },
    {
      id: 'ganga-aarti',
      title: 'Evening Ganga Aarti',
      description: 'Sacred fire ceremony with hundreds of oil lamps and traditional chants',
      type: 'service' as const,
      category: 'Spiritual Ceremonies',
      image: '/images/hero.jpg',
      price: '₹200',
      location: 'Dashashwamedh Ghat',
      time: '6:45 PM - 7:30 PM',
      link: '/explore/events',
      tags: ['aarti', 'evening', 'fire', 'ceremony', 'spiritual']
    },
    {
      id: 'food-walk',
      title: 'Street Food Walk',
      description: 'Culinary journey through Varanasi\'s famous street food and local flavors',
      type: 'service' as const,
      category: 'Food Tours',
      image: '/images/food-walks.jpg',
      price: '₹349',
      location: 'Various Locations',
      link: '/explore/food',
      tags: ['food', 'street food', 'culinary', 'local', 'tasting']
    }
  ],
  events: [
    {
      id: 'classical-music',
      title: 'Classical Music Concert',
      description: 'Soul-stirring melodies of traditional Indian classical music by renowned artists',
      type: 'event' as const,
      category: 'Cultural Events',
      image: '/images/hero3.jpg',
      price: '₹599',
      location: 'Sankat Mochan Temple',
      time: '7:00 PM - 9:00 PM',
      link: '/explore/events',
      tags: ['music', 'classical', 'cultural', 'evening', 'performance']
    },
    {
      id: 'yoga-session',
      title: 'Morning Yoga Session',
      description: 'Traditional yoga session by the Ganges with experienced instructors',
      type: 'event' as const,
      category: 'Wellness',
      image: '/images/wellness.jpg',
      price: '₹199',
      location: 'Assi Ghat',
      time: '6:00 AM - 7:30 AM',
      link: '/explore/events',
      tags: ['yoga', 'morning', 'wellness', 'ganges', 'meditation']
    }
  ],
  food: [
    {
      id: 'banarasi-paan',
      title: 'Banarasi Paan',
      description: 'Traditional betel leaf preparation with various fillings and spices',
      type: 'food' as const,
      category: 'Local Delicacies',
      image: '/images/food/paan.jpg',
      price: '₹20-50',
      location: 'Various Paan Shops',
      link: '/explore/food',
      tags: ['paan', 'betel', 'traditional', 'local', 'spices']
    },
    {
      id: 'kachori-sabzi',
      title: 'Kachori Sabzi',
      description: 'Crispy kachoris served with spicy potato curry, a Varanasi specialty',
      type: 'food' as const,
      category: 'Street Food',
      image: '/images/food/kachori.jpg',
      price: '₹30-60',
      location: 'Kachori Gali',
      link: '/explore/food',
      tags: ['kachori', 'sabzi', 'street food', 'breakfast', 'spicy']
    },
    {
      id: 'lassi',
      title: 'Banarasi Lassi',
      description: 'Thick and creamy yogurt-based drink with various flavors',
      type: 'food' as const,
      category: 'Beverages',
      image: '/images/food/lassi.jpg',
      price: '₹40-80',
      location: 'Lassi Shops',
      link: '/explore/food',
      tags: ['lassi', 'yogurt', 'refreshing', 'sweet', 'beverage']
    }
  ],
  locations: [
    {
      id: 'dashashwamedh-ghat',
      title: 'Dashashwamedh Ghat',
      description: 'The most famous and busiest ghat in Varanasi, known for Ganga Aarti',
      type: 'location' as const,
      category: 'Sacred Ghats',
      image: '/images/ghats/dashashwamedh.jpg',
      location: 'Dashashwamedh Ghat',
      link: '/explore/ghats',
      tags: ['ghat', 'ganga aarti', 'famous', 'busy', 'spiritual']
    },
    {
      id: 'assi-ghat',
      title: 'Assi Ghat',
      description: 'Peaceful ghat at the confluence of Ganges and Assi rivers',
      type: 'location' as const,
      category: 'Sacred Ghats',
      image: '/images/ghats/assi.jpg',
      location: 'Assi Ghat',
      link: '/explore/ghats',
      tags: ['ghat', 'peaceful', 'confluence', 'yoga', 'meditation']
    },
    {
      id: 'manikarnika-ghat',
      title: 'Manikarnika Ghat',
      description: 'Sacred cremation ghat where Hindus perform last rites',
      type: 'location' as const,
      category: 'Sacred Ghats',
      image: '/images/ghats/manikarnika.jpg',
      location: 'Manikarnika Ghat',
      link: '/explore/ghats',
      tags: ['ghat', 'cremation', 'sacred', 'last rites', 'spiritual']
    }
  ]
};

// Search function that searches across all content types
export const searchAll = (query: string): SearchResult[] => {
  const searchTerm = query.toLowerCase();
  const results: SearchResult[] = [];

  // Search products
  const products = searchProducts(query);
  products.forEach((product, index) => {
    results.push({
      id: product.id,
      title: product.title,
      description: product.description,
      type: 'product',
      category: product.category,
      image: product.image,
      price: `₹${product.price.toLocaleString()}`,
      link: `/shop/product/${product.id}`,
      relevance: 100 - index, // Higher relevance for first results
      tags: [product.category.toLowerCase(), product.subCategory.toLowerCase()]
    });
  });

  // Search other content types
  Object.values(searchData).flat().forEach((item) => {
    const titleMatch = item.title.toLowerCase().includes(searchTerm);
    const descMatch = item.description.toLowerCase().includes(searchTerm);
    const tagMatch = item.tags.some(tag => tag.toLowerCase().includes(searchTerm));
    const categoryMatch = item.category.toLowerCase().includes(searchTerm);

    if (titleMatch || descMatch || tagMatch || categoryMatch) {
      let relevance = 0;
      if (titleMatch) relevance += 50;
      if (descMatch) relevance += 30;
      if (tagMatch) relevance += 20;
      if (categoryMatch) relevance += 10;

      results.push({
        id: item.id,
        title: item.title,
        description: item.description,
        type: item.type,
        category: item.category,
        image: item.image,
        price: (item as any).price,
        location: item.location,
        time: (item as any).time,
        link: item.link,
        relevance,
        tags: item.tags
      });
    }
  });

  // Sort by relevance and return top results
  return results
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 20);
};

// Get search suggestions based on query
export const getSearchSuggestions = (query: string): SearchSuggestion[] => {
  const suggestions: SearchSuggestion[] = [];
  const searchTerm = query.toLowerCase();

  if (searchTerm.length === 0) {
    // Return popular searches
    return [
      { title: 'Kashi Vishwanath Temple', category: 'Temples', type: 'temple', icon: '🛕', link: '/explore/temples' },
      { title: 'Ganga Aarti', category: 'Spiritual Ceremonies', type: 'service', icon: '🕉️', link: '/explore/events' },
      { title: 'Banarasi Silk Saree', category: 'Products', type: 'product', icon: '🧶', link: '/shop/category/Textiles' },
      { title: 'Street Food Walk', category: 'Food Tours', type: 'service', icon: '🍜', link: '/explore/food' },
      { title: 'Sunrise Boat Ride', category: 'Boat Rides', type: 'service', icon: '⛵', link: '/explore/ghats' }
    ];
  }

  // Search across all content
  const results = searchAll(query);
  
  results.forEach(result => {
    const icon = getTypeIcon(result.type);
    suggestions.push({
      title: result.title,
      category: result.category,
      type: result.type,
      icon,
      link: result.link
    });
  });

  return suggestions.slice(0, 8);
};

// Get icon for content type
export const getTypeIcon = (type: string): string => {
  switch (type) {
    case 'temple':
      return '🛕';
    case 'service':
      return '🎯';
    case 'event':
      return '🎭';
    case 'product':
      return '🛍️';
    case 'food':
      return '🍜';
    case 'location':
      return '📍';
    default:
      return '🔍';
  }
};

// Get quick search categories
export const getQuickSearchCategories = () => [
  { name: 'AI Assistant', query: 'ai assistant', icon: '🤖', link: '/demo' },
  { name: 'Shopping', query: 'shopping', icon: '🛍️', link: '/shop' },
  { name: 'Packages', query: 'packages', icon: '📦', link: '/explore' },
  { name: 'Events', query: 'events', icon: '🎭', link: '/explore/events' },
  { name: 'Trip planning through WhatsApp', query: 'whatsapp trip planning', icon: '📱', link: '/whatsapp-demo' }
];

// Voice search functionality
export const performVoiceSearch = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      reject(new Error('Speech recognition not supported'));
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-IN';

    recognition.onstart = () => {
      console.log('Voice recognition started');
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      resolve(transcript);
    };

    recognition.onerror = (event: any) => {
      reject(new Error(event.error));
    };

    recognition.onend = () => {
      console.log('Voice recognition ended');
    };

    recognition.start();
  });
}; 