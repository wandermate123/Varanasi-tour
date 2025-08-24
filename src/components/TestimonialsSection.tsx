'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  Quote, 
  Users, 
  TrendingUp, 
  Award,
  CheckCircle,
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
      image: '/images/ai-guide.jpg',
      rating: 5,
      date: '2 weeks ago',
      experience: 'Spiritual Journey',
      testimonial: 'Wandermate transformed my Varanasi experience completely. The expert guides knew exactly when to visit each ghat for the perfect sunrise view, and the cultural insights were incredibly deep and meaningful.',
      highlights: ['Perfect timing recommendations', 'Deep cultural insights', 'Solo travel safety'],
      verified: true
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      location: 'London, UK',
      role: 'Cultural Enthusiast',
      image: '/images/hero2.jpg',
      rating: 5,
      date: '1 month ago',
      experience: 'Heritage Tour',
      testimonial: 'As someone passionate about history, I was amazed by the detailed stories shared about each temple and monument. It felt like having a personal historian and local guide combined.',
      highlights: ['Historical accuracy', 'Personalized narratives', 'Hidden gem discoveries'],
      verified: true
    },
    {
      id: 3,
      name: 'Priya Sharma',
      location: 'Mumbai, India',
      role: 'Group Leader',
      image: '/images/hero3.jpg',
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
      image: '/images/photography.jpg',
      rating: 5,
      date: '1 week ago',
      experience: 'Photo Walk',
      testimonial: 'The photography guidance was exceptional. Our guide suggested the best photography spots at golden hour and provided insights into the cultural significance of each location.',
      highlights: ['Expert photography guidance', 'Golden hour timing', 'Cultural context'],
      verified: true
    },
    {
      id: 5,
      name: 'Elena Rodriguez',
      location: 'Barcelona, Spain',
      role: 'Spiritual Seeker',
      image: '/images/wellness.jpg',
      rating: 5,
      date: '2 months ago',
      experience: 'Meditation Retreat',
      testimonial: 'The spiritual guidance was profound and authentic. Our guide understood my interest in meditation and spirituality, guiding me to peaceful spots away from crowds.',
      highlights: ['Personalized spirituality', 'Peaceful locations', 'Authentic guidance'],
      verified: true
    }
  ];

  const stats = [
    {
      icon: Users,
      label: 'Happy Travelers',
      value: '2,500+',
      description: 'Joined our community',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: TrendingUp,
      label: 'Success Rate',
      value: '98%',
      description: 'Satisfaction rate',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Award,
      label: 'Awards Won',
      value: '15+',
      description: 'Industry recognition',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: CheckCircle,
      label: 'Experiences',
      value: '50+',
      description: 'Curated tours',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  // Auto-advance testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, testimonials.length]);

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const nextTestimonial = () => {
    goToTestimonial((currentTestimonial + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    goToTestimonial((currentTestimonial - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our Travelers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover why thousands of travelers choose Wandermate for their Varanasi experience
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-sm font-medium text-gray-600 mb-1">{stat.label}</div>
              <div className="text-xs text-gray-500">{stat.description}</div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="mb-8">
                <Quote className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonials[currentTestimonial].testimonial}"
                </p>
              </div>

              {/* Testimonial Author */}
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonials[currentTestimonial].role} • {testimonials[currentTestimonial].location}
                  </div>
                  <div className="flex items-center space-x-1 mt-1">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Experience Highlights */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {testimonials[currentTestimonial].highlights.map((highlight, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                  >
                    {highlight}
                  </span>
                ))}
              </div>

              {/* Experience Type */}
              <div className="text-sm text-gray-500">
                Experience: {testimonials[currentTestimonial].experience}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>

            {/* Dots */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial
                      ? 'bg-blue-600 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <ArrowRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Ready to Experience Varanasi?
          </h3>
          <p className="text-gray-600 mb-6">
            Join thousands of satisfied travelers who have discovered the magic of Varanasi with us
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Book Your Experience
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 