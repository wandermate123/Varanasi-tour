import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaShoppingBag, FaArrowRight } from 'react-icons/fa';

// Slide data
const slides = [
  {
    id: 1,
    image: '/images/shop/slide-textiles.jpg',
    title: 'Traditional Textiles',
    subtitle: 'Woven Stories',
    description: 'Exquisite handwoven Banarasi silks, pashminas, and traditional fabrics that embody centuries of craftsmanship',
    accent: 'amber'
  },
  {
    id: 2,
    image: '/images/shop/slide-pottery.jpg',
    title: 'Artisanal Pottery',
    subtitle: 'Shaped by Time',
    description: 'Hand-crafted ceramics and traditional blue pottery that blend ancient techniques with contemporary design',
    accent: 'orange'
  },
  {
    id: 3,
    image: '/images/shop/slide-jewelry.jpg',
    title: 'Heritage Jewelry',
    subtitle: 'Timeless Elegance',
    description: 'Intricately crafted traditional jewelry pieces that celebrate India\'s rich artistic heritage',
    accent: 'rose'
  },
  {
    id: 4,
    image: '/images/shop/slide-art.jpg',
    title: 'Traditional Art',
    subtitle: 'Living Canvas',
    description: 'Masterful paintings and artwork showcasing ancient art forms like Madhubani, Warli, and Tanjore',
    accent: 'indigo'
  },
  {
    id: 5,
    image: '/images/shop/slide-decor.jpg',
    title: 'Home Décor',
    subtitle: 'Cultural Aesthetics',
    description: 'Beautiful handcrafted items that bring traditional artistry into contemporary living spaces',
    accent: 'emerald'
  },
  {
    id: 6,
    image: '/images/shop/slide-musical.jpg',
    title: 'Musical Instruments',
    subtitle: 'Rhythms of Heritage',
    description: 'Expertly crafted traditional instruments that carry the soul of Indian classical music',
    accent: 'purple'
  },
  {
    id: 7,
    image: '/images/shop/slide-handicrafts.jpg',
    title: 'Traditional Crafts',
    subtitle: 'Artisan Excellence',
    description: 'Unique handicrafts that showcase the diverse artistic traditions of India\'s master craftsmen',
    accent: 'cyan'
  }
];

export default function PremiumShopSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance slides with longer duration
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // Increased to 6 seconds for better viewing

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Handle manual navigation
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000); // Resume autoplay after 8 seconds
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  return (
    <section 
      className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Shopping Section Indicator - Mobile Optimized */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent z-10 py-2 sm:py-3 md:py-4">
        <div className="container max-w-7xl mx-auto px-3 sm:px-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 md:gap-0">
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
            <FaShoppingBag className="text-amber-100/90 text-base sm:text-lg md:text-2xl" />
            <span className="text-amber-50 text-sm sm:text-base md:text-lg font-medium tracking-wide">Artisan Marketplace</span>
          </div>
          <div className="flex items-center gap-1 bg-white/5 backdrop-blur-md rounded-full px-2 sm:px-3 md:px-4 py-1 sm:py-2 text-xs sm:text-sm">
            <span className="text-amber-100/70">Featured Collections</span>
            <span className="text-amber-200/40 mx-1 sm:mx-2">•</span>
            <span className="text-amber-100/70">100+ Artisans</span>
            <span className="text-amber-200/40 mx-1 sm:mx-2">•</span>
            <span className="text-amber-100/70">Premium Quality</span>
          </div>
        </div>
      </div>

      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              fill
              className="object-cover"
              priority
            />
            {/* Enhanced Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
          </div>

          {/* Content Container - Mobile Optimized */}
          <div className="relative h-full container max-w-7xl mx-auto px-3 sm:px-4 flex items-center">
            <div className="max-w-2xl w-full">
              {/* Category Tag - Mobile Optimized */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-3 sm:mb-4 md:mb-6"
              >
                <span className={`inline-block bg-white/5 backdrop-blur-sm text-amber-100/90 px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide`}>
                  Traditional Collection
                </span>
              </motion.div>

              {/* Decorative Line */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 100 }}
                transition={{ duration: 0.8 }}
                className="h-0.5 sm:h-1 bg-amber-400/30 mb-4 sm:mb-6 md:mb-8"
              />

              {/* Slide Content - Mobile Optimized */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-sm sm:text-base md:text-lg lg:text-xl text-amber-100/80 mb-2 sm:mb-3 md:mb-4 block font-light tracking-wide">
                  {slides[currentSlide].subtitle}
                </span>
                <h2 
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black text-amber-50 mb-3 sm:mb-4 md:mb-6 leading-tight"
                  style={{
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    letterSpacing: '-0.02em'
                  }}
                >
                  {slides[currentSlide].title}
                </h2>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-amber-100/70 mb-6 sm:mb-8 md:mb-12 max-w-xl font-light leading-relaxed">
                  {slides[currentSlide].description}
                </p>
              </motion.div>

              {/* Enhanced Shop Now Button - Mobile Optimized */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col gap-3 sm:gap-4"
              >
                <Link href="/shop" className="inline-block group">
                  <div className="relative">
                    {/* Enhanced Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400/50 to-orange-400/50 rounded-lg sm:rounded-xl md:rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-all duration-500 scale-110 animate-pulse"></div>
                    
                    {/* Main Button - Mobile Optimized */}
                    <button className="relative px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-2.5 sm:py-3 md:py-4 lg:py-5 xl:py-6 bg-gradient-to-r from-amber-400 to-orange-400 text-amber-50 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold rounded-lg sm:rounded-xl md:rounded-2xl transform group-hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl flex items-center gap-2 sm:gap-3 md:gap-4 touch-target">
                      <FaShoppingBag className="text-base sm:text-lg md:text-xl lg:text-2xl" />
                      <span className="hidden sm:inline">Explore Collection</span>
                      <span className="sm:hidden">Shop Now</span>
                      <FaArrowRight className="text-sm sm:text-base md:text-lg lg:text-xl group-hover:translate-x-2 transition-transform duration-300" />
                    </button>
                  </div>
                </Link>
                
                {/* Shopping Benefits - Mobile Optimized */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 mt-2 sm:mt-4">
                  <div className="bg-white/5 backdrop-blur-md rounded-md sm:rounded-lg md:rounded-xl px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-3 flex items-center gap-1.5 sm:gap-2">
                    <span className="text-amber-200/90">✨</span>
                    <span className="text-amber-100/90 text-xs sm:text-sm">Authentic Crafts</span>
                  </div>
                  <div className="bg-white/5 backdrop-blur-md rounded-md sm:rounded-lg md:rounded-xl px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-3 flex items-center gap-1.5 sm:gap-2">
                    <span className="text-amber-200/90">🎁</span>
                    <span className="text-amber-100/90 text-xs sm:text-sm">Secure Shopping</span>
                  </div>
                  <div className="bg-white/5 backdrop-blur-md rounded-md sm:rounded-lg md:rounded-xl px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-3 flex items-center gap-1.5 sm:gap-2">
                    <span className="text-amber-200/90">📦</span>
                    <span className="text-amber-100/90 text-xs sm:text-sm">Global Shipping</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows - Mobile Optimized */}
      <button 
        onClick={prevSlide}
        className="absolute left-1 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300 flex items-center justify-center text-amber-100/90 text-base sm:text-lg md:text-xl touch-target"
        aria-label="Previous slide"
      >
        ←
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300 flex items-center justify-center text-amber-100/90 text-base sm:text-lg md:text-xl touch-target"
        aria-label="Next slide"
      >
        →
      </button>

      {/* Slide Navigation - Mobile Optimized */}
      <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 md:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-6 sm:w-8 md:w-10 lg:w-12 h-1 rounded-full transition-all duration-300 touch-target ${
              currentSlide === index 
                ? 'bg-amber-100/90' 
                : 'bg-white/20 hover:bg-white/30'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter - Mobile Optimized */}
      <div className="absolute top-12 sm:top-16 md:top-20 lg:top-8 right-2 sm:right-3 md:right-4 lg:right-6 xl:right-8 bg-white/5 backdrop-blur-md rounded-full px-2 sm:px-3 md:px-4 py-1 sm:py-2 text-amber-100/90 font-medium text-xs sm:text-sm">
        <span className="text-amber-100/70">0{currentSlide + 1}</span>
        <span className="mx-1 sm:mx-2 text-amber-200/40">/</span>
        <span className="text-amber-100/70">0{slides.length}</span>
      </div>
    </section>
  );
} 