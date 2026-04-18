"use client";

import { useState } from "react";
import { FileDown, FileText, AlertCircle } from "lucide-react";
import AffiliateCards from "@/components/shared/AffiliateCards";
import { AFFILIATES, POST_PURCHASE_AFFILIATES } from "@/lib/affiliates";

interface PostPaymentRecoveryProps {
  defaultEmail?: string;
  defaultPlan: "basic" | "pro";
}

export default function PostPaymentRecovery({ defaultEmail = "", defaultPlan }: PostPaymentRecoveryProps) {
  const [email, setEmail] = useState(defaultEmail);
  const [loading, setLoading] = useState<"pdf" | "docx" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const download = async (format: "pdf" | "docx") => {
    if (!email.trim()) {
      setError("Please enter the email you used at checkout.");
      return;
    }
    setError(null);
    setLoading(format);
    try {
      const endpoint = format === "pdf" ? "/api/download-pdf" : "/api/download-docx";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || body.error || `Download failed (${res.status})`);
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `resume.${format}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(null);
    }
  };

  return (
    <main className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 mb-4">
            <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment confirmed</h1>
          <p className="text-gray-600">
            Enter the email used at checkout to download your{" "}
            {defaultPlan === "pro" ? "Pro" : "Basic"} resume.
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
          <label htmlFor="recovery-email" className="block text-sm font-medium text-gray-700 mb-2">
            Email used for checkout
          </label>
          <input
            id="recovery-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
          />

          {error && (
            <div className="mt-3 flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="mt-4 flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={() => download("pdf")}
              disabled={loading !== null}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-medium px-4 py-2.5 rounded-lg transition-colors"
            >
              <FileDown className="w-4 h-4" />
              {loading === "pdf" ? "Preparing..." : "Download PDF"}
            </button>
            {defaultPlan === "pro" && (
              <button
                type="button"
                onClick={() => download("docx")}
                disabled={loading !== null}
                className="flex-1 inline-flex items-center justify-center gap-2 border border-emerald-500 text-emerald-600 hover:bg-emerald-50 disabled:opacity-50 font-medium px-4 py-2.5 rounded-lg transition-colors"
              >
                <FileText className="w-4 h-4" />
                {loading === "docx" ? "Preparing..." : "Download DOCX"}
              </button>
            )}
          </div>

          <p className="text-xs text-gray-500 mt-4">
            Didn&apos;t get your Gumroad receipt? Check spam. Still stuck? Email{" "}
            <a href="mailto:support@getresumeai.site" className="underline">support@getresumeai.site</a>.
          </p>
        </div>

        <AffiliateCards
          source="post_purchase"
          affiliates={POST_PURCHASE_AFFILIATES.map((k) => AFFILIATES[k])}
          title="Boost your job search"
        />
      </div>
    </main>
  );
}
