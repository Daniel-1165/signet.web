import {client, isConfigured} from '@/lib/sanity/client'
import {GET_POST_BY_SLUG, GET_ALL_POSTS} from '@/lib/sanity/queries'
import PostDetail from '@/components/sanity/PostDetail'
import {notFound} from 'next/navigation'

interface PostPageProps {
  params: Promise<{slug: string}>
}

export async function generateStaticParams() {
  if (!isConfigured()) {
    return []
  }
  try {
    const posts = await client.fetch(GET_ALL_POSTS)
    return posts.map((post: any) => ({
      slug: post.slug.current,
    }))
  } catch {
    return []
  }
}

export default async function PostPage({params}: PostPageProps) {
  const {slug} = await params
  
  if (!isConfigured()) {
    notFound()
  }

  try {
    const post = await client.fetch(GET_POST_BY_SLUG, {slug})

    if (!post) {
      notFound()
    }

    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <a href="/blog" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 mb-8">
            ← Back to Blog
          </a>
          <PostDetail post={post} />
        </div>
      </div>
    )
  } catch {
    notFound()
  }
}
