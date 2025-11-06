// LLM Provider types
export type LLMProvider = 'openai' | 'anthropic' | 'gemini';

export type OpenAIModel = 'gpt-4o' | 'gpt-4o-mini' | 'gpt-4-turbo' | 'gpt-3.5-turbo';
export type AnthropicModel = 'claude-3-5-sonnet-20241022' | 'claude-3-5-haiku-20241022' | 'claude-3-opus-20240229';
export type GeminiModel = 'gemini-1.5-pro' | 'gemini-1.5-flash' | 'gemini-1.0-pro';

export type ModelName = OpenAIModel | AnthropicModel | GeminiModel;

// Configuration stored in Chrome Storage
export interface Config {
  provider: LLMProvider;
  model: ModelName;
  apiKeys: {
    openai?: string;
    anthropic?: string;
    gemini?: string;
  };
}

// Form field detected on page
export interface FormField {
  element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
  label: string;
  type: string;
  id: string;
  name: string;
  placeholder?: string;
  required: boolean;
}

// Question extracted from form
export interface FormQuestion {
  question: string;
  fieldId: string;
  fieldType: string;
  context?: string;
}

// Answer from LLM
export interface FormAnswer {
  fieldId: string;
  answer: string;
  confidence?: number;
}

// LLM Request/Response
export interface LLMRequest {
  questions: FormQuestion[];
  pageContext?: string;
}

export interface LLMResponse {
  answers: FormAnswer[];
  model: string;
  provider: LLMProvider;
}

// Provider models mapping
export const PROVIDER_MODELS: Record<LLMProvider, ModelName[]> = {
  openai: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo'],
  anthropic: ['claude-3-5-sonnet-20241022', 'claude-3-5-haiku-20241022', 'claude-3-opus-20240229'],
  gemini: ['gemini-1.5-pro', 'gemini-1.5-flash', 'gemini-1.0-pro'],
};

// Model display names
export const MODEL_DISPLAY_NAMES: Record<ModelName, string> = {
  'gpt-4o': 'GPT-4o',
  'gpt-4o-mini': 'GPT-4o Mini',
  'gpt-4-turbo': 'GPT-4 Turbo',
  'gpt-3.5-turbo': 'GPT-3.5 Turbo',
  'claude-3-5-sonnet-20241022': 'Claude 3.5 Sonnet',
  'claude-3-5-haiku-20241022': 'Claude 3.5 Haiku',
  'claude-3-opus-20240229': 'Claude 3 Opus',
  'gemini-1.5-pro': 'Gemini 1.5 Pro',
  'gemini-1.5-flash': 'Gemini 1.5 Flash',
  'gemini-1.0-pro': 'Gemini 1.0 Pro',
};
