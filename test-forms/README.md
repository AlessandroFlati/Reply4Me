# Test Forms

This directory contains HTML test forms for developing and testing the Reply4Me extension.

## Available Test Forms

### 1. simple-form.html
**Purpose:** Basic functionality testing

**Fields:**
- Text inputs (name, company, phone, budget)
- Email input
- Select dropdowns (role, timeline)
- Textarea (message)

**Best for:**
- Initial testing after installation
- Quick functionality checks
- Demonstrating basic features

### 2. complex-form.html
**Purpose:** Comprehensive testing

**Fields:**
- Multiple sections (Personal, Professional, Position, Additional)
- Mixed field types throughout
- Required and optional fields
- Various dropdown options
- Multiple textarea fields

**Best for:**
- Testing form detection accuracy
- Evaluating answer quality across many fields
- Testing bulk operations (Apply All)
- Performance testing

## How to Use

### Method 1: Open Directly

1. Navigate to the `test-forms/` directory
2. Double-click any `.html` file
3. It opens in your default browser
4. Use Reply4Me extension to test

### Method 2: Drag and Drop

1. Open Chrome browser
2. Drag any `.html` file into Chrome window
3. File opens in a new tab
4. Test the extension

### Method 3: File URL

1. Open Chrome
2. Press `Ctrl+O` (or `Cmd+O` on Mac)
3. Select a test form file
4. Test the extension

## Testing Checklist

Use these forms to verify:

### Basic Functionality
- [ ] Extension detects all form fields
- [ ] Modal appears with suggestions
- [ ] Answers are relevant to field labels
- [ ] Can edit answers before applying
- [ ] Copy button works
- [ ] Apply button fills individual fields
- [ ] Apply All button fills all fields
- [ ] Fields highlight briefly when filled

### Provider Testing
- [ ] OpenAI provider works
- [ ] Anthropic provider works
- [ ] Gemini provider works
- [ ] Can switch between providers
- [ ] Can switch between models

### Edge Cases
- [ ] Required vs optional fields handled
- [ ] Different input types work (email, tel, url)
- [ ] Select dropdowns fill correctly
- [ ] Textareas receive paragraph-length answers
- [ ] Form with no fields shows error
- [ ] Invalid API key shows error

### UI/UX
- [ ] Modal is centered and readable
- [ ] Can scroll within modal if needed
- [ ] Close button (X) works
- [ ] Click outside modal closes it
- [ ] Extension popup is responsive
- [ ] Settings page is user-friendly

## Creating Your Own Test Forms

To create custom test forms:

1. Copy one of the existing files
2. Modify the fields as needed
3. Ensure labels are clear and descriptive
4. Include a mix of required and optional fields
5. Test with Reply4Me

### Tips for Good Test Forms

**Good field labels:**
```html
<label for="email">Email Address</label>
<input type="email" id="email" name="email">
```

**Bad field labels:**
```html
<label for="field1">Field 1</label>
<input type="text" id="field1" name="field1">
```

**Include context:**
```html
<label for="budget">Project Budget</label>
<input type="text" id="budget" placeholder="e.g., $5,000 - $10,000">
<div class="help-text">Estimated budget for the entire project</div>
```

## Real-World Testing

After testing with these forms, try:

### Suggested Real Websites
- **Google Forms:** Create your own form at forms.google.com
- **Typeform:** Public typeforms (search "typeform examples")
- **Contact Forms:** Company websites, SaaS landing pages
- **Job Applications:** LinkedIn, Indeed, company career pages
- **Surveys:** Online questionnaires and feedback forms
- **Registration Forms:** Event registrations, newsletter signups

### Testing Strategy

1. **Start simple:** Use simple-form.html first
2. **Increase complexity:** Move to complex-form.html
3. **Real forms:** Test on actual websites
4. **Different domains:** Try various form types
5. **Edge cases:** Unusual or dynamic forms

## Troubleshooting

### Form Not Detected
- Check browser console for errors
- Ensure fields have proper HTML structure
- Verify fields are visible (not `display: none`)
- Refresh page and try again

### Poor Answer Quality
- Check if field labels are descriptive
- Add placeholder text or help text
- Include page title/heading for context
- Try a different model or provider

### Modal Issues
- Refresh the page
- Reload the extension
- Check console for JavaScript errors
- Verify content script loaded

## Contributing Test Forms

Have a good test form? Contribute it!

1. Create a new HTML file in this directory
2. Follow the existing format/style
3. Document what it tests
4. Submit a pull request

Good test forms help everyone improve the extension!
