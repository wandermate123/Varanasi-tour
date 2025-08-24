'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { categories } from '@/data/products';
import PremiumSearchBar from '@/components/shop/PremiumSearchBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileNavigation from '@/components/MobileNavigation';

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const categoryCards = [
    {
      title: categories.TEXTILES,
      image: '/images/shop/textiles/hero.jpg',
      description: 'Handwoven sarees, shawls, and traditional textiles',
      artisanCount: '12 Master Weavers',
      heritage: 'Centuries-old tradition'
    },
    {
      title: categories.ART,
      image: '/images/shop/art/hero.jpg',
      description: 'Traditional paintings and contemporary artworks',
      artisanCount: '8 Master Artists',
      heritage: 'Ancient techniques preserved'
    },
    {
      title: categories.TOYS,
      image: '/images/shop/toys/hero.jpg',
      description: 'Handcrafted traditional toys and games',
      artisanCount: '15 Craft Masters',
      heritage: 'Generational craftsmanship'
    },
    {
      title: categories.BOOKS,
      image: '/images/shop/books/hero.jpg',
      description: 'Rare manuscripts and illustrated art books',
      artisanCount: '6 Manuscript Artists',
      heritage: 'Sacred knowledge preserved'
    },
    {
      title: categories.POTTERY,
      image: '/images/shop/pottery/hero.jpg',
      description: 'Traditional ceramics and pottery',
      artisanCount: '10 Master Potters',
      heritage: 'Ancient clay traditions'
    },
    {
      title: categories.MUSICAL,
      image: '/images/shop/musical/hero.jpg',
      description: 'Classical instruments and accessories',
      artisanCount: '7 Instrument Makers',
      heritage: 'Musical heritage alive'
    },
    {
      title: categories.JEWELRY,
      image: '/images/shop/jewelry/hero.jpg',
      description: 'Handcrafted traditional jewelry and accessories',
      artisanCount: '9 Master Goldsmiths',
      heritage: 'Royal craftsmanship'
    },
    {
      title: categories.DECOR,
      image: '/images/shop/decor/hero.jpg',
      description: 'Beautiful home decor and traditional artifacts',
      artisanCount: '11 Artisan Families',
      heritage: 'Timeless beauty crafted'
    },
    {
      title: categories.SCULPTURES,
      image: '/images/shop/sculptures/hero.jpg',
      description: 'Hand-carved sculptures and artistic pieces',
      artisanCount: '5 Master Sculptors',
      heritage: 'Divine artistry'
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50 overflow-x-hidden">
      <Header />
      
      {/* Premium Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1920&h=1080&fit=crop&crop=center"
            alt="Local artisans marketplace"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="w-full max-w-6xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-8 leading-tight tracking-wide">
              Artisan
              <span className="block font-serif italic text-5xl md:text-7xl lg:text-8xl mt-2">Heritage</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-12 leading-relaxed font-light max-w-2xl mx-auto">
              Curated masterpieces from India's finest traditional artisans
            </p>
            
            {/* Premium Search Bar */}
            <div className="w-full max-w-md mx-auto">
              <PremiumSearchBar onSearch={setSearchQuery} />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Premium Categories Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="w-full max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-24"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-neutral-900 mb-6 leading-tight">
              Discover Our
              <span className="block font-serif italic text-4xl md:text-5xl lg:text-6xl mt-2">Collections</span>
            </h2>
            <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Each piece tells a story of tradition, skill, and cultural heritage
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {categoryCards.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <Link href={`/shop/category/${encodeURIComponent(category.title)}`}>
                  <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />
                    
                    {/* Premium Overlay */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <div className="transform group-hover:translate-y-0 translate-y-4 transition-transform duration-500">
                        <h3 className="text-2xl md:text-3xl font-light text-white mb-3 leading-tight">
                          {category.title}
                        </h3>
                        <p className="text-white/90 text-sm md:text-base mb-4 leading-relaxed">
                          {category.description}
                        </p>
                        <div className="space-y-2">
                          <p className="text-white/80 text-xs md:text-sm font-medium">
                            {category.artisanCount}
                          </p>
                          <p className="text-white/60 text-xs italic">
                            {category.heritage}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Hover Border Effect */}
                    <div className="absolute inset-0 border border-white/20 group-hover:border-white/40 transition-colors duration-500" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="py-20 md:py-32 bg-neutral-50">
        <div className="w-full max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-24"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-neutral-900 mb-6 leading-tight">
              Why Choose
              <span className="block font-serif italic text-4xl md:text-5xl lg:text-6xl mt-2">Artisan Heritage</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-light text-neutral-900 mb-4 leading-tight">Authentic Craftsmanship</h3>
              <p className="text-neutral-600 leading-relaxed">
                Direct from master artisans with decades of experience in traditional techniques
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-light text-neutral-900 mb-4 leading-tight">Curated Excellence</h3>
              <p className="text-neutral-600 leading-relaxed">
                Each piece carefully selected for quality, authenticity, and cultural significance
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-light text-neutral-900 mb-4 leading-tight">Fair Trade Promise</h3>
              <p className="text-neutral-600 leading-relaxed">
                Supporting artisan communities with fair compensation and sustainable practices
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="py-20 md:py-32 bg-neutral-900">
        <div className="w-full max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-8 leading-tight">
              Begin Your
              <span className="block font-serif italic text-4xl md:text-5xl lg:text-6xl mt-2">Artisan Journey</span>
            </h2>
            <p className="text-lg md:text-xl text-white/80 mb-12 leading-relaxed max-w-2xl mx-auto">
              Discover pieces that carry the soul of centuries-old traditions
            </p>
            <Link 
              href="/shop/category/Textiles"
              className="inline-block px-8 py-4 border border-white text-white hover:bg-white hover:text-neutral-900 transition-colors duration-300 font-light tracking-wide"
            >
              Explore Collections
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
      <MobileNavigation />
    </div>
  );
} 