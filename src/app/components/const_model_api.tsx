const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY
import { getTranslationPrompt } from './voice-translation/prompt';
import { getLearningPathPrompt, getInstructorPrompt } from './instructor/prompt';

export const translateText = async (
  text: string,
  targetLanguage: string,
  sourceLanguage: string
): Promise<string> => {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          getTranslationPrompt(sourceLanguage, targetLanguage),
          {
            role: 'user',
            content: text
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content?.trim() || '';
  } catch (error) {
    console.error('Translation error:', error);
    throw new Error('Failed to translate text. Please try again.');
  }
}

export const getLearningRecommendations = async (language: string): Promise<string> => {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          getLearningPathPrompt(language),
          {
            role: 'user',
            content: `Create a detailed 8-week learning path for ${language}`
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content?.trim() || 'Unable to generate learning path at this time.';
  } catch (error) {
    console.error('Error getting learning recommendations:', error);
    throw new Error('Failed to generate learning recommendations. Please try again.');
  }
};

export const getInstructorResponse = async (language: string, messages: Array<{role: string, content: string}>): Promise<string> => {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          getInstructorPrompt(language),
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content?.trim() || 'I apologize, but I cannot respond at the moment.';
  } catch (error) {
    console.error('Error getting instructor response:', error);
    throw new Error('Failed to get a response. Please try again.');
  }
};
