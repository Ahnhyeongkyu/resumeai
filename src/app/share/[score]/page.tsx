import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ score: string }>;
  searchParams: Promise<{ job?: string }>;
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { score } = await params;
  const { job } = await searchParams;
  const jobLabel = job || "a job role";

  return {
    title: `ATS Score: ${score}/100 | ResumeAI`,
    description: `This resume scored ${score}/100 on ATS compatibility for ${jobLabel}. Check your resume score for free.`,
    openGraph: {
      title: `My resume scored ${score}/100 on ATS!`,
      description: `Check your resume's ATS score for free at ResumeAI.`,
      images: [`/api/score-card?score=${score}&job=${encodeURIComponent(jobLabel)}`],
    },
    twitter: {
      card: "summary_large_image",
      title: `My resume scored ${score}/100 on ATS!`,
      description: `Check your resume's ATS score for free at ResumeAI.`,
      images: [`/api/score-card?score=${score}&job=${encodeURIComponent(jobLabel)}`],
    },
  };
}

export default async function SharePage({ params, searchParams }: Props) {
  const { score } = await params;
  const { job } = await searchParams;
  const scoreNum = parseInt(score);
  const color = scoreNum >= 80 ? "text-green-500" : scoreNum >= 60 ? "text-yellow-500" : "text-red-500";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-md">
          <p className="text-sm text-gray-500 mb-2">ATS Compatibility Score</p>
          <div className={`text-8xl font-black ${color}`}>{scoreNum}</div>
          <p className="text-gray-500 text-lg mt-2">out of 100</p>
          {job && <p className="text-gray-400 text-sm mt-1">for {job}</p>}
          <div className="mt-8 space-y-3">
            <Link
              href="/builder"
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Check Your Resume Score
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-xs text-gray-400">Free to use. No sign-up required.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
