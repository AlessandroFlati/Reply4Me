import { Config, LLMProvider, ModelName } from './types';

// Default configuration
const DEFAULT_CONFIG: Config = {
  provider: 'openai',
  model: 'gpt-4o-mini',
  apiKeys: {},
};

// Storage keys
const STORAGE_KEY = 'reply4me_config';

/**
 * Get the current configuration from Chrome storage
 */
export async function getConfig(): Promise<Config> {
  try {
    const result = await chrome.storage.local.get(STORAGE_KEY);
    return result[STORAGE_KEY] || DEFAULT_CONFIG;
  } catch (error) {
    console.error('Error getting config:', error);
    return DEFAULT_CONFIG;
  }
}

/**
 * Save configuration to Chrome storage
 */
export async function saveConfig(config: Partial<Config>): Promise<void> {
  try {
    const currentConfig = await getConfig();
    const newConfig = { ...currentConfig, ...config };
    await chrome.storage.local.set({ [STORAGE_KEY]: newConfig });
  } catch (error) {
    console.error('Error saving config:', error);
    throw error;
  }
}

/**
 * Update API key for a specific provider
 */
export async function setApiKey(provider: LLMProvider, apiKey: string): Promise<void> {
  const config = await getConfig();
  config.apiKeys[provider] = apiKey;
  await saveConfig(config);
}

/**
 * Get API key for a specific provider
 */
export async function getApiKey(provider: LLMProvider): Promise<string | undefined> {
  const config = await getConfig();
  return config.apiKeys[provider];
}

/**
 * Set the active provider and model
 */
export async function setProviderAndModel(provider: LLMProvider, model: ModelName): Promise<void> {
  await saveConfig({ provider, model });
}

/**
 * Clear all stored data (useful for debugging or reset)
 */
export async function clearStorage(): Promise<void> {
  await chrome.storage.local.remove(STORAGE_KEY);
}

/**
 * Check if the current provider has an API key configured
 */
export async function hasApiKey(provider?: LLMProvider): Promise<boolean> {
  const config = await getConfig();
  const targetProvider = provider || config.provider;
  return !!config.apiKeys[targetProvider];
}
