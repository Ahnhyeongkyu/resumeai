import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DollarSign, Share2, BarChart3, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Program — Earn 30% Commission | ResumeAI",
  description: "Join the ResumeAI affiliate program and earn 30% commission on every sale. Share your referral link and get paid.",
};

export default function AffiliatePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-b from-gray-50 to-white pt-20 pb-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Earn 30% on Every Sale
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Share ResumeAI with your audience. Earn $5.70 per one-time sale and recurring commissions on Pro subscriptions.
            </p>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Share2, title: "Share Your Link", desc: "Get a unique referral link. Share it on your blog, YouTube, social media, or newsletter." },
              { icon: DollarSign, title: "Earn 30%", desc: "$5.70 per $19 one-time sale. $2.70/month per Pro subscriber — recurring as long as they stay." },
              { icon: BarChart3, title: "Track & Get Paid", desc: "Track clicks and conversions. Get paid monthly via PayPal or bank transfer." },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <item.icon className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-gray-900 text-lg">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h2>
            <ol className="space-y-4 text-gray-700">
              <li className="flex gap-3">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shrink-0">1</span>
                <div>
                  <strong>Apply</strong> — Email us at support@resumeai.site with your name, website/social profile, and how you plan to promote ResumeAI.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shrink-0">2</span>
                <div>
                  <strong>Get your link</strong> — We&apos;ll send you a unique referral link (e.g., resumeai.site?ref=yourname). 90-day cookie window.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shrink-0">3</span>
                <div>
                  <strong>Promote</strong> — Share your link with job seekers. Blog posts, YouTube reviews, tweets, newsletters — anything works.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shrink-0">4</span>
                <div>
                  <strong>Get paid</strong> — Earn 30% on every sale. Monthly payouts, $50 minimum threshold.
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section className="py-16 px-4 bg-white">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900">Ready to start earning?</h2>
            <p className="text-gray-600 mt-2">
              Email us to join the affiliate program.
            </p>
            <a
              href="mailto:support@resumeai.site?subject=Affiliate%20Program%20Application"
              className="mt-6 inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
            >
              Apply Now
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
