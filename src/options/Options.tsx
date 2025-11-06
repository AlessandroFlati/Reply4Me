import React, { useState, useEffect } from 'react';
import { getConfig, setApiKey } from '../lib/storage';
import { LLMProvider } from '../lib/types';

export const Options: React.FC = () => {
  const [openaiKey, setOpenaiKey] = useState('');
  const [anthropicKey, setAnthropicKey] = useState('');
  const [geminiKey, setGeminiKey] = useState('');
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<LLMProvider>('openai');

  useEffect(() => {
    loadKeys();
  }, []);

  const loadKeys = async () => {
    const config = await getConfig();
    setOpenaiKey(config.apiKeys.openai || '');
    setAnthropicKey(config.apiKeys.anthropic || '');
    setGeminiKey(config.apiKeys.gemini || '');
  };

  const handleSave = async () => {
    try {
      if (openaiKey) await setApiKey('openai', openaiKey);
      if (anthropicKey) await setApiKey('anthropic', anthropicKey);
      if (geminiKey) await setApiKey('gemini', geminiKey);

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving API keys:', error);
    }
  };

  const maskKey = (key: string) => {
    if (!key || key.length < 8) return key;
    return key.substring(0, 8) + '•'.repeat(Math.min(key.length - 8, 20));
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '600', margin: '0 0 8px 0', color: '#111827' }}>
          Reply4Me Settings
        </h1>
        <p style={{ fontSize: '15px', color: '#6b7280', margin: 0 }}>
          Configure your API keys for different LLM providers. Your keys are stored securely in Chrome's encrypted storage.
        </p>
      </div>

      {saved && (
        <div
          style={{
            padding: '12px 16px',
            backgroundColor: '#d1fae5',
            border: '1px solid #10b981',
            borderRadius: '8px',
            marginBottom: '24px',
            color: '#065f46',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          Settings saved successfully!
        </div>
      )}

      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', borderBottom: '2px solid #e5e7eb', marginBottom: '24px' }}>
          {(['openai', 'anthropic', 'gemini'] as LLMProvider[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '12px 24px',
                border: 'none',
                background: 'none',
                borderBottom: activeTab === tab ? '2px solid #3b82f6' : '2px solid transparent',
                color: activeTab === tab ? '#3b82f6' : '#6b7280',
                fontWeight: activeTab === tab ? '600' : '500',
                fontSize: '14px',
                cursor: 'pointer',
                marginBottom: '-2px',
              }}
            >
              {tab === 'openai' ? 'OpenAI' : tab === 'anthropic' ? 'Anthropic' : 'Google Gemini'}
            </button>
          ))}
        </div>

        {activeTab === 'openai' && (
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#111827' }}>
              OpenAI API Key
            </h2>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
              Get your API key from{' '}
              <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6' }}>
                OpenAI Platform
              </a>
            </p>
            <input
              type="password"
              value={openaiKey}
              onChange={(e) => setOpenaiKey(e.target.value)}
              placeholder="sk-..."
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'monospace',
              }}
            />
            {openaiKey && (
              <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '8px' }}>
                Current: {maskKey(openaiKey)}
              </p>
            )}
          </div>
        )}

        {activeTab === 'anthropic' && (
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#111827' }}>
              Anthropic API Key
            </h2>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
              Get your API key from{' '}
              <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6' }}>
                Anthropic Console
              </a>
            </p>
            <input
              type="password"
              value={anthropicKey}
              onChange={(e) => setAnthropicKey(e.target.value)}
              placeholder="sk-ant-..."
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'monospace',
              }}
            />
            {anthropicKey && (
              <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '8px' }}>
                Current: {maskKey(anthropicKey)}
              </p>
            )}
          </div>
        )}

        {activeTab === 'gemini' && (
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#111827' }}>
              Google Gemini API Key
            </h2>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
              Get your API key from{' '}
              <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6' }}>
                Google AI Studio
              </a>
            </p>
            <input
              type="password"
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              placeholder="Enter your Gemini API key"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'monospace',
              }}
            />
            {geminiKey && (
              <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '8px' }}>
                Current: {maskKey(geminiKey)}
              </p>
            )}
          </div>
        )}
      </div>

      <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
        <button
          onClick={handleSave}
          style={{
            padding: '12px 32px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          Save Settings
        </button>
      </div>

      <div style={{ marginTop: '48px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#111827' }}>
          About Security
        </h3>
        <p style={{ fontSize: '14px', color: '#6b7280', margin: 0, lineHeight: '1.6' }}>
          Your API keys are stored locally in Chrome's encrypted storage and are never sent anywhere except directly to the
          respective LLM provider's API. The extension only communicates with the official APIs of OpenAI, Anthropic, and Google.
        </p>
      </div>
    </div>
  );
};
