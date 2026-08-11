'use client'

import Image from 'next/image'
import Link from 'next/link'
import {Post} from '@/lib/sanity/types'
import {urlFor} from '@/lib/sanity/image'
import { ArrowUpRight, Clock, User } from 'lucide-react'

interface PostListProps {
  posts: Post[]
}

export default function PostList({posts}: PostListProps) {
  if (!posts.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center bg-white/50 rounded-[var(--radius-lg)] border border-seal/5">
         <div className="w-16 h-16 rounded-full bg-seal/5 flex items-center justify-center mb-6">
            <Clock className="w-8 h-8 text-seal/20" />
         </div>
         <h3 className="text-xl font-semibold text-ink">No articles found</h3>
         <p className="text-sm text-ink/40 mt-2">Check back soon for latest strategic insights.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Link
          key={post._id}
          href={`/blog/${post.slug.current}`}
          className="group block bg-white rounded-[var(--radius-lg)] overflow-hidden border border-black/[0.03]   hover:-translate-y-2 transition duration-500"
        >
          {/* Image Container */}
          <div className="relative aspect-[16/10] overflow-hidden">
            {post.mainImage ? (
              <Image
                src={urlFor(post.mainImage as any).url()}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-seal/5 flex items-center justify-center font-semibold text-seal/10 uppercase tracking-widest text-xs">
                Signet Article
              </div>
            )}
            
            {/* Category Tag */}
            {post.categories && post.categories.length > 0 && (
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[9px] font-semibold uppercase tracking-widest text-seal ">
                  {post.categories[0].title}
                </span>
              </div>
            )}
          </div>

          <div className="p-6 md:p-8 space-y-4">
            <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-widest text-ink/30">
               <span className="flex items-center gap-1"><Clock size={10} /> {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
               <span className="w-1 h-1 rounded-full bg-seal/20" />
               <span className="flex items-center gap-1"><User size={10} /> {post.author?.name || 'Signet Editorial'}</span>
            </div>

            <h3 className="text-xl md:text-2xl font-semibold text-ink leading-[1.2] group-hover:text-seal transition-colors line-clamp-3" >
              {post.title}
            </h3>

            <div className="flex items-center gap-2 pt-2 text-seal">
               <span className="text-[11px] font-semibold uppercase tracking-widest group-hover:tracking-[0.2em] transition-colors">Read Insight</span>
               <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
