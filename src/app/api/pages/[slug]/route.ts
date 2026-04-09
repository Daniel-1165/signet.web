import {NextRequest, NextResponse} from 'next/server'

export async function GET(
  request: NextRequest,
  {params}: {params: Promise<{slug: string}>}
) {
  return NextResponse.json({error: 'Page not found'}, {status: 404})
}
