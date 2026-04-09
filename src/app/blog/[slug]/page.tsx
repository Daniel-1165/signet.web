import {notFound} from 'next/navigation'
import {sanityFetch} from '@/lib/sanity/client'
import {GET_POST_BY_SLUG} from '@/lib/sanity/queries'
import PostDetail from '@/components/sanity/PostDetail'

interface PostPageProps {
  params: Promise<{slug: string}>
}

export default async function PostPage({params}: PostPageProps) {
  const {slug} = await params

  try {
    const post = await sanityFetch({
      query: GET_POST_BY_SLUG,
      params: {slug},
    })

    if (!post) {
      notFound()
    }

    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <PostDetail post={post} />
      </div>
    )
  } catch (error) {
    console.error('Error fetching post:', error)
    notFound()
  }
}
