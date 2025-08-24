'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import Reveal from '@/components/Reveal';

export default function LandscapeSection() {
  const [imageLoadError, setImageLoadError] = useState(false);

  const handleImageError = () => {
    setImageLoadError(true);
  };

  return (
    <section className="relative">
      <Reveal direction="up" distance={40}>
        {/* Landscape Photo Container */}
        <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] overflow-hidden">
          {imageLoadError ? (
            // Professional fallback with Varanasi essence
            <div className="w-full h-full bg-gradient-to-r from-amber-100 via-orange-50 to-red-50 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-amber-800 mb-2">Sacred Varanasi</h3>
                <p className="text-amber-600">Where spirituality meets serenity</p>
              </div>
            </div>
          ) : (
            <Image 
              src="/images/varanasi-landscape.JPG" 
              alt="Varanasi Ghats Panoramic View" 
              fill 
              className="object-cover"
              priority
              onError={handleImageError}
            />
          )}
        </div>
      </Reveal>
    </section>
  );
} 