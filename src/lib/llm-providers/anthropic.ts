import { LLMProvider, LLMError } from './base';
import { LLMRequest, LLMResponse, FormAnswer } from '../types';

export class AnthropicProvider implements LLMProvider {
  private readonly baseUrl = 'https://api.anthropic.com/v1';

  async generateAnswers(request: LLMRequest, apiKey: string, model: string): Promise<LLMResponse> {
    const prompt = this.buildPrompt(request);

    try {
      const response = await fetch(`${this.baseUrl}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model,
          max_tokens: 4096,
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
        }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: { message: 'Unknown error' } }));
        throw new LLMError(
          error.error?.message || 'Anthropic API request failed',
          'anthropic',
          response.status
        );
      }

      const data = await response.json();
      const content = data.content[0]?.text;

      if (!content) {
        throw new LLMError('No response from Anthropic', 'anthropic');
      }

      // Extract JSON from markdown code blocks if present
      const jsonMatch = content.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/) || content.match(/(\{[\s\S]*\})/);
      const jsonStr = jsonMatch ? jsonMatch[1] : content;

      const parsed = JSON.parse(jsonStr);
      const answers: FormAnswer[] = parsed.answers || [];

      return {
        answers,
        model,
        provider: 'anthropic',
      };
    } catch (error) {
      if (error instanceof LLMError) {
        throw error;
      }
      throw new LLMError(
        error instanceof Error ? error.message : 'Unknown error',
        'anthropic'
      );
    }
  }

  validateApiKey(apiKey: string): boolean {
    return apiKey.startsWith('sk-ant-') && apiKey.length > 20;
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

    prompt += '\nRespond with ONLY a JSON object (no markdown, no explanation) containing an "answers" array. Each answer should have:\n';
    prompt += '- fieldId: the field ID from above\n';
    prompt += '- answer: your suggested answer\n';
    prompt += '\nExample: {"answers": [{"fieldId": "field1", "answer": "Example answer"}]}';

    return prompt;
  }
}
