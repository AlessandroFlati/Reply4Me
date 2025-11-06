import { LLMProvider as ILLMProvider } from './base';
import { OpenAIProvider } from './openai';
import { AnthropicProvider } from './anthropic';
import { GeminiProvider } from './gemini';
import { LLMProvider as LLMProviderType } from '../types';

/**
 * Factory function to get the appropriate LLM provider
 */
export function getProvider(provider: LLMProviderType): ILLMProvider {
  switch (provider) {
    case 'openai':
      return new OpenAIProvider();
    case 'anthropic':
      return new AnthropicProvider();
    case 'gemini':
      return new GeminiProvider();
    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
}

export { OpenAIProvider, AnthropicProvider, GeminiProvider };
export { LLMError } from './base';
