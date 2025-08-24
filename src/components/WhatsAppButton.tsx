'use client';

import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

interface WhatsAppButtonProps {
  phoneNumber?: string;
}

export default function WhatsAppButton({ phoneNumber = "919876543210" }: WhatsAppButtonProps) {
  const handleWhatsAppClick = () => {
    const message = "Hi! I'm interested in exploring Varanasi. Can you help me plan my trip?";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 left-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp size={24} />
    </motion.button>
  );
}
