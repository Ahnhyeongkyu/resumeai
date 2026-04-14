"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText } from "lucide-react";

const CROSS_PROMO = [
  { name: "TrustFolio", url: "https://trustfolio.dev", desc: "Portfolio Builder" },
  { name: "StatMate", url: "https://statmate.org", desc: "Statistics Tool" },
  { name: "RoastSite", url: "https://roastsite.site", desc: "Website Roaster" },
  { name: "CodeNeat", url: "https://codeneat.dev", desc: "Code Quality" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-gray-950 text-gray-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 text-white font-bold text-lg mb-4">
              <FileText className="w-5 h-5 text-blue-500" />
              ResumeAI
            </div>
            <p className="text-sm mb-6 max-w-sm">
              AI-powered resume builder that creates ATS-optimized resumes tailored to any job description. Free to start.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm">
              {submitted ? (
                <p className="text-green-400 text-sm">Thanks! We&apos;ll keep you updated.</p>
              ) : (
                <>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Get resume tips by email"
                    className="flex-1 px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                  >
                    Subscribe
                  </button>
                </>
              )}
            </form>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/builder" className="hover:text-white transition">Resume Builder</Link></li>
              <li><Link href="/#pricing" className="hover:text-white transition">Pricing</Link></li>
              <li><Link href="/resume/software-engineer" className="hover:text-white transition">Resume Examples</Link></li>
              <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
              <li><Link href="/affiliate" className="hover:text-white transition">Affiliate Program</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
              <li><a href="mailto:support@resumeai.site" className="hover:text-white transition">support@resumeai.site</a></li>
              <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Also by us</h4>
            <ul className="space-y-2 text-sm">
              {CROSS_PROMO.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition"
                  >
                    {item.name} — {item.desc}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} ResumeAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
