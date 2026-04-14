import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { JOB_TITLES } from "@/lib/jobs";
import { ArrowRight, Check, FileText, Target, Zap } from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ "job-title": string }>;
}

export async function generateStaticParams() {
  return JOB_TITLES.map((job) => ({ "job-title": job.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { "job-title": slug } = await params;
  const job = JOB_TITLES.find((j) => j.slug === slug);
  if (!job) return {};

  return {
    title: `AI Resume Builder for ${job.title} | ResumeAI`,
    description: `Build an ATS-optimized resume for ${job.title} positions. AI tailors your resume with the right keywords: ${job.keywords.slice(0, 5).join(", ")}. Free to start.`,
    openGraph: {
      title: `AI Resume Builder for ${job.title}`,
      description: `Get an ATS-optimized resume tailored for ${job.title} roles in 30 seconds.`,
      images: [`/api/og?title=AI+Resume+for+${encodeURIComponent(job.title)}&description=ATS-optimized+in+30+seconds`],
    },
  };
}

export default async function JobResumePage({ params }: Props) {
  const { "job-title": slug } = await params;
  const job = JOB_TITLES.find((j) => j.slug === slug);
  if (!job) notFound();

  const relatedJobs = JOB_TITLES.filter((j) => j.slug !== slug).slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-gray-50 to-white pt-16 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full mb-4">
              ATS-Optimized
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
              AI Resume Builder for{" "}
              <span className="text-blue-600">{job.title}</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Paste any {job.title.toLowerCase()} job description. AI builds a tailored, ATS-optimized resume in 30 seconds.
            </p>
            <Link
              href="/builder"
              className="mt-8 inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-600/25"
            >
              Build My {job.title} Resume
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        {/* Keywords section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Top ATS Keywords for {job.title}
            </h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {job.keywords.map((kw) => (
                <span
                  key={kw}
                  className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                >
                  {kw}
                </span>
              ))}
            </div>
            <p className="mt-6 text-center text-gray-600 text-sm">
              ResumeAI automatically includes these keywords when building your {job.title.toLowerCase()} resume.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
              How to Build a {job.title} Resume
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: FileText, title: "Paste the job listing", desc: `Copy any ${job.title.toLowerCase()} job description from LinkedIn, Indeed, or any job board.` },
                { icon: Zap, title: "AI optimizes your resume", desc: `Our AI tailors your resume with ${job.title.toLowerCase()}-specific keywords, skills, and achievements.` },
                { icon: Target, title: "Score 90+ on ATS", desc: "Get an instant ATS compatibility score and download your optimized PDF." },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                  <item.icon className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600 mt-2">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sample resume snippet */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Sample {job.title} Resume
            </h2>
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <h3 className="font-bold text-lg text-gray-900">Professional Summary</h3>
              <p className="text-sm text-gray-700 mt-2">
                Results-driven {job.title} with extensive experience in {job.keywords.slice(0, 3).join(", ")}.
                Proven track record of delivering impactful solutions and driving measurable results.
                Skilled in {job.keywords.slice(3, 6).join(", ")} with a focus on continuous improvement.
              </p>
              <h3 className="font-bold text-lg text-gray-900 mt-6">Key Skills</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {job.keywords.map((kw) => (
                  <span key={kw} className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded">
                    <Check className="w-3 h-3 inline mr-1" />{kw}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-center mt-8">
              <Link
                href="/builder"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Build yours in 30 seconds
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Related jobs */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Other Resume Templates</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {relatedJobs.map((rj) => (
                <Link
                  key={rj.slug}
                  href={`/resume/${rj.slug}`}
                  className="px-4 py-3 bg-white rounded-lg text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition border border-gray-200"
                >
                  {rj.title} Resume
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
