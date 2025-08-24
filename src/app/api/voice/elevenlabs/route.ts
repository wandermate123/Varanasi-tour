import { NextRequest, NextResponse } from 'next/server';

// ElevenLabs API configuration
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const ELEVENLABS_API_URL = 'https://api.elevenlabs.io/v1';

// Voice configurations with different emotions and personalities
const VOICE_CONFIGS = {
  'friendly-guide': {
    voice_id: '21m00Tcm4TlvDq8ikWAM', // Rachel - warm, friendly
    model_id: 'eleven_multilingual_v2',
    voice_settings: {
      stability: 0.5,
      similarity_boost: 0.8,
      style: 0.2,
      use_speaker_boost: true
    }
  },
  'enthusiastic-host': {
    voice_id: 'AZnzlk1XvdvUeBnXmlld', // Domi - energetic, enthusiastic
    model_id: 'eleven_multilingual_v2',
    voice_settings: {
      stability: 0.3,
      similarity_boost: 0.9,
      style: 0.4,
      use_speaker_boost: true
    }
  },
  'calm-narrator': {
    voice_id: 'EXAVITQu4vr4xnSDxMaL', // Bella - calm, soothing
    model_id: 'eleven_multilingual_v2',
    voice_settings: {
      stability: 0.8,
      similarity_boost: 0.7,
      style: 0.1,
      use_speaker_boost: false
    }
  },
  'professional-advisor': {
    voice_id: 'ErXwobaYiN019PkySvjV', // Antoni - professional, clear
    model_id: 'eleven_multilingual_v2',
    voice_settings: {
      stability: 0.7,
      similarity_boost: 0.8,
      style: 0.2,
      use_speaker_boost: true
    }
  }
};

// Add natural speech patterns and breaks
function enhanceTextWithEmotions(text: string, emotion: string = 'neutral', context: string = 'general'): string {
  let enhancedText = text;

  // Add natural pauses and breaks
  enhancedText = enhancedText.replace(/\. /g, '... ');
  enhancedText = enhancedText.replace(/\, /g, ', ');
  enhancedText = enhancedText.replace(/\! /g, '! ');
  enhancedText = enhancedText.replace(/\? /g, '? ');

  // Add emotion-based modifications
  switch (emotion) {
    case 'excited':
      enhancedText = enhancedText.replace(/\!/g, '!!');
      enhancedText = `Oh wow! ${enhancedText}`;
      break;
    case 'welcoming':
      enhancedText = `Hello there! ${enhancedText} I'm so happy to help you today!`;
      break;
    case 'thoughtful':
      enhancedText = enhancedText.replace(/\./g, '...');
      enhancedText = `Hmm, let me think about that... ${enhancedText}`;
      break;
    case 'reassuring':
      enhancedText = `Don't worry, ${enhancedText} Everything will be just fine!`;
      break;
  }

  // Add context-specific enhancements
  switch (context) {
    case 'travel':
      enhancedText += ' Have an amazing journey!';
      break;
    case 'dining':
      enhancedText += ' Bon appétit and enjoy your meal!';
      break;
    case 'culture':
      enhancedText += ' Isn\'t that fascinating?';
      break;
    case 'emergency':
      enhancedText = `Listen carefully: ${enhancedText}`;
      break;
  }

  return enhancedText;
}

// Convert text to speech with emotional context
async function textToSpeech(text: string, voiceType: string = 'friendly-guide', emotion: string = 'neutral', context: string = 'general') {
  if (!ELEVENLABS_API_KEY) {
    throw new Error('ElevenLabs API key is not configured');
  }

  const voiceConfig = VOICE_CONFIGS[voiceType as keyof typeof VOICE_CONFIGS] || VOICE_CONFIGS['friendly-guide'];
  const enhancedText = enhanceTextWithEmotions(text, emotion, context);

  const response = await fetch(`${ELEVENLABS_API_URL}/text-to-speech/${voiceConfig.voice_id}`, {
    method: 'POST',
    headers: {
      'Accept': 'audio/mpeg',
      'Content-Type': 'application/json',
      'xi-api-key': ELEVENLABS_API_KEY
    },
    body: JSON.stringify({
      text: enhancedText,
      model_id: voiceConfig.model_id,
      voice_settings: voiceConfig.voice_settings
    })
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`ElevenLabs API error: ${response.status} - ${errorData}`);
  }

  return response.arrayBuffer();
}

// Get available voices
async function getVoices() {
  if (!ELEVENLABS_API_KEY) {
    throw new Error('ElevenLabs API key is not configured');
  }

  const response = await fetch(`${ELEVENLABS_API_URL}/voices`, {
    headers: {
      'xi-api-key': ELEVENLABS_API_KEY
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch voices: ${response.status}`);
  }

  return response.json();
}

// Clone a voice from audio sample
async function cloneVoice(name: string, audioFiles: File[], description?: string) {
  if (!ELEVENLABS_API_KEY) {
    throw new Error('ElevenLabs API key is not configured');
  }

  const formData = new FormData();
  formData.append('name', name);
  if (description) formData.append('description', description);
  
  audioFiles.forEach((file, index) => {
    formData.append(`files`, file);
  });

  const response = await fetch(`${ELEVENLABS_API_URL}/voices/add`, {
    method: 'POST',
    headers: {
      'xi-api-key': ELEVENLABS_API_KEY
    },
    body: formData
  });

  if (!response.ok) {
    throw new Error(`Failed to clone voice: ${response.status}`);
  }

  return response.json();
}

// Stream real-time audio
async function streamAudio(text: string, voiceType: string = 'friendly-guide') {
  if (!ELEVENLABS_API_KEY) {
    throw new Error('ElevenLabs API key is not configured');
  }

  const voiceConfig = VOICE_CONFIGS[voiceType as keyof typeof VOICE_CONFIGS] || VOICE_CONFIGS['friendly-guide'];

  const response = await fetch(`${ELEVENLABS_API_URL}/text-to-speech/${voiceConfig.voice_id}/stream`, {
    method: 'POST',
    headers: {
      'Accept': 'audio/mpeg',
      'Content-Type': 'application/json',
      'xi-api-key': ELEVENLABS_API_KEY
    },
    body: JSON.stringify({
      text,
      model_id: voiceConfig.model_id,
      voice_settings: voiceConfig.voice_settings,
      enable_logging: false
    })
  });

  if (!response.ok) {
    throw new Error(`Streaming failed: ${response.status}`);
  }

  return response;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      action, 
      text, 
      voiceType = 'friendly-guide', 
      emotion = 'neutral',
      context = 'general',
      stream = false,
      name,
      description,
      audioFiles 
    } = body;

    switch (action) {
      case 'synthesize':
        if (!text) {
          return NextResponse.json({ error: 'Text is required for synthesis' }, { status: 400 });
        }

        if (stream) {
          const audioStream = await streamAudio(text, voiceType);
          return new Response(audioStream.body, {
            headers: {
              'Content-Type': 'audio/mpeg',
              'Transfer-Encoding': 'chunked'
            }
          });
        } else {
          const audioBuffer = await textToSpeech(text, voiceType, emotion, context);
          return new Response(audioBuffer, {
            headers: {
              'Content-Type': 'audio/mpeg',
              'Content-Length': audioBuffer.byteLength.toString()
            }
          });
        }

      case 'voices':
        const voices = await getVoices();
        return NextResponse.json({ 
          voices: voices.voices,
          customVoices: Object.keys(VOICE_CONFIGS).map(key => ({
            id: key,
            name: key.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
            description: `Custom ${key} voice configuration`
          }))
        });

      case 'clone':
        if (!name || !audioFiles) {
          return NextResponse.json({ error: 'Name and audio files are required for cloning' }, { status: 400 });
        }
        const clonedVoice = await cloneVoice(name, audioFiles, description);
        return NextResponse.json(clonedVoice);

      case 'emotions':
        return NextResponse.json({
          emotions: ['neutral', 'excited', 'welcoming', 'thoughtful', 'reassuring'],
          contexts: ['general', 'travel', 'dining', 'culture', 'emergency'],
          voiceTypes: Object.keys(VOICE_CONFIGS)
        });

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

  } catch (error) {
    console.error('ElevenLabs API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Voice synthesis failed' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    switch (action) {
      case 'voices':
        const voices = await getVoices();
        return NextResponse.json(voices);

      case 'usage':
        if (!ELEVENLABS_API_KEY) {
          return NextResponse.json({ error: 'API key not configured' }, { status: 400 });
        }

        const response = await fetch(`${ELEVENLABS_API_URL}/user`, {
          headers: {
            'xi-api-key': ELEVENLABS_API_KEY
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch usage: ${response.status}`);
        }

        const userData = await response.json();
        return NextResponse.json({
          characterCount: userData.subscription?.character_count || 0,
          characterLimit: userData.subscription?.character_limit || 10000,
          canUseInstantVoiceCloning: userData.subscription?.can_use_instant_voice_cloning || false
        });

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

  } catch (error) {
    console.error('ElevenLabs API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Request failed' },
      { status: 500 }
    );
  }
} 