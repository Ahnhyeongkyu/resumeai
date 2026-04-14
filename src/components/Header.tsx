"use client";

import Link from "next/link";
import { FileText } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900">
          <FileText className="w-6 h-6 text-blue-600" />
          ResumeAI
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/#pricing" className="text-sm text-gray-600 hover:text-gray-900 transition">
            Pricing
          </Link>
          <Link
            href="/builder"
            className="text-sm font-semibold bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Build My Resume
          </Link>
        </nav>
      </div>
    </header>
  );
}
