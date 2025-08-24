'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, Eye, Heart, Share2, Star, Bookmark, MessageCircle, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
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

interface BlogPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;
  
  // Since this is now a server component, we need to create a client component for the interactive parts
  return <BlogPostClient id={id} />;
}

function BlogPostClient({ id }: { id: string }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Sample blog post data - in real app, this would come from API
  const samplePost: BlogPost = {
    id: id,
    title: 'The Hidden Gems of Varanasi: Beyond the Tourist Trail',
    excerpt: 'Discover the lesser-known corners of the spiritual capital that most visitors never see, from secret ghats to hidden temples and local experiences that will transform your understanding of this ancient city.',
    content: `
      <p>Varanasi, the spiritual heart of India, is a city that has captivated travelers for centuries. While the main ghats and temples draw millions of visitors each year, there's a whole other side to this ancient city that remains largely unexplored by tourists.</p>
      
      <h2>The Secret Ghats</h2>
      <p>Beyond the famous Dashashwamedh Ghat and Manikarnika Ghat lies a network of smaller, more intimate ghats that offer a glimpse into the daily life of locals. These hidden spots are perfect for those seeking a more authentic experience.</p>
      
      <p>One such hidden gem is the Assi Ghat, located at the southern end of the city. Unlike the more crowded central ghats, Assi Ghat offers a peaceful atmosphere where you can witness the daily rituals without the tourist crowds. Early morning here is particularly magical, as the first rays of sun illuminate the ancient steps while locals perform their morning prayers.</p>
      
      <h2>Hidden Temples and Spiritual Sites</h2>
      <p>While the Kashi Vishwanath Temple is undoubtedly magnificent, there are numerous smaller temples scattered throughout the city that hold their own unique charm and spiritual significance. These temples often have fascinating histories and architectural details that are overlooked by most visitors.</p>
      
      <p>The Nepali Temple, for instance, is a beautiful example of Nepali architecture in the heart of Varanasi. Built in the 19th century, this temple features intricate wood carvings and a peaceful courtyard that's perfect for meditation and reflection.</p>
      
      <h2>Local Experiences and Cultural Immersion</h2>
      <p>To truly understand Varanasi, you need to experience it like a local. This means waking up before dawn to witness the city come alive, participating in evening aarti ceremonies, and exploring the narrow alleys that crisscross the old city.</p>
      
      <p>One of the most rewarding experiences is taking a morning walk through the old city with a local guide who can share stories and insights that you won't find in any guidebook. These walks often lead to hidden courtyards, ancient wells, and family-run shops that have been serving the community for generations.</p>
      
      <h2>Culinary Adventures</h2>
      <p>Varanasi's food scene extends far beyond the tourist restaurants. The city is home to numerous family-run establishments that serve authentic local cuisine. From the famous kachoris at Kachori Gali to the sweet lassi at Blue Lassi Shop, there's a world of flavors waiting to be discovered.</p>
      
      <p>For the adventurous foodie, exploring the street food scene is a must. The narrow lanes around the ghats are filled with vendors selling everything from spicy chaat to sweet jalebis. Each bite tells a story of the city's rich culinary heritage.</p>
      
      <h2>Photography Opportunities</h2>
      <p>Varanasi is a photographer's paradise, and the hidden corners of the city offer some of the best opportunities for capturing authentic moments. The play of light and shadow in the narrow alleys, the expressions of devotion on people's faces, and the timeless beauty of the ancient architecture all combine to create endless photographic possibilities.</p>
      
      <p>The key to great photography in Varanasi is patience and respect. Taking the time to build rapport with locals often leads to more intimate and meaningful photographs that capture the true essence of the city.</p>
      
      <h2>Practical Tips for Exploring Hidden Varanasi</h2>
      <ul>
        <li>Start early in the morning when the city is waking up</li>
        <li>Hire a local guide who knows the hidden spots</li>
        <li>Be respectful of local customs and traditions</li>
        <li>Don't be afraid to get lost in the narrow alleys</li>
        <li>Take time to sit and observe daily life</li>
        <li>Learn a few basic Hindi phrases</li>
      </ul>
      
      <p>Exploring the hidden gems of Varanasi requires an open mind and a willingness to step off the beaten path. The rewards are immense - you'll discover a side of the city that few tourists ever see, and gain insights into the rich cultural tapestry that makes Varanasi truly special.</p>
      
      <p>Remember, the best experiences in Varanasi often happen when you least expect them. Whether it's a chance encounter with a local priest, an impromptu music session in a hidden courtyard, or simply watching the sunset from a quiet ghat, these moments become the highlights of your journey.</p>
    `,
    author: {
      name: 'Priya Sharma',
      avatar: '/images/hero.jpg',
      bio: 'Travel writer and photographer with over 10 years of experience exploring India. Passionate about discovering hidden gems and sharing authentic travel stories.'
    },
    publishedAt: '2024-01-15',
    readTime: '8 min read',
    category: 'Travel',
    tags: ['Varanasi', 'Hidden Gems', 'Local Experience', 'Photography', 'Culture'],
    image: '/images/ghats.JPG',
    views: 1247,
    likes: 89,
    isPremium: true,
    status: 'published'
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPost(samplePost);
      setLikesCount(samplePost.likes);
      setIsLoading(false);
    }, 1000);
  }, [id]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Post Not Found</h1>
          <p className="text-gray-600 mb-4">The blog post you're looking for doesn't exist.</p>
          <Link
            href="/blog"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
      </div>

      {/* Header: left text, right image */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Meta + Title + Excerpt */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-1"
          >
            <div className="flex items-center gap-2 text-red-600 font-semibold mb-6">
              <span className="inline-block h-[2px] w-8 bg-red-600"></span>
              {post.category}
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              {post.title}
            </h1>
            <div className="text-gray-600 flex items-center gap-4 mb-6">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {post.views.toLocaleString()} views
              </span>
              <button
                onClick={handleLike}
                className={`flex items-center gap-1 transition-colors duration-200 ${
                  isLiked ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                {likesCount.toLocaleString()}
              </button>
            </div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative h-72 md:h-[520px] order-1 md:order-2"
          >
            <Image src={post.image} alt={post.title} fill className="object-cover" />
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <article className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>

            {/* Tags */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-purple-100 hover:text-purple-700 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-8 space-y-6">
              {/* Action Buttons */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Share & Save</h3>
                <div className="space-y-3">
                  <button
                    onClick={handleBookmark}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                      isBookmarked
                        ? 'bg-purple-50 border-purple-200 text-purple-700'
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                    {isBookmarked ? 'Saved' : 'Save'}
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </div>

              {/* Author Info */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">About the Author</h3>
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{post.author.name}</p>
                    <p className="text-sm text-gray-500">Travel Writer</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {post.author.bio}
                </p>
              </div>

              {/* Related Posts */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Related Posts</h3>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                          Related blog post title {i}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">2 min read</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comments Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <MessageCircle className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Comments</h3>
          </div>
          
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Be the first to share your thoughts!</p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Add a Comment
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
} 