import fs from 'fs'
import path from 'path'
import { sqliteD1Adapter } from '@payloadcms/db-d1-sqlite'
import { lexicalEditor, BlocksFeature, CodeBlock } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { r2Storage } from '@payloadcms/storage-r2'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { PageViews } from './collections/PageViews'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const cloudflare = await getCloudflareContext()

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
  }),
  plugins: [
    ...(cloudflare?.env?.R2
      ? [
          r2Storage({
            bucket: cloudflare.env.R2 as any,
            collections: { media: true },
          }),
        ]
      : []),
  ],
})

async function getCloudflareContext(): Promise<any> {
  // 1. Production / Vercel with Cloudflare API Token (direct HTTP connection to D1)
  if (process.env.CLOUDFLARE_API_TOKEN || process.env.VERCEL) {
    try {
      const { createD1HttpClient } = await import('./lib/d1-http')
      const client = createD1HttpClient({
        accountId: process.env.CLOUDFLARE_ACCOUNT_ID || '03f642afe070f05b727f7cd31f02ef48',
        databaseId: process.env.CLOUDFLARE_DATABASE_ID || process.env.CLOUDFLARE_D1_REMOTE || '59827847-99eb-48cb-8df2-af50185c82ca',
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
