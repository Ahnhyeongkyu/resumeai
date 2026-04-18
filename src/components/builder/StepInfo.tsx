"use client";

import { useState, useRef, useMemo, useCallback } from "react";
import { Plus, X } from "lucide-react";

/* ─── Types ─── */

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  year: string;
}

export interface FormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  careerSituation: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: string[];
}

interface StepInfoProps {
  formData: FormData;
  onChange: (data: FormData) => void;
  onGenerate: () => void;
  onBack: () => void;
  jobDescription: string;
}

/* ─── Helpers ─── */

function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

function emptyExperience(): WorkExperience {
  return {
    id: uid(),
    jobTitle: "",
    company: "",
    startDate: "",
    endDate: "",
    currentlyWorking: false,
    description: "",
  };
}

function emptyEducation(): Education {
  return { id: uid(), degree: "", school: "", year: "" };
}

const CAREER_OPTIONS = [
  { value: "", label: "Select your situation...", disabled: true },
  { value: "currently_employed", label: "Currently employed" },
  { value: "career_switcher", label: "Changing careers" },
  { value: "returning_after_gap", label: "Returning after a career gap" },
  { value: "recent_graduate", label: "Recent graduate / Entry level" },
  {
    value: "experienced_professional",
    label: "Experienced professional (10+ years)",
  },
];

/* ─── Skill suggestion extractor ─── */

const COMMON_SKILLS = [
  "Python", "JavaScript", "TypeScript", "React", "Node.js", "SQL", "AWS",
  "Docker", "Kubernetes", "Git", "Java", "C++", "Go", "Rust", "Ruby",
  "Swift", "Kotlin", "PHP", "HTML", "CSS", "Tailwind", "Next.js", "Vue",
  "Angular", "Django", "Flask", "Spring", "REST", "GraphQL", "MongoDB",
  "PostgreSQL", "MySQL", "Redis", "Kafka", "Terraform", "CI/CD",
  "Figma", "Sketch", "Adobe XD", "Photoshop", "Illustrator",
  "Google Analytics", "GA4", "Tableau", "Power BI", "Excel",
  "Agile", "Scrum", "Jira", "Confluence", "Slack",
  "Machine Learning", "Deep Learning", "NLP", "TensorFlow", "PyTorch",
  "Data Analysis", "A/B Testing", "SEO", "SEM", "Google Ads",
  "Meta Ads", "Email Marketing", "Content Strategy", "Copywriting",
  "Project Management", "Product Management", "Leadership",
  "Communication", "Problem Solving", "Critical Thinking",
];

function extractSuggestedSkills(jd: string, existing: string[]): string[] {
  const lower = jd.toLowerCase();
  const existingLower = new Set(existing.map((s) => s.toLowerCase()));
  return COMMON_SKILLS.filter(
    (skill) =>
      lower.includes(skill.toLowerCase()) &&
      !existingLower.has(skill.toLowerCase())
  ).slice(0, 10);
}

/* ─── Component ─── */

export default function StepInfo({
  formData,
  onChange,
  onGenerate,
  onBack,
  jobDescription,
}: StepInfoProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [skillInput, setSkillInput] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  const suggestedSkills = useMemo(
    () => extractSuggestedSkills(jobDescription, formData.skills),
    [jobDescription, formData.skills]
  );

  /* ─── Field helpers ─── */

  const setField = useCallback(
    <K extends keyof FormData>(key: K, value: FormData[K]) => {
      onChange({ ...formData, [key]: value });
    },
    [formData, onChange]
  );

  const updateExperience = useCallback(
    (id: string, patch: Partial<WorkExperience>) => {
      setField(
        "workExperience",
        formData.workExperience.map((w) =>
          w.id === id ? { ...w, ...patch } : w
        )
      );
    },
    [formData.workExperience, setField]
  );

  const removeExperience = useCallback(
    (id: string) => {
      if (formData.workExperience.length <= 1) return;
      setField(
        "workExperience",
        formData.workExperience.filter((w) => w.id !== id)
      );
    },
    [formData.workExperience, setField]
  );

  const updateEducation = useCallback(
    (id: string, patch: Partial<Education>) => {
      setField(
        "education",
        formData.education.map((e) => (e.id === id ? { ...e, ...patch } : e))
      );
    },
    [formData.education, setField]
  );

  const removeEducation = useCallback(
    (id: string) => {
      setField(
        "education",
        formData.education.filter((e) => e.id !== id)
      );
    },
    [formData.education, setField]
  );

  /* ─── Skills ─── */

  const addSkill = useCallback(
    (skill: string) => {
      const trimmed = skill.trim();
      if (
        !trimmed ||
        formData.skills.length >= 30 ||
        formData.skills.some((s) => s.toLowerCase() === trimmed.toLowerCase())
      )
        return;
      setField("skills", [...formData.skills, trimmed]);
    },
    [formData.skills, setField]
  );

  const removeSkill = useCallback(
    (index: number) => {
      setField(
        "skills",
        formData.skills.filter((_, i) => i !== index)
      );
    },
    [formData.skills, setField]
  );

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const parts = skillInput.split(",").map((s) => s.trim()).filter(Boolean);
      for (const part of parts) {
        addSkill(part);
      }
      setSkillInput("");
    }
  };

  /* ─── Validation ─── */

  const validateField = (name: string, value: string) => {
    const next = { ...errors };
    if (name === "name" && !value.trim()) next.name = "Name is required";
    else if (name === "name") delete next.name;

    if (name === "email" && !value.trim()) next.email = "Email is required";
    else if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      next.email = "Enter a valid email";
    else if (name === "email") delete next.email;

    if (name === "careerSituation" && !value)
      next.careerSituation = "Please select your career situation";
    else if (name === "careerSituation") delete next.careerSituation;

    setErrors(next);
  };

  const validateAll = (): boolean => {
    const next: Record<string, string> = {};
    if (!formData.name.trim()) next.name = "Name is required";
    if (!formData.email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      next.email = "Enter a valid email";
    if (!formData.careerSituation)
      next.careerSituation = "Please select your career situation";

    formData.workExperience.forEach((w, i) => {
      if (!w.jobTitle.trim()) next[`exp_${i}_jobTitle`] = "Job title required";
      if (!w.company.trim()) next[`exp_${i}_company`] = "Company required";
      if (!w.startDate) next[`exp_${i}_startDate`] = "Start date required";
      if (!w.currentlyWorking && !w.endDate)
        next[`exp_${i}_endDate`] = "End date required";
    });

    setErrors(next);

    if (Object.keys(next).length > 0) {
      const firstKey = Object.keys(next)[0];
      const el = formRef.current?.querySelector(`[data-field="${firstKey}"]`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
    return true;
  };

  const handleGenerate = () => {
    if (validateAll()) {
      onGenerate();
    }
  };

  const canGenerate =
    formData.name.trim() &&
    formData.email.trim() &&
    formData.careerSituation &&
    formData.workExperience.every(
      (w) =>
        w.jobTitle.trim() &&
        w.company.trim() &&
        w.startDate &&
        (w.currentlyWorking || w.endDate)
    );

  /* ─── Render helpers ─── */

  const inputClass = (field: string) =>
    `w-full rounded-lg border px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
      errors[field] ? "border-red-400 ring-1 ring-red-500" : "border-gray-300"
    }`;

  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div ref={formRef} className="max-w-2xl mx-auto px-4 py-8 space-y-8">
      {/* ─── Personal Info ─── */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Personal Info</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Name */}
          <div data-field="name">
            <label className={labelClass}>
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setField("name", e.target.value)}
              onBlur={(e) => validateField("name", e.target.value)}
              placeholder="John Doe"
              className={inputClass("name")}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div data-field="email">
            <label className={labelClass}>
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setField("email", e.target.value)}
              onBlur={(e) => validateField("email", e.target.value)}
              placeholder="john@example.com"
              className={inputClass("email")}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className={labelClass}>Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setField("phone", e.target.value)}
              placeholder="+1 (555) 123-4567"
              className={inputClass("")}
            />
          </div>

          {/* Location */}
          <div>
            <label className={labelClass}>Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setField("location", e.target.value)}
              placeholder="San Francisco, CA"
              className={inputClass("")}
            />
          </div>

          {/* LinkedIn */}
          <div className="sm:col-span-2">
            <label className={labelClass}>LinkedIn</label>
            <input
              type="url"
              value={formData.linkedin}
              onChange={(e) => setField("linkedin", e.target.value)}
              placeholder="https://linkedin.com/in/johndoe"
              className={inputClass("")}
            />
          </div>

          {/* Career Situation */}
          <div className="sm:col-span-2" data-field="careerSituation">
            <label className={labelClass}>
              Career Situation <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.careerSituation}
              onChange={(e) => {
                setField("careerSituation", e.target.value);
                validateField("careerSituation", e.target.value);
              }}
              onBlur={(e) => validateField("careerSituation", e.target.value)}
              className={inputClass("careerSituation")}
            >
              {CAREER_OPTIONS.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  disabled={opt.disabled}
                >
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.careerSituation && (
              <p className="text-xs text-red-500 mt-1">
                {errors.careerSituation}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ─── Work Experience ─── */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          Work Experience
        </h2>
        <div className="space-y-4">
          {formData.workExperience.map((exp, i) => (
            <div
              key={exp.id}
              className="border border-gray-200 rounded-lg p-4 relative"
            >
              {formData.workExperience.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeExperience(exp.id)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
                  aria-label="Remove experience"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div data-field={`exp_${i}_jobTitle`}>
                  <label className={labelClass}>
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={exp.jobTitle}
                    onChange={(e) =>
                      updateExperience(exp.id, { jobTitle: e.target.value })
                    }
                    placeholder="Senior Software Engineer"
                    className={inputClass(`exp_${i}_jobTitle`)}
                  />
                  {errors[`exp_${i}_jobTitle`] && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors[`exp_${i}_jobTitle`]}
                    </p>
                  )}
                </div>

                <div data-field={`exp_${i}_company`}>
                  <label className={labelClass}>
                    Company <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) =>
                      updateExperience(exp.id, { company: e.target.value })
                    }
                    placeholder="Acme Corp"
                    className={inputClass(`exp_${i}_company`)}
                  />
                  {errors[`exp_${i}_company`] && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors[`exp_${i}_company`]}
                    </p>
                  )}
                </div>

                <div data-field={`exp_${i}_startDate`}>
                  <label className={labelClass}>
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) =>
                      updateExperience(exp.id, { startDate: e.target.value })
                    }
                    className={inputClass(`exp_${i}_startDate`)}
                  />
                  {errors[`exp_${i}_startDate`] && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors[`exp_${i}_startDate`]}
                    </p>
                  )}
                </div>

                <div data-field={`exp_${i}_endDate`}>
                  <label className={labelClass}>
                    End Date{" "}
                    {!exp.currentlyWorking && (
                      <span className="text-red-500">*</span>
                    )}
                  </label>
                  <input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) =>
                      updateExperience(exp.id, { endDate: e.target.value })
                    }
                    disabled={exp.currentlyWorking}
                    className={`${inputClass(`exp_${i}_endDate`)} ${
                      exp.currentlyWorking ? "bg-gray-50 text-gray-400" : ""
                    }`}
                  />
                  <label className="flex items-center gap-2 mt-1.5">
                    <input
                      type="checkbox"
                      checked={exp.currentlyWorking}
                      onChange={(e) =>
                        updateExperience(exp.id, {
                          currentlyWorking: e.target.checked,
                          endDate: e.target.checked ? "" : exp.endDate,
                        })
                      }
                      className="rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
                    />
                    <span className="text-xs text-gray-500">
                      I currently work here
                    </span>
                  </label>
                  {errors[`exp_${i}_endDate`] && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors[`exp_${i}_endDate`]}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className={labelClass}>Description</label>
                  <textarea
                    rows={3}
                    value={exp.description}
                    onChange={(e) =>
                      updateExperience(exp.id, {
                        description: e.target.value,
                      })
                    }
                    placeholder="Describe your key responsibilities and achievements..."
                    className={inputClass("")}
                  />
                </div>
              </div>
            </div>
          ))}

          {formData.workExperience.length < 20 && (
            <button
              type="button"
              onClick={() =>
                setField("workExperience", [
                  ...formData.workExperience,
                  emptyExperience(),
                ])
              }
              className="flex items-center gap-1.5 text-sm text-emerald-600 hover:text-emerald-700 font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Experience
            </button>
          )}
        </div>
      </section>

      {/* ─── Education ─── */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-1">Education</h2>
        <p className="text-xs text-gray-400 mb-4">Optional</p>
        <div className="space-y-4">
          {formData.education.map((edu) => (
            <div
              key={edu.id}
              className="border border-gray-200 rounded-lg p-4 relative"
            >
              <button
                type="button"
                onClick={() => removeEducation(edu.id)}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
                aria-label="Remove education"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className={labelClass}>Degree</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) =>
                      updateEducation(edu.id, { degree: e.target.value })
                    }
                    placeholder="B.S. Computer Science"
                    className={inputClass("")}
                  />
                </div>
                <div>
                  <label className={labelClass}>School</label>
                  <input
                    type="text"
                    value={edu.school}
                    onChange={(e) =>
                      updateEducation(edu.id, { school: e.target.value })
                    }
                    placeholder="MIT"
                    className={inputClass("")}
                  />
                </div>
                <div>
                  <label className={labelClass}>Year</label>
                  <input
                    type="text"
                    value={edu.year}
                    onChange={(e) =>
                      updateEducation(edu.id, { year: e.target.value })
                    }
                    placeholder="2022"
                    className={inputClass("")}
                  />
                </div>
              </div>
            </div>
          ))}

          {formData.education.length < 10 && (
            <button
              type="button"
              onClick={() =>
                setField("education", [
                  ...formData.education,
                  emptyEducation(),
                ])
              }
              className="flex items-center gap-1.5 text-sm text-emerald-600 hover:text-emerald-700 font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Education
            </button>
          )}
        </div>
      </section>

      {/* ─── Skills ─── */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Skills</h2>

        <div className="relative">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleSkillKeyDown}
            placeholder="Type a skill and press Enter or comma"
            disabled={formData.skills.length >= 30}
            className={inputClass("")}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
            {formData.skills.length} / 30
          </span>
        </div>

        {/* Tags */}
        {formData.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {formData.skills.map((skill, i) => (
              <span
                key={`${skill}-${i}`}
                className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-sm px-2.5 py-1 rounded-full"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(i)}
                  className="text-gray-400 hover:text-red-500"
                  aria-label={`Remove ${skill}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Suggestions */}
        {suggestedSkills.length > 0 && (
          <div className="mt-4">
            <p className="text-xs text-gray-500 mb-2">
              Suggested from job description:
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestedSkills.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => addSkill(skill)}
                  className="text-sm px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 transition-colors"
                >
                  + {skill}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ─── Buttons ─── */}
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-4 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleGenerate}
          disabled={!canGenerate}
          className={`flex-1 py-4 rounded-lg text-white text-lg font-semibold transition-colors ${
            canGenerate
              ? "bg-emerald-500 hover:bg-emerald-600"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Generate My Resume
        </button>
      </div>
    </div>
  );
}
