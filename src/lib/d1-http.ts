export interface D1HttpConfig {
  accountId: string
  databaseId: string
  apiToken: string
}

function resolveValidDatabaseId(id?: string): string {
  const defaultUuid = '59827847-99eb-48cb-8df2-af50185c82ca'
  if (!id) return defaultUuid
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return uuidRegex.test(id) ? id : defaultUuid
}

export function createD1HttpClient(config: D1HttpConfig) {
  const accountId = config.accountId || '03f642afe070f05b727f7cd31f02ef48'
  const databaseId = resolveValidDatabaseId(config.databaseId)
  const apiToken = config.apiToken
  const baseUrl = `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}`

  async function executeHttp(sql: string, params: any[] = []) {
    const trimmed = sql.trim().toLowerCase()
    // D1 REST API executes each HTTP request as an atomic transaction.
    // Intercept standalone transaction control statements to prevent HTTP errors.
    if (
      trimmed.startsWith('begin') ||
      trimmed.startsWith('commit') ||
      trimmed.startsWith('rollback') ||
      trimmed.startsWith('savepoint') ||
      trimmed.startsWith('release')
    ) {
      return { results: [], success: true, meta: {} }
    }

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

  async function executeRaw(sql: string, params: any[] = []): Promise<any[][]> {
    const trimmed = sql.trim().toLowerCase()
    if (
      trimmed.startsWith('begin') ||
      trimmed.startsWith('commit') ||
      trimmed.startsWith('rollback') ||
      trimmed.startsWith('savepoint') ||
      trimmed.startsWith('release')
    ) {
      return []
    }

    if (!apiToken) {
      return []
    }

    try {
      const res = await fetch(`${baseUrl}/raw`, {
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
        const queryRes = await executeHttp(sql, params)
        const results = queryRes.results || []
        if (results.length === 0) return []
        return results.map((row: any) => Object.values(row))
      }

      const data = await res.json() as any
      if (!data.success) {
        return []
      }

      const rows = data.result?.[0]?.results?.rows
      if (Array.isArray(rows)) {
        return rows
      }

      const directResults = data.result?.[0]?.results
      if (Array.isArray(directResults)) {
        return directResults
      }

      return []
    } catch (err) {
      console.warn('D1 executeRaw error:', err)
      return []
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
        return executeRaw(sql, params)
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
