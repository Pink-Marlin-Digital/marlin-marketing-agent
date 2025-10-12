import { openai, openaiConfig, formatHelloWorldPrompt } from '../config/openai';
import { LLMError } from '../middleware/errorHandler';
import { logInfo, logError } from '../middleware/logger';

export interface HelloWorldResponse {
  message: string;
  tokensUsed: number;
}

export async function generateHelloWorldMessage(): Promise<HelloWorldResponse> {
  try {
    logInfo('Starting LLM hello world generation', {
      model: openaiConfig.model,
    });

    // Format the prompt with current time and date
    const prompt = formatHelloWorldPrompt();

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: openaiConfig.model,
      messages: [
        {
          role: 'system',
          content:
            'You are a friendly AI assistant for Marlin Marketing Agent. Generate warm, professional welcome messages.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: openaiConfig.temperature,
      max_tokens: openaiConfig.maxTokens,
    });

    // Parse the response
    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new LLMError('No content received from LLM');
    }

    const tokensUsed = response.usage?.total_tokens || 0;

    logInfo('LLM hello world generation completed', {
      tokensUsed,
      messageLength: content.length,
    });

    return {
      message: content.trim(),
      tokensUsed,
    };
  } catch (error) {
    logError(error as Error, {
      model: openaiConfig.model,
    });

    if (error instanceof LLMError) {
      throw error;
    }

    // Handle OpenAI API errors
    if (error instanceof Error && error.message.includes('timeout')) {
      throw new LLMError('LLM request timed out');
    }

    if (error instanceof Error && error.message.includes('rate limit')) {
      throw new LLMError('LLM rate limit exceeded');
    }

    throw new LLMError(
      `LLM generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
}
