import React, { useState } from 'react';
import { FormAnswer } from '../lib/types';
import { fillField } from './form-detector';

interface ModalProps {
  answers: FormAnswer[];
  onClose: () => void;
  onApply: (fieldId: string, answer: string) => void;
}

export const AnswerModal: React.FC<ModalProps> = ({ answers, onClose, onApply }) => {
  const [editedAnswers, setEditedAnswers] = useState<Record<string, string>>(
    Object.fromEntries(answers.map(a => [a.fieldId, a.answer]))
  );

  const handleEdit = (fieldId: string, newAnswer: string) => {
    setEditedAnswers(prev => ({ ...prev, [fieldId]: newAnswer }));
  };

  const handleApplySingle = (fieldId: string) => {
    const answer = editedAnswers[fieldId];
    if (answer) {
      onApply(fieldId, answer);
    }
  };

  const handleApplyAll = () => {
    Object.entries(editedAnswers).forEach(([fieldId, answer]) => {
      onApply(fieldId, answer);
    });
    onClose();
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div
      className="reply4me-modal-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999999,
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
      onClick={onClose}
    >
      <div
        className="reply4me-modal-content"
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          maxWidth: '600px',
          width: '90%',
          maxHeight: '80vh',
          overflow: 'auto',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '600', color: '#111827' }}>
            Suggested Answers
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#6b7280',
              padding: '4px',
            }}
          >
            ×
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {answers.map((answer) => {
            const field = document.getElementById(answer.fieldId);
            const label = field?.getAttribute('aria-label') ||
                         field?.closest('label')?.textContent?.trim() ||
                         'Field ' + answer.fieldId;

            return (
              <div
                key={answer.fieldId}
                style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '16px',
                  backgroundColor: '#f9fafb',
                }}
              >
                <div style={{ fontWeight: '500', marginBottom: '8px', color: '#374151', fontSize: '14px' }}>
                  {label}
                </div>
                <textarea
                  value={editedAnswers[answer.fieldId]}
                  onChange={(e) => handleEdit(answer.fieldId, e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    minHeight: '60px',
                    marginBottom: '8px',
                  }}
                />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleApplySingle(answer.fieldId)}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '13px',
                      cursor: 'pointer',
                      fontWeight: '500',
                    }}
                  >
                    Apply
                  </button>
                  <button
                    onClick={() => handleCopy(editedAnswers[answer.fieldId])}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: 'white',
                      color: '#374151',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '13px',
                      cursor: 'pointer',
                      fontWeight: '500',
                    }}
                  >
                    Copy
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              backgroundColor: 'white',
              color: '#374151',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer',
              fontWeight: '500',
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleApplyAll}
            style={{
              padding: '10px 20px',
              backgroundColor: '#059669',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer',
              fontWeight: '500',
            }}
          >
            Apply All Answers
          </button>
        </div>
      </div>
    </div>
  );
};
