"use client";

type EventName =
  | "page_view"
  | "builder_start"
  | "jd_paste"
  | "info_complete"
  | "generate_start"
  | "generate_complete"
  | "download_click"
  | "checkout_start"
  | "purchase"
  | "affiliate_click"
  | "email_subscribe"
  | "ats_share";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(name: EventName, params?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  const gid = process.env.NEXT_PUBLIC_GA_ID;
  if (!gid) return;
  if (typeof window.gtag === "function") {
    window.gtag("event", name, params || {});
  }
}

export function trackPageView(path: string): void {
  if (typeof window === "undefined") return;
  const gid = process.env.NEXT_PUBLIC_GA_ID;
  if (!gid) return;
  if (typeof window.gtag === "function") {
    window.gtag("config", gid, { page_path: path });
  }
}
