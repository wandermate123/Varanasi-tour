import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

// Check if OpenAI is properly configured
if (!process.env.OPENAI_API_KEY) {
  console.warn('OPENAI_API_KEY is not configured. AI itinerary generation will not work.');
}

const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })
  : null;

export async function POST(request: Request) {
  try {
    // Check if OpenAI is configured
    if (!openai) {
      return NextResponse.json(
        { 
          error: 'AI service is not configured. Please contact support.',
          details: 'OPENAI_API_KEY is missing from environment variables.'
        },
        { status: 503 }
      );
    }

    const preferences = await request.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: `You are a travel itinerary planner for Varanasi. Create a detailed itinerary based on the following preferences:
          - Budget: ${preferences.budget}
          - Duration: ${preferences.duration} days
          - Interests: ${preferences.interests.join(', ')}
          - Group Size: ${preferences.groupSize}
          - Accessibility Needs: ${preferences.accessibility.join(', ')}
          
          Include:
          - Day-by-day schedule
          - Estimated costs
          - Travel times
          - Meal recommendations
          - Cultural tips
          - Weather-appropriate activities`
        }
      ],
      temperature: 0.7,
      max_tokens: 1500
    });

    return NextResponse.json({
      itinerary: completion.choices[0].message.content
    });
  } catch (error) {
    console.error('Error generating itinerary:', error);
    return NextResponse.json({ error: 'Failed to generate itinerary' }, { status: 500 });
  }
} 