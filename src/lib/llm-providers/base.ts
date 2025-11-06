import { LLMRequest, LLMResponse } from '../types';

/**
 * Base interface for all LLM providers
 */
export interface LLMProvider {
  /**
   * Generate answers for form questions
   */
  generateAnswers(request: LLMRequest, apiKey: string, model: string): Promise<LLMResponse>;

  /**
   * Validate API key format
   */
  validateApiKey(apiKey: string): boolean;
}

/**
 * Base error class for LLM-related errors
 */
export class LLMError extends Error {
  constructor(
    message: string,
    public provider: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'LLMError';
  }
}
