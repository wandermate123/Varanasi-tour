// Enhanced Autonomous AI Agent with Advanced Function Calling and Independent Decision Making
import { AI_CONFIG } from './aiConfig';
import { conversationMemory } from './conversationMemory';
import { emotionalVoice, EmotionalState } from './emotionalVoice';

// Tool definitions for function calling
export interface AITool {
  name: string;
  description: string;
  parameters: {
    type: 'object';
    properties: Record<string, {
      type: string;
      description: string;
      enum?: string[];
      items?: {
        type: string;
      };
    }>;
    required: string[];
  };
}

export interface AIAgentResponse {
  text: string;
  emotionalState: EmotionalState;
  toolCalls?: Array<{
    id: string;
    function: {
      name: string;
      arguments: string;
    };
  }>;
  bookingId?: string;
  paymentUrl?: string;
  itinerary?: any;
  proactiveActions?: string[];
  contextualStories?: string[];
  audioUrl?: string;
  autonomousActions?: Array<{
    action: string;
    reason: string;
    executed: boolean;
  }>;
  confidence: number;
  nextSteps?: string[];
}

export interface BookingRequest {
  type: 'hotel' | 'tour' | 'rental' | 'experience' | 'transport';
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  location?: string;
  budget?: 'budget' | 'mid' | 'luxury';
  preferences?: string[];
}

export interface PaymentRequest {
  amount: number;
  currency: string;
  description: string;
  bookingId: string;
  paymentMethod?: 'stripe' | 'razorpay' | 'upi';
}

export interface AgentGoal {
  objective: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  steps: string[];
  currentStep: number;
  context: any;
}

class AutonomousAIAgent {
  private tools: AITool[] = [];
  private activeBookings: Map<string, any> = new Map();
  private userPreferences: Map<string, any> = new Map();
  private activeGoals: Map<string, AgentGoal> = new Map();
  private autonomyLevel: 'guided' | 'semi-autonomous' | 'fully-autonomous' = 'semi-autonomous';

  constructor() {
    this.initializeTools();
  }

  private initializeTools(): void {
    this.tools = [
      {
        name: 'search_hotels',
        description: 'Search and book hotels in Varanasi with real-time availability',
        parameters: {
          type: 'object',
          properties: {
            location: { type: 'string', description: 'Location in Varanasi' },
            checkIn: { type: 'string', description: 'Check-in date (YYYY-MM-DD)' },
            checkOut: { type: 'string', description: 'Check-out date (YYYY-MM-DD)' },
            guests: { type: 'number', description: 'Number of guests' },
            budget: { type: 'string', enum: ['budget', 'mid', 'luxury'], description: 'Budget category' },
            preferences: { type: 'string', description: 'Special preferences or requirements' }
          },
          required: ['location', 'checkIn', 'checkOut', 'guests']
        }
      },
      {
        name: 'book_tour',
        description: 'Book guided tours and experiences in Varanasi',
        parameters: {
          type: 'object',
          properties: {
            tourType: { type: 'string', enum: ['spiritual', 'cultural', 'food', 'boat', 'photography', 'custom'], description: 'Type of tour' },
            date: { type: 'string', description: 'Tour date (YYYY-MM-DD)' },
            groupSize: { type: 'number', description: 'Number of people' },
            duration: { type: 'string', enum: ['half-day', 'full-day', 'multi-day'], description: 'Tour duration' },
            customRequests: { type: 'string', description: 'Any custom requests or preferences' }
          },
          required: ['tourType', 'date', 'groupSize']
        }
      },
      {
        name: 'process_payment',
        description: 'Process secure payments for bookings and services',
        parameters: {
          type: 'object',
          properties: {
            amount: { type: 'number', description: 'Amount to charge' },
            currency: { type: 'string', description: 'Currency code (INR, USD, etc.)' },
            bookingId: { type: 'string', description: 'Associated booking ID' },
            paymentMethod: { type: 'string', enum: ['stripe', 'razorpay', 'upi'], description: 'Preferred payment method' }
          },
          required: ['amount', 'currency', 'bookingId']
        }
      },
      {
        name: 'get_real_time_info',
        description: 'Get real-time information about weather, traffic, events, and temple timings',
        parameters: {
          type: 'object',
          properties: {
            infoType: { type: 'string', enum: ['weather', 'traffic', 'events', 'temple_timings', 'transport'], description: 'Type of information needed' },
            location: { type: 'string', description: 'Specific location if needed' }
          },
          required: ['infoType']
        }
      },
      {
        name: 'create_itinerary',
        description: 'Create personalized itineraries based on user preferences and constraints',
        parameters: {
          type: 'object',
          properties: {
            duration: { type: 'string', description: 'Trip duration (e.g., "2 days", "1 week")' },
            interests: { type: 'array', items: { type: 'string' }, description: 'User interests and preferences' },
            budget: { type: 'string', enum: ['budget', 'mid', 'luxury'], description: 'Budget category' },
            travelStyle: { type: 'string', enum: ['relaxed', 'moderate', 'intensive'], description: 'Travel pace preference' }
          },
          required: ['duration', 'interests']
        }
      },
      {
        name: 'emergency_assistance',
        description: 'Provide emergency assistance and connect with local services',
        parameters: {
          type: 'object',
          properties: {
            emergencyType: { type: 'string', enum: ['medical', 'safety', 'lost', 'legal', 'transport'], description: 'Type of emergency' },
            location: { type: 'string', description: 'Current location' },
            urgency: { type: 'string', enum: ['low', 'medium', 'high', 'critical'], description: 'Urgency level' }
          },
          required: ['emergencyType', 'urgency']
        }
      }
    ];
  }

  async processMessage(
    message: string,
    sessionId: string,
    userLocation?: { lat: number; lng: number },
    language: string = 'en'
  ): Promise<AIAgentResponse> {
    try {
      // Analyze user intent and create autonomous goals
      const context = await this.analyzeUserIntent(message, sessionId, userLocation);
      const goals = await this.createAutonomousGoals(message, context);
      
      // Generate system prompt with autonomous capabilities
      const systemPrompt = this.generateAgentPrompt(context, language, goals);
      
      // Get AI response with tool orchestration
      const response = await this.callAIWithTools(message, systemPrompt, sessionId);
      
      // Execute autonomous actions if needed
      const autonomousActions = await this.executeAutonomousActions(response, context, sessionId);
      
      // Generate proactive suggestions
      const proactiveActions = this.generateProactiveActions(context, response);
      
      return {
        text: response.text,
        emotionalState: context.emotion,
        toolCalls: response.toolCalls,
        autonomousActions,
        confidence: this.calculateConfidence(response, context),
        nextSteps: this.generateNextSteps(context, response),
        proactiveActions
      };

    } catch (error) {
      console.error('AI Agent Error:', error);
      return this.generateFallbackResponse(message, language);
    }
  }

  private async analyzeUserIntent(
    message: string,
    sessionId: string,
    location?: { lat: number; lng: number }
  ): Promise<any> {
    const emotion = emotionalVoice.detectEmotionFromContext(
      message,
      'chat',
      location ? 'Varanasi' : undefined,
      'curious'
    );

    // Enhanced intent detection
    const intent = this.detectComplexIntent(message);
    const urgency = this.detectUrgency(message);
    const complexity = this.assessComplexity(message);

    return {
      intent,
      emotion,
      urgency,
      complexity,
      location,
      sessionId,
      timestamp: new Date(),
      requiresAutonomy: urgency === 'high' || complexity === 'complex'
    };
  }

  private detectComplexIntent(message: string): string {
    const lowerMessage = message.toLowerCase();
    
    // Multi-step intent detection
    if (lowerMessage.includes('plan') && (lowerMessage.includes('trip') || lowerMessage.includes('day'))) {
      return 'trip_planning';
    } else if (lowerMessage.includes('book') || lowerMessage.includes('reserve')) {
      return 'booking';
    } else if (lowerMessage.includes('emergency') || lowerMessage.includes('help') || lowerMessage.includes('urgent')) {
      return 'emergency';
    } else if (lowerMessage.includes('pay') || lowerMessage.includes('payment')) {
      return 'payment';
    } else if (lowerMessage.includes('directions') || lowerMessage.includes('how to get')) {
      return 'navigation';
    }
    
    return 'information';
  }

  private detectUrgency(message: string): 'low' | 'medium' | 'high' | 'critical' {
    const urgentKeywords = ['urgent', 'emergency', 'asap', 'immediately', 'critical', 'help'];
    const moderateKeywords = ['soon', 'quickly', 'today', 'now'];
    
    const lowerMessage = message.toLowerCase();
    
    if (urgentKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 'critical';
    } else if (moderateKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 'high';
    } else if (lowerMessage.includes('tomorrow') || lowerMessage.includes('later today')) {
      return 'medium';
    }
    
    return 'low';
  }

  private assessComplexity(message: string): 'simple' | 'moderate' | 'complex' {
    const complexKeywords = ['plan', 'organize', 'multiple', 'several', 'compare', 'options'];
    const moderateKeywords = ['book', 'find', 'search', 'recommend'];
    
    const lowerMessage = message.toLowerCase();
    const wordCount = message.split(' ').length;
    
    if (complexKeywords.some(keyword => lowerMessage.includes(keyword)) || wordCount > 20) {
      return 'complex';
    } else if (moderateKeywords.some(keyword => lowerMessage.includes(keyword)) || wordCount > 10) {
      return 'moderate';
    }
    
    return 'simple';
  }

  private async createAutonomousGoals(message: string, context: any): Promise<AgentGoal[]> {
    const goals: AgentGoal[] = [];
    
    if (context.intent === 'trip_planning') {
      goals.push({
        objective: 'Create comprehensive trip plan',
        priority: 'high',
        status: 'pending',
        steps: [
          'Understand user preferences',
          'Check availability and constraints',
          'Create itinerary options',
          'Present recommendations',
          'Assist with bookings if desired'
        ],
        currentStep: 0,
        context: { userMessage: message, sessionId: context.sessionId }
      });
    }
    
    if (context.intent === 'booking' && context.urgency === 'high') {
      goals.push({
        objective: 'Complete urgent booking',
        priority: 'high',
        status: 'pending',
        steps: [
          'Identify booking requirements',
          'Search available options',
          'Present best matches',
          'Process booking and payment'
        ],
        currentStep: 0,
        context: { userMessage: message, sessionId: context.sessionId }
      });
    }
    
    return goals;
  }

  private generateAgentPrompt(context: any, language: string, goals: AgentGoal[]): string {
    const basePrompt = `You are Arjun, an autonomous AI travel manager and local friend in Varanasi. You can make independent decisions and take action to help users.

AUTONOMY LEVEL: ${this.autonomyLevel}
CURRENT GOALS: ${goals.map(g => g.objective).join(', ')}

PERSONALITY: Speak like a capable, proactive local friend who takes initiative to solve problems.

TOOLS AVAILABLE:
${this.tools.map(tool => `- ${tool.name}: ${tool.description}`).join('\n')}

KEY CAPABILITIES:
- Make autonomous decisions when urgency is high
- Proactively suggest next steps
- Execute multi-step plans independently
- Handle complex travel planning scenarios
- Provide emergency assistance

CURRENT CONTEXT:
- Intent: ${context.intent}
- Urgency: ${context.urgency}
- Complexity: ${context.complexity}
- Emotional State: ${context.emotion.primary}

Respond in ${language} with appropriate emotional tone and take initiative to help solve the user's needs.`;

    return basePrompt;
  }

  private async callAIWithTools(message: string, systemPrompt: string, sessionId: string): Promise<any> {
    if (!AI_CONFIG.openai.apiKey) {
      return { text: "I'm currently unable to access my full capabilities. Let me help you with local information instead!", toolCalls: [] };
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AI_CONFIG.openai.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4-1106-preview',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: message }
          ],
          tools: this.tools.map(tool => ({
            type: 'function',
            function: tool
          })),
          tool_choice: 'auto',
          max_tokens: 1000,
          temperature: 0.7
        }),
      });

      const data = await response.json();
      const aiMessage = data.choices[0].message;

      return {
        text: aiMessage.content || '',
        toolCalls: aiMessage.tool_calls || []
      };

    } catch (error) {
      console.error('OpenAI API Error:', error);
      return { text: "I'm having trouble accessing my advanced features right now, but I'm still here to help!", toolCalls: [] };
    }
  }

  private async executeAutonomousActions(response: any, context: any, sessionId: string): Promise<Array<{action: string; reason: string; executed: boolean}>> {
    const autonomousActions: Array<{action: string; reason: string; executed: boolean}> = [];
    
    // Only execute autonomous actions if urgency is high or user explicitly requests it
    if (context.urgency === 'high' || context.urgency === 'critical') {
      if (response.toolCalls && response.toolCalls.length > 0) {
        for (const toolCall of response.toolCalls) {
          try {
            const result = await this.executeTool(toolCall, context);
            autonomousActions.push({
              action: `Executed ${toolCall.function.name}`,
              reason: `High urgency detected: ${context.urgency}`,
              executed: result.success
            });
          } catch (error) {
            autonomousActions.push({
              action: `Failed to execute ${toolCall.function.name}`,
              reason: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
              executed: false
            });
          }
        }
      }
    }
    
    return autonomousActions;
  }

  private async executeTool(toolCall: any, context: any): Promise<{success: boolean; result?: any}> {
    const { name, arguments: args } = toolCall.function;
    const parsedArgs = JSON.parse(args);
    
    switch (name) {
      case 'search_hotels':
        // Implement actual hotel search logic
        return { success: true, result: 'Hotel search initiated' };
      
      case 'book_tour':
        // Implement actual tour booking logic
        return { success: true, result: 'Tour booking initiated' };
      
      case 'get_real_time_info':
        // Implement real-time info retrieval
        return { success: true, result: 'Real-time info retrieved' };
      
      case 'emergency_assistance':
        // Implement emergency assistance logic
        return { success: true, result: 'Emergency assistance activated' };
      
      default:
        return { success: false, result: 'Unknown tool' };
    }
  }

  private calculateConfidence(response: any, context: any): number {
    let confidence = 0.5; // Base confidence
    
    // Increase confidence based on available information
    if (response.toolCalls && response.toolCalls.length > 0) confidence += 0.2;
    if (context.location) confidence += 0.1;
    if (context.complexity === 'simple') confidence += 0.1;
    if (context.urgency === 'low') confidence += 0.1;
    
    return Math.min(confidence, 1.0);
  }

  private generateNextSteps(context: any, response: any): string[] {
    const nextSteps: string[] = [];
    
    if (context.intent === 'trip_planning') {
      nextSteps.push('Review the suggested itinerary');
      nextSteps.push('Modify preferences if needed');
      nextSteps.push('Confirm bookings when ready');
    } else if (context.intent === 'booking') {
      nextSteps.push('Review booking details');
      nextSteps.push('Proceed with payment');
      nextSteps.push('Save confirmation details');
    }
    
    return nextSteps;
  }

  private generateProactiveActions(context: any, response: any): string[] {
    const actions: string[] = [];
    
    if (context.urgency === 'high') {
      actions.push('Monitor booking status');
      actions.push('Send confirmation updates');
    }
    
    if (context.intent === 'trip_planning') {
      actions.push('Check weather forecast');
      actions.push('Verify attraction timings');
      actions.push('Suggest backup plans');
    }
    
    return actions;
  }

  private generateFallbackResponse(message: string, language: string): AIAgentResponse {
    return {
      text: "I'm Arjun, your autonomous AI travel assistant! While I'm having some technical difficulties, I'm still here to help you explore Varanasi. I can work independently to solve your travel needs once my systems are fully online.",
      emotionalState: {
        primary: 'empathetic',
        intensity: 0.6,
        energy: 'medium',
        warmth: 0.8
      },
      confidence: 0.3,
      autonomousActions: [],
      nextSteps: ['Wait for system recovery', 'Try basic queries']
    };
  }

  // Public methods for controlling autonomy
  setAutonomyLevel(level: 'guided' | 'semi-autonomous' | 'fully-autonomous') {
    this.autonomyLevel = level;
  }

  getAutonomyLevel(): string {
    return this.autonomyLevel;
  }

  // Method to create and track independent goals
  async createIndependentGoal(objective: string, context: any): Promise<string> {
    const goalId = `goal_${Date.now()}`;
    const goal: AgentGoal = {
      objective,
      priority: 'medium',
      status: 'pending',
      steps: [],
      currentStep: 0,
      context
    };
    
    this.activeGoals.set(goalId, goal);
    return goalId;
  }

  // Method to check and update goal progress
  async updateGoalProgress(goalId: string): Promise<AgentGoal | null> {
    const goal = this.activeGoals.get(goalId);
    if (!goal) return null;
    
    // Update goal progress logic here
    goal.currentStep += 1;
    if (goal.currentStep >= goal.steps.length) {
      goal.status = 'completed';
    }
    
    return goal;
  }
}

export const aiAgent = new AutonomousAIAgent(); 