import fs from 'fs'
import path from 'path'
import { sqliteD1Adapter } from '@payloadcms/db-d1-sqlite'
import { lexicalEditor, BlocksFeature, CodeBlock, FixedToolbarFeature, InlineToolbarFeature } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { s3Storage } from '@payloadcms/storage-s3'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { PageViews } from './collections/PageViews'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const cloudflare = typeof window === 'undefined' ? await getCloudflareContext() : { env: {} }

const r2AccessKeyId =
  process.env.R2_ACCESS_KEY_ID ||
  process.env.CLOUDFLARE_R2_ACCESS_KEY_ID ||
  'ac0476fa1d6aa11ccc9a4cb030d360a3'

const r2SecretAccessKey =
  process.env.R2_SECRET_ACCESS_KEY ||
  process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY ||
  '2491a8158dd7926ceaa59a226568b41b7842dde67de38910d7692bcab2b262ec'

const r2AccountId =
  process.env.CLOUDFLARE_ACCOUNT_ID ||
  '03f642afe070f05b727f7cd31f02ef48'

const r2Bucket =
  process.env.R2_BUCKET ||
  'blog-media'

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Posts, PageViews],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      FixedToolbarFeature(),
      InlineToolbarFeature(),
      BlocksFeature({
        blocks: [
          CodeBlock(),
        ],
      }),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || 'fallback-secret-for-development-32chars',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteD1Adapter({
    binding: cloudflare?.env?.D1 as any,
    push: false,
  }),
  plugins: [
    s3Storage({
      collections: {
        media: {
          generateFileURL: ({ filename, prefix }) => {
            const publicUrl = process.env.R2_PUBLIC_URL || process.env.NEXT_PUBLIC_R2_URL
            if (publicUrl) {
              return `${publicUrl.replace(/\/$/, '')}/${prefix ? `${prefix}/` : ''}${filename}`
            }
            return `/api/media/file/${filename}`
          },
        },
      },
      bucket: r2Bucket,
      config: {
        credentials: {
          accessKeyId: r2AccessKeyId,
          secretAccessKey: r2SecretAccessKey,
        },
        region: 'auto',
        endpoint: `https://${r2AccountId}.r2.cloudflarestorage.com`,
      },
    }),
  ],
})

function resolveDatabaseUuid(id?: string): string {
  const defaultUuid = '59827847-99eb-48cb-8df2-af50185c82ca'
  if (!id) return defaultUuid
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return uuidRegex.test(id) ? id : defaultUuid
}

async function getCloudflareContext(): Promise<any> {
  if (typeof window !== 'undefined') {
    return { env: {} }
  }

  // 1. Production / Vercel with Cloudflare API Token (direct HTTP connection to D1)
  if (process.env.CLOUDFLARE_API_TOKEN || process.env.VERCEL || process.env.NODE_ENV === 'production') {
    try {
      const { createD1HttpClient } = await import('./lib/d1-http')
      const client = createD1HttpClient({
        accountId: process.env.CLOUDFLARE_ACCOUNT_ID || '03f642afe070f05b727f7cd31f02ef48',
        databaseId: resolveDatabaseUuid(process.env.CLOUDFLARE_DATABASE_ID || process.env.CLOUDFLARE_D1_REMOTE),
        apiToken: process.env.CLOUDFLARE_API_TOKEN || '',
      })
      return { env: { D1: client } }
    } catch (err) {
      console.error('Failed to initialize D1 HTTP client:', err)
    }
  }

  // 2. Local development with Wrangler platform proxy
  if ((globalThis as any).__cf_proxy) {
    return (globalThis as any).__cf_proxy
  }
  try {
    const wranglerPkg = `${'__wrangler'.replaceAll('_', '')}`
    const { getPlatformProxy } = await import(/* webpackIgnore: true */ wranglerPkg)
    const proxy = await getPlatformProxy({
      environment: process.env.CLOUDFLARE_ENV,
      remoteBindings: true,
    })
    ;(globalThis as any).__cf_proxy = proxy
    return proxy
  } catch (err) {
    console.debug('Failed to get cloudflare proxy context:', err)
    return { env: {} }
  }
}
