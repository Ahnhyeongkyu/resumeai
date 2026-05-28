"use client";

import { useEffect, useState } from "react";
import posthog from "posthog-js";

export type PricingVariantId = "control" | "treatment";

export interface PricingVariant {
  variant: PricingVariantId;
  amount: number;
  label: string;
  displayPrice: string;
}

export const PRICING_CONTROL: PricingVariant = {
  variant: "control",
  amount: 19,
  label: "$19",
  displayPrice: "$19",
};

export const PRICING_TREATMENT: PricingVariant = {
  variant: "treatment",
  amount: 29,
  label: "$29",
  displayPrice: "$29",
};

const EXPERIMENT_KEY = "resumeai-price-test";

/**
 * Reads the `pricing-2x` PostHog feature flag for the Pro plan A/B test
 * (CMP-38, 5/27 회장 명령: $19 → $29).
 *
 * Returns the control variant ($19) until PostHog has loaded the flags, then
 * swaps in the treatment variant ($29) if the user is bucketed there. Captures
 * a `$experiment_started` event exactly once per session per variant so the
 * PostHog experiment dashboard registers the exposure.
 *
 * Falls back safely (control) if PostHog is not initialised (e.g. missing
 * NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) so paid checkout never breaks.
 */
export function usePricingVariant(): PricingVariant {
  const [variant, setVariant] = useState<PricingVariant>(PRICING_CONTROL);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) return;

    let captured = false;

    const apply = () => {
      let flag: string | boolean | undefined;
      try {
        flag = posthog.getFeatureFlag(EXPERIMENT_KEY);
      } catch {
        flag = undefined;
      }

      const next =
        flag === "treatment" ? PRICING_TREATMENT : PRICING_CONTROL;
      setVariant(next);

      if (!captured) {
        captured = true;
        try {
          posthog.capture("$feature_flag_called", {
            $feature_flag: EXPERIMENT_KEY,
            $feature_flag_response: next.variant,
          });
          posthog.capture("$experiment_started", {
            experiment: EXPERIMENT_KEY,
            variant: next.variant,
            amount: next.amount,
          });
        } catch {
          // Swallow analytics errors silently.
        }
      }
    };

    // If flags are already loaded (cached), apply immediately; otherwise wait.
    try {
      posthog.onFeatureFlags(apply);
    } catch {
      apply();
    }
  }, []);

  return variant;
}
