'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight, Tag, ChevronRight, Bookmark } from 'lucide-react';
import Link from 'next/link';

const BlogSection = () => {
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);

  const blogPosts = [
    {
      id: 1,
      title: "Sacred Waters: A Journey Through Varanasi's Ghats",
      excerpt: "An immersive exploration of the spiritual and cultural significance of Varanasi's most revered ghats along the sacred Ganges.",
      author: "Priya Sharma",
      date: "Dec 15, 2024",
      readTime: "8 min read",
      category: "Sacred Places",
      image: "/images/blog/ghats.jpg",
      featured: true,
      tags: ["Spirituality", "Architecture", "History"]
    },
    {
      id: 2,
      title: "The Art of Traditional Silk Weaving",
      excerpt: "Discover the intricate craftsmanship behind Varanasi's world-renowned silk weaving tradition.",
      author: "Amit Kumar",
      date: "Dec 12, 2024",
      readTime: "6 min read",
      category: "Artisan Stories",
      image: "/images/blog/silk.jpg",
      featured: false,
      tags: ["Crafts", "Culture", "Heritage"]
    },
    {
      id: 3,
      title: "Dawn Rituals: Morning Life by the Ganges",
      excerpt: "Experience the mystical morning ceremonies and daily life that unfolds along the riverbanks at sunrise.",
      author: "Rajesh Gupta",
      date: "Dec 10, 2024",
      readTime: "10 min read",
      category: "Cultural Insights",
      image: "/images/blog/dawn.jpg",
      featured: false,
      tags: ["Traditions", "Photography", "Local Life"]
    },
    {
      id: 4,
      title: "The Sacred Sound: Music of Varanasi",
      excerpt: "Explore the rich musical heritage and the stories of the musicians who keep ancient traditions alive.",
      author: "Meera Singh",
      date: "Dec 8, 2024",
      readTime: "7 min read",
      category: "Arts & Culture",
      image: "/images/blog/music.jpg",
      featured: false,
      tags: ["Music", "Heritage", "Artists"]
    }
  ];

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Premium Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-[1px] w-12 bg-amber-400"></div>
            <span className="text-amber-600 font-medium tracking-wider uppercase text-sm">Travel Journal</span>
            <div className="h-[1px] w-12 bg-amber-400"></div>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-8 leading-tight tracking-tight">
            Sacred Stories & <span className="text-amber-500">Insights</span>
          </h2>
          <p className="text-xl text-gray-600/90 max-w-3xl mx-auto leading-relaxed font-light">
            Immerse yourself in the rich tapestry of Varanasi's culture through our curated collection 
            of stories, insights, and visual narratives.
          </p>
        </motion.div>

        {/* Featured Post - Magazine Style */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/patterns/sacred-geometry.svg')] opacity-5"></div>
              <div className="relative grid lg:grid-cols-2 gap-12 p-12 lg:p-16">
                <div className="flex flex-col justify-center">
                  <motion.div 
                    className="flex items-center gap-3 mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <span className="bg-amber-500 text-white px-4 py-1.5 rounded-full text-sm font-medium">
                      Featured
                    </span>
                    <span className="text-amber-700 font-medium">{featuredPost.category}</span>
                  </motion.div>
                  
                  <motion.h3 
                    className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    {featuredPost.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-gray-600 text-lg leading-relaxed mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    {featuredPost.excerpt}
                  </motion.p>
                  
                  <motion.div 
                    className="flex flex-wrap gap-3 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    {featuredPost.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="bg-white/60 backdrop-blur-sm text-amber-800 px-4 py-1.5 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center gap-6 text-sm text-gray-600 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {featuredPost.author}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {featuredPost.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </div>
                  </motion.div>
                  
                  <motion.button 
                    className="group inline-flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-2xl hover:bg-amber-600 transition-all duration-300 font-medium w-fit"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    Read Full Story
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                </div>
                
                <motion.div 
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-200/20 to-orange-200/20 mix-blend-overlay"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Tag className="w-20 h-20 text-amber-400/30" />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Regular Posts - Premium Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {regularPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredPost(post.id)}
              onMouseLeave={() => setHoveredPost(null)}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-xl transition-all duration-500"
            >
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/10 to-gray-900/30 group-hover:from-amber-900/20 group-hover:to-amber-900/40 transition-colors duration-500 z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-amber-200/20 to-orange-200/20 mix-blend-overlay"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Tag className="w-12 h-12 text-white/20" />
                </div>
                <motion.div 
                  className="absolute top-4 left-4 flex gap-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="bg-white/90 backdrop-blur-sm text-amber-600 px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </motion.div>
                <motion.button
                  className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Bookmark className="w-4 h-4" />
                </motion.button>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-amber-600 transition-colors duration-300">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <motion.div
                    className="flex items-center gap-1 text-amber-600 font-medium"
                    animate={{ x: hoveredPost === post.id ? 5 : 0 }}
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Premium View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/blog" className="inline-block group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/30 to-orange-400/30 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-all duration-500 scale-105 animate-pulse"></div>
              <button className="relative px-12 py-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-lg font-semibold rounded-2xl transform group-hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center gap-3">
                Explore All Stories
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection; 