// Emotional voice synthesis with SSML and context awareness
export interface VoiceConfig {
  provider: 'elevenlabs' | 'azure' | 'google' | 'browser';
  voiceId: string;
  language: string;
  emotion: EmotionalState;
  speed: number;
  pitch: number;
  volume: number;
}

export interface EmotionalState {
  primary: 'excited' | 'calm' | 'reverent' | 'playful' | 'warm' | 'empathetic' | 'mysterious';
  intensity: number; // 0-1
  energy: 'low' | 'medium' | 'high';
  warmth: number; // 0-1
}

interface VoiceProvider {
  id: string;
  name: string;
  voices: {
    [language: string]: {
      male: string[];
      female: string[];
      neural?: string[];
    };
  };
  supportsSSML: boolean;
  emotionalTags: string[];
}

class EmotionalVoiceEngine {
  private providers: VoiceProvider[] = [
    {
      id: 'elevenlabs',
      name: 'ElevenLabs',
      voices: {
        'en': {
          male: ['Josh', 'Antoni', 'Arnold'],
          female: ['Rachel', 'Domi', 'Bella'],
          neural: ['Elli', 'Callum', 'Charlie']
        },
        'hi': {
          male: ['Arjun', 'Ravi'],
          female: ['Priya', 'Meera']
        }
      },
      supportsSSML: true,
      emotionalTags: ['excited', 'calm', 'warm', 'playful', 'reverent']
    },
    {
      id: 'azure',
      name: 'Azure Cognitive Services',
      voices: {
        'en': {
          male: ['en-US-ChristopherNeural', 'en-US-EricNeural'],
          female: ['en-US-JennyNeural', 'en-US-AriaNeural'],
          neural: ['en-US-DavisNeural', 'en-US-JaneNeural']
        },
        'hi': {
          male: ['hi-IN-MadhurNeural'],
          female: ['hi-IN-SwaraNeural']
        }
      },
      supportsSSML: true,
      emotionalTags: ['excited', 'calm', 'cheerful', 'empathetic', 'gentle']
    }
  ];

  // Generate SSML with emotional context
  generateEmotionalSSML(text: string, emotion: EmotionalState, language: string = 'en'): string {
    const baseSSML = this.cleanTextForSSML(text);
    
    // Add emotional prosody based on state
    const prosody = this.generateProsodyTags(emotion);
    const emphasis = this.addEmphasisTags(baseSSML, emotion);
    const breaks = this.addNaturalBreaks(emphasis, emotion);
    
    return `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${language}">
      <voice name="friendly-guide">
        ${prosody.open}
        ${breaks}
        ${prosody.close}
      </voice>
    </speak>`;
  }

  private generateProsodyTags(emotion: EmotionalState): { open: string; close: string } {
    let rate = 'medium';
    let pitch = 'medium';
    let volume = 'medium';

    switch (emotion.primary) {
      case 'excited':
        rate = emotion.intensity > 0.7 ? 'fast' : 'medium';
        pitch = emotion.intensity > 0.5 ? 'high' : 'medium';
        volume = 'loud';
        break;
      case 'calm':
        rate = 'slow';
        pitch = 'low';
        volume = 'soft';
        break;
      case 'reverent':
        rate = 'slow';
        pitch = 'low';
        volume = 'soft';
        break;
      case 'playful':
        rate = 'medium';
        pitch = 'high';
        volume = 'medium';
        break;
      case 'warm':
        rate = 'medium';
        pitch = 'medium';
        volume = 'medium';
        break;
      case 'empathetic':
        rate = 'slow';
        pitch = 'low';
        volume = 'soft';
        break;
    }

    const open = `<prosody rate="${rate}" pitch="${pitch}" volume="${volume}">`;
    const close = '</prosody>';

    return { open, close };
  }

  private addEmphasisTags(text: string, emotion: EmotionalState): string {
    let enhanced = text;

    // Add emphasis to key words based on emotion
    const emphasisPatterns: Record<EmotionalState['primary'], string[]> = {
      excited: ['amazing', 'incredible', 'wow', 'fantastic', 'love'],
      calm: ['peaceful', 'serene', 'gentle', 'quiet', 'soft'],
      reverent: ['sacred', 'holy', 'ancient', 'spiritual', 'divine'],
      playful: ['fun', 'delicious', 'crazy', 'awesome', 'cool'],
      warm: ['beautiful', 'wonderful', 'lovely', 'special', 'dear'],
      empathetic: ['understand', 'feel', 'care', 'support', 'help'],
      mysterious: ['ancient', 'hidden', 'secret', 'mystical', 'unknown']
    };

    const patterns = emphasisPatterns[emotion.primary] || [];
    patterns.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      enhanced = enhanced.replace(regex, `<emphasis level="strong">${word}</emphasis>`);
    });

    return enhanced;
  }

  private addNaturalBreaks(text: string, emotion: EmotionalState): string {
    let enhanced = text;

    // Add natural pauses based on emotional state
    if (emotion.primary === 'reverent' || emotion.primary === 'calm') {
      // Longer pauses for reverent/calm speech
      enhanced = enhanced.replace(/\./g, '.<break time="800ms"/>');
      enhanced = enhanced.replace(/,/g, ',<break time="400ms"/>');
      enhanced = enhanced.replace(/\?/g, '?<break time="600ms"/>');
    } else if (emotion.primary === 'excited') {
      // Shorter, energetic pauses
      enhanced = enhanced.replace(/\./g, '.<break time="300ms"/>');
      enhanced = enhanced.replace(/!/g, '!<break time="200ms"/>');
    } else {
      // Normal conversational pauses
      enhanced = enhanced.replace(/\./g, '.<break time="500ms"/>');
      enhanced = enhanced.replace(/,/g, ',<break time="250ms"/>');
    }

    // Add thinking pauses for natural conversation
    enhanced = enhanced.replace(/you know what\?/gi, 'you know what?<break time="400ms"/>');
    enhanced = enhanced.replace(/well,/gi, 'well,<break time="300ms"/>');
    enhanced = enhanced.replace(/so,/gi, 'so,<break time="250ms"/>');

    return enhanced;
  }

  private cleanTextForSSML(text: string): string {
    // Remove or escape problematic characters for SSML
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  // Context-aware emotion detection
  detectEmotionFromContext(
    text: string, 
    topicType: string, 
    location?: string,
    userMood?: string
  ): EmotionalState {
    let primary: EmotionalState['primary'] = 'warm';
    let intensity = 0.5;
    let energy: EmotionalState['energy'] = 'medium';
    let warmth = 0.7;

    // Topic-based emotion
    switch (topicType) {
      case 'spiritual':
        primary = 'reverent';
        intensity = 0.8;
        energy = 'low';
        warmth = 0.9;
        break;
      case 'food':
        primary = 'playful';
        intensity = 0.8;
        energy = 'high';
        warmth = 0.8;
        break;
      case 'culture':
        primary = 'warm';
        intensity = 0.6;
        energy = 'medium';
        warmth = 0.9;
        break;
      case 'practical':
        primary = 'calm';
        intensity = 0.4;
        energy = 'medium';
        warmth = 0.6;
        break;
    }

    // Location-based adjustments
    if (location?.toLowerCase().includes('temple') || location?.toLowerCase().includes('ghat')) {
      primary = 'reverent';
      intensity = Math.min(intensity, 0.6);
      energy = 'low';
    }

    // Text content analysis
    const lowerText = text.toLowerCase();
    if (lowerText.includes('amazing') || lowerText.includes('incredible') || lowerText.includes('wow')) {
      primary = 'excited';
      intensity = Math.max(intensity, 0.8);
      energy = 'high';
    }

    if (lowerText.includes('peaceful') || lowerText.includes('calm') || lowerText.includes('serene')) {
      primary = 'calm';
      intensity = 0.5;
      energy = 'low';
    }

    // User mood influence
    if (userMood === 'excited') {
      intensity = Math.max(intensity, 0.7);
      energy = 'high';
    } else if (userMood === 'tired') {
      primary = 'empathetic';
      intensity = 0.6;
      energy = 'low';
    }

    return { primary, intensity, energy, warmth };
  }

  // Generate natural speech variations
  addSpeechVariations(text: string, emotion: EmotionalState): string {
    const variations: Record<EmotionalState['primary'], { starters: string[]; reactions: string[] }> = {
      excited: {
        starters: ['Oh wow!', 'This is so cool!', 'You know what?', 'Get ready for this!'],
        reactions: ['That\'s amazing!', 'I love that!', 'So exciting!', 'Perfect!']
      },
      calm: {
        starters: ['Well,', 'You know,', 'Here\'s the thing,', 'Take a moment...'],
        reactions: ['That\'s beautiful', 'How peaceful', 'So serene', 'Lovely']
      },
      reverent: {
        starters: ['There\'s something sacred...', 'The spiritual energy here...', 'Ancient wisdom tells us...'],
        reactions: ['Deeply moving', 'So profound', 'Sacred', 'Blessed']
      },
      playful: {
        starters: ['Okay, get this!', 'You\'re gonna love this!', 'Ready for some fun?', 'Here we go!'],
        reactions: ['So tasty!', 'Delicious!', 'What a blast!', 'Too fun!']
      },
      warm: {
        starters: ['You know,', 'I have to say,', 'Let me tell you,', 'Here\'s something lovely...'],
        reactions: ['How wonderful', 'So heartwarming', 'Beautiful', 'Lovely']
      },
      empathetic: {
        starters: ['I understand,', 'I can imagine,', 'That must be,', 'I feel for you...'],
        reactions: ['I\'m here for you', 'That\'s understandable', 'You\'re not alone', 'I care']
      },
      mysterious: {
        starters: ['There are secrets here...', 'Ancient mysteries...', 'Hidden stories...', 'Something mystical...'],
        reactions: ['So mysterious', 'Intriguing', 'Enigmatic', 'Fascinating']
      }
    };

    const emotionVariations = variations[emotion.primary];
    if (!emotionVariations) return text;

    // Randomly add natural starters (30% chance)
    if (Math.random() < 0.3 && emotion.intensity > 0.6) {
      const starter = emotionVariations.starters[Math.floor(Math.random() * emotionVariations.starters.length)];
      text = `${starter} ${text}`;
    }

    return text;
  }

  // Voice synthesis with provider selection
  async synthesizeSpeech(
    text: string, 
    emotion: EmotionalState, 
    language: string = 'en',
    provider: 'elevenlabs' | 'azure' | 'browser' = 'browser'
  ): Promise<ArrayBuffer | null> {
    try {
      const enhancedText = this.addSpeechVariations(text, emotion);
      
      switch (provider) {
        case 'elevenlabs':
          return await this.synthesizeElevenLabs(enhancedText, emotion, language);
        case 'azure':
          return await this.synthesizeAzure(enhancedText, emotion, language);
        case 'browser':
          return await this.synthesizeBrowser(enhancedText, emotion, language);
        default:
          return await this.synthesizeBrowser(enhancedText, emotion, language);
      }
    } catch (error) {
      console.error('Speech synthesis error:', error);
      return null;
    }
  }

  private async synthesizeElevenLabs(text: string, emotion: EmotionalState, language: string): Promise<ArrayBuffer | null> {
    const apiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;
    if (!apiKey) {
      console.warn('ElevenLabs API key not found, falling back to browser synthesis');
      return this.synthesizeBrowser(text, emotion, language);
    }

    try {
      const voiceId = this.selectElevenLabsVoice(language, emotion);
      
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': apiKey
        },
        body: JSON.stringify({
          text: text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: emotion.primary === 'calm' ? 0.8 : 0.6,
            similarity_boost: 0.8,
            style: emotion.intensity,
            use_speaker_boost: true
          }
        })
      });

      if (response.ok) {
        return await response.arrayBuffer();
      }
    } catch (error) {
      console.error('ElevenLabs synthesis error:', error);
    }

    return this.synthesizeBrowser(text, emotion, language);
  }

  private async synthesizeAzure(text: string, emotion: EmotionalState, language: string): Promise<ArrayBuffer | null> {
    const apiKey = process.env.NEXT_PUBLIC_AZURE_SPEECH_KEY;
    const region = process.env.NEXT_PUBLIC_AZURE_SPEECH_REGION;
    
    if (!apiKey || !region) {
      console.warn('Azure Speech API credentials not found, falling back to browser synthesis');
      return this.synthesizeBrowser(text, emotion, language);
    }

    try {
      const ssml = this.generateEmotionalSSML(text, emotion, language);
      
      const response = await fetch(`https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': apiKey,
          'Content-Type': 'application/ssml+xml',
          'X-Microsoft-OutputFormat': 'audio-16khz-128kbitrate-mono-mp3'
        },
        body: ssml
      });

      if (response.ok) {
        return await response.arrayBuffer();
      }
    } catch (error) {
      console.error('Azure synthesis error:', error);
    }

    return this.synthesizeBrowser(text, emotion, language);
  }

  private async synthesizeBrowser(text: string, emotion: EmotionalState, language: string): Promise<ArrayBuffer | null> {
    return new Promise((resolve) => {
      if (!('speechSynthesis' in window)) {
        resolve(null);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Configure voice based on emotion
      utterance.rate = emotion.energy === 'high' ? 1.1 : emotion.energy === 'low' ? 0.8 : 1.0;
      utterance.pitch = emotion.primary === 'excited' ? 1.2 : emotion.primary === 'calm' ? 0.8 : 1.0;
      utterance.volume = emotion.intensity;

      // Try to find the best voice for the language
      const voices = speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.lang.startsWith(language) && voice.name.includes('Neural')
      ) || voices.find(voice => voice.lang.startsWith(language));

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onend = () => resolve(null);
      utterance.onerror = () => resolve(null);

      speechSynthesis.speak(utterance);
    });
  }

  private selectElevenLabsVoice(language: string, emotion: EmotionalState): string {
    const provider = this.providers.find(p => p.id === 'elevenlabs');
    if (!provider || !provider.voices[language]) return 'pNInz6obpgDQGcFmaJgB'; // Default Rachel

    const voices = provider.voices[language];
    
    // Select voice based on emotion and warmth
    if (emotion.warmth > 0.8 && voices.female.length > 0) {
      return voices.female[0]; // Warm female voice
    } else if (emotion.primary === 'reverent' && voices.male.length > 0) {
      return voices.male[0]; // Deep male voice for reverent tone
    } else if (voices.neural && voices.neural.length > 0) {
      return voices.neural[0]; // Neural voice for best quality
    }

    return voices.female[0] || voices.male[0] || 'pNInz6obpgDQGcFmaJgB';
  }

  // Convert emotion state to voice configuration
  emotionToVoiceConfig(emotion: EmotionalState, language: string = 'en'): VoiceConfig {
    return {
      provider: 'elevenlabs',
      voiceId: this.selectElevenLabsVoice(language, emotion),
      language,
      emotion,
      speed: emotion.energy === 'high' ? 1.1 : emotion.energy === 'low' ? 0.9 : 1.0,
      pitch: emotion.primary === 'excited' ? 1.2 : emotion.primary === 'calm' ? 0.8 : 1.0,
      volume: emotion.intensity
    };
  }
}

export const emotionalVoice = new EmotionalVoiceEngine(); 