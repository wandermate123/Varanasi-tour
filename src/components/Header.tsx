'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import AuthButton from '@/components/AuthButton';
import { useCart } from '@/contexts/CartContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHoveringTop, setIsHoveringTop] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { state } = useCart();
  
  const { scrollY } = useScroll();

  // Mock search data
  const mockSearchData = [
    { id: 1, title: 'Varanasi Ghats Tour', type: 'Tour', price: '₹399', rating: 4.8 },
    { id: 2, title: 'Temple Walking Experience', type: 'Experience', price: '₹299', rating: 4.9 },
    { id: 3, title: 'Ganga Aarti Ceremony', type: 'Activity', price: '₹199', rating: 4.7 },
    { id: 4, title: 'Banarasi Silk Saree', type: 'Product', price: '₹12,500', rating: 4.6 },
    { id: 5, title: 'Food Walk in Old City', type: 'Tour', price: '₹349', rating: 4.8 },
    { id: 6, title: 'Sunrise Boat Ride', type: 'Activity', price: '₹299', rating: 4.9 },
  ];

  // Track scroll direction and position
  useMotionValueEvent(scrollY, "change", (latest) => {
    const currentScrollY = latest;
    
    if (currentScrollY < 100) {
      setIsHeaderVisible(true);
    } 
    else if (currentScrollY > lastScrollY && currentScrollY > 150) {
      setIsHeaderVisible(false);
    } else if (currentScrollY < lastScrollY) {
      setIsHeaderVisible(true);
    }
    
    setLastScrollY(currentScrollY);
  });

  // Track mouse position for top hover effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setIsHoveringTop(e.clientY < 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const shouldShowHeader = isHeaderVisible || isHoveringTop || isMenuOpen;

  const navigation = [
    { 
      name: 'Explore', 
      href: '#explore',
      dropdown: [
        { name: 'Sacred Temples', href: '#temples' },
        { name: 'Holy Ghats', href: '#ghats' },
        { name: 'Cultural Sites', href: '#culture' },
        { name: 'Food & Markets', href: '#food' }
      ]
    },
    { 
      name: 'Services', 
      href: '#services',
      dropdown: [
        { name: 'Guided Tours', href: '#guided-tours' },
        { name: 'Hotel Booking', href: '/explore/stay' },
        { name: 'Photography', href: '/explore/photography' },
        { name: 'Transportation', href: '#transport' },
        { name: 'Cultural Experiences', href: '#experiences' }
      ]
    },
    {
      name: 'Blog',
      href: '/blog',
      dropdown: [
        { name: 'Travel Stories', href: '/blog?category=Travel' },
        { name: 'Food & Culture', href: '/blog?category=Food' },
        { name: 'Photography', href: '/blog?category=Photography' },
        { name: 'Spirituality', href: '/blog?category=Spirituality' },
        { name: 'Share Your Story', href: '/blog#submit' }
      ]
    }
  ];

  // Enhanced search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 0) {
      setIsSearching(true);
      // Simulate API call delay
      setTimeout(() => {
        const filteredResults = mockSearchData.filter(item => 
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.type.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filteredResults);
        setIsSearching(false);
      }, 300);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Implement actual search navigation here
      setIsSearchOpen(false);
    }
  };

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 safe-area-top"
      initial={{ y: 0 }}
      animate={{ 
        y: shouldShowHeader ? 0 : -100,
        opacity: shouldShowHeader ? 1 : 0
      }}
      transition={{ 
        duration: 0.3, 
        ease: "easeInOut" 
      }}
    >
      <div className="bg-white/80 backdrop-blur-md">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group touch-target">
              <motion.div 
                className="w-9 h-9 sm:w-11 sm:h-11 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-white font-bold text-lg sm:text-xl" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>W</span>
              </motion.div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300" 
                      style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: '700' }}>
                  WanderMate
                </span>
              </div>
            </Link>

            {/* Navigation - Desktop */}
            <nav className="hidden lg:flex items-center">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  className="relative flex items-center"
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center text-gray-700 hover:text-blue-600 font-semibold transition-colors py-2 px-4 rounded-lg hover:bg-gray-100 text-sm xl:text-base touch-target"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: '600' }}
                  >
                    <span>{item.name}</span>
                  </Link>
                  
                  {/* Clear gap between items */}
                  {index < navigation.length - 1 && (
                    <div className="w-16 xl:w-20"></div>
                  )}

                  {/* Dropdown Menu */}
                  {item.dropdown && (
                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
                        >
                          {item.dropdown.map((dropdownItem, dropdownIndex) => (
                            <motion.div
                              key={dropdownItem.name}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.2, delay: dropdownIndex * 0.05 }}
                            >
                              <Link
                                href={dropdownItem.href}
                                className="block px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors font-medium touch-target"
                                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                              >
                                {dropdownItem.name}
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </motion.div>
              ))}
            </nav>

            {/* Right Actions */}
            <motion.div 
              className="flex items-center space-x-3 sm:space-x-4 lg:space-x-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              
              {/* Premium Search */}
              <div className="relative">
                <motion.button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 sm:p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 touch-target"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </motion.button>

                {/* Premium Search Modal */}
                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                    >
                      {/* Search Header */}
                      <div className="p-4 sm:p-6 border-b border-gray-100">
                        <form onSubmit={handleSearchSubmit} className="relative">
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            placeholder="Search destinations, tours, experiences..."
                            className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm placeholder-gray-500 form-input"
                            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                            autoFocus
                          />
                          <svg className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                          {isSearching && (
                            <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                            </div>
                          )}
                        </form>
                      </div>

                      {/* Search Results */}
                      <div className="max-h-80 overflow-y-auto">
                        {searchQuery.length === 0 ? (
                          <div className="p-4 sm:p-6">
                            <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                              Popular Searches
                            </h4>
                            <div className="space-y-2">
                              {['Varanasi Ghats', 'Temple Tours', 'Food Walks', 'Boat Rides'].map((item, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleSearch(item)}
                                  className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors touch-target"
                                  style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                                >
                                  {item}
                                </button>
                              ))}
                            </div>
                          </div>
                        ) : searchResults.length > 0 ? (
                          <div className="p-3 sm:p-4">
                            {searchResults.map((result, index) => (
                              <motion.div
                                key={result.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors touch-target"
                              >
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                                  <span className="text-blue-600 font-semibold text-xs sm:text-sm">{result.type[0]}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h5 className="font-medium text-gray-900 text-xs sm:text-sm truncate" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                                    {result.title}
                                  </h5>
                                  <div className="flex items-center space-x-2 mt-1">
                                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                      {result.type}
                                    </span>
                                    <span className="text-xs text-gray-500">⭐ {result.rating}</span>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-semibold text-blue-600 text-xs sm:text-sm">{result.price}</p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        ) : searchQuery.length > 0 && !isSearching ? (
                          <div className="p-4 sm:p-6 text-center">
                            <p className="text-gray-500 text-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                              No results found for "{searchQuery}"
                            </p>
                          </div>
                        ) : null}
                      </div>

                      {/* Search Footer */}
                      <div className="p-3 sm:p-4 bg-gray-50 border-t border-gray-100">
                        <button 
                          onClick={() => setIsSearchOpen(false)}
                          className="w-full py-2 text-center text-xs sm:text-sm text-gray-500 hover:text-gray-700 transition-colors touch-target"
                          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                        >
                          Press ESC to close
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Shopping Cart - Mobile Optimized */}
              <Link href="/cart">
                <motion.button 
                  className="relative group p-2 sm:p-3 hover:bg-gray-50 rounded-xl transition-all duration-300 touch-target"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    
                    {state.items.length > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 min-w-[16px] sm:min-w-[20px] h-4 sm:h-5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center px-1 sm:px-1.5 shadow-lg border border-white"
                        style={{ 
                          fontFamily: 'Inter, system-ui, sans-serif', 
                          fontSize: '10px',
                          lineHeight: '1'
                        }}
                      >
                        {state.items.length > 99 ? '99+' : state.items.length}
                      </motion.div>
                    )}
                  </div>
                  
                  <div className="text-xs text-gray-500 mt-0.5 font-medium hidden sm:block" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                    Cart
                  </div>
                </motion.button>
              </Link>

              {/* Authentication - Hidden on mobile */}
              <div className="hidden sm:block">
                <AuthButton />
              </div>

              {/* Mobile menu button */}
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors touch-target"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ rotate: isMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </motion.svg>
              </motion.button>
            </motion.div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden border-t border-gray-100 py-4 overflow-hidden"
              >
                <nav className="space-y-2">
                  {navigation.map((item, index) => (
                    <motion.div 
                      key={item.name} 
                      className="space-y-1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center justify-between text-gray-700 hover:text-blue-600 font-semibold py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors text-base touch-target"
                        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span>{item.name}</span>
                      </Link>
                      
                      {item.dropdown && (
                        <div className="pl-4 space-y-1">
                          {item.dropdown.map((dropdownItem, dropdownIndex) => (
                            <motion.div
                              key={dropdownItem.name}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: (index * 0.1) + (dropdownIndex * 0.05) }}
                            >
                              <Link
                                href={dropdownItem.href}
                                className="block text-sm text-gray-500 hover:text-blue-600 py-2 px-2 rounded hover:bg-blue-50 transition-colors font-medium touch-target"
                                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {dropdownItem.name}
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                  
                  <motion.div 
                    className="pt-4 border-t border-gray-100 space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    <div className="flex items-center justify-between px-2">
                      <button className="flex items-center space-x-2 text-gray-600 touch-target">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span className="text-sm font-medium" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Search</span>
                      </button>
                      <Link href="/cart" className="relative text-gray-600 touch-target">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6" />
                        </svg>
                        {state.items.length > 0 && (
                          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold" 
                                style={{ fontSize: '10px' }}>
                            {state.items.length}
                          </span>
                        )}
                      </Link>
                    </div>
                    
                    {/* Blog Button - Mobile */}
                    <div className="px-2">
                      <Link
                        href="/blog"
                        className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                        <span className="text-sm font-medium" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Read Our Blog</span>
                      </Link>
                    </div>
                    
                    {/* Mobile Auth Button */}
                    <div className="px-2">
                      <div className="relative group">
                        <Link
                          href="/auth/signin"
                          className="group inline-flex items-center justify-center w-full gap-2 rounded-full border border-gray-300 bg-white text-gray-900 px-5 py-2.5 text-sm font-medium shadow-sm hover:bg-gray-50 hover:border-gray-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-900/10"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <span>Sign In</span>
                          <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
} 