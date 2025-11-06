import React, { useState, useEffect } from 'react';
import { getConfig, setProviderAndModel, hasApiKey } from '../lib/storage';
import { LLMProvider, ModelName, PROVIDER_MODELS, MODEL_DISPLAY_NAMES } from '../lib/types';

export const Popup: React.FC = () => {
  const [provider, setProvider] = useState<LLMProvider>('openai');
  const [model, setModel] = useState<ModelName>('gpt-4o-mini');
  const [hasKey, setHasKey] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    const config = await getConfig();
    setProvider(config.provider);
    setModel(config.model);
    const keyExists = await hasApiKey(config.provider);
    setHasKey(keyExists);
  };

  const handleProviderChange = async (newProvider: LLMProvider) => {
    setProvider(newProvider);
    const defaultModel = PROVIDER_MODELS[newProvider][0];
    setModel(defaultModel);
    await setProviderAndModel(newProvider, defaultModel);

    const keyExists = await hasApiKey(newProvider);
    setHasKey(keyExists);
  };

  const handleModelChange = async (newModel: ModelName) => {
    setModel(newModel);
    await setProviderAndModel(provider, newModel);
  };

  const handleAnalyzeForm = async () => {
    if (!hasKey) {
      chrome.runtime.openOptionsPage();
      return;
    }

    setIsProcessing(true);

    try {
      // Send message to background to trigger form processing
      await chrome.runtime.sendMessage({ action: 'triggerFormProcessing' });
    } catch (error) {
      console.error('Error triggering form processing:', error);
    } finally {
      setIsProcessing(false);
      // Close popup after triggering
      window.close();
    }
  };

  return (
    <div style={{ width: '320px', padding: '16px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 4px 0', color: '#111827' }}>
          Reply4Me
        </h1>
        <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>
          AI-powered form assistant
        </p>
      </div>

      {!hasKey && (
        <div
          style={{
            padding: '12px',
            backgroundColor: '#fef3c7',
            border: '1px solid #fbbf24',
            borderRadius: '6px',
            marginBottom: '16px',
          }}
        >
          <p style={{ margin: 0, fontSize: '13px', color: '#92400e' }}>
            Please configure your API key in settings.
          </p>
        </div>
      )}

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '6px', color: '#374151' }}>
          Provider
        </label>
        <select
          value={provider}
          onChange={(e) => handleProviderChange(e.target.value as LLMProvider)}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '14px',
            backgroundColor: 'white',
          }}
        >
          <option value="openai">OpenAI</option>
          <option value="anthropic">Anthropic (Claude)</option>
          <option value="gemini">Google (Gemini)</option>
        </select>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '6px', color: '#374151' }}>
          Model
        </label>
        <select
          value={model}
          onChange={(e) => handleModelChange(e.target.value as ModelName)}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '14px',
            backgroundColor: 'white',
          }}
        >
          {PROVIDER_MODELS[provider].map((m) => (
            <option key={m} value={m}>
              {MODEL_DISPLAY_NAMES[m]}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleAnalyzeForm}
        disabled={isProcessing}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: hasKey ? '#3b82f6' : '#9ca3af',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: '500',
          cursor: hasKey ? 'pointer' : 'not-allowed',
          marginBottom: '12px',
        }}
      >
        {isProcessing ? 'Processing...' : hasKey ? 'Analyze Form' : 'Configure API Key'}
      </button>

      <button
        onClick={() => chrome.runtime.openOptionsPage()}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: 'white',
          color: '#374151',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          fontSize: '13px',
          fontWeight: '500',
          cursor: 'pointer',
        }}
      >
        Settings
      </button>
    </div>
  );
};
