import fs from 'fs'
import path from 'path'
import { sqliteD1Adapter } from '@payloadcms/db-d1-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { r2Storage } from '@payloadcms/storage-r2'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'

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
  collections: [Users, Media, Posts],
  editor: lexicalEditor(),
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
