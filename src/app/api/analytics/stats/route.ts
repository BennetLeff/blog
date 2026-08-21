import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

function resolveDatabaseUuid(id?: string): string {
  const defaultUuid = '59827847-99eb-48cb-8df2-af50185c82ca'
  if (!id) return defaultUuid
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return uuidRegex.test(id) ? id : defaultUuid
}

export async function GET(req: NextRequest) {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID || '03f642afe070f05b727f7cd31f02ef48'
  const databaseId = resolveDatabaseUuid(process.env.CLOUDFLARE_DATABASE_ID || process.env.CLOUDFLARE_D1_REMOTE)
  const apiToken = process.env.CLOUDFLARE_API_TOKEN

  try {
    if (apiToken) {
      const sqlQueries = [
        // 0: Total stats
        `SELECT count(*) as total_views, count(DISTINCT ip_hash) as unique_visitors FROM page_views;`,
        // 1: Daily timeline (last 14 days)
        `SELECT substr(created_at, 1, 10) as date, count(*) as views, count(DISTINCT ip_hash) as uniques FROM page_views WHERE created_at >= datetime('now', '-14 days') GROUP BY substr(created_at, 1, 10) ORDER BY date ASC;`,
        // 2: Top Pages
        `SELECT path, count(*) as views, count(DISTINCT ip_hash) as uniques FROM page_views GROUP BY path ORDER BY views DESC LIMIT 10;`,
        // 3: Top Countries
        `SELECT country, count(*) as count FROM page_views WHERE country IS NOT NULL AND country != '' GROUP BY country ORDER BY count DESC LIMIT 10;`,
        // 4: Top Cities
        `SELECT city, country, count(*) as count FROM page_views WHERE city IS NOT NULL AND city != '' GROUP BY city, country ORDER BY count DESC LIMIT 10;`,
        // 5: Top Referrers
        `SELECT referrer, count(*) as count FROM page_views WHERE referrer IS NOT NULL AND referrer != '' GROUP BY referrer ORDER BY count DESC LIMIT 10;`,
        // 6: Recent 25 visitors with IP
        `SELECT id, path, ip, city, country, region, referrer, user_agent, created_at FROM page_views ORDER BY id DESC LIMIT 25;`
      ].join('\n')

      const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sql: sqlQueries }),
        cache: 'no-store',
      })

      if (res.ok) {
        const data = await res.json() as any
        const results = data.result || []
        
        const totals = results[0]?.results?.[0] || { total_views: 0, unique_visitors: 0 }
        const daily = results[1]?.results || []
        const topPages = results[2]?.results || []
        const topCountries = results[3]?.results || []
        const topCities = results[4]?.results || []
        const topReferrers = results[5]?.results || []
        const recent = results[6]?.results || []

        return NextResponse.json({
          ok: true,
          totals: {
            totalViews: Number(totals.total_views || 0),
            uniqueVisitors: Number(totals.unique_visitors || 0),
          },
          daily,
          topPages,
          topCountries,
          topCities,
          topReferrers,
          recent,
        })
      }
    }

    // Fallback via Payload Local API
    const payload = await getPayload({ config })
    const allViews = await payload.find({
      collection: 'page_views',
      limit: 1000,
      sort: '-createdAt',
    })

    const docs = allViews.docs || []
    const totalViews = docs.length
    const uniqueIps = new Set(docs.map((d: any) => d.ipHash).filter(Boolean))
    const uniqueVisitors = uniqueIps.size

    // Aggregate daily
    const dailyMap: Record<string, { views: number; uniques: Set<string> }> = {}
    docs.forEach((doc: any) => {
      const date = (doc.createdAt || '').slice(0, 10)
      if (!date) return
      if (!dailyMap[date]) dailyMap[date] = { views: 0, uniques: new Set() }
      dailyMap[date].views++
      if (doc.ipHash) dailyMap[date].uniques.add(doc.ipHash)
    })

    const daily = Object.entries(dailyMap)
      .map(([date, data]) => ({ date, views: data.views, uniques: data.uniques.size }))
      .sort((a, b) => a.date.localeCompare(b.date))

    // Aggregate pages
    const pageMap: Record<string, number> = {}
    docs.forEach((d: any) => {
      pageMap[d.path] = (pageMap[d.path] || 0) + 1
    })
    const topPages = Object.entries(pageMap)
      .map(([path, views]) => ({ path, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10)

    // Aggregate countries
    const countryMap: Record<string, number> = {}
    docs.forEach((d: any) => {
      if (d.country) countryMap[d.country] = (countryMap[d.country] || 0) + 1
    })
    const topCountries = Object.entries(countryMap)
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    // Aggregate cities
    const cityMap: Record<string, { city: string; country: string; count: number }> = {}
    docs.forEach((d: any) => {
      if (d.city) {
        const key = `${d.city}, ${d.country || ''}`
        if (!cityMap[key]) cityMap[key] = { city: d.city, country: d.country || '', count: 0 }
        cityMap[key].count++
      }
    })
    const topCities = Object.values(cityMap)
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    // Aggregate referrers
    const refMap: Record<string, number> = {}
    docs.forEach((d: any) => {
      if (d.referrer) refMap[d.referrer] = (refMap[d.referrer] || 0) + 1
    })
    const topReferrers = Object.entries(refMap)
      .map(([referrer, count]) => ({ referrer, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    return NextResponse.json({
      ok: true,
      totals: {
        totalViews,
        uniqueVisitors,
      },
      daily,
      topPages,
      topCountries,
      topCities,
      topReferrers,
      recent: docs.slice(0, 25),
    })
  } catch (err: any) {
    console.error('Analytics stats error:', err)
    return NextResponse.json({ ok: false, error: err?.message }, { status: 500 })
  }
}
