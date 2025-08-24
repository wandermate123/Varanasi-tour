import { NextRequest, NextResponse } from 'next/server';

// Define supported languages and translation structure
type SupportedLanguage = 'hi' | 'bn' | 'es' | 'fr' | 'de' | 'ja' | 'ko';
type TranslationKey = string;
type Translations = Record<SupportedLanguage, Record<TranslationKey, string>>;

export async function POST(request: NextRequest) {
  try {
    const { text, targetLanguage, sourceLanguage } = await request.json();

    // Validate inputs
    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text is required and must be a string' },
        { status: 400 }
      );
    }

    if (!targetLanguage || typeof targetLanguage !== 'string') {
      return NextResponse.json(
        { error: 'Target language is required and must be a string' },
        { status: 400 }
      );
    }

    // Mock translation with common travel phrases
    const translations = getTranslations();
    
    // Type-safe translation lookup
    const targetLang = targetLanguage as SupportedLanguage;
    const translatedText = (translations[targetLang] && translations[targetLang][text]) || 
                          `[${targetLanguage.toUpperCase()}] ${text}`;

    return NextResponse.json({
      translatedText,
      sourceLanguage: sourceLanguage || 'auto',
      targetLanguage,
      confidence: 0.95
    });
  } catch (error) {
    console.error('Translation API Error:', error);
    return NextResponse.json(
      { error: 'Translation failed' },
      { status: 500 }
    );
  }
}

function getTranslations(): Translations {
  return {
    hi: {
      'How much does this cost?': 'इसकी कीमत कितनी है?',
      'Where is the temple?': 'मंदिर कहाँ है?',
      'Can you help me?': 'क्या आप मेरी मदद कर सकते हैं?',
      'Thank you': 'धन्यवाद',
      'Hello': 'नमस्ते',
      'Goodbye': 'अलविदा',
      'Yes': 'हाँ',
      'No': 'नहीं',
      'Please': 'कृपया',
      'Sorry': 'माफ करना',
      'Book a hotel': 'होटल बुक करें',
      'Find restaurants': 'रेस्टोरेंट खोजें',
      'Get directions': 'दिशा-निर्देश प्राप्त करें'
    },
    bn: {
      'How much does this cost?': 'এটার দাম কত?',
      'Where is the temple?': 'মন্দির কোথায়?',
      'Can you help me?': 'আপনি কি আমাকে সাহায্য করতে পারেন?',
      'Thank you': 'ধন্যবাদ',
      'Hello': 'নমস্কার',
      'Goodbye': 'বিদায়',
      'Yes': 'হ্যাঁ',
      'No': 'না',
      'Please': 'দয়া করে',
      'Sorry': 'দুঃখিত'
    },
    es: {
      'How much does this cost?': '¿Cuánto cuesta esto?',
      'Where is the temple?': '¿Dónde está el templo?',
      'Can you help me?': '¿Puedes ayudarme?',
      'Thank you': 'Gracias',
      'Hello': 'Hola',
      'Goodbye': 'Adiós',
      'Yes': 'Sí',
      'No': 'No',
      'Please': 'Por favor',
      'Sorry': 'Lo siento'
    },
    fr: {
      'How much does this cost?': 'Combien ça coûte?',
      'Where is the temple?': 'Où est le temple?',
      'Can you help me?': 'Pouvez-vous m\'aider?',
      'Thank you': 'Merci',
      'Hello': 'Bonjour',
      'Goodbye': 'Au revoir',
      'Yes': 'Oui',
      'No': 'Non',
      'Please': 'S\'il vous plaît',
      'Sorry': 'Désolé'
    },
    de: {
      'How much does this cost?': 'Wie viel kostet das?',
      'Where is the temple?': 'Wo ist der Tempel?',
      'Can you help me?': 'Können Sie mir helfen?',
      'Thank you': 'Danke',
      'Hello': 'Hallo',
      'Goodbye': 'Auf Wiedersehen',
      'Yes': 'Ja',
      'No': 'Nein',
      'Please': 'Bitte',
      'Sorry': 'Entschuldigung'
    },
    ja: {
      'How much does this cost?': 'これはいくらですか？',
      'Where is the temple?': '寺院はどこですか？',
      'Can you help me?': '手伝ってもらえますか？',
      'Thank you': 'ありがとう',
      'Hello': 'こんにちは',
      'Goodbye': 'さようなら',
      'Yes': 'はい',
      'No': 'いいえ',
      'Please': 'お願いします',
      'Sorry': 'すみません'
    },
    ko: {
      'How much does this cost?': '이것은 얼마입니까?',
      'Where is the temple?': '절이 어디에 있습니까?',
      'Can you help me?': '도와주실 수 있나요?',
      'Thank you': '감사합니다',
      'Hello': '안녕하세요',
      'Goodbye': '안녕히 가세요',
      'Yes': '네',
      'No': '아니요',
      'Please': '부탁합니다',
      'Sorry': '죄송합니다'
    }
  };
} 