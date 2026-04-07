import {PortableText} from 'next-sanity'
import Image from 'next/image'
import {Post} from '@/lib/sanity/types'
import {urlFor} from '@/lib/sanity/image'

interface PostDetailProps {
  post: Post
}

export default function PostDetail({post}: PostDetailProps) {
  return (
    <article className="max-w-2xl mx-auto py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center justify-between text-gray-600 dark:text-gray-400 mb-4">
          <div>
            {post.author && <p>By {post.author.name}</p>}
            <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
          </div>
          {post.categories && post.categories.length > 0 && (
            <div className="flex gap-2">
              {post.categories.map((category) => (
                <span
                  key={category._id}
                  className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm"
                >
                  {category.title}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {post.mainImage && (
        <div className="relative h-96 w-full mb-8">
          <Image
            src={urlFor(post.mainImage).url()}
            alt={post.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}

      <div className="prose dark:prose-invert max-w-none">
        <PortableText value={post.body} />
      </div>
    </article>
  )
}
