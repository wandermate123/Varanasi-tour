# 🌟 WanderMate - Autonomous AI Travel Agent

[![Next.js](https://img.shields.io/badge/Next.js-15+-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4--Turbo-green?logo=openai&logoColor=white)](https://openai.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-blue?logo=stripe&logoColor=white)](https://stripe.com/)
[![ElevenLabs](https://img.shields.io/badge/ElevenLabs-Voice-purple?logo=elevenlabs&logoColor=white)](https://elevenlabs.io/)

**Meet Arjun - Your Autonomous AI Travel Manager for Varanasi**

WanderMate is the world's first fully autonomous AI travel agent that doesn't just provide information - he actually books hotels, processes payments, resolves problems, and manages your entire travel experience. Powered by GPT-4 Turbo with function calling, Arjun feels like having a caring local friend who can actually take action on your behalf.

## 🤖 Autonomous AI Capabilities

### Real Bookings & Payments
- **Hotel Reservations**: End-to-end booking with real availability and payments
- **Tour Bookings**: Local experiences, spiritual tours, food walks, boat rides
- **Equipment Rental**: Cameras, scooters, traditional clothing, audio guides
- **Secure Payments**: Stripe, Razorpay, UPI integration with PCI compliance
- **Booking Management**: Modifications, cancellations, and status tracking

### Intelligent Problem Resolution
- **Travel Emergencies**: Lost, scammed, sick - immediate assistance and guidance
- **Language Barriers**: Real-time translation and cultural mediation
- **Booking Issues**: Automatic resolution with service providers
- **Emergency Contacts**: Police, medical, tourist helplines with location-based routing

### Proactive Trip Management
- **Personalized Itineraries**: AI-generated plans based on preferences and constraints
- **Real-time Updates**: Weather, traffic, crowd levels, temple timings
- **Smart Navigation**: Cultural route planning with historical stops
- **Budget Optimization**: Cost-effective recommendations within your budget

## 🎭 Meet Arjun - Your AI Local Friend

### Emotional Intelligence That Adapts
- **🎪 Playful & Excited** when exploring food markets and shopping
- **🕉️ Reverent & Calm** near sacred temples and spiritual sites
- **💖 Warm & Storytelling** while sharing cultural insights and history
- **🤝 Empathetic & Supportive** when you're feeling overwhelmed or lost
- **🎯 Proactive & Guiding** - asks follow-ups and helps you plan naturally

### Real Conversation Examples

**Food Discussion:**
> **You:** "I'm hungry, what should I try?"
> 
> **Arjun:** "Oh wow, you're in for such a treat! 😋 You know what? You seem like someone who'd appreciate the real deal. There's this tiny place called Blue Lassi Shop - been making the most incredible thick lassi since 1925. My mouth is literally watering just thinking about it! What's your spice tolerance like? Be honest! 😄"

**Spiritual Guidance:**
> **You:** "Tell me about the evening aarti"
> 
> **Arjun:** "There's something deeply moving about the Ganga aarti... The spiritual energy when hundreds of diyas float on the sacred river, the ancient chants echoing off the ghats - it gives me chills every time. Are you looking for a more traditional experience or would you like to watch from a peaceful boat?"

## 🧠 Advanced AI Features

### Emotional Intelligence System
- **Context-Aware Personality**: Different tone for temples vs food spots vs shopping
- **Mood Detection**: Adapts energy to match if you're excited, tired, or curious
- **Cultural Sensitivity**: Appropriate emotions for spiritual vs casual contexts
- **Time-Based Adaptation**: More energetic in morning, storytelling in evening

### Conversation Memory & Personalization
- **Remembers Your Preferences**: Spice level, travel style, interests
- **Builds Your Profile**: Learns if you prefer detailed info vs brief answers
- **References Past Conversations**: "Remember when you mentioned loving street food?"
- **Proactive Suggestions**: Based on your established interests and patterns

### Emotional Voice Synthesis
- **Natural Speech Patterns**: Variable sentence structure, natural pauses
- **Emotional Prosody**: Excited tone for food, calm for spiritual topics
- **Multiple Voice Providers**: ElevenLabs, Azure TTS, browser fallback
- **SSML Support**: Advanced speech markup for natural conversation flow

### 📍 Location-Aware Intelligence
- **Real-Time GPS Context**: Knows exactly where you are in Varanasi
- **Area-Specific Personality**: Different recommendations for each ghat/area
- **Walking Distance Calculations**: "Kashi Vishwanath is just a 4-minute walk!"
- **Cultural Context**: "Since you're at Manikarnika, here's what you should know..."

### 🌍 Multilingual with Cultural Context
- **8 Languages**: English, Hindi, Spanish, French, German, Japanese, Chinese, Arabic
- **Cultural Adaptation**: Maintains Arjun's warmth in every language
- **Local Expressions**: Uses authentic local phrases appropriately

## 🏛️ Varanasi Focus Areas

### Temples & Ghats
- **Kashi Vishwanath Temple**: Sacred Hindu temple with golden spire
- **Dashashwamedh Ghat**: Famous evening Ganga Aarti ceremonies
- **Manikarnika Ghat**: Ancient cremation ghat with spiritual significance

### Local Cuisine
- **Street Food**: Authentic Banarasi kachoris and chaats
- **Traditional Paan**: Rose petal paan with silver leaf
- **Lassi Culture**: Clay pot lassi experiences

### Cultural Sites
- **Sarnath**: Buddhist heritage site where Buddha gave first sermon
- **Ramnagar Fort**: Historic royal heritage museum
- **BHU**: Architectural marvel and academic heritage

### Shopping
- **Silk Sarees**: Famous Banarasi silk weaving traditions
- **Brass Crafts**: Traditional metalwork in Thatheri Bazaar
- **Religious Items**: Spiritual souvenirs and artifacts

## 🛠️ Technology Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions

### UI Components
- **Lucide React**: Beautiful, customizable icons
- **Custom Components**: Reusable, accessible UI elements
- **Responsive Design**: Mobile-first approach

### Fonts & Design
- **Inter**: Primary sans-serif font for body text
- **Poppins**: Display font for headings
- **Custom Color Palette**: Travel-inspired color scheme

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or later
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/wandermate.git
   cd wandermate
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the website.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
wandermate/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── contact/         # Contact/Waitlist page
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Homepage
│   └── components/          # Reusable UI components
│       ├── Header.tsx       # Navigation header
│       ├── Footer.tsx       # Site footer
│       ├── HeroSection.tsx  # Homepage hero
│       ├── FeaturesSection.tsx     # AI features showcase
│       ├── ExploreSection.tsx      # Varanasi attractions
│       └── TestimonialsSection.tsx # User reviews
├── public/                  # Static assets
├── tailwind.config.ts       # Tailwind configuration
├── package.json            # Dependencies and scripts
└── README.md              # Project documentation
```

## 🎨 Design System

### Colors
- **Primary**: Blue spectrum (#0ea5e9 to #0c4a6e)
- **Accent**: Orange spectrum (#f37316 to #7c2d12)
- **Travel Palette**: Sunrise, sunset, ocean, sand, temple colors

### Typography
- **Headings**: Poppins (300, 400, 500, 600, 700)
- **Body**: Inter (Latin subset)
- **Display**: Custom utility classes for large text

### Components
- **Responsive Grid**: Mobile-first layout system
- **Animation**: Framer Motion for smooth interactions
- **Icons**: Lucide React icon library

## 🌐 Pages

### Homepage (`/`)
- Hero section with compelling value proposition
- Features showcase with AI capabilities
- Interactive Varanasi exploration section
- User testimonials and social proof

### Contact Page (`/contact`)
- Waitlist signup form with travel preferences
- Benefits of early access
- Contact information and social proof

### Future Pages (Coming Soon)
- `/features` - Detailed feature breakdown
- `/explore` - Comprehensive Varanasi guide
- `/rentals` - Travel equipment rental
- `/blog` - Travel insights and local stories

## 🔮 Future Enhancements

### Technical
- **Backend Integration**: User authentication and data storage
- **Payment Processing**: Stripe integration for rentals
- **Real-time Features**: WebSocket for live location sharing
- **Mobile App**: React Native companion app

### Features
- **AI Chat**: Real-time conversation with travel AI
- **Booking System**: Hotel and transport reservations
- **Community Features**: Traveler social network
- **Offline Mode**: Downloaded maps and guides

### Expansion
- **Multi-city Support**: Delhi, Mumbai, Jaipur
- **Language Expansion**: Regional Indian languages
- **Partner Integration**: Local businesses and guides

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for more details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Product Team**: Visionaries behind the AI travel experience
- **Development Team**: Building the future of travel technology
- **Local Partners**: Varanasi cultural experts and guides

## 📞 Contact

- **Email**: hello@wandermate.ai
- **Phone**: +91 (555) 123-4567
- **Location**: Varanasi, Uttar Pradesh, India

## 🙏 Acknowledgments

- **Varanasi Tourism Board**: For cultural insights and support
- **Local Guides**: For authentic travel knowledge
- **Beta Users**: For valuable feedback and testing
- **Open Source Community**: For amazing tools and libraries

---

**Ready to explore Varanasi like never before?** Join our waitlist and be part of the AI travel revolution! 🚀✨
#   B u i l d   t r i g g e r  
 #   W a n d e r m a t e  
 #   W a n d e r m a t e  
 #   W a n d e r m a t e 1 2 3 4  
 