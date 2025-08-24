'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  Quote, 
  ThumbsUp, 
  Users, 
  TrendingUp, 
  Award,
  Heart,
  MessageCircle,
  CheckCircle,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  MapPin,
  Clock
} from 'lucide-react';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Chen',
      location: 'San Francisco, USA',
      role: 'Solo Traveler',
      image: '👩‍💼',
      rating: 5,
      date: '2 weeks ago',
      experience: 'Spiritual Journey',
      testimonial: 'Wandermate transformed my Varanasi experience completely. The AI guide knew exactly when to visit each ghat for the perfect sunrise view, and the cultural insights were incredibly deep and meaningful.',
      highlights: ['Perfect timing recommendations', 'Deep cultural insights', 'Solo travel safety'],
      verified: true
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      location: 'London, UK',
      role: 'Cultural Enthusiast',
      image: '👨‍🎨',
      rating: 5,
      date: '1 month ago',
      experience: 'Heritage Tour',
      testimonial: 'As someone passionate about history, I was amazed by the detailed stories the AI shared about each temple and monument. It felt like having a personal historian and local guide combined.',
      highlights: ['Historical accuracy', 'Personalized narratives', 'Hidden gem discoveries'],
      verified: true
    },
    {
      id: 3,
      name: 'Priya Sharma',
      location: 'Mumbai, India',
      role: 'Group Leader',
      image: '👩‍🏫',
      rating: 5,
      date: '3 weeks ago',
      experience: 'Family Trip',
      testimonial: 'Managing a group of 8 family members in Varanasi seemed daunting, but Wandermate made it effortless. The group coordination features and real-time updates kept everyone together and informed.',
      highlights: ['Group coordination', 'Real-time updates', 'Family-friendly routes'],
      verified: true
    },
    {
      id: 4,
      name: 'David Kim',
      location: 'Seoul, Korea',
      role: 'Photography Enthusiast',
      image: '📸',
      rating: 5,
      date: '1 week ago',
      experience: 'Photo Walk',
      testimonial: 'The photo recognition feature blew my mind. Point the camera at any artwork or architecture, and instantly get the full story. Plus, the AI suggested the best photography spots at golden hour.',
      highlights: ['Photo recognition', 'Golden hour timing', 'Composition suggestions'],
      verified: true
    },
    {
      id: 5,
      name: 'Elena Rodriguez',
      location: 'Barcelona, Spain',
      role: 'Spiritual Seeker',
      image: '🧘‍♀️',
      rating: 5,
      date: '2 months ago',
      experience: 'Meditation Retreat',
      testimonial: 'The AI understood my interest in meditation and spirituality, guiding me to peaceful spots away from crowds. The voice assistant even helped me learn basic Sanskrit mantras.',
      highlights: ['Personalized spirituality', 'Peaceful locations', 'Language learning'],
      verified: true
    }
  ];

  const stats = [
    {
      icon: Users,
      label: 'Happy Travelers',
      value: '2,500+',
      description: 'Joined our community',
      color: 'from-primary-500 to-primary-600'
    },
    {
      icon: Star,
      label: 'Average Rating',
      value: '4.9/5',
      description: 'Consistently excellent',
      color: 'from-yellow-400 to-yellow-500'
    },
    {
      icon: TrendingUp,
      label: 'Satisfaction Rate',
      value: '98%',
      description: 'Would recommend',
      color: 'from-green-400 to-green-500'
    },
    {
      icon: Award,
      label: 'Places Covered',
      value: '50K+',
      description: 'Locations mapped',
      color: 'from-accent-500 to-accent-600'
    }
  ];

  const achievements = [
    {
      icon: CheckCircle,
      title: 'AI-Powered Precision',
      description: '99.7% accuracy in recommendations and directions'
    },
    {
      icon: Heart,
      title: 'Loved by Travelers',
      description: '4.9/5 rating from 2,500+ verified users'
    },
    {
      icon: MessageCircle,
      title: 'Real-time Support',
      description: '24/7 AI assistance in 15+ languages'
    },
    {
      icon: Award,
      title: 'Industry Recognition',
      description: 'Featured in top travel tech publications'
    }
  ];

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, testimonials.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  const testimonialVariants = {
    enter: {
      x: 300,
      opacity: 0,
      scale: 0.9
    },
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: {
      x: -300,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.3
      }
    }
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative py-24 sm:py-32 lg:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-white to-accent-50/30">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-50/20 via-transparent to-primary-50/20"></div>
        <div className="absolute inset-0 noise-texture opacity-[0.02]"></div>
      </div>

      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -50, 0],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 12 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.2
            }}
            className={`absolute rounded-full ${
              i % 5 === 0 ? 'w-16 h-16 bg-primary-200/20' :
              i % 5 === 1 ? 'w-20 h-20 bg-accent-200/15' :
              i % 5 === 2 ? 'w-12 h-12 bg-yellow-200/25' :
              i % 5 === 3 ? 'w-24 h-24 bg-green-200/20' :
              'w-18 h-18 bg-travel-temple/15'
            } blur-xl`}
            style={{
              left: `${8 + (i * 10)}%`,
              top: `${10 + (i * 8)}%`,
            }}
          />
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center space-y-8 mb-20">
          <motion.div
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-accent-100 to-primary-100 border border-accent-200/50 shadow-soft"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Heart className="w-5 h-5 mr-3 text-accent-600" />
            <span className="text-accent-800 font-medium">Loved by Travelers</span>
          </motion.div>
          
          <div className="space-y-6">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold">
              <motion.span
                className="block bg-gradient-to-r from-neutral-900 via-accent-800 to-primary-700 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  backgroundSize: '200% 200%',
                }}
              >
                Stories from Travelers
              </motion.span>
              <span className="block text-neutral-700 mt-2">Around the World</span>
            </h2>
            
            <p className="text-xl sm:text-2xl text-neutral-600 leading-relaxed max-w-3xl mx-auto">
              Discover how Wandermate has transformed travel experiences for thousands of explorers in Varanasi.
            </p>
          </div>
        </motion.div>

        {/* Main Testimonial Carousel */}
        <motion.div variants={itemVariants} className="mb-20">
          <div className="relative max-w-4xl mx-auto">
            {/* Navigation buttons */}
            <button
              onClick={prevTestimonial}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 bg-white rounded-full p-3 shadow-glow hover:shadow-luxurious transition-all duration-300 group"
            >
              <ArrowLeft className="w-6 h-6 text-neutral-600 group-hover:text-primary-600 transition-colors duration-300" />
            </button>
            
            <button
              onClick={nextTestimonial}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 bg-white rounded-full p-3 shadow-glow hover:shadow-luxurious transition-all duration-300 group"
            >
              <ArrowRight className="w-6 h-6 text-neutral-600 group-hover:text-primary-600 transition-colors duration-300" />
            </button>

            {/* Testimonial Card */}
            <div className="relative bg-white rounded-3xl shadow-luxurious border border-neutral-100 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-50/50 via-transparent to-primary-50/50"></div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  variants={testimonialVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="relative p-8 lg:p-12 space-y-8"
                >
                  {/* Quote Icon */}
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-16 h-16 bg-gradient-to-br from-accent-500 to-primary-500 rounded-2xl flex items-center justify-center shadow-glow"
                  >
                    <Quote className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Testimonial Content */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    
                    <blockquote className="text-2xl lg:text-3xl text-neutral-800 leading-relaxed font-medium">
                      "{testimonials[currentTestimonial].testimonial}"
                    </blockquote>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-3">
                      {testimonials[currentTestimonial].highlights.map((highlight, idx) => (
                        <motion.div
                          key={highlight}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 + idx * 0.1 }}
                          className="px-4 py-2 bg-gradient-to-r from-accent-100 to-primary-100 rounded-full text-sm font-medium text-neutral-700"
                        >
                          {highlight}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center justify-between pt-8 border-t border-neutral-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center text-2xl shadow-soft">
                        {testimonials[currentTestimonial].image}
                      </div>
                      <div>
                        <div className="flex items-center space-x-3">
                          <h4 className="text-xl font-bold text-neutral-900">
                            {testimonials[currentTestimonial].name}
                          </h4>
                          {testimonials[currentTestimonial].verified && (
                            <div className="flex items-center space-x-1 text-green-600">
                              <CheckCircle className="w-4 h-4" />
                              <span className="text-xs font-medium">Verified</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-neutral-600 text-sm">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{testimonials[currentTestimonial].location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{testimonials[currentTestimonial].date}</span>
                          </div>
                        </div>
                        <div className="mt-1">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent-100 text-accent-700">
                            {testimonials[currentTestimonial].experience}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center space-x-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'bg-gradient-to-r from-accent-500 to-primary-500 shadow-glow scale-125'
                      : 'bg-neutral-300 hover:bg-neutral-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="mb-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center space-y-4 group"
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-soft group-hover:shadow-glow transition-all duration-300`}>
                  <stat.icon className="w-10 h-10 text-white" />
                </div>
                <div>
                  <div className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-lg font-semibold text-neutral-700 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-neutral-500">
                    {stat.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements Grid */}
        <motion.div variants={itemVariants} className="mb-20">
          <div className="text-center mb-16">
            <h3 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Why Choose <span className="gradient-text">Wandermate</span>
            </h3>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Built with cutting-edge technology and deep local expertise to deliver exceptional travel experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                className="group relative bg-white rounded-2xl p-8 shadow-soft hover:shadow-glow transition-all duration-300 border border-neutral-100 hover:border-accent-200"
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-primary-500 rounded-xl flex items-center justify-center shadow-soft group-hover:shadow-glow transition-all duration-300 flex-shrink-0">
                    <achievement.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-accent-700 transition-colors duration-300">
                      {achievement.title}
                    </h4>
                    <p className="text-neutral-600 leading-relaxed group-hover:text-neutral-700 transition-colors duration-300">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div variants={itemVariants} className="text-center">
          <div className="bg-gradient-to-br from-accent-500 via-primary-500 to-accent-600 rounded-3xl p-8 lg:p-12 text-white shadow-luxurious">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 mx-auto mb-8 bg-white/20 rounded-2xl flex items-center justify-center"
            >
              <Sparkles className="w-10 h-10 text-white" />
            </motion.div>
            
            <div className="space-y-6">
              <h3 className="text-3xl sm:text-4xl font-bold">
                Ready to Create Your Own Story?
              </h3>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Join thousands of travelers who have discovered the magic of Varanasi with Wandermate. Your journey awaits.
              </p>
              
              <motion.button
                className="inline-flex items-center space-x-3 bg-white text-accent-700 px-10 py-5 rounded-2xl font-bold text-lg shadow-glow hover:shadow-luxurious transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Join the Waitlist</span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  ✨
                </motion.div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TestimonialsSection; 