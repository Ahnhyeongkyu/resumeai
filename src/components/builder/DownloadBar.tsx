"use client";

import { useState } from "react";
import { ChevronDown, Share2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { usePricingVariant } from "@/hooks/usePricingVariant";

interface DownloadBarProps {
  atsScore: number;
  resumeId: string;
  email: string;
  paidPlan: "none" | "basic" | "pro";
  resume?: unknown;
  personalInfo?: unknown;
}

export default function DownloadBar({
  atsScore,
  resumeId,
  email,
  paidPlan,
  resume,
  personalInfo,
}: DownloadBarProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const proVariant = usePricingVariant();

  const scoreColor =
    atsScore >= 90
      ? "text-green-600 border-green-200 bg-green-50"
      : atsScore >= 70
        ? "text-yellow-600 border-yellow-200 bg-yellow-50"
        : "text-red-600 border-red-200 bg-red-50";

  const handleDownload = async (format: "pdf" | "docx" = "pdf") => {
    setLoading(true);
    setErrorMsg(null);
    trackEvent("download_click", { format, plan: paidPlan, resume_id: resumeId });
    try {
      const endpoint = format === "pdf" ? "/api/download-pdf" : "/api/download-docx";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeId, email, resume, personalInfo }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || body.error || "Download failed");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `resume.${format}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setErrorMsg((err as Error).message);
    } finally {
      setLoading(false);
      setShowDropdown(false);
    }
  };

  const handleCheckout = async (plan: "basic" | "pro") => {
    setLoading(true);
    setErrorMsg(null);
    const variant = plan === "pro" ? proVariant.variant : "control";
    trackEvent("checkout_start", { plan, resume_id: resumeId, variant });
    try {
      if (!email) {
        throw new Error("Please enter your email in Step 2 before checkout.");
      }
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeId, email, plan, variant }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Checkout failed");
      }

      const { url } = await res.json();
      window.location.href = url;
    } catch (err) {
      setErrorMsg((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/resume/${resumeId}/score`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      // Could add a toast here
    } catch {
      // Fallback
    }
    setShowDropdown(false);
  };

  const isPaid = paidPlan !== "none";

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
      {errorMsg && (
        <div className="bg-red-50 border-b border-red-200 px-4 py-2 text-xs text-red-700 text-center">
          {errorMsg}
          {errorMsg.toLowerCase().includes("declined") && (
            <span className="ml-2 text-red-600">Try a different card or contact support.</span>
          )}
        </div>
      )}
      <div className="h-16 px-4 md:px-6 flex items-center justify-between max-w-7xl mx-auto">
        {/* ATS Score Badge */}
        <div
          className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-bold ${scoreColor}`}
        >
          {atsScore}
        </div>

        {/* Download Button Group */}
        <div className="relative flex items-center">
          {isPaid ? (
            <>
              <button
                type="button"
                onClick={() => handleDownload("pdf")}
                disabled={loading}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-5 py-2.5 rounded-l-lg transition-colors disabled:opacity-50"
              >
                {loading ? "Processing..." : "Download PDF"}
              </button>
              <button
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-2 py-2.5 rounded-r-lg border-l border-emerald-400"
                aria-label="More options"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => handleCheckout("basic")}
                disabled={loading}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-5 py-2.5 rounded-l-lg transition-colors disabled:opacity-50"
              >
                {loading ? "Processing..." : "Download PDF \u2014 $9"}
              </button>
              <button
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-2 py-2.5 rounded-r-lg border-l border-emerald-400"
                aria-label="More options"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute bottom-full right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[220px]">
              {isPaid ? (
                <>
                  {paidPlan === "pro" && (
                    <button
                      type="button"
                      onClick={() => handleDownload("docx")}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Download DOCX
                    </button>
                  )}
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => handleCheckout("pro")}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Download PDF + DOCX — {proVariant.label}{" "}
                  <span className="text-emerald-500 font-medium">(Pro)</span>
                </button>
              )}
              <div className="border-t border-gray-100 my-1" />
              <button
                type="button"
                onClick={handleShare}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <Share2 className="w-3.5 h-3.5" />
                Share ATS Score
              </button>
            </div>
          )}
        </div>
      </div>
      {!isPaid && (
        <p className="text-[11px] text-gray-500 text-center pb-1.5 px-4">
          Secure checkout via Gumroad (English). Returns automatically.
        </p>
      )}
    </div>
  );
}
