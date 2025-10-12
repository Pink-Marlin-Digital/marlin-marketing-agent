import OpenAI from 'openai';

if (!process.env['OPENAI_API_KEY']) {
  throw new Error('OPENAI_API_KEY environment variable is required');
}

export const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
  timeout: 30000, // 30 seconds
  maxRetries: 3,
});

export const openaiConfig = {
  model: process.env['OPENAI_MODEL'] || 'gpt-4',
  temperature: parseFloat(process.env['OPENAI_TEMPERATURE'] || '0.7'),
  maxTokens: parseInt(process.env['OPENAI_MAX_TOKENS'] || '1000'),
  timeout: 30000,
  maxRetries: 3,
};

export const helloWorldPrompt = `You are a friendly AI assistant for Marlin Marketing Agent. Generate a warm welcome message that includes the current time and day.

Requirements:
1. Write a friendly, professional welcome message
2. Include the current date and time in a natural way
3. Keep it concise but engaging (2-3 sentences)
4. Use a warm, welcoming tone
5. Mention that this is from the Marlin Marketing Agent

Return the response as a simple text message (not JSON).`;

export function formatHelloWorldPrompt(): string {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  const dayString = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return `${helloWorldPrompt}

Current time: ${timeString}
Current date: ${dayString}`;
}
