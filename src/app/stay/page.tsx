'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function StayPage() {
  const [searchParams, setSearchParams] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    location: 'Varanasi'
  });

  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    rating: 0,
    amenities: [] as string[],
    type: [] as string[]
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-600 to-pink-600 py-20">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Premium Stays in Varanasi
              </h1>
              <p className="text-xl text-purple-100 max-w-2xl mx-auto">
                Experience luxury accommodations with stunning Ganga views and authentic Banarasi hospitality
              </p>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="bg-white shadow-lg -mt-10 relative z-10">
          <div className="container max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <input
                  type="date"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  placeholder="Check-in"
                  value={searchParams.checkIn}
                  onChange={(e) => setSearchParams({...searchParams, checkIn: e.target.value})}
                />
              </div>
              <div className="relative">
                <input
                  type="date"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  placeholder="Check-out"
                  value={searchParams.checkOut}
                  onChange={(e) => setSearchParams({...searchParams, checkOut: e.target.value})}
                />
              </div>
              <div className="relative">
                <select
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  value={searchParams.guests}
                  onChange={(e) => setSearchParams({...searchParams, guests: parseInt(e.target.value)})}
                >
                  {[1,2,3,4,5,6].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>
              <button className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors">
                Search Hotels
              </button>
            </div>
          </div>
        </section>

        {/* Filters and Results Section */}
        <section className="container max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-6">Filters</h3>
                
                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Price Range</h4>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters({...filters, priceRange: [0, parseInt(e.target.value)]})}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>₹0</span>
                    <span>₹{filters.priceRange[1]}</span>
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Rating</h4>
                  <div className="space-y-2">
                    {[5,4,3,2,1].map(rating => (
                      <label key={rating} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="rating"
                          value={rating}
                          checked={filters.rating === rating}
                          onChange={(e) => setFilters({...filters, rating: parseInt(e.target.value)})}
                          className="text-purple-600"
                        />
                        <span className="text-gray-600">{rating} Stars</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Amenities Filter */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Amenities</h4>
                  <div className="space-y-2">
                    {['Free WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym'].map(amenity => (
                      <label key={amenity} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={filters.amenities.includes(amenity)}
                          onChange={(e) => {
                            const newAmenities = e.target.checked
                              ? [...filters.amenities, amenity]
                              : filters.amenities.filter(a => a !== amenity);
                            setFilters({...filters, amenities: newAmenities});
                          }}
                          className="text-purple-600"
                        />
                        <span className="text-gray-600">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results Grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Placeholder for hotel cards */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-400"></div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">Loading Hotels...</h3>
                    <p className="text-gray-600">Please wait while we fetch the best stays in Varanasi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
} 