'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function FoodWalkPage() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [participants, setParticipants] = useState(1);

  const walkDetails = {
    name: 'Food Walk',
    tagline: 'Culinary Adventure',
    description: 'Embark on a delicious journey through Varanasi\'s famous street food scene, tasting authentic Banarasi delicacies and discovering the city\'s culinary secrets.',
    longDescription: 'Discover the authentic flavors of Varanasi through our carefully curated Food Walk. From traditional sweets to spicy street food, experience the city\'s rich culinary heritage that has been perfected over centuries. Our expert food guide will take you to the most beloved local eateries and hidden gems that only locals know about.',
    
    // Key Details
    duration: '2-3 Hours',
    distance: '1.8 km',
    difficulty: 'Easy',
    price: '₹899',
    groupSize: 'Max 6 people',
    timing: '9:00 AM - 12:00 PM (Morning) / 6:00 PM - 9:00 PM (Evening)',
    
    // Food Stops
    foodStops: [
      {
        name: 'Traditional Sweet Shops',
        description: 'Start your culinary journey with Varanasi\'s famous sweets like Kachori Sabzi, Malaiyo, and Rabri.',
        duration: '30 minutes',
        dishes: ['Kachori Sabzi', 'Malaiyo', 'Rabri', 'Thandai'],
        highlights: ['Traditional Sweets', 'Local Breakfast', 'Sweet Shops', 'Morning Rituals']
      },
      {
        name: 'Famous Food Streets',
        description: 'Explore the bustling food streets where locals gather for their daily meals and snacks.',
        duration: '45 minutes',
        dishes: ['Chaat', 'Samosa', 'Jalebi', 'Lassi'],
        highlights: ['Street Food', 'Local Atmosphere', 'Food Culture', 'Vibrant Markets']
      },
      {
        name: 'Street Food Vendors',
        description: 'Taste authentic street food from trusted vendors who have been serving for generations.',
        duration: '40 minutes',
        dishes: ['Pani Puri', 'Dahi Vada', 'Aloo Tikki', 'Bhelpuri'],
        highlights: ['Authentic Flavors', 'Local Vendors', 'Street Food', 'Traditional Recipes']
      },
      {
        name: 'Local Restaurants',
        description: 'Visit traditional restaurants serving authentic Banarasi thali and regional specialties.',
        duration: '35 minutes',
        dishes: ['Banarasi Thali', 'Dal Chawal', 'Sabzi Roti', 'Local Curries'],
        highlights: ['Traditional Meals', 'Local Restaurants', 'Regional Cuisine', 'Cultural Dining']
      },
      {
        name: 'Spice Markets',
        description: 'End your journey exploring the aromatic spice markets and learn about local spices.',
        duration: '30 minutes',
        dishes: ['Masala Chai', 'Spice Tasting', 'Local Tea', 'Traditional Drinks'],
        highlights: ['Spice Markets', 'Aromatic Spices', 'Local Tea', 'Cultural Learning']
      }
    ],
    
    // What's Included
    included: [
      'Expert Food Guide',
      'All Food Tastings (8-10 dishes)',
      'Bottled Water',
      'Food Safety Tips',
      'Cultural Food Stories',
      'Recipe Insights',
      'Local Food History',
      'Dietary Accommodations'
    ],
    
    // What to Bring
    toBring: [
      'Comfortable Walking Shoes',
      'Appetite for Adventure',
      'Camera/Phone',
      'Small Backpack',
      'Personal Medications',
      'Wet Wipes',
      'Cash for Additional Purchases'
    ],
    
    // Important Notes
    importantNotes: [
      'All food is prepared in hygienic conditions',
      'Vegetarian options available throughout',
      'Inform guide about any food allergies',
      'Pace yourself - there\'s a lot to taste!',
      'Traditional seating arrangements at some stops',
      'Tour operates in all weather conditions'
    ],
    
    // Images
    images: [
      '/images/food-walks.jpg',
      '/images/food.jpg',
      '/images/complete-package.jpg',
      '/images/varanasi-landscape.JPG'
    ]
  };

  const timeSlots = [
    { time: '9:00 AM', label: 'Morning (Recommended)' },
    { time: '6:00 PM', label: 'Evening' }
  ];

  const availableDates = [
    '2024-01-15', '2024-01-16', '2024-01-17', '2024-01-18', '2024-01-19',
    '2024-01-20', '2024-01-21', '2024-01-22', '2024-01-23', '2024-01-24'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white pt-24">
      {/* Navigation */}
      <div className="container max-w-7xl mx-auto px-6 mb-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/explore/walks" className="hover:text-red-600 transition-colors">Walks & Tours</Link>
          <span>/</span>
          <span className="text-red-600 font-medium">Food Walk</span>
        </nav>
      </div>

      {/* Hero Section */}
      <motion.section 
        className="container max-w-7xl mx-auto px-6 mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="text-red-600 font-medium text-lg">{walkDetails.tagline}</div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-none"
                  style={{ fontFamily: 'Georgia, "Times New Roman", serif', letterSpacing: '-0.02em' }}>
                {walkDetails.name}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed"
                 style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                {walkDetails.longDescription}
              </p>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 mb-1">⏱️</div>
                <div className="text-sm text-gray-600">Duration</div>
                <div className="font-semibold">{walkDetails.duration}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 mb-1">📍</div>
                <div className="text-sm text-gray-600">Distance</div>
                <div className="font-semibold">{walkDetails.distance}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 mb-1">🍽️</div>
                <div className="text-sm text-gray-600">Food Stops</div>
                <div className="font-semibold">5 Stops</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 mb-1">👥</div>
                <div className="text-sm text-gray-600">Group Size</div>
                <div className="font-semibold">{walkDetails.groupSize}</div>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-red-100 to-orange-100 p-6 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-red-600">{walkDetails.price}</div>
                  <div className="text-gray-600">per person</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Available Times</div>
                  <div className="font-semibold">{walkDetails.timing}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src={walkDetails.images[0]} 
                alt={walkDetails.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-white">
                  <div className="text-2xl font-bold mb-2">Taste Varanasi's Flavors</div>
                  <div className="text-red-200">Discover authentic street food and traditional delicacies</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Food Stops */}
      <motion.section 
        className="container max-w-7xl mx-auto px-6 mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
            Your Culinary Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto"
             style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
            From traditional sweets to spicy street food, experience the authentic flavors of Varanasi
          </p>
        </div>

        <div className="space-y-8">
          {walkDetails.foodStops.map((stop, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-xl p-8"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-2">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold text-xl">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900"
                          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                        {stop.name}
                      </h3>
                      <div className="text-red-600 font-medium">Duration: {stop.duration}</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed"
                     style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                    {stop.description}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Dishes You'll Taste:</h4>
                    <div className="flex flex-wrap gap-2">
                      {stop.dishes.map((dish, idx) => (
                        <span key={idx} className="px-3 py-1 bg-red-100 text-red-600 text-sm rounded-full font-medium">
                          {dish}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {stop.highlights.map((highlight, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="relative h-48 md:h-64 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-600"></div>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-white font-semibold">{stop.name}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* What's Included & What to Bring */}
      <motion.section 
        className="container max-w-7xl mx-auto px-6 mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="grid lg:grid-cols-2 gap-12">
          {/* What's Included */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
              What's Included
            </h3>
            <div className="space-y-4">
              {walkDetails.included.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* What to Bring */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
              What to Bring
            </h3>
            <div className="space-y-4">
              {walkDetails.toBring.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Important Notes */}
      <motion.section 
        className="container max-w-7xl mx-auto px-6 mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
            Important Notes
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {walkDetails.importantNotes.map((note, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
                  <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-gray-700">{note}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Booking Section */}
      <motion.section 
        className="container max-w-7xl mx-auto px-6 mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
            Book Your Food Walk
          </h3>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Booking Form */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                <select 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">Choose a date</option>
                  {availableDates.map((date) => (
                    <option key={date} value={date}>
                      {new Date(date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
                <select 
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">Choose a time</option>
                  {timeSlots.map((slot) => (
                    <option key={slot.time} value={slot.time}>
                      {slot.time} - {slot.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Participants</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setParticipants(Math.max(1, participants - 1))}
                    className="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center hover:bg-red-200 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold min-w-[3rem] text-center">{participants}</span>
                  <button
                    onClick={() => setParticipants(Math.min(6, participants + 1))}
                    className="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center hover:bg-red-200 transition-colors"
                  >
                    +
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">Maximum 6 participants per group</p>
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Price Summary</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Price per person</span>
                  <span className="font-semibold">{walkDetails.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Number of participants</span>
                  <span className="font-semibold">{participants}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-red-600">₹{(parseInt(walkDetails.price.replace('₹', '').replace(',', '')) * participants).toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <motion.button
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition-colors duration-300 mt-6"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!selectedDate || !selectedTime}
              >
                Book Now - ₹{(parseInt(walkDetails.price.replace('₹', '').replace(',', '')) * participants).toLocaleString()}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="bg-gradient-to-r from-red-600 to-red-800 py-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
            Ready to Taste Varanasi's Flavors?
          </h2>
          <p className="text-red-100 text-lg mb-8 max-w-2xl mx-auto"
             style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
            Book your Food Walk today and discover the authentic culinary heritage of Varanasi
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="bg-white text-red-600 hover:bg-red-50 font-semibold py-3 px-8 rounded-xl transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Food Walk
            </motion.button>
            <Link href="/explore/walks">
              <motion.button
                className="border-2 border-white text-white hover:bg-white hover:text-red-600 font-semibold py-3 px-8 rounded-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Walks
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
} 