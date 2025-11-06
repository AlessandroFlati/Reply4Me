import { LLMProvider, LLMError } from './base';
import { LLMRequest, LLMResponse, FormAnswer } from '../types';

export class GeminiProvider implements LLMProvider {
  private readonly baseUrl = 'https://generativelanguage.googleapis.com/v1beta';

  async generateAnswers(request: LLMRequest, apiKey: string, model: string): Promise<LLMResponse> {
    const prompt = this.buildPrompt(request);

    try {
      const response = await fetch(
        `${this.baseUrl}/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 2048,
            },
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: { message: 'Unknown error' } }));
        throw new LLMError(
          error.error?.message || 'Gemini API request failed',
          'gemini',
          response.status
        );
      }

      const data = await response.json();
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!content) {
        throw new LLMError('No response from Gemini', 'gemini');
      }

      // Extract JSON from markdown code blocks if present
      const jsonMatch = content.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/) || content.match(/(\{[\s\S]*\})/);
      const jsonStr = jsonMatch ? jsonMatch[1] : content;

      const parsed = JSON.parse(jsonStr);
      const answers: FormAnswer[] = parsed.answers || [];

      return {
        answers,
        model,
        provider: 'gemini',
      };
    } catch (error) {
      if (error instanceof LLMError) {
        throw error;
      }
      throw new LLMError(
        error instanceof Error ? error.message : 'Unknown error',
        'gemini'
      );
    }
  }

  validateApiKey(apiKey: string): boolean {
    // Gemini API keys are typically 39 characters
    return apiKey.length >= 30;
  }

  private buildPrompt(request: LLMRequest): string {
    let prompt = 'Please provide answers for the following form fields.\n\n';

    if (request.pageContext) {
      prompt += `Page context: ${request.pageContext}\n\n`;
    }

    prompt += 'Questions:\n';
    request.questions.forEach((q, index) => {
      prompt += `${index + 1}. Field ID: ${q.fieldId}\n`;
      prompt += `   Question: ${q.question}\n`;
      prompt += `   Type: ${q.fieldType}\n`;
      if (q.context) {
        prompt += `   Context: ${q.context}\n`;
      }
      prompt += '\n';
    });

    prompt += '\nRespond with ONLY a JSON object containing an "answers" array. Each answer should have:\n';
    prompt += '- fieldId: the field ID from above\n';
    prompt += '- answer: your suggested answer\n';
    prompt += '\nExample: {"answers": [{"fieldId": "field1", "answer": "Example answer"}]}';

    return prompt;
  }
}
