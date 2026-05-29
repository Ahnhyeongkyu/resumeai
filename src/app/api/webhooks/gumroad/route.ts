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

    // Shared Gumroad account: the account-level Ping delivers ALL sales here,
    // including other services on the same account (e.g. trustfolio). Those sales
    // carry a `workspace_id` passthrough that resumeai checkouts never set, and
    // are handled by that service's own webhook. Ignore them so a trustfolio
    // buyer never receives a spurious resumeai Pro account.
    if (parseUrlParam(data, 'workspace_id')) {
      return NextResponse.json({ received: true, ignored: 'foreign-product' });
    }

    const saleId = data.sale_id;
    const email = data.email;
    const permalink = data.permalink;
    const resumeId = parseUrlParam(data, 'resume_id');
    const planFromParam = parseUrlParam(data, 'plan');
    const variantFromParam = parseUrlParam(data, 'variant');

    if (!saleId || !email || !permalink) {
      return NextResponse.json({ error: 'missing_fields' }, { status: 400 });
    }

    const proControl = process.env.GUMROAD_PRO_PERMALINK?.trim();
    const proTreatment = process.env.GUMROAD_PRO_TREATMENT_PERMALINK?.trim();

    let plan: 'basic' | 'pro';
    if (planFromParam === 'pro' || planFromParam === 'basic') {
      plan = planFromParam;
    } else if (
      permalink === proControl ||
      (proTreatment && permalink === proTreatment)
    ) {
      plan = 'pro';
    } else {
      plan = 'basic';
    }

    const variant: 'control' | 'treatment' =
      variantFromParam === 'treatment' ? 'treatment' : 'control';

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
      // CMP-38 pricing-2x experiment: per-variant purchase counter so we can
      // sanity-check PostHog conversion data against ground truth.
      plan === 'pro'
        ? incrementStat(`purchases_pro_${variant}`)
        : Promise.resolve(),
    ]);

    return NextResponse.json({ received: true, paymentId: payment.id });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'webhook_failed' }, { status: 500 });
  }
}
