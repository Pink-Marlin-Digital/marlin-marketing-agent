/**
 * AIModelConfig interface for OpenAI model configuration
 * Contains model settings and parameters for AI service
 */
export interface AIModelConfig {
  model: string;
  temperature: number;
  max_tokens: number;
  timeout: number;
  retry_attempts: number;
}
