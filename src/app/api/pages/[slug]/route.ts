import {NextRequest, NextResponse} from 'next/server'
import {sanityFetch} from '@/lib/sanity/client'
import {GET_PAGE_BY_SLUG} from '@/lib/sanity/queries'

export async function GET(
  request: NextRequest,
  {params}: {params: Promise<{slug: string}>}
) {
  try {
    const {slug} = await params
    const page = await sanityFetch({
      query: GET_PAGE_BY_SLUG,
      params: {slug},
    })

    if (!page) {
      return NextResponse.json({error: 'Page not found'}, {status: 404})
    }

    return NextResponse.json(page)
  } catch (error) {
    console.error('Error fetching page:', error)
    return NextResponse.json({error: 'Internal server error'}, {status: 500})
  }
}
