# Quick Start Guide

Get Reply4Me running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- Chrome browser
- API key from OpenAI, Anthropic, or Google

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Generate Icons (Optional but Recommended)

```bash
npm run generate-icons
```

This creates placeholder icons. You can replace them with custom designs later.

### 3. Build the Extension

```bash
npm run build
```

This creates a `dist/` folder with your compiled extension.

### 4. Load in Chrome

1. Open Chrome
2. Go to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top-right)
4. Click "Load unpacked"
5. Select the `dist` folder

### 5. Configure API Key

1. Click the Reply4Me extension icon
2. Click "Settings"
3. Choose your provider tab (OpenAI/Anthropic/Gemini)
4. Paste your API key
5. Click "Save Settings"

### 6. Try It Out!

1. Go to any webpage with a form (try a contact form or survey)
2. Click the Reply4Me extension icon
3. Select your provider and model
4. Click "Analyze Form"
5. Review and apply the suggested answers!

## Get API Keys

- **OpenAI**: [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- **Anthropic**: [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys)
- **Gemini**: [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)

## Development Mode

For development with auto-rebuild:

```bash
npm run dev
```

After code changes:
1. Rebuild completes automatically
2. Go to `chrome://extensions/`
3. Click refresh icon on Reply4Me extension
4. Reload any test webpages

## Troubleshooting

**"No form fields detected"**
- Make sure the page has visible input/textarea/select fields
- Refresh the page and try again

**API Errors**
- Verify your API key is correct
- Check you have available credits
- Look at browser console for detailed errors

**Extension not loading**
- Ensure you selected the `dist` folder (not root folder)
- Check for build errors in terminal
- Try `npm run build` again

## Next Steps

- Read [README.md](README.md) for full documentation
- See [SETUP.md](SETUP.md) for detailed setup instructions
- Check [CONTRIBUTING.md](CONTRIBUTING.md) to contribute

## Support

Having issues? Open an issue on GitHub with:
- What you were trying to do
- What happened instead
- Browser console errors (if any)
- Extension version

Happy form filling! 🚀
