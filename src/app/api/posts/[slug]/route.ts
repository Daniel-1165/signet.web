import {NextRequest, NextResponse} from 'next/server'
import {client} from '@/lib/sanity/client'
import {GET_POST_BY_SLUG} from '@/lib/sanity/queries'

export async function GET(
  request: NextRequest,
  {params}: {params: Promise<{slug: string}>}
) {
  try {
    const {slug} = await params
    const post = await client.fetch(GET_POST_BY_SLUG, {slug})

    if (!post) {
      return NextResponse.json({error: 'Post not found'}, {status: 404})
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({error: 'Failed to fetch post'}, {status: 500})
  }
}
