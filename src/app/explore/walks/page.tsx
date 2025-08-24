'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { StarIcon, ClockIcon, MapPinIcon, UsersIcon, ArrowRightIcon, CheckIcon } from '@heroicons/react/24/solid';
import { HeartIcon, ShareIcon } from '@heroicons/react/24/outline';

export default function WalksPage() {
  const [selectedWalk, setSelectedWalk] = useState<string | null>(null);
  const [hoveredWalk, setHoveredWalk] = useState<string | null>(null);

  const walks = [
    {
      id: 'heritage-walk',
      name: 'Heritage Walk',
      tagline: 'Journey Through Time',
      description: 'Explore ancient temples, historical sites, and the rich cultural heritage of Varanasi.',
      duration: '3-4 Hours',
      distance: '2.5 km',
      difficulty: 'Easy',
      price: '₹1,299',
      originalPrice: '₹1,599',
      groupSize: 'Max 8 people',
      rating: 4.9,
      reviews: 127,
      highlights: ['Ancient Temples', 'Historical Sites', 'Local Culture'],
      included: ['Professional Guide', 'Water Bottle', 'Traditional Snacks'],
      timing: '6:00 AM - 10:00 AM / 4:00 PM - 8:00 PM',
      image: '/images/heritage-walk.jpg',
      link: '/explore/walks/heritage-walk',
      color: 'orange',
      gradient: 'from-orange-500 to-amber-600',
      bgGradient: 'from-orange-50 to-amber-50'
    },
    {
      id: 'food-walk',
      name: 'Food Walk',
      tagline: 'Culinary Adventure',
      description: 'Taste authentic Banarasi delicacies and discover the city\'s culinary secrets.',
      duration: '2-3 Hours',
      distance: '1.8 km',
      difficulty: 'Easy',
      price: '₹899',
      originalPrice: '₹1,199',
      groupSize: 'Max 6 people',
      rating: 4.8,
      reviews: 89,
      highlights: ['Street Food', 'Local Flavors', 'Food Stories'],
      included: ['Food Guide', 'All Food Tastings', 'Water'],
      timing: '9:00 AM - 12:00 PM / 6:00 PM - 9:00 PM',
      image: '/images/food-walks.jpg',
      link: '/explore/walks/food-walk',
      color: 'red',
      gradient: 'from-red-500 to-pink-600',
      bgGradient: 'from-red-50 to-pink-50'
    },
    {
      id: 'craft-walk',
      name: 'Feel the Craft Walk',
      tagline: 'Artisan\'s Journey',
      description: 'Discover skilled artisans and traditional crafts from silk weaving to brass work.',
      duration: '4-5 Hours',
      distance: '3.2 km',
      difficulty: 'Moderate',
      price: '₹1,599',
      originalPrice: '₹1,999',
      groupSize: 'Max 4 people',
      rating: 4.9,
      reviews: 156,
      highlights: ['Silk Weaving', 'Brass Work', 'Artisan Workshops'],
      included: ['Craft Expert Guide', 'Workshop Visits', 'Tea/Coffee'],
      timing: '10:00 AM - 3:00 PM',
      image: '/images/complete-package.jpg',
      link: '/explore/walks/craft-walk',
      color: 'purple',
      gradient: 'from-purple-500 to-indigo-600',
      bgGradient: 'from-purple-50 to-indigo-50'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -5,
      scale: 1.01,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 pt-20">
      {/* Navigation */}
      <div className="container max-w-6xl mx-auto px-4 mb-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
          <span className="text-gray-400">/</span>
          <Link href="/#explore" className="hover:text-orange-600 transition-colors">Explore</Link>
          <span className="text-gray-400">/</span>
          <span className="text-orange-600 font-semibold">Walks & Tours</span>
        </nav>
      </div>

      {/* Hero Section */}
      <motion.section 
        className="container max-w-6xl mx-auto px-4 mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 px-3 py-1.5 rounded-full text-sm font-medium mb-4"
          >
            <StarIcon className="w-3 h-3" />
            Premium Guided Experiences
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tight leading-none">
            Walks & Tours
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed mb-8">
            Experience Varanasi through curated walking tours that reveal the city's soul, flavors, and craftsmanship.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { icon: '👨‍🏫', label: 'Expert Guides' },
              { icon: '⭐', label: '4.9★ Rating' },
              { icon: '🔒', label: 'Safe & Secure' },
              { icon: '🎯', label: 'Small Groups' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl mb-1">{feature.icon}</div>
                <div className="text-sm text-gray-600 font-medium">{feature.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Walks Grid */}
      <motion.section 
        className="container max-w-6xl mx-auto px-4 mb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {walks.map((walk, index) => (
            <motion.div
              key={walk.id}
              variants={cardVariants}
              whileHover="hover"
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
              onMouseEnter={() => setHoveredWalk(walk.id)}
              onMouseLeave={() => setHoveredWalk(null)}
            >
              {/* Image Section - Smaller for mobile */}
              <div className="relative h-48 md:h-56 overflow-hidden">
                <Image 
                  src={walk.image} 
                  alt={walk.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${walk.gradient} opacity-70`}></div>
                <div className="absolute inset-0 bg-black/10"></div>
                
                {/* Price Badge */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-1.5 shadow-md">
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-bold text-gray-900">{walk.price}</span>
                    <span className="text-xs text-gray-500 line-through">{walk.originalPrice}</span>
                  </div>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-xl px-2 py-1.5 shadow-md">
                  <div className="flex items-center gap-1">
                    <StarIcon className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold text-gray-900">{walk.rating}</span>
                    <span className="text-xs text-gray-500">({walk.reviews})</span>
                  </div>
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="text-orange-200 text-xs font-medium mb-1">{walk.tagline}</div>
                  <h3 className="text-xl font-bold mb-2">
                    {walk.name}
                  </h3>
                  
                  {/* Quick Stats */}
                  <div className="flex items-center gap-3 text-white/90 text-xs">
                    <div className="flex items-center gap-1">
                      <ClockIcon className="w-3 h-3" />
                      <span>{walk.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPinIcon className="w-3 h-3" />
                      <span>{walk.distance}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <UsersIcon className="w-3 h-3" />
                      <span>{walk.groupSize}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-4">
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {walk.description}
                </p>
                
                {/* Highlights */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1.5">
                    {walk.highlights.map((highlight, idx) => (
                      <span key={idx} className={`px-2 py-1 bg-${walk.color}-100 text-${walk.color}-600 text-xs rounded-lg font-medium`}>
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Included Items */}
                <div className="mb-4">
                  <div className="space-y-1">
                    {walk.included.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                        <CheckIcon className="w-3 h-3 text-green-500" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <motion.button
                    className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 rounded-lg transition-colors text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedWalk(selectedWalk === walk.id ? null : walk.id)}
                  >
                    {selectedWalk === walk.id ? 'Hide Details' : 'View Details'}
                  </motion.button>
                  
                  <Link href={walk.link}>
                    <motion.button
                      className={`bg-gradient-to-r ${walk.gradient} hover:shadow-md text-white font-medium py-2.5 px-4 rounded-lg transition-all text-sm flex items-center gap-1`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Book
                      <ArrowRightIcon className="w-3 h-3" />
                    </motion.button>
                  </Link>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {selectedWalk === walk.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-gray-200"
                    >
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Timing</h4>
                          <p className="text-gray-600 text-xs">{walk.timing}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Difficulty</h4>
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((level) => (
                                <div
                                  key={level}
                                  className={`w-2 h-2 rounded-full ${
                                    level <= (walk.difficulty === 'Easy' ? 2 : walk.difficulty === 'Moderate' ? 3 : 4)
                                      ? `bg-${walk.color}-500`
                                      : 'bg-gray-200'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-600 capitalize">{walk.difficulty}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Why Choose Our Walks */}
      <motion.section 
        className="bg-gradient-to-r from-gray-900 to-gray-800 py-16 mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose Our Walks?
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Experience Varanasi like never before with our premium guided tours
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '👨‍🏫',
                title: 'Expert Local Guides',
                description: 'Certified guides with deep knowledge of Varanasi\'s history and culture'
              },
              {
                icon: '👥',
                title: 'Small Group Experience',
                description: 'Intimate experiences with maximum 8 people for personalized attention'
              },
              {
                icon: '🛡️',
                title: 'Safe & Insured',
                description: 'All safety protocols followed with comprehensive insurance coverage'
              },
              {
                icon: '🌟',
                title: 'Premium Quality',
                description: 'Carefully curated experiences that go beyond typical tourist attractions'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="bg-gradient-to-r from-orange-600 to-amber-600 py-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Explore Varanasi on Foot?
          </h2>
          <p className="text-lg text-orange-100 mb-8 max-w-2xl mx-auto">
            Book your preferred walk and discover the magic of Varanasi through our expert-guided tours
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.button
              className="bg-white text-orange-600 hover:bg-orange-50 font-semibold py-3 px-6 rounded-lg transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Book a Walk
            </motion.button>
            <motion.button
              className="border-2 border-white text-white hover:bg-white hover:text-orange-600 font-semibold py-3 px-6 rounded-lg transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Contact Us
            </motion.button>
          </div>
        </div>
      </motion.section>
    </div>
  );
} 