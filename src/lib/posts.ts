import { getPayload } from 'payload'
import config from '@payload-config'

export interface Post {
  slug: string;
  title: string;
  date: string;
  publishedAt?: string;
  category: string;
  readingTime: string;
  excerpt: string;
  content: any;
}

export const defaultRealPosts: Post[] = [
  {
    slug: "hurdy-gurdy-simulator",
    title: "A Hurdy Gurdy Simulator in Rust",
    date: "Aug 2026",
    publishedAt: "2026-08-17T21:48:15.945Z",
    category: "Tinkering",
    readingTime: "idk how long this will take you to read",
    excerpt: "A hurdy gurdy simulator in rust",
    content: {
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: "The ",
                type: "text",
                version: 1,
              },
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: "Hurdy Gurdy",
                    type: "text",
                    version: 1,
                  },
                ],
                direction: null,
                format: "",
                indent: 0,
                type: "link",
                version: 3,
                fields: {
                  linkType: "custom",
                  newTab: false,
                  url: "https://en.wikipedia.org/wiki/Hurdy-gurdy",
                },
                id: "6a837c39ce039264456b53d0",
              },
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: " is an old instrument with a funny name. I've been thinking about the instrument on and off since I saw it listed on the ",
                type: "text",
                version: 1,
              },
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: "Personnel",
                    type: "text",
                    version: 1,
                  },
                ],
                direction: null,
                format: "",
                indent: 0,
                type: "link",
                version: 3,
                fields: {
                  linkType: "custom",
                  newTab: false,
                  url: "https://en.wikipedia.org/wiki/The_Ape_of_Naples#Personnel",
                },
                id: "6a837c95ce039264456b53d1",
              },
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: " for Ape of Naples by Coil many years ago and thought the name sounded interesting. I've played around with software (and hardware) instruments ",
                type: "text",
                version: 1,
              },
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: "for years",
                    type: "text",
                    version: 1,
                  },
                ],
                direction: null,
                format: "",
                indent: 0,
                type: "link",
                version: 3,
                fields: {
                  linkType: "custom",
                  newTab: false,
                  url: "https://github.com/BennetLeff/BuzzSaw",
                },
                id: "6a837ce7ce039264456b53d2",
              },
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: " and felt like I could take a stab at a novel idea now that LLMs are sufficiently powerful in 2026. Beyond the technical curiosity and novelty of the project, there's a fundamental curiosity to explore: how do we test the code and output such that an agent can iterate on the code? This is a problem I've thrown many strategies at in my ",
                type: "text",
                version: 1,
              },
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: "Temper",
                    type: "text",
                    version: 1,
                  },
                ],
                direction: null,
                format: "",
                indent: 0,
                type: "link",
                version: 3,
                fields: {
                  linkType: "custom",
                  newTab: false,
                  url: "https://github.com/BennetLeff/temper",
                },
                id: "6a837d9fce039264456b53d3",
              },
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: " project which is more of an ongoing test against agent capabilities and less of a completable project. ",
                type: "text",
                version: 1,
              },
            ],
            direction: null,
            format: "",
            indent: 0,
            type: "paragraph",
            version: 1,
            textFormat: 0,
            textStyle: "",
          },
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: "There are a few elegant ways to test the generated output and code. ",
                type: "text",
                version: 1,
              },
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: "Property based testing",
                    type: "text",
                    version: 1,
                  },
                ],
                direction: null,
                format: "",
                indent: 0,
                type: "link",
                version: 3,
                fields: {
                  linkType: "custom",
                  newTab: false,
                  url: "https://en.wikipedia.org/wiki/Property_testing",
                },
                id: "6a837e15ce039264456b53d4",
              },
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: " and ",
                type: "text",
                version: 1,
              },
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: "metamorphic testin",
                    type: "text",
                    version: 1,
                  },
                ],
                direction: null,
                format: "",
                indent: 0,
                type: "link",
                version: 3,
                fields: {
                  linkType: "custom",
                  newTab: false,
                  url: "https://en.wikipedia.org/wiki/Metamorphic_testing",
                },
                id: "6a837e1fce039264456b53d5",
              },
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: "g. Property based testing has a rich history and literature, less so for metamorphic testing. To apply PBT to our project we sample from some distribution in the spaces of physical parameters, key sequences, and wheel speeds and run tests against each sample. We essentially fuzz our hurdy gurdy against a bunch of input states and ensure tests pass. ",
                type: "text",
                version: 1,
              },
            ],
            direction: null,
            format: "",
            indent: 0,
            type: "paragraph",
            version: 1,
            textFormat: 0,
            textStyle: "",
          },
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: "Metamorphic testing checks if some change to input produces some expected change to the output. This is handy because we don't need to specify an exact property to test rather a \"delta\" to validate. For instance, does pressing the key at time t produce a sample F(input) at time 0, where F is some audio output function and does pressing a key at time t+n produce a sample at F(input) at time n. In other words, does delaying the input by some seconds delay the output by a matching amount of time. Observe that this doesn't test some exact property of the system but rather a meta-property about the behavior of the system. We could write some complicated integration test to validate the actual rendered waveform of the instrument at each time however this is tricky to do in general and doesn't tell us anything about our generic system. It's also vulnerable to going out of date very quickly as our instrument is refined. ",
                type: "text",
                version: 1,
              },
            ],
            direction: null,
            format: "",
            indent: 0,
            type: "paragraph",
            version: 1,
            textFormat: 0,
            textStyle: "",
          },
        ],
        direction: null,
        format: "",
        indent: 0,
        type: "root",
        version: 1,
      },
    },
  },
  {
    slug: "temper",
    title: "Temper",
    date: "July 2026",
    publishedAt: "2026-08-17T22:42:04.135Z",
    category: "Tinkering",
    readingTime: "idk how long this will take you to read",
    excerpt: "Building verification tooling so agents can design an induction cooker in the box.",
    content: {
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: "I love to cook. I've even done popups where I got paid to cook my own ideas. I also love to build and tinker. I already have far too many kitchen devices but still don't have a ",
                type: "text",
                version: 1,
              },
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: "Breville Control Freak",
                    type: "text",
                    version: 1,
                  },
                ],
                direction: null,
                format: "",
                indent: 0,
                type: "link",
                version: 3,
                fields: {
                  linkType: "custom",
                  newTab: false,
                  url: "https://www.breville.com/en-us/product/bmc800",
                },
                id: "6a838aad035cf6094bbef334",
              },
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: ". It's $1500. How hard could it be to gut a cheap induction cooker and add temperature sensing and control? Obviously, it's actually pretty hard. ",
                type: "text",
                version: 1,
              },
            ],
            direction: null,
            format: "",
            indent: 0,
            type: "paragraph",
            version: 1,
            textFormat: 0,
            textStyle: "",
          },
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: "Why would you even want one of these. There's a large range of chemical reactions that occur as you sweep temperature up and down from at least 80f to 450f. Chocolate tempers around 90f. You might gently poach fish at 122f. You could cook at a steak at 135f and then sear it much higher. At 140f starches begin to gelatinize. At 155f fat begins to render. Around 175f alcohol burns off. You might start to (very) slowly caramelize sugars and white chocolate around 200f for the best white chocolate and miso ganache imaginable. Around these temperatures the Maillard reaction occurs more and more rapidly with each extra Joule put in (although can occur much lower if patient - ask me about my black garlic and plantains). Precise temperature control over long periods of time is tantamount to achieving any of these reactions in a controlled manner. ",
                type: "text",
                version: 1,
              },
            ],
            direction: null,
            format: "",
            indent: 0,
            type: "paragraph",
            version: 1,
            textFormat: 0,
            textStyle: "",
          },
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: "I'm okay at electronics projects. I've taken apart audio equipment and circuit bent some strange sound machines but I'm not that good. Instead of learning to be a power electronics engineer from scratch I'm approaching this from a different angle. I'm a much better software engineer so I'd like to lean in to that and see how far we can push this project purely by building \"in the box.\" If we can simulate each piece and add verifiable testing, ",
                type: "text",
                version: 1,
              },
              {
                detail: 0,
                format: 2,
                mode: "normal",
                style: "",
                text: "in theory",
                type: "text",
                version: 1,
              },
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: ", LLM based agents can actually build this for us. Instead of building a the project directly, I'll build a suite of validation tooling so agents can build it and we'll even walk away with tooling for the next project. ",
                type: "text",
                version: 1,
              },
            ],
            direction: null,
            format: "",
            indent: 0,
            type: "paragraph",
            version: 1,
            textFormat: 0,
            textStyle: "",
          },
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: "In PCB design there's a stage called ",
                type: "text",
                version: 1,
              },
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: "DRC",
                    type: "text",
                    version: 1,
                  },
                ],
                direction: null,
                format: "",
                indent: 0,
                type: "link",
                version: 3,
                fields: {
                  linkType: "custom",
                  newTab: false,
                  url: "https://en.wikipedia.org/wiki/Design_rule_checking",
                },
                id: "6a838ea1035cf6094bbef337",
              },
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: " which is essentially the stage where a design engineer would apply generic validations against the schematic, layout, and routing they've produced. The beauty of building DRC with agents is that we can 10x or 100x  the amount of validations that are standard in open source software and target them to just our specific schematic to be far more confident about the validity of our board. This way we can simulate much more of the process \"in the box\" where it's cheap (and drivable by agents). The board we're building is for an induction cooker, so we can go as far as running field solvers for inductance against the layout of components on our board and validate that things are approximately correct before we print a single PCB. ",
                type: "text",
                version: 1,
              },
            ],
            direction: null,
            format: "",
            indent: 0,
            type: "paragraph",
            version: 1,
            textFormat: 0,
            textStyle: "",
          },
        ],
        direction: null,
        format: "",
        indent: 0,
        type: "root",
        version: 1,
      },
    },
  },
];

function formatPostDoc(doc: any): Post {
  let parsedContent = doc.content
  if (typeof parsedContent === 'string') {
    try {
      parsedContent = JSON.parse(parsedContent)
    } catch {
      parsedContent = [parsedContent]
    }
  }

  const rawDate = doc.publishedAt || doc.published_at || doc.createdAt || doc.created_at
  const formattedDate = doc.date || (rawDate ? new Date(rawDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Recent')

  return {
    slug: doc.slug,
    title: doc.title,
    date: formattedDate,
    publishedAt: rawDate,
    category: doc.category || 'Writing',
    readingTime: doc.readingTime || doc.reading_time || '5 min read',
    excerpt: doc.excerpt || '',
    content: parsedContent || (doc.excerpt ? [doc.excerpt] : ['No content provided.']),
  }
}

async function fetchFromD1Http(slug?: string): Promise<Post[]> {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID || '03f642afe070f05b727f7cd31f02ef48'
  const databaseId = process.env.CLOUDFLARE_DATABASE_ID || '59827847-99eb-48cb-8df2-af50185c82ca'
  const apiToken = process.env.CLOUDFLARE_API_TOKEN

  if (!apiToken) return []

  try {
    const sqlQuery = slug
      ? `SELECT * FROM posts WHERE slug = '${slug.replace(/'/g, "''")}' AND status = 'published' LIMIT 1`
      : "SELECT * FROM posts WHERE status = 'published' ORDER BY COALESCE(published_at, created_at) DESC, id DESC"

    const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 },
    })

    if (res.ok) {
      const data = (await res.json()) as any
      if (data?.result?.[0]?.results?.length > 0) {
        return data.result[0].results.map((row: any) => formatPostDoc(row))
      }
    }
  } catch (err) {
    console.debug('D1 HTTP Query fallback error:', err)
  }
  return []
}

export async function getPosts(): Promise<Post[]> {
  // 1. Try D1 HTTP API directly (fastest on Vercel)
  const d1Posts = await fetchFromD1Http()
  if (d1Posts.length > 0) {
    return d1Posts
  }

  // 2. Try Payload Local API (local dev / worker)
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'posts',
      where: {
        status: {
          equals: 'published',
        },
      },
      sort: '-publishedAt',
      limit: 100,
    })

    if (result.docs && result.docs.length > 0) {
      return result.docs.map((doc: any) => formatPostDoc(doc))
    }
  } catch (err) {
    console.debug('Payload local fetch fallback:', err)
  }

  // 3. Guaranteed real posts
  return defaultRealPosts
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  // 1. Try D1 HTTP API directly
  const d1Posts = await fetchFromD1Http(slug)
  if (d1Posts.length > 0) {
    return d1Posts[0]
  }

  // 2. Try Payload Local API
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
    console.debug('Payload local fetch fallback:', err)
  }

  return defaultRealPosts.find((p) => p.slug === slug)
}
