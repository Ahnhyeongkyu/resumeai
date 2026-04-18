export function getGumroadPermalink(plan: 'basic' | 'pro'): string {
  const permalink = (plan === 'basic'
    ? process.env.GUMROAD_BASIC_PERMALINK
    : process.env.GUMROAD_PRO_PERMALINK)?.trim();
  if (!permalink) throw new Error(`GUMROAD_${plan.toUpperCase()}_PERMALINK not configured`);
  return permalink;
}

export function buildCheckoutUrl(plan: 'basic' | 'pro', email: string, resumeId: string, successUrl: string): string {
  const permalink = getGumroadPermalink(plan);
  const params = new URLSearchParams({
    wanted: 'true',
    email,
    // Custom fields passed through to webhook
    'resume_id': resumeId,
    'plan': plan,
    'success_url': successUrl,
  });
  return `https://gumroad.com/l/${permalink}?${params.toString()}`;
}

// Verify Gumroad webhook (they don't sign, but they send a seller_id we can verify)
export function verifyGumroadWebhook(sellerId: string): boolean {
  return sellerId === process.env.GUMROAD_SELLER_ID?.trim();
}
