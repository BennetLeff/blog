import Link from "next/link";
import { getPosts } from "@/lib/posts";

export const revalidate = 60;

export default async function Home() {
  const posts = await getPosts();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://whoisben.net";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Bennet Leff",
        description: "Personal website, engineering essays, and writings of Bennet Leff.",
        publisher: {
          "@id": `${siteUrl}/#person`,
        },
        inLanguage: "en-US",
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "Bennet Leff",
        url: siteUrl,
        jobTitle: "Software Engineer & Builder",
        sameAs: [
          "https://github.com/BennetLeff",
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main
        id="main-content"
        className="min-h-screen max-w-6xl mx-auto px-6 sm:px-12 py-16 sm:py-20 flex flex-col justify-start"
      >
        <header className="mb-8 sm:mb-12">
          <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] font-normal tracking-tight leading-[0.9] text-[#d84715] font-heading">
            Bennet Leff
          </h1>
        </header>

        <section aria-labelledby="writing-section-heading" className="w-full">
          <div className="flex items-center justify-between pb-4 border-b border-[#d4cdc0] text-xs sm:text-sm uppercase tracking-widest text-[#524d44] font-mono">
            <h2 id="writing-section-heading" className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#524d44]">
              Writing
            </h2>
            <span>
              {posts.length} {posts.length === 1 ? "Post" : "Posts"}
            </span>
          </div>

          {/* Scrollable list container */}
          <div className="max-h-none overflow-visible md:max-h-[580px] md:overflow-y-auto md:pr-6 md:scroll-smooth custom-scrollbar">
            <ul className="divide-y divide-[#d4cdc0]" role="list">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/posts/${post.slug}`}
                    className="group flex flex-col sm:flex-row sm:items-baseline justify-between py-6 sm:py-8 transition-all hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d84715] focus-visible:ring-offset-2 rounded-sm"
                  >
                    <div className="flex-1 pr-6">
                      <h3 className="text-xl sm:text-2xl md:text-[1.65rem] font-normal text-[#1c1a17] transition-transform group-hover:translate-x-1 duration-200 leading-snug">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="mt-2 text-base sm:text-lg text-[#48433a] font-serif line-clamp-1">
                          {post.excerpt}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-4 mt-3 sm:mt-0 text-xs sm:text-sm text-[#575249] font-mono shrink-0">
                      {post.category && (
                        <span className="text-[#635c50] uppercase tracking-wider">
                          {post.category}
                        </span>
                      )}
                      {post.readingTime && (
                        <span className="hidden md:inline text-[#6e675b]">
                          • {post.readingTime}
                        </span>
                      )}
                      {post.publishedAt ? (
                        <time dateTime={post.publishedAt}>{post.date}</time>
                      ) : (
                        <span>{post.date}</span>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Minimal Footer with Resume and GitHub */}
        <footer className="mt-16 pt-6 border-t border-[#d4cdc0] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs sm:text-sm font-mono text-[#575249]">
          <div className="flex items-center gap-4">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1c1a17] hover:text-[#d84715] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d84715] rounded-sm"
            >
              Resume ↗
            </a>
            <span aria-hidden="true" className="text-[#8e877a]">•</span>
            <a
              href="https://github.com/BennetLeff"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#d84715] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d84715] rounded-sm"
            >
              GitHub ↗
            </a>
          </div>
          <span className="text-[#8e877a]">© {new Date().getFullYear()} Bennet Leff</span>
        </footer>
      </main>
    </>
  );
}
