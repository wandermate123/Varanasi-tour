'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaStar, FaUsers, FaHeart, FaShare, FaTicketAlt, FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa';

export default function EventsPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'rating' | 'popularity'>('date');

  const eventFilters = [
    { id: 'all', name: 'All Events', icon: '🎭', color: 'from-purple-500 to-pink-500' },
    { id: 'festivals', name: 'Festivals', icon: '🎉', color: 'from-orange-500 to-red-500' },
    { id: 'cultural', name: 'Cultural', icon: '🎨', color: 'from-blue-500 to-indigo-500' },
    { id: 'religious', name: 'Religious', icon: '🕉️', color: 'from-yellow-500 to-orange-500' },
    { id: 'sports', name: 'Sports', icon: '⚽', color: 'from-green-500 to-teal-500' },
    { id: 'entertainment', name: 'Entertainment', icon: '🎪', color: 'from-pink-500 to-purple-500' },
    { id: 'educational', name: 'Educational', icon: '📚', color: 'from-indigo-500 to-blue-500' },
    { id: 'food', name: 'Food & Culinary', icon: '🍽️', color: 'from-red-500 to-pink-500' },
    { id: 'art', name: 'Art & Exhibitions', icon: '🖼️', color: 'from-teal-500 to-green-500' },
    { id: 'music', name: 'Music & Dance', icon: '🎵', color: 'from-purple-500 to-indigo-500' },
    { id: 'seasonal', name: 'Seasonal', icon: '🌸', color: 'from-pink-500 to-rose-500' }
  ];

  const events = [
    {
      id: 'dev-diwali',
      name: 'Dev Diwali',
      category: 'festivals',
      description: 'The festival of lights celebrated 15 days after Diwali. All ghats are illuminated with millions of earthen lamps.',
      date: 'November (Kartik Purnima)',
      duration: '1 day (evening celebrations)',
      location: 'All Ghats, especially Dashashwamedh',
      highlights: ['Million earthen lamps', 'Ganga Aarti spectacle', 'Cultural programs', 'Fireworks display'],
      activities: ['Lamp lighting', 'Boat rides', 'Photography', 'Cultural performances', 'Special aarti'],
      cost: 'Free viewing, Boat rides: ₹500-1500',
      tips: ['Book accommodation early', 'Arrive by 5 PM', 'Bring camera', 'Wear comfortable shoes'],
      significance: 'Celebrates victory of gods over demons',
      image: '/images/events.jpg',
      rating: 4.9,
      popularity: 95,
      featured: true,
      realTimeInfo: {
        crowdLevel: 'Very High',
        weatherImpact: 'None',
        liveUpdates: true,
        currentStatus: 'Upcoming',
        bookingStatus: 'Open'
      }
    },
    {
      id: 'ganga-mahotsav',
      name: 'Ganga Mahotsav',
      category: 'cultural',
      description: 'Five-day cultural festival celebrating classical music, dance, and arts on the ghats of Varanasi.',
      date: 'November (5 days)',
      duration: '5 days',
      location: 'Various Ghats',
      highlights: ['Classical music concerts', 'Dance performances', 'Art exhibitions', 'Craft demonstrations'],
      activities: ['Concert attendance', 'Art workshops', 'Cultural tours', 'Craft shopping', 'Food festivals'],
      cost: 'Free entry to most events',
      tips: ['Check schedule online', 'Book early for popular shows', 'Explore different ghats', 'Try local crafts'],
      significance: 'Celebrates Ganga and cultural heritage',
      image: '/images/hero3.jpg',
      rating: 4.7,
      popularity: 88,
      featured: true,
      realTimeInfo: {
        crowdLevel: 'High',
        weatherImpact: 'None',
        liveUpdates: true,
        currentStatus: 'Upcoming',
        bookingStatus: 'Open'
      }
    },
    {
      id: 'varanasi-marathon',
      name: 'Varanasi Heritage Marathon',
      category: 'sports',
      description: 'Annual marathon through the historic streets of Varanasi, showcasing the city\'s heritage.',
      date: 'February',
      duration: '1 day',
      location: 'City-wide route',
      highlights: ['Heritage route', 'International participants', 'Cultural performances', 'Health awareness'],
      activities: ['Marathon participation', 'Cultural shows', 'Health camps', 'Food stalls'],
      cost: '₹1000-2000 registration',
      tips: ['Register early', 'Train properly', 'Stay hydrated', 'Follow route map'],
      significance: 'Promotes health and heritage',
      image: '/images/hero1.jpg',
      rating: 4.8,
      popularity: 92,
      featured: false,
      realTimeInfo: {
        crowdLevel: 'High',
        weatherImpact: 'Weather dependent',
        liveUpdates: true,
        currentStatus: 'Upcoming',
        bookingStatus: 'Open'
      }
    },
    {
      id: 'food-festival',
      name: 'Banarasi Food Festival',
      category: 'food',
      description: 'Celebration of Varanasi\'s rich culinary heritage with traditional and modern dishes.',
      date: 'December',
      duration: '3 days',
      location: 'Various venues',
      highlights: ['Traditional dishes', 'Cooking workshops', 'Food competitions', 'Cultural performances'],
      activities: ['Food tasting', 'Cooking classes', 'Cultural shows', 'Market tours'],
      cost: 'Entry: ₹200, Food: Pay as you eat',
      tips: ['Come hungry', 'Try local specialties', 'Book workshops early', 'Bring cash'],
      significance: 'Celebrates local cuisine',
      image: '/images/food.jpg',
      rating: 4.6,
      popularity: 85,
      featured: false,
      realTimeInfo: {
        crowdLevel: 'Moderate',
        weatherImpact: 'None',
        liveUpdates: true,
        currentStatus: 'Upcoming',
        bookingStatus: 'Open'
      }
    },
    {
      id: 'art-exhibition',
      name: 'Contemporary Art Exhibition',
      category: 'art',
      description: 'Showcasing modern and traditional art from local and national artists.',
      date: 'Monthly',
      duration: '2 weeks',
      location: 'Art Gallery, Assi Ghat',
      highlights: ['Modern art', 'Traditional crafts', 'Artist interactions', 'Workshops'],
      activities: ['Gallery tour', 'Art workshops', 'Artist meet', 'Shopping'],
      cost: 'Free entry, Workshops: ₹500-1000',
      tips: ['Check schedule', 'Book workshops', 'Photography allowed', 'Support local artists'],
      significance: 'Promotes local art scene',
      image: '/images/photography.jpg',
      rating: 4.5,
      popularity: 78,
      featured: false,
      realTimeInfo: {
        crowdLevel: 'Low-Moderate',
        weatherImpact: 'None',
        liveUpdates: true,
        currentStatus: 'Ongoing',
        bookingStatus: 'Open'
      }
    },
    {
      id: 'mahashivratri',
      name: 'Mahashivratri',
      category: 'religious',
      description: 'Greatest festival dedicated to Lord Shiva. Kashi Vishwanath temple sees millions of devotees.',
      date: 'February/March (Phalguna month)',
      duration: '1 day and night',
      location: 'Kashi Vishwanath Temple and all Shiva temples',
      highlights: ['24-hour temple access', 'Continuous chanting', 'Special rituals', 'Massive crowds'],
      activities: ['Temple visits', 'Night-long prayers', 'Sacred offerings', 'Religious processions'],
      cost: 'Free temple entry, Offerings optional',
      tips: ['Expect huge crowds', 'Start early morning', 'Carry water and snacks', 'Dress appropriately'],
      significance: 'Most auspicious day for Lord Shiva worship',
      image: '/images/temples.jpg',
      rating: 4.8,
      popularity: 96,
      featured: true
    },
    {
      id: 'ramlila',
      name: 'Ramlila Festival',
      category: 'cultural',
      description: 'Traditional theatrical performance depicting the life of Lord Rama. UNESCO recognized cultural event.',
      date: 'September/October (10 days before Dussehra)',
      duration: '10 days',
      location: 'Ramnagar Fort and various venues',
      highlights: ['UNESCO heritage event', 'Traditional performances', 'Royal patronage', 'Authentic costumes'],
      activities: ['Performance watching', 'Cultural tours', 'Traditional crafts', 'Local food tasting'],
      cost: 'Free entry, VIP seating: ₹200-500',
      tips: ['Book VIP seats for comfort', 'Learn story beforehand', 'Arrive early for good spots', 'Respect traditions'],
      significance: 'Preserves ancient storytelling traditions',
      image: '/images/heritage-walk.jpg',
      rating: 4.6,
      popularity: 82,
      featured: false
    },
    {
      id: 'holi',
      name: 'Holi Festival',
      category: 'festivals',
      description: 'Festival of colors celebrated with great enthusiasm. Varanasi offers unique Holi experiences.',
      date: 'March (Holi Purnima)',
      duration: '2 days',
      location: 'Throughout the city, special at Banke Bihari Temple',
      highlights: ['Colors and water play', 'Traditional thandai', 'Music and dance', 'Community celebrations'],
      activities: ['Color playing', 'Thandai drinking', 'Music celebrations', 'Photography', 'Cultural programs'],
      cost: 'Free participation, Colors: ₹50-200',
      tips: ['Wear old clothes', 'Use herbal colors', 'Protect camera equipment', 'Stay hydrated'],
      significance: 'Celebrates victory of good over evil',
      image: '/images/hero2.jpg',
      rating: 4.8,
      popularity: 94,
      featured: true
    },
    {
      id: 'dussehra',
      name: 'Dussehra Celebration',
      category: 'religious',
      description: 'Celebration of victory of good over evil. Features Ravana effigy burning and cultural programs.',
      date: 'September/October',
      duration: '1 day',
      location: 'Various venues across city',
      highlights: ['Ravana effigy burning', 'Cultural performances', 'Fireworks', 'Community gatherings'],
      activities: ['Effigy burning ceremony', 'Cultural shows', 'Food stalls', 'Fireworks viewing'],
      cost: 'Free entry to most venues',
      tips: ['Arrive early for good viewing', 'Be careful during fireworks', 'Try festival food', 'Bring family'],
      significance: 'Celebrates Lord Rama\'s victory over Ravana',
      image: '/images/hero4.jpg',
      rating: 4.5,
      popularity: 80,
      featured: false
    },
    {
      id: 'sarnath-festival',
      name: 'Buddha Purnima at Sarnath',
      category: 'religious',
      description: 'Buddhist festival celebrating Buddha\'s birth, enlightenment, and death. Sarnath becomes pilgrimage center.',
      date: 'May (Buddha Purnima)',
      duration: '1 day',
      location: 'Sarnath (12 km from Varanasi)',
      highlights: ['Buddhist prayers', 'International pilgrims', 'Peace ceremonies', 'Cultural programs'],
      activities: ['Temple visits', 'Meditation sessions', 'Cultural programs', 'Museum tours'],
      cost: 'Free entry, Museum: ₹25',
      tips: ['Visit early morning', 'Respect Buddhist customs', 'Explore museum', 'Peaceful atmosphere'],
      significance: 'Where Buddha gave his first sermon',
      image: '/images/hero5.jpg',
      rating: 4.7,
      popularity: 87,
      featured: false
    },
    {
      id: 'classical-music',
      name: 'Classical Music Concerts',
      category: 'cultural',
      description: 'Regular classical music and dance performances by renowned artists at various cultural venues.',
      date: 'Throughout the year',
      duration: 'Various (2-3 hours typically)',
      location: 'Cultural centers, hotels, ghats',
      highlights: ['Renowned artists', 'Classical traditions', 'Intimate venues', 'Cultural heritage'],
      activities: ['Concert attendance', 'Meet artists', 'Learn about ragas', 'Cultural appreciation'],
      cost: '₹200-2000 depending on venue and artist',
      tips: ['Check cultural center schedules', 'Book advance tickets', 'Learn about Indian classical music', 'Respect performance etiquette'],
      significance: 'Preserves classical music traditions',
      image: '/images/ai-guide.jpg',
      rating: 4.6,
      popularity: 75,
      featured: false
    }
  ];

  // Filter and sort events
  const filteredEvents = events
    .filter(event => {
      const matchesFilter = selectedFilter === 'all' || event.category === selectedFilter;
      const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'popularity':
          return b.popularity - a.popularity;
        default:
          return 0; // Keep original order for date
      }
    });

  const featuredEvents = events.filter(event => event.featured);
  const ongoingEvents = events.filter(event => event.realTimeInfo?.currentStatus === 'Ongoing');

  const toggleFavorite = (eventId: string) => {
    setFavorites(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  const shareEvent = (event: any) => {
    const text = `Check out ${event.name} in Varanasi! ${event.description}`;
    const url = window.location.href;
    
    if (navigator.share) {
      navigator.share({
        title: event.name,
        text: text,
        url: url
      });
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(`${text}\n${url}`);
      alert('Event details copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Navigation */}
      <div className="container max-w-7xl mx-auto px-6 py-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-purple-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/#explore" className="hover:text-purple-600 transition-colors">Explore</Link>
            <span>/</span>
            <span className="text-purple-600 font-medium">Events</span>
          </div>
          <motion.button
            onClick={() => window.open('https://wa.me/919876543210?text=Hi,%20I%20want%20to%20list%20my%20event%20in%20Varanasi', '_blank')}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaWhatsapp className="w-5 h-5" />
            <span className="font-semibold">List Your Event</span>
          </motion.button>
        </nav>
      </div>

      {/* Hero Section */}
      <motion.section 
        className="relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-pink-900/80 to-purple-900/80 z-10"></div>
        <Image
          src="/images/events.jpg"
          alt="Varanasi Events"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 container max-w-7xl mx-auto px-6 py-24 text-center">
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 tracking-tight leading-none text-white"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontFamily: 'Georgia, "Times New Roman", serif', letterSpacing: '-0.02em' }}
          >
            Varanasi Events
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-purple-100 max-w-4xl mx-auto font-light leading-relaxed mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            Discover the vibrant tapestry of cultural, spiritual, and entertainment events that make Varanasi truly magical.
          </motion.p>
          
          {/* Search Bar */}
          <motion.div 
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 bg-white/90 backdrop-blur-sm rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:bg-white transition-all duration-300 shadow-xl"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Events Section */}
      {featuredEvents.length > 0 && (
        <motion.section 
          className="container max-w-7xl mx-auto px-6 py-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
              Featured Events
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Don't miss these spectacular events that showcase the best of Varanasi's culture and heritage
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 border border-gray-100"
              >
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  {/* Featured Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold rounded-full shadow-lg">
                      ⭐ Featured
                    </span>
                  </div>
                  
                  {/* Rating */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full flex items-center space-x-1 shadow-lg">
                      <FaStar className="text-yellow-500 w-4 h-4" />
                      <span className="text-sm font-bold text-gray-900">{event.rating}</span>
                    </div>
                  </div>
                  
                  {/* Event Info */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white mb-2"
                        style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                      {event.name}
                    </h3>
                    <div className="flex items-center space-x-4 text-white/90 text-sm">
                      <div className="flex items-center space-x-1">
                        <FaCalendarAlt className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaMapMarkerAlt className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-purple-100 text-purple-600 text-xs rounded-full font-medium capitalize">
                      {event.category}
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleFavorite(event.id)}
                        className={`p-2 rounded-full transition-all duration-300 ${
                          favorites.includes(event.id)
                            ? 'bg-red-100 text-red-500'
                            : 'bg-gray-100 text-gray-400 hover:bg-red-100 hover:text-red-500'
                        }`}
                      >
                        <FaHeart className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => shareEvent(event)}
                        className="p-2 bg-gray-100 text-gray-400 hover:bg-blue-100 hover:text-blue-500 rounded-full transition-all duration-300"
                      >
                        <FaShare className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <motion.button
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaTicketAlt className="w-4 h-4" />
                    <span>View Details</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Live Events Section */}
      {ongoingEvents.length > 0 && (
        <motion.section 
          className="container max-w-7xl mx-auto px-6 py-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-100 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Happening Now</h2>
                <p className="text-gray-600">Live events and activities in Varanasi</p>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Live Updates
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ongoingEvents.map((event, index) => (
                <motion.div 
                  key={event.id} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 border border-green-200 hover:shadow-lg transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900 text-lg">{event.name}</h3>
                    <span className="px-3 py-1 bg-green-100 text-green-600 text-xs rounded-full font-medium">
                      Live
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{event.location}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <FaUsers className="text-gray-400 w-4 h-4" />
                      <span className="text-gray-500">Crowd:</span>
                      <span className="font-medium text-gray-900">{event.realTimeInfo?.crowdLevel || 'Not Available'}</span>
                    </div>
                    <button className="text-green-600 font-medium hover:text-green-700 transition-colors">
                      View Details →
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* Filter and Sort Section */}
      <motion.section 
        className="container max-w-7xl mx-auto px-6 py-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              {eventFilters.map((filter) => (
                <motion.button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    selectedFilter === filter.id
                      ? `bg-gradient-to-r ${filter.color} text-white shadow-lg`
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-lg">{filter.icon}</span>
                  <span>{filter.name}</span>
                </motion.button>
              ))}
            </div>
            
            {/* Sort */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'rating' | 'popularity')}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl border-0 focus:ring-2 focus:ring-purple-300 focus:outline-none transition-all duration-300"
              >
                <option value="date">Date</option>
                <option value="rating">Rating</option>
                <option value="popularity">Popularity</option>
              </select>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Events Grid */}
      <motion.section 
        className="container max-w-7xl mx-auto px-6 py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                  {/* Rating */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1 shadow-lg">
                      <FaStar className="text-yellow-500 w-4 h-4" />
                      <span className="text-sm font-bold text-gray-900">{event.rating}</span>
                    </div>
                  </div>
                  
                  {/* Popularity */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-900 shadow-lg">
                      {event.popularity}% Popular
                    </div>
                  </div>
                  
                  {/* Event Info */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-2"
                        style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                      {event.name}
                    </h3>
                    <div className="flex items-center space-x-4 text-white/90 text-sm">
                      <div className="flex items-center space-x-1">
                        <FaCalendarAlt className="w-3 h-3" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaClock className="w-3 h-3" />
                        <span>{event.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-purple-100 text-purple-600 text-xs rounded-full font-medium capitalize">
                      {event.category}
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleFavorite(event.id)}
                        className={`p-2 rounded-full transition-all duration-300 ${
                          favorites.includes(event.id)
                            ? 'bg-red-100 text-red-500'
                            : 'bg-gray-100 text-gray-400 hover:bg-red-100 hover:text-red-500'
                        }`}
                      >
                        <FaHeart className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => shareEvent(event)}
                        className="p-2 bg-gray-100 text-gray-400 hover:bg-blue-100 hover:text-blue-500 rounded-full transition-all duration-300"
                      >
                        <FaShare className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {event.highlights.slice(0, 3).map((highlight, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-md border border-gray-100">
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-900">Cost:</span>
                      <p className="text-gray-600">{event.cost}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Location:</span>
                      <p className="text-gray-600">{event.location}</p>
                    </div>
                  </div>

                  <motion.button
                    onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaTicketAlt className="w-4 h-4" />
                    <span>{selectedEvent === event.id ? 'Hide Details' : 'View Details'}</span>
                  </motion.button>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {selectedEvent === event.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 pt-6 border-t border-gray-200"
                      >
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Cultural Significance</h4>
                            <p className="text-gray-600 text-sm">{event.significance}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Activities</h4>
                            <div className="grid grid-cols-2 gap-2">
                              {event.activities.map((activity, idx) => (
                                <span key={idx} className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-md text-center border border-purple-100">
                                  {activity}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Visitor Tips</h4>
                            <ul className="text-gray-600 text-sm space-y-1">
                              {event.tips.map((tip, idx) => (
                                <li key={idx} className="flex items-start">
                                  <span className="text-purple-600 mr-2">•</span>
                                  {tip}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {event.realTimeInfo?.weatherImpact && event.realTimeInfo.weatherImpact !== 'None' && (
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Weather Impact</h4>
                              <p className="text-gray-600 text-sm">{event.realTimeInfo.weatherImpact}</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="bg-gradient-to-r from-purple-600 to-pink-600 py-20 rounded-3xl mx-6 mb-16 shadow-2xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
            Experience Varanasi's Cultural Splendor
          </h2>
          <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto"
             style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
            Join our cultural tours or get personalized event recommendations for your visit
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="bg-white text-purple-600 hover:bg-purple-50 font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaTicketAlt className="w-5 h-5" />
              <span>Book Cultural Tour</span>
            </motion.button>
            <motion.button
              onClick={() => window.open('https://wa.me/919876543210?text=Hi,%20I%20want%20to%20list%20my%20event%20in%20Varanasi', '_blank')}
              className="border-2 border-white text-white hover:bg-white hover:text-purple-600 font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaWhatsapp className="w-5 h-5" />
              <span>List Your Event</span>
            </motion.button>
          </div>
        </div>
      </motion.section>
    </div>
  );
} 