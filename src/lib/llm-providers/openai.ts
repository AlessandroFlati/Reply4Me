import { LLMProvider, LLMError } from './base';
import { LLMRequest, LLMResponse, FormAnswer } from '../types';

export class OpenAIProvider implements LLMProvider {
  private readonly baseUrl = 'https://api.openai.com/v1';

  async generateAnswers(request: LLMRequest, apiKey: string, model: string): Promise<LLMResponse> {
    const prompt = this.buildPrompt(request);

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant that fills out form fields. Respond ONLY with valid JSON containing an array of answers. Each answer should have a "fieldId" and "answer" field.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
          response_format: { type: 'json_object' },
        }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: { message: 'Unknown error' } }));
        throw new LLMError(
          error.error?.message || 'OpenAI API request failed',
          'openai',
          response.status
        );
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;

      if (!content) {
        throw new LLMError('No response from OpenAI', 'openai');
      }

      const parsed = JSON.parse(content);
      const answers: FormAnswer[] = parsed.answers || [];

      return {
        answers,
        model,
        provider: 'openai',
      };
    } catch (error) {
      if (error instanceof LLMError) {
        throw error;
      }
      throw new LLMError(
        error instanceof Error ? error.message : 'Unknown error',
        'openai'
      );
    }
  }

  validateApiKey(apiKey: string): boolean {
    return apiKey.startsWith('sk-') && apiKey.length > 20;
  }

  private buildPrompt(request: LLMRequest): string {
    let prompt = 'Please provide answers for the following form fields:\n\n';

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

    prompt += '\nRespond with a JSON object containing an "answers" array. Each answer should have:\n';
    prompt += '- fieldId: the field ID from above\n';
    prompt += '- answer: your suggested answer\n';
    prompt += '\nExample: {"answers": [{"fieldId": "field1", "answer": "Example answer"}]}';

    return prompt;
  }
}
