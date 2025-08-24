'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { searchAll, getSearchSuggestions, getQuickSearchCategories } from '@/lib/searchService';
import { SearchResult } from '@/lib/searchService';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileNavigation from '@/components/MobileNavigation';
import Image from 'next/image';
import Link from 'next/link';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(query);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'price' | 'name'>('relevance');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

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

  const performSearch = async (searchTerm: string) => {
    setIsLoading(true);
    try {
      const searchResults = searchAll(searchTerm);
      setResults(searchResults);
      setFilteredResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    if (suggestion.link) {
      router.push(suggestion.link);
    } else {
      setSearchQuery(suggestion.title);
      router.push(`/search?q=${encodeURIComponent(suggestion.title)}`);
    }
    setShowSuggestions(false);
  };

  const handleCategoryClick = (category: any) => {
    if (category.link) {
      router.push(category.link);
    } else {
      setSearchQuery(category.query);
      router.push(`/search?q=${encodeURIComponent(category.query)}`);
    }
  };

  const filterResults = (type: string) => {
    setSelectedType(type);
    if (type === 'all') {
      setFilteredResults(results);
    } else {
      setFilteredResults(results.filter(result => result.type === type));
    }
  };

  const sortResults = (sortType: 'relevance' | 'price' | 'name') => {
    setSortBy(sortType);
    const sorted = [...filteredResults].sort((a, b) => {
      switch (sortType) {
        case 'relevance':
          return b.relevance - a.relevance;
        case 'price':
          const priceA = a.price ? parseInt(a.price.replace(/[^\d]/g, '')) : 0;
          const priceB = b.price ? parseInt(b.price.replace(/[^\d]/g, '')) : 0;
          return priceA - priceB;
        case 'name':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
    setFilteredResults(sorted);
  };

  const getTypeCount = (type: string) => {
    return results.filter(result => result.type === type).length;
  };

  const typeFilters = [
    { type: 'all', label: 'All', count: results.length, icon: '🔍' },
    { type: 'product', label: 'Products', count: getTypeCount('product'), icon: '🛍️' },
    { type: 'service', label: 'Services', count: getTypeCount('service'), icon: '🎯' },
    { type: 'event', label: 'Events', count: getTypeCount('event'), icon: '🎭' },
    { type: 'temple', label: 'Temples', count: getTypeCount('temple'), icon: '🛕' },
    { type: 'food', label: 'Food', count: getTypeCount('food'), icon: '🍜' },
    { type: 'location', label: 'Locations', count: getTypeCount('location'), icon: '📍' }
  ];

  const quickSearchCategories = getQuickSearchCategories();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20 pb-20 lg:pb-0">
        {/* Search Header */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                Search Varanasi
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Discover temples, services, products, and experiences in the spiritual heart of India
              </p>
              
              {/* Search Form */}
              <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="What are you looking for in Varanasi?"
                    className="w-full px-6 py-4 pl-12 text-gray-900 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
                  />
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <button
                    type="submit"
                    className="absolute inset-y-0 right-0 px-6 bg-blue-600 text-white rounded-r-full hover:bg-blue-700 transition-colors"
                  >
                    Search
                  </button>
                </div>

                {/* Search Suggestions */}
                <AnimatePresence>
                  {showSuggestions && suggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden"
                    >
                      {suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left"
                        >
                          <span className="text-2xl">{suggestion.icon}</span>
                          <div>
                            <div className="font-medium text-gray-900">{suggestion.title}</div>
                            <div className="text-sm text-gray-500">{suggestion.category}</div>
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>

              {/* Quick Search Categories */}
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {quickSearchCategories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => handleCategoryClick(category)}
                    className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full hover:bg-white/30 transition-all duration-200 flex items-center gap-2"
                  >
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Search Results */}
        {query && (
          <section className="py-8 sm:py-12">
            <div className="container mx-auto px-4 sm:px-6">
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  <p className="mt-4 text-gray-600">Searching...</p>
                </div>
              ) : (
                <>
                  {/* Results Header */}
                  <div className="mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                      Search Results for "{query}"
                    </h2>
                    <p className="text-gray-600">
                      Found {results.length} results
                    </p>
                  </div>

                  {/* Filters and Sort */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                    {/* Type Filters */}
                    <div className="flex flex-wrap gap-3 mb-6">
                      {typeFilters.map((filter) => (
                        <button
                          key={filter.type}
                          onClick={() => filterResults(filter.type)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                            selectedType === filter.type
                              ? 'bg-blue-600 text-white shadow-lg'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          <span>{filter.icon}</span>
                          <span>{filter.label}</span>
                          <span className="bg-white/20 text-white px-2 py-0.5 rounded-full text-xs">
                            {filter.count}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Sort Options */}
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-gray-700">Sort by:</span>
                      <select
                        value={sortBy}
                        onChange={(e) => sortResults(e.target.value as 'relevance' | 'price' | 'name')}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="relevance">Relevance</option>
                        <option value="price">Price (Low to High)</option>
                        <option value="name">Name (A-Z)</option>
                      </select>
                    </div>
                  </div>

                  {/* Results Grid */}
                  {filteredResults.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">🔍</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
                      <p className="text-gray-600 mb-6">
                        Try adjusting your search terms or browse our categories
                      </p>
                      <div className="flex flex-wrap justify-center gap-3">
                        {quickSearchCategories.map((category) => (
                          <button
                            key={category.name}
                            onClick={() => handleCategoryClick(category)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            {category.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {filteredResults.map((result, index) => (
                        <motion.div
                          key={result.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200"
                        >
                          <Link href={result.link} className="block">
                            {/* Image */}
                            <div className="relative h-48 bg-gray-100">
                              {result.image ? (
                                <Image
                                  src={result.image}
                                  alt={result.title}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <span className="text-4xl">{result.type === 'temple' ? '🛕' : 
                                    result.type === 'service' ? '🎯' : 
                                    result.type === 'event' ? '🎭' : 
                                    result.type === 'product' ? '🛍️' : 
                                    result.type === 'food' ? '🍜' : '📍'}</span>
                                </div>
                              )}
                            </div>

                            {/* Content */}
                            <div className="p-6">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <span className="text-xl">
                                    {result.type === 'temple' ? '🛕' : 
                                     result.type === 'service' ? '🎯' : 
                                     result.type === 'event' ? '🎭' : 
                                     result.type === 'product' ? '🛍️' : 
                                     result.type === 'food' ? '🍜' : '📍'}
                                  </span>
                                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                                    {result.title}
                                  </h3>
                                </div>
                                {result.price && (
                                  <span className="text-lg font-bold text-blue-600 flex-shrink-0">
                                    {result.price}
                                  </span>
                                )}
                              </div>

                              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                {result.description}
                              </p>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-600">
                                    {result.category}
                                  </span>
                                  {result.location && (
                                    <span className="text-xs text-gray-500">
                                      📍 {result.location}
                                    </span>
                                  )}
                                </div>
                                
                                <div className="text-xs text-gray-400">
                                  {result.relevance}% match
                                </div>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </section>
        )}
      </main>

      <Footer />
      <MobileNavigation />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading search...</p>
        </div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}