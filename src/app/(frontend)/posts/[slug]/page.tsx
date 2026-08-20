import Link from "next/link";
import { notFound } from "next/navigation";
import { getPosts, getPostBySlug } from "@/lib/posts";
import { RichText, defaultJSXConverters } from "@payloadcms/richtext-lexical/react";
import { CodeRenderer } from "@/components/CodeRenderer";
import type { Metadata } from "next";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://whoisben.net";

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

  const postUrl = `${siteUrl}/posts/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt || `Read ${post.title} by Bennet Leff.`,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt || `Read ${post.title} by Bennet Leff.`,
      url: postUrl,
      type: "article",
      publishedTime: post.publishedAt || undefined,
      authors: ["Bennet Leff"],
      section: post.category,
      siteName: "Bennet Leff",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || `Read ${post.title} by Bennet Leff.`,
    },
  };
}

const customJSXConverters = {
  ...defaultJSXConverters,
  blocks: {
    Code: ({ node }: any) => {
      const code = node.fields?.code || "";
      const language = node.fields?.language || "text";
      return <CodeRenderer code={code} language={language} />;
    },
  },
};

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const isLexical = post.content && typeof post.content === "object" && "root" in post.content;
  const postUrl = `${siteUrl}/posts/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || undefined,
    url: postUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    datePublished: post.publishedAt || undefined,
    dateModified: post.publishedAt || undefined,
    author: {
      "@type": "Person",
      name: "Bennet Leff",
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: "Bennet Leff",
      url: siteUrl,
    },
    articleSection: post.category,
    inLanguage: "en-US",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article
        id="main-content"
        className="min-h-screen max-w-3xl mx-auto px-6 py-16 sm:py-24"
      >
        {/* Navigation */}
        <nav aria-label="Breadcrumb" className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-mono text-[#575249] hover:text-[#d84715] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d84715] focus-visible:ring-offset-2 rounded-sm transition-colors"
          >
            ← Bennet Leff
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-12 border-b border-[#d4cdc0] pb-8">
          <div className="flex items-center gap-3 text-xs uppercase tracking-widest font-mono text-[#575249] mb-4">
            <span>{post.category}</span>
            <span aria-hidden="true">•</span>
            {post.publishedAt ? (
              <time dateTime={post.publishedAt}>{post.date}</time>
            ) : (
              <span>{post.date}</span>
            )}
            <span aria-hidden="true">•</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-[#1c1a17] leading-tight">
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
            <RichText data={post.content} converters={customJSXConverters as any} />
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
          <Link
            href="/"
            className="hover:text-[#d84715] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d84715] focus-visible:ring-offset-2 rounded-sm transition-colors"
          >
            ← Back to writing
          </Link>
          {post.publishedAt ? (
            <time dateTime={post.publishedAt}>{post.date}</time>
          ) : (
            <span>{post.date}</span>
          )}
        </footer>
      </article>
    </>
  );
}
