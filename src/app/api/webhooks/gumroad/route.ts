import { NextResponse } from 'next/server';
import { verifyGumroadWebhook } from '@/lib/gumroad';
import { upsertUser, recordPayment, markResumeDownloaded, incrementStat } from '@/lib/db/queries';

export const runtime = 'nodejs';

// 측정 통일/멀티서비스 라우팅 (5/31): Gumroad 계정 Ping은 1개(여기, getresumeai.site)뿐.
// 한 계정의 모든 제품 판매가 여기로 옴 → product permalink prefix로 서비스 분기:
//   resumeai-*  → 로컬 권한부여(아래 기존 로직)
//   trustfolio-* → trustfolio.dev 웹훅으로 raw 포워딩(권한)
//   timebox-*    → api.timebox.ai.kr 웹훅으로 raw 포워딩(권한)
// + 모든 서비스 paid_conversion을 PostHog 443488로 중앙 발화(통합 측정).
const FORWARD_TARGETS: Record<string, string> = {
  trustfolio: 'https://trustfolio.dev/api/webhooks/gumroad',
  timebox: 'https://api.timebox.ai.kr/api/webhooks/gumroad',
};

function serviceFromPermalink(permalink: string): 'resumeai' | 'trustfolio' | 'timebox' {
  const p = (permalink || '').toLowerCase();
  if (p.startsWith('trustfolio')) return 'trustfolio';
  if (p.startsWith('timebox')) return 'timebox';
  return 'resumeai';
}

function parsePrice(priceStr: string | undefined): number {
  if (!priceStr) return 0;
  const n = parseInt(priceStr, 10);
  return Number.isFinite(n) ? n : 0;
}

function parseUrlParam(data: Record<string, string>, key: string): string | undefined {
  return data[`url_params[${key}]`] ?? data[key];
}

// PostHog 443488 중앙 paid_conversion (전 서비스 통합 측정). 공개키(NEXT_PUBLIC_POSTHOG_KEY).
async function firePaidConversion(service: string, data: Record<string, string>): Promise<void> {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return;
  const host = (process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com').replace(/\/$/, '');
  const source = parseUrlParam(data, 'source') || parseUrlParam(data, 'utm_source') || 'direct';
  try {
    await fetch(`${host}/i/v0/e/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: key,
        event: 'paid_conversion',
        distinct_id: data.sale_id || data.email || `gr-${Date.now()}`,
        properties: {
          saas: service,
          source,
          amount: parsePrice(data.price) / 100,
          currency: (data.currency || 'usd').toLowerCase(),
          product: data.permalink || data.product_permalink || '',
          $lib: 'gumroad-router',
        },
      }),
    });
  } catch {
    /* 측정 실패는 권한부여를 막지 않음 */
  }
}

export async function POST(request: Request) {
  try {
    // raw body 보존(포워딩용) + 파싱
    const rawBody = await request.text();
    const params = new URLSearchParams(rawBody);
    const data: Record<string, string> = {};
    params.forEach((value, key) => {
      data[key] = value;
    });

    if (!verifyGumroadWebhook(data.seller_id)) {
      console.warn('Gumroad webhook: invalid seller_id', data.seller_id);
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }

    const permalink = data.permalink || data.product_permalink || '';
    const service = serviceFromPermalink(permalink);

    // === 라우팅: 타 서비스 제품은 해당 도메인 웹훅으로 포워딩(권한) + PostHog 중앙 측정 ===
    if (service !== 'resumeai') {
      const target = FORWARD_TARGETS[service];
      let forwardStatus = 0;
      try {
        const fwd = await fetch(target, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: rawBody,
        });
        forwardStatus = fwd.status;
      } catch (e) {
        console.error(`[gumroad-router] forward to ${service} failed`, e);
        // 포워딩 실패 → 502 반환(Gumroad 재시도). PostHog는 성공 시에만 발화(중복 방지).
        return NextResponse.json({ error: 'forward_failed', service }, { status: 502 });
      }
      if (forwardStatus >= 200 && forwardStatus < 300) {
        await firePaidConversion(service, data);
        return NextResponse.json({ received: true, routed: service, forward_status: forwardStatus });
      }
      // 타깃이 비2xx(예: 중복 401/duplicate) → 측정만 시도하고 그 상태 그대로 반영
      return NextResponse.json({ received: true, routed: service, forward_status: forwardStatus }, { status: forwardStatus === 401 ? 200 : forwardStatus });
    }

    // === resumeai 제품: 로컬 권한부여(기존 로직) ===
    const saleId = data.sale_id;
    const email = data.email;
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
    } else if (permalink === proControl || (proTreatment && permalink === proTreatment) || permalink.toLowerCase().includes('pro')) {
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
      plan === 'pro'
        ? incrementStat(`purchases_pro_${variant}`)
        : Promise.resolve(),
    ]);

    await firePaidConversion('resumeai', data);

    return NextResponse.json({ received: true, paymentId: payment.id });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'webhook_failed' }, { status: 500 });
  }
}
