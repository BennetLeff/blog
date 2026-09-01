import Link from "next/link";
import Image from "next/image";
import { getPosts } from "@/lib/posts";
import { CatStamp } from "@/components/CatStamp";
import { instrumentSerif } from "./fonts";

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
        jobTitle: "Senior Full Stack Engineer & Systems Builder",
        sameAs: ["https://github.com/BennetLeff"],
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
        className="min-h-screen w-full lg:h-screen lg:overflow-hidden flex flex-col justify-between"
      >
        {/* Outer Frame Container */}
        <div className="flex-1 w-full max-w-[1680px] mx-auto grid grid-cols-1 lg:grid-cols-12 lg:h-full">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Identity & Bio (lg:col-span-4)                              */}
          {/* ========================================================================= */}
          <section
            aria-label="About Bennet Leff"
            className="lg:col-span-4 p-6 sm:p-10 lg:p-12 lg:border-r border-[#5C0036]/15 flex flex-col justify-between overflow-y-auto custom-scrollbar"
          >
            <div>
              {/* Main Heading */}
              <header className="mb-6">
                <div className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#5C0036]/72 mb-2">
                  [IDENTITY // 01]
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-bold tracking-tight leading-[0.95] text-[#5C0036] whitespace-nowrap">
                  bennet leff
                </h1>
                <div className="mt-3 text-xs sm:text-sm font-mono uppercase tracking-widest text-[#882453] font-medium">
                  [Senior Full Stack Engineer]
                </div>
              </header>

              {/* Bio & Intro tailored to Bennet's Resume */}
              <div className="space-y-6 text-sm sm:text-base text-[#5C0036]/90 leading-relaxed font-sans">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-[#5C0036]/72 mb-1.5 font-medium">
                    [HI]
                  </div>
                  <p>
                    High-performance web, Rust and Agent experiments, Dalia my cat
                  </p>
                </div>

                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-[#5C0036]/72 mb-1.5 font-medium">
                    [BACKGROUND]
                  </div>
                  <p>
                    Previously Senior Full Stack Engineer at <strong className="font-bold text-[#5C0036]">Honor</strong>, building web infra and tooling, LLM observability, and AI workflows. Prior at <strong className="font-bold text-[#5C0036]">Capital One</strong> building high-throughput financial systems, and hacking at startups on frontends and ML.
                  </p>
                </div>

                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-[#5C0036]/72 mb-1.5 font-medium">
                    [CURRENT EXPERIMENTS]
                  </div>
                  <p>
                    Tinkering on <strong className="font-bold text-[#5C0036]">Temper</strong> (an open-source induction cooker & hardware verification suite in the box), scalable Rust testing in V8 isolates, and compiler exploration.
                  </p>
                </div>
              </div>
            </div>

            {/* Left Column Footer */}
            <div className="mt-10 pt-6 border-t border-[#5C0036]/15 flex items-center justify-between text-xs sm:text-sm font-mono text-[#5C0036]/75">
              <div className="flex items-center gap-3 sm:gap-4">
                <a
                  href="/resume.pdf?v=20260826-1423"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5C0036] hover:text-[#882453] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#882453] rounded-xs"
                >
                  Resume ↗
                </a>
                <span aria-hidden="true" className="text-[#5C0036]/40">•</span>
                <a
                  href="https://github.com/BennetLeff"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5C0036] hover:text-[#882453] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#882453] rounded-xs"
                >
                  GitHub ↗
                </a>
              </div>
              <span className="text-[#5C0036]/70">© {new Date().getFullYear()}</span>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* CENTER COLUMN: Centerpiece Photo Frame with Dalia Cat Stamp (lg:col-span-4) */}
          {/* ========================================================================= */}
          <section
            aria-label="Featured Visual"
            className="lg:col-span-4 p-6 sm:p-10 lg:p-10 lg:border-r border-[#5C0036]/15 flex flex-col justify-between items-center bg-[#5C0036]/[0.02] border-y lg:border-y-0"
          >
            {/* Top Caption */}
            <div className="w-full flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[#5C0036]/72 pb-4">
              <span>[MEMENTO // 01]</span>
              <span>[STAMP // DALIA]</span>
            </div>

            {/* Photo Card Container with Angled Cat Stamp */}
            <div className="relative my-auto w-full max-w-[340px] group">
              {/* Photo Frame */}
              <div className="p-2 sm:p-2.5 bg-[#EAF2E7] border border-[#5C0036]/15 rounded-xs shadow-md transition-transform duration-500 ease-out group-hover:scale-[1.01]">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xs bg-[#5C0036]/10">
                  <Image
                    src="/photo.jpg"
                    alt="Bennet Leff"
                    fill
                    sizes="(max-width: 1024px) 80vw, 30vw"
                    priority
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Dalia Cat Stamp Pinning Top-Right of Photo */}
              <div className="absolute -top-6 -right-6 sm:-top-8 sm:-right-8 z-20">
                <CatStamp className="w-24 h-24 sm:w-32 sm:h-32" stickerClassName="w-16 h-16 sm:w-22 sm:h-22" />
              </div>
            </div>

            {/* Bottom Caption */}
            <div className="w-full flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[#5C0036]/72 pt-4">
              <span>EST. 2026</span>
              <span>[STILL BUILDING]</span>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: Writing & Essays Feed (lg:col-span-4)                      */}
          {/* ========================================================================= */}
          <section
            aria-labelledby="writing-section-heading"
            className="lg:col-span-4 p-6 sm:p-10 lg:p-12 flex flex-col justify-between overflow-y-auto custom-scrollbar"
          >
            <div>
              {/* Writing Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#5C0036]/15 text-xs sm:text-sm uppercase tracking-widest text-[#5C0036]/75 font-mono mb-6">
                <h2 id="writing-section-heading" className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#5C0036]/75">
                  [WRITING & ESSAYS]
                </h2>
                <span>
                  [{posts.length.toString().padStart(2, '0')} POSTS]
                </span>
              </div>

              {/* Post List */}
              <ul className="divide-y divide-[#5C0036]/15" role="list">
                {posts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/posts/${post.slug}`}
                      className="group block py-5 sm:py-6 transition-all hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#882453] rounded-xs"
                    >
                      <div className="flex items-center gap-3 text-xs font-mono text-[#5C0036]/72 mb-1.5 uppercase tracking-wider">
                        {post.category && (
                          <span className="text-[#882453] font-medium">
                            [{post.category}]
                          </span>
                        )}
                        {post.publishedAt ? (
                          <time dateTime={post.publishedAt}>{post.date}</time>
                        ) : (
                          <span>{post.date}</span>
                        )}
                        {post.readingTime && (
                          <span>• {post.readingTime}</span>
                        )}
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-[#5C0036] transition-colors group-hover:text-[#882453] leading-snug">
                        {post.title}
                      </h3>

                      {post.excerpt && (
                        <p className="mt-2 text-sm sm:text-base text-[#5C0036]/75 font-serif italic line-clamp-2 leading-relaxed">
                          {post.excerpt}
                        </p>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 pt-4 text-xs font-mono text-[#5C0036]/70 flex items-center justify-between border-t border-[#5C0036]/15">
              <span>[ARCHIVE // {posts.length.toString().padStart(2, '0')} ESSAYS]</span>
              <span>[END OF FEED]</span>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
