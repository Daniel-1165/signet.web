"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState, useRef } from "react";

export default function BlogCarousel({ posts }: { posts: any[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  if (!posts || posts.length === 0) return null;

  return (
    <section className="bg-white py-16 md:py-24 border-y border-black/[0.04]">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-[10px] font-black tracking-[0.3em] text-[#163832] uppercase mb-4 block">Latest from the Journal</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase leading-none tracking-tighter">Signet <br/><span className="text-[#163832]">Insights.</span></h2>
        </div>
        <p className="text-sm text-[#051F20]/50 font-medium max-w-sm capitalize">
          Perspectives on growth, mastery, and professional evolution.
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-8 no-scrollbar snap-x snap-mandatory"
        >
          {posts.map((post, i) => (
            <motion.div 
              key={post._id || i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex-none w-[85%] md:w-[45%] lg:w-[400px] snap-start"
            >
              <Link href={`/blog/${post.slug || '#'}`} className="group block h-full">
                <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#0B2B26]/5 group-hover:shadow-[0_20px_50px_rgb(0,0,0,0.1)] group-hover:-translate-y-2 transition-all duration-500">
                  {post.mainImageUrl ? (
                    <img 
                      src={post.mainImageUrl} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#FAFAFA] flex items-center justify-center">
                      <span className="text-xs text-black/20 uppercase tracking-widest font-black">No Image</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between z-10">
                    <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4 text-[#163832]" />
                    </div>
                  </div>
                </div>

                <div className="space-y-3 px-2">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#163832]/60">
                    <span>{post.authorName || 'Signet Curated'}</span>
                    <span>&bull;</span>
                    <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent'}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold leading-snug text-[#051F20] group-hover:text-[#163832] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {post.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
