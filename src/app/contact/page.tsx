'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, User, MessageSquare } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travelStyle: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const travelStyles = [
    'Solo Explorer',
    'Couple Travel',
    'Family Adventure',
    'Group Journey',
    'Spiritual Seeker',
    'Cultural Enthusiast',
    'Photography Focus',
    'Food & Culture'
  ];

  const benefits = [
    {
      icon: '🎯',
      title: 'Early Access',
      description: 'Be among the first to experience Wandermate in Varanasi'
    },
    {
      icon: '💰',
      title: 'Special Pricing',
      description: 'Exclusive discounts for early adopters'
    },
    {
      icon: '🤝',
      title: 'Shape the Product',
      description: 'Your feedback will directly influence our development'
    },
    {
      icon: '🎁',
      title: 'Beta Perks',
      description: 'Free premium features during the beta period'
    }
  ];

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <Header />
        <div className="pt-20 pb-20 flex items-center justify-center min-h-screen">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-md mx-auto text-center bg-white rounded-2xl p-8 shadow-xl"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
              Welcome to the Journey!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for joining our waitlist. We'll keep you updated on our progress and notify you when Wandermate is ready for your Varanasi adventure.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-primary-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-700 transition-colors duration-200"
            >
              Submit Another Response
            </button>
          </motion.div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Join the Waitlist
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-6">
              Be Part of the
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-500">
                {' '}Travel Revolution
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Join our exclusive waitlist and be among the first to experience AI-powered travel in Varanasi. 
              Your journey to the spiritual capital of India will never be the same.
            </p>
            
            {/* Stats */}
            <div className="flex justify-center space-x-8 text-sm text-gray-600">
              <div>🚀 <span className="font-semibold">Launching Soon</span></div>
              <div>👥 <span className="font-semibold">500+ Already Joined</span></div>
              <div>🎯 <span className="font-semibold">Limited Beta Spots</span></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Left Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl p-8 shadow-xl"
            >
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
                Reserve Your Spot
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number (Optional)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="travelStyle" className="block text-sm font-medium text-gray-700 mb-2">
                    Travel Style
                  </label>
                  <select
                    id="travelStyle"
                    name="travelStyle"
                    value={formData.travelStyle}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                  >
                    <option value="">Select your travel style</option>
                    {travelStyles.map((style) => (
                      <option key={style} value={style}>{style}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    What excites you most about AI-guided travel?
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 resize-none"
                      placeholder="Tell us about your travel interests..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <Send className="w-5 h-5" />
                  <span>Join the Waitlist</span>
                </button>
              </form>

              <p className="text-sm text-gray-500 mt-4 text-center">
                By joining, you agree to receive updates about Wandermate. Unsubscribe anytime.
              </p>
            </motion.div>

            {/* Right Column - Benefits & Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Benefits */}
              <div>
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
                  Waitlist Benefits
                </h3>
                <div className="grid gap-6">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-md"
                    >
                      <div className="text-2xl">{benefit.icon}</div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {benefit.title}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {benefit.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-xl font-display font-bold text-gray-900 mb-4">
                  Have Questions?
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Mail className="w-5 h-5" />
                    <span>hello@wandermate.ai</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Phone className="w-5 h-5" />
                    <span>+91 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <span>Varanasi, Uttar Pradesh, India</span>
                  </div>
                </div>
              </div>

              {/* Social Proof */}
              <div className="bg-gradient-to-r from-primary-600 to-accent-500 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-display font-bold mb-4">
                  Join Fellow Travelers
                </h3>
                <p className="mb-4 opacity-90">
                  Be part of a community of adventurous travelers who believe in smarter, more connected journeys.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm opacity-80">Travelers already on the waitlist</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ContactPage; 