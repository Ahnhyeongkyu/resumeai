import { NextResponse } from 'next/server';
import { generateResumeSchema } from '@/lib/validations';
import { generateResume, ResumeGenerationError } from '@/lib/ai/generate';
import { scoreResume } from '@/lib/ai/ats-scorer';
import { rateLimit, getClientIP } from '@/lib/rate-limit';
import { createResume } from '@/lib/db/queries';
import { toClientResume } from '@/lib/resume-adapter';

export const runtime = 'nodejs';
export const maxDuration = 60;

interface IncomingFormData {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  careerSituation: string;
  workExperience: Array<{
    jobTitle: string;
    company: string;
    startDate: string;
    endDate: string;
    currentlyWorking: boolean;
    description?: string;
  }>;
  education?: Array<{ degree: string; school: string; year: string }>;
  skills?: string[];
}

function adaptIncoming(body: { formData?: IncomingFormData; jobDescription?: string } & Record<string, unknown>) {
  if (body.formData && body.jobDescription) {
    const f = body.formData;
    return {
      jobDescription: body.jobDescription,
      personalInfo: {
        name: f.name,
        email: f.email,
        phone: f.phone || undefined,
        location: f.location || undefined,
        linkedin: f.linkedin || undefined,
      },
      experience: f.workExperience.map((w) => ({
        title: w.jobTitle,
        company: w.company,
        startDate: w.startDate,
        endDate: w.currentlyWorking ? undefined : w.endDate || undefined,
        description: w.description || undefined,
        isCurrent: w.currentlyWorking,
      })),
      education: f.education?.map((e) => ({
        institution: e.school,
        degree: e.degree,
        graduationDate: e.year || undefined,
      })),
      skills: f.skills,
      careerSituation: f.careerSituation,
    };
  }
  return body;
}

export async function POST(request: Request) {
  try {
    const ip = getClientIP(request);
    const rl = await rateLimit('gen', ip, 10, 3600);
    if (!rl.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': String(rl.limit),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(Math.ceil(rl.reset / 1000)),
            'Retry-After': String(Math.ceil((rl.reset - Date.now()) / 1000)),
          },
        }
      );
    }

    const raw = await request.json().catch(() => null);
    if (!raw) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const adapted = adaptIncoming(raw);
    const parsed = generateResumeSchema.safeParse(adapted);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 55_000);
    let aiResume;
    try {
      aiResume = await generateResume(parsed.data, controller.signal);
    } finally {
      clearTimeout(timeout);
    }

    const atsScore = scoreResume(aiResume, parsed.data.jobDescription);
    const clientResume = toClientResume(aiResume);

    let resumeId = crypto.randomUUID();
    try {
      const row = await createResume({
        email: parsed.data.personalInfo.email,
        jobDescription: parsed.data.jobDescription,
        personalInfo: parsed.data.personalInfo,
        experience: parsed.data.experience,
        education: parsed.data.education ?? [],
        skills: parsed.data.skills ?? [],
        careerSituation: parsed.data.careerSituation,
        generatedResume: clientResume,
        atsScore,
      });
      if (row?.id) resumeId = row.id;
    } catch (e) {
      console.warn('createResume failed (continuing):', e);
    }

    return NextResponse.json(
      { resumeId, resume: clientResume, atsScore },
      {
        status: 200,
        headers: {
          'X-RateLimit-Limit': String(rl.limit),
          'X-RateLimit-Remaining': String(rl.remaining),
          'X-RateLimit-Reset': String(Math.ceil(rl.reset / 1000)),
        },
      }
    );
  } catch (error) {
    if (error instanceof ResumeGenerationError) {
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: error.statusCode }
      );
    }
    const err = error as Error;
    console.error('Generate resume error:', err?.name, err?.message, err?.stack);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
