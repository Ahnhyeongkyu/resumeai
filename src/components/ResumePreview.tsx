"use client";

import type { GeneratedResume } from "@/lib/claude";
import type { TemplateId } from "@/lib/resume-templates";
import { TEMPLATE_COLORS } from "@/lib/resume-templates";

interface Props {
  resume: GeneratedResume;
  fullName: string;
  email: string;
  phone: string;
  template: TemplateId;
  watermark?: boolean;
}

export default function ResumePreview({ resume, fullName, email, phone, template, watermark = true }: Props) {
  const colors = TEMPLATE_COLORS[template];

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden relative" style={{ fontFamily: "Georgia, serif" }}>
      {watermark && (
        <div className="absolute bottom-4 right-4 text-xs text-gray-300 rotate-0 z-10">
          Created with ResumeAI.site
        </div>
      )}

      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="text-center border-b-2 pb-4" style={{ borderColor: colors.accent }}>
          <h1 className="text-2xl font-bold" style={{ color: colors.primary }}>{fullName}</h1>
          <p className="text-sm text-gray-600 mt-1">
            {[email, phone].filter(Boolean).join(" | ")}
          </p>
        </div>

        {/* Professional Summary */}
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: colors.accent }}>
            Professional Summary
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">{resume.professionalSummary}</p>
        </div>

        {/* Experience */}
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: colors.accent }}>
            Experience
          </h2>
          {resume.experience.map((exp, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold text-sm" style={{ color: colors.primary }}>{exp.title}</h3>
                <span className="text-xs text-gray-500">{exp.period}</span>
              </div>
              <p className="text-xs text-gray-600 mb-1">{exp.company}</p>
              <ul className="list-disc list-inside space-y-1">
                {exp.bullets.map((bullet, j) => (
                  <li key={j} className="text-xs text-gray-700">{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: colors.accent }}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 rounded"
                style={{ backgroundColor: `${colors.accent}15`, color: colors.accent }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Education */}
        {resume.education.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: colors.accent }}>
              Education
            </h2>
            {resume.education.map((edu, i) => (
              <div key={i} className="flex justify-between text-sm">
                <div>
                  <span className="font-semibold" style={{ color: colors.primary }}>{edu.degree}</span>
                  <span className="text-gray-600"> — {edu.school}</span>
                </div>
                <span className="text-xs text-gray-500">{edu.year}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
