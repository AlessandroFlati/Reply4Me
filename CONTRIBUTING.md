# Contributing to Reply4Me

Thank you for your interest in contributing to Reply4Me! This document provides guidelines and instructions for contributing.

## Code of Conduct

Be respectful and constructive in all interactions. We're here to build something useful together.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in Issues
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Browser version and OS

### Suggesting Features

1. Check if the feature has already been suggested
2. Create a new issue with:
   - Clear description of the feature
   - Use case / motivation
   - Proposed implementation (if you have ideas)

### Pull Requests

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Test thoroughly
5. Commit with clear messages
6. Push to your fork
7. Create a Pull Request

## Development Setup

See [SETUP.md](SETUP.md) for detailed setup instructions.

Quick start:
```bash
git clone https://github.com/AlessandroFlati/Reply4Me.git
cd Reply4Me
npm install
npm run dev
```

## Code Style

- Use TypeScript for all new code
- Follow existing code formatting
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

## Testing

Before submitting a PR:
1. Test the extension with all three providers (OpenAI, Anthropic, Gemini)
2. Test on various types of forms
3. Run type checking: `npm run type-check`
4. Ensure the extension builds: `npm run build`

## Project Structure

```
src/
├── background/       # Service worker
├── content/          # Content scripts
├── popup/            # Extension popup
├── options/          # Settings page
├── lib/              # Shared utilities
│   ├── llm-providers/  # Provider implementations
│   ├── storage.ts      # Storage utilities
│   └── types.ts        # Type definitions
└── styles/           # Global styles
```

## Adding a New LLM Provider

1. Create a new file in `src/lib/llm-providers/your-provider.ts`
2. Implement the `LLMProvider` interface from `base.ts`
3. Add provider type and models to `src/lib/types.ts`
4. Register in `src/lib/llm-providers/index.ts`
5. Update UI components (Popup.tsx, Options.tsx)
6. Update documentation

Example structure:
```typescript
import { LLMProvider, LLMError } from './base';

export class YourProvider implements LLMProvider {
  async generateAnswers(request, apiKey, model) {
    // Implementation
  }

  validateApiKey(apiKey: string): boolean {
    // Validation logic
  }
}
```

## Commit Messages

Use clear, descriptive commit messages:
- `feat: Add support for new provider`
- `fix: Resolve form detection issue with dynamic fields`
- `docs: Update README with new examples`
- `refactor: Simplify modal component logic`
- `style: Format code with prettier`

## Areas for Contribution

### High Priority
- Better form field detection (handle more edge cases)
- Support for iframe forms
- Improved error handling and user feedback
- Performance optimizations
- Accessibility improvements

### New Features
- Support for additional LLM providers
- Keyboard shortcuts
- Form templates/presets
- Multi-language support
- Dark mode for extension UI

### Documentation
- Video tutorials
- More examples and use cases
- API documentation
- Troubleshooting guides

## Questions?

Feel free to open an issue with the "question" label if you need help or clarification.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
