"use client";

// 퍼널 측정 통일 (PostHog 443488, 전 제품 통합): landing_view(LandingTrack) →
//   resume_generated → paywall_view → cta_click → paid_conversion(gumroad webhook).
// LandingTrack과 동일 distinct_id(ra_anon_id)/source(ra_source_v1) 재사용 → 동일 익명유저로 퍼널 연결.
// 경량 직접 POST(posthog-js dep 무관, GA용 trackEvent와 별개 채널).

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const HOST = (process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com").replace(/\/$/, "");

function distinctId(): string {
  try {
    let id = localStorage.getItem("ra_anon_id");
    if (!id) {
      id = crypto?.randomUUID?.() ?? `ra-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      localStorage.setItem("ra_anon_id", id);
    }
    return id;
  } catch {
    return "anon";
  }
}

export function track(event: string, props?: Record<string, unknown>): void {
  if (!KEY || typeof window === "undefined") return;
  try {
    let source = "direct";
    try {
      source = localStorage.getItem("ra_source_v1") || "direct";
    } catch {
      /* private mode */
    }
    const payload = JSON.stringify({
      api_key: KEY,
      event,
      distinct_id: distinctId(),
      properties: { saas: "resumeai", source, $current_url: window.location.href.slice(0, 512), ...props },
    });
    const url = `${HOST}/i/v0/e/`;
    const sent = navigator.sendBeacon?.(url, new Blob([payload], { type: "application/json" }));
    if (!sent) {
      void fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: payload, keepalive: true }).catch(() => {});
    }
  } catch {
    /* 측정 실패는 앱에 영향 X */
  }
}
