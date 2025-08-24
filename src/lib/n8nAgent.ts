// n8n-Powered Independent AI Agent for WanderMate
export interface N8NWorkflow {
  id: string;
  name: string;
  webhookUrl: string;
  description: string;
  capabilities: string[];
}

export interface N8NAgentResponse {
  text: string;
  workflowId: string;
  executionId?: string;
  data?: any;
  status: 'success' | 'error' | 'pending';
  nextActions?: string[];
  emotion?: string;
  suggestions?: string[];
}

export interface N8NAgentRequest {
  message: string;
  sessionId: string;
  workflowType?: 'chat' | 'booking' | 'planning' | 'emergency';
  context?: {
    location?: { lat: number; lng: number };
    language?: string;
    userPreferences?: any;
    urgency?: 'low' | 'medium' | 'high' | 'critical';
  };
}

class N8NAutonomousAgent {
  private workflows: Map<string, N8NWorkflow> = new Map();
  private executionHistory: Map<string, any[]> = new Map();
  private n8nBaseUrl: string;
  private authCredentials: { username: string; password: string } | null = null;

  constructor() {
    this.n8nBaseUrl = process.env.N8N_WEBHOOK_URL || 'http://localhost:5678';
    
    if (process.env.N8N_BASIC_AUTH_USER && process.env.N8N_BASIC_AUTH_PASSWORD) {
      this.authCredentials = {
        username: process.env.N8N_BASIC_AUTH_USER,
        password: process.env.N8N_BASIC_AUTH_PASSWORD
      };
    }

    this.initializeWorkflows();
  }

  private initializeWorkflows(): void {
    // Register available n8n workflows
    this.workflows.set('chat', {
      id: 'wandermate-chat',
      name: 'WanderMate Chat Agent',
      webhookUrl: `${this.n8nBaseUrl}/webhook/wandermate-chat`,
      description: 'Intelligent conversation handler with emotional intelligence',
      capabilities: ['conversation', 'recommendations', 'information', 'storytelling']
    });

    this.workflows.set('booking', {
      id: 'wandermate-booking',
      name: 'WanderMate Booking Agent',
      webhookUrl: `${this.n8nBaseUrl}/webhook/wandermate-booking`,
      description: 'Complete booking workflow with payment processing',
      capabilities: ['hotel_booking', 'tour_booking', 'payment_processing', 'confirmation']
    });

    this.workflows.set('planning', {
      id: 'wandermate-planning',
      name: 'WanderMate Trip Planner',
      webhookUrl: `${this.n8nBaseUrl}/webhook/wandermate-planning`,
      description: 'Multi-step trip planning with optimization',
      capabilities: ['itinerary_creation', 'optimization', 'recommendation_engine', 'constraint_solving']
    });

    this.workflows.set('emergency', {
      id: 'wandermate-emergency',
      name: 'WanderMate Emergency Assistant',
      webhookUrl: `${this.n8nBaseUrl}/webhook/wandermate-emergency`,
      description: 'Emergency response and local assistance',
      capabilities: ['emergency_response', 'local_services', 'real_time_assistance', 'escalation']
    });
  }

  async processRequest(request: N8NAgentRequest): Promise<N8NAgentResponse> {
    try {
      // Determine the best workflow for this request
      const workflowType = request.workflowType || this.determineWorkflowType(request.message);
      const workflow = this.workflows.get(workflowType);

      if (!workflow) {
        throw new Error(`No workflow found for type: ${workflowType}`);
      }

      // Execute the n8n workflow
      const response = await this.executeWorkflow(workflow, request);
      
      // Store execution history
      this.storeExecution(request.sessionId, {
        workflowId: workflow.id,
        request,
        response,
        timestamp: new Date()
      });

      return response;

    } catch (error) {
      console.error('N8N Agent Error:', error);
      return this.generateFallbackResponse(request);
    }
  }

  private determineWorkflowType(message: string): string {
    const lowerMessage = message.toLowerCase();

    // Emergency detection
    if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent') || lowerMessage.includes('help')) {
      return 'emergency';
    }

    // Booking detection
    if (lowerMessage.includes('book') || lowerMessage.includes('reserve') || lowerMessage.includes('payment')) {
      return 'booking';
    }

    // Planning detection
    if (lowerMessage.includes('plan') || lowerMessage.includes('itinerary') || lowerMessage.includes('trip')) {
      return 'planning';
    }

    // Default to chat
    return 'chat';
  }

  private async executeWorkflow(workflow: N8NWorkflow, request: N8NAgentRequest): Promise<N8NAgentResponse> {
    const payload = {
      trigger: 'api_request',
      timestamp: new Date().toISOString(),
      sessionId: request.sessionId,
      data: {
        message: request.message,
        context: request.context || {},
        workflowType: workflow.id,
        capabilities: workflow.capabilities
      }
    };

    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      };

      // Add basic auth if configured
      if (this.authCredentials) {
        const auth = btoa(`${this.authCredentials.username}:${this.authCredentials.password}`);
        headers['Authorization'] = `Basic ${auth}`;
      }

      const response = await fetch(workflow.webhookUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Workflow execution failed: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      
      return this.processWorkflowResponse(result, workflow.id);

    } catch (error) {
      console.error(`Workflow ${workflow.id} execution error:`, error);
      throw error;
    }
  }

  private processWorkflowResponse(result: any, workflowId: string): N8NAgentResponse {
    // Process the response from n8n workflow
    const response: N8NAgentResponse = {
      text: result.message || result.response || 'Workflow executed successfully',
      workflowId,
      executionId: result.executionId,
      status: result.status || 'success',
      data: result.data
    };

    // Extract additional data from workflow response
    if (result.emotion) response.emotion = result.emotion;
    if (result.suggestions) response.suggestions = result.suggestions;
    if (result.nextActions) response.nextActions = result.nextActions;

    return response;
  }

  private storeExecution(sessionId: string, execution: any): void {
    if (!this.executionHistory.has(sessionId)) {
      this.executionHistory.set(sessionId, []);
    }
    
    const history = this.executionHistory.get(sessionId)!;
    history.push(execution);
    
    // Keep only last 50 executions per session
    if (history.length > 50) {
      history.splice(0, history.length - 50);
    }
  }

  private generateFallbackResponse(request: N8NAgentRequest): N8NAgentResponse {
    return {
      text: "I'm experiencing some technical difficulties with my workflow system. Let me help you in a more direct way.",
      workflowId: 'fallback',
      status: 'error',
      nextActions: ['Try again later', 'Use direct chat instead']
    };
  }

  // Public methods for workflow management
  async createCustomWorkflow(
    name: string, 
    description: string, 
    capabilities: string[],
    webhookPath: string
  ): Promise<string> {
    const workflowId = `custom_${Date.now()}`;
    const workflow: N8NWorkflow = {
      id: workflowId,
      name,
      webhookUrl: `${this.n8nBaseUrl}/webhook/${webhookPath}`,
      description,
      capabilities
    };

    this.workflows.set(workflowId, workflow);
    return workflowId;
  }

  getAvailableWorkflows(): N8NWorkflow[] {
    return Array.from(this.workflows.values());
  }

  getExecutionHistory(sessionId: string): any[] {
    return this.executionHistory.get(sessionId) || [];
  }

  async testWorkflow(workflowId: string): Promise<boolean> {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) return false;

    try {
      const testRequest: N8NAgentRequest = {
        message: 'Test connection',
        sessionId: 'test_session',
        context: {}
      };

      await this.executeWorkflow(workflow, testRequest);
      return true;
    } catch (error) {
      console.error(`Workflow ${workflowId} test failed:`, error);
      return false;
    }
  }

  // Integration methods
  async integrateWithWanderMate(wanderMateApiUrl: string): Promise<void> {
    // Send workflow capabilities to main WanderMate system
    const integrationData = {
      agentType: 'n8n_autonomous',
      capabilities: this.getAvailableWorkflows(),
      baseUrl: this.n8nBaseUrl,
      status: 'active'
    };

    try {
      await fetch(`${wanderMateApiUrl}/api/agent-integration`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(integrationData)
      });
    } catch (error) {
      console.error('Integration with WanderMate failed:', error);
    }
  }

  // Autonomous decision making
  async makeAutonomousDecision(context: any): Promise<{ action: string; confidence: number; reasoning: string }> {
    // Use n8n workflow for complex decision making
    const decisionRequest: N8NAgentRequest = {
      message: 'Make autonomous decision',
      sessionId: context.sessionId,
      workflowType: 'planning',
      context: {
        ...context,
        requestType: 'autonomous_decision'
      }
    };

    try {
      const response = await this.processRequest(decisionRequest);
      return {
        action: response.data?.action || 'continue_conversation',
        confidence: response.data?.confidence || 0.7,
        reasoning: response.data?.reasoning || 'Standard workflow execution'
      };
    } catch (error) {
      return {
        action: 'fallback_to_manual',
        confidence: 0.3,
        reasoning: 'Autonomous decision failed, requiring manual intervention'
      };
    }
  }
}

export const n8nAgent = new N8NAutonomousAgent(); 