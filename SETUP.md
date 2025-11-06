# Setup Guide

This guide will walk you through setting up the Reply4Me extension for development and testing.

## Prerequisites

- Node.js 18 or higher
- npm (comes with Node.js)
- Google Chrome browser
- API key from at least one provider (OpenAI, Anthropic, or Google)

## Step 1: Clone and Install

```bash
# Clone the repository
git clone https://github.com/AlessandroFlati/Reply4Me.git
cd Reply4Me

# Install dependencies
npm install
```

## Step 2: Create Extension Icons

Before building, create icon files in `src/assets/icons/`:
- `icon-16.png` (16x16 pixels)
- `icon-48.png` (48x48 pixels)
- `icon-128.png` (128x128 pixels)

See `src/assets/icons/README.md` for details on creating icons.

**Temporary workaround**: You can comment out the `icons` and `action.default_icon` sections in `manifest.json` to use Chrome's default icon during development.

## Step 3: Build the Extension

For development with auto-rebuild:
```bash
npm run dev
```

For production build:
```bash
npm run build
```

This creates a `dist/` directory with the compiled extension.

## Step 4: Load Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" using the toggle in the top right
3. Click "Load unpacked"
4. Select the `dist` folder from the Reply4Me directory
5. The extension should now appear in your extensions list

## Step 5: Configure API Keys

1. Click the Reply4Me extension icon in Chrome toolbar
2. Click "Settings" button
3. Navigate to the tab for your preferred provider
4. Paste your API key
5. Click "Save Settings"

### Getting API Keys

**OpenAI:**
1. Go to [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the key (it starts with `sk-`)

**Anthropic (Claude):**
1. Go to [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys)
2. Sign in or create an account
3. Click "Create Key"
4. Copy the key (it starts with `sk-ant-`)

**Google Gemini:**
1. Go to [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key

## Step 6: Test the Extension

1. Navigate to any webpage with a form (e.g., a contact form, survey, etc.)
2. Click the Reply4Me extension icon
3. Select your provider and model
4. Click "Analyze Form"
5. Review the generated answers in the modal
6. Test applying answers to fields

## Troubleshooting

### Extension doesn't load
- Ensure you selected the `dist` folder, not the root project folder
- Check that `npm run build` completed without errors
- Look for errors in `chrome://extensions/` under your extension

### "No form fields detected"
- Ensure the page has visible input fields
- Some fields may be hidden or in iframes (not currently supported)
- Try a different page with a simpler form

### API errors
- Verify your API key is correct and has available credits
- Check your internet connection
- Look at the browser console for detailed error messages

### Changes not reflecting
- After modifying code, run `npm run build` again
- Click the refresh icon in `chrome://extensions/` for your extension
- For content script changes, you may need to reload the webpage

## Development Tips

### Live Reload for Development

When running `npm run dev`, Vite will watch for file changes and rebuild automatically. However, you still need to:
1. Click the refresh button in `chrome://extensions/` after each build
2. Reload any webpages where you want to test the content script

### Debugging

- **Popup**: Right-click the extension icon → "Inspect popup"
- **Options page**: Right-click on the options page → "Inspect"
- **Content script**: Open DevTools on any webpage and check the Console
- **Background script**: Go to `chrome://extensions/`, find your extension, and click "service worker"

### Testing Different Providers

Configure API keys for all three providers to easily switch between them and compare results.

## Next Steps

- Read through the code in `src/` to understand the architecture
- Try the extension on various types of forms
- Experiment with different models to see how they perform
- Consider contributing improvements or new features!

## Common Issues

### TypeScript Errors
```bash
npm run type-check
```
This will show any TypeScript type errors without building.

### Build Errors
- Delete `node_modules` and `dist` folders
- Run `npm install` again
- Try building again with `npm run build`

### Storage Issues
- Open DevTools on the options page
- Go to Application → Storage → Local Storage
- Clear the extension's storage if needed
- Or use: `chrome.storage.local.clear()` in the console

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Review the extension's service worker logs
3. Open an issue on GitHub with details about the problem
