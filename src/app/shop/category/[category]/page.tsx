'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProductsByCategory, categories, categoryBanners } from '@/data/products';
import type { Product } from '@/data/products';
import PremiumProductCard from '@/components/shop/PremiumProductCard';
import PremiumSearchBar from '@/components/shop/PremiumSearchBar';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import MobileNavigation from '@/components/MobileNavigation';
import Image from 'next/image';

export default function CategoryPage() {
  const params = useParams();
  const category = decodeURIComponent(params.category as string);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);

  // Get products for this category
  const categoryProducts = getProductsByCategory(category);

  // Filter products based on search and filters
  let filteredProducts = categoryProducts.filter(product => {
    // Search filter
    if (searchQuery) {
      const search = searchQuery.toLowerCase();
      if (!product.title.toLowerCase().includes(search) &&
          !product.description.toLowerCase().includes(search)) {
        return false;
      }
    }

    // Price filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }

    // Other filters
    for (const [filterGroup, selectedValues] of Object.entries(selectedFilters)) {
      if (selectedValues.length > 0) {
        if (filterGroup === 'subCategory' && !selectedValues.includes(product.subCategory)) {
          return false;
        }
      }
    }

    return true;
  });

  // Sort products
  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.title.localeCompare(b.title);
      case 'newest':
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      case 'featured':
      default:
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    }
  });

  // Get unique subcategories for this category
  const subcategories = Array.from(new Set(categoryProducts.map(p => p.subCategory)));

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name', label: 'Name A-Z' }
  ];

  return (
    <div className="min-h-screen bg-neutral-50 overflow-x-hidden">
      {/* Premium Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src={categoryBanners[category as keyof typeof categoryBanners] || 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1200&h=600&fit=crop&crop=center'}
            alt={`${category} collection`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/80 to-neutral-900/40" />
        </div>
        
        <div className="w-full max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
              {category}
              <span className="block font-serif italic text-2xl md:text-3xl lg:text-4xl mt-2 text-white/80">
                Collection
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl">
              Discover our curated selection of handcrafted {category.toLowerCase()} from master artisans
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="w-full max-w-7xl mx-auto px-6">
          {/* Premium Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <PremiumSearchBar onSearch={setSearchQuery} />
          </div>

          {/* Premium Filter and Sort Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-12 p-6 bg-white rounded-lg shadow-sm">
            <div className="flex items-center gap-4">
              <span className="text-sm text-neutral-600 font-light">
                {filteredProducts.length} pieces found
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* Premium Sort Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowSort(!showSort);
                    setShowFilters(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg hover:bg-neutral-100 transition-colors text-sm font-light"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                  </svg>
                  <span>Sort</span>
                </button>

                <AnimatePresence>
                  {showSort && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full mt-2 right-0 w-48 bg-white border border-neutral-200 rounded-lg shadow-lg z-50"
                    >
                      {sortOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSortBy(option.value);
                            setShowSort(false);
                          }}
                          className={`w-full text-left px-4 py-3 text-sm hover:bg-neutral-50 transition-colors ${
                            sortBy === option.value ? 'bg-neutral-50 font-medium' : ''
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Premium Filter Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowFilters(!showFilters);
                    setShowSort(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg hover:bg-neutral-100 transition-colors text-sm font-light"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                  <span>Filter</span>
                  {Object.values(selectedFilters).flat().length > 0 && (
                    <span className="bg-neutral-900 text-white text-xs px-2 py-1 rounded-full">
                      {Object.values(selectedFilters).flat().length}
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full mt-2 right-0 w-80 bg-white border border-neutral-200 rounded-lg shadow-lg z-50 p-6"
                    >
                      {/* Price Range */}
                      <div className="mb-6">
                        <h3 className="text-sm font-medium mb-3 text-neutral-900">Price Range</h3>
                        <div className="flex gap-3 mb-3">
                          <input
                            type="number"
                            placeholder="Min"
                            value={priceRange[0]}
                            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                            className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                          />
                          <input
                            type="number"
                            placeholder="Max"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                            className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                          />
                        </div>
                      </div>

                      {/* Sub Categories */}
                      <div className="mb-6">
                        <h3 className="text-sm font-medium mb-3 text-neutral-900">Sub Categories</h3>
                        <div className="space-y-2 max-h-32 overflow-y-auto">
                          {subcategories.map((sub) => (
                            <label key={sub} className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                checked={selectedFilters.subCategory?.includes(sub) || false}
                                onChange={() => {
                                  const current = selectedFilters.subCategory || [];
                                  const updated = current.includes(sub)
                                    ? current.filter(s => s !== sub)
                                    : [...current, sub];
                                  setSelectedFilters(prev => ({
                                    ...prev,
                                    subCategory: updated
                                  }));
                                }}
                                className="rounded border-neutral-300 focus:ring-neutral-900"
                              />
                              <span className="text-sm text-neutral-700">{sub}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Clear Filters */}
                      <button
                        onClick={() => {
                          setSelectedFilters({});
                          setPriceRange([0, 50000]);
                        }}
                        className="w-full py-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors border-t border-neutral-200 pt-3"
                      >
                        Clear All Filters
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Premium Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <Link key={product.id} href={`/shop/product/${product.id}`}>
                <PremiumProductCard
                  title={product.title}
                  price={`₹${product.price.toLocaleString()}`}
                  image={product.image}
                  category={product.subCategory}
                  artisan={product.artisan}
                  isNew={product.isNew}
                  isFeatured={product.isFeatured}
                  onAddToCart={() => {/* Implement add to cart */}}
                />
              </Link>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-neutral-500 font-light">No pieces found matching your criteria</p>
            </div>
          )}
        </div>
      </section>

      <MobileNavigation />
    </div>
  );
} 