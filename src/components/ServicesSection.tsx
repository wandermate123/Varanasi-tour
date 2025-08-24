'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Star, Clock, Sparkles } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from './Toast';
import { useRouter } from 'next/navigation';
import Reveal from '@/components/Reveal';

export default function ServicesSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addToCart } = useCart();
  const { Toast, showToast } = useToast();
  const router = useRouter();

  const services = [
    {
      id: 'complete-package',
      title: 'COMPLETE PACKAGE',
      description: 'Personalized tours',
      price: 499,
      imagePath: '/images/complete-package.jpg',
      type: 'service',
      duration: '4-6h',
      rating: 4.9,
      featured: true
    },
    {
      id: 'boat-tours',
      title: 'BOAT TOURS',
      description: 'River experience',
      price: 1200,
      imagePath: '/images/WhatsApp Image 2025-06-16 at 20.58.20_15cc56d6.jpg',
      type: 'boat',
      link: '/explore/boats',
      duration: '2-3h',
      rating: 4.8,
      featured: true
    },
    {
      id: 'temple-tours',
      title: 'TEMPLE TOURS',
      description: 'Sacred visits',
      price: 399,
      imagePath: '/images/temple-tours.jpg',
      type: 'service',
      duration: '3-4h',
      rating: 4.7
    },
    {
      id: 'food-walks',
      title: 'FOOD WALKS',
      description: 'Street food',
      price: 349,
      imagePath: '/images/food-walks.jpg',
      type: 'service',
      duration: '2-3h',
      rating: 4.6
    },
    {
      id: 'photography',
      title: 'PHOTOGRAPHY',
      description: 'Photo sessions',
      price: 799,
      imagePath: '/images/photography.jpg',
      type: 'service',
      duration: '1-2h',
      rating: 4.9,
      featured: true
    },
    {
      id: 'accommodation',
      title: 'STAYS',
      description: 'Heritage hotels',
      price: 1299,
      imagePath: '/images/accommodation.jpg',
      type: 'service',
      duration: 'Overnight',
      rating: 4.8
    },
    {
      id: 'transport',
      title: 'TRANSPORT',
      description: 'City transfers',
      price: 199,
      imagePath: '/images/transport.jpg',
      type: 'service',
      duration: 'Flexible',
      rating: 4.5
    },
    {
      id: 'workshops',
      title: 'WORKSHOPS',
      description: 'Cultural learning',
      price: 549,
      imagePath: '/images/workshops.jpg',
      type: 'service',
      duration: '2-4h',
      rating: 4.7
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % (services.length - 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + (services.length - 3)) % (services.length - 3));
  };

  const visibleServices = services.slice(currentSlide, currentSlide + 4);

  const handleAddToCart = (service: any) => {
    if (service.link) {
      router.push(service.link);
      return;
    }
    
    addToCart({
      id: service.id,
      name: service.title,
      price: service.price,
      quantity: 1,
      type: service.type,
      description: service.description,
      image: service.imagePath
    });
    showToast(`${service.title} added to cart!`);
  };

  return (
    <section id="services" className="py-12 bg-gradient-to-br from-slate-50 via-white to-blue-50/20">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        {/* Ultra-Compact Premium Header */}
        <Reveal className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold mb-3 shadow-sm">
            <Sparkles className="w-3 h-3" />
            Premium Experiences
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 tracking-tight">
            Our{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-base text-gray-600 max-w-xl mx-auto">
            Curated experiences for your Varanasi journey
          </p>
        </Reveal>

        {/* Compact Services Carousel */}
        <div className="relative">
          {/* Minimal Navigation */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {currentSlide + 1} / {services.length - 3}
              </span>
            </div>
            <div className="flex gap-2">
              <motion.button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-3 h-3 text-gray-600" />
              </motion.button>
              <motion.button
                onClick={nextSlide}
                disabled={currentSlide >= services.length - 4}
                className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="w-3 h-3 text-gray-600" />
              </motion.button>
            </div>
          </div>

          {/* Ultra-Compact Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {visibleServices.map((service, index) => (
              <Reveal
                key={service.id}
                delay={index * 0.08}
                className="group cursor-pointer"
              >
                {/* Compact Premium Card */}
                <div className={`relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 ${service.featured ? 'ring-2 ring-amber-400/50' : ''}`}>
                  {/* Compact Image Section */}
                  <div className="relative h-36 overflow-hidden">
                    <Image
                      src={service.imagePath}
                      alt={`${service.title} service`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.currentTarget.parentElement;
                        if (target) {
                          target.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                        }
                      }}
                    />
                    
                    {/* Premium Badge */}
                    <div className="absolute top-2 left-2">
                      <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-1.5 py-0.5 rounded-full text-xs font-bold shadow-sm">
                        {service.featured ? 'FEATURED' : 'PREMIUM'}
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="absolute top-2 right-2">
                      <div className="bg-black/80 backdrop-blur-sm text-white px-1.5 py-0.5 rounded-full text-xs font-medium flex items-center gap-0.5">
                        <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                        {service.rating}
                      </div>
                    </div>

                    {/* Subtle Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>

                  {/* Compact Content */}
                  <div className="p-3">
                    {/* Title */}
                    <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Duration & Price Row */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-2.5 h-2.5" />
                        <span>{service.duration}</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-bold text-blue-600">₹{service.price}</span>
                        <span className="text-xs text-gray-400">pp</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <motion.button
                      onClick={() => handleAddToCart(service)}
                      className="w-full py-1.5 px-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-xs font-semibold shadow-sm hover:shadow-md"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {service.link ? 'Explore' : 'Book Now'}
                    </motion.button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Minimal Slide Indicators */}
          <div className="flex justify-center mt-6 gap-1.5">
            {Array.from({ length: services.length - 3 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1 rounded-full transition-all duration-200 ${
                  currentSlide === index 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 w-6' 
                    : 'bg-gray-300 hover:bg-gray-400 w-3'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      {Toast}
    </section>
  );
}