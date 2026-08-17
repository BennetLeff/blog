import Link from "next/link";
import { notFound } from "next/navigation";
import { getPosts, getPostBySlug } from "@/lib/posts";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { Metadata } from "next";

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
          className="inline-flex items-center text-sm font-mono text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
        >
          ← Bennet Leff
        </Link>
      </nav>

      {/* Header */}
      <header className="mb-12 border-b border-neutral-200/80 dark:border-neutral-800/80 pb-8">
        <div className="flex items-center gap-3 text-xs uppercase tracking-widest font-mono text-neutral-400 dark:text-neutral-500 mb-4">
          <span>{post.category}</span>
          <span>•</span>
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readingTime}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-neutral-900 dark:text-neutral-100 leading-tight">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="mt-6 text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 italic leading-relaxed">
            {post.excerpt}
          </p>
        )}
      </header>

      {/* Content */}
      <div className="space-y-6 text-lg sm:text-xl leading-relaxed text-neutral-800 dark:text-neutral-200">
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
      <footer className="mt-20 pt-8 border-t border-neutral-200/80 dark:border-neutral-800/80 flex justify-between items-center text-sm font-mono text-neutral-500 dark:text-neutral-400">
        <Link href="/" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
          ← Back to writing
        </Link>
        <span>{post.date}</span>
      </footer>
    </article>
  );
}
