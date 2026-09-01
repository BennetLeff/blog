'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

interface StatsData {
  totals: {
    totalViews: number
    uniqueVisitors: number
  }
  daily: Array<{
    date: string
    views: number
    uniques: number
  }>
  topPages: Array<{
    path: string
    views: number
    uniques?: number
  }>
  topCountries: Array<{
    country: string
    count: number
  }>
  topCities: Array<{
    city: string
    country: string
    count: number
  }>
  topReferrers: Array<{
    referrer: string
    count: number
  }>
  recent?: Array<{
    id: number
    path: string
    ip?: string
    city?: string
    country?: string
    region?: string
    referrer?: string
    user_agent?: string
    userAgent?: string
    created_at?: string
    createdAt?: string
  }>
}

export default function AnalyticsPage() {
  const [data, setData] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hoveredDay, setHoveredDay] = useState<any | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchStats = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/analytics/stats', { cache: 'no-store' })
      if (res.status === 401) {
        window.location.href = '/admin/login?redirect=/analytics'
        return
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      if (json.ok) {
        setData(json)
        setLastUpdated(new Date())
      } else {
        throw new Error(json.error || 'Failed to load stats')
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to load analytics')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
    const interval = setInterval(fetchStats, 30000)
    return () => clearInterval(interval)
  }, [])

  const totals = data?.totals || { totalViews: 0, uniqueVisitors: 0 }
  const daily = data?.daily || []
  const topPages = data?.topPages || []
  const topCountries = data?.topCountries || []
  const topCities = data?.topCities || []
  const topReferrers = data?.topReferrers || []
  const recent = data?.recent || []

  const maxDailyViews = Math.max(...daily.map((d) => d.views), 5)
  const maxPageViews = Math.max(...topPages.map((p) => p.views), 1)
  const maxCountryViews = Math.max(...topCountries.map((c) => c.count), 1)
  const topLocation = topCities[0] ? `${topCities[0].city}, ${topCities[0].country}` : (topCountries[0]?.country || 'None yet')
  const topReferrer = topReferrers[0]?.referrer ? topReferrers[0].referrer.replace(/^https?:\/\//, '').replace(/\/.*$/, '') : 'Direct'

  return (
    <main className="min-h-screen max-w-5xl mx-auto px-6 py-12 sm:py-16 font-sans">
      {/* Navigation */}
      <div className="flex justify-between items-center mb-10 pb-6 border-b border-[#d4cdc0]">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-mono text-[#575249] hover:text-[#d84715] transition-colors"
        >
          ← Bennet Leff
        </Link>
        <div className="flex items-center gap-4">
          {lastUpdated && (
            <span className="text-xs font-mono text-[#6e675c]">
              Updated {lastUpdated.toLocaleTimeString()}
            </span>
          )}
          <button
            type="button"
            onClick={fetchStats}
            disabled={loading}
            className="px-3 py-1 text-xs font-mono bg-[#ded7c8] hover:bg-[#d4cdc0] text-[#1c1a17] rounded border border-[#d4cdc0] transition-colors"
          >
            {loading ? 'Refreshing...' : '↻ Refresh'}
          </button>
        </div>
      </div>

      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-normal text-[#1c1a17] tracking-tight mb-2">
          Visitor Analytics
        </h1>
        <p className="text-base text-[#524d44]">
          Real-time first-party visitor telemetry stored directly in Cloudflare D1.
        </p>
      </div>

      {error && (
        <div className="p-4 mb-8 bg-[#fee2e2] text-[#991b1b] border border-[#fca5a5] rounded-lg font-mono text-sm">
          Failed to load stats: {error}
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="p-5 rounded-lg border border-[#d4cdc0] bg-[#ded7c8]/50 shadow-2xs">
          <div className="text-xs font-mono uppercase tracking-wider text-[#6e675c] mb-1">Total Page Views</div>
          <div className="text-3xl sm:text-4xl font-bold text-[#d84715] font-mono">
            {totals.totalViews.toLocaleString()}
          </div>
        </div>

        <div className="p-5 rounded-lg border border-[#d4cdc0] bg-[#ded7c8]/50 shadow-2xs">
          <div className="text-xs font-mono uppercase tracking-wider text-[#6e675c] mb-1">Unique Visitors</div>
          <div className="text-3xl sm:text-4xl font-bold text-[#1c1a17] font-mono">
            {totals.uniqueVisitors.toLocaleString()}
          </div>
        </div>

        <div className="p-5 rounded-lg border border-[#d4cdc0] bg-[#ded7c8]/50 shadow-2xs">
          <div className="text-xs font-mono uppercase tracking-wider text-[#6e675c] mb-1">Top Location</div>
          <div className="text-lg sm:text-xl font-semibold text-[#1c1a17] truncate mt-1">
            {topLocation}
          </div>
        </div>

        <div className="p-5 rounded-lg border border-[#d4cdc0] bg-[#ded7c8]/50 shadow-2xs">
          <div className="text-xs font-mono uppercase tracking-wider text-[#6e675c] mb-1">Top Referrer</div>
          <div className="text-lg sm:text-xl font-semibold text-[#1c1a17] truncate mt-1">
            {topReferrer}
          </div>
        </div>
      </div>

      {/* 14-Day Traffic Trend Bar Chart */}
      <div className="p-6 rounded-lg border border-[#d4cdc0] bg-[#ded7c8]/40 shadow-2xs mb-10">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-semibold text-[#1c1a17]">Traffic Trend (Past 14 Days)</h2>
            <p className="text-xs font-mono text-[#6e675c] mt-0.5">Daily page views vs unique visitors</p>
          </div>
          {hoveredDay && (
            <div className="px-3 py-1 bg-[#d84715] text-white rounded text-xs font-mono">
              {hoveredDay.date}: <strong>{hoveredDay.views}</strong> views ({hoveredDay.uniques} unique)
            </div>
          )}
        </div>

        {daily.length === 0 ? (
          <div className="h-40 flex items-center justify-center text-sm font-mono text-[#6e675c] italic">
            No visitor traffic recorded in the past 14 days.
          </div>
        ) : (
          <div className="flex items-end gap-2 sm:gap-3 h-48 pt-4 border-b border-[#d4cdc0]">
            {daily.map((day) => {
              const heightPct = Math.max((day.views / maxDailyViews) * 100, 8)
              const uniqueHeightPct = Math.max((day.uniques / maxDailyViews) * 100, 4)

              return (
                <div
                  key={day.date}
                  onMouseEnter={() => setHoveredDay(day)}
                  onMouseLeave={() => setHoveredDay(null)}
                  className="flex-1 flex flex-col items-center h-full justify-end cursor-pointer group relative"
                >
                  <div className="w-full max-w-[36px] bg-[#e87b54] rounded-t transition-all group-hover:opacity-90 flex flex-col justify-end" style={{ height: `${heightPct}%` }}>
                    <div className="w-full bg-[#d84715] rounded-t" style={{ height: `${(day.uniques / day.views) * 100}%` }} />
                  </div>
                  <span className="text-[10px] sm:text-xs font-mono text-[#6e675c] mt-2 whitespace-nowrap">
                    {day.date.slice(5)}
                  </span>
                </div>
              )
            })}
          </div>
        )}

        <div className="flex items-center gap-6 mt-4 text-xs font-mono text-[#6e675c]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#e87b54] rounded-xs" />
            <span>Total Views</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#d84715] rounded-xs" />
            <span>Unique Visitors</span>
          </div>
        </div>
      </div>

      {/* Grid: Top Pages + Geographies */}
      <div className="grid md:grid-cols-2 gap-8 mb-10">
        {/* Top Pages */}
        <div className="p-6 rounded-lg border border-[#d4cdc0] bg-[#ded7c8]/40 shadow-2xs">
          <h2 className="text-lg font-semibold text-[#1c1a17] mb-4">Top Pages Visited</h2>
          {topPages.length === 0 ? (
            <p className="text-sm italic text-[#6e675c]">No page visits tracked yet.</p>
          ) : (
            <div className="space-y-3">
              {topPages.map((page) => {
                const widthPct = (page.views / maxPageViews) * 100
                return (
                  <div key={page.path}>
                    <div className="flex justify-between text-xs sm:text-sm font-mono mb-1">
                      <Link href={page.path} className="text-[#1c1a17] hover:text-[#d84715] truncate max-w-[80%] underline">
                        {page.path}
                      </Link>
                      <span className="font-semibold text-[#d84715]">{page.views}</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#d4cdc0]/60 rounded-full overflow-hidden">
                      <div className="h-full bg-[#d84715] rounded-full" style={{ width: `${widthPct}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Top Geographies */}
        <div className="p-6 rounded-lg border border-[#d4cdc0] bg-[#ded7c8]/40 shadow-2xs">
          <h2 className="text-lg font-semibold text-[#1c1a17] mb-4">Top Countries & Cities</h2>
          {topCountries.length === 0 ? (
            <p className="text-sm italic text-[#6e675c]">No location data recorded yet.</p>
          ) : (
            <div className="space-y-3">
              {topCountries.slice(0, 7).map((country) => {
                const widthPct = (country.count / maxCountryViews) * 100
                return (
                  <div key={country.country}>
                    <div className="flex justify-between text-xs sm:text-sm font-mono mb-1">
                      <span className="text-[#1c1a17]">{country.country}</span>
                      <span className="font-semibold text-[#524d44]">{country.count} views</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#d4cdc0]/60 rounded-full overflow-hidden">
                      <div className="h-full bg-[#524d44] rounded-full" style={{ width: `${widthPct}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Live Recent Visitor Log Table */}
      <div className="p-6 rounded-lg border border-[#d4cdc0] bg-[#ded7c8]/40 shadow-2xs">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-[#1c1a17]">Live Visitor Stream (Recent Hits)</h2>
          <span className="text-xs font-mono text-[#6e675c]">{recent.length} recent events</span>
        </div>

        {recent.length === 0 ? (
          <p className="text-sm italic text-[#6e675c]">No recent hits recorded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[#d4cdc0] text-[#6e675c]">
                  <th className="pb-2 font-medium">Path</th>
                  <th className="pb-2 font-medium">IP Address</th>
                  <th className="pb-2 font-medium">Location</th>
                  <th className="pb-2 font-medium">Referrer</th>
                  <th className="pb-2 font-medium">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d4cdc0]/50">
                {recent.map((hit) => {
                  const location = [hit.city, hit.country].filter(Boolean).join(', ') || 'Unknown'
                  const timeStr = hit.created_at || hit.createdAt || ''
                  return (
                    <tr key={hit.id} className="hover:bg-[#d6cfbe]/30 transition-colors">
                      <td className="py-2.5 pr-3 text-[#1c1a17] font-medium">{hit.path}</td>
                      <td className="py-2.5 pr-3 text-[#d84715]">{hit.ip || 'Recorded'}</td>
                      <td className="py-2.5 pr-3 text-[#524d44]">{location}</td>
                      <td className="py-2.5 pr-3 text-[#6e675c] truncate max-w-[150px]">{hit.referrer || 'Direct'}</td>
                      <td className="py-2.5 text-[#6e675c] whitespace-nowrap">
                        {timeStr ? new Date(timeStr).toLocaleTimeString() : ''}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  )
}
