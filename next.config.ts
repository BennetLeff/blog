import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-623f80b8688644d286a38f49e123ab86.r2.dev',
      },
    ],
  },
  serverExternalPackages: [
    'wrangler',
    'workerd',
    '@cloudflare/workerd-darwin-arm64',
    'jose',
    'pg-cloudflare',
  ],

  async redirects() {
    return [
      {
        source: '/admin/posts',
        destination: '/admin/collections/posts',
        permanent: false,
      },
      {
        source: '/admin/media',
        destination: '/admin/collections/media',
        permanent: false,
      },
      {
        source: '/admin/users',
        destination: '/admin/collections/users',
        permanent: false,
      },
      {
        source: '/admin/analytics',
        destination: '/analytics',
        permanent: false,
      },
      {
        source: '/admin/page_views',
        destination: '/admin/collections/page_views',
        permanent: false,
      },
      {
        source: '/infisical-intro',
        destination: 'https://pub-623f80b8688644d286a38f49e123ab86.r2.dev/infisical-intro.mp4',
        permanent: false,
      },
    ]
  },

  async headers() {
    return [
      {
        source: '/(favicon.*|apple-touch-icon.*|web-app-manifest.*|site\\.webmanifest)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'public, max-age=31536000',
          },
          {
            key: 'Cloudflare-CDN-Cache-Control',
            value: 'max-age=31536000',
          },
        ],
      },
      {
        source: '/resume.pdf',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'max-age=0, must-revalidate',
          },
          {
            key: 'Cloudflare-CDN-Cache-Control',
            value: 'max-age=0, must-revalidate',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'public, max-age=31536000',
          },
        ],
      },
      {
        source: '/((?!admin|api|resume\\.pdf|favicon.*|apple-touch-icon.*|web-app-manifest.*|site\\.webmanifest).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=60, stale-while-revalidate=86400',
          },
          {
            key: 'Cloudflare-CDN-Cache-Control',
            value: 'max-age=3600, stale-while-revalidate=86400',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },

  webpack: (webpackConfig: any) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
