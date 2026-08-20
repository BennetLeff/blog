export interface D1HttpConfig {
  accountId: string
  databaseId: string
  apiToken: string
}

export function createD1HttpClient(config: D1HttpConfig) {
  const { accountId, databaseId, apiToken } = config
  const baseUrl = `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}`

  async function executeHttp(sql: string, params: any[] = []) {
    if (!apiToken) {
      return { results: [], success: true, meta: {} }
    }

    try {
      const res = await fetch(`${baseUrl}/query`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sql,
          params,
        }),
        cache: 'no-store',
      })

      if (!res.ok) {
        const errText = await res.text()
        console.warn(`D1 HTTP Query failed (${res.status}): ${errText}`)
        return { results: [], success: false, meta: {} }
      }

      const data = await res.json() as any
      if (!data.success) {
        console.warn(`D1 query error: ${JSON.stringify(data.errors || data.messages)}`)
        return { results: [], success: false, meta: {} }
      }

      const firstResult = data.result?.[0] || { results: [], success: true, meta: {} }
      return firstResult
    } catch (err) {
      console.warn('D1 executeHttp network error:', err)
      return { results: [], success: false, meta: {} }
    }
  }

  function createPreparedStatement(sql: string, params: any[] = []) {
    return {
      bind(...newParams: any[]) {
        return createPreparedStatement(sql, newParams)
      },
      async all() {
        const result = await executeHttp(sql, params)
        return {
          results: result.results || [],
          success: result.success ?? true,
          meta: result.meta || {},
        }
      },
      async first(col?: string) {
        const result = await executeHttp(sql, params)
        const firstRow = result.results?.[0]
        if (!firstRow) return null
        return col ? firstRow[col] : firstRow
      },
      async run() {
        const result = await executeHttp(sql, params)
        return {
          results: result.results || [],
          success: result.success ?? true,
          meta: result.meta || {},
        }
      },
      async raw() {
        const result = await executeHttp(sql, params)
        const rows = result.results || []
        return rows.map((row: any) => (row && typeof row === 'object' ? Object.values(row) : [row]))
      },
    }
  }

  return {
    prepare(sql: string) {
      return createPreparedStatement(sql)
    },
    async batch(statements: any[]) {
      const results = []
      for (const stmt of statements) {
        results.push(await stmt.all())
      }
      return results
    },
    async exec(sql: string) {
      const result = await executeHttp(sql)
      return {
        count: result.meta?.changes || 0,
        duration: result.meta?.duration || 0,
      }
    },
  }
}
