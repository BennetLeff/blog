'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export function AnalyticsTracker() {
  const pathname = usePathname()
  const lastTrackedPath = useRef<string | null>(null)

  useEffect(() => {
    // Avoid double counting same path in fast-refresh/strict-mode
    if (!pathname || pathname === lastTrackedPath.current) return
    if (pathname.startsWith('/admin') || pathname.startsWith('/api')) return

    lastTrackedPath.current = pathname

    const payload = JSON.stringify({
      path: pathname,
      referrer: typeof document !== 'undefined' ? document.referrer : '',
    })

    try {
      if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
        const blob = new Blob([payload], { type: 'application/json' })
        navigator.sendBeacon('/api/analytics/track', blob)
      } else {
        fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true,
        }).catch(() => {})
      }
    } catch (err) {
      // Silent catch so tracker never interrupts user experience
    }
  }, [pathname])

  return null
}
