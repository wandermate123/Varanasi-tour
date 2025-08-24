import { NextRequest, NextResponse } from 'next/server';

// Mock database - replace with actual database queries
const mockPosts = [
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
  },
  {
    id: '4',
    title: 'Spiritual Awakening: A Week in Varanasi\'s Temples',
    excerpt: 'Experience the profound spirituality that permeates every corner of this ancient city...',
    content: 'Full content here...',
    author: {
      name: 'Deepak Singh',
      avatar: '/images/hero4.jpg'
    },
    publishedAt: '2024-01-08',
    readTime: '12 min read',
    category: 'Spirituality',
    tags: ['Spirituality', 'Temples', 'Meditation'],
    image: '/images/temples.jpg',
    views: 2034,
    likes: 156,
    isPremium: true,
    status: 'published'
  },
  {
    id: '5',
    title: 'Wellness Retreats: Finding Peace in Varanasi',
    excerpt: 'Discover the healing traditions and wellness practices that have been passed down for generations...',
    content: 'Full content here...',
    author: {
      name: 'Maya Reddy',
      avatar: '/images/hero5.jpg'
    },
    publishedAt: '2024-01-05',
    readTime: '7 min read',
    category: 'Wellness',
    tags: ['Wellness', 'Yoga', 'Healing'],
    image: '/images/wellness.jpg',
    views: 987,
    likes: 78,
    status: 'published'
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') || 'latest';
    const premiumOnly = searchParams.get('premiumOnly') === 'true';
    
    // Filter posts based on query parameters
    let filteredPosts = mockPosts.filter(post => post.status === 'published');
    
    // Filter by category
    if (category && category !== 'all') {
      filteredPosts = filteredPosts.filter(post => post.category === category);
    }
    
    // Filter by search query
    if (search) {
      const searchLower = search.toLowerCase();
      filteredPosts = filteredPosts.filter(post =>
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    // Filter by premium content
    if (premiumOnly) {
      filteredPosts = filteredPosts.filter(post => post.isPremium);
    }
    
    // Sort posts
    switch (sortBy) {
      case 'popular':
        filteredPosts.sort((a, b) => b.views - a.views);
        break;
      case 'trending':
        filteredPosts.sort((a, b) => b.likes - a.likes);
        break;
      case 'latest':
      default:
        filteredPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        break;
    }
    
    // Calculate pagination
    const totalPosts = filteredPosts.length;
    const totalPages = Math.ceil(totalPosts / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
    
    // Calculate metadata
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;
    
    return NextResponse.json({
      success: true,
      data: {
        posts: paginatedPosts,
        pagination: {
          currentPage: page,
          totalPages,
          totalPosts,
          hasNextPage,
          hasPrevPage,
          limit
        },
        filters: {
          category,
          search,
          sortBy,
          premiumOnly
        }
      }
    });
    
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 });
  }
}

// GET single post by ID
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { postId } = body;
    
    if (!postId) {
      return NextResponse.json({
        success: false,
        message: 'Post ID is required'
      }, { status: 400 });
    }
    
    const post = mockPosts.find(p => p.id === postId);
    
    if (!post) {
      return NextResponse.json({
        success: false,
        message: 'Post not found'
      }, { status: 404 });
    }
    
    // In production, increment view count
    // post.views += 1;
    
    return NextResponse.json({
      success: true,
      data: post
    });
    
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 });
  }
} 