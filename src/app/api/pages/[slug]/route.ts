import {NextRequest, NextResponse} from 'next/server'
import {client} from '@/lib/sanity/client'
import {GET_PAGE_BY_SLUG} from '@/lib/sanity/queries'

export async function GET(
  request: NextRequest,
  {params}: {params: Promise<{slug: string}>}
) {
  try {
    const {slug} = await params
    const page = await client.fetch(GET_PAGE_BY_SLUG, {slug})

    if (!page) {
      return NextResponse.json({error: 'Page not found'}, {status: 404})
    }

    return NextResponse.json(page)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({error: 'Failed to fetch page'}, {status: 500})
  }
}
