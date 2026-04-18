"use client";

import { useState, useEffect, useRef } from "react";
import AffiliateCards from "@/components/shared/AffiliateCards";
import { AFFILIATES, RESULT_PANEL_AFFILIATES } from "@/lib/affiliates";

/* ─── Types ─── */

interface ResumeExperience {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  bullets: string[];
}

interface GeneratedResume {
  summary: string;
  experience: ResumeExperience[];
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

interface StepResultProps {
  resume: GeneratedResume;
  atsScore: ATSScore;
  selectedTemplate: string;
  onTemplateChange: (template: string) => void;
  onResumeEdit: (resume: GeneratedResume) => void;
}

const TEMPLATES = ["Classic", "Modern", "Minimal", "Executive", "Creative"];

/* ─── ATS Score Gauge ─── */

function ATSGauge({ score }: { score: number }) {
  const [animScore, setAnimScore] = useState(0);
  const ref = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const start = Date.now();
    const duration = 1500;
    const tick = () => {
      const elapsed = Date.now() - start;
      const t = Math.min(elapsed / duration, 1);
      // ease-out
      const eased = 1 - Math.pow(1 - t, 3);
      setAnimScore(Math.round(eased * score));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [score]);

  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animScore / 100) * circumference;
  const color =
    animScore >= 90
      ? "#22c55e"
      : animScore >= 70
        ? "#eab308"
        : "#ef4444";

  return (
    <div className="relative w-[140px] h-[140px] mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="10"
        />
        <circle
          ref={ref}
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-100"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold" style={{ color }}>
          {animScore}
        </span>
        <span className="text-xs text-gray-400">/ 100</span>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */

export default function StepResult({
  resume,
  atsScore,
  selectedTemplate,
  onTemplateChange,
  onResumeEdit,
}: StepResultProps) {
  const [activeTab, setActiveTab] = useState<"ats" | "templates" | "edit">(
    "ats"
  );

  const tabs = [
    { id: "ats" as const, label: "ATS Score" },
    { id: "templates" as const, label: "Templates" },
    { id: "edit" as const, label: "Edit" },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Tab bar */}
      <div className="flex border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-emerald-500 text-emerald-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ─── ATS Score Tab ─── */}
      {activeTab === "ats" && (
        <div className="space-y-6">
          <ATSGauge score={atsScore.overall} />

          {/* Section bars */}
          <div className="space-y-3">
            {atsScore.sections.map((section) => (
              <div key={section.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{section.name}</span>
                  <span className="font-medium text-gray-900">
                    {section.score}%
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      section.score >= 90
                        ? "bg-green-500"
                        : section.score >= 70
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                    style={{ width: `${section.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Matched keywords */}
          {atsScore.matchedKeywords.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Matched Keywords
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {atsScore.matchedKeywords.map((kw) => (
                  <span
                    key={kw}
                    className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Missing keywords */}
          {atsScore.missingKeywords.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Missing Keywords
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {atsScore.missingKeywords.map((kw) => (
                  <button
                    key={kw}
                    type="button"
                    onClick={() => {
                      if (!resume.skills.includes(kw)) {
                        onResumeEdit({
                          ...resume,
                          skills: [...resume.skills, kw],
                        });
                      }
                    }}
                    className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors inline-flex items-center gap-0.5"
                  >
                    {kw}
                    <span className="font-bold">+</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Suggestions */}
          {atsScore.suggestions.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Suggestions
              </h3>
              <ul className="space-y-1.5">
                {atsScore.suggestions.map((s, i) => (
                  <li key={i} className="text-sm text-gray-600 flex gap-2">
                    <span className="shrink-0">&#128161;</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <AffiliateCards
            source="builder_result_ats"
            affiliates={RESULT_PANEL_AFFILIATES.map((k) => AFFILIATES[k])}
          />
        </div>
      )}

      {/* ─── Templates Tab ─── */}
      {activeTab === "templates" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {TEMPLATES.map((tpl) => (
            <button
              key={tpl}
              type="button"
              onClick={() => onTemplateChange(tpl)}
              className={`border-2 rounded-lg p-3 transition-all hover:shadow-md ${
                selectedTemplate === tpl
                  ? "border-emerald-500 ring-2 ring-emerald-500 ring-offset-1"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {/* Thumbnail placeholder */}
              <div className="aspect-[3/4] bg-gray-50 rounded mb-2 flex items-center justify-center">
                <TemplateThumbnail name={tpl} />
              </div>
              <p
                className={`text-sm text-center font-medium ${
                  selectedTemplate === tpl
                    ? "text-emerald-600"
                    : "text-gray-700"
                }`}
              >
                {tpl}
              </p>
            </button>
          ))}
        </div>
      )}

      {/* ─── Edit Tab ─── */}
      {activeTab === "edit" && (
        <div className="space-y-6">
          {/* Summary */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Summary</h3>
            <div
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) =>
                onResumeEdit({
                  ...resume,
                  summary: e.currentTarget.textContent || "",
                })
              }
              className="text-sm text-gray-800 border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[80px]"
            >
              {resume.summary}
            </div>
          </div>

          {/* Experience bullets */}
          {resume.experience.map((exp, expIdx) => (
            <div key={expIdx}>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                {exp.jobTitle} at {exp.company}
              </h3>
              <div className="space-y-2">
                {exp.bullets.map((bullet, bulletIdx) => (
                  <div
                    key={bulletIdx}
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const newBullets = [...exp.bullets];
                      newBullets[bulletIdx] =
                        e.currentTarget.textContent || "";
                      const newExp = [...resume.experience];
                      newExp[expIdx] = { ...exp, bullets: newBullets };
                      onResumeEdit({ ...resume, experience: newExp });
                    }}
                    className="text-sm text-gray-800 border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {bullet}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Skills */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Skills</h3>
            <div
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => {
                const text = e.currentTarget.textContent || "";
                const skills = text
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean);
                onResumeEdit({ ...resume, skills });
              }}
              className="text-sm text-gray-800 border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {resume.skills.join(", ")}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Mini template thumbnails ─── */

function TemplateThumbnail({ name }: { name: string }) {
  const base = "w-full h-full p-2 flex flex-col gap-1";
  const line = "h-1.5 rounded-full";
  const heading = "h-2 rounded-full";

  switch (name) {
    case "Classic":
      return (
        <div className={base}>
          <div className={`${heading} bg-gray-800 w-3/4 mx-auto`} />
          <div className={`${line} bg-gray-300 w-1/2 mx-auto`} />
          <div className="border-t border-gray-200 mt-1 pt-1 space-y-1">
            <div className={`${line} bg-gray-200 w-full`} />
            <div className={`${line} bg-gray-200 w-5/6`} />
            <div className={`${line} bg-gray-200 w-4/5`} />
          </div>
        </div>
      );
    case "Modern":
      return (
        <div className={`${base} flex-row`}>
          <div className="w-1/3 bg-emerald-50 rounded p-1 space-y-1">
            <div className="w-6 h-6 bg-emerald-200 rounded-full mx-auto" />
            <div className={`${line} bg-emerald-200 w-full`} />
            <div className={`${line} bg-emerald-200 w-3/4`} />
          </div>
          <div className="flex-1 pl-1 space-y-1">
            <div className={`${heading} bg-gray-800 w-2/3`} />
            <div className={`${line} bg-gray-200 w-full`} />
            <div className={`${line} bg-gray-200 w-5/6`} />
          </div>
        </div>
      );
    case "Minimal":
      return (
        <div className={base}>
          <div className={`${heading} bg-gray-700 w-1/2`} />
          <div className={`${line} bg-gray-300 w-1/3`} />
          <div className="mt-2 space-y-1">
            <div className={`${line} bg-gray-200 w-full`} />
            <div className={`${line} bg-gray-200 w-11/12`} />
            <div className={`${line} bg-gray-200 w-4/5`} />
          </div>
        </div>
      );
    case "Executive":
      return (
        <div className={base}>
          <div className="border-b-2 border-gray-800 pb-1">
            <div className={`${heading} bg-gray-800 w-2/3 mx-auto`} />
          </div>
          <div className="space-y-1 mt-1">
            <div className={`${heading} bg-gray-400 w-1/3`} />
            <div className={`${line} bg-gray-200 w-full`} />
            <div className={`${line} bg-gray-200 w-5/6`} />
          </div>
        </div>
      );
    case "Creative":
      return (
        <div className={base}>
          <div className="bg-emerald-500 rounded p-1 mb-1">
            <div className={`${heading} bg-white/80 w-2/3 mx-auto`} />
            <div className={`${line} bg-white/50 w-1/2 mx-auto mt-0.5`} />
          </div>
          <div className="space-y-1">
            <div className={`${line} bg-gray-200 w-full`} />
            <div className={`${line} bg-gray-200 w-5/6`} />
          </div>
        </div>
      );
    default:
      return null;
  }
}
