import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Resume Tips & Career Advice - ResumeAI Blog",
  description:
    "Expert resume writing tips, AI career advice, and ATS optimization guides. Learn how to build a resume that gets interviews in 2026.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-20">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Resume Tips &amp; Career Advice
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Practical guides to help you build a better resume and land more interviews.
        </p>

        <div className="mt-12 space-y-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:border-emerald-200 hover:shadow-md"
            >
              <article>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span aria-hidden="true">&middot;</span>
                  <span>{post.readTime} read</span>
                </div>
                <h2 className="mt-2 text-xl font-semibold text-gray-900">
                  {post.title}
                </h2>
                <p className="mt-2 text-gray-600 line-clamp-2">{post.excerpt}</p>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
