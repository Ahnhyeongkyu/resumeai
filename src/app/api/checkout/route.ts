import { NextResponse } from 'next/server';
import { buildCheckoutUrl } from '@/lib/gumroad';
import { checkoutSchema } from '@/lib/validations';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { error: 'Invalid JSON body' },
        { status: 400 }
      );
    }

    const result = checkoutSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'validation_error', details: result.error.issues },
        { status: 400 }
      );
    }

    const { resumeId, email, plan, variant } = result.data;
    const origin =
      request.headers.get('origin') ||
      process.env.NEXT_PUBLIC_BASE_URL ||
      process.env.NEXT_PUBLIC_URL ||
      'http://localhost:3000';
    // pricing-2x A/B test (CMP-38): variant only matters for the pro plan.
    const effectiveVariant = plan === 'pro' && variant === 'treatment'
      ? 'treatment'
      : 'control';
    const successUrl = `${origin}/builder?success=true&plan=${plan}&variant=${effectiveVariant}&resumeId=${resumeId}`;
    const url = buildCheckoutUrl(plan, email, resumeId, successUrl, effectiveVariant);
    return NextResponse.json({ url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'checkout_failed', message: (error as Error).message },
      { status: 500 }
    );
  }
}
