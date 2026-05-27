import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Demo — ResumeAI | AI Tailored Resume in 30 Seconds",
  description:
    "See ResumeAI in action. Paste any job description, get an ATS-optimized tailored resume in 30 seconds. 23-criteria ATS score, career branching, before-after comparison, PDF download.",
  openGraph: {
    title: "ResumeAI Demo — AI Tailored Resume in 30 Seconds",
    description:
      "Walk through 8 product highlights: JD input, AI tailoring, ATS score (23 criteria), career branching, before-after, PDF download, pricing, and CTA.",
    siteName: "ResumeAI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ResumeAI Demo — AI Tailored Resume in 30 Seconds",
    description:
      "Walk through 8 product highlights showing how ResumeAI builds ATS-optimized resumes for any job.",
  },
};

type DemoSection = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

const sections: DemoSection[] = [
  {
    id: "hero",
    eyebrow: "01 / Paste & Go",
    title: "AI Tailored Resume in 30 Seconds",
    description:
      "Paste any job description. ResumeAI extracts every keyword, skill, and requirement — then generates a tailored resume optimized for that exact role. No templates. No guesswork.",
    image: "/gallery/ph-1.png",
    alt: "ResumeAI hero with a job description input box and call-to-action — placeholder",
  },
  {
    id: "ai-tailoring",
    eyebrow: "02 / AI Matching",
    title: "Every Bullet, Tailored to the JD",
    description:
      "Watch your experience get rewritten in real time. The left panel shows the original job description; the right shows your resume bullets aligned to it — same achievements, the right keywords.",
    image: "/gallery/ph-2.png",
    alt: "Side-by-side visualization: job description on the left, AI-tailored resume bullets on the right — placeholder",
  },
  {
    id: "ats-score",
    eyebrow: "03 / ATS Diagnostics",
    title: "ATS Score Across 23 Criteria",
    description:
      "Layout, keywords, action verbs, measurable results, format compatibility, section order, and 17 more. Get a per-criterion score and an actionable checklist — not just a single vague number.",
    image: "/gallery/ph-3.png",
    alt: "ATS score dashboard listing 23 criteria such as layout, keywords, and action verbs — placeholder",
  },
  {
    id: "career-branching",
    eyebrow: "04 / Career Paths",
    title: "Branch Your Career, Not Your Resume",
    description:
      "Targeting a PM role and a senior engineer role at the same time? ResumeAI maintains separate branches of your resume — each tuned to a different audience — so you stop rewriting from scratch.",
    image: "/gallery/ph-4.png",
    alt: "Career branching tree showing separate PM, engineer, and marketer resume variants — placeholder",
  },
  {
    id: "before-after",
    eyebrow: "05 / The Difference",
    title: "Before vs After",
    description:
      "A generic resume sounds like everyone else's. A ResumeAI resume sounds like the job posting answered itself. See a real before-after — same person, same experience, dramatically different impact.",
    image: "/gallery/ph-5.png",
    alt: "Split view comparing a generic resume on the left to a ResumeAI-tailored resume on the right — placeholder",
  },
  {
    id: "pdf-download",
    eyebrow: "06 / Export",
    title: "Pixel-Perfect PDF, One Click",
    description:
      "Preview the final layout, pick a template, and download as PDF or DOCX. ATS-friendly fonts, clean spacing, no parser-breaking quirks — ready to upload to LinkedIn, Workday, or Greenhouse.",
    image: "/gallery/ph-6.png",
    alt: "Resume PDF preview with a prominent download button — placeholder",
  },
  {
    id: "pricing",
    eyebrow: "07 / Simple Pricing",
    title: "Pay Once. No Subscription.",
    description:
      "Free to build with full AI. $9 to download your first resume. $19 for unlimited downloads, DOCX, and an AI cover letter for 30 days. No auto-renewal. No tricks.",
    image: "/gallery/ph-7.png",
    alt: "Pricing summary card showing Free, Basic $9, and Pro $19 tiers — placeholder",
  },
  {
    id: "cta",
    eyebrow: "08 / Get Started",
    title: "Get Your Tailored Resume Now",
    description:
      "Your next interview is one tailored resume away. Start free, see the result, and decide. No credit card to build. No subscription ever.",
    image: "/gallery/ph-8.png",
    alt: "Final call-to-action prompting users to start building their resume — placeholder",
  },
];

export default function DemoPage() {
  return (
    <main className="bg-gray-950 text-white">
      {/* Page header */}
      <section className="pt-28 pb-12 md:pt-36 md:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400 ring-1 ring-emerald-500/20">
            Product Demo
          </span>
          <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            See ResumeAI{" "}
            <span className="text-emerald-500">in 30 seconds</span>.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Eight product highlights — from pasting a job description to
            downloading an ATS-optimized PDF. No signup required.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              href="/builder"
              className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg text-base font-semibold transition-colors"
            >
              Try It Free
            </Link>
            <Link
              href="/pricing"
              className="inline-block bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-lg text-base font-semibold transition-colors ring-1 ring-white/10"
            >
              See Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Demo sections */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col gap-16 md:gap-24">
            {sections.map((section, i) => {
              const isReversed = i % 2 === 1;
              return (
                <article
                  key={section.id}
                  id={section.id}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center scroll-mt-24"
                >
                  <div
                    className={
                      isReversed
                        ? "order-1 md:order-2"
                        : "order-1 md:order-1"
                    }
                  >
                    <div className="overflow-hidden rounded-2xl ring-1 ring-white/10 bg-gray-900 shadow-2xl">
                      <Image
                        src={section.image}
                        alt={section.alt}
                        width={1200}
                        height={675}
                        className="w-full h-auto"
                        priority={i === 0}
                      />
                    </div>
                  </div>
                  <div
                    className={
                      isReversed
                        ? "order-2 md:order-1"
                        : "order-2 md:order-2"
                    }
                  >
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                      {section.eyebrow}
                    </span>
                    <h2 className="mt-3 text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                      {section.title}
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-gray-400 leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA strip */}
      <section className="border-t border-white/10 py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Ready to build yours?
          </h2>
          <p className="mt-4 text-gray-400">
            Free to build. $9 to download. No subscription, ever.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              href="/builder"
              className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Build My Resume Free
            </Link>
            <Link
              href="/pricing"
              className="inline-block bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors ring-1 ring-white/10"
            >
              See Pricing
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Pay once. No subscription. No auto-renewal.
          </p>
        </div>
      </section>
    </main>
  );
}
