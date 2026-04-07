'use client'

import Image from 'next/image'
import {Post} from '@/lib/sanity/types'
import {urlFor} from '@/lib/sanity/image'

interface PostListProps {
  posts: Post[]
}

export default function PostList({posts}: PostListProps) {
  if (!posts.length) {
    return <div className="text-center py-12">No posts found</div>
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <article
          key={post._id}
          className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
        >
          {post.mainImage && (
            <div className="relative h-48 w-full">
              <Image
                src={urlFor(post.mainImage).url()}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
            {post.author && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                By {post.author.name}
              </p>
            )}
            {post.categories && post.categories.length > 0 && (
              <div className="flex gap-2 mb-2">
                {post.categories.map((category) => (
                  <span
                    key={category._id}
                    className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            )}
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(post.publishedAt).toLocaleDateString()}
            </p>
            <a
              href={`/blog/${post.slug.current}`}
              className="inline-block mt-4 text-blue-600 hover:text-blue-800 dark:text-blue-400 font-medium"
            >
              Read More →
            </a>
          </div>
        </article>
      ))}
    </div>
  )
}
