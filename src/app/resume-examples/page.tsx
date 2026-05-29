import type { Metadata } from "next";
import Link from "next/link";
import { resumeExamples } from "@/data/resume-examples";

const BASE_URL = "https://getresumeai.site";

export const metadata: Metadata = {
  title: "Resume Examples by Role (2026) — ATS-Friendly Samples | ResumeAI",
  description:
    "Free resume examples by job role — software engineer, nurse, product manager, data analyst, accountant. Real summaries, experience bullets, and ATS keywords you can copy.",
  alternates: { canonical: `${BASE_URL}/resume-examples` },
  openGraph: {
    title: "Resume Examples by Role (2026) — ATS-Friendly Samples | ResumeAI",
    description:
      "Free resume examples by job role with real bullets and ATS keywords you can copy and adapt.",
    url: `${BASE_URL}/resume-examples`,
    type: "website",
  },
};

export default function ResumeExamplesIndexPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-20">
        <section className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Resume Examples by Role
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Real, ATS-friendly resume examples with metric-driven bullet points and the keywords
            recruiters scan for. Pick your role, copy what fits, and tailor it in minutes.
          </p>
        </section>

        <section className="mt-14 grid gap-4 sm:grid-cols-2">
          {resumeExamples.map((example) => (
            <Link
              key={example.slug}
              href={`/resume-examples/${example.slug}`}
              className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-emerald-300"
            >
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600">
                {example.role} Resume Example
              </h2>
              <p className="mt-2 line-clamp-2 text-sm text-gray-600">{example.summary}</p>
              <span className="mt-4 inline-block text-sm font-medium text-emerald-600">
                View example →
              </span>
            </Link>
          ))}
        </section>

        <section className="mt-16 rounded-2xl bg-emerald-500 p-8 text-center text-white sm:p-12">
          <h2 className="text-2xl font-bold sm:text-3xl">Skip the Blank Page</h2>
          <p className="mx-auto mt-3 max-w-xl text-emerald-100">
            Paste a job description and our AI drafts a tailored, ATS-optimized resume for your
            role in under a minute.
          </p>
          <Link
            href="/builder"
            className="mt-6 inline-flex items-center rounded-lg bg-white px-8 py-3 text-base font-semibold text-emerald-600 shadow-sm transition hover:bg-emerald-50"
          >
            Create My Resume — Free
          </Link>
        </section>
      </div>
    </main>
  );
}
