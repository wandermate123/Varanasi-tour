// Advanced conversation memory with vector embeddings and personalization
export interface MemoryEntry {
  id: string;
  sessionId: string;
  userMessage: string;
  aiResponse: string;
  timestamp: Date;
  context: {
    location?: string;
    mood: string;
    topicType: string;
    userSentiment: 'positive' | 'negative' | 'neutral';
    interests: string[];
  };
  embedding?: number[];
  importance: number; // 0-1 scale
}

export interface UserProfile {
  sessionId: string;
  preferences: {
    travelStyle: 'adventurous' | 'relaxed' | 'cultural' | 'spiritual' | 'foodie';
    interests: string[];
    avoidances: string[];
    spiceLevel: 'mild' | 'medium' | 'spicy';
    budgetRange: 'budget' | 'mid' | 'luxury';
    groupSize: 'solo' | 'couple' | 'group';
  };
  visitedPlaces: string[];
  emotionalProfile: {
    responseToSpiritual: 'curious' | 'reverent' | 'skeptical';
    socialLevel: 'introverted' | 'extroverted' | 'balanced';
    adventurousness: number; // 0-1 scale
  };
  conversationStyle: {
    prefersDetailedInfo: boolean;
    enjoysStories: boolean;
    likesHumor: boolean;
    needsEncouragement: boolean;
  };
  lastInteraction: Date;
}

class ConversationMemorySystem {
  private memories: Map<string, MemoryEntry[]> = new Map();
  private userProfiles: Map<string, UserProfile> = new Map();
  private importantMemories: Map<string, MemoryEntry[]> = new Map();

  // Add new conversation entry with automatic analysis
  async addMemory(entry: Omit<MemoryEntry, 'id' | 'embedding' | 'importance'>): Promise<void> {
    const id = `${entry.sessionId}-${Date.now()}`;
    const importance = this.calculateImportance(entry);
    
    const memoryEntry: MemoryEntry = {
      ...entry,
      id,
      importance,
      embedding: await this.generateEmbedding(entry.userMessage + ' ' + entry.aiResponse)
    };

    // Add to session memory
    if (!this.memories.has(entry.sessionId)) {
      this.memories.set(entry.sessionId, []);
    }
    this.memories.get(entry.sessionId)!.push(memoryEntry);

    // Store important memories separately
    if (importance > 0.7) {
      if (!this.importantMemories.has(entry.sessionId)) {
        this.importantMemories.set(entry.sessionId, []);
      }
      this.importantMemories.get(entry.sessionId)!.push(memoryEntry);
    }

    // Update user profile
    this.updateUserProfile(entry.sessionId, entry);

    // Cleanup old memories (keep last 50 per session)
    this.cleanupMemories(entry.sessionId);
  }

  // Calculate importance score for memory
  private calculateImportance(entry: Omit<MemoryEntry, 'id' | 'embedding' | 'importance'>): number {
    let score = 0.3; // Base score

    // Topic importance
    const topicScores = {
      'spiritual': 0.8,
      'food': 0.6,
      'culture': 0.7,
      'history': 0.7,
      'practical': 0.4,
      'shopping': 0.5
    };
    score += topicScores[entry.context.topicType as keyof typeof topicScores] || 0.3;

    // Sentiment importance
    if (entry.context.userSentiment === 'positive') score += 0.2;
    if (entry.context.userSentiment === 'negative') score += 0.3; // Negative feedback is important

    // Message content analysis
    const messageLength = entry.userMessage.length;
    if (messageLength > 100) score += 0.1; // Longer messages often more important

    // Preference indicators
    const preferenceKeywords = ['love', 'hate', 'prefer', 'favorite', 'never', 'always', 'dislike'];
    const hasPreferences = preferenceKeywords.some(keyword => 
      entry.userMessage.toLowerCase().includes(keyword)
    );
    if (hasPreferences) score += 0.3;

    return Math.min(1.0, score);
  }

  // Generate embeddings for semantic search (simplified version)
  private async generateEmbedding(text: string): Promise<number[]> {
    // In production, use OpenAI embeddings or similar
    // For now, return a simple hash-based embedding
    const words = text.toLowerCase().split(/\s+/);
    const embedding = new Array(384).fill(0);
    
    words.forEach((word, index) => {
      const hash = this.simpleHash(word);
      embedding[hash % 384] += 1;
    });

    // Normalize
    const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
    return magnitude > 0 ? embedding.map(val => val / magnitude) : embedding;
  }

  private simpleHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  // Update user profile based on conversation
  private updateUserProfile(sessionId: string, entry: Omit<MemoryEntry, 'id' | 'embedding' | 'importance'>): void {
    if (!this.userProfiles.has(sessionId)) {
      this.userProfiles.set(sessionId, this.createDefaultProfile(sessionId));
    }

    const profile = this.userProfiles.get(sessionId)!;
    
    // Update interests based on topics
    if (!profile.preferences.interests.includes(entry.context.topicType)) {
      profile.preferences.interests.push(entry.context.topicType);
    }

    // Analyze message for preferences
    const message = entry.userMessage.toLowerCase();
    
    // Travel style detection
    if (message.includes('adventure') || message.includes('exciting')) {
      profile.preferences.travelStyle = 'adventurous';
    } else if (message.includes('peaceful') || message.includes('quiet')) {
      profile.preferences.travelStyle = 'relaxed';
    } else if (message.includes('spiritual') || message.includes('temple')) {
      profile.preferences.travelStyle = 'spiritual';
    } else if (message.includes('food') || message.includes('eat')) {
      profile.preferences.travelStyle = 'foodie';
    }

    // Spice level detection
    if (message.includes('spicy') || message.includes('hot')) {
      profile.preferences.spiceLevel = 'spicy';
    } else if (message.includes('mild') || message.includes('not spicy')) {
      profile.preferences.spiceLevel = 'mild';
    }

    // Social level detection
    if (message.includes('alone') || message.includes('solo')) {
      profile.preferences.groupSize = 'solo';
    } else if (message.includes('group') || message.includes('friends')) {
      profile.preferences.groupSize = 'group';
    }

    // Conversation style preferences
    if (entry.aiResponse.length > 300 && entry.context.userSentiment === 'positive') {
      profile.conversationStyle.prefersDetailedInfo = true;
    }

    if (entry.aiResponse.includes('story') && entry.context.userSentiment === 'positive') {
      profile.conversationStyle.enjoysStories = true;
    }

    profile.lastInteraction = entry.timestamp;
  }

  private createDefaultProfile(sessionId: string): UserProfile {
    return {
      sessionId,
      preferences: {
        travelStyle: 'cultural',
        interests: [],
        avoidances: [],
        spiceLevel: 'medium',
        budgetRange: 'mid',
        groupSize: 'solo'
      },
      visitedPlaces: [],
      emotionalProfile: {
        responseToSpiritual: 'curious',
        socialLevel: 'balanced',
        adventurousness: 0.5
      },
      conversationStyle: {
        prefersDetailedInfo: false,
        enjoysStories: false,
        likesHumor: false,
        needsEncouragement: false
      },
      lastInteraction: new Date()
    };
  }

  // Get relevant memories for context
  getRelevantMemories(sessionId: string, query: string, limit: number = 5): MemoryEntry[] {
    const sessionMemories = this.memories.get(sessionId) || [];
    if (sessionMemories.length === 0) return [];

    // Simple relevance scoring based on keyword matching
    const queryWords = query.toLowerCase().split(/\s+/);
    
    const scoredMemories = sessionMemories.map(memory => {
      let score = 0;
      const memoryText = (memory.userMessage + ' ' + memory.aiResponse).toLowerCase();
      
      queryWords.forEach(word => {
        if (memoryText.includes(word)) score += 1;
      });
      
      // Boost important memories
      score += memory.importance * 2;
      
      // Boost recent memories
      const hoursSinceMemory = (Date.now() - memory.timestamp.getTime()) / (1000 * 60 * 60);
      if (hoursSinceMemory < 1) score += 1;
      else if (hoursSinceMemory < 24) score += 0.5;

      return { memory, score };
    });

    return scoredMemories
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.memory);
  }

  // Get user profile for personalization
  getUserProfile(sessionId: string): UserProfile | null {
    return this.userProfiles.get(sessionId) || null;
  }

  // Generate personalized conversation context
  generatePersonalizedContext(sessionId: string, currentTopic: string): string {
    const profile = this.getUserProfile(sessionId);
    const relevantMemories = this.getRelevantMemories(sessionId, currentTopic, 3);
    
    let context = "";

    if (profile) {
      context += `USER PROFILE:
- Travel style: ${profile.preferences.travelStyle}
- Interests: ${profile.preferences.interests.join(', ')}
- Conversation style: ${profile.conversationStyle.prefersDetailedInfo ? 'detailed' : 'concise'}, ${profile.conversationStyle.enjoysStories ? 'storytelling' : 'factual'}
- Group: ${profile.preferences.groupSize}
- Spice level: ${profile.preferences.spiceLevel}
`;
    }

    if (relevantMemories.length > 0) {
      context += `\nRELEVANT CONVERSATION HISTORY:
${relevantMemories.map(m => `- User mentioned: "${m.userMessage}" (${m.context.mood} mood)`).join('\n')}
`;
    }

    return context;
  }

  // Clean up old memories
  private cleanupMemories(sessionId: string): void {
    const memories = this.memories.get(sessionId);
    if (memories && memories.length > 50) {
      // Keep important memories and recent ones
      const important = memories.filter(m => m.importance > 0.7);
      const recent = memories.slice(-30);
      const combined = [...important, ...recent];
      
      // Remove duplicates
      const unique = combined.filter((memory, index, self) => 
        index === self.findIndex(m => m.id === memory.id)
      );
      
      this.memories.set(sessionId, unique);
    }
  }

  // Get conversation summary for context
  getConversationSummary(sessionId: string): string {
    const memories = this.memories.get(sessionId) || [];
    const profile = this.getUserProfile(sessionId);
    
    if (memories.length === 0) return "New conversation";

    const topics = [...new Set(memories.map(m => m.context.topicType))];
    const moods = memories.map(m => m.context.mood);
    const recentMood = moods[moods.length - 1];
    
    let summary = `Conversation topics: ${topics.join(', ')}. `;
    summary += `Current mood: ${recentMood}. `;
    
    if (profile) {
      summary += `User style: ${profile.preferences.travelStyle}. `;
      if (profile.conversationStyle.enjoysStories) {
        summary += "Enjoys stories and anecdotes. ";
      }
      if (profile.conversationStyle.prefersDetailedInfo) {
        summary += "Prefers detailed information. ";
      }
    }

    return summary;
  }
}

export const conversationMemory = new ConversationMemorySystem(); 