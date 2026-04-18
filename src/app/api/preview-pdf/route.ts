import { NextResponse } from 'next/server';
import { generatePDF } from '@/lib/pdf-generator';
import { rateLimit, getClientIP } from '@/lib/rate-limit';
import { toAIResume, type AnyResume } from '@/lib/resume-adapter';
import { incrementStat } from '@/lib/db/queries';

export const runtime = 'nodejs';

interface PreviewBody {
  resume: AnyResume;
  personalInfo: {
    name: string;
    email: string;
    phone?: string;
    location?: string;
    linkedin?: string;
  };
  template?: string;
}

export async function POST(request: Request) {
  try {
    const ip = getClientIP(request);
    const rl = await rateLimit('preview', ip, 3, 3600);
    if (!rl.success) {
      return NextResponse.json(
        { error: 'Preview limit reached. Purchase to download unlimited.' },
        { status: 429 }
      );
    }

    const body = (await request.json().catch(() => null)) as PreviewBody | null;
    if (!body?.resume || !body?.personalInfo) {
      return NextResponse.json({ error: 'resume and personalInfo required' }, { status: 400 });
    }

    const aiResume = toAIResume(body.resume);
    const pdfBuffer = await generatePDF(aiResume, body.personalInfo, body.template || 'classic', true);

    try { await incrementStat('preview_downloads'); } catch {}

    return new Response(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="resume-preview.pdf"',
        'Content-Length': String(pdfBuffer.length),
      },
    });
  } catch (error) {
    console.error('Preview PDF error:', error);
    return NextResponse.json({ error: 'Failed to generate preview' }, { status: 500 });
  }
}
