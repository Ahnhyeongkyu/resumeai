import Anthropic from '@anthropic-ai/sdk';
import { buildResumePrompt } from './prompts';
import type { GenerateResumeInput } from '@/lib/validations';

export interface GeneratedResume {
  professionalSummary: string;
  experience: Array<{
    title: string;
    company: string;
    dates: string;
    bullets: string[];
  }>;
  skills: {
    technical: string[];
    soft: string[];
  };
  education: Array<{
    institution: string;
    degree: string;
    field?: string;
    date?: string;
  }>;
  certifications: string[];
}

export class ResumeGenerationError extends Error {
  constructor(
    message: string,
    public readonly code: 'TIMEOUT' | 'RATE_LIMIT' | 'PARSE_ERROR' | 'API_ERROR' | 'CONFIG_ERROR',
    public readonly statusCode: number
  ) {
    super(message);
    this.name = 'ResumeGenerationError';
  }
}

export async function generateResume(
  data: GenerateResumeInput,
  signal?: AbortSignal
): Promise<GeneratedResume> {
  const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
  if (!apiKey) {
    throw new ResumeGenerationError(
      'Anthropic API key is not configured',
      'CONFIG_ERROR',
      500
    );
  }

  const client = new Anthropic({ apiKey });
  const prompt = buildResumePrompt(data);

  try {
    const response = await client.messages.create(
      {
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      },
      {
        signal: signal,
      }
    );

    const textBlock = response.content.find((block) => block.type === 'text');
    if (!textBlock || textBlock.type !== 'text') {
      throw new ResumeGenerationError(
        'No text content in API response',
        'API_ERROR',
        500
      );
    }

    // Extract JSON from response (handle potential markdown fences)
    let jsonStr = textBlock.text.trim();
    const fenceMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (fenceMatch) {
      jsonStr = fenceMatch[1].trim();
    }

    let parsed: GeneratedResume;
    try {
      parsed = JSON.parse(jsonStr);
    } catch {
      throw new ResumeGenerationError(
        'Failed to parse AI response as JSON',
        'PARSE_ERROR',
        500
      );
    }

    if (
      !parsed.professionalSummary ||
      !Array.isArray(parsed.experience) ||
      !parsed.skills
    ) {
      throw new ResumeGenerationError(
        'AI response missing required fields',
        'PARSE_ERROR',
        500
      );
    }

    parsed.certifications = parsed.certifications || [];
    parsed.education = parsed.education || [];
    if (!parsed.skills.technical) parsed.skills.technical = [];
    if (!parsed.skills.soft) parsed.skills.soft = [];

    return parsed;
  } catch (error) {
    if (error instanceof ResumeGenerationError) {
      throw error;
    }

    if (error instanceof Anthropic.APIError) {
      if (error.status === 429) {
        throw new ResumeGenerationError(
          'AI service rate limit exceeded. Please try again in a moment.',
          'RATE_LIMIT',
          429
        );
      }
      if (error.status === 408 || error.status === 504) {
        throw new ResumeGenerationError(
          'AI service timed out. Please try again.',
          'TIMEOUT',
          504
        );
      }
      throw new ResumeGenerationError(
        `AI service error: ${error.message}`,
        'API_ERROR',
        error.status || 500
      );
    }

    if (signal?.aborted) {
      throw new ResumeGenerationError(
        'Request was cancelled',
        'TIMEOUT',
        504
      );
    }

    throw new ResumeGenerationError(
      'An unexpected error occurred during resume generation',
      'API_ERROR',
      500
    );
  }
}
