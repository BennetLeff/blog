import Link from "next/link";
import { notFound } from "next/navigation";
import { getPosts, getPostBySlug } from "@/lib/posts";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} — Bennet Leff`,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const isLexical = post.content && typeof post.content === "object" && "root" in post.content;

  return (
    <article className="min-h-screen max-w-3xl mx-auto px-6 py-16 sm:py-24">
      {/* Navigation */}
      <nav className="mb-12">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-mono text-[#575249] hover:text-[#d84715] transition-colors"
        >
          ← Bennet Leff
        </Link>
      </nav>

      {/* Header */}
      <header className="mb-12 border-b border-[#d4cdc0] pb-8">
        <div className="flex items-center gap-3 text-xs uppercase tracking-widest font-mono text-[#575249] mb-4">
          <span>{post.category}</span>
          <span>•</span>
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readingTime}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#1c1a17] leading-tight">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="mt-6 text-lg sm:text-xl text-[#48433a] italic leading-relaxed font-serif">
            {post.excerpt}
          </p>
        )}
      </header>

      {/* Content */}
      <div className="space-y-6 text-lg sm:text-xl leading-relaxed text-[#1c1a17] payload-richtext">
        {isLexical ? (
          <RichText data={post.content} />
        ) : Array.isArray(post.content) ? (
          post.content.map((paragraph: string, idx: number) => (
            <p key={idx}>{paragraph}</p>
          ))
        ) : (
          <p>{String(post.content)}</p>
        )}
      </div>

      {/* Footer Navigation */}
      <footer className="mt-20 pt-8 border-t border-[#d4cdc0] flex justify-between items-center text-sm font-mono text-[#575249]">
        <Link href="/" className="hover:text-[#d84715] transition-colors">
          ← Back to writing
        </Link>
        <span>{post.date}</span>
      </footer>
    </article>
  );
}
