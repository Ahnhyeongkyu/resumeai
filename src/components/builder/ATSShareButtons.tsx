"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

interface ATSShareButtonsProps {
  score: number;
  resumeId?: string;
}

export default function ATSShareButtons({ score, resumeId }: ATSShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://getresumeai.site";
  // 유통 측정(#스프린트): 공유 루프를 UTM 채널로 연결 → LandingTrack이 utm_source=share 캡처(PostHog).
  const shareUtm = "utm_source=share&utm_medium=referral&utm_campaign=ats_score";
  const shareUrl = resumeId
    ? `${baseUrl}/share/${resumeId}?${shareUtm}`
    : `${baseUrl}?${shareUtm}`;

  const shareText = `My resume scored ${score}/100 against this ATS - and I got actionable feedback on what to fix. Built with ResumeAI ($9 once, no subscription).`;

  function handleTwitterShare() {
    trackEvent("ats_share", { channel: "twitter", score });
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank", "noopener,noreferrer,width=550,height=420");
  }

  function handleLinkedInShare() {
    trackEvent("ats_share", { channel: "linkedin", score });
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank", "noopener,noreferrer,width=550,height=420");
  }

  async function handleCopy() {
    trackEvent("ats_share", { channel: "copy_link", score });
    try {
      await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable
    }
  }

  return (
    <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-emerald-800 mb-1">
        Share your ATS score
      </h3>
      <p className="text-xs text-emerald-700 mb-3">
        Help others discover ResumeAI. We add a Powered-by attribution.
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleTwitterShare}
          className="inline-flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-md bg-black text-white hover:bg-gray-800 transition-colors"
          aria-label="Share on X (Twitter)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Tweet
        </button>
        <button
          type="button"
          onClick={handleLinkedInShare}
          className="inline-flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-md bg-[#0a66c2] text-white hover:bg-[#004182] transition-colors"
          aria-label="Share on LinkedIn"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
            <path d="M20.452 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.356V9h3.414v1.561h.046c.477-.9 1.637-1.852 3.37-1.852 3.601 0 4.266 2.37 4.266 5.455v6.288zM5.337 7.433c-1.144 0-2.07-.928-2.07-2.07 0-1.142.926-2.07 2.07-2.07 1.142 0 2.07.928 2.07 2.07 0 1.142-.928 2.07-2.07 2.07zm1.778 13.019H3.554V9h3.561v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.728v20.543C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.728C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          LinkedIn
        </button>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          aria-label="Copy share link"
        >
          {copied ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" aria-hidden="true">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
              Copy link
            </>
          )}
        </button>
      </div>
    </div>
  );
}
