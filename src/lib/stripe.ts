import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
});

export const PRICES = {
  ONE_TIME: process.env.STRIPE_PRICE_ONE_TIME!,
  PRO_MONTHLY: process.env.STRIPE_PRICE_PRO_MONTHLY!,
};
