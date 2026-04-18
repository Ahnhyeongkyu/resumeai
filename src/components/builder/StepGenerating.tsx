"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Check, AlertCircle, RotateCcw, ArrowLeft } from "lucide-react";
import type { FormData } from "./StepInfo";

interface GeneratedResume {
  summary: string;
  experience: {
    jobTitle: string;
    company: string;
    startDate: string;
    endDate: string;
    currentlyWorking: boolean;
    bullets: string[];
  }[];
  skills: string[];
  education: { degree: string; school: string; year: string }[];
}

interface ATSScore {
  overall: number;
  sections: { name: string; score: number }[];
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
}

interface StepGeneratingProps {
  onComplete: (resume: GeneratedResume, atsScore: ATSScore, resumeId?: string) => void;
  onCancel: () => void;
  formData: FormData;
  jobDescription: string;
}

const STAGES = [
  "Analyzing job description...",
  "Matching your experience...",
  "Optimizing for ATS...",
  "Finalizing...",
];

export default function StepGenerating({
  onComplete,
  onCancel,
  formData,
  jobDescription,
}: StepGeneratingProps) {
  const [progress, setProgress] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [atsScorePreview, setAtsScorePreview] = useState<number | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const animRef = useRef<number | null>(null);
  const startRef = useRef(Date.now());
  const completeDataRef = useRef<{
    resume: GeneratedResume;
    atsScore: ATSScore;
    resumeId?: string;
  } | null>(null);

  /* ─── Fake progress animation ─── */

  const animateProgress = useCallback(() => {
    const elapsed = Date.now() - startRef.current;
    let target: number;

    if (elapsed < 2000) {
      target = (elapsed / 2000) * 30;
    } else if (elapsed < 6000) {
      target = 30 + ((elapsed - 2000) / 4000) * 40;
    } else {
      target = 70 + ((elapsed - 6000) / 3000) * 20;
      if (target > 90) target = 90;
    }

    setProgress(Math.min(target, 90));
    setStageIndex(
      elapsed < 2000 ? 0 : elapsed < 4000 ? 1 : elapsed < 7000 ? 2 : 3
    );

    if (!completeDataRef.current) {
      animRef.current = requestAnimationFrame(animateProgress);
    }
  }, []);

  /* ─── API call ─── */

  useEffect(() => {
    const controller = new AbortController();
    abortRef.current = controller;
    startRef.current = Date.now();

    animRef.current = requestAnimationFrame(animateProgress);

    (async () => {
      try {
        const res = await fetch("/api/generate-resume", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ formData, jobDescription }),
          signal: controller.signal,
        });

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(
            body.error || `Generation failed (${res.status})`
          );
        }

        const data = await res.json();
        completeDataRef.current = {
          resume: data.resume,
          atsScore: data.atsScore,
          resumeId: data.resumeId,
        };

        // Animate to 100%
        if (animRef.current) cancelAnimationFrame(animRef.current);
        setProgress(100);
        setStageIndex(3);
        setDone(true);
        setAtsScorePreview(data.atsScore.overall);

        // Confetti for high scores
        if (data.atsScore.overall >= 80) {
          try {
            const confetti = (await import("canvas-confetti")).default;
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
              colors: ["#10b981", "#34d399", "#6ee7b7"],
            });
          } catch {
            // canvas-confetti optional
          }
        }

        // Delay before transition
        setTimeout(() => {
          if (completeDataRef.current) {
            onComplete(
              completeDataRef.current.resume,
              completeDataRef.current.atsScore,
              completeDataRef.current.resumeId
            );
          }
        }, 2000);
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        if (animRef.current) cancelAnimationFrame(animRef.current);
        setError((err as Error).message || "Something went wrong");
      }
    })();

    return () => {
      controller.abort();
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [formData, jobDescription, onComplete, animateProgress]);

  /* ─── Error state ─── */

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-lg font-bold text-gray-900 mb-2">
          Generation Failed
        </h2>
        <p className="text-sm text-gray-500 mb-6 max-w-sm">{error}</p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-1.5 px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
          <button
            type="button"
            onClick={() => {
              setError(null);
              setProgress(0);
              setDone(false);
              startRef.current = Date.now();
              completeDataRef.current = null;
              // Re-trigger by forcing a re-mount isn't possible here,
              // so we reload
              window.location.reload();
            }}
            className="flex items-center gap-1.5 px-4 py-2 text-sm text-white bg-emerald-500 rounded-lg hover:bg-emerald-600"
          >
            <RotateCcw className="w-4 h-4" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  /* ─── Loading / Done state ─── */

  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      {/* Circular progress */}
      <div className="relative w-[120px] h-[120px] mb-6">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={done ? "#22c55e" : "#10b981"}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-300"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          {done ? (
            <Check className="w-10 h-10 text-green-500" />
          ) : (
            <span className="text-xl font-bold text-gray-900">
              {Math.round(progress)}%
            </span>
          )}
        </div>
      </div>

      {/* Stage text */}
      <p className="text-sm text-gray-600 mb-2">{STAGES[stageIndex]}</p>

      {/* ATS Score badge on completion */}
      {done && atsScorePreview !== null && (
        <div className="mt-4 inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-2">
          <span className="text-sm font-medium text-emerald-700">
            ATS Score:
          </span>
          <span className="text-lg font-bold text-emerald-600">
            {atsScorePreview}
          </span>
        </div>
      )}

      {/* Cancel */}
      {!done && (
        <button
          type="button"
          onClick={() => {
            abortRef.current?.abort();
            onCancel();
          }}
          className="mt-6 text-sm text-gray-400 underline hover:text-gray-600"
        >
          Cancel
        </button>
      )}
    </div>
  );
}
