'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, MapPin } from 'lucide-react';

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "London, UK",
      rating: 5,
      text: "WanderMate made my Varanasi journey incredibly meaningful. The AI guidance was spot-on and helped me discover hidden gems I would have never found otherwise!",
      avatar: "SJ",
      verified: true
    },
    {
      id: 2,
      name: "David Chen",
      location: "Singapore",
      rating: 5,
      text: "The personalized recommendations were perfect. From the best ghats to authentic local experiences, WanderMate truly understands what travelers need.",
      avatar: "DC",
      verified: true
    },
    {
      id: 3,
      name: "Priya Mehta",
      location: "Mumbai, India",
      rating: 5,
      text: "Even as an Indian, I learned so much about Varanasi through WanderMate. The cultural insights and spiritual guidance were beautifully curated.",
      avatar: "PM",
      verified: true
    },
    {
      id: 4,
      name: "Michael Brown",
      location: "New York, USA",
      rating: 5,
      text: "Incredible experience! The AI companion felt like having a knowledgeable local friend. Made my solo trip to Varanasi safe and enriching.",
      avatar: "MB",
      verified: true
    }
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-orange-50 to-amber-50">
      <div className="container-width">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="heading-fancy text-3xl md:text-4xl mb-4 text-gray-900">
            Traveler Stories
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Real experiences from fellow wanderers who discovered Varanasi with our AI companion
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="flex justify-between items-start mb-4">
                <Quote className="w-8 h-8 text-orange-500 opacity-60" />
                {testimonial.verified && (
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                    Verified Traveler
                  </span>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <MapPin className="w-3 h-3" />
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-6 shadow-soft"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-orange-600 mb-1">5.0</div>
              <div className="text-gray-600 text-sm">Average Rating</div>
              <div className="flex justify-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-orange-600 mb-1">5000+</div>
              <div className="text-gray-600 text-sm">Happy Travelers</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-orange-600 mb-1">50+</div>
              <div className="text-gray-600 text-sm">Countries</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-orange-600 mb-1">98%</div>
              <div className="text-gray-600 text-sm">Recommend Us</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSection; 