'use client'

import React from 'react'
import Link from 'next/link'
import { AnalyticsDashboard } from './AnalyticsDashboard'

export function DashboardOverview() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px 0', fontFamily: 'inherit' }}>
      {/* Quick Navigation Cards */}
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--theme-text, #1c1a17)', marginBottom: '14px' }}>
          Quick Actions
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          <Link
            href="/admin/collections/posts/create"
            style={{
              display: 'block',
              padding: '20px',
              backgroundColor: '#d84715',
              color: '#ffffff',
              borderRadius: '8px',
              textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}
          >
            <div style={{ fontSize: '22px', marginBottom: '8px' }}>✍️</div>
            <div style={{ fontSize: '16px', fontWeight: 600 }}>Create New Post</div>
            <div style={{ fontSize: '12px', opacity: 0.9, marginTop: '4px' }}>Draft a new essay with rich text & code blocks</div>
          </Link>

          <Link
            href="/admin/collections/posts"
            style={{
              display: 'block',
              padding: '20px',
              backgroundColor: 'var(--theme-elevation-50, #fcfbfa)',
              border: '1px solid var(--theme-elevation-150, #e6e2d8)',
              color: 'var(--theme-text, #1c1a17)',
              borderRadius: '8px',
              textDecoration: 'none',
            }}
          >
            <div style={{ fontSize: '22px', marginBottom: '8px' }}>📚</div>
            <div style={{ fontSize: '16px', fontWeight: 600 }}>Manage Posts</div>
            <div style={{ fontSize: '12px', color: 'var(--theme-elevation-500, #666)', marginTop: '4px' }}>Edit, publish, and organize your essays</div>
          </Link>

          <Link
            href="/admin/collections/page_views"
            style={{
              display: 'block',
              padding: '20px',
              backgroundColor: 'var(--theme-elevation-50, #fcfbfa)',
              border: '1px solid var(--theme-elevation-150, #e6e2d8)',
              color: 'var(--theme-text, #1c1a17)',
              borderRadius: '8px',
              textDecoration: 'none',
            }}
          >
            <div style={{ fontSize: '22px', marginBottom: '8px' }}>📊</div>
            <div style={{ fontSize: '16px', fontWeight: 600 }}>Visitor Analytics</div>
            <div style={{ fontSize: '12px', color: 'var(--theme-elevation-500, #666)', marginTop: '4px' }}>Live geographic data & traffic charts</div>
          </Link>

          <Link
            href="/admin/collections/media"
            style={{
              display: 'block',
              padding: '20px',
              backgroundColor: 'var(--theme-elevation-50, #fcfbfa)',
              border: '1px solid var(--theme-elevation-150, #e6e2d8)',
              color: 'var(--theme-text, #1c1a17)',
              borderRadius: '8px',
              textDecoration: 'none',
            }}
          >
            <div style={{ fontSize: '22px', marginBottom: '8px' }}>🖼️</div>
            <div style={{ fontSize: '16px', fontWeight: 600 }}>Media Library</div>
            <div style={{ fontSize: '12px', color: 'var(--theme-elevation-500, #666)', marginTop: '4px' }}>Upload and manage Cloudflare R2 files</div>
          </Link>
        </div>
      </div>

      {/* Embedded Live Analytics Dashboard */}
      <AnalyticsDashboard />
    </div>
  )
}
