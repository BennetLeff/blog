import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

function hashIp(ip: string): string {
  const today = new Date().toISOString().slice(0, 10)
  return crypto
    .createHash('sha256')
    .update(`${ip}-${today}-bennet-blog-salt`)
    .digest('hex')
    .slice(0, 16)
}

function sqlEscape(val: any): string {
  if (val === null || val === undefined) return 'NULL'
  if (typeof val === 'number') return String(val)
  return `'${String(val).replace(/'/g, "''")}'`
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const path = typeof body.path === 'string' ? body.path : '/'
    const clientReferrer = typeof body.referrer === 'string' ? body.referrer : ''

    // Ignore admin visits or bots from polluting stats
    if (path.startsWith('/admin') || path.startsWith('/api')) {
      return NextResponse.json({ ok: true, ignored: true })
    }

    const headers = req.headers
    const userAgent = headers.get('user-agent') || ''

    // Bot detection
    const isBot = /bot|crawl|spider|slurp|facebookexternalhit|whatsapp|googlebot|bingbot/i.test(userAgent)
    if (isBot) {
      return NextResponse.json({ ok: true, bot: true })
    }

    // Extract geolocation headers (Vercel & Cloudflare Edge headers)
    const country = headers.get('x-vercel-ip-country') || headers.get('cf-ipcountry') || null
    const cityRaw = headers.get('x-vercel-ip-city') || headers.get('cf-ipcity') || null
    const city = cityRaw ? decodeURIComponent(cityRaw) : null
    const region = headers.get('x-vercel-ip-country-region') || headers.get('cf-region') || null
    const latStr = headers.get('x-vercel-ip-latitude')
    const lonStr = headers.get('x-vercel-ip-longitude')
    const latitude = latStr ? parseFloat(latStr) : null
    const longitude = lonStr ? parseFloat(lonStr) : null

    const rawIp = headers.get('x-forwarded-for')?.split(',')[0]?.trim() || headers.get('x-real-ip') || 'unknown'
    const ipHash = hashIp(rawIp)
    const referrer = clientReferrer || headers.get('referer') || null

    const now = new Date().toISOString()

    function resolveDatabaseUuid(id?: string): string {
      const defaultUuid = '59827847-99eb-48cb-8df2-af50185c82ca'
      if (!id) return defaultUuid
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
      return uuidRegex.test(id) ? id : defaultUuid
    }

    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID || '03f642afe070f05b727f7cd31f02ef48'
    const databaseId = resolveDatabaseUuid(process.env.CLOUDFLARE_DATABASE_ID || process.env.CLOUDFLARE_D1_REMOTE)
    const apiToken = process.env.CLOUDFLARE_API_TOKEN

    if (apiToken) {
      try {
        const sql = `INSERT INTO page_views (path, country, city, region, latitude, longitude, referrer, user_agent, ip_hash, created_at, updated_at) VALUES (${sqlEscape(path)}, ${sqlEscape(country)}, ${sqlEscape(city)}, ${sqlEscape(region)}, ${latitude !== null ? latitude : 'NULL'}, ${longitude !== null ? longitude : 'NULL'}, ${sqlEscape(referrer)}, ${sqlEscape(userAgent)}, ${sqlEscape(ipHash)}, ${sqlEscape(now)}, ${sqlEscape(now)});`
        await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sql }),
          cache: 'no-store',
        })
        return NextResponse.json({ ok: true })
      } catch (err) {
        console.debug('D1 HTTP tracking error:', err)
      }
    }

    // 2. Fallback to Payload Local API
    try {
      const payload = await getPayload({ config })
      await payload.create({
        collection: 'page_views',
        data: {
          path,
          country: country || undefined,
          city: city || undefined,
          region: region || undefined,
          latitude: latitude || undefined,
          longitude: longitude || undefined,
          referrer: referrer || undefined,
          userAgent,
          ipHash,
        },
      })
    } catch (err) {
      console.debug('Payload local tracking error:', err)
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Analytics tracking error:', error)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
