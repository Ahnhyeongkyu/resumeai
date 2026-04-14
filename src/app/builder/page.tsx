"use client";

import { useState, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ResumePreview from "@/components/ResumePreview";
import ATSScore from "@/components/ATSScore";
import { TEMPLATES, type TemplateId } from "@/lib/resume-templates";
import type { GeneratedResume, ATSScoreResult } from "@/lib/claude";
import { Loader2, Download, Sparkles, ChevronRight } from "lucide-react";

export default function BuilderPage() {
  const [step, setStep] = useState<"input" | "preview">("input");
  const [loading, setLoading] = useState(false);
  const [scoringLoading, setScoringLoading] = useState(false);

  // Form state
  const [jobDescription, setJobDescription] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [experienceSummary, setExperienceSummary] = useState("");

  // Result state
  const [resume, setResume] = useState<GeneratedResume | null>(null);
  const [atsScore, setAtsScore] = useState<ATSScoreResult | null>(null);
  const [template, setTemplate] = useState<TemplateId>("classic");

  const handleGenerate = useCallback(async () => {
    if (!jobDescription.trim() || !fullName.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/generate-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription, fullName, email, phone, experienceSummary }),
      });
      const data = await res.json();
      if (res.ok) {
        setResume(data);
        setStep("preview");

        // Auto-score
        setScoringLoading(true);
        const scoreRes = await fetch("/api/ats-score", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resume: data, jobDescription }),
        });
        if (scoreRes.ok) {
          setAtsScore(await scoreRes.json());
        }
        setScoringLoading(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [jobDescription, fullName, email, phone, experienceSummary]);

  const handleDownload = async (plan: "one_time" | "pro") => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, resumeData: { resume, fullName, email, phone, template } }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {step === "input" ? (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900">Build Your ATS-Optimized Resume</h1>
              <p className="text-gray-600 mt-2">Paste a job description and let AI tailor your resume in 30 seconds.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={6}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the full job listing here..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Experience Summary
                </label>
                <textarea
                  rows={4}
                  value={experienceSummary}
                  onChange={(e) => setExperienceSummary(e.target.value)}
                  placeholder="Brief summary of your work experience, skills, and achievements..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading || !jobDescription.trim() || !fullName.trim()}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating your resume...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate My Resume
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <button
              onClick={() => setStep("input")}
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              Back to editor
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Resume Preview */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  {TEMPLATES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTemplate(t.id)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition ${
                        template === t.id
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-600 border-gray-300 hover:border-blue-300"
                      }`}
                    >
                      {t.name}
                    </button>
                  ))}
                </div>

                {resume && (
                  <ResumePreview
                    resume={resume}
                    fullName={fullName}
                    email={email}
                    phone={phone}
                    template={template}
                    watermark={true}
                  />
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                {/* ATS Score */}
                {scoringLoading ? (
                  <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                    <span className="text-sm text-gray-600">Calculating ATS score...</span>
                  </div>
                ) : atsScore ? (
                  <ATSScore score={atsScore} />
                ) : null}

                {/* Download CTA */}
                <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
                  <h3 className="font-semibold text-gray-900">Download Your Resume</h3>
                  <p className="text-xs text-gray-500">
                    Preview is free. Download a clean PDF without watermarks.
                  </p>
                  <button
                    onClick={() => handleDownload("one_time")}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF — $19
                  </button>
                  <button
                    onClick={() => handleDownload("pro")}
                    className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
                  >
                    Go Pro — $9/mo (Unlimited)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
