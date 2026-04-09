import {NextRequest, NextResponse} from 'next/server'
import {sanityFetch} from '@/lib/sanity/client'
import {GET_POST_BY_SLUG} from '@/lib/sanity/queries'

export async function GET(
  request: NextRequest,
  {params}: {params: Promise<{slug: string}>}
) {
  try {
    const {slug} = await params
    const post = await sanityFetch({
      query: GET_POST_BY_SLUG,
      params: {slug},
    })

    if (!post) {
      return NextResponse.json({error: 'Post not found'}, {status: 404})
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json({error: 'Internal server error'}, {status: 500})
  }
}
