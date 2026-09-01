import Image from "next/image";
import Link from "next/link";
import { getPosts } from "@/lib/posts";
import { CatStamp } from "@/components/CatStamp";

export const revalidate = 60; // ISR cache revalidation every 60s

export default async function Home() {
  const posts = await getPosts();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.whoisben.net";

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Bennet Leff",
    jobTitle: "Senior Full Stack Engineer",
    url: siteUrl,
    sameAs: [
      "https://github.com/BennetLeff",
      `${siteUrl}/resume.pdf`,
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <main className="min-h-screen p-3 sm:p-6 lg:p-10 flex flex-col justify-center max-w-[1700px] mx-auto transition-colors duration-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-3rem)] lg:min-h-[calc(100vh-5rem)] border border-black/15 rounded-xs overflow-hidden shadow-xs">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Identity & Bio (lg:col-span-4)                              */}
          {/* ========================================================================= */}
          <section
            aria-label="About Bennet Leff"
            className="lg:col-span-4 p-6 sm:p-10 lg:p-12 lg:border-r border-black/15 flex flex-col justify-between overflow-y-auto custom-scrollbar"
          >
            <div>
              {/* Main Heading */}
              <header className="mb-6">
                <div className="text-xs sm:text-sm font-mono uppercase tracking-widest text-black/70 mb-2">
                  [IDENTITY // 01]
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-bold tracking-tight leading-[0.95] text-black whitespace-nowrap">
                  bennet leff
                </h1>
                <div className="mt-3">
                  <span className="inline-block bg-[#3DB4F8] text-black px-2.5 py-0.5 text-xs sm:text-sm font-mono uppercase tracking-wider font-bold rounded-xs shadow-[2px_2px_0px_#000000]">
                    [Senior Full Stack Engineer]
                  </span>
                </div>
              </header>

              {/* Bio & Intro tailored to Bennet's Resume */}
              <div className="space-y-6 text-sm sm:text-base text-black/90 leading-relaxed font-sans">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-black/70 mb-1.5 font-medium">
                    [HI]
                  </div>
                  <p>
                    High-performance web, Rust and Agent experiments, Dalia my cat
                  </p>
                </div>

                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-black/70 mb-1.5 font-medium">
                    [BACKGROUND]
                  </div>
                  <p>
                    Previously Senior Full Stack Engineer at <strong className="font-bold text-black">Honor</strong>, building web infra and tooling, LLM observability, and AI workflows. Prior at <strong className="font-bold text-black">Capital One</strong> building high-throughput financial systems, and hacking at startups on frontends and ML.
                  </p>
                </div>

                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-black/70 mb-1.5 font-medium">
                    [CURRENT EXPERIMENTS]
                  </div>
                  <p>
                    Tinkering on <strong className="font-bold text-black">Temper</strong> (an open-source induction cooker & hardware verification suite in the box), scalable Rust testing in V8 isolates, and compiler exploration.
                  </p>
                </div>
              </div>
            </div>

            {/* Left Column Footer */}
            <div className="mt-10 pt-6 border-t border-black/15 flex items-center justify-between text-xs sm:text-sm font-mono text-black/75">
              <div className="flex items-center gap-3 sm:gap-4">
                <a
                  href="/resume.pdf?v=20260826-1423"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-[#1B3064] hover:underline hover:decoration-[#3DB4F8] hover:decoration-2 hover:underline-offset-4 font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-xs"
                >
                  Resume ↗
                </a>
                <span aria-hidden="true" className="text-black/40">•</span>
                <a
                  href="https://github.com/BennetLeff"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-[#1B3064] hover:underline hover:decoration-[#3DB4F8] hover:decoration-2 hover:underline-offset-4 font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-xs"
                >
                  GitHub ↗
                </a>
              </div>
              <span className="text-black/60">© {new Date().getFullYear()}</span>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* CENTER COLUMN: Centerpiece Photo Frame with Dalia Cat Stamp (lg:col-span-4) */}
          {/* ========================================================================= */}
          <section
            aria-label="Featured Visual"
            className="lg:col-span-4 p-6 sm:p-10 lg:p-10 lg:border-r border-black/15 flex flex-col justify-between items-center bg-black/[0.02] border-y lg:border-y-0"
          >
            {/* Top Caption */}
            <div className="w-full flex items-center justify-between text-xs font-mono uppercase tracking-widest text-black/70 pb-4">
              <span>[MEMENTO // 01]</span>
              <span>[STAMP // DALIA]</span>
            </div>

            {/* Photo Card Container with Angled Cat Stamp */}
            <div className="relative my-auto w-full max-w-[340px] group">
              {/* Photo Frame with Brutalist Offset Shadow */}
              <div className="p-2 sm:p-2.5 bg-[#FFF9EC] border-2 border-black rounded-xs shadow-[5px_5px_0px_#000000] transition-transform duration-500 ease-out group-hover:scale-[1.01]">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xs bg-black/10 border border-black/10">
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
            <div className="w-full flex items-center justify-between text-xs font-mono uppercase tracking-widest text-black/70 pt-4">
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
              <div className="flex items-center justify-between pb-4 border-b border-black/15 text-xs sm:text-sm uppercase tracking-widest text-black/75 font-mono mb-6">
                <h2 id="writing-section-heading" className="font-mono text-xs sm:text-sm uppercase tracking-widest text-black/75">
                  [WRITING & ESSAYS]
                </h2>
                <span>
                  [{posts.length.toString().padStart(2, '0')} POSTS]
                </span>
              </div>

              {/* Post List */}
              <ul className="divide-y divide-black/15" role="list">
                {posts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/posts/${post.slug}`}
                      className="group block py-5 sm:py-6 transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-xs"
                    >
                      <div className="flex items-center gap-3 text-xs font-mono text-black/70 mb-2 uppercase tracking-wider">
                        {post.category && (
                          <span className="bg-[#3DB4F8] text-black px-1.5 py-0.5 rounded-xs font-bold shadow-[1.5px_1.5px_0px_#000000]">
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

                      <h3 className="text-lg sm:text-xl font-bold text-black transition-all group-hover:text-[#1B3064] group-hover:underline group-hover:decoration-[#3DB4F8] group-hover:decoration-2 group-hover:underline-offset-4 leading-snug">
                        {post.title}
                      </h3>

                      {post.excerpt && (
                        <p className="mt-2 text-sm sm:text-base text-black/80 font-serif italic line-clamp-2 leading-relaxed">
                          {post.excerpt}
                        </p>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 pt-4 text-xs font-mono text-black/60 flex items-center justify-between border-t border-black/15">
              <span>[ARCHIVE // {posts.length.toString().padStart(2, '0')} ESSAYS]</span>
              <span>[END OF FEED]</span>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
