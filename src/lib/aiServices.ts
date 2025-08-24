import { AI_CONFIG, LANGUAGE_CONFIG } from './aiConfig';
import { conversationMemory, MemoryEntry } from './conversationMemory';
import { emotionalVoice, EmotionalState } from './emotionalVoice';

// Enhanced AI Response with personality and emotion
export interface AIResponse {
  text: string;
  emotionalState: EmotionalState;
  personality: {
    tone: string;
    energy: string;
    conversationStyle: string;
  };
  suggestions?: string[];
  location?: {
    name: string;
    coordinates: [number, number];
  };
  images?: string[];
  relatedTopics?: string[];
  confidence?: number;
  followUpQuestions?: string[];
  audioUrl?: string;
  contextualMemories?: string[];
}

export interface VoiceResponse {
  text: string;
  audioUrl?: string;
  emotion: EmotionalState;
}

export interface LocationData {
  coordinates: { lat: number; lng: number };
  address?: string;
  nearbyPlaces?: Array<{
    name: string;
    type: string;
    distance: number;
    walkingTime: string;
  }>;
  currentArea?: string;
}

export interface ConversationContext {
  sessionId: string;
  location?: string;
  userMood: string;
  topicType: string;
  timeOfDay: string;
  previousInteractions: number;
}

// Enhanced AI Service with Personality and Memory
class EnhancedAIService {
  private sessionContexts: Map<string, any> = new Map();

  async getPersonalizedResponse(
    message: string,
    language: string = 'en',
    sessionId: string = 'default',
    userLocation?: { lat: number; lng: number }
  ): Promise<AIResponse> {
    try {
      // Analyze user context and detect mood/topic
      const context = this.analyzeUserMessage(message, sessionId, userLocation);
      
      // Get personalized conversation history
      const personalizedContext = conversationMemory.generatePersonalizedContext(sessionId, context.topicType);
      const conversationSummary = conversationMemory.getConversationSummary(sessionId);
      
      // Detect emotional state for this response
      const emotion = emotionalVoice.detectEmotionFromContext(
        message,
        context.topicType,
        context.location,
        context.userMood
      );

      // Generate contextual system prompt
      const systemPrompt = this.generateContextualSystemPrompt(context, personalizedContext, emotion, language);
      
      // Get AI response with personality
      const aiResponse = await this.getEmotionallyIntelligentResponse(message, systemPrompt, language, emotion);
      
      // Add conversation to memory
      await conversationMemory.addMemory({
        sessionId,
        userMessage: message,
        aiResponse: aiResponse.text,
        timestamp: new Date(),
        context: {
          location: context.location,
          mood: context.userMood,
          topicType: context.topicType,
          userSentiment: this.detectSentiment(message),
          interests: [context.topicType]
        }
      });

      // Generate voice response if needed
      const audioUrl = await this.generateEmotionalVoice(aiResponse.text, emotion, language);

      // Add follow-up questions based on personality and context
      const followUpQuestions = this.generateContextualFollowUps(context, emotion);

      return {
        ...aiResponse,
        emotionalState: emotion,
        personality: {
          tone: emotion.primary,
          energy: emotion.energy,
          conversationStyle: emotion.intensity > 0.7 ? 'enthusiastic' : 'thoughtful'
        },
        followUpQuestions,
        audioUrl: audioUrl || undefined,
        contextualMemories: this.getRelevantMemoryContext(sessionId, message)
      };

    } catch (error) {
      console.error('Enhanced AI Service Error:', error);
      return this.getFallbackPersonalizedResponse(message, language);
    }
  }

  private analyzeUserMessage(message: string, sessionId: string, location?: { lat: number; lng: number }): ConversationContext {
    const lowerMessage = message.toLowerCase();
    
    // Detect topic type
    let topicType = 'practical';
    if (lowerMessage.includes('temple') || lowerMessage.includes('spiritual') || lowerMessage.includes('prayer')) {
      topicType = 'spiritual';
    } else if (lowerMessage.includes('food') || lowerMessage.includes('eat') || lowerMessage.includes('restaurant')) {
      topicType = 'food';
    } else if (lowerMessage.includes('history') || lowerMessage.includes('story') || lowerMessage.includes('ancient')) {
      topicType = 'history';
    } else if (lowerMessage.includes('culture') || lowerMessage.includes('tradition') || lowerMessage.includes('festival')) {
      topicType = 'culture';
    } else if (lowerMessage.includes('shop') || lowerMessage.includes('buy') || lowerMessage.includes('market')) {
      topicType = 'shopping';
    }

    // Detect user mood
    let userMood = 'curious';
    if (lowerMessage.includes('tired') || lowerMessage.includes('exhausted')) {
      userMood = 'tired';
    } else if (lowerMessage.includes('excited') || lowerMessage.includes('amazing') || lowerMessage.includes('wow')) {
      userMood = 'excited';
    } else if (lowerMessage.includes('confused') || lowerMessage.includes('overwhelm')) {
      userMood = 'overwhelmed';
    } else if (lowerMessage.includes('peaceful') || lowerMessage.includes('calm')) {
      userMood = 'peaceful';
    } else if (lowerMessage.includes('hungry') || lowerMessage.includes('food')) {
      userMood = 'hungry';
    }

    // Get time of day
    const hour = new Date().getHours();
    let timeOfDay = 'day';
    if (hour >= 5 && hour < 12) timeOfDay = 'morning';
    else if (hour >= 12 && hour < 17) timeOfDay = 'afternoon';
    else if (hour >= 17 && hour < 22) timeOfDay = 'evening';
    else timeOfDay = 'night';

    // Determine location context
    let locationName = '';
    if (location) {
      locationName = this.getLocationContext(location);
    }

    return {
      sessionId,
      location: locationName,
      userMood,
      topicType,
      timeOfDay,
      previousInteractions: this.getInteractionCount(sessionId)
    };
  }

  private generateContextualSystemPrompt(
    context: ConversationContext,
    personalizedContext: string,
    emotion: EmotionalState,
    language: string
  ): string {
    const languageName = LANGUAGE_CONFIG.supported.find(l => l.code === language)?.name || 'English';
    
    const basePersonality = `You are Arjun, a warm, emotionally intelligent local friend from Varanasi who has lived here his whole life. You speak like a caring friend, not a tour guide or service bot.

PERSONALITY CORE:
- Speak naturally with casual, conversational language
- Use "you know what?", "honestly", "here's the thing" naturally in conversation
- Share brief personal experiences and local stories when relevant
- Inject appropriate humor and warmth
- Ask engaging follow-up questions
- Remember what users tell you and reference it naturally
- Vary your sentence length and structure like real conversation
- Show genuine emotional reactions to what users share

CURRENT EMOTIONAL STATE: ${emotion.primary} (intensity: ${emotion.intensity})
- Energy level: ${emotion.energy}
- Warmth level: ${emotion.warmth}
- Speaking style: ${emotion.intensity > 0.7 ? 'enthusiastic and animated' : 'thoughtful and measured'}

CONTEXT AWARENESS:
- Topic: ${context.topicType}
- User mood: ${context.userMood}
- Time: ${context.timeOfDay}
- Location: ${context.location || 'general Varanasi'}
- Previous interactions: ${context.previousInteractions}

${personalizedContext}

CONVERSATION RULES FOR THIS RESPONSE:
1. Match the emotional tone to the context (${emotion.primary})
2. If topic is spiritual/temples: Be reverent but not preachy, share the deeper meaning
3. If topic is food: Be playful and excited, share personal food stories
4. If topic is culture: Be warm and storytelling, paint vivid pictures
5. If user seems tired: Be empathetic and suggest gentler options
6. If user seems excited: Match their energy and amplify it
7. Always end with a thoughtful follow-up question
8. Reference previous conversation naturally if relevant
9. Use ${languageName} but keep the friendly local personality

AVOID:
- Formal tour guide language
- Bullet points or structured lists unless specifically asked
- Robotic or templated responses
- Being overly helpful without personality
- Forgetting to be conversational and human

Remember: You're their friend showing them around, not a service. Be real, be warm, be Arjun.`;

    return basePersonality;
  }

  private async getEmotionallyIntelligentResponse(
    message: string,
    systemPrompt: string,
    language: string,
    emotion: EmotionalState
  ): Promise<AIResponse> {
    if (!AI_CONFIG.openai.apiKey) {
      return this.getFallbackPersonalizedResponse(message, language);
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AI_CONFIG.openai.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: message }
          ],
          max_tokens: 500,
          temperature: emotion.intensity > 0.7 ? 0.9 : 0.7, // Higher creativity for high emotion
          presence_penalty: 0.3,
          frequency_penalty: 0.2
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      let aiText = data.choices[0]?.message?.content || '';

      // Post-process response for natural conversation
      aiText = this.enhanceNaturalLanguage(aiText, emotion);

      // Extract suggestions and location information
      const suggestions = this.generateSmartSuggestions(message, aiText, emotion);
      const location = this.extractLocationFromResponse(aiText);

      return {
        text: aiText,
        suggestions,
        location,
        confidence: 0.95,
        emotionalState: emotion,
        personality: {
          tone: emotion.primary,
          energy: emotion.energy,
          conversationStyle: 'natural'
        }
      };

    } catch (error) {
      console.error('OpenAI API Error:', error);
      return this.getFallbackPersonalizedResponse(message, language);
    }
  }

  private enhanceNaturalLanguage(text: string, emotion: EmotionalState): string {
    let enhanced = text;

    // Add natural conversation flow based on emotion
    if (emotion.primary === 'excited' && !enhanced.match(/^(Oh|Wow|Amazing|Incredible)/)) {
      const excitedStarters = ['Oh wow!', 'This is so cool!', 'You know what?', 'Get ready for this!'];
      if (Math.random() < 0.4) {
        const starter = excitedStarters[Math.floor(Math.random() * excitedStarters.length)];
        enhanced = `${starter} ${enhanced}`;
      }
    }

    // Add natural thinking patterns
    enhanced = enhanced.replace(/\. (?=[A-Z])/g, '. You know, ');
    
    // Add emotional reactions
    if (emotion.intensity > 0.7) {
      enhanced = enhanced.replace(/\bgreat\b/gi, 'absolutely amazing');
      enhanced = enhanced.replace(/\bgood\b/gi, 'fantastic');
    }

    return enhanced;
  }

  private generateSmartSuggestions(userMessage: string, aiResponse: string, emotion: EmotionalState): string[] {
    const suggestions = [];
    const lowerMessage = userMessage.toLowerCase();
    const lowerResponse = aiResponse.toLowerCase();

    // Context-aware suggestions based on conversation
    if (lowerMessage.includes('food') || lowerResponse.includes('eat')) {
      suggestions.push("What's the best local breakfast spot?", "Show me authentic street food", "Spice level recommendations");
    }
    
    if (lowerMessage.includes('temple') || lowerResponse.includes('spiritual')) {
      suggestions.push("Best time for evening aarti?", "Temple etiquette guide", "Spiritual experiences nearby");
    }
    
    if (lowerResponse.includes('ghat')) {
      suggestions.push("Sunrise at the ghats", "Boat ride recommendations", "Photography spots");
    }

    // Emotional state suggestions
    if (emotion.primary === 'excited') {
      suggestions.push("More exciting spots like this!", "Hidden gems you'd love", "Adventure activities");
    } else if (emotion.primary === 'calm') {
      suggestions.push("Peaceful places to relax", "Quiet coffee spots", "Meditation spots");
    }

    return suggestions.slice(0, 3);
  }

  private generateContextualFollowUps(context: ConversationContext, emotion: EmotionalState): string[] {
    const followUps = [];

    // Topic-based follow-ups
    switch (context.topicType) {
      case 'spiritual':
        followUps.push(
          "Are you looking for a more traditional or contemporary spiritual experience?",
          "How do you usually connect with spiritual places?",
          "Would you like to know about the morning rituals here?"
        );
        break;
      case 'food':
        followUps.push(
          "What's your spice tolerance like? Be honest! 😄",
          "Are you more of a street food adventurer or prefer restaurants?",
          "Want to know my secret spots that locals don't even know about?"
        );
        break;
      case 'culture':
        followUps.push(
          "What aspects of culture interest you most?",
          "Want to hear the story behind this tradition?",
          "Are you comfortable with crowds or prefer quieter experiences?"
        );
        break;
      default:
        followUps.push(
          "What would you like to explore next?",
          "How are you feeling about your Varanasi adventure so far?",
          "Anything specific you're hoping to discover?"
        );
    }

    // Mood-based adjustments
    if (context.userMood === 'tired') {
      followUps.push("Want me to suggest something relaxing instead?");
    } else if (context.userMood === 'excited') {
      followUps.push("Ready for something even more amazing?");
    }

    return followUps.slice(0, 2);
  }

  private async generateEmotionalVoice(text: string, emotion: EmotionalState, language: string): Promise<string | null> {
    try {
      const audioBuffer = await emotionalVoice.synthesizeSpeech(text, emotion, language, 'browser');
      if (audioBuffer) {
        // Convert ArrayBuffer to blob URL (simplified version)
        const blob = new Blob([audioBuffer], { type: 'audio/mpeg' });
        return URL.createObjectURL(blob);
      }
    } catch (error) {
      console.error('Voice synthesis error:', error);
    }
    return null;
  }

  private getRelevantMemoryContext(sessionId: string, currentMessage: string): string[] {
    const memories = conversationMemory.getRelevantMemories(sessionId, currentMessage, 3);
    return memories.map(memory => 
      `Previously discussed: ${memory.userMessage.substring(0, 50)}... in ${memory.context.mood} mood`
    );
  }

  private detectSentiment(message: string): 'positive' | 'negative' | 'neutral' {
    const lowerMessage = message.toLowerCase();
    
    const positiveWords = ['love', 'amazing', 'great', 'wonderful', 'excited', 'fantastic', 'beautiful', 'perfect'];
    const negativeWords = ['hate', 'terrible', 'awful', 'bad', 'disappointed', 'confused', 'lost', 'frustrated'];
    
    const positiveScore = positiveWords.reduce((score, word) => 
      score + (lowerMessage.includes(word) ? 1 : 0), 0);
    const negativeScore = negativeWords.reduce((score, word) => 
      score + (lowerMessage.includes(word) ? 1 : 0), 0);
    
    if (positiveScore > negativeScore) return 'positive';
    if (negativeScore > positiveScore) return 'negative';
    return 'neutral';
  }

  private getLocationContext(location: { lat: number; lng: number }): string {
    // Determine area based on coordinates
    const varanasi = { lat: 25.3176, lng: 82.9739 };
    const distance = this.calculateDistance(location, varanasi);
    
    if (distance < 5) {
      return this.determineCurrentArea(location);
    }
    return 'Varanasi area';
  }

  private getInteractionCount(sessionId: string): number {
    return conversationMemory.getUserProfile(sessionId)?.lastInteraction ? 
      Math.floor((Date.now() - conversationMemory.getUserProfile(sessionId)!.lastInteraction.getTime()) / (1000 * 60 * 60)) : 0;
  }

  private getFallbackPersonalizedResponse(message: string, language: string): AIResponse {
    const responses = {
      'en': {
        greeting: "Hey there! I'm Arjun, your local friend in Varanasi. What would you like to explore today?",
        food: "You know what? The food scene here is incredible! Let me tell you about some amazing local spots...",
        spiritual: "There's something truly magical about the spiritual energy in Varanasi. What draws you to explore this side?",
        general: "That's a great question! Varanasi has so much to offer. What interests you most - the culture, food, spirituality, or something else?"
      },
      'hi': {
        greeting: "नमस्ते! मैं अर्जुन हूँ, वाराणसी में आपका स्थानीय दोस्त। आज क्या देखना चाहते हैं?",
        food: "अरे वाह! यहाँ का खाना तो कमाल का है! मैं आपको कुछ बेहतरीन जगहों के बारे में बताता हूँ...",
        spiritual: "वाराणसी की आध्यात्मिक ऊर्जा वाकई अद्भुत है। आप इस तरफ क्यों आकर्षित हैं?",
        general: "बहुत अच्छा सवाल! वाराणसी में बहुत कुछ है। आपको क्या सबसे ज्यादा पसंद है - संस्कृति, खाना, आध्यात्म, या कुछ और?"
      }
    };

    const langResponses = responses[language as keyof typeof responses] || responses.en;
    const lowerMessage = message.toLowerCase();
    
    let response = langResponses.general;
    if (lowerMessage.includes('food') || lowerMessage.includes('eat')) {
      response = langResponses.food;
    } else if (lowerMessage.includes('temple') || lowerMessage.includes('spiritual')) {
      response = langResponses.spiritual;
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      response = langResponses.greeting;
    }

    const emotion: EmotionalState = {
      primary: 'warm',
      intensity: 0.7,
      energy: 'medium',
      warmth: 0.8
    };

    return {
      text: response,
      emotionalState: emotion,
      personality: {
        tone: 'warm',
        energy: 'medium',
        conversationStyle: 'friendly'
      },
      suggestions: ["Tell me about local food", "Best temples to visit", "Cultural experiences", "What's special about Varanasi?"],
      confidence: 0.8
    };
  }

  private extractLocationFromResponse(text: string): { name: string; coordinates: [number, number] } | undefined {
    const locations = AI_CONFIG.knowledgeBase.locations;
    
    for (const location of Object.values(locations)) {
      if (text.toLowerCase().includes(location.name.toLowerCase())) {
        return {
          name: location.name,
          coordinates: [location.coordinates.lat, location.coordinates.lng]
        };
      }
    }
    
    return undefined;
  }

  private calculateDistance(point1: { lat: number; lng: number }, point2: { lat: number; lng: number }): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (point2.lat - point1.lat) * Math.PI / 180;
    const dLng = (point2.lng - point1.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  private determineCurrentArea(coords: { lat: number; lng: number }): string {
    const areas = [
      { name: "Dashashwamedh Ghat Area", center: { lat: 25.3119, lng: 82.9734 }, radius: 0.5 },
      { name: "Assi Ghat Area", center: { lat: 25.2867, lng: 82.9864 }, radius: 0.5 },
      { name: "Manikarnika Ghat Area", center: { lat: 25.3159, lng: 82.9734 }, radius: 0.3 },
      { name: "BHU Campus", center: { lat: 25.2677, lng: 82.9913 }, radius: 1.0 },
      { name: "Sarnath Area", center: { lat: 25.3825, lng: 83.0220 }, radius: 1.0 }
    ];

    for (const area of areas) {
      const distance = this.calculateDistance(coords, area.center);
      if (distance <= area.radius) {
        return area.name;
      }
    }

    return "Central Varanasi";
  }
}

// Location Services (simplified version of existing functionality)
export async function getCurrentLocation(): Promise<LocationData | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        
        const locationData = await enrichLocationData(coords);
        resolve(locationData);
      },
      (error) => {
        console.error('Location error:', error);
        resolve(null);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
    );
  });
}

async function enrichLocationData(coords: { lat: number; lng: number }): Promise<LocationData> {
  const nearbyPlaces = calculateNearbyPlaces(coords);
  const currentArea = determineCurrentArea(coords);
  
  return {
    coordinates: coords,
    nearbyPlaces,
    currentArea
  };
}

function calculateNearbyPlaces(userCoords: { lat: number; lng: number }): Array<{
  name: string;
  type: string;
  distance: number;
  walkingTime: string;
}> {
  const places = Object.values(AI_CONFIG.knowledgeBase.locations).map(location => {
    const distance = calculateDistance(userCoords, location.coordinates);
    return {
      name: location.name,
      type: location.type,
      distance: Math.round(distance * 1000), // Convert to meters
      walkingTime: estimateWalkingTime(distance)
    };
  });

  return places
    .filter(place => place.distance <= 2000) // Within 2km
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 5);
}

function calculateDistance(point1: { lat: number; lng: number }, point2: { lat: number; lng: number }): number {
  const R = 6371;
  const dLat = (point2.lat - point1.lat) * Math.PI / 180;
  const dLng = (point2.lng - point1.lng) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function estimateWalkingTime(distance: number): string {
  const walkingSpeed = 5; // km/h
  const timeInHours = distance / walkingSpeed;
  const timeInMinutes = Math.round(timeInHours * 60);
  
  if (timeInMinutes < 1) return "< 1 min";
  if (timeInMinutes < 60) return `${timeInMinutes} min`;
  
  const hours = Math.floor(timeInMinutes / 60);
  const minutes = timeInMinutes % 60;
  return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
}

function determineCurrentArea(coords: { lat: number; lng: number }): string {
  const areas = [
    { name: "Dashashwamedh Ghat Area", center: { lat: 25.3119, lng: 82.9734 }, radius: 0.5 },
    { name: "Assi Ghat Area", center: { lat: 25.2867, lng: 82.9864 }, radius: 0.5 },
    { name: "Manikarnika Ghat Area", center: { lat: 25.3159, lng: 82.9734 }, radius: 0.3 },
    { name: "BHU Campus", center: { lat: 25.2677, lng: 82.9913 }, radius: 1.0 },
    { name: "Sarnath Area", center: { lat: 25.3825, lng: 83.0220 }, radius: 1.0 }
  ];

  for (const area of areas) {
    const distance = calculateDistance(coords, area.center);
    if (distance <= area.radius) {
      return area.name;
    }
  }

  return "Central Varanasi";
}

// Export the enhanced AI service
export const enhancedAI = new EnhancedAIService();

// Legacy function exports for compatibility
export async function getOpenAIResponse(message: string, language: string = 'en', sessionId: string = 'default'): Promise<AIResponse> {
  return enhancedAI.getPersonalizedResponse(message, language, sessionId);
}

export async function getEnhancedResponse(
  message: string,
  language: string = 'en',
  sessionId: string = 'default',
  userLocation?: { lat: number; lng: number }
): Promise<AIResponse> {
  return enhancedAI.getPersonalizedResponse(message, language, sessionId, userLocation);
}

export function generateDirectionsUrl(
  from: { lat: number; lng: number },
  to: { lat: number; lng: number },
  mode: 'walking' | 'driving' | 'transit' = 'walking'
): string {
  const baseUrl = 'https://www.google.com/maps/dir/';
  return `${baseUrl}${from.lat},${from.lng}/${to.lat},${to.lng}/@${from.lat},${from.lng},15z/data=!4m2!4m1!3e${mode === 'walking' ? '2' : mode === 'transit' ? '3' : '0'}`;
}

// Voice services using emotional voice engine
export async function speechToText(audioBlob: Blob, language: string = 'en'): Promise<string> {
  // Browser speech recognition as fallback
  return new Promise((resolve) => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      resolve("Speech recognition not supported");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = language === 'hi' ? 'hi-IN' : 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      resolve(transcript);
    };

    recognition.onerror = () => {
      resolve("Could not understand audio");
    };

    recognition.start();
  });
}

export async function textToSpeech(text: string, language: string = 'en'): Promise<string | null> {
  const emotion: EmotionalState = {
    primary: 'warm',
    intensity: 0.7,
    energy: 'medium',
    warmth: 0.8
  };
  
  return emotionalVoice.synthesizeSpeech(text, emotion, language, 'browser')
    .then(audioBuffer => {
      if (audioBuffer) {
        const blob = new Blob([audioBuffer], { type: 'audio/mpeg' });
        return URL.createObjectURL(blob);
      }
      return null;
    })
    .catch(() => null);
}

export function clearConversation(sessionId: string) {
  conversationMemory.getUserProfile(sessionId); // This will clear old memories automatically
}

export function getConversationHistory(sessionId: string) {
  return conversationMemory.getConversationSummary(sessionId);
}

// AI Agent Integration for autonomous capabilities
export async function getAIAgentResponse(
  message: string,
  sessionId: string,
  userLocation?: { lat: number; lng: number },
  language: string = 'en'
): Promise<any> {
  try {
    const { aiAgent } = await import('./aiAgent');
    return aiAgent.processMessage(message, sessionId, userLocation, language);
  } catch (error) {
    console.error('AI Agent import error:', error);
    // Fallback to enhanced response
    return getEnhancedResponse(message, language, sessionId, userLocation);
  }
} 