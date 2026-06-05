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
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    throw new ResumeGenerationError(
      'GEMINI_API_KEY is not configured',
      'CONFIG_ERROR',
      500
    );
  }

  const prompt = buildResumePrompt(data);

  try {
    // Gemini 2.5 Flash (6/5 Anthropic 크레딧 소진 → 전환). gemini-2.0-flash는 프로젝트 무료쿼터 0이라 2.5.
    // thinkingBudget:0 = 추론 토큰이 출력 잡아먹어 JSON truncate되는 것 방지. responseMimeType=json. raw fetch(SDK 무관).
    const gemRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: 'application/json',
            maxOutputTokens: 8192,
            temperature: 0.4,
            thinkingConfig: { thinkingBudget: 0 },
          },
        }),
        signal,
      }
    );

    if (!gemRes.ok) {
      if (gemRes.status === 429) {
        throw new ResumeGenerationError(
          'AI service rate limit exceeded. Please try again in a moment.',
          'RATE_LIMIT',
          429
        );
      }
      throw new ResumeGenerationError(
        `AI service error: ${(await gemRes.text()).slice(0, 200)}`,
        'API_ERROR',
        gemRes.status || 500
      );
    }

    const gemData = (await gemRes.json()) as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    };
    const text = gemData.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      throw new ResumeGenerationError(
        'No text content in API response',
        'API_ERROR',
        500
      );
    }

    // Extract JSON (responseMimeType=json이라 보통 순수 JSON, 안전망으로 펜스 제거 유지)
    let jsonStr = text.trim();
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

    // Gemini HTTP 에러(429 등)는 위 fetch 블록에서 ResumeGenerationError로 변환됨(여기 도달 X).
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
