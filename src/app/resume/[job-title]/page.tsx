import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pseoJobs, getPseoJob } from "@/data/pseo";
import AffiliateCards from "@/components/shared/AffiliateCards";
import { getJobAffiliates } from "@/lib/affiliates";

export function generateStaticParams() {
  return pseoJobs.map((job) => ({ "job-title": job.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ "job-title": string }>;
}): Promise<Metadata> {
  const { "job-title": slug } = await params;
  const job = getPseoJob(slug);
  if (!job) return { title: "Not Found" };

  return {
    title: job.metaTitle,
    description: job.metaDescription,
    other: {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: job.metaTitle,
        description: job.metaDescription,
        url: `https://resumeai.site/resume/${job.slug}`,
        publisher: {
          "@type": "Organization",
          name: "ResumeAI",
          url: "https://resumeai.site",
        },
      }),
    },
  };
}

function SkillCard({ name, description }: { name: string; description: string }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
    </div>
  );
}

function TipAccordion({
  tips,
}: {
  tips: { title: string; content: string }[];
}) {
  return (
    <div className="space-y-3">
      {tips.map((tip, i) => (
        <details
          key={i}
          className="group rounded-lg border border-gray-200 bg-white"
          {...(i === 0 ? { open: true } : {})}
        >
          <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-left font-medium text-gray-900 hover:bg-gray-50 [&::-webkit-details-marker]:hidden">
            <span>{tip.title}</span>
            <svg
              className="ml-3 h-5 w-5 flex-shrink-0 text-gray-400 transition-transform duration-200 group-open:rotate-45"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </summary>
          <div className="px-5 pb-4 text-gray-600">{tip.content}</div>
        </details>
      ))}
    </div>
  );
}

export default async function PseoPage({
  params,
}: {
  params: Promise<{ "job-title": string }>;
}) {
  const { "job-title": slug } = await params;
  const job = getPseoJob(slug);

  if (!job) notFound();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-20">
        {/* Hero */}
        <section className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            {job.title} Resume Builder — ATS-Optimized
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Build a professional {job.title.toLowerCase()} resume with AI-powered content,
            ATS-optimized formatting, and industry-specific keywords.
          </p>
        </section>

        {/* Skills */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900">
            Top Skills for {job.title} in 2026
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {job.skills.map((skill) => (
              <SkillCard key={skill.name} {...skill} />
            ))}
          </div>
        </section>

        {/* Tips */}
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Resume Writing Tips for {job.title}
          </h2>
          <TipAccordion tips={job.tips} />
        </section>

        {/* Sample Summary */}
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Sample Professional Summary
          </h2>
          <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white p-6">
            <p className="text-gray-600 blur-sm select-none">{job.sampleSummary}</p>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70">
              <p className="text-lg font-semibold text-gray-900">
                Build your own — it&apos;s free
              </p>
              <Link
                href="/builder"
                className="mt-3 inline-flex items-center rounded-lg bg-emerald-500 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-600"
              >
                Create My Resume
              </Link>
            </div>
          </div>
        </section>

        {/* Keywords */}
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Must-Have Keywords</h2>
          <div className="flex flex-wrap gap-2">
            {job.keywords.map((keyword) => (
              <span
                key={keyword}
                className="rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700 border border-emerald-100"
              >
                {keyword}
              </span>
            ))}
          </div>
        </section>

        {/* Affiliate Sidebar */}
        <section className="mt-16">
          <AffiliateCards
            source={`pseo_${job.slug}`}
            affiliates={getJobAffiliates(job.slug)}
            title={`Resources for ${job.title}s`}
          />
        </section>

        {/* CTA */}
        <section className="mt-16 rounded-2xl bg-emerald-500 p-8 text-center text-white sm:p-12">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Ready to Build Your {job.title} Resume?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-emerald-100">
            Our AI resume builder uses these skills and keywords to create a tailored,
            ATS-optimized resume in minutes.
          </p>
          <Link
            href="/builder"
            className="mt-6 inline-flex items-center rounded-lg bg-white px-8 py-3 text-base font-semibold text-emerald-600 shadow-sm transition hover:bg-emerald-50"
          >
            Build My Resume — Free
          </Link>
        </section>

        {/* Related Jobs */}
        <section className="mt-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Related Resume Builders</h2>
          <div className="flex flex-wrap gap-3">
            {job.relatedJobs.map((relSlug) => {
              const related = pseoJobs.find((j) => j.slug === relSlug);
              if (!related) return null;
              return (
                <Link
                  key={relSlug}
                  href={`/resume/${relSlug}`}
                  className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-emerald-300 hover:text-emerald-600"
                >
                  {related.title}
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
