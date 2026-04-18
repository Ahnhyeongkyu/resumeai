import { NextResponse } from 'next/server';
import { verifyGumroadWebhook } from '@/lib/gumroad';
import { upsertUser, recordPayment, markResumeDownloaded, incrementStat } from '@/lib/db/queries';

export const runtime = 'nodejs';

function parsePrice(priceStr: string | undefined): number {
  if (!priceStr) return 0;
  const n = parseInt(priceStr, 10);
  return Number.isFinite(n) ? n : 0;
}

function parseUrlParam(data: Record<string, string>, key: string): string | undefined {
  return data[`url_params[${key}]`] ?? data[key];
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    if (!verifyGumroadWebhook(data.seller_id)) {
      console.warn('Gumroad webhook: invalid seller_id', data.seller_id);
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }

    const saleId = data.sale_id;
    const email = data.email;
    const permalink = data.permalink;
    const resumeId = parseUrlParam(data, 'resume_id');
    const planFromParam = parseUrlParam(data, 'plan');

    if (!saleId || !email || !permalink) {
      return NextResponse.json({ error: 'missing_fields' }, { status: 400 });
    }

    let plan: 'basic' | 'pro';
    if (planFromParam === 'pro' || planFromParam === 'basic') {
      plan = planFromParam;
    } else if (permalink === process.env.GUMROAD_PRO_PERMALINK) {
      plan = 'pro';
    } else {
      plan = 'basic';
    }

    const amount = parsePrice(data.price);

    const payment = await recordPayment({
      gumroadSaleId: saleId,
      gumroadPermalink: permalink,
      amount,
      currency: (data.currency || 'usd').toLowerCase(),
      status: 'completed',
      resumeId: resumeId ?? null,
      userEmail: email,
      plan,
    });

    if (!payment) {
      return NextResponse.json({ received: true, duplicate: true });
    }

    await upsertUser({ email, plan });

    if (resumeId) {
      try {
        await markResumeDownloaded(resumeId);
      } catch (e) {
        console.warn('markResumeDownloaded failed', e);
      }
    }

    await Promise.all([
      incrementStat('downloads'),
      incrementStat(`purchases_${plan}`),
      incrementStat('revenue_cents', amount),
    ]);

    return NextResponse.json({ received: true, paymentId: payment.id });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'webhook_failed' }, { status: 500 });
  }
}
