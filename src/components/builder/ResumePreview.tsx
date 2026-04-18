"use client";

import { useState } from "react";
import { ZoomIn, ZoomOut } from "lucide-react";
import type { FormData } from "./StepInfo";

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

interface ResumePreviewProps {
  formData: FormData;
  generatedResume: GeneratedResume | null;
  selectedTemplate: string;
  isPaid: boolean;
}

const ZOOM_LEVELS = [75, 100, 125] as const;

export default function ResumePreview({
  formData,
  generatedResume,
  selectedTemplate,
  isPaid,
}: ResumePreviewProps) {
  const [zoom, setZoom] = useState<(typeof ZOOM_LEVELS)[number]>(100);

  const hasContent =
    generatedResume || formData.name || formData.workExperience.some((w) => w.jobTitle);

  if (!hasContent) {
    return (
      <div className="h-full bg-gray-100 flex items-center justify-center">
        <p className="text-sm text-gray-400">
          Your resume preview will appear here
        </p>
      </div>
    );
  }

  const name = formData.name || "Your Name";
  const contactParts = [
    formData.email,
    formData.phone,
    formData.location,
    formData.linkedin,
  ].filter(Boolean);

  const summary = generatedResume?.summary || "";
  const experience = generatedResume?.experience || formData.workExperience.map((w) => ({
    ...w,
    bullets: w.description ? w.description.split("\n").filter(Boolean) : [],
  }));
  const skills = generatedResume?.skills || formData.skills;
  const education = generatedResume?.education || formData.education;

  return (
    <div className="h-full bg-gray-100 flex flex-col">
      {/* Zoom controls */}
      <div className="flex items-center justify-center gap-2 py-2 bg-gray-100 border-b border-gray-200">
        <button
          type="button"
          onClick={() => {
            const i = ZOOM_LEVELS.indexOf(zoom);
            if (i > 0) setZoom(ZOOM_LEVELS[i - 1]);
          }}
          disabled={zoom === 75}
          className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
          aria-label="Zoom out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <span className="text-xs text-gray-500 min-w-[3rem] text-center">
          {zoom}%
        </span>
        <button
          type="button"
          onClick={() => {
            const i = ZOOM_LEVELS.indexOf(zoom);
            if (i < ZOOM_LEVELS.length - 1) setZoom(ZOOM_LEVELS[i + 1]);
          }}
          disabled={zoom === 125}
          className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
          aria-label="Zoom in"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
      </div>

      {/* Paper */}
      <div className="flex-1 overflow-auto flex justify-center p-4">
        <div
          className="bg-white shadow-lg relative"
          style={{
            width: `${(595 * zoom) / 100}px`,
            minHeight: `${(842 * zoom) / 100}px`,
            transform: `scale(1)`,
            transformOrigin: "top center",
          }}
        >
          {/* Watermark */}
          {!isPaid && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
              <div
                className="absolute inset-0 flex flex-wrap gap-16 items-center justify-center opacity-[0.07]"
                style={{ transform: "rotate(-30deg)" }}
              >
                {Array.from({ length: 12 }).map((_, i) => (
                  <span
                    key={i}
                    className="text-gray-900 text-lg font-bold whitespace-nowrap select-none"
                  >
                    Created with ResumeAI
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Resume content */}
          <div
            className="relative z-0"
            style={{ fontSize: `${(zoom / 100) * 10}px`, padding: `${(zoom / 100) * 32}px` }}
          >
            <TemplateRenderer
              template={selectedTemplate}
              name={name}
              contactParts={contactParts}
              summary={summary}
              experience={experience}
              skills={skills}
              education={education}
              scale={zoom / 100}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Template Renderer ─── */

interface TemplateProps {
  template: string;
  name: string;
  contactParts: string[];
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
  scale: number;
}

function TemplateRenderer({
  template,
  name,
  contactParts,
  summary,
  experience,
  skills,
  education,
  scale,
}: TemplateProps) {
  const headingSize = `${1.6 * scale}em`;
  const subheadingSize = `${1.1 * scale}em`;
  const bodySize = `${0.9 * scale}em`;
  const smallSize = `${0.75 * scale}em`;

  const sectionTitle = (text: string) => {
    switch (template) {
      case "Modern":
        return (
          <h3
            className="font-bold text-emerald-600 uppercase tracking-wider mb-1"
            style={{ fontSize: subheadingSize, borderBottom: "2px solid #10b981", paddingBottom: "2px" }}
          >
            {text}
          </h3>
        );
      case "Minimal":
        return (
          <h3
            className="font-semibold text-gray-800 uppercase tracking-widest mb-1"
            style={{ fontSize: smallSize }}
          >
            {text}
          </h3>
        );
      case "Executive":
        return (
          <h3
            className="font-bold text-gray-900 border-b-2 border-gray-900 pb-0.5 mb-1"
            style={{ fontSize: subheadingSize }}
          >
            {text}
          </h3>
        );
      case "Creative":
        return (
          <h3
            className="font-bold text-emerald-600 mb-1"
            style={{ fontSize: subheadingSize }}
          >
            {text}
          </h3>
        );
      default: // Classic
        return (
          <h3
            className="font-bold text-gray-900 border-b border-gray-300 pb-0.5 mb-1"
            style={{ fontSize: subheadingSize }}
          >
            {text}
          </h3>
        );
    }
  };

  // Header
  const header = (() => {
    switch (template) {
      case "Creative":
        return (
          <div className="bg-emerald-500 text-white rounded-lg p-4 mb-4">
            <h1 className="font-bold text-center" style={{ fontSize: headingSize }}>
              {name}
            </h1>
            {contactParts.length > 0 && (
              <p className="text-center text-emerald-100 mt-0.5" style={{ fontSize: smallSize }}>
                {contactParts.join(" | ")}
              </p>
            )}
          </div>
        );
      case "Modern":
        return (
          <div className="mb-4 pb-2 border-b-2 border-emerald-500">
            <h1 className="font-bold text-gray-900" style={{ fontSize: headingSize }}>
              {name}
            </h1>
            {contactParts.length > 0 && (
              <p className="text-emerald-600 mt-0.5" style={{ fontSize: smallSize }}>
                {contactParts.join(" | ")}
              </p>
            )}
          </div>
        );
      case "Minimal":
        return (
          <div className="mb-4">
            <h1 className="font-light text-gray-900 tracking-wide" style={{ fontSize: headingSize }}>
              {name}
            </h1>
            {contactParts.length > 0 && (
              <p className="text-gray-500 mt-0.5" style={{ fontSize: smallSize }}>
                {contactParts.join(" | ")}
              </p>
            )}
          </div>
        );
      case "Executive":
        return (
          <div className="text-center mb-4 pb-2 border-b-2 border-gray-900">
            <h1 className="font-bold text-gray-900 uppercase tracking-wider" style={{ fontSize: headingSize }}>
              {name}
            </h1>
            {contactParts.length > 0 && (
              <p className="text-gray-600 mt-0.5" style={{ fontSize: smallSize }}>
                {contactParts.join(" | ")}
              </p>
            )}
          </div>
        );
      default: // Classic
        return (
          <div className="text-center mb-4">
            <h1 className="font-bold text-gray-900" style={{ fontSize: headingSize }}>
              {name}
            </h1>
            {contactParts.length > 0 && (
              <p className="text-gray-600 mt-0.5" style={{ fontSize: smallSize }}>
                {contactParts.join(" | ")}
              </p>
            )}
          </div>
        );
    }
  })();

  return (
    <div>
      {header}

      {/* Summary */}
      {summary && (
        <div className="mb-3">
          {sectionTitle("Summary")}
          <p className="text-gray-700 leading-relaxed" style={{ fontSize: bodySize }}>
            {summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 &&
        experience.some((e) => e.jobTitle || e.company) && (
          <div className="mb-3">
            {sectionTitle("Experience")}
            <div className="space-y-2">
              {experience
                .filter((e) => e.jobTitle || e.company)
                .map((exp, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-baseline">
                      <span className="font-semibold text-gray-900" style={{ fontSize: bodySize }}>
                        {exp.jobTitle}
                      </span>
                      <span className="text-gray-500" style={{ fontSize: smallSize }}>
                        {exp.startDate} &ndash;{" "}
                        {exp.currentlyWorking ? "Present" : exp.endDate}
                      </span>
                    </div>
                    <p className="text-gray-600 italic" style={{ fontSize: smallSize }}>
                      {exp.company}
                    </p>
                    {exp.bullets.length > 0 && (
                      <ul className="list-disc ml-4 mt-0.5 space-y-0.5">
                        {exp.bullets.map((b, j) => (
                          <li
                            key={j}
                            className="text-gray-700"
                            style={{ fontSize: bodySize }}
                          >
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-3">
          {sectionTitle("Skills")}
          <p className="text-gray-700" style={{ fontSize: bodySize }}>
            {skills.join(", ")}
          </p>
        </div>
      )}

      {/* Education */}
      {education.length > 0 &&
        education.some((e) => e.degree || e.school) && (
          <div className="mb-3">
            {sectionTitle("Education")}
            <div className="space-y-1">
              {education
                .filter((e) => e.degree || e.school)
                .map((edu, i) => (
                  <div key={i} className="flex justify-between">
                    <span className="text-gray-900" style={{ fontSize: bodySize }}>
                      {edu.degree}
                      {edu.school ? `, ${edu.school}` : ""}
                    </span>
                    {edu.year && (
                      <span className="text-gray-500" style={{ fontSize: smallSize }}>
                        {edu.year}
                      </span>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
    </div>
  );
}
