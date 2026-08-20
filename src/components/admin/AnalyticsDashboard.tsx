'use client'

import React, { useEffect, useState } from 'react'

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
}

export function AnalyticsDashboard() {
  const [data, setData] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hoveredDay, setHoveredDay] = useState<any | null>(null)

  const fetchStats = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/analytics/stats')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      if (json.ok) {
        setData(json)
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
  }, [])

  if (loading) {
    return (
      <div style={{ padding: '24px', backgroundColor: 'var(--theme-elevation-50, #f8f7f4)', borderRadius: '8px', marginBottom: '24px', border: '1px solid var(--theme-elevation-150, #e6e2d8)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--theme-text, #1c1a17)' }}>
          <div style={{ width: '16px', height: '16px', border: '2px solid #d84715', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          <span style={{ fontFamily: 'monospace', fontSize: '14px' }}>Loading analytics data...</span>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div style={{ padding: '20px', backgroundColor: '#fef2f2', border: '1px solid #fee2e2', borderRadius: '8px', marginBottom: '24px', color: '#991b1b', fontSize: '14px', fontFamily: 'monospace' }}>
        Failed to load analytics summary. Error: {error}
      </div>
    )
  }

  const { totals, daily, topPages, topCountries, topCities, topReferrers } = data

  const maxDailyViews = Math.max(...daily.map((d) => d.views), 5)
  const maxPageViews = Math.max(...topPages.map((p) => p.views), 1)
  const maxCountryViews = Math.max(...topCountries.map((c) => c.count), 1)
  const topLocation = topCities[0] ? `${topCities[0].city}, ${topCities[0].country}` : (topCountries[0]?.country || 'None yet')
  const topReferrer = topReferrers[0]?.referrer ? topReferrers[0].referrer.replace(/^https?:\/\//, '').replace(/\/.*$/, '') : 'Direct'

  return (
    <div style={{ marginBottom: '32px', fontFamily: 'inherit' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 600, color: 'var(--theme-text, #1c1a17)' }}>
            Visitor Analytics & Geographics
          </h2>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--theme-elevation-500, #666)' }}>
            Real-time first-party insights stored in Cloudflare D1
          </p>
        </div>
        <button
          type="button"
          onClick={fetchStats}
          style={{
            padding: '6px 14px',
            fontSize: '12px',
            fontFamily: 'monospace',
            backgroundColor: 'var(--theme-elevation-100, #ece7da)',
            color: 'var(--theme-text, #1c1a17)',
            border: '1px solid var(--theme-elevation-200, #d4cdc0)',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          ↻ Refresh
        </button>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ padding: '16px 20px', backgroundColor: 'var(--theme-elevation-50, #fcfbfa)', borderRadius: '8px', border: '1px solid var(--theme-elevation-150, #e6e2d8)' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#666', fontFamily: 'monospace' }}>Total Views</div>
          <div style={{ fontSize: '28px', fontWeight: 700, marginTop: '6px', color: '#d84715' }}>{totals.totalViews.toLocaleString()}</div>
        </div>

        <div style={{ padding: '16px 20px', backgroundColor: 'var(--theme-elevation-50, #fcfbfa)', borderRadius: '8px', border: '1px solid var(--theme-elevation-150, #e6e2d8)' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#666', fontFamily: 'monospace' }}>Unique Visitors</div>
          <div style={{ fontSize: '28px', fontWeight: 700, marginTop: '6px', color: 'var(--theme-text, #1c1a17)' }}>{totals.uniqueVisitors.toLocaleString()}</div>
        </div>

        <div style={{ padding: '16px 20px', backgroundColor: 'var(--theme-elevation-50, #fcfbfa)', borderRadius: '8px', border: '1px solid var(--theme-elevation-150, #e6e2d8)' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#666', fontFamily: 'monospace' }}>Top Location</div>
          <div style={{ fontSize: '18px', fontWeight: 600, marginTop: '10px', color: 'var(--theme-text, #1c1a17)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {topLocation}
          </div>
        </div>

        <div style={{ padding: '16px 20px', backgroundColor: 'var(--theme-elevation-50, #fcfbfa)', borderRadius: '8px', border: '1px solid var(--theme-elevation-150, #e6e2d8)' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#666', fontFamily: 'monospace' }}>Top Referrer</div>
          <div style={{ fontSize: '18px', fontWeight: 600, marginTop: '10px', color: 'var(--theme-text, #1c1a17)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {topReferrer}
          </div>
        </div>
      </div>

      {/* Traffic Graph Chart */}
      <div style={{ padding: '20px', backgroundColor: 'var(--theme-elevation-50, #fcfbfa)', borderRadius: '8px', border: '1px solid var(--theme-elevation-150, #e6e2d8)', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: 'var(--theme-text, #1c1a17)' }}>
              Traffic Trend (Past 14 Days)
            </h3>
            <span style={{ fontSize: '12px', color: '#666', fontFamily: 'monospace' }}>
              Daily page views vs unique visitors
            </span>
          </div>
          {hoveredDay && (
            <div style={{ padding: '4px 10px', backgroundColor: '#d84715', color: '#fff', borderRadius: '4px', fontSize: '12px', fontFamily: 'monospace' }}>
              {hoveredDay.date}: <strong>{hoveredDay.views}</strong> views ({hoveredDay.uniques} unique)
            </div>
          )}
        </div>

        {daily.length === 0 ? (
          <div style={{ height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', fontSize: '13px', fontStyle: 'italic' }}>
            No traffic recorded in the past 14 days yet.
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '150px', paddingTop: '10px', borderBottom: '1px solid var(--theme-elevation-200, #d4cdc0)' }}>
            {daily.map((day) => {
              const heightPct = Math.max((day.views / maxDailyViews) * 100, 6)
              const uniqueHeightPct = Math.max((day.uniques / maxDailyViews) * 100, 3)

              return (
                <div
                  key={day.date}
                  onMouseEnter={() => setHoveredDay(day)}
                  onMouseLeave={() => setHoveredDay(null)}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100%',
                    justifyContent: 'flex-end',
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                >
                  {/* Bar container */}
                  <div style={{ width: '100%', maxWidth: '28px', height: `${heightPct}%`, backgroundColor: '#e87b54', borderRadius: '4px 4px 0 0', position: 'relative', transition: 'all 0.2s', display: 'flex', alignItems: 'flex-end' }}>
                    {/* Unique overlay */}
                    <div style={{ width: '100%', height: `${(day.uniques / day.views) * 100}%`, backgroundColor: '#d84715', borderRadius: '4px 4px 0 0' }} />
                  </div>
                  {/* Date label */}
                  <span style={{ fontSize: '10px', fontFamily: 'monospace', color: '#888', marginTop: '6px', whiteSpace: 'nowrap' }}>
                    {day.date.slice(5)}
                  </span>
                </div>
              )
            })}
          </div>
        )}

        <div style={{ display: 'flex', gap: '16px', marginTop: '12px', fontSize: '11px', fontFamily: 'monospace', color: '#666' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '10px', height: '10px', backgroundColor: '#e87b54', borderRadius: '2px' }} />
            <span>Total Views</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '10px', height: '10px', backgroundColor: '#d84715', borderRadius: '2px' }} />
            <span>Unique Visitors</span>
          </div>
        </div>
      </div>

      {/* Grid: Top Content + Geographics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Top Pages */}
        <div style={{ padding: '20px', backgroundColor: 'var(--theme-elevation-50, #fcfbfa)', borderRadius: '8px', border: '1px solid var(--theme-elevation-150, #e6e2d8)' }}>
          <h3 style={{ margin: '0 0 14px', fontSize: '15px', fontWeight: 600, color: 'var(--theme-text, #1c1a17)' }}>
            Top Pages Visited
          </h3>
          {topPages.length === 0 ? (
            <p style={{ fontSize: '13px', color: '#888', fontStyle: 'italic' }}>No pages tracked yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {topPages.map((p) => {
                const widthPct = (p.views / maxPageViews) * 100
                return (
                  <div key={p.path}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px', fontFamily: 'monospace' }}>
                      <span style={{ color: 'var(--theme-text, #1c1a17)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '80%' }}>
                        {p.path}
                      </span>
                      <span style={{ fontWeight: 600, color: '#d84715' }}>{p.views}</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--theme-elevation-200, #e6e2d8)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${widthPct}%`, height: '100%', backgroundColor: '#d84715', borderRadius: '3px' }} />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Top Geographies */}
        <div style={{ padding: '20px', backgroundColor: 'var(--theme-elevation-50, #fcfbfa)', borderRadius: '8px', border: '1px solid var(--theme-elevation-150, #e6e2d8)' }}>
          <h3 style={{ margin: '0 0 14px', fontSize: '15px', fontWeight: 600, color: 'var(--theme-text, #1c1a17)' }}>
            Top Countries & Cities
          </h3>
          {topCountries.length === 0 ? (
            <p style={{ fontSize: '13px', color: '#888', fontStyle: 'italic' }}>No geographic data yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {topCountries.slice(0, 5).map((c) => {
                const widthPct = (c.count / maxCountryViews) * 100
                return (
                  <div key={c.country}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px', fontFamily: 'monospace' }}>
                      <span style={{ color: 'var(--theme-text, #1c1a17)' }}>{c.country}</span>
                      <span style={{ fontWeight: 600, color: '#d84715' }}>{c.count} views</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--theme-elevation-200, #e6e2d8)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${widthPct}%`, height: '100%', backgroundColor: '#524d44', borderRadius: '3px' }} />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
