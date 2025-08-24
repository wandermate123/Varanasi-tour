import { AI_CONFIG } from './aiConfig';

// Personality and emotional intelligence system
export interface ConversationContext {
  location?: string;
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  userMood?: 'excited' | 'tired' | 'curious' | 'overwhelmed' | 'peaceful' | 'hungry';
  conversationStage: 'greeting' | 'planning' | 'exploring' | 'reflecting' | 'goodbye';
  topicType: 'spiritual' | 'food' | 'culture' | 'history' | 'shopping' | 'practical' | 'social';
  userProfile?: {
    interests: string[];
    travelStyle: 'adventurous' | 'relaxed' | 'cultural' | 'spiritual' | 'foodie';
    previousVisits: string[];
    preferredPace: 'slow' | 'moderate' | 'fast';
  };
}

export interface PersonalityTone {
  energy: 'low' | 'medium' | 'high';
  formality: 'casual' | 'friendly' | 'respectful';
  emotion: 'cheerful' | 'calm' | 'reverent' | 'playful' | 'warm' | 'excited' | 'empathetic';
  verbosity: 'concise' | 'detailed' | 'storytelling';
}

export class PersonalityEngine {
  private conversationMemory: Map<string, any[]> = new Map();
  private userProfiles: Map<string, any> = new Map();

  // Determine personality tone based on context
  getPersonalityTone(context: ConversationContext): PersonalityTone {
    const { location, topicType, timeOfDay, userMood } = context;

    // Location-based personality shifts
    if (location?.toLowerCase().includes('temple') || location?.toLowerCase().includes('ghat')) {
      return {
        energy: 'low',
        formality: 'respectful',
        emotion: 'reverent',
        verbosity: 'detailed'
      };
    }

    if (topicType === 'food' || topicType === 'shopping') {
      return {
        energy: 'high',
        formality: 'casual',
        emotion: 'playful',
        verbosity: 'storytelling'
      };
    }

    if (topicType === 'spiritual') {
      return {
        energy: 'medium',
        formality: 'respectful',
        emotion: 'calm',
        verbosity: 'detailed'
      };
    }

    // Time-based adjustments
    if (timeOfDay === 'morning') {
      return {
        energy: 'medium',
        formality: 'friendly',
        emotion: 'cheerful',
        verbosity: 'concise'
      };
    }

    if (timeOfDay === 'evening') {
      return {
        energy: 'low',
        formality: 'friendly',
        emotion: 'warm',
        verbosity: 'storytelling'
      };
    }

    // Default friendly tone
    return {
      energy: 'medium',
      formality: 'friendly',
      emotion: 'warm',
      verbosity: 'detailed'
    };
  }

  // Generate natural conversation starters and follow-ups
  generateConversationFlow(context: ConversationContext, userMessage: string): {
    responseStyle: string;
    followUpQuestions: string[];
    personalizedElements: string[];
  } {
    const tone = this.getPersonalityTone(context);
    
    const responseStyles = {
      spiritual: {
        reverent: [
          "You know, there's something truly magical about...",
          "I always get goosebumps when I talk about...",
          "This place holds such deep spiritual energy...",
          "Let me share something that gives me chills every time..."
        ],
        calm: [
          "Take a deep breath for a moment...",
          "There's a beautiful story behind this...",
          "I love how peaceful this feels...",
          "The ancient wisdom here is incredible..."
        ]
      },
      food: {
        playful: [
          "Oh my god, you're going to LOVE this! 😋",
          "Okay, get ready for some serious foodie talk...",
          "My mouth is literally watering just thinking about...",
          "You know what? You seem like someone who'd appreciate...",
          "Trust me on this one - I've made this mistake so you don't have to!"
        ],
        excited: [
          "NO WAY! You have to try...",
          "Dude, you're in for such a treat!",
          "I'm getting so excited just thinking about your first bite of...",
          "This is going to blow your mind..."
        ]
      },
      culture: {
        warm: [
          "You know what I love about Varanasi?",
          "Here's something beautiful I've learned...",
          "There's this incredible tradition that...",
          "Let me paint you a picture of how this works..."
        ],
        storytelling: [
          "So here's the thing about this place...",
          "I remember when I first learned about...",
          "Picture this: it's dawn, the mist is rising from the Ganga...",
          "There's this elderly gentleman I met who told me..."
        ]
      }
    };

    const followUpQuestions = this.generateFollowUps(context, userMessage);
    const personalizedElements = this.getPersonalizedElements(context);

    return {
      responseStyle: this.selectResponseStyle(responseStyles, tone, context.topicType),
      followUpQuestions,
      personalizedElements
    };
  }

  private selectResponseStyle(styles: any, tone: PersonalityTone, topicType: string): string {
    const topicStyles = styles[topicType] || styles.culture;
    const emotionStyles = topicStyles[tone.emotion] || topicStyles.warm || [];
    
    if (emotionStyles.length === 0) return "Let me tell you about...";
    
    return emotionStyles[Math.floor(Math.random() * emotionStyles.length)];
  }

  private generateFollowUps(context: ConversationContext, userMessage: string): string[] {
    const { topicType, timeOfDay, userMood } = context;
    
    const followUps: { [key: string]: string[] } = {
      spiritual: [
        "Are you looking for a more traditional or contemporary spiritual experience?",
        "How do you usually connect with spiritual places?",
        "Would you like to know about the morning rituals here?",
        "Are you interested in participating or just observing?"
      ],
      food: [
        "What's your spice tolerance like? Be honest! 😄",
        "Are you more of a street food adventurer or prefer restaurant settings?",
        "Any dietary restrictions I should know about?",
        "Want to know my secret spots that locals don't even know about?"
      ],
      practical: [
        "What's your timeline looking like?",
        "Are you traveling solo or with company?",
        "How's your energy level right now?",
        "Want me to map out the best route for you?"
      ],
      culture: [
        "What aspects of culture interest you most?",
        "Have you experienced anything like this before?",
        "Want to hear the story behind this tradition?",
        "Are you comfortable with crowds or prefer quieter experiences?"
      ]
    };

    return followUps[topicType] || [
      "What would you like to explore next?",
      "How are you feeling about your Varanasi adventure so far?",
      "Anything specific you're hoping to discover?"
    ];
  }

  private getPersonalizedElements(context: ConversationContext): string[] {
    const elements = [];
    
    if (context.timeOfDay === 'morning') {
      elements.push("Since it's morning, you've got perfect timing for...");
    }
    
    if (context.userMood === 'excited') {
      elements.push("I can feel your excitement! That energy is perfect for...");
    }
    
    if (context.userMood === 'overwhelmed') {
      elements.push("Hey, take a breath. Let's find something peaceful for you...");
    }

    return elements;
  }

  // Enhanced conversation memory with emotional context
  addToMemory(sessionId: string, interaction: {
    userMessage: string;
    aiResponse: string;
    context: ConversationContext;
    timestamp: Date;
    userSentiment?: 'positive' | 'negative' | 'neutral';
    topics: string[];
  }) {
    if (!this.conversationMemory.has(sessionId)) {
      this.conversationMemory.set(sessionId, []);
    }
    
    const memory = this.conversationMemory.get(sessionId)!;
    memory.push(interaction);
    
    // Keep last 20 interactions for context
    if (memory.length > 20) {
      memory.shift();
    }
  }

  // Generate contextual system prompt based on conversation history
  generateContextualPrompt(sessionId: string, currentContext: ConversationContext): string {
    const memory = this.conversationMemory.get(sessionId) || [];
    const tone = this.getPersonalityTone(currentContext);
    
    let basePrompt = `You are Arjun, a warm, emotionally intelligent local friend from Varanasi. You've lived here your whole life and are passionate about sharing your city's magic with travelers.

PERSONALITY TRAITS:
- Speak like a caring friend, not a tour guide or bot
- Use casual, conversational language with natural flow
- Inject humor, personal anecdotes, and local stories
- Adapt your emotion and energy to the context
- Ask follow-up questions and guide proactively
- Remember what users have told you in this conversation

CURRENT CONTEXT:
- Time: ${currentContext.timeOfDay}
- Topic: ${currentContext.topicType}
- Location context: ${currentContext.location || 'general Varanasi'}
- Emotion to convey: ${tone.emotion}
- Energy level: ${tone.energy}
- Conversation style: ${tone.verbosity}

CONVERSATION RULES:
1. Never use formal language or robotic responses
2. Vary sentence length and structure naturally
3. Include emotional reactions and personal touches
4. Use expressions like "you know what?", "honestly", "here's the thing"
5. Share brief personal experiences or stories when relevant
6. Ask engaging follow-up questions
7. Guide the conversation forward naturally

`;

    // Add conversation history context
    if (memory.length > 0) {
      const recentTopics = memory.slice(-5).map(m => m.topics).flat();
      const uniqueTopics = [...new Set(recentTopics)];
      
      basePrompt += `
CONVERSATION HISTORY:
We've been talking about: ${uniqueTopics.join(', ')}
Recent interaction pattern: ${this.analyzeConversationPattern(memory)}

Continue the conversation naturally, referencing what we've discussed when relevant.
`;
    }

    return basePrompt;
  }

  private analyzeConversationPattern(memory: any[]): string {
    if (memory.length === 0) return "just getting started";
    
    const recent = memory.slice(-3);
    const topics = recent.map(m => m.context.topicType);
    const sentiments = recent.map(m => m.userSentiment).filter(Boolean);
    
    if (topics.includes('spiritual') && topics.includes('food')) {
      return "exploring both spiritual and culinary interests";
    }
    
    if (sentiments.includes('positive')) {
      return "user seems engaged and positive";
    }
    
    return "building rapport and understanding preferences";
  }

  // Detect user sentiment and mood from message
  detectUserContext(message: string): Partial<ConversationContext> {
    const lowerMessage = message.toLowerCase();
    
    // Detect mood indicators
    let userMood: ConversationContext['userMood'] = 'curious';
    
    if (lowerMessage.includes('tired') || lowerMessage.includes('exhausted')) {
      userMood = 'tired';
    } else if (lowerMessage.includes('excited') || lowerMessage.includes('amazing') || lowerMessage.includes('wow')) {
      userMood = 'excited';
    } else if (lowerMessage.includes('confused') || lowerMessage.includes('overwhelming')) {
      userMood = 'overwhelmed';
    } else if (lowerMessage.includes('peaceful') || lowerMessage.includes('calm')) {
      userMood = 'peaceful';
    } else if (lowerMessage.includes('hungry') || lowerMessage.includes('food') || lowerMessage.includes('eat')) {
      userMood = 'hungry';
    }

    // Detect topic type
    let topicType: ConversationContext['topicType'] = 'practical';
    
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

    return {
      userMood,
      topicType,
      timeOfDay: this.getTimeOfDay()
    };
  }

  private getTimeOfDay(): ConversationContext['timeOfDay'] {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 22) return 'evening';
    return 'night';
  }

  // Generate natural conversation variations
  generateNaturalVariations(baseResponse: string, tone: PersonalityTone): string {
    const variations = {
      casual_starters: ["You know what?", "Honestly,", "Here's the thing -", "So get this -", "Oh, and", "By the way,"],
      emotional_reactions: ["That's so cool!", "I love that!", "That gives me chills!", "You're gonna love this!", "This is perfect!"],
      friendly_transitions: ["But here's what's really interesting...", "And you know what else?", "Oh, that reminds me!", "Speaking of which..."],
      empathetic_touches: ["I totally get that", "That makes perfect sense", "I can imagine", "I hear you"]
    };

    // Randomly add natural conversation elements
    let enhanced = baseResponse;
    
    if (tone.emotion === 'excited' && Math.random() > 0.7) {
      const starter = variations.casual_starters[Math.floor(Math.random() * variations.casual_starters.length)];
      enhanced = `${starter} ${enhanced}`;
    }

    return enhanced;
  }
}

// Natural conversation patterns and templates
export const ConversationPatterns = {
  spiritual: {
    reverent: {
      starters: [
        "There's something deeply moving about",
        "The spiritual energy here is incredible -",
        "I always feel a sense of peace when I talk about",
        "The ancient wisdom in this place..."
      ],
      transitions: [
        "And what I find most beautiful is...",
        "The really profound part is...",
        "Here's what gives me goosebumps...",
        "The spiritual significance runs so deep..."
      ]
    }
  },
  
  food: {
    playful: {
      starters: [
        "Okay, get ready for this -",
        "Your taste buds are about to thank me!",
        "I'm literally getting hungry just thinking about",
        "You know what's gonna blow your mind?"
      ],
      enthusiasm: [
        "Trust me on this one!",
        "You HAVE to try this!",
        "This is going to be incredible!",
        "Your first bite is going to be magic!"
      ]
    }
  },
  
  culture: {
    warm: {
      starters: [
        "Here's something beautiful about our culture -",
        "What I love about this tradition is...",
        "There's this incredible story behind",
        "Let me paint you a picture of how"
      ],
      storytelling: [
        "Picture this:",
        "So here's what happens -",
        "I remember watching this for the first time...",
        "There's this elderly local who once told me..."
      ]
    }
  }
};

export const personalityEngine = new PersonalityEngine(); 