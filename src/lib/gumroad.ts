export type CheckoutPlan = 'basic' | 'pro';
export type PricingVariant = 'control' | 'treatment';

/**
 * Returns the Gumroad permalink for a given plan / experiment variant.
 *
 * CMP-38 5/27 회장: `pro` + `treatment` (= $29) routes to a separate Gumroad
 * product so the higher price actually charges. Falls back to the control
 * permalink (= $19) if the treatment permalink is unset — this keeps payments
 * working even before the chairman finishes creating the $29 product.
 */
export function getGumroadPermalink(
  plan: CheckoutPlan,
  variant: PricingVariant = 'control'
): string {
  if (plan === 'basic') {
    const basic = process.env.GUMROAD_BASIC_PERMALINK?.trim();
    if (!basic) throw new Error('GUMROAD_BASIC_PERMALINK not configured');
    return basic;
  }

  // plan === 'pro'
  const control = process.env.GUMROAD_PRO_PERMALINK?.trim();
  if (!control) throw new Error('GUMROAD_PRO_PERMALINK not configured');

  if (variant === 'treatment') {
    const treatment = process.env.GUMROAD_PRO_TREATMENT_PERMALINK?.trim();
    // Treatment permalink may not exist yet (chairman action pending).
    // Fall back to control so checkout never breaks — analytics still records
    // the assigned variant so analysis can spot the fallback period.
    return treatment || control;
  }

  return control;
}

export function buildCheckoutUrl(
  plan: CheckoutPlan,
  email: string,
  resumeId: string,
  successUrl: string,
  variant: PricingVariant = 'control'
): string {
  const permalink = getGumroadPermalink(plan, variant);
  const params = new URLSearchParams({
    wanted: 'true',
    email,
    // Custom fields passed through to webhook
    'resume_id': resumeId,
    'plan': plan,
    'variant': variant,
    'success_url': successUrl,
  });
  return `https://gumroad.com/l/${permalink}?${params.toString()}`;
}

// Verify Gumroad webhook (they don't sign, but they send a seller_id we can verify)
export function verifyGumroadWebhook(sellerId: string): boolean {
  return sellerId === process.env.GUMROAD_SELLER_ID?.trim();
}
