import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} | ResumeAI Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <article className="max-w-3xl mx-auto px-4 py-16">
          <div className="mb-8">
            <Link href="/blog" className="text-sm text-blue-600 hover:text-blue-700">
              &larr; Back to Blog
            </Link>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{post.date}</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{post.readTime}</span>
          </div>
          <div
            className="mt-10 prose prose-gray max-w-none text-gray-700 [&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mt-8 [&>h2]:mb-3 [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:text-gray-800 [&>h3]:mt-6 [&>h3]:mb-2 [&>p]:mb-4 [&>p]:leading-relaxed [&>ul]:mb-4 [&>ul]:space-y-1 [&>ul]:list-disc [&>ul]:pl-5"
            dangerouslySetInnerHTML={{
              __html: post.content
                .replace(/^## (.+)$/gm, '<h2>$1</h2>')
                .replace(/^### (.+)$/gm, '<h3>$1</h3>')
                .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                .replace(/^- (.+)$/gm, '<li>$1</li>')
                .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
                .replace(/\n\n/g, '</p><p>')
                .replace(/^(?!<[hul])/gm, '<p>')
                .replace(/(?<![>])$/gm, '</p>')
            }}
          />

          {/* CTA */}
          <div className="mt-12 bg-blue-50 rounded-xl p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900">Build your ATS-optimized resume</h3>
            <p className="text-gray-600 mt-2">Paste any job description. Get a tailored resume in 30 seconds.</p>
            <Link
              href="/builder"
              className="mt-4 inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Build My Resume Free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </article>

        {/* Related posts */}
        {otherPosts.length > 0 && (
          <section className="bg-gray-50 py-12 px-4">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-lg font-bold text-gray-900 mb-6">More articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {otherPosts.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="bg-white rounded-lg p-4 hover:shadow-md transition border border-gray-200"
                  >
                    <h4 className="font-semibold text-sm text-gray-900">{p.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{p.readTime}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
