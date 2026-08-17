import { getPayload } from 'payload'
import config from '@payload-config'

export interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  readingTime: string;
  excerpt: string;
  content: any;
}

export const fallbackPosts: Post[] = [
  {
    slug: "geometry-of-latent-spaces",
    title: "On the Geometry of Latent Spaces and Representation",
    date: "Aug 2026",
    category: "AI / Math",
    readingTime: "5 min read",
    excerpt: "Exploring the topological structures and continuous manifold representations embedded within high-dimensional latent vectors.",
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor.",
      "Ut convallis, sem sit amet interdum consectetuer, odio augue aliquam leo, nec dapibus tortor nibh sed augue. Integer eu magna sit amet metus fermentum posuere. Morbi sit amet nulla sed dolor elementum imperdiet. Quisque fermentum. Mauris pellentesque mollis molestie.",
    ],
  },
  {
    slug: "designing-with-mathematical-precision",
    title: "Designing Software with Mathematical Precision",
    date: "Jul 2026",
    category: "Architecture",
    readingTime: "7 min read",
    excerpt: "Why formal invariants and rigorous type definitions create interfaces that withstand entropy.",
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pellentesque mollis molestie. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.",
      "Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus. Phasellus ultrices nulla quis nibh. Quisque a lectus.",
      "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci. Aenean nec lorem. In porttitor. Donec laoreet nonummy augue. Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc.",
    ],
  },
  {
    slug: "deterministic-routing-engines",
    title: "The Architecture of Deterministic Routing Engines",
    date: "Jun 2026",
    category: "Systems",
    readingTime: "11 min read",
    excerpt: "Building high-throughput, conflict-free routing pipelines using geometric partitioning and spatial indexes.",
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit.",
      "Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui.",
      "Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Vestibulum tincidunt malesuada tellus.",
    ],
  },
  {
    slug: "typographic-systems-interface-design",
    title: "Typographic Systems in Modern Interface Design",
    date: "May 2026",
    category: "Design",
    readingTime: "4 min read",
    excerpt: "Harmonizing rhythm, letter-spacing, and structural density across viewport boundaries.",
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut convallis, sem sit amet interdum consectetuer, odio augue aliquam leo, nec dapibus tortor nibh sed augue. Integer eu magna sit amet metus fermentum posuere.",
      "Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit.",
      "Etiam tempor. Ut convallis, sem sit amet interdum consectetuer, odio augue aliquam leo, nec dapibus tortor nibh sed augue. Integer eu magna sit amet metus fermentum posuere. Morbi sit amet nulla sed dolor elementum imperdiet.",
    ],
  },
  {
    slug: "compilers-and-state-machines",
    title: "Compilers, State Machines, and Elegant Abstractions",
    date: "Apr 2026",
    category: "Compilers",
    readingTime: "8 min read",
    excerpt: "Translating declarative intent into optimized intermediate representations through discrete state transitions.",
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "Suspendisse potenti. Mauris aliquet massa non lectus. Integer nonummy molestie lectus. Sed a libero. Quisque aliquam. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc.",
    ],
  },
  {
    slug: "hardware-silicon-analog-roots",
    title: "Reflections on Hardware, Silicon, and Analog Roots",
    date: "Mar 2026",
    category: "Hardware",
    readingTime: "6 min read",
    excerpt: "Tracing the physical boundaries of digital abstractions down to physical traces and copper planes.",
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et orci. Aenean nec lorem. In porttitor. Donec laoreet nonummy augue. Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc.",
      "Mauris et orci. Aenean nec lorem. In porttitor. Donec laoreet nonummy augue. Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend.",
      "Ut convallis, sem sit amet interdum consectetuer, odio augue aliquam leo, nec dapibus tortor nibh sed augue. Integer eu magna sit amet metus fermentum posuere. Morbi sit amet nulla sed dolor elementum imperdiet.",
    ],
  },
  {
    slug: "zero-overhead-functional-pipelines",
    title: "Zero-Overhead Functional Pipelines in Practice",
    date: "Feb 2026",
    category: "Systems",
    readingTime: "9 min read",
    excerpt: "Applying monads, immutability, and zero-cost iterators without paying memory allocation penalties.",
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus. Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi.",
      "Pellentesque fermentum dolor. Aliquam quam lectus, facilisis auctor, ultrices ut, elementum vulputate, nunc. Sed adipiscing ornare risus. Morbi est est, blandit sit amet, hendrerit sit amet, commodo vel, nisi.",
      "Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit.",
    ],
  },
  {
    slug: "nonlinear-optimization-gradient-flows",
    title: "Notes on Nonlinear Optimization and Gradient Flows",
    date: "Jan 2026",
    category: "Algorithms",
    readingTime: "12 min read",
    excerpt: "Numerical stability, Riemannian manifolds, and solving stiff non-convex objectives.",
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lacinia molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet.",
      "Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices enim. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper.",
      "Nulla facilisi. Integer lacinia sollicitudin massa. Cras metus. Sed aliquet risus a tortor. Integer id quam. Morbi mi. Quisque nisl felis, venenatis tristique, dignissim in, ultrices sit amet, augue.",
    ],
  },
  {
    slug: "tools-for-thought",
    title: "Building Tools for Thought: Beyond the Static Canvas",
    date: "Dec 2025",
    category: "Essays",
    readingTime: "7 min read",
    excerpt: "How dynamic media and interactive visual environments augment human cognition.",
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "Proin pharetra nonummy pede. Mauris et orci. Aenean nec lorem. In porttitor. Donec laoreet nonummy augue. Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc.",
    ],
  },
  {
    slug: "constraint-solvers-computational-layout",
    title: "Exploring Constraint Solvers in Computational Layout",
    date: "Nov 2025",
    category: "Graphics",
    readingTime: "10 min read",
    excerpt: "Formulating 2D UI composition and spatial geometry as linear programming and Simplex problems.",
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eu magna sit amet metus fermentum posuere. Morbi sit amet nulla sed dolor elementum imperdiet. Quisque fermentum. Mauris pellentesque mollis molestie.",
      "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.",
      "Donec lobortis risus a elit. Etiam tempor. Ut convallis, sem sit amet interdum consectetuer, odio augue aliquam leo, nec dapibus tortor nibh sed augue. Integer eu magna sit amet metus fermentum posuere.",
    ],
  },
];

function formatPostDoc(doc: any): Post {
  return {
    slug: doc.slug,
    title: doc.title,
    date: doc.date || (doc.createdAt ? new Date(doc.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Recent'),
    category: doc.category || 'Writing',
    readingTime: doc.readingTime || '5 min read',
    excerpt: doc.excerpt || '',
    content: doc.content || (doc.excerpt ? [doc.excerpt] : ['No content provided.']),
  }
}

export async function getPosts(): Promise<Post[]> {
  // 1. If remote PAYLOAD_URL is configured (e.g. Vercel calling remote Cloudflare CMS)
  if (process.env.PAYLOAD_URL && process.env.PAYLOAD_URL !== 'local') {
    try {
      const res = await fetch(`${process.env.PAYLOAD_URL}/api/posts?where[status][equals]=published&limit=100`, {
        next: { revalidate: 60 },
      })
      if (res.ok) {
        const data = (await res.json()) as any
        if (data && data.docs && data.docs.length > 0) {
          return data.docs.map((doc: any) => formatPostDoc(doc))
        }
      }
    } catch (err) {
      console.debug('Error fetching posts from remote PAYLOAD_URL:', err)
    }
  }

  // 2. Local Payload instance / D1
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'posts',
      where: {
        status: {
          equals: 'published',
        },
      },
      limit: 100,
    })

    if (result.docs && result.docs.length > 0) {
      return result.docs.map((doc: any) => formatPostDoc(doc))
    }
  } catch (err) {
    console.debug('Payload D1 fetch fallback:', err)
  }

  return fallbackPosts
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  // 1. If remote PAYLOAD_URL is configured
  if (process.env.PAYLOAD_URL && process.env.PAYLOAD_URL !== 'local') {
    try {
      const res = await fetch(`${process.env.PAYLOAD_URL}/api/posts?where[slug][equals]=${encodeURIComponent(slug)}&limit=1`, {
        next: { revalidate: 60 },
      })
      if (res.ok) {
        const data = (await res.json()) as any
        if (data && data.docs && data.docs.length > 0) {
          return formatPostDoc(data.docs[0])
        }
      }
    } catch (err) {
      console.debug('Error fetching post by slug from remote PAYLOAD_URL:', err)
    }
  }

  // 2. Local Payload instance / D1
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'posts',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    })

    if (result.docs && result.docs.length > 0) {
      return formatPostDoc(result.docs[0])
    }
  } catch (err) {
    console.debug('Local Payload fetch fallback:', err)
  }

  return fallbackPosts.find((p) => p.slug === slug)
}
