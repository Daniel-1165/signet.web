import {NextRequest, NextResponse} from 'next/server'
import {sanityFetch} from '@/lib/sanity/client'
import {GET_ALL_POSTS} from '@/lib/sanity/queries'

export async function GET(request: NextRequest) {
  try {
    const posts = await sanityFetch({
      query: GET_ALL_POSTS,
    })
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json({error: 'Internal server error'}, {status: 500})
  }
}
