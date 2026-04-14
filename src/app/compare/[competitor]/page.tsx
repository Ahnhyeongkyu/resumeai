import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { COMPETITORS } from "@/lib/competitors";
import { Check, X, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ competitor: string }>;
}

export async function generateStaticParams() {
  return COMPETITORS.map((c) => ({ competitor: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { competitor: slug } = await params;
  const comp = COMPETITORS.find((c) => c.slug === slug);
  if (!comp) return {};

  return {
    title: `ResumeAI vs ${comp.name} — Which is Better? (2026 Comparison)`,
    description: `Compare ResumeAI vs ${comp.name}: features, pricing, and ATS optimization. See why job seekers choose ResumeAI's $19 one-time plan over ${comp.name}'s ${comp.pricing} subscription.`,
    openGraph: {
      title: `ResumeAI vs ${comp.name} — 2026 Comparison`,
      description: `$19 one-time vs ${comp.pricing}. Compare features, ATS optimization, and value.`,
    },
  };
}

export default async function ComparePage({ params }: Props) {
  const { competitor: slug } = await params;
  const comp = COMPETITORS.find((c) => c.slug === slug);
  if (!comp) notFound();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-b from-gray-50 to-white pt-16 pb-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              ResumeAI vs {comp.name}
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              See how ResumeAI compares to {comp.name} for building ATS-optimized resumes.
            </p>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left px-6 py-4 font-semibold text-gray-900">Feature</th>
                    <th className="text-center px-6 py-4 font-semibold text-blue-600">ResumeAI</th>
                    <th className="text-center px-6 py-4 font-semibold text-gray-600">{comp.name}</th>
                  </tr>
                </thead>
                <tbody>
                  {comp.comparison.features.map((f, i) => (
                    <tr key={i} className="border-b last:border-0">
                      <td className="px-6 py-3 text-gray-700">{f.feature}</td>
                      <td className="px-6 py-3 text-center">
                        {"usLabel" in f ? (
                          <span className="text-blue-600 font-medium">{f.usLabel}</span>
                        ) : f.us ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-red-400 mx-auto" />
                        )}
                      </td>
                      <td className="px-6 py-3 text-center">
                        {"themLabel" in f ? (
                          <span className="text-gray-600">{f.themLabel}</span>
                        ) : f.them ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-red-400 mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Pros comparison */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 border-2 border-blue-200">
              <h3 className="font-bold text-blue-600 mb-4">Why choose ResumeAI</h3>
              <ul className="space-y-2">
                {comp.comparison.prosUs.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-gray-600 mb-4">Why choose {comp.name}</h3>
              <ul className="space-y-2">
                {comp.comparison.prosThem.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" /> {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Try ResumeAI free — no sign-up required
            </h2>
            <p className="mt-3 text-gray-600">
              Build your ATS-optimized resume in 30 seconds. Pay only when you download.
            </p>
            <Link
              href="/builder"
              className="mt-6 inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
            >
              Build My Resume Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
