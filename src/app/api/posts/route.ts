import {NextRequest, NextResponse} from 'next/server'

export async function GET(request: NextRequest) {
  // Blog posts are managed through Sanity CMS
  // This endpoint is available at /api/posts when Sanity is configured
  return NextResponse.json([])
}
