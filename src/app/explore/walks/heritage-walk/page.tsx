'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { StarIcon, ClockIcon, MapPinIcon, UsersIcon, ArrowRightIcon, CheckIcon, CalendarIcon, CurrencyRupeeIcon, ShieldCheckIcon, HeartIcon, ShareIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutlineIcon, ShareIcon as ShareOutlineIcon } from '@heroicons/react/24/outline';

export default function HeritageWalkPage() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [participants, setParticipants] = useState(1);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLiked, setIsLiked] = useState(false);

  const walkDetails = {
    name: 'Heritage Walk',
    tagline: 'Journey Through Time',
    description: 'Explore the ancient streets of Varanasi, discovering hidden temples, historical sites, and the rich cultural heritage that makes this city truly special.',
    longDescription: 'Embark on a fascinating journey through the heart of Varanasi, where every corner tells a story of devotion, tradition, and timeless beauty. Our Heritage Walk takes you through the most significant historical and spiritual landmarks, revealing the city\'s deep-rooted connection to Hindu mythology and ancient traditions.',
    
    // Key Details
    duration: '3-4 Hours',
    distance: '2.5 km',
    difficulty: 'Easy',
    price: '₹1,299',
    originalPrice: '₹1,599',
    groupSize: 'Max 8 people',
    rating: 4.9,
    reviews: 127,
    timing: '6:00 AM - 10:00 AM (Morning) / 4:00 PM - 8:00 PM (Evening)',
    
    // Route Details
    route: [
      {
        name: 'Dashashwamedh Ghat',
        description: 'Start your journey at the most famous ghat, where the sacred Ganga Aarti ceremony takes place every evening.',
        duration: '30 minutes',
        highlights: ['Sacred Ghat', 'Ganga Aarti Site', 'Boat Launch Point', 'Photography Spot']
      },
      {
        name: 'Kashi Vishwanath Temple',
        description: 'Visit the holiest temple dedicated to Lord Shiva, the presiding deity of Varanasi.',
        duration: '45 minutes',
        highlights: ['Golden Spire', 'Sacred Sanctum', 'Ancient Architecture', 'Spiritual Atmosphere']
      },
      {
        name: 'Manikarnika Ghat',
        description: 'Experience the profound spiritual significance of the most sacred cremation ghat.',
        duration: '20 minutes',
        highlights: ['Sacred Cremation Site', 'Spiritual Significance', 'Ancient Traditions', 'Holy Atmosphere']
      },
      {
        name: 'Ancient Alleys & Markets',
        description: 'Walk through narrow lanes lined with traditional shops, temples, and local life.',
        duration: '1 hour',
        highlights: ['Traditional Markets', 'Hidden Temples', 'Local Life', 'Street Photography']
      },
      {
        name: 'Local Markets',
        description: 'Explore vibrant markets selling religious items, traditional crafts, and local products.',
        duration: '45 minutes',
        highlights: ['Religious Items', 'Traditional Crafts', 'Local Products', 'Cultural Experience']
      }
    ],
    
    // What's Included
    included: [
      'Professional Local Guide',
      'Bottled Water',
      'Traditional Snacks',
      'Photography Tips & Assistance',
      'Safety Equipment',
      'Cultural Insights',
      'Historical Information',
      'Local Stories & Legends'
    ],
    
    // What to Bring
    toBring: [
      'Comfortable Walking Shoes',
      'Modest Clothing (shoulders & knees covered)',
      'Camera/Phone',
      'Small Backpack',
      'Personal Medications',
      'Sunscreen & Hat (morning tour)',
      'Light Jacket (evening tour)'
    ],
    
    // Important Notes
    importantNotes: [
      'Dress modestly as we visit religious sites',
      'Remove shoes before entering temples',
      'Photography may be restricted in some areas',
      'Respect ongoing religious ceremonies',
      'Follow guide instructions for safety',
      'Tour operates rain or shine (umbrellas provided)'
    ],
    
    // Images
    images: [
      '/images/heritage-walk.jpg',
      '/images/ghats.JPG',
      '/images/temple-tours.jpg',
      '/images/varanasi-landscape.JPG'
    ]
  };

  const calculateTotal = () => {
    const priceString = walkDetails.price.replace('₹', '').replace(',', '');
    return parseInt(priceString) * participants;
  };

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 pt-24">
      {/* Navigation */}
      <div className="container max-w-7xl mx-auto px-6 mb-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-orange-600 transition-colors duration-300">Home</Link>
          <span className="text-gray-400">/</span>
          <Link href="/explore/walks" className="hover:text-orange-600 transition-colors duration-300">Walks & Tours</Link>
          <span className="text-gray-400">/</span>
          <span className="text-orange-600 font-semibold">Heritage Walk</span>
        </nav>
      </div>

      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <div className="relative h-96 rounded-3xl overflow-hidden mb-8">
                <Image 
                  src={walkDetails.images[0]} 
                  alt={walkDetails.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                
                {/* Action Buttons */}
                <div className="absolute top-6 right-6 flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsLiked(!isLiked)}
                    className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-colors"
                  >
                    {isLiked ? (
                      <HeartIcon className="w-5 h-5 text-red-500" />
                    ) : (
                      <HeartOutlineIcon className="w-5 h-5 text-gray-600" />
                    )}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-colors"
                  >
                    <ShareOutlineIcon className="w-5 h-5 text-gray-600" />
                  </motion.button>
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="text-orange-200 text-sm font-medium mb-2">{walkDetails.tagline}</div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4"
                      style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                    {walkDetails.name}
                  </h1>
                  <p className="text-lg text-white/90 max-w-2xl"
                     style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                    {walkDetails.description}
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {[
                  { icon: ClockIcon, label: 'Duration', value: walkDetails.duration },
                  { icon: MapPinIcon, label: 'Distance', value: walkDetails.distance },
                  { icon: UsersIcon, label: 'Group Size', value: walkDetails.groupSize },
                  { icon: StarIcon, label: 'Rating', value: `${walkDetails.rating}★ (${walkDetails.reviews})` }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-orange-100 p-3 rounded-xl">
                        <stat.icon className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                        <div className="font-semibold text-gray-900">{stat.value}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Tabs */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-8">
              <div className="flex border-b border-gray-100">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'route', label: 'Route Details' },
                  { id: 'included', label: 'What\'s Included' },
                  { id: 'info', label: 'Important Info' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-4 px-6 text-sm font-medium transition-colors duration-300 ${
                      activeTab === tab.id
                        ? 'text-orange-600 border-b-2 border-orange-600 bg-orange-50'
                        : 'text-gray-600 hover:text-orange-600'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-8">
                <AnimatePresence mode="wait">
                  {activeTab === 'overview' && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-2xl font-bold text-gray-900 mb-6"
                          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                        About This Experience
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-6"
                         style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                        {walkDetails.longDescription}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Highlights</h4>
                          <div className="space-y-2">
                            {['Ancient Temples', 'Historical Sites', 'Local Culture', 'Expert Guide', 'Photography Spots'].map((highlight, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <CheckIcon className="w-4 h-4 text-green-500" />
                                <span className="text-gray-600">{highlight}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Timing</h4>
                          <p className="text-gray-600">{walkDetails.timing}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'route' && (
                    <motion.div
                      key="route"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-2xl font-bold text-gray-900 mb-6"
                          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                        Route Details
                      </h3>
                      <div className="space-y-6">
                        {walkDetails.route.map((stop, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex gap-4"
                          >
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                <span className="text-orange-600 font-bold">{index + 1}</span>
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="font-semibold text-gray-900">{stop.name}</h4>
                                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                  {stop.duration}
                                </span>
                              </div>
                              <p className="text-gray-600 mb-3">{stop.description}</p>
                              <div className="flex flex-wrap gap-2">
                                {stop.highlights.map((highlight, idx) => (
                                  <span key={idx} className="px-3 py-1 bg-orange-100 text-orange-600 text-xs rounded-full">
                                    {highlight}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'included' && (
                    <motion.div
                      key="included"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-2xl font-bold text-gray-900 mb-6"
                          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                        What's Included
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-4">Included in Your Tour</h4>
                          <div className="space-y-3">
                            {walkDetails.included.map((item, index) => (
                              <div key={index} className="flex items-center gap-3">
                                <CheckIcon className="w-5 h-5 text-green-500" />
                                <span className="text-gray-600">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-4">What to Bring</h4>
                          <div className="space-y-3">
                            {walkDetails.toBring.map((item, index) => (
                              <div key={index} className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                <span className="text-gray-600">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'info' && (
                    <motion.div
                      key="info"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-2xl font-bold text-gray-900 mb-6"
                          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                        Important Information
                      </h3>
                      <div className="space-y-4">
                        {walkDetails.importantNotes.map((note, index) => (
                          <div key={index} className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl">
                            <ShieldCheckIcon className="w-5 h-5 text-orange-600 mt-0.5" />
                            <span className="text-gray-700">{note}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="sticky top-24"
            >
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                {/* Price */}
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <span className="text-4xl font-bold text-gray-900">{walkDetails.price}</span>
                    <span className="text-lg text-gray-500 line-through">{walkDetails.originalPrice}</span>
                  </div>
                  <div className="text-sm text-gray-600">per person</div>
                </div>

                {/* Booking Form */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">Choose time</option>
                      <option value="morning">6:00 AM - 10:00 AM (Morning)</option>
                      <option value="evening">4:00 PM - 8:00 PM (Evening)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Number of Participants</label>
                    <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setParticipants(Math.max(1, participants - 1))}
                        className="px-4 py-3 bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center py-3 font-semibold">{participants}</span>
                      <button
                        onClick={() => setParticipants(Math.min(8, participants + 1))}
                        className="px-4 py-3 bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Price Summary */}
                  <div className="border-t border-gray-200 pt-6">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price per person</span>
                        <span className="font-semibold">{walkDetails.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Participants</span>
                        <span className="font-semibold">{participants}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-3">
                        <span>Total</span>
                        <span className="text-orange-600">{formatPrice(calculateTotal())}</span>
                      </div>
                    </div>
                  </div>

                  {/* Book Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-lg"
                  >
                    <CurrencyRupeeIcon className="w-5 h-5" />
                    Book Now
                    <ArrowRightIcon className="w-5 h-5" />
                  </motion.button>

                  <div className="text-center">
                    <p className="text-sm text-gray-500">
                      Free cancellation up to 24 hours before
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 