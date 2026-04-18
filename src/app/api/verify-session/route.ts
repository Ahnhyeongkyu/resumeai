import { NextResponse } from 'next/server';
import { findPayment } from '@/lib/db/queries';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const { resumeId, email, plan } = body as { resumeId?: string; email?: string; plan?: 'basic' | 'pro' };
    if (!email || !plan || (plan !== 'basic' && plan !== 'pro')) {
      return NextResponse.json({ error: 'missing_params' }, { status: 400 });
    }

    const payment = await findPayment({ email, resumeId, plan });

    if (!payment) {
      return NextResponse.json(
        { verified: false, retryAfter: 3000, message: 'Payment processing. Retry shortly.' },
        { status: 402 }
      );
    }

    return NextResponse.json({
      verified: true,
      plan: payment.plan,
      resumeId: payment.resumeId,
      email: payment.userEmail,
      paymentId: payment.id,
      createdAt: payment.createdAt,
    });
  } catch (error) {
    console.error('Verify session error:', error);
    return NextResponse.json({ error: 'verification_failed' }, { status: 500 });
  }
}
