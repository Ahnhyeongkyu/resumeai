import { NextResponse } from 'next/server';
import { generatePDF } from '@/lib/pdf-generator';
import { findPayment, incrementPaymentDownloadCount, getResumeById, getLatestResumeByEmail } from '@/lib/db/queries';
import { toAIResume, type AnyResume } from '@/lib/resume-adapter';

export const runtime = 'nodejs';

interface DownloadPDFBody {
  resumeId?: string;
  email: string;
  template?: string;
  resume?: AnyResume;
  personalInfo?: {
    name: string;
    email: string;
    phone?: string;
    location?: string;
    linkedin?: string;
  };
}

const BASIC_LIMIT = 1;
const PRO_DAYS = 30;

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => null)) as DownloadPDFBody | null;
    if (!body) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const { email, template } = body;
    let { resumeId, resume, personalInfo } = body;
    if (!email) {
      return NextResponse.json({ error: 'email required' }, { status: 400 });
    }

    if ((!resume || !personalInfo) && (resumeId || email)) {
      const dbRow = resumeId ? await getResumeById(resumeId) : await getLatestResumeByEmail(email);
      if (dbRow) {
        resumeId = dbRow.id;
        resume = resume ?? (dbRow.generatedResume as AnyResume);
        personalInfo = personalInfo ?? (dbRow.personalInfo as typeof personalInfo);
      }
    }

    if (!resumeId || !resume || !personalInfo) {
      return NextResponse.json(
        { error: 'resume data not found for this email; contact support' },
        { status: 404 }
      );
    }

    const proPayment = await findPayment({ email, resumeId, plan: 'pro' });
    const basicPayment = !proPayment ? await findPayment({ email, resumeId, plan: 'basic' }) : null;
    const emailOnlyPayment = !proPayment && !basicPayment
      ? (await findPayment({ email, plan: 'pro' }) ?? await findPayment({ email, plan: 'basic' }))
      : null;
    const payment = proPayment ?? basicPayment ?? emailOnlyPayment;

    if (!payment) {
      return NextResponse.json(
        { error: 'payment_required', message: 'No active payment found for this resume.' },
        { status: 401 }
      );
    }

    if (payment.plan === 'basic' && payment.downloadCount >= BASIC_LIMIT) {
      return NextResponse.json(
        { error: 'limit_reached', message: 'Basic plan allows 1 download. Upgrade to Pro for unlimited.' },
        { status: 403 }
      );
    }

    if (payment.plan === 'pro') {
      const expiresAt = new Date(payment.createdAt.getTime() + PRO_DAYS * 24 * 60 * 60 * 1000);
      if (Date.now() > expiresAt.getTime()) {
        return NextResponse.json(
          { error: 'expired', message: 'Pro access expired (30 days). Re-purchase to continue.' },
          { status: 403 }
        );
      }
    }

    const aiResume = toAIResume(resume);
    const pdfBuffer = await generatePDF(aiResume, personalInfo, template || 'classic', false);

    await incrementPaymentDownloadCount(payment.id);

    return new Response(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="resume-${resumeId}.pdf"`,
        'Content-Length': String(pdfBuffer.length),
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}
