import Link from "next/link";
import { getPosts } from "@/lib/posts";

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen max-w-6xl mx-auto px-6 sm:px-12 py-16 sm:py-24 flex flex-col justify-between">
      <header className="mb-14 sm:mb-20">
        <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] font-normal tracking-tight leading-[0.9] text-[#d84715]">
          Bennet Leff
        </h1>
      </header>

      <section className="w-full">
        <div className="flex items-center justify-between pb-4 border-b border-[#d4cdc0] text-xs sm:text-sm uppercase tracking-widest text-[#524d44] font-mono">
          <span>Writing</span>
          <span>{posts.length} {posts.length === 1 ? "Post" : "Posts"}</span>
        </div>

        {/* Scrollable list container */}
        <div className="max-h-none overflow-visible md:max-h-[580px] md:overflow-y-auto md:pr-6 md:scroll-smooth custom-scrollbar">
          <ul className="divide-y divide-[#d4cdc0]">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/posts/${post.slug}`}
                  className="group flex flex-col sm:flex-row sm:items-baseline justify-between py-6 sm:py-8 transition-all hover:opacity-80"
                >
                  <div className="flex-1 pr-6">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#1c1a17] transition-transform group-hover:translate-x-1.5 duration-200 leading-snug">
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
                    <span>{post.date}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
