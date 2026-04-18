import { NextResponse } from 'next/server';
import { generateDOCX } from '@/lib/docx-generator';
import { findPayment, incrementPaymentDownloadCount, getResumeById, getLatestResumeByEmail } from '@/lib/db/queries';
import { toAIResume, type AnyResume } from '@/lib/resume-adapter';

export const runtime = 'nodejs';

interface DownloadDOCXBody {
  resumeId?: string;
  email: string;
  resume?: AnyResume;
  personalInfo?: {
    name: string;
    email: string;
    phone?: string;
    location?: string;
    linkedin?: string;
  };
}

const PRO_DAYS = 30;

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => null)) as DownloadDOCXBody | null;
    if (!body) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const { email } = body;
    let { resumeId, resume, personalInfo } = body;
    if (!email) {
      return NextResponse.json({ error: 'email required' }, { status: 400 });
    }

    if (!resume || !personalInfo) {
      const dbRow = resumeId ? await getResumeById(resumeId) : await getLatestResumeByEmail(email);
      if (dbRow) {
        resumeId = dbRow.id;
        resume = resume ?? (dbRow.generatedResume as AnyResume);
        personalInfo = personalInfo ?? (dbRow.personalInfo as typeof personalInfo);
      }
    }

    if (!resumeId || !resume || !personalInfo) {
      return NextResponse.json(
        { error: 'resume data not found for this email' },
        { status: 404 }
      );
    }

    const payment = (await findPayment({ email, resumeId, plan: 'pro' }))
      ?? (await findPayment({ email, plan: 'pro' }));
    if (!payment) {
      return NextResponse.json(
        {
          error: 'pro_required',
          message: 'DOCX download requires Pro plan. Upgrade for unlimited PDF + DOCX.',
        },
        { status: 403 }
      );
    }

    const expiresAt = new Date(payment.createdAt.getTime() + PRO_DAYS * 24 * 60 * 60 * 1000);
    if (Date.now() > expiresAt.getTime()) {
      return NextResponse.json(
        { error: 'expired', message: 'Pro access expired (30 days).' },
        { status: 403 }
      );
    }

    const aiResume = toAIResume(resume);
    const docxBuffer = await generateDOCX(aiResume, personalInfo);

    await incrementPaymentDownloadCount(payment.id);

    return new Response(new Uint8Array(docxBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="resume-${resumeId}.docx"`,
        'Content-Length': String(docxBuffer.length),
      },
    });
  } catch (error) {
    console.error('DOCX generation error:', error);
    return NextResponse.json({ error: 'Failed to generate DOCX' }, { status: 500 });
  }
}
