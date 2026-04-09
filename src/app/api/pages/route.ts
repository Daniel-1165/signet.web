import {NextRequest, NextResponse} from 'next/server'
import {sanityFetch} from '@/lib/sanity/client'
import {GET_ALL_PAGES} from '@/lib/sanity/queries'

export async function GET(request: NextRequest) {
  try {
    const pages = await sanityFetch({
      query: GET_ALL_PAGES,
    })
    return NextResponse.json(pages)
  } catch (error) {
    console.error('Error fetching pages:', error)
    return NextResponse.json({error: 'Internal server error'}, {status: 500})
  }
}
