'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface GhatDetail {
  id: string;
  name: string;
  description: string;
  spiritualSignificance: string;
  historicalContext: string;
  currentRituals: string[];
  bestTimes: {
    sunrise: string;
    sunset: string;
    aarti: string;
    meditation: string;
  };
  uniqueExperiences: {
    title: string;
    description: string;
    duration: string;
    cost: string;
    difficulty: 'Easy' | 'Moderate' | 'Challenging';
  }[];
  localInsights: {
    title: string;
    content: string;
    source: string;
  }[];
  culturalEtiquette: {
    do: string[];
    dont: string[];
    specialNotes: string[];
  };
  photographyGuide: {
    bestAngles: string[];
    goldenHours: string[];
    restrictions: string[];
    tips: string[];
  };
  realTimeData: {
    crowdLevel: 'Low' | 'Medium' | 'High';
    weatherCondition: string;
    ongoingCeremonies: string[];
    nextAarti: string;
  };
  aiInsights: {
    currentMood: string;
    personalizedTip: string;
    culturalContext: string;
  };
}

export default function GhatDetailPage() {
  const params = useParams();
  const ghatId = params.id as string;
  const [ghat, setGhat] = useState<GhatDetail | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [showAIChat, setShowAIChat] = useState(false);

  // Mock data - in real app, this would come from API
  const ghatData: Record<string, GhatDetail> = {
    'dashashwamedh': {
      id: 'dashashwamedh',
      name: 'Dashashwamedh Ghat',
      description: 'The most famous ghat in Varanasi, known for the spectacular Ganga Aarti ceremony held every evening.',
      spiritualSignificance: 'According to legend, Lord Brahma performed the Dashashwamedh Yajna here, making it one of the most sacred spots for Hindu rituals. The ghat represents the cosmic dance of creation and destruction, where devotees seek moksha (liberation).',
      historicalContext: 'Built in the 18th century by Peshwa Balaji Baji Rao, this ghat has witnessed countless spiritual seekers, royal processions, and cultural transformations. The architecture reflects the Maratha style with intricate carvings and spiritual symbolism.',
      currentRituals: [
        'Morning Ganga Snan (Sacred Bath)',
        'Evening Ganga Aarti (6:45 PM)',
        'Daily Puja Ceremonies',
        'Mangal Aarti at Sunrise'
      ],
      bestTimes: {
        sunrise: '5:30 AM - 6:30 AM',
        sunset: '6:00 PM - 7:00 PM',
        aarti: '6:45 PM (Winter) / 7:00 PM (Summer)',
        meditation: '4:00 AM - 6:00 AM'
      },
      uniqueExperiences: [
        {
          title: 'Participate in Ganga Aarti',
          description: 'Join the sacred fire ceremony where priests perform synchronized rituals with brass lamps, creating a mesmerizing spiritual spectacle.',
          duration: '45 minutes',
          cost: 'Free (Donations welcome)',
          difficulty: 'Easy'
        },
        {
          title: 'Sunrise Boat Meditation',
          description: 'Experience the ghat from the river during the golden hour, with guided meditation and spiritual discourse.',
          duration: '2 hours',
          cost: '₹800-1200',
          difficulty: 'Moderate'
        },
        {
          title: 'Sacred Geometry Photography',
          description: 'Learn to capture the spiritual essence through architectural photography, focusing on sacred geometry and light patterns.',
          duration: '3 hours',
          cost: '₹1500',
          difficulty: 'Challenging'
        }
      ],
      localInsights: [
        {
          title: 'The Hidden Story of the 10 Horses',
          content: 'The name "Dashashwamedh" refers to the 10 horses sacrificed in the ancient yajna. Locals believe the energy of this sacrifice still lingers, making prayers here especially powerful.',
          source: 'Local Priest, Pandit Ram Kumar'
        },
        {
          title: 'Why the Steps Are Always Wet',
          content: 'The constant moisture on the steps isn\'t just from the river - it\'s from the continuous flow of spiritual energy. Devotees believe this moisture carries the blessings of the Ganga.',
          source: 'Ghat Guide, Rajesh Singh'
        }
      ],
      culturalEtiquette: {
        do: [
          'Remove shoes before stepping on the ghat',
          'Dress modestly covering shoulders and knees',
          'Maintain silence during ceremonies',
          'Ask permission before taking photos of people',
          'Participate in aarti with respect and devotion'
        ],
        dont: [
          'Don\'t point feet towards the river or temples',
          'Avoid loud conversations during ceremonies',
          'Don\'t touch or disturb ongoing rituals',
          'Avoid wearing revealing clothing',
          'Don\'t enter restricted areas without permission'
        ],
        specialNotes: [
          'Women should cover their heads during aarti',
          'Photography is allowed but be respectful',
          'Donations are voluntary but appreciated',
          'Best to visit with a local guide for first-time visitors'
        ]
      },
      photographyGuide: {
        bestAngles: [
          'From the river during golden hour',
          'Top of the steps looking down',
          'Side angles capturing the palace architecture',
          'Close-ups of the aarti ceremony'
        ],
        goldenHours: [
          '5:30 AM - 6:30 AM (Sunrise)',
          '6:00 PM - 7:00 PM (Sunset)',
          'During aarti ceremony (6:45 PM)'
        ],
        restrictions: [
          'No flash photography during ceremonies',
          'Respect privacy of worshippers',
          'Some areas may be restricted during special events'
        ],
        tips: [
          'Use wide-angle lens for architectural shots',
          'Capture the reflection of lamps in the water',
          'Focus on the expressions of devotion',
          'Include the palace backdrop in compositions'
        ]
      },
      realTimeData: {
        crowdLevel: 'High',
        weatherCondition: 'Clear, 28°C, Perfect for evening aarti',
        ongoingCeremonies: ['Evening Ganga Aarti', 'Individual Pujas'],
        nextAarti: '6:45 PM (in 2 hours)'
      },
      aiInsights: {
        currentMood: 'Spiritual and vibrant - perfect energy for evening prayers',
        personalizedTip: 'Based on current crowd levels, arrive 30 minutes early for the best aarti experience. The energy is particularly strong today.',
        culturalContext: 'Today is an auspicious day in the Hindu calendar, making the aarti ceremony especially powerful. Many devotees are performing special prayers.'
      }
    }
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setGhat(ghatData[ghatId] || null);
      setIsLoading(false);
    }, 1000);
  }, [ghatId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading sacred insights...</p>
        </div>
      </div>
    );
  }

  if (!ghat) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Ghat Not Found</h1>
          <p className="text-gray-600 mb-6">The sacred ghat you're looking for doesn't exist.</p>
          <Link href="/explore/ghats" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Explore All Ghats
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-24">
      {/* Navigation */}
      <div className="container max-w-7xl mx-auto px-6 mb-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/explore/ghats" className="hover:text-blue-600 transition-colors">Ghats</Link>
          <span>/</span>
          <span className="text-blue-600 font-medium">{ghat.name}</span>
        </nav>
      </div>

      {/* Hero Section */}
      <motion.section 
        className="container max-w-7xl mx-auto px-6 mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Hero Image */}
          <div className="relative h-96 bg-gradient-to-br from-blue-400 to-blue-600">
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-4xl md:text-5xl font-black text-white mb-4"
                  style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                {ghat.name}
              </h1>
              <p className="text-blue-100 text-lg max-w-3xl"
                 style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                {ghat.description}
              </p>
            </div>
          </div>

          {/* Real-time Status Bar */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 border-b">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">Current Status</div>
                <div className="text-lg font-semibold text-green-600">{ghat.realTimeData.crowdLevel} Activity</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">Weather</div>
                <div className="text-lg font-semibold text-blue-600">{ghat.realTimeData.weatherCondition}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">Next Aarti</div>
                <div className="text-lg font-semibold text-orange-600">{ghat.realTimeData.nextAarti}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">AI Insight</div>
                <div className="text-lg font-semibold text-purple-600">Optimal Visit Time</div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* AI Chat Button */}
      <motion.div 
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        <button
          onClick={() => setShowAIChat(!showAIChat)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      </motion.div>

      {/* AI Chat Panel */}
      <AnimatePresence>
        {showAIChat && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed bottom-24 right-6 w-80 bg-white rounded-2xl shadow-2xl border z-50"
          >
            <div className="p-4 border-b">
              <h3 className="font-semibold text-gray-900">AI Travel Companion</h3>
              <p className="text-sm text-gray-600">Ask me anything about {ghat.name}</p>
            </div>
            <div className="p-4 max-h-96 overflow-y-auto">
              <div className="bg-blue-50 rounded-lg p-3 mb-3">
                <p className="text-sm text-gray-700">{ghat.aiInsights.personalizedTip}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <p className="text-sm text-gray-700">{ghat.aiInsights.culturalContext}</p>
              </div>
            </div>
            <div className="p-4 border-t">
              <input
                type="text"
                placeholder="Ask about rituals, timing, or cultural insights..."
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Tabs */}
      <motion.section 
        className="container max-w-7xl mx-auto px-6 mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b">
            {[
              { id: 'overview', label: 'Overview', icon: '🏛️' },
              { id: 'experiences', label: 'Unique Experiences', icon: '🌟' },
              { id: 'insights', label: 'Local Insights', icon: '💡' },
              { id: 'etiquette', label: 'Cultural Etiquette', icon: '🙏' },
              { id: 'photography', label: 'Photography Guide', icon: '📸' },
              { id: 'timing', label: 'Best Times', icon: '⏰' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Spiritual Significance</h3>
                    <p className="text-gray-700 leading-relaxed">{ghat.spiritualSignificance}</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Historical Context</h3>
                    <p className="text-gray-700 leading-relaxed">{ghat.historicalContext}</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Current Rituals</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {ghat.currentRituals.map((ritual, index) => (
                        <div key={index} className="bg-blue-50 rounded-lg p-4">
                          <p className="text-blue-800 font-medium">{ritual}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'experiences' && (
                <motion.div
                  key="experiences"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Unique Experiences</h3>
                  {ghat.uniqueExperiences.map((experience, index) => (
                    <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-xl font-bold text-gray-900">{experience.title}</h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          experience.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                          experience.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {experience.difficulty}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-4">{experience.description}</p>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>⏱️ {experience.duration}</span>
                        <span>💰 {experience.cost}</span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'insights' && (
                <motion.div
                  key="insights"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Local Insights</h3>
                  {ghat.localInsights.map((insight, index) => (
                    <div key={index} className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                      <h4 className="text-lg font-bold text-gray-900 mb-3">{insight.title}</h4>
                      <p className="text-gray-700 mb-4">{insight.content}</p>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Source:</span> {insight.source}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'etiquette' && (
                <motion.div
                  key="etiquette"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Cultural Etiquette</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-bold text-green-700 mb-4">✅ Do's</h4>
                      <ul className="space-y-2">
                        {ghat.culturalEtiquette.do.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-600 mr-2">•</span>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-red-700 mb-4">❌ Don'ts</h4>
                      <ul className="space-y-2">
                        {ghat.culturalEtiquette.dont.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-red-600 mr-2">•</span>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-blue-800 mb-4">💡 Special Notes</h4>
                    <ul className="space-y-2">
                      {ghat.culturalEtiquette.specialNotes.map((note, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span className="text-gray-700">{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}

              {activeTab === 'photography' && (
                <motion.div
                  key="photography"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Photography Guide</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-4">📐 Best Angles</h4>
                      <ul className="space-y-2">
                        {ghat.photographyGuide.bestAngles.map((angle, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-blue-600 mr-2">•</span>
                            <span className="text-gray-700">{angle}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-4">🌅 Golden Hours</h4>
                      <ul className="space-y-2">
                        {ghat.photographyGuide.goldenHours.map((time, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-orange-600 mr-2">•</span>
                            <span className="text-gray-700">{time}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="bg-red-50 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-red-800 mb-4">⚠️ Restrictions</h4>
                    <ul className="space-y-2">
                      {ghat.photographyGuide.restrictions.map((restriction, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-red-600 mr-2">•</span>
                          <span className="text-gray-700">{restriction}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-green-50 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-green-800 mb-4">💡 Pro Tips</h4>
                    <ul className="space-y-2">
                      {ghat.photographyGuide.tips.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-600 mr-2">•</span>
                          <span className="text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}

              {activeTab === 'timing' && (
                <motion.div
                  key="timing"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Best Times to Visit</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(ghat.bestTimes).map(([key, time]) => (
                      <div key={key} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
                        <h4 className="text-lg font-bold text-gray-900 mb-2 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </h4>
                        <p className="text-2xl font-bold text-blue-600">{time}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
            Experience {ghat.name} Like Never Before
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto"
             style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
            Book a personalized guided experience with our local experts and AI companion
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-xl transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Guided Tour
            </motion.button>
            <motion.button
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-8 rounded-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Chat with AI Guide
            </motion.button>
          </div>
        </div>
      </motion.section>
    </div>
  );
} 