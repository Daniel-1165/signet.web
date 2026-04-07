import {NextRequest, NextResponse} from 'next/server'
import {client} from '@/lib/sanity/client'
import {GET_ALL_PAGES} from '@/lib/sanity/queries'

export async function GET(request: NextRequest) {
  try {
    const pages = await client.fetch(GET_ALL_PAGES)

    return NextResponse.json(pages)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({error: 'Failed to fetch pages'}, {status: 500})
  }
}
