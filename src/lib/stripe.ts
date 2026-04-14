import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-03-25.dahlia",
    });
  }
  return _stripe;
}

export const PRICES = {
  ONE_TIME: process.env.STRIPE_PRICE_ONE_TIME!,
  PRO_MONTHLY: process.env.STRIPE_PRICE_PRO_MONTHLY!,
};
