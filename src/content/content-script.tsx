import React from 'react';
import { createRoot } from 'react-dom/client';
import { AnswerModal } from './modal';
import { detectFormFields, fieldsToQuestions, getPageContext, fillField } from './form-detector';
import { getConfig, getApiKey } from '../lib/storage';
import { getProvider, LLMError } from '../lib/llm-providers';
import { FormAnswer } from '../lib/types';

// Track if modal is currently open
let modalRoot: ReturnType<typeof createRoot> | null = null;
let modalContainer: HTMLDivElement | null = null;

/**
 * Show the answer modal
 */
function showModal(answers: FormAnswer[]) {
  // Remove existing modal if any
  hideModal();

  // Create modal container
  modalContainer = document.createElement('div');
  modalContainer.id = 'reply4me-modal-root';
  document.body.appendChild(modalContainer);

  // Create React root and render modal
  modalRoot = createRoot(modalContainer);
  modalRoot.render(
    <AnswerModal
      answers={answers}
      onClose={hideModal}
      onApply={handleApplyAnswer}
    />
  );
}

/**
 * Hide the modal
 */
function hideModal() {
  if (modalRoot && modalContainer) {
    modalRoot.unmount();
    modalContainer.remove();
    modalRoot = null;
    modalContainer = null;
  }
}

/**
 * Apply an answer to a field
 */
function handleApplyAnswer(fieldId: string, answer: string) {
  const success = fillField(fieldId, answer);
  if (success) {
    // Highlight the field briefly
    const field = document.getElementById(fieldId);
    if (field) {
      const originalBorder = field.style.border;
      field.style.border = '2px solid #10b981';
      field.style.transition = 'border 0.3s';
      setTimeout(() => {
        field.style.border = originalBorder;
      }, 1000);
    }
  }
}

/**
 * Process forms on the page
 */
async function processForms() {
  try {
    // Get configuration
    const config = await getConfig();
    const apiKey = await getApiKey(config.provider);

    if (!apiKey) {
      showError(`Please configure your ${config.provider} API key in the extension settings.`);
      return;
    }

    // Detect form fields
    const fields = detectFormFields();

    if (fields.length === 0) {
      showError('No form fields detected on this page.');
      return;
    }

    // Convert to questions
    const questions = fieldsToQuestions(fields);
    const pageContext = getPageContext();

    // Show loading indicator
    showLoading();

    // Get provider and generate answers
    const provider = getProvider(config.provider);
    const response = await provider.generateAnswers(
      { questions, pageContext },
      apiKey,
      config.model
    );

    hideLoading();

    if (response.answers.length === 0) {
      showError('No answers were generated. Please try again.');
      return;
    }

    // Show modal with answers
    showModal(response.answers);

  } catch (error) {
    hideLoading();

    if (error instanceof LLMError) {
      showError(`${error.provider} Error: ${error.message}`);
    } else {
      showError('An error occurred while processing the form. Please try again.');
    }

    console.error('Error processing forms:', error);
  }
}

/**
 * Show loading indicator
 */
function showLoading() {
  const loading = document.createElement('div');
  loading.id = 'reply4me-loading';
  loading.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #3b82f6;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 14px;
    font-weight: 500;
    z-index: 999998;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  `;
  loading.textContent = 'Analyzing form...';
  document.body.appendChild(loading);
}

/**
 * Hide loading indicator
 */
function hideLoading() {
  const loading = document.getElementById('reply4me-loading');
  if (loading) {
    loading.remove();
  }
}

/**
 * Show error message
 */
function showError(message: string) {
  const error = document.createElement('div');
  error.id = 'reply4me-error';
  error.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #ef4444;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 14px;
    font-weight: 500;
    z-index: 999998;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    max-width: 300px;
  `;
  error.textContent = message;
  document.body.appendChild(error);

  setTimeout(() => {
    error.remove();
  }, 5000);
}

// Listen for messages from background script or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'processForms') {
    processForms();
    sendResponse({ success: true });
  }
  return true;
});

// Log that content script is loaded
console.log('Reply4Me content script loaded');
