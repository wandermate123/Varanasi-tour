'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function ExploreSection() {
  const interests = [
    {
      id: 'ghats',
      title: 'GHATS',
      href: '/explore/ghats',
      imagePath: '/images/ghats.jpg',
      textShadow: 'drop-shadow(4px 4px 8px rgba(0,0,0,1)) drop-shadow(2px 2px 4px rgba(0,0,0,1)) drop-shadow(0px 0px 4px rgba(0,0,0,1))'
    },
    {
      id: 'temples',
      title: 'TEMPLES',
      href: '/explore/temples',
      imagePath: '/images/temples.jpg',
      textShadow: 'drop-shadow(4px 4px 8px rgba(0,0,0,1)) drop-shadow(2px 2px 4px rgba(0,0,0,1)) drop-shadow(0px 0px 4px rgba(0,0,0,1))'
    },
    {
      id: 'food',
      title: 'FOOD',
      href: '/explore/food',
      imagePath: '/images/food.jpg',
      textShadow: 'drop-shadow(4px 4px 8px rgba(0,0,0,1)) drop-shadow(2px 2px 4px rgba(0,0,0,1)) drop-shadow(0px 0px 4px rgba(0,0,0,1))'
    },
    {
      id: 'events',
      title: 'EVENTS',
      href: '/explore/events',
      imagePath: '/images/events.jpg',
      textShadow: 'drop-shadow(4px 4px 8px rgba(0,0,0,1)) drop-shadow(2px 2px 4px rgba(0,0,0,1)) drop-shadow(0px 0px 4px rgba(0,0,0,1))'
    }
  ];

  return (
    <section id="explore" className="pt-12 pb-24 bg-white">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header with Professional Typography - Left Aligned */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-left mb-20"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 tracking-tight leading-none" 
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                letterSpacing: '-0.02em'
              }}>
            Explore Varanasi
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl font-light leading-relaxed" 
             style={{
               fontFamily: 'Georgia, "Times New Roman", serif'
             }}>
            Sacred ghats, ancient temples, food & vibrant culture
          </p>
        </motion.div>

        {/* Interest Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {interests.map((interest, index) => (
            <motion.div
              key={interest.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.03,
                transition: { duration: 0.3 }
              }}
              className="group cursor-pointer"
            >
              <Link href={interest.href} className="block">
                <div 
                  className="relative h-56 md:h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {/* Clean Background Image - No Filters */}
                  <div className="absolute inset-0">
                    <Image
                      src={interest.imagePath}
                      alt={`${interest.title} in Varanasi`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        // Fallback to a solid color if image fails to load
                        const target = e.currentTarget.parentElement;
                        if (target) {
                          target.style.background = '#6b7280'; // Simple gray fallback
                        }
                      }}
                    />
                  </div>

                  {/* Strong Dark Overlay for Maximum Text Visibility */}
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-all duration-300" />
                  
                  {/* Bottom Dark Band for Text */}
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/90 via-black/70 to-transparent" />
                  
                  {/* Content with Maximum Visibility */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    {/* Title with Maximum Contrast */}
                    <div className="bg-black/70 backdrop-blur-sm rounded-lg px-4 py-2 mb-3">
                      <motion.h3 
                        className="text-2xl md:text-3xl font-black text-white tracking-wide text-center"
                        style={{ 
                          filter: interest.textShadow,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: '#ffffff',
                          fontWeight: '900'
                        }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        {interest.title}
                      </motion.h3>
                    </div>
                    
                    {/* Call to Action Text */}
                    <motion.div 
                      className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                      initial={{ y: 10 }}
                      whileHover={{ y: 0 }}
                    >
                      <p className="text-white text-sm font-medium text-center">
                        Explore More →
                      </p>
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 