import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost } from "@/data/blog";
import AffiliateCards from "@/components/shared/AffiliateCards";
import { AFFILIATES } from "@/lib/affiliates";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} - ResumeAI Blog`,
    description: post.excerpt,
    other: {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        datePublished: post.date,
        author: {
          "@type": "Organization",
          name: "ResumeAI",
        },
        publisher: {
          "@type": "Organization",
          name: "ResumeAI",
          url: "https://resumeai.site",
        },
        description: post.excerpt,
      }),
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) notFound();

  return (
    <main className="min-h-screen bg-white">
      <article className="mx-auto max-w-3xl px-4 py-20">
        <header className="mb-10">
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
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {post.title}
          </h1>
        </header>

        <div
          className="prose prose-gray prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-emerald-600 hover:prose-a:text-emerald-700"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-12 border-t border-gray-200 pt-10">
          <AffiliateCards
            source={`blog_${post.slug}`}
            affiliates={[AFFILIATES.linkedinPremium, AFFILIATES.coursera, AFFILIATES.interviewingIo]}
          />
        </div>

        <div className="mt-12 rounded-xl bg-gray-50 border border-gray-200 p-6 text-center">
          <p className="text-sm text-gray-600 mb-3">Build a tailored, ATS-optimized resume in minutes.</p>
          <Link
            href="/builder"
            className="inline-flex items-center rounded-lg bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600"
          >
            Try ResumeAI Free
          </Link>
        </div>
      </article>
    </main>
  );
}
