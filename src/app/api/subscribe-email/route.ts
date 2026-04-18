import { NextResponse } from 'next/server';
import { subscribeEmailSchema } from '@/lib/validations';
import { subscribeEmail } from '@/lib/db/queries';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const parsed = subscribeEmailSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { email, source } = parsed.data;
    await subscribeEmail({ email, source: source ?? null });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Subscribe email error:', error);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
