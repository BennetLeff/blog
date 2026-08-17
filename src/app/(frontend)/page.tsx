import Link from "next/link";
import { getPosts } from "@/lib/posts";

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen max-w-5xl mx-auto px-6 py-20 sm:py-28 flex flex-col justify-between">
      <header className="mb-16 sm:mb-20">
        <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-normal tracking-tight leading-none text-neutral-900 dark:text-neutral-100">
          Bennet Leff
        </h1>
      </header>

      <section className="w-full">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-300 dark:border-neutral-800 text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-mono">
          <span>Writing</span>
          <span>{posts.length} Posts</span>
        </div>

        {/* Scrollable list on desktop (~5-6 visible items), full list on mobile */}
        <div className="max-h-none overflow-visible md:max-h-[380px] md:overflow-y-auto md:pr-4 md:scroll-smooth custom-scrollbar">
          <ul className="divide-y divide-neutral-200/80 dark:divide-neutral-800/80">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/posts/${post.slug}`}
                  className="group flex flex-col sm:flex-row sm:items-baseline justify-between py-4 sm:py-5 transition-colors hover:opacity-75"
                >
                  <h3 className="text-xl sm:text-2xl font-normal text-neutral-900 dark:text-neutral-100 transition-transform group-hover:translate-x-1 duration-200">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-1 sm:mt-0 text-sm text-neutral-400 dark:text-neutral-500 font-mono shrink-0 sm:ml-6">
                    {post.category && (
                      <span className="hidden sm:inline text-xs text-neutral-400/80 dark:text-neutral-600">
                        {post.category}
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
