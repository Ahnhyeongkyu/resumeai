"use client";

// 측정 통일 v0 (5/31): resumeai 유입 측정 → 통합 PostHog project 443488 (statmate/trustfolio 동일).
//   landing_view + first-touch source(utm OR referrer 도출: chatgpt/google/direct) + saas='resumeai'.
//   기존 PostHogInit(다른 토큰)과 독립 — 경량 capture 직접 POST(posthog-js dep 무관).
//   CTO 수집기가 saas='resumeai' scope로 소스별 유입 집계 → 전 제품 STATUS 통합표.
import { useEffect } from "react";

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
const DID_KEY = "ra_anon_id";
const FIRED_KEY = "ra_landing_fired_v1";
const SOURCE_KEY = "ra_source_v1";

function resolveSource(utmSource: string | null): string {
  try {
    const stored = localStorage.getItem(SOURCE_KEY);
    if (stored) return stored;
  } catch {
    /* private mode */
  }
  let src = "direct";
  if (utmSource) {
    src = utmSource.slice(0, 64);
  } else if (document.referrer) {
    try {
      const h = new URL(document.referrer).hostname.replace(/^www\./, "");
      if (/(chatgpt\.com|chat\.openai\.com|openai\.com)/.test(h)) src = "chatgpt";
      else if (/(copilot\.microsoft\.com|bing\.com)/.test(h)) src = "copilot";
      else if (/perplexity\.ai/.test(h)) src = "perplexity";
      else if (/google\./.test(h)) src = "google";
      else if (/duckduckgo\.com/.test(h)) src = "duckduckgo";
      else if (/(t\.co|twitter\.com|x\.com)/.test(h)) src = "twitter";
      else if (/linkedin\.com/.test(h)) src = "linkedin";
      else if (h.includes("getresumeai.site")) src = "direct";
      else src = h.slice(0, 64);
    } catch {
      /* malformed referrer */
    }
  }
  try {
    localStorage.setItem(SOURCE_KEY, src);
  } catch {
    /* private mode */
  }
  return src;
}

export default function LandingTrack() {
  useEffect(() => {
    if (!KEY || typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem(FIRED_KEY)) return; // 세션당 1회
      sessionStorage.setItem(FIRED_KEY, "1");

      let did = localStorage.getItem(DID_KEY);
      if (!did) {
        did = crypto?.randomUUID?.() ?? `ra-${Date.now()}-${Math.random().toString(36).slice(2)}`;
        localStorage.setItem(DID_KEY, did);
      }

      const sp = new URLSearchParams(window.location.search);
      const utmSource = sp.get("utm_source");
      const properties: Record<string, string> = {
        saas: "resumeai",
        source: resolveSource(utmSource),
        path: window.location.pathname.slice(0, 256),
        $current_url: window.location.href.slice(0, 512),
      };
      for (const k of UTM_KEYS) {
        const v = sp.get(k);
        if (v) properties[k] = v.slice(0, 256);
      }
      if (document.referrer) properties.$referrer = document.referrer.slice(0, 512);

      const payload = JSON.stringify({ api_key: KEY, event: "landing_view", distinct_id: did, properties });
      const url = `${HOST.replace(/\/$/, "")}/i/v0/e/`;
      const sent = navigator.sendBeacon?.(url, new Blob([payload], { type: "application/json" }));
      if (!sent) {
        void fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: payload, keepalive: true });
      }
    } catch {
      /* 측정 실패는 앱에 영향 X */
    }
  }, []);
  return null;
}
