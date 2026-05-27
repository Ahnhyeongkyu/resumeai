"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

/**
 * PostHog client-side init.
 *
 * Mounted once at the root layout. Initialises posthog-js with the public
 * project key (NEXT_PUBLIC_POSTHOG_KEY). When the key is missing the init is a
 * no-op so local/preview builds do not crash.
 *
 * Pageviews are auto-captured. Autocapture is disabled to keep the event
 * volume predictable for experiment analysis (we capture explicit events from
 * application code).
 */
export default function PostHogInit() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) {
      // Silently skip in environments without a key (e.g. preview, local).
      return;
    }

    // Avoid double-init in React strict mode / fast refresh.
    if (
      (
        posthog as unknown as { __loaded?: boolean }
      ).__loaded === true
    ) {
      return;
    }

    try {
      posthog.init(key, {
        api_host:
          process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
        capture_pageview: true,
        autocapture: false,
        // Persist via cookie so the assigned variant is stable across reloads.
        persistence: "localStorage+cookie",
        loaded: (ph) => {
          (ph as unknown as { __loaded?: boolean }).__loaded = true;
        },
      });
    } catch (err) {
      // Never let analytics break the app.
      console.warn("[posthog] init failed", err);
    }
  }, []);

  return null;
}
