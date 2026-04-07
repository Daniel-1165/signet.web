import {client, isConfigured} from '@/lib/sanity/client'
import {GET_ALL_POSTS} from '@/lib/sanity/queries'
import PostList from '@/components/sanity/PostList'

export default async function BlogPage() {
  let posts = []
  
  try {
    if (isConfigured()) {
      posts = await client.fetch(GET_ALL_POSTS)
    }
  } catch (error) {
    console.log('Sanity not configured yet')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-12">Blog</h1>
        {posts.length > 0 ? (
          <PostList posts={posts} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Blog content coming soon!</p>
          </div>
        )}
      </div>
    </div>
  )
}
