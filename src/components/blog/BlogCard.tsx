'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, Eye, Heart, Share2, Star, BookOpen } from 'lucide-react';
import Image from 'next/image';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  views: number;
  likes: number;
  isPremium?: boolean;
  status: 'published' | 'pending' | 'draft';
}

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <motion.article
      whileHover={{ y: -8 }}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Premium Badge */}
        {post.isPremium && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-400 to-amber-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <Star className="w-3 h-3" />
            Premium
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
          {post.category}
        </div>

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="bg-purple-50 text-purple-600 px-2 py-1 rounded-md text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors duration-300">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Author and Meta Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{post.author.name}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Calendar className="w-3 h-3" />
                {formatDate(post.publishedAt)}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </div>
        </div>

        {/* Stats and Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{post.views.toLocaleString()}</span>
            </div>
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 transition-colors duration-200 ${
                isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>{likesCount.toLocaleString()}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all duration-200">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Read More
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
} 