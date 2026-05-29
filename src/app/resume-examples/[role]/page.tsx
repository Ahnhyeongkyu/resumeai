import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  resumeExamples,
  getResumeExample,
} from "@/data/resume-examples";

const BASE_URL = "https://getresumeai.site";

export function generateStaticParams() {
  return resumeExamples.map((e) => ({ role: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ role: string }>;
}): Promise<Metadata> {
  const { role } = await params;
  const example = getResumeExample(role);
  if (!example) return { title: "Not Found" };

  const canonical = `${BASE_URL}/resume-examples/${example.slug}`;
  return {
    title: example.metaTitle,
    description: example.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: example.metaTitle,
      description: example.metaDescription,
      url: canonical,
      type: "article",
    },
    other: {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: example.metaTitle,
        description: example.metaDescription,
        url: canonical,
        publisher: {
          "@type": "Organization",
          name: "ResumeAI",
          url: BASE_URL,
        },
      }),
    },
  };
}

export default async function ResumeExamplePage({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role } = await params;
  const example = getResumeExample(role);

  if (!example) notFound();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-20">
        {/* Hero */}
        <section className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            {example.role} Resume Example
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            A real, ATS-friendly {example.role.toLowerCase()} resume example — summary, experience
            bullets, skills, and keywords you can copy and adapt in minutes.
          </p>
        </section>

        {/* Example resume card */}
        <section className="mt-14 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {example.role} Resume — Example
            </h2>
          </div>
          <div className="space-y-8 p-6 sm:p-8">
            {/* Summary */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
                Professional Summary
              </h3>
              <p className="mt-2 leading-relaxed text-gray-700">{example.summary}</p>
            </div>

            {/* Experience bullets */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
                Experience — Example Bullet Points
              </h3>
              <ul className="mt-3 space-y-2.5">
                {example.experienceBullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2 text-gray-700">
                    <span className="mt-1 text-emerald-500" aria-hidden>
                      ▸
                    </span>
                    <span className="leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
                Skills
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {example.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ATS keywords */}
        <section className="mt-16">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            ATS Keywords for {example.role}s
          </h2>
          <p className="mb-6 text-gray-600">
            Applicant tracking systems scan for these exact terms — weave them naturally into your
            summary, skills, and experience.
          </p>
          <div className="flex flex-wrap gap-2">
            {example.atsKeywords.map((keyword) => (
              <span
                key={keyword}
                className="rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700"
              >
                {keyword}
              </span>
            ))}
          </div>
        </section>

        {/* Why this example works */}
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Why This Example Works</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {example.whatWorks.map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
              >
                <h3 className="text-base font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{item.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 rounded-2xl bg-emerald-500 p-8 text-center text-white sm:p-12">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Build Your {example.role} Resume in Minutes
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-emerald-100">
            Paste a job description and our AI tailors a resume like this one — ATS-optimized, with
            the right keywords for the role.
          </p>
          <Link
            href="/builder"
            className="mt-6 inline-flex items-center rounded-lg bg-white px-8 py-3 text-base font-semibold text-emerald-600 shadow-sm transition hover:bg-emerald-50"
          >
            Create My Resume — Free
          </Link>
        </section>

        {/* Related examples */}
        <section className="mt-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900">More Resume Examples</h2>
          <div className="flex flex-wrap gap-3">
            {example.related.map((relSlug) => {
              const related = getResumeExample(relSlug);
              if (!related) return null;
              return (
                <Link
                  key={relSlug}
                  href={`/resume-examples/${relSlug}`}
                  className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-emerald-300 hover:text-emerald-600"
                >
                  {related.role}
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
