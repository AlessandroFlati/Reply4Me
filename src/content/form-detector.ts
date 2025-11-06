import { FormField, FormQuestion } from '../lib/types';

/**
 * Detect all fillable form fields on the page
 */
export function detectFormFields(): FormField[] {
  const fields: FormField[] = [];
  const selectors = 'input:not([type="submit"]):not([type="button"]):not([type="hidden"]), textarea, select';
  const elements = document.querySelectorAll(selectors);

  elements.forEach((element, index) => {
    const el = element as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

    // Skip if element is not visible
    if (!isVisible(el)) return;

    const label = findLabelForElement(el);
    const id = el.id || `reply4me-field-${index}`;

    // Set ID if not present for tracking
    if (!el.id) {
      el.id = id;
    }

    fields.push({
      element: el,
      label: label || el.name || el.placeholder || 'Unlabeled field',
      type: el.type || el.tagName.toLowerCase(),
      id,
      name: el.name,
      placeholder: el.placeholder,
      required: el.required,
    });
  });

  return fields;
}

/**
 * Convert form fields to questions for LLM
 */
export function fieldsToQuestions(fields: FormField[]): FormQuestion[] {
  return fields.map(field => {
    let question = field.label;

    // Enhance question with additional context
    if (field.placeholder && field.placeholder !== field.label) {
      question += ` (${field.placeholder})`;
    }

    // Get surrounding text for context
    const context = getFieldContext(field.element);

    return {
      question,
      fieldId: field.id,
      fieldType: field.type,
      context,
    };
  });
}

/**
 * Get page context for better LLM understanding
 */
export function getPageContext(): string {
  // Get page title
  const title = document.title;

  // Get main heading
  const h1 = document.querySelector('h1')?.textContent?.trim() || '';

  // Get meta description
  const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';

  return `Title: ${title}${h1 ? `\nHeading: ${h1}` : ''}${metaDescription ? `\nDescription: ${metaDescription}` : ''}`;
}

/**
 * Find the label associated with a form element
 */
function findLabelForElement(element: HTMLElement): string {
  // Method 1: Label with 'for' attribute
  if (element.id) {
    const label = document.querySelector(`label[for="${element.id}"]`);
    if (label?.textContent) {
      return cleanText(label.textContent);
    }
  }

  // Method 2: Parent label
  const parentLabel = element.closest('label');
  if (parentLabel?.textContent) {
    return cleanText(parentLabel.textContent);
  }

  // Method 3: Previous sibling label
  let sibling = element.previousElementSibling;
  while (sibling) {
    if (sibling.tagName === 'LABEL' && sibling.textContent) {
      return cleanText(sibling.textContent);
    }
    sibling = sibling.previousElementSibling;
  }

  // Method 4: aria-label or aria-labelledby
  const ariaLabel = element.getAttribute('aria-label');
  if (ariaLabel) return cleanText(ariaLabel);

  const ariaLabelledBy = element.getAttribute('aria-labelledby');
  if (ariaLabelledBy) {
    const labelElement = document.getElementById(ariaLabelledBy);
    if (labelElement?.textContent) {
      return cleanText(labelElement.textContent);
    }
  }

  // Method 5: Look for nearby text content
  const parent = element.parentElement;
  if (parent) {
    // Clone the parent to manipulate
    const clone = parent.cloneNode(true) as HTMLElement;
    // Remove the input itself
    const inputs = clone.querySelectorAll('input, textarea, select');
    inputs.forEach(input => input.remove());

    const text = clone.textContent?.trim();
    if (text && text.length < 100) {
      return cleanText(text);
    }
  }

  return '';
}

/**
 * Get contextual text around the field
 */
function getFieldContext(element: HTMLElement): string {
  const contexts: string[] = [];

  // Get text from parent containers
  let parent = element.parentElement;
  let depth = 0;

  while (parent && depth < 3) {
    // Look for descriptive elements
    const description = parent.querySelector('.description, .help-text, .hint, small');
    if (description?.textContent) {
      contexts.push(cleanText(description.textContent));
    }

    parent = parent.parentElement;
    depth++;
  }

  return contexts.join(' | ');
}

/**
 * Clean and normalize text
 */
function cleanText(text: string): string {
  return text
    .replace(/\s+/g, ' ')
    .replace(/[*:]/g, '')
    .trim();
}

/**
 * Check if element is visible
 */
function isVisible(element: HTMLElement): boolean {
  const style = window.getComputedStyle(element);
  return style.display !== 'none' &&
         style.visibility !== 'hidden' &&
         style.opacity !== '0' &&
         element.offsetWidth > 0 &&
         element.offsetHeight > 0;
}

/**
 * Fill a field with an answer
 */
export function fillField(fieldId: string, answer: string): boolean {
  const element = document.getElementById(fieldId) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

  if (!element) return false;

  try {
    if (element.tagName === 'SELECT') {
      const select = element as HTMLSelectElement;
      // Try to find matching option
      const options = Array.from(select.options);
      const match = options.find(opt =>
        opt.value.toLowerCase() === answer.toLowerCase() ||
        opt.textContent?.toLowerCase() === answer.toLowerCase()
      );

      if (match) {
        select.value = match.value;
      } else {
        select.value = answer;
      }
    } else {
      element.value = answer;
    }

    // Trigger change event
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));

    return true;
  } catch (error) {
    console.error('Error filling field:', error);
    return false;
  }
}
