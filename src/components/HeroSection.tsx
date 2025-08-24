'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface SlideItem {
  id: string;
  title: string;
  description: string;
  image: string;
  price?: string;
  link: string;
}

export default function HeroSection() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Premium experience slides
  const slideshowItems: SlideItem[] = [
    {
      id: 'ganga-aarti',
      title: 'Evening Ganga Aarti',
      description: 'Experience the mesmerizing sacred fire ceremony with hundreds of oil lamps and traditional chants at the most famous ghat of Varanasi',
      image: '/images/hero.jpg',
      price: '₹2,999',
      link: '/explore/events'
    },
    {
      id: 'sunrise-boats',
      title: 'Sunrise Boat Rides',
      description: 'Witness the magical sunrise over the sacred Ganges while observing morning prayers and spiritual activities along the ghats',
      image: '/images/hero2.jpg',
      price: '₹1,999',
      link: '/explore/ghats'
    },
    {
      id: 'heritage-walk',
      title: 'Heritage Walking Tour',
      description: 'Explore the ancient streets of Varanasi with expert guides, discovering hidden temples, historical sites, and local culture',
      image: '/images/heritage-walk.jpg',
      price: '₹3,999',
      link: '/explore/ghats'
    },
    {
      id: 'temple-tour',
      title: 'Sacred Temple Experience',
      description: 'Visit the most revered temples of Varanasi including Kashi Vishwanath, with special access and spiritual guidance',
      image: '/images/temples.jpg',
      price: '₹4,999',
      link: '/explore/temples'
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slideshowItems.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slideshowItems.length]);

  const goToSlide = (index: number) => {
    setCurrentSlideIndex(index);
  };

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slideshowItems.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + slideshowItems.length) % slideshowItems.length);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlideIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={slideshowItems[currentSlideIndex].image}
              alt={slideshowItems[currentSlideIndex].title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            Experience Varanasi's
            <br />
            <span className="text-blue-400">Sacred Heritage</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover the spiritual heart of India with our premium cultural experiences, 
            guided by local experts and authentic traditions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Book Your Experience
            </Link>
            <Link
              href="/explore"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              Explore Experiences
            </Link>
          </div>

          {/* Current Experience Info */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-md mx-auto">
            <h3 className="text-xl font-semibold mb-2">
              {slideshowItems[currentSlideIndex].title}
            </h3>
            <p className="text-gray-200 mb-3">
              {slideshowItems[currentSlideIndex].description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-blue-400">
                {slideshowItems[currentSlideIndex].price}
              </span>
              <Link
                href={slideshowItems[currentSlideIndex].link}
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Learn More →
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slideshowItems.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlideIndex
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-md transition-all duration-300"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-md transition-all duration-300"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </motion.div>
      </div>
    </section>
  );
} 