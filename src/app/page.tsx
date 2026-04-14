import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InteractiveDemo from "@/components/InteractiveDemo";
import { Check, X, ArrowRight, Zap, Target, FileText, Shield } from "lucide-react";

export const metadata = {
  title: "ResumeAI — AI Resume Builder | ATS-Optimized in 30 Seconds",
  description: "Paste any job description. AI builds a tailored, ATS-optimized resume in 30 seconds. Free to start. Download for $19.",
  openGraph: {
    title: "Your Resume Gets 6 Seconds. Make Them Count.",
    description: "AI builds ATS-optimized resumes tailored to any job description. Free to start.",
    images: ["/api/og?title=Your+Resume+Gets+6+Seconds.+Make+Them+Count.&description=AI+builds+ATS-optimized+resumes+in+30+seconds"],
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white pt-20 pb-24 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Your Resume Gets 6 Seconds.{" "}
            <span className="text-blue-600">Make Them Count.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Paste any job description. AI builds an ATS-optimized resume in 30 seconds. No templates. No guesswork.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/builder"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-600/25"
            >
              Build My Resume Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-sm text-gray-500">Free to create. Pay only to download.</p>
          </div>

          {/* Interactive Demo */}
          <div className="mt-16">
            <InteractiveDemo />
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center">
            75% of Resumes Never Reach a Human
          </h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: Shield, text: "ATS software scans your resume for keywords before anyone reads it" },
              { icon: X, text: "Generic resumes get filtered out immediately" },
              { icon: Target, text: "You're competing against hundreds of tailored applications" },
              { icon: FileText, text: "Writing a new resume for every job takes hours" },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-lg bg-red-50/50">
                <item.icon className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                <p className="text-gray-700">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            3 Steps to a Perfect Resume
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Paste the job description", desc: "Copy any job listing", icon: FileText },
              { step: "2", title: "AI tailors your resume", desc: "Keywords, skills, summary — all optimized for this specific role", icon: Zap },
              { step: "3", title: "Download & apply", desc: "ATS-friendly PDF, ready in 30 seconds", icon: ArrowRight },
            ].map((item) => (
              <div key={item.step} className="relative bg-white rounded-xl p-6 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg mb-4 mx-auto">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 text-lg">{item.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-block bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full mb-4">
                  ATS Score: 92/100
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">See your score before you apply</h3>
                <p className="text-gray-600 mb-4">
                  ResumeAI checks your resume against the job description and gives you an instant ATS compatibility score.
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Keyword matching analysis</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Missing keyword suggestions</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Shareable score card</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-6xl font-black text-green-500 mb-2">92</div>
                <div className="text-gray-500 text-sm">ATS Compatibility Score</div>
                <div className="mt-4 flex flex-wrap gap-1 justify-center">
                  {["React", "TypeScript", "Node.js", "AWS", "CI/CD", "Agile"].map((kw) => (
                    <span key={kw} className="text-xs px-2 py-0.5 bg-green-50 text-green-700 rounded">{kw}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-gray-50 rounded-xl p-8 text-center">
            <p className="text-gray-600 italic max-w-2xl mx-auto">
              &ldquo;I applied to 50 jobs with my old resume — zero callbacks. ResumeAI scored my resume 34/100. After rebuilding, I got 3 interviews in one week.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            One Resume Can Change Your Life. <span className="text-blue-600">$19.</span>
          </h2>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-lg text-gray-900">Free</h3>
              <div className="mt-4 text-4xl font-bold text-gray-900">$0</div>
              <ul className="mt-6 space-y-3 text-sm text-left">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> AI resume generation</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> ATS score check</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Preview resume</li>
                <li className="flex items-center gap-2 text-gray-400"><X className="w-4 h-4" /> Download PDF</li>
                <li className="flex items-center gap-2 text-gray-400"><X className="w-4 h-4" /> Remove watermark</li>
                <li className="flex items-center gap-2 text-gray-400"><X className="w-4 h-4" /> AI cover letter</li>
              </ul>
              <Link href="/builder" className="mt-6 block w-full text-center py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">
                Start Free
              </Link>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-600 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                MOST POPULAR
              </div>
              <h3 className="font-semibold text-lg text-gray-900">One-Time</h3>
              <div className="mt-4 text-4xl font-bold text-gray-900">$19</div>
              <ul className="mt-6 space-y-3 text-sm text-left">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> AI resume generation</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> ATS score check</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Preview resume</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Download PDF (1 resume)</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Remove watermark</li>
                <li className="flex items-center gap-2 text-gray-400"><X className="w-4 h-4" /> AI cover letter</li>
              </ul>
              <Link href="/builder" className="mt-6 block w-full text-center py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
                Get Started
              </Link>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-lg text-gray-900">Pro</h3>
              <div className="mt-4 text-4xl font-bold text-gray-900">$9<span className="text-lg font-normal text-gray-500">/mo</span></div>
              <ul className="mt-6 space-y-3 text-sm text-left">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> AI resume generation</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> ATS score check</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Preview resume</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Unlimited downloads</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Remove watermark</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> AI cover letter</li>
              </ul>
              <Link href="/builder" className="mt-6 block w-full text-center py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">
                Go Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gray-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Stop Sending Resumes Into the Void.
          </h2>
          <p className="mt-4 text-gray-400 text-lg">
            Every day you wait is another job you miss. Build your resume now — it&apos;s free to start.
          </p>
          <Link
            href="/builder"
            className="mt-8 inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
          >
            Build My Resume Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
