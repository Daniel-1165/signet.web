import {sanityFetch} from '@/lib/sanity/client'
import {GET_ALL_POSTS} from '@/lib/sanity/queries'
import PostList from '@/components/sanity/PostList'

export default async function BlogPage() {
  try {
    const posts = await sanityFetch({
      query: GET_ALL_POSTS,
    })

    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-12">Blog</h1>
          <PostList posts={posts} />
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error fetching posts:', error)
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-12">Blog</h1>
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Unable to load blog posts at this time.</p>
            <p className="text-gray-400 mt-4">Please try again later.</p>
          </div>
        </div>
      </div>
    )
  }
}
