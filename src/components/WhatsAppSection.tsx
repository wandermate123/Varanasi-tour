'use client';

import { motion } from 'framer-motion';
import { FaWhatsapp, FaPhone, FaEnvelope } from 'react-icons/fa';

export default function WhatsAppSection() {
  const handleWhatsAppClick = () => {
    const message = "Hi! I'm interested in exploring Varanasi. Can you help me plan my trip?";
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCallClick = () => {
    window.open('tel:+919876543210', '_blank');
  };

  const handleEmailClick = () => {
    window.open('mailto:info@varanasi-tourism.com', '_blank');
  };

  return (
    <section className="bg-gradient-to-r from-green-600 to-green-700 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get in Touch with Us
          </h2>
          <p className="text-lg text-green-100 max-w-3xl mx-auto">
            Have questions about your Varanasi adventure? Our travel experts are here to help you 
            plan the perfect spiritual journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* WhatsApp */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWhatsAppClick}
              className="bg-green-500 hover:bg-green-600 text-white p-6 rounded-full mb-4 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              <FaWhatsapp className="text-3xl mx-auto" />
            </motion.button>
            <h3 className="text-xl font-semibold text-white mb-2">WhatsApp Chat</h3>
            <p className="text-green-100">Quick responses, instant support</p>
          </motion.div>

          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCallClick}
              className="bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-full mb-4 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              <FaPhone className="text-3xl mx-auto" />
            </motion.button>
            <h3 className="text-xl font-semibold text-white mb-2">Call Us</h3>
            <p className="text-green-100">Speak directly with our experts</p>
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEmailClick}
              className="bg-purple-500 hover:bg-purple-600 text-white p-6 rounded-full mb-4 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              <FaEnvelope className="text-3xl mx-auto" />
            </motion.button>
            <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
            <p className="text-green-100">Detailed inquiries and planning</p>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="bg-white bg-opacity-10 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-white mb-3">
              Why Choose Our WhatsApp Support?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-100">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-300 rounded-full mr-2"></span>
                Instant responses 24/7
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-300 rounded-full mr-2"></span>
                Personalized trip planning
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-300 rounded-full mr-2"></span>
                Real-time booking support
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-300 rounded-full mr-2"></span>
                Local insider knowledge
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
