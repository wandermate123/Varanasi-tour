'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function GhatsPage() {
  const [selectedGhat, setSelectedGhat] = useState<string | null>(null);

  const ghats = [
    {
      id: 'dashashwamedh',
      name: 'Dashashwamedh Ghat',
      description: 'The most famous ghat in Varanasi, known for the spectacular Ganga Aarti ceremony held every evening.',
      timing: 'Ganga Aarti: 6:45 PM (Winter) / 7:00 PM (Summer)',
      highlights: ['Evening Ganga Aarti', 'Boat rides', 'Photography', 'Cultural performances'],
      activities: ['Religious ceremonies', 'Boat tours', 'Evening prayers', 'Cultural shows'],
      cost: 'Free viewing, Boat rides: ₹200-500',
      tips: ['Arrive 30 minutes early for good spots', 'Book boat rides in advance', 'Respect religious ceremonies'],
      image: '/images/dashashwamedh-ghat.jpg',
      coordinates: { lat: 25.3176, lng: 83.0168 },
      // Enhanced unique content
      spiritualSignificance: 'According to legend, Lord Brahma performed the Dashashwamedh Yajna here, making it one of the most sacred spots for Hindu rituals. The ghat represents the cosmic dance of creation and destruction.',
      localInsights: [
        'The name "Dashashwamedh" refers to the 10 horses sacrificed in the ancient yajna. Locals believe the energy of this sacrifice still lingers.',
        'The constant moisture on the steps isn\'t just from the river - it\'s from the continuous flow of spiritual energy.'
      ],
      realTimeData: {
        crowdLevel: 'High',
        weatherCondition: 'Clear, 28°C, Perfect for evening aarti',
        ongoingCeremonies: ['Evening Ganga Aarti', 'Individual Pujas'],
        nextAarti: '6:45 PM (in 2 hours)',
        aiInsight: 'Based on current crowd levels, arrive 30 minutes early for the best aarti experience. The energy is particularly strong today.'
      },
      uniqueExperiences: [
        {
          title: 'Participate in Ganga Aarti',
          description: 'Join the sacred fire ceremony where priests perform synchronized rituals with brass lamps.',
          duration: '45 minutes',
          cost: 'Free (Donations welcome)',
          difficulty: 'Easy'
        },
        {
          title: 'Sunrise Boat Meditation',
          description: 'Experience the ghat from the river during the golden hour, with guided meditation.',
          duration: '2 hours',
          cost: '₹800-1200',
          difficulty: 'Moderate'
        }
      ],
      culturalEtiquette: {
        do: ['Remove shoes before stepping on the ghat', 'Dress modestly', 'Maintain silence during ceremonies'],
        dont: ['Don\'t point feet towards the river', 'Avoid loud conversations during ceremonies'],
        specialNotes: ['Women should cover their heads during aarti', 'Photography is allowed but be respectful']
      }
    },
    {
      id: 'assi',
      name: 'Assi Ghat',
      description: 'A peaceful ghat popular among tourists and locals, perfect for morning yoga and sunrise viewing.',
      timing: 'Best time: 5:30 AM - 8:00 AM for sunrise',
      highlights: ['Sunrise viewing', 'Morning yoga', 'Peaceful atmosphere', 'Cafes nearby'],
      activities: ['Yoga sessions', 'Meditation', 'Sunrise photography', 'Boat rides'],
      cost: 'Free access, Yoga classes: ₹300-500',
      tips: ['Early morning visit recommended', 'Carry yoga mat if participating', 'Great for peaceful meditation'],
      image: '/images/assi-ghat.jpg',
      coordinates: { lat: 25.2644, lng: 83.0032 }
    },
    {
      id: 'manikarnika',
      name: 'Manikarnika Ghat',
      description: 'The most sacred cremation ghat, considered the holiest place for Hindu final rites.',
      timing: 'Open 24/7 - Cremations happen throughout the day',
      highlights: ['Sacred cremation site', 'Spiritual significance', 'Ancient traditions', 'Holy atmosphere'],
      activities: ['Spiritual observation', 'Respectful photography', 'Religious rituals', 'Meditation'],
      cost: 'Free access (Photography may require permission)',
      tips: ['Maintain respectful distance', 'Photography with permission only', 'Dress modestly', 'Quiet observation'],
      image: '/images/manikarnika-ghat.jpg',
      coordinates: { lat: 25.3073, lng: 83.0081 }
    },
    {
      id: 'harishchandra',
      name: 'Harishchandra Ghat',
      description: 'Another important cremation ghat with deep mythological significance in Hindu traditions.',
      timing: 'Open 24/7',
      highlights: ['Ancient cremation site', 'Mythological importance', 'Spiritual atmosphere', 'Traditional rituals'],
      activities: ['Spiritual observation', 'Traditional ceremonies', 'Religious study', 'Meditation'],
      cost: 'Free access',
      tips: ['Respect ongoing ceremonies', 'Maintain silence', 'Dress appropriately', 'Photography restrictions'],
      image: '/images/harishchandra-ghat.jpg',
      coordinates: { lat: 25.3045, lng: 83.0098 }
    },
    {
      id: 'man-mandir',
      name: 'Man Mandir Ghat',
      description: 'Known for its beautiful palace architecture and the famous tilted temple due to land subsidence.',
      timing: 'Best time: 6:00 AM - 6:00 PM',
      highlights: ['Palace architecture', 'Tilted Ratneshwar Temple', 'Historical significance', 'Photography spot'],
      activities: ['Architecture photography', 'Historical exploration', 'Boat rides', 'Cultural study'],
      cost: 'Free access, Guided tours: ₹200-400',
      tips: ['Great for architecture photography', 'Visit during golden hour', 'Learn about palace history'],
      image: '/images/man-mandir-ghat.jpg',
      coordinates: { lat: 25.3098, lng: 83.0143 }
    },
    {
      id: 'tulsi',
      name: 'Tulsi Ghat',
      description: 'Named after the great poet Tulsidas, this ghat has literary and spiritual significance.',
      timing: 'Best time: 6:00 AM - 7:00 PM',
      highlights: ['Literary significance', 'Tulsidas connection', 'Peaceful environment', 'Cultural importance'],
      activities: ['Literary exploration', 'Peaceful walks', 'Boat rides', 'Cultural programs'],
      cost: 'Free access',
      tips: ['Learn about Tulsidas history', 'Peaceful for reading', 'Cultural programs sometimes held'],
      image: '/images/tulsi-ghat.jpg',
      coordinates: { lat: 25.3012, lng: 83.0067 }
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-24">
      {/* Navigation */}
      <div className="container max-w-7xl mx-auto px-6 mb-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/#explore" className="hover:text-blue-600 transition-colors">Explore</Link>
          <span>/</span>
          <span className="text-blue-600 font-medium">Ghats</span>
        </nav>
      </div>

      {/* Hero Section */}
      <motion.section 
        className="container max-w-7xl mx-auto px-6 mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 tracking-tight leading-none"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif', letterSpacing: '-0.02em' }}>
            Sacred Ghats
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-light leading-relaxed"
             style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
            Explore the spiritual heart of Varanasi along the sacred banks of the Ganges. Each ghat tells a story of devotion, tradition, and eternal connection to the divine.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <motion.div 
            className="text-center"
            variants={itemVariants}
          >
            <div className="text-3xl font-bold text-blue-600 mb-2">84+</div>
            <div className="text-gray-600">Total Ghats</div>
          </motion.div>
          <motion.div 
            className="text-center"
            variants={itemVariants}
          >
            <div className="text-3xl font-bold text-blue-600 mb-2">5,000+</div>
            <div className="text-gray-600">Years Old</div>
          </motion.div>
          <motion.div 
            className="text-center"
            variants={itemVariants}
          >
            <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
            <div className="text-gray-600">Sacred Access</div>
          </motion.div>
          <motion.div 
            className="text-center"
            variants={itemVariants}
          >
            <div className="text-3xl font-bold text-blue-600 mb-2">Millions</div>
            <div className="text-gray-600">Annual Visitors</div>
          </motion.div>
        </div>
      </motion.section>

      {/* Ghats Grid */}
      <motion.section 
        className="container max-w-7xl mx-auto px-6 mb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ghats.map((ghat, index) => (
            <motion.div
              key={ghat.id}
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 group cursor-pointer"
              onClick={() => setSelectedGhat(selectedGhat === ghat.id ? null : ghat.id)}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600"></div>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-2"
                      style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                    {ghat.name}
                  </h3>
                  <p className="text-blue-100 text-sm font-medium">
                    {ghat.timing}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 mb-4 line-clamp-3"
                   style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                  {ghat.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {ghat.highlights.slice(0, 3).map((highlight, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-600 text-xs rounded-full font-medium">
                      {highlight}
                    </span>
                  ))}
                </div>

                <motion.button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {selectedGhat === ghat.id ? 'Hide Details' : 'View Details'}
                </motion.button>
                
                {/* Real-time Status Indicator */}
                {ghat.realTimeData && (
                  <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-green-700 font-medium">Live Status</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        ghat.realTimeData.crowdLevel === 'Low' ? 'bg-green-100 text-green-800' :
                        ghat.realTimeData.crowdLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {ghat.realTimeData.crowdLevel} Activity
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{ghat.realTimeData.aiInsight}</p>
                  </div>
                )}

                {/* Expanded Details */}
                {selectedGhat === ghat.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 pt-6 border-t border-gray-200"
                  >
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Activities</h4>
                        <div className="flex flex-wrap gap-2">
                          {ghat.activities.map((activity, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                              {activity}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Cost Information</h4>
                        <p className="text-gray-600 text-sm">{ghat.cost}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Tips</h4>
                        <ul className="text-gray-600 text-sm space-y-1">
                          {ghat.tips.map((tip, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-blue-600 mr-2">•</span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Enhanced Unique Content */}
                      {ghat.spiritualSignificance && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Spiritual Significance</h4>
                          <p className="text-gray-600 text-sm mb-3">{ghat.spiritualSignificance}</p>
                        </div>
                      )}
                      
                      {ghat.localInsights && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Local Insights</h4>
                          <div className="space-y-2">
                            {ghat.localInsights.map((insight, idx) => (
                              <div key={idx} className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                                <p className="text-gray-700 text-sm">{insight}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {ghat.uniqueExperiences && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Unique Experiences</h4>
                          <div className="space-y-3">
                            {ghat.uniqueExperiences.map((experience, idx) => (
                              <div key={idx} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 border border-blue-200">
                                <div className="flex justify-between items-start mb-2">
                                  <h5 className="font-medium text-gray-900 text-sm">{experience.title}</h5>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    experience.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                                    experience.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                  }`}>
                                    {experience.difficulty}
                                  </span>
                                </div>
                                <p className="text-gray-600 text-xs mb-2">{experience.description}</p>
                                <div className="flex justify-between text-xs text-gray-500">
                                  <span>⏱️ {experience.duration}</span>
                                  <span>💰 {experience.cost}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {ghat.culturalEtiquette && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Cultural Etiquette</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h5 className="text-sm font-medium text-green-700 mb-2">✅ Do's</h5>
                              <ul className="text-gray-600 text-xs space-y-1">
                                {ghat.culturalEtiquette.do.map((item, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <span className="text-green-600 mr-1">•</span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h5 className="text-sm font-medium text-red-700 mb-2">❌ Don'ts</h5>
                              <ul className="text-gray-600 text-xs space-y-1">
                                {ghat.culturalEtiquette.dont.map((item, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <span className="text-red-600 mr-1">•</span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          {ghat.culturalEtiquette.specialNotes && (
                            <div className="mt-3 bg-blue-50 rounded-lg p-3">
                              <h5 className="text-sm font-medium text-blue-800 mb-2">💡 Special Notes</h5>
                              <ul className="text-gray-600 text-xs space-y-1">
                                {ghat.culturalEtiquette.specialNotes.map((note, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <span className="text-blue-600 mr-1">•</span>
                                    {note}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="bg-gradient-to-r from-blue-600 to-blue-800 py-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
            Ready to Experience the Sacred Ghats?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto"
             style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
            Book a guided tour or plan your spiritual journey to Varanasi's most sacred ghats
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-xl transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Ghat Tour
            </motion.button>
            <motion.button
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-8 rounded-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Plan Your Visit
            </motion.button>
          </div>
        </div>
      </motion.section>
    </div>
  );
} 