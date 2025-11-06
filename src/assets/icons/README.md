# Icons

This directory should contain the extension icons in the following sizes:
- `icon-16.png` - 16x16 pixels (toolbar icon)
- `icon-48.png` - 48x48 pixels (extension management page)
- `icon-128.png` - 128x128 pixels (Chrome Web Store)

## Creating Icons

You can use any image editor to create these icons. They should be square PNG files with a transparent background.

### Quick Icon Generation

For development purposes, you can use online tools like:
- [Favicon.io](https://favicon.io/) - Generate icons from text or image
- [RealFaviconGenerator](https://realfavicongenerator.net/) - Comprehensive icon generator

### Design Guidelines

- Use a simple, recognizable symbol
- Ensure the icon is visible at small sizes (16x16)
- Use colors that stand out against the Chrome toolbar
- Consider using a chat bubble or form icon to represent the extension's purpose

## Temporary Solution

For now, you can create simple colored squares as placeholders using any image editor, or use the Chrome extension's default icon by removing the `icons` section from manifest.json temporarily.
