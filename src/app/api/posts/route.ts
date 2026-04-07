import {NextRequest, NextResponse} from 'next/server'
import {client} from '@/lib/sanity/client'
import {GET_ALL_POSTS} from '@/lib/sanity/queries'

export async function GET(request: NextRequest) {
  try {
    const posts = await client.fetch(GET_ALL_POSTS)

    return NextResponse.json(posts)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({error: 'Failed to fetch posts'}, {status: 500})
  }
}
