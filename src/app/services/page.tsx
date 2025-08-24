'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  MapPin, Camera, Hotel, UtensilsCrossed, Car, 
  ShoppingBag, Music, Heart, Shield, Globe,
  Users, Star, Zap, Gift, Compass, Palette,
  BookOpen, Calendar, Phone, MessageCircle
} from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  category: string;
  features: string[];
  price?: string;
  link: string;
  color: string;
  gradient: string;
}

const services: Service[] = [
  {
    id: 'walks-tours',
    title: 'Walks & Tours',
    description: 'Guided heritage walks and cultural tours through ancient Varanasi',
    icon: MapPin,
    category: 'Cultural Experiences',
    features: ['Heritage Walks', 'Temple Tours', 'Food Tours', 'Cultural Walks'],
    price: '₹299 - ₹599',
    link: '/explore/walks',
    color: 'purple',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 'boat-rides',
    title: 'Boat Rides',
    description: 'Magical boat experiences on the sacred Ganges River',
    icon: Compass,
    category: 'River Experiences',
    features: ['Sunrise Rides', 'Ganga Aarti', 'Evening Cruises', 'Private Boats'],
    price: '₹300 - ₹2000',
    link: '/explore/ghats',
    color: 'pink',
    gradient: 'from-pink-500 to-orange-500'
  },
  {
    id: 'accommodation',
    title: 'Accommodation',
    description: 'Comfortable stays with authentic Varanasi experiences',
    icon: Hotel,
    category: 'Luxury & Comfort',
    features: ['Heritage Hotels', 'Ghat View Rooms', 'Local Homestays', 'Boutique Hotels'],
    price: '₹1500 - ₹8000',
    link: '/explore/stay',
    color: 'orange',
    gradient: 'from-orange-500 to-yellow-500'
  },
  {
    id: 'photography',
    title: 'Photography',
    description: 'Professional photography services to capture your memories',
    icon: Camera,
    category: 'Creative Services',
    features: ['Professional Shoots', 'Sunrise Sessions', 'Cultural Moments', 'Wedding Photography'],
    price: '₹2000 - ₹15000',
    link: '/explore/photography',
    color: 'yellow',
    gradient: 'from-yellow-500 to-green-500'
  },
  {
    id: 'food-experiences',
    title: 'Food Experiences',
    description: 'Culinary journeys through Varanasi\'s authentic flavors',
    icon: UtensilsCrossed,
    category: 'Culinary Adventures',
    features: ['Street Food Tours', 'Cooking Classes', 'Restaurant Tours', 'Traditional Meals'],
    price: '₹500 - ₹2000',
    link: '/explore/food',
    color: 'green',
    gradient: 'from-green-500 to-blue-500'
  },
  {
    id: 'transportation',
    title: 'Transportation',
    description: 'Convenient and reliable transportation services',
    icon: Car,
    category: 'Travel Services',
    features: ['Airport Transfers', 'City Tours', 'Inter-city Travel', 'Local Transport'],
    price: '₹200 - ₹3000',
    link: '/explore',
    color: 'blue',
    gradient: 'from-blue-500 to-indigo-500'
  },
  {
    id: 'shopping',
    title: 'Shopping',
    description: 'Authentic Varanasi products and handicrafts',
    icon: ShoppingBag,
    category: 'Retail & Souvenirs',
    features: ['Banarasi Silk', 'Handicrafts', 'Religious Items', 'Local Art'],
    price: '₹500 - ₹50000',
    link: '/shop',
    color: 'indigo',
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'cultural-events',
    title: 'Cultural Events',
    description: 'Immerse yourself in Varanasi\'s rich cultural heritage',
    icon: Music,
    category: 'Entertainment',
    features: ['Classical Music', 'Dance Performances', 'Festivals', 'Cultural Shows'],
    price: '₹200 - ₹2000',
    link: '/explore/events',
    color: 'purple',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 'wellness',
    title: 'Wellness & Spa',
    description: 'Rejuvenate your mind, body, and soul',
    icon: Heart,
    category: 'Health & Wellness',
    features: ['Yoga Sessions', 'Meditation', 'Ayurvedic Treatments', 'Spa Services'],
    price: '₹500 - ₹5000',
    link: '/explore/events',
    color: 'pink',
    gradient: 'from-pink-500 to-red-500'
  },
  {
    id: 'emergency-support',
    title: 'Emergency Support',
    description: '24/7 assistance and emergency services',
    icon: Shield,
    category: 'Safety & Support',
    features: ['Medical Assistance', 'Police Support', 'Tourist Help', 'Emergency Contacts'],
    price: 'Free',
    link: '/contact',
    color: 'red',
    gradient: 'from-red-500 to-orange-500'
  },
  {
    id: 'ai-assistant',
    title: 'AI Travel Assistant',
    description: 'Your intelligent travel companion powered by AI',
    icon: Zap,
    category: 'Technology',
    features: ['Voice Interaction', 'Multi-language Support', 'Real-time Services', 'Personalized Recommendations'],
    price: 'Free',
    link: '/ai-companion',
    color: 'yellow',
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'whatsapp-support',
    title: 'WhatsApp Support',
    description: 'Get instant help and trip planning through WhatsApp',
    icon: MessageCircle,
    category: 'Communication',
    features: ['Trip Planning', 'Booking Assistance', 'Customer Support', 'Real-time Chat'],
    price: 'Free',
    link: '/contact',
    color: 'green',
    gradient: 'from-green-500 to-teal-500'
  }
];

const categories = [
  'All Services',
  'Cultural Experiences',
  'River Experiences',
  'Luxury & Comfort',
  'Creative Services',
  'Culinary Adventures',
  'Travel Services',
  'Retail & Souvenirs',
  'Entertainment',
  'Health & Wellness',
  'Safety & Support',
  'Technology',
  'Communication'
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Our Complete{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                Services
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Discover everything WanderMate has to offer for your perfect Varanasi experience
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-2xl">✨</span>
                <span className="text-white font-medium">50+ Services</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-2xl">🎯</span>
                <span className="text-white font-medium">Expert Guides</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-2xl">💎</span>
                <span className="text-white font-medium">Premium Quality</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore All Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From cultural experiences to modern conveniences, we have everything you need for an unforgettable journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200"
              >
                {/* Header */}
                <div className={`h-48 bg-gradient-to-br ${service.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <service.icon className="w-16 h-16 text-white" />
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                      {service.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        <span>{feature}</span>
                      </div>
                    ))}
                    {service.features.length > 3 && (
                      <div className="text-sm text-purple-600 font-medium">
                        +{service.features.length - 3} more features
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-2xl font-bold text-gray-900">
                      {service.price}
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="w-5 h-5 fill-current" />
                      <Star className="w-5 h-5 fill-current" />
                      <Star className="w-5 h-5 fill-current" />
                      <Star className="w-5 h-5 fill-current" />
                      <Star className="w-5 h-5 fill-current" />
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link href={service.link}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full bg-gradient-to-r ${service.gradient} text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium`}
                    >
                      <span>Explore Service</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-20"
          >
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-3xl p-12 text-white">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Your Journey?
              </h3>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Let our AI assistant help you plan the perfect trip or contact us directly for personalized assistance
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/ai-companion">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                  >
                    <Zap className="w-6 h-6" />
                    <span>AI Assistant</span>
                  </motion.button>
                </Link>
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/30 transition-all duration-300 flex items-center gap-2 border border-white/30"
                  >
                    <MessageCircle className="w-6 h-6" />
                    <span>Contact Us</span>
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 