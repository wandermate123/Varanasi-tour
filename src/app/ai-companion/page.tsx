'use client';

import { motion } from 'framer-motion';
import AdvancedAIAgent from '@/components/AdvancedAIAgent';
import { 
  Sparkles, Bot, Brain, Zap, MessageCircle, 
  Globe, MapPin, Hotel, UtensilsCrossed, Camera,
  ArrowRight, Star, Users, Clock, Shield
} from 'lucide-react';

export default function AICompanionPage() {
  const capabilities = [
    {
      icon: Hotel,
      title: 'Hotel Booking',
      description: 'Find and book the perfect accommodation',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: UtensilsCrossed,
      title: 'Food & Dining',
      description: 'Discover local restaurants and cuisine',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: MapPin,
      title: 'Navigation',
      description: 'Get directions and explore the city',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Camera,
      title: 'Photography',
      description: 'Find the best photo spots and services',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Globe,
      title: 'Translation',
      description: 'Real-time language translation',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: Shield,
      title: 'Emergency Help',
      description: '24/7 emergency assistance',
      color: 'from-red-500 to-pink-500'
    }
  ];

  const features = [
    {
      icon: Brain,
      title: 'Advanced AI',
      description: 'Powered by cutting-edge artificial intelligence',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: MessageCircle,
      title: 'Voice Interaction',
      description: 'Natural voice conversations in multiple languages',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Zap,
      title: 'Real-time Services',
      description: 'Instant booking, payments, and information',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Users,
      title: 'Personalized Experience',
      description: 'Tailored recommendations based on your preferences',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-violet-700 rounded-full flex items-center justify-center shadow-2xl">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-2 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full opacity-20"
                  />
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                WanderMate AI
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-violet-700">
                  Your Universal Travel Companion
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Experience the future of travel with our advanced AI assistant. 
                From booking hotels to emergency assistance, WanderMate AI handles everything 
                with voice interaction, real-time services, and personalized recommendations.
              </p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-gray-700 font-medium">AI Assistant Active</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                  <span className="text-gray-700 font-medium">Voice Enabled</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
                  <span className="text-gray-700 font-medium">Real-time Services</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Capabilities Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Your Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              WanderMate AI provides comprehensive travel assistance with advanced capabilities
              that make your trip seamless and enjoyable.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((capability, index) => (
              <motion.div
                key={capability.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                  <div className={`w-16 h-16 bg-gradient-to-br ${capability.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <capability.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{capability.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{capability.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Advanced Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience cutting-edge technology that makes travel planning effortless
              and your journey unforgettable.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Assistant Integration */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Try WanderMate AI Now
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the power of our universal AI travel companion. 
              Click the floating AI button to start your conversation!
            </p>
          </motion.div>

          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-12 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-violet-700 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <Bot className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Your AI Travel Companion is Ready
              </h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                WanderMate AI is now active and ready to help you with all your travel needs. 
                From booking hotels to finding the best local food, our AI assistant is here to make your journey perfect.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-gray-700">Voice Enabled</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <span className="text-sm text-gray-700">Multi-language</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                  <span className="text-sm text-gray-700">Real-time Services</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-violet-700 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-4">WanderMate AI</h3>
          <p className="text-gray-400 mb-6">
            Your universal travel companion powered by advanced artificial intelligence
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <span>Voice Interaction</span>
            <span>•</span>
            <span>Real-time Services</span>
            <span>•</span>
            <span>Multi-language Support</span>
            <span>•</span>
            <span>24/7 Assistance</span>
          </div>
        </div>
      </div>

      {/* AI Assistant Component */}
      <AdvancedAIAgent />
    </div>
  );
} 