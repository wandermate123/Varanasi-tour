'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  Sparkles, MessageCircle, Mic, MicOff, Volume2, VolumeX,
  Zap, Globe, MapPin, CreditCard, Cloud, ShieldAlert,
  Hotel, UtensilsCrossed, Camera, Car, Send, X,
  ChevronDown, Star, Clock, Users, ArrowRight,
  Loader2, CheckCircle, AlertCircle, Phone
} from 'lucide-react';

// Import our API services
import { 
  BookingAPI, PaymentAPI, MapsAPI, WeatherAPI, 
  TranslationAPI, EmergencyAPI, ChatAPI 
} from '@/lib/apiServices';

// Import n8n agent hook
import { useN8nAgent } from '@/hooks/useN8nAgent';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  emotion?: 'happy' | 'excited' | 'professional' | 'helpful' | 'concerned';
  suggestions?: string[];
  data?: any;
  isLoading?: boolean;
}

interface AIService {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  color: string;
  gradient: string;
}

const aiServices: AIService[] = [
  {
    id: 'booking',
    name: 'Hotels',
    icon: Hotel,
    description: 'Book accommodations',
    color: 'blue',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'payment',
    name: 'Payments',
    icon: CreditCard,
    description: 'Secure transactions',
    color: 'green',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    id: 'navigation',
    name: 'Navigate',
    icon: MapPin,
    description: 'Get directions',
    color: 'red',
    gradient: 'from-red-500 to-pink-500'
  },
  {
    id: 'translation',
    name: 'Translate',
    icon: Globe,
    description: 'Language help',
    color: 'purple',
    gradient: 'from-purple-500 to-violet-500'
  },
  {
    id: 'weather',
    name: 'Weather',
    icon: Cloud,
    description: 'Current conditions',
    color: 'orange',
    gradient: 'from-orange-500 to-amber-500'
  },
  {
    id: 'emergency',
    name: 'Emergency',
    icon: ShieldAlert,
    description: 'Get help now',
    color: 'red',
    gradient: 'from-red-600 to-rose-600'
  }
];

const quickActions = [
  { label: 'Hotels', icon: Hotel, category: 'booking', query: 'show me hotels near ghats' },
  { label: 'Food', icon: UtensilsCrossed, category: 'booking', query: 'find local restaurants' },
  { label: 'Transport', icon: Car, category: 'navigation', query: 'book auto rickshaw' },
  { label: 'Temples', icon: Sparkles, category: 'navigation', query: 'show temple locations' }
];

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' }
];

export default function WanderMateAIAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isTyping, setIsTyping] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<string>('helpful');
  const [isOnline, setIsOnline] = useState(true);
  const [processingService, setProcessingService] = useState<string | null>(null);
  const [enableN8nAgent, setEnableN8nAgent] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // n8n Agent integration
  const n8nAgent = useN8nAgent({
    workflowName: 'wandermate-chat',
    userId: 'user_' + Date.now(),
    language: selectedLanguage,
    autoConnect: enableN8nAgent,
    pollingInterval: 1500
  });

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = selectedLanguage === 'hi' ? 'hi-IN' : `${selectedLanguage}-${selectedLanguage.toUpperCase()}`;
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };
      
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);
      
      recognitionRef.current = recognition;
    }
  }, [selectedLanguage]);

  // Welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addMessage({
          text: "Hello! I'm WanderMate AI. How can I help you explore Varanasi today? 😊",
          sender: 'ai',
          emotion: 'helpful',
          suggestions: ['Book hotel', 'Find food', 'Get directions', 'Check weather', 'Enable n8n Agent']
        });
      }, 500);
    }
  }, [isOpen]);

  const addMessage = useCallback((message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  }, []);

  const handleVoiceInput = () => {
    if (!recognitionRef.current) return;
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const speakText = (text: string) => {
    if (!window.speechSynthesis) return;
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selectedLanguage === 'hi' ? 'hi-IN' : selectedLanguage;
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const processMessage = async (message: string, quickAction = false) => {
    if (!message.trim()) return;

    // Add user message
    addMessage({ text: message, sender: 'user' });
    setInputMessage('');
    setIsTyping(true);

    // Determine which service to use based on message content
    const lowerMessage = message.toLowerCase();
    let serviceUsed = '';

    try {
      let response;

      if (lowerMessage.includes('book') || lowerMessage.includes('hotel') || lowerMessage.includes('stay')) {
        setProcessingService('booking');
        serviceUsed = 'booking';
        
        // Extract booking details
        const checkIn = new Date();
        checkIn.setDate(checkIn.getDate() + 1);
        const checkOut = new Date();
        checkOut.setDate(checkOut.getDate() + 3);
        
        const hotelData = await BookingAPI.searchHotels(
          'Varanasi', 
          checkIn.toISOString().split('T')[0],
          checkOut.toISOString().split('T')[0],
          2
        );
        
        response = {
          text: `Found ${hotelData.hotels?.length || 3} great hotels with instant booking! Here are top options:`,
          sender: 'ai' as const,
          emotion: 'excited' as const,
          suggestions: ['Book Ganges Heritage', 'Compare prices', 'Change dates'],
          data: { hotels: hotelData.hotels }
        };
        
      } else if (lowerMessage.includes('pay') || lowerMessage.includes('payment') || lowerMessage.includes('upi')) {
        setProcessingService('payment');
        serviceUsed = 'payment';
        
        const paymentData = await PaymentAPI.createPaymentIntent(8500, 'INR');
        
        response = {
          text: "Payment ready! I support UPI, Cards, Net Banking, and Wallets. All secure with encryption.",
          sender: 'ai' as const,
          emotion: 'professional' as const,
          suggestions: ['Pay with UPI', 'Credit Card', 'Net Banking'],
          data: { paymentIntent: paymentData }
        };
        
      } else if (lowerMessage.includes('direction') || lowerMessage.includes('navigate') || lowerMessage.includes('way')) {
        setProcessingService('navigation');
        serviceUsed = 'navigation';
        
        const navigationData = await MapsAPI.getDirections('Current Location', 'Kashi Vishwanath Temple');
        
        response = {
          text: "Navigation ready! I'll guide you with turn-by-turn directions and live traffic updates.",
          sender: 'ai' as const,
          emotion: 'helpful' as const,
          suggestions: ['Start navigation', 'Find nearby places', 'Traffic info'],
          data: { directions: navigationData }
        };
        
      } else if (lowerMessage.includes('translate') || lowerMessage.includes('language') || lowerMessage.includes('hindi')) {
        setProcessingService('translation');
        serviceUsed = 'translation';
        
        const translationData = await TranslationAPI.translateText(
          'How much does this cost?', 
          selectedLanguage === 'en' ? 'hi' : 'en'
        );
        
        response = {
          text: "Translation ready! I can translate conversations in real-time between 8 languages.",
          sender: 'ai' as const,
          emotion: 'professional' as const,
          suggestions: ['Voice translate', 'Common phrases', 'Learn Hindi'],
          data: { translation: translationData }
        };
        
      } else if (lowerMessage.includes('weather') || lowerMessage.includes('temperature') || lowerMessage.includes('rain')) {
        setProcessingService('weather');
        serviceUsed = 'weather';
        
        const weatherData = await WeatherAPI.getCurrentWeather('Varanasi');
        
        response = {
          text: `Weather in Varanasi: ${weatherData.temperature || 28}°C, ${weatherData.condition || 'clear skies'}. Great for exploring!`,
          sender: 'ai' as const,
          emotion: 'helpful' as const,
          suggestions: ['5-day forecast', 'Best visit times', 'Crowd levels'],
          data: { weather: weatherData }
        };
        
      } else if (lowerMessage.includes('emergency') || lowerMessage.includes('help') || lowerMessage.includes('police')) {
        setProcessingService('emergency');
        serviceUsed = 'emergency';
        
        const emergencyData = await EmergencyAPI.getEmergencyContacts('Varanasi');
        
        response = {
          text: "Emergency contacts ready! Police (100), Ambulance (108), Fire (101), Tourist Help (+91-542-2501204).",
          sender: 'ai' as const,
          emotion: 'concerned' as const,
          suggestions: ['Call Police', 'Medical Emergency', 'Tourist Help'],
          data: { contacts: emergencyData }
        };
        
      } else {
        // General chat response
        const chatResponse = await ChatAPI.getChatResponse(message, { language: selectedLanguage });
        response = {
          text: chatResponse.message,
          sender: 'ai' as const,
          emotion: 'helpful' as const
        };
      }

      // Simulate AI thinking time
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      setIsTyping(false);
      setProcessingService(null);
      
      // Add AI response
      addMessage(response);
      
      // Set emotion based on response
      if (response.emotion) {
        setCurrentEmotion(response.emotion);
      }
      
      // Auto-speak in selected language if enabled
      if (selectedLanguage !== 'en') {
        const translatedResponse = await TranslationAPI.translateText(response.text, selectedLanguage);
        speakText(translatedResponse.translatedText);
      }
      
    } catch (error) {
      console.error('AI Agent Error:', error);
      setIsTyping(false);
      setProcessingService(null);
      
      addMessage({
        text: "Sorry, I'm having technical issues. Please try again.",
        sender: 'ai',
        emotion: 'concerned'
      });
    }
  };

  const handleQuickAction = (action: typeof quickActions[0]) => {
    processMessage(action.query, true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    // Handle n8n agent commands
    if (suggestion === 'Enable n8n Agent') {
      handleEnableN8nAgent();
      return;
    }
    if (suggestion === 'Disable n8n Agent') {
      disableN8nAgent();
      return;
    }
    
    // If n8n agent is enabled, send message through n8n
    if (enableN8nAgent && n8nAgent.isConnected) {
      sendN8nMessage(suggestion);
      return;
    }
    
    processMessage(suggestion, true);
  };

  // n8n Agent functions
  const handleEnableN8nAgent = async () => {
    try {
      setIsTyping(true);
      setEnableN8nAgent(true);
      
      const sessionId = await n8nAgent.connect();
      
      addMessage({
        text: "🤖 n8n AI Agent connected! I'm now powered by advanced workflow automation. Try asking me complex questions or tasks!",
        sender: 'ai',
        emotion: 'excited',
        suggestions: ['Book a hotel workflow', 'Multi-step planning', 'Complex query', 'Disable n8n Agent']
      });
      
      // Update context with user preferences
      await n8nAgent.updateContext({
        location: 'Varanasi',
        userType: 'traveler',
        language: selectedLanguage,
        preferences: {
          accommodation: 'heritage hotels',
          activities: 'cultural exploration',
          budget: 'moderate'
        }
      });
      
    } catch (error) {
      console.error('Failed to enable n8n agent:', error);
      addMessage({
        text: "Sorry, couldn't connect to the advanced n8n agent. You can still use the standard AI assistant!",
        sender: 'ai',
        emotion: 'concerned',
        suggestions: ['Try again', 'Use standard agent', 'Get help']
      });
      setEnableN8nAgent(false);
    } finally {
      setIsTyping(false);
    }
  };

  const disableN8nAgent = async () => {
    try {
      await n8nAgent.disconnect();
      setEnableN8nAgent(false);
      
      addMessage({
        text: "n8n Agent disconnected. I'm back to standard mode. You can re-enable advanced features anytime!",
        sender: 'ai',
        emotion: 'helpful',
        suggestions: ['Enable n8n Agent', 'Book hotel', 'Get directions', 'Check weather']
      });
    } catch (error) {
      console.error('Error disconnecting n8n agent:', error);
    }
  };

  const sendN8nMessage = async (message: string) => {
    try {
      setIsTyping(true);
      
      // Add user message
      addMessage({ text: message, sender: 'user' });
      setInputMessage('');
      
      // Send to n8n workflow
      await n8nAgent.sendMessage(message, {
        location: 'Varanasi',
        userType: 'traveler',
        timestamp: new Date().toISOString()
      });
      
      // The response will come through polling
      
    } catch (error) {
      console.error('Failed to send message to n8n:', error);
      addMessage({
        text: "Sorry, there was an issue with the n8n workflow. Let me try the standard response.",
        sender: 'ai',
        emotion: 'concerned'
      });
      
      // Fallback to standard processing
      processMessage(message, true);
    } finally {
      setIsTyping(false);
    }
  };

  // Handle n8n responses
  useEffect(() => {
    if (n8nAgent.lastResponse && enableN8nAgent) {
      const response = n8nAgent.lastResponse;
      
      addMessage({
        text: `🤖 ${response.message}`,
        sender: 'ai',
        emotion: (response.emotion as any) || 'helpful',
        suggestions: response.suggestions || ['Ask another question', 'Book hotel', 'Get directions'],
        data: response.data
      });
      
      // Speak the response if needed
      if (response.message) {
        speakText(response.message);
      }
    }
  }, [n8nAgent.lastResponse, enableN8nAgent]);

  // Handle n8n errors
  useEffect(() => {
    if (n8nAgent.error && enableN8nAgent) {
      addMessage({
        text: `⚠️ n8n Agent Error: ${n8nAgent.error}. Switching to standard mode.`,
        sender: 'ai',
        emotion: 'concerned',
        suggestions: ['Try again', 'Enable n8n Agent', 'Get help']
      });
      setEnableN8nAgent(false);
    }
  }, [n8nAgent.error, enableN8nAgent]);

  const getEmotionIcon = (emotion: string) => {
    switch (emotion) {
      case 'excited': return '🎉';
      case 'happy': return '😊';
      case 'professional': return '💼';
      case 'concerned': return '😟';
      default: return '🤝';
    }
  };

  const renderMessageData = (data: any, type: string) => {
    if (!data) return null;

    if (data.hotels) {
      return (
        <div className="space-y-3 mt-4">
          {data.hotels.slice(0, 3).map((hotel: any, index: number) => (
            <motion.div
              key={hotel.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-900 text-sm">{hotel.name}</h4>
                <div className="flex items-center text-yellow-500">
                  <Star className="w-3 h-3 fill-current" />
                  <span className="ml-1 text-xs text-gray-600">{hotel.rating}</span>
                </div>
              </div>
              <p className="text-gray-600 text-xs mb-3">{hotel.location}</p>
              <div className="flex justify-between items-center">
                <div className="text-green-600 font-bold text-sm">₹{hotel.price.toLocaleString()}/night</div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => processMessage(`book ${hotel.name}`)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                >
                  Book Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <>
      {/* Floating AI Agent Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 ${
          isOpen ? 'scale-0' : 'scale-100'
        } transition-transform duration-300`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: [
            '0 4px 20px rgba(147, 51, 234, 0.3)',
            '0 8px 30px rgba(147, 51, 234, 0.4)',
            '0 4px 20px rgba(147, 51, 234, 0.3)'
          ]
        }}
        transition={{
          boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div className="relative">
          {/* Main Button */}
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-violet-700 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
            {/* Rotating Background */}
            <motion.div
              className="absolute inset-1 bg-gradient-to-br from-purple-500 via-violet-600 to-purple-700 rounded-full opacity-75"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Main Icon */}
            <Zap className="w-7 h-7 text-white relative z-10 drop-shadow-sm" />
            
            {/* Floating Sparkles */}
            <motion.div
              className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="w-3 h-3 text-white" />
            </motion.div>
          </div>
          
          {/* Status Indicator */}
          <div className={`absolute -top-1 -left-1 w-4 h-4 rounded-full ${
            isOnline ? 'bg-green-500' : 'bg-red-500'
          } border-2 border-white shadow-sm`} />
        </div>
      </motion.button>

      {/* AI Agent Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-20 md:bottom-6 right-4 md:right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-violet-700 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">WanderMate AI</h3>
                  <p className="text-xs text-white/80">
                    {processingService ? `Processing ${processingService}...` : 
                     enableN8nAgent && n8nAgent.isConnected ? '🤖 n8n Agent Active' : 'Online & Ready'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {/* Language Selector */}
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                    className="flex items-center space-x-1 bg-white/20 px-2 py-1 rounded-lg text-sm text-white backdrop-blur-sm"
                  >
                    <span className="text-xs">{languages.find(l => l.code === selectedLanguage)?.flag}</span>
                    <ChevronDown className="w-3 h-3" />
                  </motion.button>
                  
                  <AnimatePresence>
                    {showLanguageDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full right-0 mt-2 bg-white rounded-lg border border-gray-200 py-1 min-w-[120px] z-10 shadow-lg"
                      >
                        {languages.map(lang => (
                          <button
                            key={lang.code}
                            onClick={() => {
                              setSelectedLanguage(lang.code);
                              setShowLanguageDropdown(false);
                            }}
                            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2 transition-colors"
                          >
                            <span>{lang.flag}</span>
                            <span>{lang.name}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* AI Services Quick Access */}
            <div className="p-3 bg-gray-50 border-b border-gray-200">
              <div className="grid grid-cols-3 gap-2">
                {aiServices.map(service => (
                  <motion.button
                    key={service.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => processMessage(`Help me with ${service.name.toLowerCase()}`)}
                    className="p-3 rounded-lg bg-white border border-gray-200 text-center group hover:shadow-sm transition-all"
                  >
                    <service.icon className="w-4 h-4 text-gray-600 mx-auto mb-1" />
                    <div className="text-xs text-gray-700 font-medium">
                      {service.name}
                    </div>
                    {processingService === service.id && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-2 border-blue-500 border-t-transparent rounded-lg"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50/50 to-white">
              {messages.map(message => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white rounded-l-2xl rounded-tr-2xl'
                      : 'bg-white text-gray-800 rounded-r-2xl rounded-tl-2xl border border-gray-200'
                  } p-3 shadow-sm`}>
                    {message.sender === 'ai' && (
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm">{getEmotionIcon(message.emotion || 'helpful')}</span>
                        <span className="text-xs text-gray-500 font-medium">WanderMate AI</span>
                        {message.emotion && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                            {message.emotion}
                          </span>
                        )}
                      </div>
                    )}
                    
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    
                    {/* Render additional data */}
                    {message.data && renderMessageData(message.data, message.sender)}
                    
                    {/* Suggestions */}
                    {message.suggestions && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {message.suggestions.map((suggestion, index) => (
                          <motion.button
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded-full border border-gray-300 transition-colors"
                          >
                            {suggestion}
                          </motion.button>
                        ))}
                      </div>
                    )}
                    
                    {/* Voice Control and Timestamp */}
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-gray-400">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {message.sender === 'ai' && (
                        <button
                          onClick={() => isSpeaking ? stopSpeaking() : speakText(message.text)}
                          className="text-gray-400 hover:text-gray-600 p-1"
                        >
                          {isSpeaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white text-gray-800 rounded-r-2xl rounded-tl-2xl border border-gray-200 p-3 shadow-sm">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                      <span className="text-xs text-gray-500">WanderMate is typing...</span>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="p-3 bg-gray-50 border-t border-gray-200">
              <div className="grid grid-cols-4 gap-2 mb-3">
                {quickActions.map(action => (
                  <motion.button
                    key={action.label}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleQuickAction(action)}
                    className="flex flex-col items-center p-2 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors"
                  >
                    <action.icon className="w-4 h-4 text-gray-600 mb-1" />
                    <span className="text-xs text-gray-700 font-medium">{action.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex items-center space-x-3">
                {/* Voice Input */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleVoiceInput}
                  className={`p-3 rounded-full transition-colors ${
                    isListening 
                      ? 'bg-red-500 text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {isListening ? (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      <MicOff className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <Mic className="w-5 h-5" />
                  )}
                </motion.button>

                {/* Text Input */}
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        if (enableN8nAgent && n8nAgent.isConnected) {
                          sendN8nMessage(inputMessage);
                        } else {
                          processMessage(inputMessage);
                        }
                      }
                    }}
                    placeholder="Type your message..."
                    className="w-full bg-gray-50 border border-gray-300 rounded-full px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>

                {/* Send Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    if (enableN8nAgent && n8nAgent.isConnected) {
                      sendN8nMessage(inputMessage);
                    } else {
                      processMessage(inputMessage);
                    }
                  }}
                  disabled={!inputMessage.trim()}
                  className="p-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-full transition-colors disabled:cursor-not-allowed shadow-sm"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}