'use client';

import { FaWhatsapp } from 'react-icons/fa';

interface ContactOption {
  title: string;
  description: string;
  phoneNumber: string;
  message: string;
}

const contactOptions: ContactOption[] = [
  {
    title: "Trip Planning",
    description: "Get personalized trip recommendations and itineraries",
    phoneNumber: "919214313559",
    message: "Hi! I would like help planning my trip with WanderMate."
  },
  {
    title: "Booking Assistance",
    description: "Help with bookings and reservations",
    phoneNumber: "919214313559",
    message: "Hi! I need assistance with making a booking on WanderMate."
  },
  {
    title: "Customer Support",
    description: "24/7 support for any queries or concerns",
    phoneNumber: "919214313559",
    message: "Hi! I have a question about WanderMate services."
  }
];

const WhatsAppSection = () => {
  const handleWhatsAppClick = (phoneNumber: string, message: string) => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Contact Us on WhatsApp</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contactOptions.map((option, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                {option.title === "Trip Planning" && (
                  <FaWhatsapp className="text-2xl text-green-500" />
                )}
                <h3 className="text-xl font-semibold">{option.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{option.description}</p>
              <button
                onClick={() => handleWhatsAppClick(option.phoneNumber, option.message)}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
              >
                <FaWhatsapp className="text-xl" />
                <span>Chat Now</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatsAppSection; 