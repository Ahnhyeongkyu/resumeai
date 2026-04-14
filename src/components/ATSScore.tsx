"use client";

import type { ATSScoreResult } from "@/lib/claude";
import { Share2 } from "lucide-react";

interface Props {
  score: ATSScoreResult;
  jobTitle?: string;
}

export default function ATSScore({ score, jobTitle }: Props) {
  const color = score.score >= 80 ? "text-green-500" : score.score >= 60 ? "text-yellow-500" : "text-red-500";
  const bg = score.score >= 80 ? "bg-green-500" : score.score >= 60 ? "bg-yellow-500" : "bg-red-500";

  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/share/${score.score}?job=${encodeURIComponent(jobTitle || "")}`
    : "";

  const handleShare = () => {
    const text = `My resume scored ${score.score}/100 on ATS! Check yours at resumeai.site`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, "_blank");
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">ATS Compatibility Score</h3>
        <button
          onClick={handleShare}
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>

      {/* Score circle */}
      <div className="flex items-center gap-6">
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="#e5e7eb" strokeWidth="8" />
            <circle
              cx="50" cy="50" r="42" fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${score.score * 2.64} 264`}
              className={color}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-2xl font-bold ${color}`}>{score.score}</span>
          </div>
        </div>
        <div className="flex-1">
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div className={`h-2 rounded-full ${bg}`} style={{ width: `${score.score}%` }} />
          </div>
          <p className="text-sm text-gray-600">
            {score.score >= 80
              ? "Excellent! Your resume is well-optimized for ATS."
              : score.score >= 60
              ? "Good, but there's room for improvement."
              : "Your resume needs significant optimization."}
          </p>
        </div>
      </div>

      {/* Keywords */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-xs font-semibold text-green-600 uppercase mb-2">Matched Keywords</h4>
          <div className="flex flex-wrap gap-1">
            {score.matchedKeywords.map((kw, i) => (
              <span key={i} className="text-xs px-2 py-0.5 bg-green-50 text-green-700 rounded">
                {kw}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-red-600 uppercase mb-2">Missing Keywords</h4>
          <div className="flex flex-wrap gap-1">
            {score.missingKeywords.map((kw, i) => (
              <span key={i} className="text-xs px-2 py-0.5 bg-red-50 text-red-700 rounded">
                {kw}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Suggestions */}
      {score.suggestions.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-blue-600 uppercase mb-2">Suggestions</h4>
          <ul className="space-y-1">
            {score.suggestions.map((s, i) => (
              <li key={i} className="text-xs text-gray-600 flex items-start gap-1">
                <span className="text-blue-500 mt-0.5">+</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
