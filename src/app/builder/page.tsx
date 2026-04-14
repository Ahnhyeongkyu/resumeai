"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ResumePreview from "@/components/ResumePreview";
import ATSScore from "@/components/ATSScore";
import { TEMPLATES, type TemplateId } from "@/lib/resume-templates";
import type { GeneratedResume, ATSScoreResult } from "@/lib/claude";
import { Loader2, Download, Sparkles, ChevronRight, RefreshCw, AlertCircle } from "lucide-react";

const SAMPLE_JDS: Record<string, string> = {
  "Software Engineer": `Software Engineer at TechCorp\n\nWe are looking for a Software Engineer to join our team. You will design, develop, and maintain scalable web applications.\n\nRequirements:\n- 3+ years experience with React, TypeScript, and Node.js\n- Experience with AWS (EC2, S3, Lambda)\n- Proficiency in SQL and NoSQL databases\n- Experience with CI/CD pipelines and Agile methodology\n- Strong problem-solving and communication skills`,
  "Marketing Manager": `Marketing Manager at GrowthStartup\n\nWe need a data-driven Marketing Manager to own our growth strategy.\n\nRequirements:\n- 3+ years in digital marketing\n- Experience with SEO, PPC (Google Ads, Facebook Ads)\n- Proficiency in Google Analytics, HubSpot\n- Content strategy and email marketing experience\n- Track record of driving measurable ROI`,
  "Data Scientist": `Data Scientist at DataCo\n\nJoin our data team to build ML models and drive data-informed decisions.\n\nRequirements:\n- MS/PhD in Statistics, CS, or related field\n- Strong Python, SQL, and R skills\n- Experience with TensorFlow/PyTorch\n- NLP and deep learning experience preferred\n- Excellent data visualization and communication skills`,
  "Product Manager": `Product Manager at ProductCo\n\nOwn the product roadmap and drive execution across engineering and design.\n\nRequirements:\n- 3+ years PM experience\n- Experience with Agile/Scrum methodologies\n- Strong data analysis skills (SQL, analytics tools)\n- User research and A/B testing experience\n- Excellent stakeholder management and communication`,
  "Graphic Designer": `Graphic Designer at CreativeAgency\n\nCreate stunning visual content across digital and print channels.\n\nRequirements:\n- 2+ years graphic design experience\n- Expert in Adobe Creative Suite (Photoshop, Illustrator, InDesign)\n- Strong typography and layout skills\n- Experience with brand identity and marketing collateral\n- Portfolio demonstrating range and creativity`,
};

export default function BuilderPage() {
  const [step, setStep] = useState<"input" | "preview">("input");
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState("");
  const [scoringLoading, setScoringLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [jobDescription, setJobDescription] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [experienceSummary, setExperienceSummary] = useState("");

  const [resume, setResume] = useState<GeneratedResume | null>(null);
  const [atsScore, setAtsScore] = useState<ATSScoreResult | null>(null);
  const [template, setTemplate] = useState<TemplateId>("classic");
  const [showSuccess, setShowSuccess] = useState(false);

  const confettiRef = useRef(false);

  // Auto-save to localStorage
  useEffect(() => {
    const saved = localStorage.getItem("resumeai-draft");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.jobDescription) setJobDescription(data.jobDescription);
        if (data.fullName) setFullName(data.fullName);
        if (data.email) setEmail(data.email);
        if (data.phone) setPhone(data.phone);
        if (data.experienceSummary) setExperienceSummary(data.experienceSummary);
      } catch { /* ignore parse errors */ }
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("resumeai-draft", JSON.stringify({ jobDescription, fullName, email, phone, experienceSummary }));
    }, 500);
    return () => clearTimeout(timer);
  }, [jobDescription, fullName, email, phone, experienceSummary]);

  // Confetti on success
  useEffect(() => {
    if (showSuccess && !confettiRef.current) {
      confettiRef.current = true;
      import("canvas-confetti").then((mod) => {
        mod.default({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      });
      setTimeout(() => setShowSuccess(false), 3000);
    }
  }, [showSuccess]);

  // Non-English detection
  const isNonEnglish = (text: string) => {
    const nonLatinRatio = (text.match(/[^\u0000-\u024F\s]/g) || []).length / text.length;
    return nonLatinRatio > 0.3;
  };

  const handleGenerate = useCallback(async (retryCount = 0) => {
    if (!jobDescription.trim() || !fullName.trim()) return;

    if (isNonEnglish(jobDescription)) {
      setError("Currently, ResumeAI supports English only. Please paste an English job description.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      setLoadingStage("Analyzing job description...");
      await new Promise((r) => setTimeout(r, 500));

      setLoadingStage("Tailoring your resume...");
      const res = await fetch("/api/generate-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription, fullName, email, phone, experienceSummary }),
      });

      if (!res.ok) throw new Error("Generation failed");

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setResume(data);
      setStep("preview");
      setShowSuccess(true);
      confettiRef.current = false;

      // Auto-score
      setLoadingStage("Calculating ATS score...");
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
    } catch (err) {
      if (retryCount < 2) {
        setLoadingStage("Retrying...");
        await new Promise((r) => setTimeout(r, 1000));
        return handleGenerate(retryCount + 1);
      }
      setError("Failed to generate resume. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
      setLoadingStage("");
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
      } else {
        setError("Failed to create checkout session. Please try again.");
      }
    } catch {
      setError("Payment error. Please try again.");
    }
  };

  const loadSampleJD = (title: string) => {
    setJobDescription(SAMPLE_JDS[title] || "");
  };

  // Check for successful payment return
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "true") {
      setShowSuccess(true);
      confettiRef.current = false;
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Success banner */}
        {showSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 text-center animate-fade-in">
            <p className="text-green-700 font-semibold">Your resume is ready!</p>
          </div>
        )}

        {/* Error banner */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
            <p className="text-red-700 text-sm flex-1">{error}</p>
            <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600">&times;</button>
          </div>
        )}

        {step === "input" ? (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900">Build Your ATS-Optimized Resume</h1>
              <p className="text-gray-600 mt-2">Paste a job description and let AI tailor your resume in 30 seconds.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 space-y-5">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Job Description <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-1 flex-wrap">
                    {Object.keys(SAMPLE_JDS).map((title) => (
                      <button
                        key={title}
                        onClick={() => loadSampleJD(title)}
                        className="text-xs text-blue-600 hover:text-blue-700 px-2 py-0.5 rounded border border-blue-200 hover:bg-blue-50 transition"
                      >
                        {title}
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  rows={6}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the full job listing here, or click a sample above..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
                {jobDescription && (
                  <p className="text-xs text-gray-400 mt-1">{jobDescription.split(/\s+/).length} words</p>
                )}
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
                  {!experienceSummary && (
                    <span className="text-xs text-gray-400 font-normal ml-2">
                      (leave empty for entry-level / new grad)
                    </span>
                  )}
                </label>
                <textarea
                  rows={4}
                  value={experienceSummary}
                  onChange={(e) => setExperienceSummary(e.target.value)}
                  placeholder="Brief summary of your work experience, skills, and achievements. For entry-level, describe projects, internships, or coursework..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
              </div>

              <button
                onClick={() => handleGenerate()}
                disabled={loading || !jobDescription.trim() || !fullName.trim()}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {loadingStage || "Generating..."}
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate My Resume
                  </>
                )}
              </button>

              {loading && (
                <div className="space-y-2">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-blue-600 h-1.5 rounded-full animate-pulse" style={{ width: loadingStage.includes("ATS") ? "90%" : loadingStage.includes("Tailoring") ? "60%" : "30%" }} />
                  </div>
                  <p className="text-xs text-gray-400 text-center">{loadingStage}</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setStep("input")}
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                Back to editor
              </button>
              <button
                onClick={() => { setStep("input"); setResume(null); setAtsScore(null); }}
                className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
              >
                <RefreshCw className="w-4 h-4" />
                Build Another
              </button>
            </div>

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
                    Go Pro — $9/mo (Unlimited + Cover Letter)
                  </button>
                  <p className="text-xs text-center text-gray-400">Secure payment via Stripe</p>
                </div>

                {/* Share */}
                {atsScore && (
                  <div className="bg-white rounded-xl shadow-lg p-4 text-center">
                    <p className="text-xs text-gray-500 mb-2">Share your score</p>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`My resume scored ${atsScore.score}/100 on ATS! Check yours:`)}&url=${encodeURIComponent(`${typeof window !== "undefined" ? window.location.origin : ""}/share/${atsScore.score}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Share on Twitter/X
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
