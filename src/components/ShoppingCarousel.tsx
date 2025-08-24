'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { getFeaturedProducts } from '@/data/products';

interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  imagePath: string;
  isNew: boolean;
  category: string;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Classic Banarasi Silk',
    price: '₹8,999',
    originalPrice: '₹12,500',
    imagePath: '/images/shop/product1.jpg',
    isNew: true,
    category: 'Textiles'
  },
  {
    id: '2',
    name: 'Handcrafted Brass Lamp',
    price: '₹2,499',
    originalPrice: '',
    imagePath: '/images/shop/product2.jpg',
    isNew: true,
    category: 'Decor'
  },
  {
    id: '3',
    name: 'Zari Embroidered Shawl',
    price: '₹3,999',
    originalPrice: '',
    imagePath: '/images/shop/product3.jpg',
    isNew: true,
    category: 'Textiles'
  },
  {
    id: '4',
    name: 'Wooden Carved Box',
    price: '₹1,999',
    originalPrice: '',
    imagePath: '/images/shop/product4.jpg',
    isNew: true,
    category: 'Decor'
  },
  {
    id: 'silk-saree',
    name: 'Banarasi Silk Saree',
    price: '₹12,500',
    originalPrice: '₹15,000',
    imagePath: '/images/products/silk-saree.jpg',
    isNew: true,
    category: 'Textiles'
  },
  {
    id: 'brass-lamp',
    name: 'Handcrafted Brass Diya',
    price: '₹850',
    originalPrice: '',
    imagePath: '/images/products/brass-lamp.jpg',
    isNew: true,
    category: 'Decor'
  },
  {
    id: 'wooden-tabla',
    name: 'Traditional Wooden Tabla',
    price: '₹4,200',
    originalPrice: '₹5,000',
    imagePath: '/images/products/wooden-tabla.jpg',
    isNew: false,
    category: 'Decor'
  },
  {
    id: 'silver-jewelry',
    name: 'Sterling Silver Necklace',
    price: '₹2,800',
    originalPrice: '',
    imagePath: '/images/products/silver-jewelry.jpg',
    isNew: true,
    category: 'Jewelry'
  },
  {
    id: 'carpet-weaving',
    name: 'Hand-woven Silk Carpet',
    price: '₹18,500',
    originalPrice: '₹22,000',
    imagePath: '/images/products/silk-carpet.jpg',
    isNew: false,
    category: 'Textiles'
  },
  {
    id: 'stone-sculpture',
    name: 'Sandstone Buddha Statue',
    price: '₹6,800',
    originalPrice: '',
    imagePath: '/images/products/stone-sculpture.jpg',
    isNew: true,
    category: 'Decor'
  }
];

export default function ShoppingCarousel() {
  const featuredProducts = getFeaturedProducts().slice(0, 4);

  return (
    <div className="relative">
      {/* Navigation Arrows */}
      <div className="flex justify-between items-center mb-8">
        <button
          disabled={true}
          className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <svg className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          disabled={true}
          className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <svg className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Products Carousel */}
      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={0}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <Link href={`/shop/product/${product.id}`} className="block">
                  <div className="relative h-64 mb-4 overflow-hidden rounded-lg">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    
                    {/* Category Tag */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 text-gray-900 px-3 py-1 text-sm font-medium">
                        {product.category}
                      </span>
                    </div>

                    {product.isNew && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-red-500 text-white px-3 py-1 text-sm font-medium rounded-full">
                          New
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 font-medium">₹{product.price.toLocaleString()}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* View All Products Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <Link href="/shop">
          <button className="bg-gray-900 text-white px-8 py-3 font-medium hover:bg-gray-800 transition-colors rounded-none">
            Explore Full Collection
          </button>
        </Link>
      </motion.div>
    </div>
  );
} 