'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function FoodPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const foodCategories = [
    { id: 'all', name: 'All Food', icon: '🍽️' },
    { id: 'street', name: 'Street Food', icon: '🌮' },
    { id: 'sweets', name: 'Sweets', icon: '🍭' },
    { id: 'restaurants', name: 'Restaurants', icon: '🏪' },
    { id: 'beverages', name: 'Beverages', icon: '☕' }
  ];

  const foodItems = [
    {
      id: 'kashi-chaat',
      name: 'Kashi Chaat Bhandar',
      category: 'street',
      type: 'Chaat Shop',
      description: 'Famous for authentic Banarasi chaat, especially aloo tikki and tamatar chaat. A must-visit for street food lovers.',
      specialty: 'Aloo Tikki Chaat',
      price: '₹30-80 per plate',
      timing: '11:00 AM - 10:00 PM',
      location: 'Godowlia Market',
      rating: 4.8,
      highlights: ['Famous aloo tikki', 'Authentic flavors', 'Local favorite', 'Budget-friendly'],
      mustTry: ['Aloo Tikki Chaat', 'Tamatar Chaat', 'Papdi Chaat', 'Dahi Bhalla'],
      tips: ['Visit in evening', 'Try combo plates', 'Carry hand sanitizer', 'Cash only'],
      image: '/images/kashi-chaat.jpg'
    },
    {
      id: 'blue-lassi',
      name: 'Blue Lassi Shop',
      category: 'beverages',
      type: 'Lassi Shop',
      description: 'World-famous lassi shop serving thick, creamy lassi since 1925. Featured in travel guides globally.',
      specialty: 'Thick Malai Lassi',
      price: '₹40-120 per glass',
      timing: '8:00 AM - 10:00 PM',
      location: 'Kachori Gali, Dashashwamedh',
      rating: 4.9,
      highlights: ['Since 1925', 'World famous', 'Thick texture', 'Multiple flavors'],
      mustTry: ['Special Malai Lassi', 'Banana Lassi', 'Apple Lassi', 'Pomegranate Lassi'],
      tips: ['Try special lassi', 'Small shop gets crowded', 'Perfect summer drink', 'Clay cups available'],
      image: '/images/blue-lassi.jpg'
    },
    {
      id: 'kachori-gali',
      name: 'Kachori Gali',
      category: 'street',
      type: 'Street Food Area',
      description: 'Entire lane dedicated to kachori and sabzi breakfast. Traditional Banarasi morning meal experience.',
      specialty: 'Kachori Sabzi',
      price: '₹25-60 per plate',
      timing: '6:00 AM - 11:00 AM',
      location: 'Near Dashashwamedh Ghat',
      rating: 4.7,
      highlights: ['Morning breakfast', 'Traditional lane', 'Multiple shops', 'Authentic taste'],
      mustTry: ['Kachori with Aloo Sabzi', 'Chana Sabzi', 'Jalebi', 'Hot Tea'],
      tips: ['Visit early morning', 'Try different shops', 'Perfect breakfast spot', 'Locals favorite'],
      image: '/images/kachori-gali.jpg'
    },
    {
      id: 'deena-chaat',
      name: 'Deena Chaat Bhandar',
      category: 'street',
      type: 'Chaat Shop',
      description: 'Legendary chaat shop famous for tamatar chaat and innovative chaat varieties. Running for generations.',
      specialty: 'Tamatar Chaat',
      price: '₹40-100 per plate',
      timing: '4:00 PM - 11:00 PM',
      location: 'Luxa, Varanasi',
      rating: 4.8,
      highlights: ['Famous tamatar chaat', 'Innovative varieties', 'Hygienic preparation', 'Family legacy'],
      mustTry: ['Tamatar Chaat', 'Palak Chaat', 'Fruit Chaat', 'Mixed Chaat'],
      tips: ['Evening visit recommended', 'Try tamatar chaat', 'Popular among locals', 'Moderate crowd'],
      image: '/images/deena-chaat.jpg'
    },
    {
      id: 'pehelwan-kulfi',
      name: 'Pehelwan Kulfi',
      category: 'sweets',
      type: 'Kulfi Shop',
      description: 'Famous kulfi shop serving traditional kulfi and rabri for over 100 years. A sweet legacy of Varanasi.',
      specialty: 'Malai Kulfi',
      price: '₹30-80 per piece',
      timing: '12:00 PM - 11:00 PM',
      location: 'Chowk, Varanasi',
      rating: 4.6,
      highlights: ['Over 100 years old', 'Traditional kulfi', 'Dense texture', 'Multiple flavors'],
      mustTry: ['Malai Kulfi', 'Pista Kulfi', 'Rabri', 'Kulfi Faluda'],
      tips: ['Perfect for summer', 'Try traditional flavors', 'Cash payment only', 'Historic shop'],
      image: '/images/pehelwan-kulfi.jpg'
    },
    {
      id: 'dolphin-restaurant',
      name: 'Dolphin Restaurant',
      category: 'restaurants',
      type: 'Multi-cuisine Restaurant',
      description: 'Popular restaurant with Ganga view, serving Indian, Chinese, and Continental food. Great for families.',
      specialty: 'South Indian Food',
      price: '₹200-500 per person',
      timing: '7:00 AM - 11:00 PM',
      location: 'Assi Ghat',
      rating: 4.4,
      highlights: ['Ganga view', 'AC dining', 'Multi-cuisine', 'Family friendly'],
      mustTry: ['Masala Dosa', 'Thali', 'Chinese dishes', 'Fresh juices'],
      tips: ['Book window seats', 'Great for families', 'AC comfort', 'View of Ganga'],
      image: '/images/dolphin-restaurant.jpg'
    },
    {
      id: 'banarasi-paan',
      name: 'Banarasi Paan',
      category: 'street',
      type: 'Paan Shop',
      description: 'Traditional paan shops serving authentic Banarasi paan with various flavors and ingredients.',
      specialty: 'Maghai Paan',
      price: '₹20-200 per paan',
      timing: '9:00 AM - 12:00 AM',
      location: 'Throughout Varanasi',
      rating: 4.5,
      highlights: ['Traditional preparation', 'Multiple varieties', 'Digestive properties', 'Cultural experience'],
      mustTry: ['Maghai Paan', 'Chocolate Paan', 'Silver Paan', 'Fire Paan'],
      tips: ['Try after meals', 'Start with mild varieties', 'Cultural significance', 'Many shops available'],
      image: '/images/banarasi-paan.jpg'
    },
    {
      id: 'thandai',
      name: 'Traditional Thandai',
      category: 'beverages',
      type: 'Traditional Drink',
      description: 'Refreshing traditional drink made with milk, nuts, and spices. Special preparations during Holi festival.',
      specialty: 'Banarasi Thandai',
      price: '₹50-150 per glass',
      timing: 'Available year-round',
      location: 'Various shops in old city',
      rating: 4.7,
      highlights: ['Traditional recipe', 'Cooling properties', 'Festival special', 'Nutritious drink'],
      mustTry: ['Plain Thandai', 'Dry Fruit Thandai', 'Rose Thandai', 'Special Holi Thandai'],
      tips: ['Perfect for summer', 'Try during Holi', 'Natural cooling', 'Ask for fresh preparation'],
      image: '/images/thandai.jpg'
    }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? foodItems 
    : foodItems.filter(item => item.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-24">
      {/* Navigation */}
      <div className="container max-w-7xl mx-auto px-6 mb-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/#explore" className="hover:text-green-600 transition-colors">Explore</Link>
          <span>/</span>
          <span className="text-green-600 font-medium">Food</span>
        </nav>
      </div>

      {/* Hero Section */}
      <motion.section 
        className="container max-w-7xl mx-auto px-6 mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 tracking-tight leading-none"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif', letterSpacing: '-0.02em' }}>
            Varanasi Food
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-light leading-relaxed"
             style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
            Savor the authentic flavors of Kashi. From legendary street food to traditional sweets, experience a culinary journey through ancient recipes and modern delights.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <motion.div 
            className="text-center"
            variants={itemVariants}
          >
            <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
            <div className="text-gray-600">Food Stalls</div>
          </motion.div>
          <motion.div 
            className="text-center"
            variants={itemVariants}
          >
            <div className="text-3xl font-bold text-green-600 mb-2">100+</div>
            <div className="text-gray-600">Year Old Recipes</div>
          </motion.div>
          <motion.div 
            className="text-center"
            variants={itemVariants}
          >
            <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
            <div className="text-gray-600">Varieties</div>
          </motion.div>
          <motion.div 
            className="text-center"
            variants={itemVariants}
          >
            <div className="text-3xl font-bold text-green-600 mb-2">₹20+</div>
            <div className="text-gray-600">Starting Price</div>
          </motion.div>
        </div>
      </motion.section>

      {/* Category Showcase (card style) */}
      <motion.section
        id="categories"
        className="container max-w-7xl mx-auto px-6 mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {foodCategories.map((category) => {
            const categoryImageMap: Record<string, string> = {
              all: '/images/food.jpg',
              street: '/images/food.jpg',
              sweets: '/images/food.jpg',
              restaurants: '/images/food.jpg',
              beverages: '/images/food.jpg'
            };

            const imageSrc = categoryImageMap[category.id] || '/images/food.jpg';

            return (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`group text-left focus:outline-none`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative w-full h-56 overflow-hidden rounded-xl shadow-lg">
                  <Image
                    src={imageSrc}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 20vw"
                  />
                </div>
                <div className="mt-4 text-center">
                  <div
                    className={`text-xl italic ${
                      selectedCategory === category.id ? 'text-green-700' : 'text-gray-800'
                    }`}
                    style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                  >
                    {category.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {category.id === 'all' ? 'All Food Spots' : `All ${category.name} Spots`}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.section>

      {/* Food Items Grid */}
      <motion.section 
        className="container max-w-7xl mx-auto px-6 mb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 group cursor-pointer"
              onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600"></div>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="text-sm font-medium text-gray-900">{item.rating}</span>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-2"
                      style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                    {item.name}
                  </h3>
                  <p className="text-green-100 text-sm font-medium">
                    {item.specialty} • {item.price}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-green-100 text-green-600 text-xs rounded-full font-medium">
                    {item.type}
                  </span>
                  <span className="text-sm text-gray-500">{item.location}</span>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-3"
                   style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                  {item.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.highlights.slice(0, 3).map((highlight, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                      {highlight}
                    </span>
                  ))}
                </div>

                <div className="text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <span className="font-medium mr-2">Timing:</span>
                    {item.timing}
                  </div>
                </div>

                <motion.button
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {selectedItem === item.id ? 'Hide Details' : 'View Details'}
                </motion.button>

                {/* Expanded Details */}
                {selectedItem === item.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 pt-6 border-t border-gray-200"
                  >
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Must Try Items</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {item.mustTry.map((dish, idx) => (
                            <span key={idx} className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-md text-center">
                              {dish}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Visitor Tips</h4>
                        <ul className="text-gray-600 text-sm space-y-1">
                          {item.tips.map((tip, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-green-600 mr-2">•</span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Food Safety Tips */}
      <motion.section 
        className="bg-green-50 py-16 mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
            Food Safety & Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🧼</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Hygiene First</h3>
              <p className="text-gray-600 text-sm">Choose clean, busy stalls. Carry hand sanitizer and use it before eating.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔥</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Hot & Fresh</h3>
              <p className="text-gray-600 text-sm">Eat freshly prepared hot food. Avoid items that have been sitting out for long.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💧</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Safe Water</h3>
              <p className="text-gray-600 text-sm">Drink bottled water. Avoid ice in drinks unless you're sure about water quality.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🌶️</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Spice Level</h3>
              <p className="text-gray-600 text-sm">Start with mild spices if you're not used to Indian food. Ask for less spicy options.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Cash Ready</h3>
              <p className="text-gray-600 text-sm">Most street food vendors accept only cash. Keep small denominations handy.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Follow Locals</h3>
              <p className="text-gray-600 text-sm">Eat where locals eat. Busy stalls usually have fresh food and good taste.</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="bg-gradient-to-r from-green-600 to-green-800 py-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
            Taste the Flavors of Kashi
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto"
             style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
            Join our food walking tour or explore the culinary heritage of Varanasi with local guides
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="bg-white text-green-600 hover:bg-green-50 font-semibold py-3 px-8 rounded-xl transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Food Tour
            </motion.button>
            <motion.button
              className="border-2 border-white text-white hover:bg-white hover:text-green-600 font-semibold py-3 px-8 rounded-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Food Map Guide
            </motion.button>
          </div>
        </div>
      </motion.section>
    </div>
  );
} 