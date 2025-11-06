# Reply4Me - AI-Powered Form Assistant

A Chrome extension that uses configurable LLM providers (OpenAI, Claude, Gemini) to intelligently fill out web forms. The extension detects form fields, sends questions to your chosen AI model, and presents suggested answers in an easy-to-use modal interface.

## 🚀 Getting Started

**New here? Read [START_HERE.md](START_HERE.md) first!**

Then follow the [Developer Guide](DEVELOPER_GUIDE.md) for complete setup instructions.

## 📚 Documentation

- **[START_HERE.md](START_HERE.md)** ⭐ New to the project? Start here!
- **[DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md)** - Complete installation and setup guide
- **[QUICKSTART.md](QUICKSTART.md)** - Get running in 5 minutes
- **[SETUP.md](SETUP.md)** - Detailed development setup
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - How to contribute
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Technical overview

## Features

- **Multi-Provider Support**: Choose between OpenAI, Anthropic (Claude), or Google (Gemini)
- **Model Selection**: Select from various models including GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, and more
- **Secure Storage**: API keys are stored securely using Chrome's encrypted storage
- **Smart Form Detection**: Automatically detects and analyzes form fields on any webpage
- **Interactive Modal**: Review, edit, and apply AI-generated answers before submission
- **Copy/Paste Support**: Easily copy answers or apply them directly to form fields
- **Context-Aware**: Uses page context and field labels for better answer accuracy

## Installation

### For Development

1. Clone the repository:
   ```bash
   git clone https://github.com/AlessandroFlati/Reply4Me.git
   cd Reply4Me
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the extension:
   ```bash
   npm run build
   ```

4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the `dist` folder from this project

### For Development with Hot Reload

```bash
npm run dev
```

This will watch for changes and rebuild automatically. You'll need to refresh the extension in Chrome after changes.

## Setup

1. **Get API Keys**: You'll need an API key from at least one provider:
   - **OpenAI**: [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
   - **Anthropic**: [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys)
   - **Google Gemini**: [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)

2. **Configure the Extension**:
   - Click the Reply4Me extension icon
   - Click "Settings"
   - Enter your API key(s) for your preferred provider(s)
   - Click "Save Settings"

3. **Select Provider and Model**:
   - Click the Reply4Me extension icon
   - Choose your preferred provider (OpenAI/Anthropic/Gemini)
   - Select the model you want to use

## Usage

1. Navigate to any webpage with a form
2. Click the Reply4Me extension icon
3. Select your preferred provider and model
4. Click "Analyze Form"
5. Review the AI-generated answers in the modal
6. Edit any answers as needed
7. Click "Apply" to fill individual fields or "Apply All Answers" to fill all fields at once
8. Alternatively, use "Copy" to copy answers to your clipboard

## Project Structure

```
Reply4Me/
├── src/
│   ├── background/          # Background service worker
│   ├── content/             # Content scripts for form detection
│   ├── popup/               # Extension popup UI
│   ├── options/             # Settings/options page
│   ├── lib/
│   │   ├── llm-providers/   # LLM provider integrations
│   │   ├── storage.ts       # Chrome storage wrapper
│   │   └── types.ts         # TypeScript type definitions
│   └── styles/              # Global styles
├── public/                  # Static assets
├── manifest.json           # Chrome extension manifest
├── vite.config.ts          # Vite build configuration
└── package.json            # Dependencies and scripts
```

## Architecture

### Components

- **Content Script**: Detects forms and injects the answer modal
- **Background Service Worker**: Coordinates communication between components
- **Popup**: Main UI for provider/model selection and triggering form analysis
- **Options Page**: Configuration interface for API keys
- **LLM Providers**: Modular integrations for each AI service

### Security

- API keys are stored using Chrome's `chrome.storage.local`, which is encrypted
- Keys are never transmitted except directly to official provider APIs
- No third-party services or tracking
- All communication happens client-side

### LLM Providers

Each provider implements a common interface:

```typescript
interface LLMProvider {
  generateAnswers(request: LLMRequest, apiKey: string, model: string): Promise<LLMResponse>;
  validateApiKey(apiKey: string): boolean;
}
```

Current providers:
- **OpenAI**: GPT-4o, GPT-4o-mini, GPT-4-turbo, GPT-3.5-turbo
- **Anthropic**: Claude 3.5 Sonnet, Claude 3.5 Haiku, Claude 3 Opus
- **Google Gemini**: Gemini 1.5 Pro, Gemini 1.5 Flash, Gemini 1.0 Pro

## Development

### Prerequisites

- Node.js 18+
- npm or yarn
- Chrome browser

### Scripts

- `npm run dev` - Build with watch mode for development
- `npm run build` - Production build
- `npm run type-check` - TypeScript type checking

### Adding a New Provider

1. Create a new file in `src/lib/llm-providers/`
2. Implement the `LLMProvider` interface
3. Add the provider to `src/lib/types.ts`
4. Update `getProvider()` in `src/lib/llm-providers/index.ts`
5. Add UI options in popup and options components

## Technology Stack

- **TypeScript** - Type-safe development
- **React** - UI components
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **Chrome Extension Manifest V3** - Latest extension API

## Privacy & Data

- No data is collected or transmitted except to your chosen LLM provider
- API keys are stored locally and encrypted by Chrome
- Form data is only sent to the provider's API during active analysis
- No analytics or tracking

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

MIT License - see LICENSE file for details

## Disclaimer

This extension sends form data to third-party AI services (OpenAI, Anthropic, Google). Please review their respective privacy policies and terms of service. Do not use this extension for sensitive personal information without understanding the implications.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.
