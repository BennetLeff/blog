import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.redirect('https://pub-623f80b8688644d286a38f49e123ab86.r2.dev/infisical-intro.mp4', {
    status: 307,
  })
}
