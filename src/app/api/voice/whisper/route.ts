import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Check if OpenAI is properly configured
if (!process.env.OPENAI_API_KEY) {
  console.warn('OPENAI_API_KEY is not configured. Whisper voice processing will not work.');
}

// Initialize OpenAI client
const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })
  : null;

// Supported audio formats
const SUPPORTED_FORMATS = [
  'flac', 'mp3', 'mp4', 'mpeg', 'mpga', 'm4a', 'ogg', 'wav', 'webm'
];

// Language codes for transcription
const LANGUAGE_CODES = {
  'english': 'en',
  'spanish': 'es',
  'french': 'fr',
  'german': 'de',
  'italian': 'it',
  'portuguese': 'pt',
  'russian': 'ru',
  'japanese': 'ja',
  'korean': 'ko',
  'chinese': 'zh',
  'hindi': 'hi',
  'arabic': 'ar',
  'auto': undefined // Auto-detect
};

// Convert audio buffer to File object
function bufferToFile(buffer: Buffer, filename: string, mimetype: string): File {
  return new File([buffer], filename, { type: mimetype });
}

// Transcribe audio to text
async function transcribeAudio(
  audioFile: File, 
  language?: string, 
  prompt?: string, 
  responseFormat: 'json' | 'text' | 'srt' | 'verbose_json' | 'vtt' = 'json'
) {
  if (!openai) {
    throw new Error('OpenAI API key is not configured');
  }

  // Validate file format
  const fileExtension = audioFile.name.split('.').pop()?.toLowerCase();
  if (!fileExtension || !SUPPORTED_FORMATS.includes(fileExtension)) {
    throw new Error(`Unsupported audio format. Supported formats: ${SUPPORTED_FORMATS.join(', ')}`);
  }

  // Validate file size (25MB limit for Whisper)
  if (audioFile.size > 25 * 1024 * 1024) {
    throw new Error('Audio file too large. Maximum size is 25MB');
  }

  try {
    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-1',
      language: language || undefined,
      prompt: prompt || undefined,
      response_format: responseFormat,
      temperature: 0
    });

    return transcription;
  } catch (error) {
    console.error('Whisper transcription error:', error);
    throw new Error(`Transcription failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Translate audio to English
async function translateAudio(audioFile: File, prompt?: string) {
  if (!openai) {
    throw new Error('OpenAI API key is not configured');
  }

  try {
    const translation = await openai.audio.translations.create({
      file: audioFile,
      model: 'whisper-1',
      prompt: prompt || undefined,
      response_format: 'json'
    });

    return translation;
  } catch (error) {
    console.error('Whisper translation error:', error);
    throw new Error(`Translation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Process audio with enhanced conversation detection
async function processConversationalAudio(
  audioFile: File, 
  language?: string, 
  detectSpeakers: boolean = false
) {
  const transcription = await transcribeAudio(audioFile, language, undefined, 'verbose_json');
  
  if (typeof transcription === 'string') {
    return { text: transcription, segments: [] };
  }

  // Enhanced processing for conversational audio
  const segments = (transcription as any).segments || [];
  const processedSegments = segments.map((segment: any) => ({
    ...segment,
    speaker: detectSpeakers ? `Speaker ${Math.floor(segment.start / 10) % 3 + 1}` : 'Speaker 1',
    confidence: segment.avg_logprob ? Math.exp(segment.avg_logprob) : 0.5,
    emotion: detectEmotionFromText(segment.text),
    breaks: detectNaturalBreaks(segment.text)
  }));

  return {
    text: (transcription as any).text,
    language: (transcription as any).language,
    duration: (transcription as any).duration,
    segments: processedSegments,
    conversationSummary: generateConversationSummary(processedSegments)
  };
}

// Detect emotion from text content
function detectEmotionFromText(text: string): string {
  const emotionKeywords = {
    excited: ['amazing', 'fantastic', 'wonderful', 'great', 'awesome', '!'],
    happy: ['good', 'nice', 'pleasant', 'enjoy', 'love'],
    concerned: ['worried', 'problem', 'issue', 'help', 'difficult'],
    calm: ['okay', 'fine', 'sure', 'understand', 'yes'],
    questioning: ['?', 'how', 'what', 'when', 'where', 'why']
  };

  const lowerText = text.toLowerCase();
  
  for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
    if (keywords.some(keyword => lowerText.includes(keyword))) {
      return emotion;
    }
  }
  
  return 'neutral';
}

// Detect natural conversation breaks
function detectNaturalBreaks(text: string): string[] {
  const breaks = [];
  
  if (text.includes('...') || text.includes('uh') || text.includes('um')) {
    breaks.push('hesitation');
  }
  
  if (text.includes('!')) {
    breaks.push('emphasis');
  }
  
  if (text.includes('?')) {
    breaks.push('question');
  }
  
  if (text.length > 100) {
    breaks.push('long_statement');
  }
  
  return breaks;
}

// Generate conversation summary
function generateConversationSummary(segments: any[]): object {
  const totalDuration = segments.reduce((sum, seg) => sum + (seg.end - seg.start), 0);
  const emotions = segments.map(seg => seg.emotion);
  const emotionCounts = emotions.reduce((acc, emotion) => {
    acc[emotion] = (acc[emotion] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalDuration,
    segmentCount: segments.length,
    averageSegmentLength: totalDuration / segments.length,
    emotionDistribution: emotionCounts,
    dominantEmotion: Object.entries(emotionCounts).sort(([,a], [,b]) => (b as number) - (a as number))[0]?.[0] || 'neutral'
  };
}

export async function POST(request: NextRequest) {
  try {
    // Check if OpenAI is configured
    if (!openai) {
      return NextResponse.json(
        { 
          error: 'Voice processing service is not configured. Please contact support.',
          details: 'OPENAI_API_KEY is missing from environment variables.'
        },
        { status: 503 }
      );
    }

    const formData = await request.formData();
    const audioFile = formData.get('audio') as File;
    const action = formData.get('action') as string || 'transcribe';
    const language = formData.get('language') as string;
    const prompt = formData.get('prompt') as string;
    const responseFormat = formData.get('response_format') as string || 'json';
    const detectSpeakers = formData.get('detect_speakers') === 'true';

    if (!audioFile) {
      return NextResponse.json({ error: 'Audio file is required' }, { status: 400 });
    }

    switch (action) {
      case 'transcribe':
        const transcription = await transcribeAudio(
          audioFile, 
          language, 
          prompt, 
          responseFormat as any
        );
        return NextResponse.json({ transcription });

      case 'translate':
        const translation = await translateAudio(audioFile, prompt);
        return NextResponse.json({ translation });

      case 'conversational':
        const conversationalResult = await processConversationalAudio(
          audioFile, 
          language, 
          detectSpeakers
        );
        return NextResponse.json(conversationalResult);

      case 'analyze':
        const analysisResult = await processConversationalAudio(
          audioFile, 
          language, 
          true
        );
        return NextResponse.json({
          ...analysisResult,
          analysis: {
            wordCount: analysisResult.text.split(' ').length,
            speakingRate: analysisResult.text.split(' ').length / (analysisResult.duration || 1) * 60,
            confidenceScore: analysisResult.segments.reduce((avg: number, seg: any) => avg + seg.confidence, 0) / analysisResult.segments.length,
            emotionalTone: analysisResult.conversationSummary
          }
        });

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

  } catch (error) {
    console.error('Whisper API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Speech processing failed' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    switch (action) {
      case 'formats':
        return NextResponse.json({
          supportedFormats: SUPPORTED_FORMATS,
          maxFileSize: '25MB',
          maxDuration: '30 minutes'
        });

      case 'languages':
        return NextResponse.json({
          languages: Object.keys(LANGUAGE_CODES),
          languageCodes: LANGUAGE_CODES
        });

      case 'models':
        return NextResponse.json({
          models: [
            {
              id: 'whisper-1',
              name: 'Whisper',
              description: 'OpenAI Whisper ASR model',
              languages: 'Multilingual',
              capabilities: ['transcription', 'translation', 'language_detection']
            }
          ]
        });

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

  } catch (error) {
    console.error('Whisper API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Request failed' },
      { status: 500 }
    );
  }
} 