import { NextRequest, NextResponse } from 'next/server';
import { aiAgent } from '@/lib/aiAgent';

export async function POST(request: NextRequest) {
  try {
    const { message, sessionId, userLocation, language = 'en', autonomyLevel } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Set autonomy level if provided
    if (autonomyLevel) {
      aiAgent.setAutonomyLevel(autonomyLevel);
    }

    // Process message with the enhanced autonomous AI agent
    const response = await aiAgent.processMessage(
      message,
      sessionId || `session_${Date.now()}`,
      userLocation,
      language
    );

    return NextResponse.json({
      success: true,
      response,
      autonomyLevel: aiAgent.getAutonomyLevel(),
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('AI Agent API Error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'Failed to process AI agent request'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Return agent status and configuration
    return NextResponse.json({
      success: true,
      agentInfo: {
        autonomyLevel: aiAgent.getAutonomyLevel(),
        capabilities: [
          'Hotel booking',
          'Tour planning',
          'Payment processing',
          'Real-time information',
          'Emergency assistance',
          'Itinerary creation'
        ],
        features: [
          'Independent decision making',
          'Proactive suggestions',
          'Multi-step planning',
          'Emotional intelligence',
          'Context awareness'
        ]
      }
    });

  } catch (error) {
    console.error('AI Agent Info Error:', error);
    return NextResponse.json(
      { error: 'Failed to get agent information' },
      { status: 500 }
    );
  }
} 