import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validations';
import { rateLimit, getClientIP } from '@/lib/rate-limit';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const ip = getClientIP(request);
    const rl = await rateLimit('contact', ip, 3, 3600);
    if (!rl.success) {
      return NextResponse.json(
        { error: 'Too many contact requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, message } = parsed.data;
    console.log('Contact form submission:', {
      name,
      email,
      message: message.substring(0, 100) + (message.length > 100 ? '...' : ''),
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to submit contact form' }, { status: 500 });
  }
}
