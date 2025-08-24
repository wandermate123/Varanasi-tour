'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Compass,
  Twitter,
  Instagram,
  Linkedin,
  Heart,
  Sparkles
} from 'lucide-react';

const Footer = () => {
  const navigationLinks = [
    {
      title: 'Product',
      links: [
        { name: 'AI Guide', href: '/ai-guide' },
        { name: 'Voice Assistant', href: '/voice-assistant' },
        { name: 'Navigation', href: '/navigation' }
      ]
    },
    {
      title: 'Explore',
      links: [
        { name: 'Varanasi Guide', href: '/explore' },
        { name: 'Temples & Ghats', href: '/temples' },
        { name: 'Local Cuisine', href: '/cuisine' },
        { name: 'Travel Blog', href: '/blog' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' }
      ]
    }
  ];

  const socialLinks = [
    { 
      name: 'Twitter', 
      href: 'https://twitter.com/wandermate', 
      icon: Twitter
    },
    { 
      name: 'Instagram', 
      href: 'https://instagram.com/wandermate', 
      icon: Instagram
    },
    { 
      name: 'LinkedIn', 
      href: 'https://linkedin.com/company/wandermate', 
      icon: Linkedin
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <footer className="relative bg-gray-900 text-white">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-black"></div>
        <div className="absolute inset-0 bg-[url('/images/patterns/sacred-geometry.svg')] opacity-[0.02] bg-repeat"></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12"
      >
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16">
            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-2.5 rounded-lg shadow-lg">
                    <Compass className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute -top-0.5 -right-0.5"
                  >
                    <Sparkles className="w-3 h-3 text-amber-400" />
                  </motion.div>
                </div>
                
                <div>
                  <span className="font-display font-bold text-xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-amber-400 group-hover:to-orange-400 transition-all duration-300">
                    Wandermate
                  </span>
                  <div className="text-sm text-gray-400 font-medium">
                    AI Travel Companion
                  </div>
                </div>
              </Link>

              {/* Description */}
              <p className="text-gray-300/90 leading-relaxed font-light max-w-md">
                Your intelligent travel companion for exploring Varanasi's spiritual heritage. 
                Experience the holy city like never before with AI-powered guidance.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300 text-sm">
                  <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Varanasi, Uttar Pradesh, India</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 text-sm">
                  <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>hello@wandermate.ai</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 text-sm">
                  <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>+91 (555) 123-4567</span>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="lg:col-span-2 grid sm:grid-cols-3 gap-8">
              {navigationLinks.map((section) => (
                <div key={section.title} className="space-y-4">
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
                    {section.title}
                  </h4>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link 
                          href={link.href}
                          className="text-gray-400 hover:text-amber-400 transition-colors duration-300 text-sm"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © 2024 Wandermate. All rights reserved. Made with <Heart className="w-3 h-3 inline text-red-500" /> in India
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-4 h-4 text-gray-400 hover:text-white transition-colors duration-300" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer; 