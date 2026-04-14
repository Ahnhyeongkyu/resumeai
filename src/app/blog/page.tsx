import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { Clock, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume Tips & Guides | ResumeAI Blog",
  description: "Expert resume writing tips, ATS optimization guides, and career advice to help you land your dream job.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-16 w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume Blog</h1>
        <p className="text-gray-600 mb-10">Expert tips to help you write better resumes and land more interviews.</p>

        <div className="space-y-6">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md hover:border-blue-200 transition"
            >
              <h2 className="text-xl font-semibold text-gray-900">{post.title}</h2>
              <p className="text-gray-600 text-sm mt-2">{post.description}</p>
              <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                <span>{post.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
              </div>
              <span className="mt-3 inline-flex items-center gap-1 text-sm text-blue-600 font-medium">
                Read more <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
