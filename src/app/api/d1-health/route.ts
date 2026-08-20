import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID || '03f642afe070f05b727f7cd31f02ef48'
  const databaseId = process.env.CLOUDFLARE_DATABASE_ID || process.env.CLOUDFLARE_D1_REMOTE || '59827847-99eb-48cb-8df2-af50185c82ca'
  const apiToken = process.env.CLOUDFLARE_API_TOKEN

  const info: Record<string, any> = {
    hasToken: Boolean(apiToken),
    tokenPrefix: apiToken ? `${apiToken.slice(0, 4)}...${apiToken.slice(-4)}` : null,
    accountId,
    databaseId,
  }

  if (!apiToken) {
    return NextResponse.json({
      ok: false,
      error: 'CLOUDFLARE_API_TOKEN environment variable is missing on Vercel',
      info,
    })
  }

  try {
    const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sql: 'SELECT id, email, created_at FROM users LIMIT 5;',
      }),
      cache: 'no-store',
    })

    const bodyText = await res.text()
    let bodyJson: any
    try {
      bodyJson = JSON.parse(bodyText)
    } catch {
      bodyJson = bodyText
    }

    return NextResponse.json({
      ok: res.ok,
      httpStatus: res.status,
      info,
      cloudflareResponse: bodyJson,
    })
  } catch (err: any) {
    return NextResponse.json({
      ok: false,
      error: err?.message || String(err),
      info,
    })
  }
}
