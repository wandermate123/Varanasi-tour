'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { getProductById, getProductsByCategory } from '@/data/products';
import type { Product } from '@/data/products';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import MobileNavigation from '@/components/MobileNavigation';
import PremiumProductCard from '@/components/shop/PremiumProductCard';

// Mock review data (in a real app, this would come from an API)
const mockReviews = [
  {
    id: 1,
    author: 'Priya Sharma',
    rating: 5,
    date: '2024-01-15',
    comment: 'Absolutely beautiful craftsmanship! The quality exceeded my expectations and the artisan\'s attention to detail is remarkable.',
    verified: true
  },
  {
    id: 2,
    author: 'Rajesh Kumar',
    rating: 4,
    date: '2024-01-10',
    comment: 'Good quality product, delivered on time. Packaging was excellent and the item was exactly as described.',
    verified: true
  },
  {
    id: 3,
    author: 'Meera Patel',
    rating: 5,
    date: '2024-01-05',
    comment: 'This is my third purchase from this artisan. Consistent quality and authentic traditional work. Highly recommended!',
    verified: true
  }
];

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('description');
  const [showReviewForm, setShowReviewForm] = useState(false);

  const product = getProductById(productId);
  const relatedProducts = product 
    ? getProductsByCategory(product.category).filter(p => p.id !== product.id).slice(0, 4)
    : [];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <p className="text-neutral-500 font-light">Piece not found</p>
      </div>
    );
  }

  // Calculate average rating
  const averageRating = mockReviews.reduce((sum, review) => sum + review.rating, 0) / mockReviews.length;

  const StarRating = ({ rating, size = 'small' }: { rating: number; size?: 'small' | 'large' }) => {
    const sizeClass = size === 'large' ? 'w-5 h-5' : 'w-4 h-4';
    
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`${sizeClass} ${star <= rating ? 'text-yellow-400' : 'text-neutral-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="text-sm text-neutral-600 ml-2 font-light">({mockReviews.length})</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-neutral-50 overflow-x-hidden">
      {/* Premium Product Details */}
      <section className="py-16 md:py-24">
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 md:gap-24">
            {/* Premium Product Image */}
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative aspect-square bg-neutral-100 rounded-2xl overflow-hidden"
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Status Badges */}
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="bg-white/95 text-neutral-900 px-4 py-2 text-sm font-light tracking-wide rounded-full">
                      New Arrival
                    </span>
                  )}
                  {product.isFeatured && (
                    <span className="bg-neutral-900/95 text-white px-4 py-2 text-sm font-light tracking-wide rounded-full">
                      Featured
                    </span>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Premium Product Info */}
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Category and Artisan */}
                <div className="mb-6">
                  <p className="text-sm text-neutral-500 font-light tracking-wide mb-2">
                    {product.category} • {product.subCategory}
                  </p>
                  {product.artisan && (
                    <p className="text-sm text-neutral-600 font-light">
                      Crafted by <span className="font-medium">{product.artisan}</span>
                    </p>
                  )}
                </div>

                {/* Product Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-neutral-900 mb-6 leading-tight">
                  {product.title}
                </h1>

                {/* Rating */}
                <div className="mb-6">
                  <StarRating rating={averageRating} size="large" />
                </div>

                {/* Price */}
                <div className="mb-8">
                  <p className="text-2xl md:text-3xl font-light text-neutral-900">
                    ₹{product.price.toLocaleString()}
                  </p>
                </div>

                {/* Product Details */}
                {product.materials && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-neutral-900 mb-3">Materials</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.materials.map((material) => (
                        <span key={material} className="px-3 py-1 bg-neutral-100 text-neutral-700 text-sm font-light rounded-full">
                          {material}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {product.dimensions && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-neutral-900 mb-2">Dimensions</h3>
                    <p className="text-sm text-neutral-600 font-light">{product.dimensions}</p>
                  </div>
                )}

                {/* Quantity and Add to Cart */}
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-6">
                    <label className="text-sm font-medium text-neutral-900">Quantity</label>
                    <div className="flex items-center border border-neutral-200 rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-2 text-neutral-600 hover:text-neutral-900 transition-colors"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 text-neutral-900 font-light">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-4 py-2 text-neutral-600 hover:text-neutral-900 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-neutral-900 text-white py-4 text-lg font-light tracking-wide hover:bg-neutral-800 transition-colors duration-300 rounded-lg"
                  >
                    Add to Cart
                  </motion.button>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <p className="text-neutral-700 leading-relaxed font-light">
                    {product.description}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Product Details Tabs */}
      <section className="py-16 md:py-24 bg-white">
        <div className="w-full max-w-6xl mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Premium Tab Navigation */}
            <div className="flex border-b border-neutral-200 mb-12">
              {[
                { id: 'description', label: 'Description' },
                { id: 'reviews', label: 'Reviews' },
                { id: 'artisan', label: 'About Artisan' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`px-8 py-4 font-light transition-colors text-lg ${
                    selectedTab === tab.id
                      ? 'border-b-2 border-neutral-900 text-neutral-900'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Premium Tab Content */}
            <div className="bg-white">
              {selectedTab === 'description' && (
                <div>
                  <h3 className="text-2xl font-light text-neutral-900 mb-6">Product Description</h3>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-neutral-700 leading-relaxed font-light">
                      {product.description}
                    </p>
                    {product.materials && (
                      <div className="mt-6">
                        <h4 className="text-lg font-light text-neutral-900 mb-3">Materials & Care</h4>
                        <p className="text-neutral-700 leading-relaxed font-light">
                          This piece is crafted using the finest {product.materials.join(', ')}. 
                          Each material is carefully selected to ensure both beauty and durability. 
                          To maintain the quality of your piece, we recommend gentle cleaning and 
                          storing in a cool, dry place away from direct sunlight.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {selectedTab === 'reviews' && (
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-light text-neutral-900">Customer Reviews</h3>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowReviewForm(true)}
                      className="px-6 py-3 border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors duration-300 font-light"
                    >
                      Write a Review
                    </motion.button>
                  </div>

                  <div className="space-y-8">
                    {mockReviews.map((review) => (
                      <div key={review.id} className="border-b border-neutral-200 pb-8">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center">
                              <span className="text-neutral-600 font-light">
                                {review.author.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-light text-neutral-900">{review.author}</h4>
                              <StarRating rating={review.rating} />
                            </div>
                          </div>
                          <span className="text-sm text-neutral-500 font-light">{review.date}</span>
                        </div>
                        <p className="text-neutral-700 leading-relaxed font-light">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedTab === 'artisan' && (
                <div>
                  <h3 className="text-2xl font-light text-neutral-900 mb-6">About the Artisan</h3>
                  {product.artisan ? (
                    <div className="prose prose-lg max-w-none">
                      <p className="text-neutral-700 leading-relaxed font-light">
                        <strong className="font-medium">{product.artisan}</strong> is a master craftsperson with decades of experience 
                        in traditional {product.category.toLowerCase()} making. Coming from a family of artisans, 
                        they have inherited and perfected techniques that have been passed down through generations.
                      </p>
                      <p className="text-neutral-700 leading-relaxed font-light mt-6">
                        Their workshop is located in the cultural heartland where this art form originated, 
                        and they continue to train young apprentices to preserve these invaluable skills for 
                        future generations. Each piece created is a testament to their dedication to maintaining 
                        the authenticity and quality of traditional craftsmanship.
                      </p>
                      <p className="text-neutral-700 leading-relaxed font-light mt-6">
                        By purchasing this product, you are directly supporting the artisan and their community, 
                        helping to sustain traditional craft practices and provide fair livelihood opportunities.
                      </p>
                    </div>
                  ) : (
                    <p className="text-neutral-700 leading-relaxed font-light">
                      This product is crafted by skilled traditional artisans committed to preserving 
                      cultural heritage through their exceptional workmanship.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Premium Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 md:py-24 bg-neutral-50">
          <div className="w-full max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-light text-neutral-900 mb-6 leading-tight">
                You May Also
                <span className="block font-serif italic text-4xl md:text-5xl mt-2">Like</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/shop/product/${relatedProduct.id}`}>
                  <PremiumProductCard
                    title={relatedProduct.title}
                    price={`₹${relatedProduct.price.toLocaleString()}`}
                    image={relatedProduct.image}
                    category={relatedProduct.subCategory}
                    artisan={relatedProduct.artisan}
                    isNew={relatedProduct.isNew}
                    isFeatured={relatedProduct.isFeatured}
                    onAddToCart={() => {/* Implement add to cart */}}
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <MobileNavigation />
    </div>
  );
} 