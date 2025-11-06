# 👋 Welcome to Reply4Me!

## What is this?

Reply4Me is a Chrome extension that uses AI (OpenAI, Claude, or Gemini) to automatically suggest answers for web form fields. It's perfect for quickly filling out contact forms, surveys, job applications, and more.

## ⚡ Quick Setup (5 minutes)

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Build the Extension
```bash
npm run build
```

### 3️⃣ Load in Chrome
1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top-right)
3. Click "Load unpacked"
4. Select the `dist/` folder from this project

### 4️⃣ Get an API Key
Choose one provider (you only need one):
- **OpenAI**: https://platform.openai.com/api-keys
- **Anthropic (Claude)**: https://console.anthropic.com/settings/keys
- **Google Gemini**: https://makersuite.google.com/app/apikey

### 5️⃣ Configure the Extension
1. Click the Reply4Me icon in Chrome
2. Click "Settings"
3. Paste your API key
4. Click "Save"

### 6️⃣ Test It!
1. Open `test-forms/simple-form.html` in Chrome
2. Click the Reply4Me extension icon
3. Click "Analyze Form"
4. See the magic! ✨

## 📚 Documentation

**New to this project? Start here:**
- **[DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md)** ⭐ Complete installation & setup guide

**Quick references:**
- [QUICKSTART.md](QUICKSTART.md) - Get running in 5 minutes
- [README.md](README.md) - Full project documentation
- [test-forms/](test-forms/) - HTML forms for testing

**Contributing:**
- [CONTRIBUTING.md](CONTRIBUTING.md) - How to contribute
- [SETUP.md](SETUP.md) - Development environment setup

## 🧪 Testing

We've included test forms you can use immediately:

```bash
# Open in your browser:
test-forms/simple-form.html      # Basic contact form
test-forms/complex-form.html     # Advanced job application
```

Or test on real websites:
- Google Forms (create your own)
- Contact forms on company websites
- Job application forms

## 🛠️ Development Commands

```bash
npm install          # Install dependencies
npm run build        # Build for production
npm run dev          # Build with watch mode
npm run type-check   # Check TypeScript types
npm run generate-icons # Create extension icons
```

## 🆘 Need Help?

### Common Issues

**Extension won't load?**
- Make sure you selected the `dist/` folder, not the root folder
- Try `npm run build` again

**"No form fields detected"?**
- Make sure the page has visible input fields
- Refresh the page and try again

**API errors?**
- Check your API key is correct
- Verify you have credits/quota available

**More help:** See [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md) troubleshooting section

## 🎯 What's Inside?

```
Reply4Me/
├── src/
│   ├── background/       # Service worker
│   ├── content/          # Form detection & UI
│   ├── popup/            # Extension popup
│   ├── options/          # Settings page
│   └── lib/              # LLM providers & utilities
├── test-forms/           # Test HTML forms
├── DEVELOPER_GUIDE.md    # Start here for setup!
└── [other docs]
```

## 🚀 Features

✅ Three AI providers (OpenAI, Claude, Gemini)
✅ 10+ models to choose from
✅ Secure API key storage
✅ Smart form detection
✅ Edit answers before applying
✅ Copy to clipboard
✅ Apply all at once

## 📖 Learn More

- **Architecture**: See [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)
- **Contributing**: See [CONTRIBUTING.md](CONTRIBUTING.md)
- **License**: MIT (see [LICENSE](LICENSE))

---

**Ready to build?** Run `npm install && npm run build` and see [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md) for details!

**Questions?** Open an issue on GitHub or check the developer guide.

Happy coding! 🎉
