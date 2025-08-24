import { NextRequest, NextResponse } from 'next/server';
import { n8nAgent, N8NAgentRequest } from '@/lib/n8nAgent';

interface N8nWebhookPayload {
  workflowId: string;
  executionId: string;
  trigger: string;
  data: {
    userMessage?: string;
    userId?: string;
    sessionId?: string;
    language?: string;
    context?: any;
    action?: string;
  };
  response?: {
    message: string;
    suggestions?: string[];
    actions?: any[];
    emotion?: string;
    data?: any;
  };
}

interface N8nWorkflowTrigger {
  userId: string;
  sessionId: string;
  message: string;
  language: string;
  context: any;
  timestamp: string;
}

// In-memory session storage (consider using Redis in production)
const sessions = new Map<string, any>();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, sessionId, workflowType, context } = body;

    if (!message || !sessionId) {
      return NextResponse.json(
        { error: 'Message and sessionId are required' },
        { status: 400 }
      );
    }

    const agentRequest: N8NAgentRequest = {
      message,
      sessionId,
      workflowType,
      context
    };

    // Process the request through n8n workflows
    const response = await n8nAgent.processRequest(agentRequest);

    return NextResponse.json({
      success: true,
      response,
      agent: 'n8n',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('N8N Agent API Error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'Failed to process n8n agent request'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const sessionId = searchParams.get('sessionId');

    switch (action) {
      case 'workflows':
        // Get available workflows
        const workflows = n8nAgent.getAvailableWorkflows();
        return NextResponse.json({
          success: true,
          workflows
        });

      case 'history':
        if (!sessionId) {
          return NextResponse.json(
            { error: 'Session ID required for history' },
            { status: 400 }
          );
        }
        
        const history = n8nAgent.getExecutionHistory(sessionId);
        return NextResponse.json({
          success: true,
          history
        });

      case 'test':
        const workflowId = searchParams.get('workflowId');
        if (!workflowId) {
          return NextResponse.json(
            { error: 'Workflow ID required for testing' },
            { status: 400 }
          );
        }

        const testResult = await n8nAgent.testWorkflow(workflowId);
        return NextResponse.json({
          success: true,
          workflowId,
          status: testResult ? 'working' : 'failed'
        });

      default:
        return NextResponse.json({
          success: true,
          info: {
            agent: 'n8n-powered',
            capabilities: [
              'Visual workflow execution',
              'Complex multi-step processes',
              'External API integration',
              'Custom workflow creation',
              'Autonomous decision making'
            ],
            availableEndpoints: [
              'POST /api/n8n-agent - Execute workflow',
              'GET /api/n8n-agent?action=workflows - List workflows',
              'GET /api/n8n-agent?action=history&sessionId=X - Get history',
              'GET /api/n8n-agent?action=test&workflowId=X - Test workflow'
            ]
          }
        });
    }

  } catch (error) {
    console.error('N8N Agent GET Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { action, ...data } = await request.json();

    switch (action) {
      case 'create_workflow':
        const { name, description, capabilities, webhookPath } = data;
        
        if (!name || !webhookPath) {
          return NextResponse.json(
            { error: 'Name and webhookPath are required' },
            { status: 400 }
          );
        }

        const workflowId = await n8nAgent.createCustomWorkflow(
          name,
          description || '',
          capabilities || [],
          webhookPath
        );

        return NextResponse.json({
          success: true,
          workflowId,
          message: 'Custom workflow created successfully'
        });

      case 'integrate':
        const { wanderMateApiUrl } = data;
        
        if (!wanderMateApiUrl) {
          return NextResponse.json(
            { error: 'WanderMate API URL is required' },
            { status: 400 }
          );
        }

        await n8nAgent.integrateWithWanderMate(wanderMateApiUrl);
        
        return NextResponse.json({
          success: true,
          message: 'Integration with WanderMate completed'
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('N8N Agent PUT Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

// Note: GET_OLD and PUT_OLD functions removed as they are not valid Next.js Route exports
// The functionality has been integrated into the main GET and PUT handlers above

// DELETE endpoint to clear session
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('sessionId');

  if (!sessionId) {
    return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
  }

  sessions.delete(sessionId);
  
  return NextResponse.json({ success: true, message: 'Session cleared' });
} 