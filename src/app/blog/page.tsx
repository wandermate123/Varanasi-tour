'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  // Sample blog data - in real app, this would come from API
  const samplePosts: BlogPost[] = [
    {
      id: '1',
      title: 'The Hidden Gems of Varanasi: Beyond the Tourist Trail',
      excerpt: 'Discover the lesser-known corners of the spiritual capital that most visitors never see...',
      content: 'Full content here...',
      author: {
        name: 'Priya Sharma',
        avatar: '/images/hero.jpg'
      },
      publishedAt: '2024-01-15',
      readTime: '8 min read',
      category: 'Travel',
      tags: ['Varanasi', 'Hidden Gems', 'Local Experience'],
      image: '/images/ghats.JPG',
      views: 1247,
      likes: 89,
      isPremium: true,
      status: 'published'
    },
    {
      id: '2',
      title: 'A Culinary Journey Through Varanasi\'s Street Food',
      excerpt: 'From the famous kachoris to the secret family recipes, explore the city\'s food culture...',
      content: 'Full content here...',
      author: {
        name: 'Rahul Verma',
        avatar: '/images/hero2.jpg'
      },
      publishedAt: '2024-01-12',
      readTime: '6 min read',
      category: 'Food',
      tags: ['Street Food', 'Varanasi', 'Cuisine'],
      image: '/images/food.jpg',
      views: 892,
      likes: 67,
      status: 'published'
    },
    {
      id: '3',
      title: 'Photography Guide: Capturing Varanasi\'s Essence',
      excerpt: 'Professional tips and techniques for photographing the city\'s most photogenic moments...',
      content: 'Full content here...',
      author: {
        name: 'Anita Patel',
        avatar: '/images/hero3.jpg'
      },
      publishedAt: '2024-01-10',
      readTime: '10 min read',
      category: 'Photography',
      tags: ['Photography', 'Varanasi', 'Travel Photography'],
      image: '/images/photography.jpg',
      views: 1567,
      likes: 134,
      isPremium: true,
      status: 'published'
    }
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog/posts');
        const data = await response.json();
        if (data.success) {
          setPosts(data.data.posts);
        } else {
          setPosts(samplePosts);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts(samplePosts);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const allPosts: BlogPost[] = posts.length ? posts : samplePosts;
  const featuredPost = allPosts[featuredIndex % allPosts.length];

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  return (
    <div className="min-h-screen bg-white">
      {/* Featured Hero Section */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              {/* Left: text */}
              <div>
                <div className="flex items-center gap-2 text-red-600 font-semibold mb-4">
                  <span className="inline-block h-[2px] w-8 bg-red-600"></span>
                  {featuredPost.category}
                </div>
                <Link href={`/blog/${featuredPost.id}`}>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight font-serif">
                    {featuredPost.title}
                  </h1>
                </Link>
                <div className="mt-6 text-gray-600 font-medium">
                  {formatDate(featuredPost.publishedAt)} <span className="mx-2">•</span> {featuredPost.readTime}
                </div>
                <p className="mt-6 text-gray-700 leading-relaxed max-w-2xl">
                  {featuredPost.excerpt}
                </p>

                <div className="mt-10 flex items-center gap-6">
                  <button
                    aria-label="Previous"
                    className="w-14 h-14 rounded-full border border-gray-300 hover:border-gray-400 flex items-center justify-center transition-colors"
                    onClick={() => setFeaturedIndex((idx) => (idx - 1 + allPosts.length) % allPosts.length)}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    aria-label="Next"
                    className="w-14 h-14 rounded-full border border-gray-300 hover:border-gray-400 flex items-center justify-center transition-colors"
                    onClick={() => setFeaturedIndex((idx) => (idx + 1) % allPosts.length)}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Right: image */}
              <Link href={`/blog/${featuredPost.id}`} className="relative h-[340px] md:h-[520px] lg:h-[640px] block">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                  priority
                />
              </Link>
            </div>
          )}
        </div>
      </section>
      {/* All Posts */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight font-serif">All Posts</h2>
            <div className="h-1 w-16 bg-red-600 mt-4"></div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Two featured posts */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-10">
                {posts.slice(0, 2).map((post) => (
                  <Link key={post.id} href={`/blog/${post.id}`} className="group block">
                    <div className="relative h-[380px] md:h-[460px] overflow-hidden">
                      <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="mt-6">
                      <div className="flex items-center gap-2 text-red-600 font-semibold">
                        <span className="inline-block h-[2px] w-6 bg-red-600"></span>
                        {post.category}
                      </div>
                      <h3 className="mt-3 text-3xl md:text-4xl font-extrabold leading-tight font-serif group-hover:text-gray-700 transition-colors">
                        {post.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Sidebar Hello There */}
              <aside className="bg-white border border-gray-200 p-10 rounded-sm self-start shadow-sm">
                <div className="flex flex-col items-center text-center">
                  <div className="w-44 h-44 rounded-full overflow-hidden mb-6 ring-2 ring-gray-200">
                    <Image src={posts[0]?.author.avatar || '/images/hero.jpg'} alt="Author" width={176} height={176} className="object-cover" />
                  </div>
                  <h3 className="text-3xl font-extrabold mb-3 font-serif">Hello There!</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Welcome to <span className="font-bold">Blogy</span>! My name is Nerrisa and it’s nice to meet you! I’m a wife and mom just trying to make the most of what our family has. If you are looking for real life and not perfection, this blog is for you! I love to write about simple living.
                  </p>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>

      {/* Three-column teaser section (text only) */}
      <section className="py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-3">
              {allPosts.slice(0, 3).map((post, idx) => (
                <Link
                  key={`teaser-${post.id}`}
                  href={`/blog/${post.id}`}
                  className={`block p-8 md:p-10 ${idx > 0 ? 'md:border-l md:border-gray-200' : ''}`}
                >
                  <div className="flex items-center gap-2 text-red-600 font-semibold mb-4">
                    <span className="inline-block h-[2px] w-6 bg-red-600"></span>
                    {post.category}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-extrabold leading-tight font-serif mb-4">
                    {post.title}
                  </h3>
                  <div className="text-gray-600">
                    {formatDate(post.publishedAt)} <span className="mx-2">•</span> {post.readTime}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Latest Posts */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight font-serif">Latest Posts</h2>
            <div className="h-1 w-16 bg-red-600 mt-4"></div>
          </div>

          {!isLoading && (
            <>
              {/* Two large image cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                {posts.slice(0, 2).map((post) => (
                  <Link key={`latest-${post.id}`} href={`/blog/${post.id}`} className="group block relative">
                    <div className="relative h-[360px] md:h-[460px] overflow-hidden">
                      <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    {/* bottom-left overlay card */}
                    <div className="absolute left-6 bottom-6 bg-white shadow-xl p-6 rounded-sm max-w-[85%] border border-gray-200">
                      <div className="flex items-center gap-2 text-red-600 font-semibold">
                        <span className="inline-block h-[2px] w-6 bg-red-600"></span>
                        {post.category}
                      </div>
                      <h3 className="mt-2 text-3xl font-extrabold leading-tight font-serif group-hover:text-gray-700">
                        {post.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Three compact list columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {posts.slice(0, 3).map((post, idx) => (
                  <Link
                    key={`compact-${post.id}`}
                    href={`/blog/${post.id}`}
                    className={`block p-8 hover:shadow-sm transition-shadow ${idx === 1 ? 'border border-dashed border-gray-300' : ''}`}
                  >
                    <div className="flex items-center gap-2 text-red-600 font-semibold mb-4">
                      <span className="inline-block h-[2px] w-6 bg-red-600"></span>
                      {post.category}
                    </div>
                    <h4 className="text-3xl font-extrabold leading-tight mb-3 font-serif">{post.title}</h4>
                    <p className="text-gray-500">{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} • {post.readTime}</p>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
} 