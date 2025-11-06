# Developer Guide - Reply4Me Chrome Extension

This guide will walk you through every step of installing, building, and configuring the Reply4Me Chrome extension for development.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Setup](#project-setup)
3. [Building the Extension](#building-the-extension)
4. [Installing in Chrome](#installing-in-chrome)
5. [Getting API Keys](#getting-api-keys)
6. [Configuring API Keys](#configuring-api-keys)
7. [Testing the Extension](#testing-the-extension)
8. [Development Workflow](#development-workflow)
9. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before starting, ensure you have:

### Required Software

1. **Node.js** (version 18 or higher)
   - Download from: https://nodejs.org/
   - Verify installation:
     ```bash
     node --version  # Should show v18.x.x or higher
     npm --version   # Should show 9.x.x or higher
     ```

2. **Git**
   - Download from: https://git-scm.com/
   - Verify installation:
     ```bash
     git --version   # Should show git version 2.x.x
     ```

3. **Google Chrome**
   - Download from: https://www.google.com/chrome/

4. **Code Editor** (recommended)
   - VS Code: https://code.visualstudio.com/
   - Or any text editor you prefer

### Required API Keys

You'll need at least one API key from:
- **OpenAI** (recommended for beginners)
- **Anthropic** (Claude)
- **Google Gemini**

We'll get these in the [Getting API Keys](#getting-api-keys) section.

---

## Project Setup

### Step 1: Clone the Repository

Open your terminal and run:

```bash
# Clone the repository
git clone https://github.com/AlessandroFlati/Reply4Me.git

# Navigate into the project directory
cd Reply4Me

# Verify you're in the right directory
ls -la
# You should see: package.json, manifest.json, src/, etc.
```

### Step 2: Install Dependencies

Install all required npm packages:

```bash
npm install
```

This will:
- Download all dependencies (~100MB)
- Create a `node_modules/` folder
- Take 1-3 minutes depending on your internet speed

**Expected output:**
```
added 234 packages, and audited 235 packages in 45s

73 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

### Step 3: Generate Icons

The extension needs icons in PNG format. Generate placeholder icons:

```bash
npm run generate-icons
```

**Expected output:**
```
✓ Created /home/user/Reply4Me/public/assets/icons/icon-16.png
✓ Created /home/user/Reply4Me/public/assets/icons/icon-48.png
✓ Created /home/user/Reply4Me/public/assets/icons/icon-128.png

✓ All icons generated successfully!
Note: These are placeholder icons. For production, create custom icons with your design.
```

These icons will appear in Chrome's toolbar and extension management page.

---

## Building the Extension

### Step 4: Build for Development

Build the extension for the first time:

```bash
npm run build
```

**What this does:**
- Compiles TypeScript to JavaScript
- Bundles React components
- Processes CSS with Tailwind
- Copies manifest.json and assets
- Creates a `dist/` folder with your extension

**Expected output:**
```
vite v5.0.8 building for production...
✓ 234 modules transformed.
dist/popup/index.html                    0.45 kB │ gzip:  0.29 kB
dist/options/index.html                  0.45 kB │ gzip:  0.29 kB
dist/background/service-worker.js        0.50 kB │ gzip:  0.32 kB
dist/content/content-script.js          15.23 kB │ gzip:  5.12 kB
dist/popup/popup.js                     25.67 kB │ gzip:  9.45 kB
dist/options/options.js                 28.92 kB │ gzip: 10.23 kB
✓ built in 3.45s
✓ Copied manifest.json
```

**Verify the build:**
```bash
ls -la dist/
```

You should see:
- `manifest.json`
- `background/` folder
- `content/` folder
- `popup/` folder
- `options/` folder
- `assets/` folder
- `chunks/` folder

---

## Installing in Chrome

### Step 5: Enable Developer Mode

1. **Open Chrome**
2. **Navigate to Extensions Page**
   - Type in address bar: `chrome://extensions/`
   - Or: Menu (⋮) → Extensions → Manage Extensions

3. **Enable Developer Mode**
   - Look at the top-right corner
   - Toggle the "Developer mode" switch to ON
   - The switch should turn blue

   **What you'll see:**
   - Three new buttons appear: "Load unpacked", "Pack extension", "Update"

### Step 6: Load the Extension

1. **Click "Load unpacked"** button (top-left area)

2. **Navigate to your project directory**
   - Find the `Reply4Me` folder
   - **IMPORTANT:** Select the `dist` folder inside Reply4Me
   - Click "Select Folder" or "Open"

   ```
   Reply4Me/
   └── dist/          ← SELECT THIS FOLDER
       ├── manifest.json
       ├── background/
       ├── content/
       └── ...
   ```

3. **Verify Installation**
   - You should see a new extension card appear
   - Title: "Reply4Me"
   - Version: "1.0.0"
   - Status: "ON" (blue toggle)

   **Extension card shows:**
   - Extension icon (blue square with "R4M")
   - Name: "Reply4Me"
   - Description: "AI-powered form assistant using configurable LLM providers"
   - ID: (a long string like `abcdefghijklmnopqrstuvwxyz`)

### Step 7: Pin the Extension (Optional but Recommended)

1. **Click the Extensions icon** in Chrome toolbar (puzzle piece icon)
2. **Find "Reply4Me"** in the list
3. **Click the pin icon** next to it
4. The Reply4Me icon should now appear in your Chrome toolbar

---

## Getting API Keys

You need at least one API key to use the extension. Here's how to get them:

### Option 1: OpenAI (Recommended for Beginners)

**Cost:** Pay-as-you-go, ~$0.002 per form fill with GPT-4o-mini

1. **Go to OpenAI Platform**
   - Visit: https://platform.openai.com/api-keys
   - Sign up or log in

2. **Create a New API Key**
   - Click "+ Create new secret key"
   - Give it a name: "Reply4Me Extension"
   - Click "Create secret key"

3. **Copy the Key**
   - **IMPORTANT:** Copy the key immediately (starts with `sk-`)
   - You won't be able to see it again
   - Store it temporarily in a secure place

   **Example key format:**
   ```
   sk-proj-AbCdEfGhIjKlMnOpQrStUvWxYz1234567890
   ```

4. **Add Payment Method** (if not done already)
   - Go to: https://platform.openai.com/account/billing/overview
   - Add a payment method
   - Add credits (minimum $5 recommended)

### Option 2: Anthropic (Claude)

**Cost:** Pay-as-you-go, ~$0.003 per form fill with Claude 3.5 Haiku

1. **Go to Anthropic Console**
   - Visit: https://console.anthropic.com/settings/keys
   - Sign up or log in

2. **Create API Key**
   - Click "Create Key"
   - Give it a name: "Reply4Me"
   - Click "Create"

3. **Copy the Key**
   - Copy the key (starts with `sk-ant-`)
   - Store it securely

   **Example key format:**
   ```
   sk-ant-api03-AbCdEfGhIjKlMnOpQrStUvWxYz1234567890
   ```

4. **Add Payment Method**
   - Go to: https://console.anthropic.com/settings/billing
   - Add payment method
   - Add credits

### Option 3: Google Gemini

**Cost:** Free tier available (60 requests/minute)

1. **Go to Google AI Studio**
   - Visit: https://makersuite.google.com/app/apikey
   - Sign in with your Google account

2. **Create API Key**
   - Click "Create API Key"
   - Select or create a Google Cloud project
   - Click "Create API key in existing project"

3. **Copy the Key**
   - Copy the key (39 characters)
   - Store it securely

   **Example key format:**
   ```
   AIzaSyAbCdEfGhIjKlMnOpQrStUvWxYz12345678
   ```

4. **Enable the API** (if needed)
   - Follow any prompts to enable the Generative Language API

---

## Configuring API Keys

### Step 8: Open Extension Settings

There are three ways to access settings:

**Method 1: From the Extension Icon**
1. Click the Reply4Me icon in Chrome toolbar
2. Click the "Settings" button at the bottom

**Method 2: From Chrome Extensions Page**
1. Go to `chrome://extensions/`
2. Find "Reply4Me"
3. Click "Details"
4. Click "Extension options"

**Method 3: Direct Right-Click**
1. Right-click the Reply4Me icon
2. Click "Options"

### Step 9: Configure Your API Key

The settings page has three tabs (one for each provider).

#### For OpenAI:

1. **Select the "OpenAI" tab** (should be selected by default)

2. **You'll see:**
   - Heading: "OpenAI API Key"
   - Link: "Get your API key from OpenAI Platform"
   - Input field (password type)

3. **Paste your API key**
   - Click in the input field
   - Paste your OpenAI key (starts with `sk-`)
   - The key will be masked (shown as dots)

4. **Verify the key**
   - Below the input, you'll see: "Current: sk-proj-••••••••••••••••••••"
   - This confirms the key is stored

5. **Click "Save Settings"**
   - A green success message appears: "Settings saved successfully!"
   - The message disappears after 3 seconds

#### For Anthropic (Claude):

1. **Click the "Anthropic" tab**
2. **Paste your Anthropic key** (starts with `sk-ant-`)
3. **Click "Save Settings"**

#### For Google Gemini:

1. **Click the "Google Gemini" tab**
2. **Paste your Gemini key** (39 characters)
3. **Click "Save Settings"**

### Step 10: Verify Configuration

1. **Close the settings page**
2. **Click the Reply4Me extension icon**
3. **Check the status:**
   - If configured correctly: "Analyze Form" button is blue and clickable
   - If not configured: Button is gray and says "Configure API Key"

4. **Select your provider and model:**
   - Provider dropdown: Choose OpenAI/Anthropic/Gemini
   - Model dropdown: Choose your preferred model
   - Settings are saved automatically

---

## Testing the Extension

### Step 11: Test on a Simple Form

Let's test the extension on a basic form:

#### Create a Test HTML File

1. **Create a file:** `test-form.html`
2. **Copy this content:**

```html
<!DOCTYPE html>
<html>
<head>
    <title>Test Form for Reply4Me</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
        }
        label {
            display: block;
            margin-top: 15px;
            font-weight: bold;
        }
        input, textarea, select {
            width: 100%;
            padding: 8px;
            margin-top: 5px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        textarea {
            min-height: 100px;
        }
    </style>
</head>
<body>
    <h1>Contact Form</h1>
    <form>
        <label for="name">Full Name:</label>
        <input type="text" id="name" name="name" required>

        <label for="email">Email Address:</label>
        <input type="email" id="email" name="email" required>

        <label for="company">Company Name:</label>
        <input type="text" id="company" name="company">

        <label for="role">Your Role:</label>
        <select id="role" name="role">
            <option value="">Select...</option>
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
            <option value="manager">Manager</option>
            <option value="other">Other</option>
        </select>

        <label for="message">Message:</label>
        <textarea id="message" name="message" placeholder="Tell us about your project..."></textarea>

        <label for="budget">Project Budget:</label>
        <input type="text" id="budget" name="budget" placeholder="e.g., $5000-$10000">
    </form>
</body>
</html>
```

3. **Open the file in Chrome:**
   - Double-click the file, or
   - Drag it into Chrome, or
   - File → Open File → select test-form.html

#### Use the Extension

1. **Click the Reply4Me icon** in the Chrome toolbar

2. **Verify your settings:**
   - Provider: (your configured provider)
   - Model: (any model is fine for testing)

3. **Click "Analyze Form"**
   - The popup closes automatically
   - You'll see a blue notification: "Analyzing form..."
   - Wait 2-5 seconds

4. **Review the Results:**
   - A modal appears with suggested answers
   - Each field shows:
     - Field label
     - Suggested answer (in a textarea)
     - "Apply" and "Copy" buttons

5. **Test the Features:**
   - **Edit an answer:** Click in the textarea and modify the text
   - **Copy:** Click "Copy" button, then paste elsewhere to verify
   - **Apply single:** Click "Apply" on one field, watch it fill
   - **Apply all:** Click "Apply All Answers" at the bottom

6. **Verify Field Filling:**
   - Check that the form fields are filled
   - Fields should flash green briefly when filled
   - Answers should match what was in the modal

### Step 12: Test on Real Websites

Try the extension on real forms:

**Good test sites:**
- Google Forms (create your own test form)
- Typeform surveys
- Contact forms on company websites
- Job application forms

**Testing tips:**
- Start with simple forms (3-5 fields)
- Try different field types (text, email, select, textarea)
- Test with different providers and models
- Check answer quality and relevance

---

## Development Workflow

### Making Changes to the Code

When developing features:

#### For TypeScript/React Changes:

1. **Edit your code** in `src/` folder
   - Use VS Code or your preferred editor
   - TypeScript will show errors as you type

2. **Rebuild the extension:**
   ```bash
   npm run build
   ```

3. **Reload in Chrome:**
   - Go to `chrome://extensions/`
   - Find Reply4Me
   - Click the refresh icon (circular arrow)
   - Or click "Update" button at the top

4. **For content script changes:**
   - Refresh the webpage you're testing on
   - The new content script loads with the page

#### Development Mode (Auto-Rebuild):

For faster development:

1. **Start watch mode:**
   ```bash
   npm run dev
   ```

2. **Make changes** to your code

3. **Vite rebuilds automatically** when you save

4. **Still need to:**
   - Refresh extension in Chrome
   - Reload test webpages

### Testing Different Scenarios

#### Test Different Form Types:

```bash
# Text inputs
- name, email, phone, address fields

# Textareas
- comments, descriptions, messages

# Select dropdowns
- country, state, category selections

# Special inputs
- date, number, URL fields
```

#### Test Error Handling:

1. **Invalid API key:**
   - Enter a fake key in settings
   - Try to analyze a form
   - Should show error message

2. **No form fields:**
   - Visit a page without forms
   - Try to analyze
   - Should show "No form fields detected"

3. **Network issues:**
   - Disconnect internet
   - Try to analyze
   - Should handle gracefully

### Debugging

#### View Console Logs:

**For Content Script:**
1. Open any webpage
2. Right-click → Inspect
3. Go to Console tab
4. Look for "Reply4Me content script loaded"

**For Popup:**
1. Click extension icon
2. Right-click inside popup → Inspect
3. Separate DevTools window opens

**For Options Page:**
1. Open options page
2. Right-click → Inspect
3. Console shows any errors

**For Background Script:**
1. Go to `chrome://extensions/`
2. Find Reply4Me
3. Click "service worker" link
4. DevTools opens for background script

#### Common Debug Commands:

In any console, try:

```javascript
// Check storage
chrome.storage.local.get('reply4me_config', console.log)

// Clear storage
chrome.storage.local.clear()

// Check if API key exists
chrome.storage.local.get('reply4me_config', (data) => {
  console.log('Has OpenAI key:', !!data.reply4me_config?.apiKeys?.openai)
})
```

---

## Troubleshooting

### Build Issues

**Problem: `npm install` fails**

```
Solution:
1. Delete node_modules/ and package-lock.json
2. Clear npm cache: npm cache clean --force
3. Try again: npm install
```

**Problem: `npm run build` fails with TypeScript errors**

```
Solution:
1. Check the error message for file and line number
2. Fix TypeScript errors in source code
3. Or run without type checking: vite build
```

**Problem: Icons not generating**

```
Solution:
1. Make sure sharp installed: npm install sharp
2. Run: npm run generate-icons
3. Check public/assets/icons/ folder exists
```

### Extension Loading Issues

**Problem: Extension doesn't appear after loading**

```
Solution:
1. Make sure you selected the dist/ folder, not root
2. Check for errors in chrome://extensions/
3. Click "Errors" button if shown
4. Rebuild: npm run build
5. Try loading again
```

**Problem: "Manifest file is invalid"**

```
Solution:
1. Check dist/manifest.json exists
2. Verify JSON syntax is valid
3. Rebuild the project
```

**Problem: Extension icon not showing**

```
Solution:
1. Run: npm run generate-icons
2. Rebuild: npm run build
3. Check dist/assets/icons/ has PNG files
4. Reload extension in Chrome
```

### API Key Issues

**Problem: "Please configure your API key"**

```
Solution:
1. Open extension settings
2. Select correct provider tab
3. Paste API key again
4. Click Save Settings
5. Check browser console for errors
```

**Problem: API errors even with valid key**

```
Solution:
1. Verify key is correct (no extra spaces)
2. Check API key has credits/quota
3. Test key with curl:

For OpenAI:
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer YOUR_KEY"

For Anthropic:
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: YOUR_KEY" \
  -H "anthropic-version: 2023-06-01"
```

**Problem: "Provider Error: 401"**

```
Solution:
- 401 means unauthorized/invalid API key
- Double-check the key in settings
- Regenerate a new key from provider
- Save the new key in settings
```

**Problem: "Provider Error: 429"**

```
Solution:
- 429 means rate limit exceeded
- Wait a few minutes
- For OpenAI: Check rate limits in dashboard
- For Gemini: Free tier has 60 req/min limit
```

### Form Detection Issues

**Problem: "No form fields detected"**

```
Solution:
1. Make sure page has input/textarea/select elements
2. Check fields are visible (not display:none)
3. Open browser console
4. Try manually:
   document.querySelectorAll('input, textarea, select')
5. Fields in iframes are not supported yet
```

**Problem: Some fields not detected**

```
Solution:
1. Check if fields are inside an iframe
2. Check if fields are dynamically loaded
3. Wait for page to fully load before analyzing
4. Some custom form libraries may not work
```

### Modal Issues

**Problem: Modal doesn't appear**

```
Solution:
1. Check browser console for errors
2. Make sure content script loaded:
   - Console should show "Reply4Me content script loaded"
3. Try refreshing the page
4. Reload extension in chrome://extensions/
```

**Problem: Can't click anything on page**

```
Solution:
1. Close the modal (X button or click outside)
2. If stuck, refresh the page
3. Check z-index isn't conflicting (unlikely)
```

### Development Issues

**Problem: Changes not reflecting**

```
Solution:
1. Rebuild: npm run build
2. Reload extension in chrome://extensions/
3. For content scripts: refresh the test webpage
4. Hard refresh: Ctrl+Shift+R (Cmd+Shift+R on Mac)
```

**Problem: TypeScript errors in VS Code**

```
Solution:
1. Install VS Code TypeScript extension
2. Open command palette: Ctrl+Shift+P
3. Type: "TypeScript: Restart TS Server"
4. Or: Run npm run type-check
```

---

## Next Steps

Now that you have the extension working:

### For Testing:
1. Test on various websites and form types
2. Try all three providers
3. Compare answer quality between models
4. Test edge cases (empty forms, dynamic forms, etc.)

### For Development:
1. Read the code in `src/` to understand architecture
2. Try making small changes (e.g., UI colors)
3. Implement new features from TODO list
4. Write unit tests

### For Production:
1. Create custom icons (replace placeholders)
2. Test thoroughly with real users
3. Optimize performance
4. Add error tracking
5. Prepare for Chrome Web Store submission

---

## Additional Resources

- **Chrome Extension Docs:** https://developer.chrome.com/docs/extensions/
- **TypeScript Handbook:** https://www.typescriptlang.org/docs/
- **React Documentation:** https://react.dev/
- **Vite Documentation:** https://vitejs.dev/
- **Tailwind CSS:** https://tailwindcss.com/docs

- **OpenAI API Docs:** https://platform.openai.com/docs/
- **Anthropic API Docs:** https://docs.anthropic.com/
- **Gemini API Docs:** https://ai.google.dev/docs

---

## Getting Help

If you're stuck:

1. **Check the Console:** Most errors show in browser console
2. **Read Error Messages:** They usually point to the problem
3. **Search Issues:** Check GitHub issues for similar problems
4. **Ask Questions:** Open a new GitHub issue with details
5. **Review Code:** Look at similar working examples in the codebase

---

**Happy coding! 🚀**

If you find issues or have improvements, please contribute back to the project!