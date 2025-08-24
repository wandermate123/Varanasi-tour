'use client';

import { FaWhatsapp } from 'react-icons/fa';

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
}

const WhatsAppButton = ({ phoneNumber, message = 'Hi! I would like to know more about WanderMate services.' }: WhatsAppButtonProps) => {
  const handleWhatsAppClick = () => {
    // Remove any non-numeric characters from phone number
    const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');
    
    // Create WhatsApp URL with phone number and encoded message
    const whatsappUrl = `https://wa.me/${cleanPhoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-32 md:bottom-20 right-4 md:right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 md:px-4 py-2 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp className="text-xl" />
      <span>Chat with us</span>
    </button>
  );
};

export default WhatsAppButton; 