import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { competitors, getCompetitor, ourData } from "@/data/alternatives";

export function generateStaticParams() {
  return competitors.map((c) => ({ competitor: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ competitor: string }>;
}): Promise<Metadata> {
  const { competitor: slug } = await params;
  const comp = getCompetitor(slug);
  if (!comp) return { title: "Not Found" };

  return {
    title: `ResumeAI vs ${comp.name} — Which Resume Builder is Better?`,
    description: `Compare ResumeAI and ${comp.name} side by side. See pricing, features, and why ResumeAI's one-time payment beats ${comp.name}'s ${comp.price} subscription.`,
  };
}

function CheckIcon() {
  return (
    <svg
      className="h-5 w-5 text-emerald-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      className="h-5 w-5 text-red-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ competitor: string }>;
}) {
  const { competitor: slug } = await params;
  const comp = getCompetitor(slug);

  if (!comp) notFound();

  const featureKeys = Object.keys(ourData.features);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-20">
        {/* Hero */}
        <section className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            ResumeAI vs {comp.name}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Which resume builder is better? See the full comparison below.
          </p>
        </section>

        {/* Price Comparison */}
        <section className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Price Comparison</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border-2 border-emerald-500 bg-white p-6">
              <div className="text-sm font-medium text-emerald-600">ResumeAI</div>
              <div className="mt-2 text-3xl font-bold text-gray-900">{ourData.price}</div>
              <div className="mt-1 text-sm text-gray-500">
                No subscription. No auto-renewal.
              </div>
              <div className="mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                Total cost after 1 year: $9
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="text-sm font-medium text-gray-500">{comp.name}</div>
              <div className="mt-2 text-3xl font-bold text-gray-900">{comp.price}</div>
              <div className="mt-1 text-sm text-gray-500">
                Recurring subscription. Auto-renews.
              </div>
              <div className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                Total cost after 1 year: {comp.priceYearly}
              </div>
            </div>
          </div>
        </section>

        {/* Feature Comparison - Desktop Table */}
        <section className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Feature Comparison</h2>

          {/* Desktop table */}
          <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white sm:block">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-4 text-sm font-semibold text-gray-900">Feature</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-emerald-600">
                    ResumeAI
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-500">
                    {comp.name}
                  </th>
                </tr>
              </thead>
              <tbody>
                {featureKeys.map((feature, i) => (
                  <tr
                    key={feature}
                    className={i < featureKeys.length - 1 ? "border-b border-gray-100" : ""}
                  >
                    <td className="px-6 py-3.5 text-sm text-gray-700">{feature}</td>
                    <td className="px-6 py-3.5 text-center">
                      <span className="inline-flex justify-center">
                        {ourData.features[feature] ? <CheckIcon /> : <XIcon />}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-center">
                      <span className="inline-flex justify-center">
                        {comp.features[feature] ? <CheckIcon /> : <XIcon />}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="space-y-4 sm:hidden">
            {featureKeys.map((feature) => (
              <div
                key={feature}
                className="rounded-lg border border-gray-200 bg-white p-4"
              >
                <div className="text-sm font-medium text-gray-900">{feature}</div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    {ourData.features[feature] ? <CheckIcon /> : <XIcon />}
                    <span className="text-gray-600">ResumeAI</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {comp.features[feature] ? <CheckIcon /> : <XIcon />}
                    <span className="text-gray-600">{comp.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key Difference */}
        <section className="mt-12 rounded-xl border border-amber-200 bg-amber-50 p-6">
          <h3 className="text-lg font-semibold text-amber-900">The Key Difference</h3>
          <p className="mt-2 text-amber-800">
            {comp.name} charges <strong>{comp.price}</strong> as a recurring subscription that
            auto-renews, costing you <strong>{comp.priceYearly}</strong> per year. ResumeAI
            charges a one-time fee of <strong>$9</strong> (Basic) or <strong>$19</strong>{" "}
            (Pro) with no subscription, no auto-renewal, and no surprises. You pay once, get
            your resume, and you&apos;re done.
          </p>
        </section>

        {/* CTA */}
        <section className="mt-12 rounded-2xl bg-emerald-500 p-8 text-center text-white sm:p-12">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Try ResumeAI Free — No Credit Card Required
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-emerald-100">
            Build your resume with AI, check your ATS score, and preview your resume — all
            free. Only pay when you&apos;re ready to download.
          </p>
          <Link
            href="/builder"
            className="mt-6 inline-flex items-center rounded-lg bg-white px-8 py-3 text-base font-semibold text-emerald-600 shadow-sm transition hover:bg-emerald-50"
          >
            Start Building — Free
          </Link>
        </section>

        {/* Other Comparisons */}
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Other Comparisons</h2>
          <div className="flex flex-wrap gap-3">
            {competitors
              .filter((c) => c.slug !== slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/alternatives/${c.slug}`}
                  className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-emerald-300 hover:text-emerald-600"
                >
                  ResumeAI vs {c.name}
                </Link>
              ))}
          </div>
        </section>
      </div>
    </main>
  );
}
