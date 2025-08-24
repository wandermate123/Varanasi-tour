'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { searchAll, getSearchSuggestions, getQuickSearchCategories, performVoiceSearch, getTypeIcon } from '@/lib/searchService';
import { SearchResult } from '@/lib/searchService';
import SearchResults from '@/components/SearchResults';

interface SlideItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'event' | 'product' | 'service';
  status?: 'live' | 'upcoming' | 'ongoing';
  price?: string;
  location?: string;
  time?: string;
  link: string;
}

export default function HeroSection() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isVoiceSearching, setIsVoiceSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState('search-all');
  const searchRef = useRef<HTMLDivElement>(null);

  // Category navigation data
  const categories = [
    { id: 'search-all', name: 'Search All', icon: '🔍', query: '', description: 'Explore everything' },
    { id: 'temples', name: 'Temples', icon: '🕉️', query: 'temples', description: 'Sacred sites' },
    { id: 'ghats', name: 'Ghats', icon: '🏛️', query: 'ghats', description: 'Riverfront steps' },
    { id: 'experiences', name: 'Experiences', icon: '✨', query: 'experiences', description: 'Cultural activities' },
    { id: 'food', name: 'Food & Dining', icon: '🍽️', query: 'food', description: 'Local cuisine' },
    { id: 'shopping', name: 'Shopping', icon: '🛍️', query: 'shopping', description: 'Artisan products' }
  ];

  // Combined slideshow data - events, products, and services
  const slideshowItems: SlideItem[] = [
    // Live Events
    {
      id: 'ganga-aarti',
      title: 'Evening Ganga Aarti',
      description: 'Experience the mesmerizing sacred fire ceremony with hundreds of oil lamps and traditional chants at the most famous ghat of Varanasi',
      image: '/images/hero.jpg',
      category: 'event',
      status: 'live',
      location: 'Dashashwamedh Ghat',
      time: '6:45 PM - 7:30 PM',
      link: '/explore/events'
    },
    {
      id: 'sunrise-boats',
      title: 'Sunrise Boat Rides',
      description: 'Witness the magical sunrise over the sacred Ganges while observing morning prayers and spiritual activities along the ghats',
      image: '/images/hero2.jpg',
      category: 'service',
      status: 'ongoing',
      location: 'Multiple Ghats',
      time: '5:30 AM - 8:00 AM',
      price: '₹300-500',
      link: '/explore/ghats'
    },
    // Products
    {
      id: 'banarasi-silk',
      title: 'Banarasi Silk Saree',
      description: 'Exquisite handwoven pure silk saree with intricate zari work, crafted by master weavers using traditional techniques passed down through generations',
      image: '/images/shop/slide-art.jpg',
      category: 'product',
      price: '₹15,999',
      link: '/shop/category/Textiles'
    },
    {
      id: 'brass-lamp',
      title: 'Handcrafted Brass Diya',
      description: 'Beautifully crafted traditional brass oil lamp perfect for prayers and spiritual ceremonies, made by skilled artisans',
      image: '/images/shop/slide-decor.jpg',
      category: 'product',
      price: '₹850',
      link: '/shop/category/Home Decor'
    },
    // Services
    {
      id: 'heritage-walk',
      title: 'Heritage Walking Tour',
      description: 'Explore the ancient streets of Varanasi with expert guides, discovering hidden temples, historical sites, and local culture',
      image: '/images/heritage-walk.jpg',
      category: 'service',
      price: '₹299',
      link: '/explore/ghats'
    },
    {
      id: 'temple-tour',
      title: 'Sacred Temple Tour',
      description: 'Visit the revered Kashi Vishwanath Temple and other sacred temples with detailed explanations of their spiritual significance',
      image: '/images/temple-tours.jpg',
      category: 'service',
      price: '₹399',
      link: '/explore/temples'
    },
    // More Events
    {
      id: 'classical-music',
      title: 'Classical Music Concert',
      description: 'Immerse yourself in the soul-stirring melodies of traditional Indian classical music performed by renowned artists',
      image: '/images/hero3.jpg',
      category: 'event',
      status: 'upcoming',
      location: 'Sankat Mochan Temple',
      time: '7:00 PM - 9:00 PM',
      link: '/explore/events'
    },
    {
      id: 'food-walk',
      title: 'Street Food Walk',
      description: 'Embark on a culinary journey through Varanasi\'s famous street food, tasting authentic Banarasi delicacies and local flavors',
      image: '/images/food-walks.jpg',
      category: 'service',
      price: '₹349',
      link: '/explore/food'
    },
    // More Products
    {
      id: 'silver-jewelry',
      title: 'Traditional Silver Necklace',
      description: 'Elegant handcrafted silver jewelry featuring traditional motifs and designs, perfect for special occasions and spiritual ceremonies',
      image: '/images/shop/slide-jewelry.jpg',
      category: 'product',
      price: '₹4,999',
      link: '/shop/category/Jewelry'
    },
    {
      id: 'musical-instrument',
      title: 'Traditional Tabla Set',
      description: 'Professional quality handcrafted wooden tabla set, essential for classical music performances and spiritual ceremonies',
      image: '/images/shop/slide-musical.jpg',
      category: 'product',
      price: '₹4,200',
      link: '/shop/category/Musical Instruments'
    }
  ];

  // Auto-advance slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slideshowItems.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [slideshowItems.length]);

  // Handle search suggestions
  useEffect(() => {
    if (searchQuery.length >= 2) {
      const searchSuggestions = getSearchSuggestions(searchQuery);
      setSuggestions(searchSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  // Handle click outside search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slideshowItems.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + slideshowItems.length) % slideshowItems.length);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const results = searchAll(searchQuery);
      setSearchResults(results);
      setShowSearchResults(true);
      setShowSuggestions(false);
    }
  };

  const handleVoiceSearch = async () => {
    try {
      setIsVoiceSearching(true);
      const transcript = await performVoiceSearch();
      setSearchQuery(transcript);
      // Automatically search after voice input
      const results = searchAll(transcript);
      setSearchResults(results);
      setShowSearchResults(true);
    } catch (error) {
      console.error('Voice search error:', error);
      // You could show a toast notification here
    } finally {
      setIsVoiceSearching(false);
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    if (suggestion.link) {
      window.location.href = suggestion.link;
    } else {
      setSearchQuery(suggestion.title);
      const results = searchAll(suggestion.title);
      setSearchResults(results);
      setShowSearchResults(true);
      setShowSuggestions(false);
    }
  };

  const handleCategoryClick = (category: any) => {
    setActiveCategory(category.id);
    if (category.query) {
      setSearchQuery(category.query);
      const results = searchAll(category.query);
      setSearchResults(results);
      setShowSearchResults(true);
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'live':
        return 'bg-red-500 text-white';
      case 'ongoing':
        return 'bg-green-500 text-white';
      case 'upcoming':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'event':
        return '🎭';
      case 'product':
        return '🛍️';
      case 'service':
        return '🎯';
      default:
        return '📌';
    }
  };

  // Enhanced on-load animation for the hero title
  const titleContainerVariants = {
    hidden: { opacity: 0, y: -12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delayChildren: 0.15, staggerChildren: 0.05, ease: 'easeOut' }
    }
  };
  const titleLetterVariants = {
    hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 520, damping: 32 }
    }
  };
  const discoverLetters = Array.from('DISCOVER');
  const varanasiLetters = Array.from('VARANASI');

    return (
    <section id="home" className="relative min-h-screen bg-white">
      {/* Blank white bar to prevent header overlap */}
      <div className="h-16 sm:h-20 lg:h-24 bg-white"></div>
      
      <div className="container mx-auto px-4 sm:px-6">
        {/* Main Hero Content - Compact & Professional Layout */}
        <div className="flex flex-col items-center space-y-6 lg:space-y-8 pt-8 lg:pt-12">
          
          {/* Centered "Discover Varanasi" Heading */}
          <div className="text-center">
            <motion.h1
              variants={titleContainerVariants}
              initial="hidden"
              animate="visible"
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-gray-900 leading-[0.95] tracking-tight"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              {discoverLetters.map((char, i) => (
                <motion.span key={`d-${i}`} variants={titleLetterVariants} className="inline-block uppercase tracking-[0.18em] text-gray-900/90 font-semibold">
                  {char}
                </motion.span>
              ))}{' '}
              {varanasiLetters.map((char, i) => (
                <motion.span
                  key={`v-${i}`}
                  variants={titleLetterVariants}
                  className="inline-block uppercase bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 bg-clip-text text-transparent font-black tracking-[-0.01em] drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)]"
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
              className="mx-auto mt-4 h-1.5 w-32 rounded-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 origin-left"
            />
          </div>

          {/* Category Navigation Bar - Compact & Aligned */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-4xl"
          >
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => handleCategoryClick(category)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group relative flex items-center gap-2 px-3 py-2 transition-all duration-300 font-medium text-sm sm:text-base ${
                    activeCategory === category.id
                      ? 'text-green-700 border-b-2 border-green-700'
                      : 'text-gray-700 hover:text-green-700 hover:border-b-2 hover:border-green-300'
                  }`}
                >
                  <span className={`text-base sm:text-lg transition-transform duration-300 ${
                    activeCategory === category.id ? 'scale-110' : 'group-hover:scale-110'
                  }`}>
                    {category.icon}
                  </span>
                  <span className="font-semibold">{category.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

                                         {/* Professional Brand Search Bar - Google/Airbnb Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full max-w-3xl mx-auto"
            ref={searchRef}
          >
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                {/* Minimal Search Container */}
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur border border-gray-200 rounded-xl px-3 py-2 shadow-sm focus-within:border-gray-400 transition-colors">
                  {/* Search Icon */}
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>

                  {/* Search Input */}
                  <input
                    type="text"
                    placeholder="Search temples, ghats, experiences, food, shopping..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent text-sm sm:text-base text-gray-900 placeholder-gray-500 focus:outline-none py-1.5 px-1"
                    style={{ fontFamily: 'var(--font-source), system-ui, sans-serif' }}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    aria-label="Search"
                  />

                  {/* Voice Search (icon-only, compact) */}
                  <motion.button
                    type="button"
                    className="p-1.5 rounded-md hover:bg-gray-100 text-gray-600 disabled:opacity-50"
                    onClick={handleVoiceSearch}
                    title="Voice search"
                    aria-label="Voice search"
                    disabled={isVoiceSearching}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isVoiceSearching ? (
                      <div className="w-5 h-5 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15a3 3 0 01-3-3V6a3 3 0 116 0v6a3 3 0 01-3 3zm0 0v4m0 0H9m3 0h3" />
                      </svg>
                    )}
                  </motion.button>

                  {/* Submit (icon-only, compact) */}
                  <motion.button
                    type="submit"
                    aria-label="Search"
                    className="inline-flex items-center justify-center rounded-md bg-green-600 hover:bg-green-700 text-white w-8 h-8"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </div>
                
                 {/* Minimal Search Suggestions Dropdown */}
                 {showSuggestions && searchQuery.length > 0 && (
                   <motion.div
                     initial={{ opacity: 0, y: -6, scale: 0.98 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     exit={{ opacity: 0, y: -6, scale: 0.98 }}
                     className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur border border-slate-200 rounded-lg shadow-md z-50 max-h-80 overflow-y-auto"
                   >
                     <div className="py-1">
                       {getSearchSuggestions(searchQuery).map((suggestion, index) => (
                         <motion.button
                           key={index}
                           onClick={() => handleSuggestionClick(suggestion)}
                           className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-b-0 text-left"
                           whileHover={{ x: 2 }}
                           whileTap={{ scale: 0.995 }}
                         >
                           <div className="w-8 h-8 bg-slate-800 text-white rounded-md flex items-center justify-center text-base">
                             {getTypeIcon(suggestion.type)}
                           </div>
                           <div className="text-left flex-1">
                             <div className="font-medium text-slate-800 text-sm sm:text-base">{suggestion.title}</div>
                             <div className="text-xs text-slate-500 mt-0.5">{suggestion.category}</div>
                           </div>
                           <div className="opacity-60">
                             <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                             </svg>
                           </div>
                         </motion.button>
                       ))}
                     </div>
                   </motion.div>
                 )}
              </div>
            </form>
          </motion.div>

                     {/* Slideshow Section */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.6 }}
             className="w-full max-w-5xl"
           >
             <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-100 via-slate-50 to-white border border-slate-200/50">
              
              {/* Slideshow */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlideIndex}
                  initial={{ opacity: 0, x: 100, scale: 1.05 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -100, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image 
                    src={slideshowItems[currentSlideIndex].image} 
                    alt={slideshowItems[currentSlideIndex].title} 
                    fill 
                    className="object-cover"
                    priority
                  />
                  
                  {/* Overlay with content */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                    {/* Status Badge */}
                    {slideshowItems[currentSlideIndex].status && (
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl">{getCategoryIcon(slideshowItems[currentSlideIndex].category)}</span>
                        <span className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(slideshowItems[currentSlideIndex].status)}`}>
                          {slideshowItems[currentSlideIndex].status === 'live' ? '🔴 LIVE NOW' : 
                           slideshowItems[currentSlideIndex].status === 'ongoing' ? '🟢 ONGOING' : 
                           slideshowItems[currentSlideIndex].status === 'upcoming' ? '🔵 UPCOMING' : 'SCHEDULED'}
                        </span>
                      </div>
                    )}
                    
                    {/* Main Title */}
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
                      {slideshowItems[currentSlideIndex].title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-lg sm:text-xl text-white/90 mb-6 leading-relaxed max-w-2xl" style={{ fontFamily: 'var(--font-source), system-ui, sans-serif' }}>
                      {slideshowItems[currentSlideIndex].description}
                    </p>
                    
                    {/* Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      {slideshowItems[currentSlideIndex].location && (
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <div>
                            <div className="text-sm text-white/70 font-medium">Location</div>
                            <div className="font-semibold">{slideshowItems[currentSlideIndex].location}</div>
                          </div>
                        </div>
                      )}
                      
                      {slideshowItems[currentSlideIndex].time && (
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <div className="text-sm text-white/70 font-medium">Timing</div>
                            <div className="font-semibold">{slideshowItems[currentSlideIndex].time}</div>
                          </div>
                        </div>
                      )}
                      
                      {slideshowItems[currentSlideIndex].price && (
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                          </div>
                          <div>
                            <div className="text-sm text-white/70 font-medium">Price</div>
                            <div className="font-bold text-yellow-300">{slideshowItems[currentSlideIndex].price}</div>
                          </div>
                        </div>
                      )}
                      
                      {slideshowItems[currentSlideIndex].category && (
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                            <span className="text-lg">{getCategoryIcon(slideshowItems[currentSlideIndex].category)}</span>
                          </div>
                          <div>
                            <div className="text-sm text-white/70 font-medium">Category</div>
                            <div className="font-semibold capitalize">
                              {slideshowItems[currentSlideIndex].category === 'event' ? 'Event' : 
                               slideshowItems[currentSlideIndex].category === 'product' ? 'Product' : 'Service'}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Action Button */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-sm text-white/80 font-medium">
                          {slideshowItems[currentSlideIndex].status === 'live' ? 'Happening Now' : 
                           slideshowItems[currentSlideIndex].status === 'ongoing' ? 'Available Now' : 
                           slideshowItems[currentSlideIndex].status === 'upcoming' ? 'Coming Soon' : 'Available'}
                        </span>
                      </div>
                      
                      <Link 
                        href={slideshowItems[currentSlideIndex].link}
                        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 border border-white/30 text-white px-8 py-4 rounded-lg hover:scale-105 transition-all duration-200 text-lg font-semibold shadow-lg hover:shadow-xl flex items-center gap-3"
                      >
                        <span>Explore</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
                <button
                  onClick={prevSlide}
                  className="pointer-events-auto w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 shadow-lg hover:scale-110"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="pointer-events-auto w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 shadow-lg hover:scale-110"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Slide Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {slideshowItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlideIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlideIndex 
                        ? 'bg-white scale-125' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 right-4">
                <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 text-white text-sm font-medium">
                  {slideshowItems[currentSlideIndex].category === 'event' ? 'Events' : 
                   slideshowItems[currentSlideIndex].category === 'product' ? 'Products' : 'Services'}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Search Results Modal */}
      <AnimatePresence>
        {showSearchResults && (
          <SearchResults
            results={searchResults}
            query={searchQuery}
            onClose={() => setShowSearchResults(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
} 