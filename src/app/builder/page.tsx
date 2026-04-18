"use client";

import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";

import ProgressBar from "@/components/builder/ProgressBar";
import StepJD from "@/components/builder/StepJD";
import StepInfo, { type FormData } from "@/components/builder/StepInfo";
import StepGenerating from "@/components/builder/StepGenerating";
import StepResult from "@/components/builder/StepResult";
import ResumePreview from "@/components/builder/ResumePreview";
import DownloadBar from "@/components/builder/DownloadBar";
import PostPaymentRecovery from "@/components/builder/PostPaymentRecovery";
import { trackEvent } from "@/lib/analytics";

/* ─── Types ─── */

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

/* ─── Defaults ─── */

function defaultFormData(): FormData {
  return {
    name: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    careerSituation: "",
    workExperience: [
      {
        id: Math.random().toString(36).slice(2, 10),
        jobTitle: "",
        company: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
        description: "",
      },
    ],
    education: [],
    skills: [],
  };
}

/* ─── localStorage helpers ─── */

const DRAFT_KEY = "resumeai_builder_draft";
const DRAFT_EXPIRY_DAYS = 7;

function saveDraft(data: {
  jobDescription: string;
  formData: FormData;
  selectedTemplate: string;
}) {
  try {
    const payload = {
      ...data,
      savedAt: Date.now(),
    };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(payload));
  } catch {
    // localStorage may be full or unavailable
  }
}

function loadDraft(): {
  jobDescription: string;
  formData: FormData;
  selectedTemplate: string;
} | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const age = Date.now() - (parsed.savedAt || 0);
    if (age > DRAFT_EXPIRY_DAYS * 24 * 60 * 60 * 1000) {
      localStorage.removeItem(DRAFT_KEY);
      return null;
    }
    return {
      jobDescription: parsed.jobDescription || "",
      formData: parsed.formData || defaultFormData(),
      selectedTemplate: parsed.selectedTemplate || "Classic",
    };
  } catch {
    return null;
  }
}

/* ─── Inner component (needs useSearchParams inside Suspense) ─── */

function BuilderInner() {
  const searchParams = useSearchParams();

  /* ─── State ─── */
  const [currentStep, setCurrentStep] = useState(1);
  const [jobDescription, setJobDescription] = useState("");
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [generatedResume, setGeneratedResume] = useState<GeneratedResume | null>(null);
  const [atsScore, setAtsScore] = useState<ATSScore | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState("Classic");
  const [paidPlan, setPaidPlan] = useState<"none" | "basic" | "pro">("none");
  const [mobileTab, setMobileTab] = useState<"edit" | "preview">("edit");
  const [resumeId, setResumeId] = useState("");

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  /* ─── Load draft on mount ─── */
  useEffect(() => {
    trackEvent("builder_start");
    const draft = loadDraft();
    if (draft) {
      setJobDescription(draft.jobDescription);
      setFormData(draft.formData);
      setSelectedTemplate(draft.selectedTemplate);
    }
  }, []);

  /* ─── Handle payment callback ─── */
  useEffect(() => {
    const success = searchParams.get("success");
    const plan = searchParams.get("plan");
    const rid = searchParams.get("resumeId");

    if (success === "true" && plan) {
      const newPlan = plan === "pro" ? "pro" : "basic";
      setPaidPlan(newPlan);
      if (rid) setResumeId(rid);
      setCurrentStep(4);
      trackEvent("purchase", { plan: newPlan, resume_id: rid });
    }

    if (searchParams.get("canceled") === "true") {
      setCurrentStep(4);
    }
  }, [searchParams]);

  /* ─── Debounced draft save ─── */
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      saveDraft({ jobDescription, formData, selectedTemplate });
    }, 5000);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [jobDescription, formData, selectedTemplate]);

  /* ─── Handlers ─── */

  const handleGenComplete = useCallback(
    (resume: GeneratedResume, score: ATSScore, newResumeId?: string) => {
      setGeneratedResume(resume);
      setAtsScore(score);
      const rid = newResumeId || Math.random().toString(36).slice(2, 14);
      setResumeId(rid);
      setCurrentStep(4);
      trackEvent("generate_complete", { ats_score: score.overall, resume_id: rid });
    },
    []
  );

  const handleResumeEdit = useCallback((resume: GeneratedResume) => {
    setGeneratedResume(resume);
  }, []);

  /* ─── Step renderer ─── */

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepJD
            jobDescription={jobDescription}
            onJobDescriptionChange={setJobDescription}
            onNext={() => setCurrentStep(2)}
          />
        );
      case 2:
        return (
          <StepInfo
            formData={formData}
            onChange={setFormData}
            onGenerate={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
            jobDescription={jobDescription}
          />
        );
      case 3:
        return (
          <StepGenerating
            formData={formData}
            jobDescription={jobDescription}
            onComplete={handleGenComplete}
            onCancel={() => setCurrentStep(2)}
          />
        );
      case 4:
        return generatedResume && atsScore ? (
          <StepResult
            resume={generatedResume}
            atsScore={atsScore}
            selectedTemplate={selectedTemplate}
            onTemplateChange={setSelectedTemplate}
            onResumeEdit={handleResumeEdit}
          />
        ) : null;
      default:
        return null;
    }
  };

  // If user returned from Gumroad success but has no in-memory resume (direct link, new session),
  // show a lightweight recovery screen that accepts email and downloads from DB.
  const returnedFromPayment = paidPlan !== "none" && !generatedResume;
  if (returnedFromPayment) {
    return (
      <PostPaymentRecovery defaultEmail={formData.email} defaultPlan={paidPlan as "basic" | "pro"} />
    );
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Transparency banner */}
      <div className="text-xs text-gray-500 text-center py-1 bg-gray-50 border-b border-gray-200">
        Free to build. $9 to download.
      </div>

      {/* Progress bar */}
      <ProgressBar currentStep={currentStep} />

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Mobile tabs */}
        <div className="flex flex-col w-full md:hidden">
          <div className="flex border-b border-gray-200">
            <button
              type="button"
              onClick={() => setMobileTab("edit")}
              className={`flex-1 py-2 text-sm font-medium text-center ${
                mobileTab === "edit"
                  ? "text-emerald-600 border-b-2 border-emerald-500"
                  : "text-gray-500"
              }`}
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => setMobileTab("preview")}
              className={`flex-1 py-2 text-sm font-medium text-center ${
                mobileTab === "preview"
                  ? "text-emerald-600 border-b-2 border-emerald-500"
                  : "text-gray-500"
              }`}
            >
              Preview
            </button>
          </div>
          <div className="flex-1 overflow-auto">
            {mobileTab === "edit" ? (
              renderStep()
            ) : (
              <ResumePreview
                formData={formData}
                generatedResume={generatedResume}
                selectedTemplate={selectedTemplate}
                isPaid={paidPlan !== "none"}
              />
            )}
          </div>
        </div>

        {/* Desktop split view */}
        <div className="hidden md:flex flex-1">
          {/* Left panel: input (40%) */}
          <div className="w-[40%] overflow-auto border-r border-gray-200">
            {renderStep()}
          </div>

          {/* Right panel: preview (60%) */}
          <div className="w-[60%] overflow-hidden">
            <ResumePreview
              formData={formData}
              generatedResume={generatedResume}
              selectedTemplate={selectedTemplate}
              isPaid={paidPlan !== "none"}
            />
          </div>
        </div>
      </div>

      {/* Download bar (only on step 4) */}
      {currentStep === 4 && atsScore && (
        <DownloadBar
          atsScore={atsScore.overall}
          resumeId={resumeId}
          email={formData.email}
          paidPlan={paidPlan}
          resume={generatedResume}
          personalInfo={{
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            location: formData.location,
            linkedin: formData.linkedin,
          }}
        />
      )}
    </div>
  );
}

/* ─── Page (wraps inner with Suspense for useSearchParams) ─── */

export default function BuilderPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <BuilderInner />
    </Suspense>
  );
}
