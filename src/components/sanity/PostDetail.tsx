import { PortableText } from 'next-sanity'
import Image from 'next/image'
import Link from 'next/link'
import { Post } from '@/lib/sanity/types'
import { urlFor } from '@/lib/sanity/image'
import { Twitter, Linkedin, ArrowLeft, Share2, Bookmark } from 'lucide-react'

interface PostDetailProps {
  post: Post
}

const ptComponents: any = {
  block: {
    h1: ({ children }: any) => <h1 className="text-4xl md:text-5xl font-semibold text-ink mt-12 mb-6 leading-tight">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl md:text-4xl font-bold text-ink mt-10 mb-5 leading-tight">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl md:text-3xl font-bold text-ink mt-8 mb-4">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-xl md:text-2xl font-bold text-ink mt-6 mb-3">{children}</h4>,
    normal: ({ children }: any) => <p className="text-lg md:text-xl text-ink/80 leading-relaxed mb-6 font-medium">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-seal pl-8 py-4 my-10 italic text-2xl md:text-3xl text-seal/90 font-serif leading-relaxed bg-seal/5 rounded-r-2xl">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-semibold text-ink">{children}</strong>,
    em: ({ children }: any) => <em className="italic font-medium">{children}</em>,
    highlight: ({ children }: any) => <mark className="bg-mist text-seal px-1 rounded-sm font-bold">{children}</mark>,
    link: ({ value, children }: any) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
      return (
        <a href={value?.href} target={target} className="text-seal underline decoration-2 underline-offset-4 hover:text-verdant transition-colors">
          {children}
        </a>
      )
    },
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-8 mb-8 space-y-4 text-ink/80 text-lg md:text-xl font-medium">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-8 mb-8 space-y-4 text-ink/80 text-lg md:text-xl font-medium">{children}</ol>,
  },
}

export default function PostDetail({ post }: PostDetailProps) {
  return (
    <div className="bg-canvas min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-16 py-12 md:py-24">
        
        {/* Left Sidebar - Navigation/Editorial links */}
        <aside className="hidden lg:flex flex-col w-48 shrink-0 sticky top-32 h-fit space-y-12">
          {/* Author/Bio Snapshot */}
          <div className="flex flex-col gap-4">
             {post.author?.image && (
                <div className="w-14 h-14 rounded-full overflow-hidden border border-ink/10">
                   <Image 
                     src={urlFor(post.author.image as any).url()} 
                     alt={post.author.name}
                     width={56}
                     height={56}
                     className="object-cover w-full h-full"
                   />
                </div>
             )}
             <div className="space-y-4">
                <p className="text-xs text-ink/60 leading-relaxed font-semibold">
                   Hello! I&apos;m {post.author?.name || 'an editor'}, sharing strategic insights for the Signet network. Learn more <Link href="/resources" className="text-wax hover:underline">about us</Link>.
                </p>
                <div className="flex gap-4 text-ink/40">
                   <Twitter size={18} className="hover:text-seal cursor-pointer" />
                   <Linkedin size={18} className="hover:text-seal cursor-pointer" />
                </div>
             </div>
          </div>

          <nav className="flex flex-col gap-6">
            {['Articles', 'Books', 'Courses', 'Podcast'].map((item) => (
              <Link 
                key={item} 
                href="/resources" 
                className={`text-sm font-semibold uppercase tracking-widest transition-colors ${item === 'Articles' ? 'text-seal' : 'text-ink/30 hover:text-seal'}`}
              >
                {item}
              </Link>
            ))}
          </nav>

          <Link href="/blog" className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-ink/40 hover:text-ink transition-colors pt-12 border-t border-ink/5">
             <ArrowLeft size={14} /> Back to Library
          </Link>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-12 md:mb-20">
            <div className="flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-seal mb-6">
              <span className="px-3 py-1 bg-mist rounded-full">Intellectual Maturity</span>
              <span>{new Date(post.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-ink leading-[1.1] tracking-tight mb-8 bg-gradient-to-br from-ink to-seal bg-clip-text text-transparent">
              {post.title}
            </h1>

            <div className="flex items-center justify-between py-8 border-y border-ink/5">
               <div className="flex items-center gap-4">
                  {post.author?.image && (
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                       <Image src={urlFor(post.author.image as any).url()} alt={post.author.name} width={40} height={40} className="object-cover" />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-ink/40">Written By</span>
                    <span className="text-sm font-bold text-ink">{post.author?.name || 'Signet Team'}</span>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <button className="p-3 bg-white border border-ink/5 rounded-full hover:bg-canvas transition-colors"><Share2 size={18} className="text-ink/60" /></button>
                  <button className="p-3 bg-white border border-ink/5 rounded-full hover:bg-canvas transition-colors"><Bookmark size={18} className="text-ink/60" /></button>
               </div>
            </div>
          </header>

          {/* Hero Image */}
          {post.mainImage && (
            <div className="relative aspect-[16/9] w-full mb-16 md:mb-24 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl shadow-seal/5 group">
              <Image
                src={urlFor(post.mainImage as any).url()}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-[2s]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          )}

          {/* Body Content */}
          <section className="relative">
            <div className="max-w-3xl mx-auto">
               <PortableText value={post.body} components={ptComponents} />
            </div>
          </section>

          {/* Author Footer Card */}
          <footer className="mt-24 pt-24 border-t border-ink/10 max-w-3xl mx-auto">
             <div className="p-10 md:p-16 bg-canvas rounded-[3rem] border border-ink/5 flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-mist/30 blur-[100px] pointer-events-none group-hover:bg-mist/50 transition-colors duration-700" />
                
                {post.author?.image && (
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-xl shrink-0 z-10 transition-transform duration-500 group-hover:scale-110">
                     <Image src={urlFor(post.author.image as any).url()} alt={post.author.name} width={128} height={128} className="object-cover w-full h-full" />
                  </div>
                )}
                
                <div className="flex-1 z-10">
                   <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-seal mb-4 block">About the Author</span>
                   <h3 className="text-3xl font-bold text-ink mb-4">{post.author?.name}</h3>
                   <p className="text-lg text-ink/60 leading-relaxed font-medium mb-6 italic">
                     {post.author?.bio || 'Strategic analyst focused on the intersection of human psychology and operational excellence. Leading cognitive development frameworks for the Signet community.'}
                   </p>
                   <div className="flex gap-6 justify-center md:justify-start">
                      <Link href="/resources" className="text-xs font-semibold uppercase tracking-widest text-seal hover:translate-x-1 transition-transform inline-flex items-center gap-2">
                        View all posts <ArrowLeft className="rotate-180 w-3 h-3" />
                      </Link>
                      <div className="flex gap-4 text-ink/30 ml-auto md:ml-0">
                         <Twitter size={20} className="hover:text-seal cursor-pointer" />
                         <Linkedin size={20} className="hover:text-seal cursor-pointer" />
                      </div>
                   </div>
                </div>
             </div>
          </footer>
        </main>

        {/* Right Sidebar - Newsletter/CTA */}
        <aside className="hidden xl:flex flex-col w-64 shrink-0 space-y-12 pt-24 sticky top-32 h-fit">
           <div className="p-8 bg-seal rounded-[2rem] text-white">
              <span className="text-[8px] font-semibold uppercase tracking-[0.3em] text-white/50 mb-3 block">Network Brief</span>
              <h4 className="text-xl font-bold mb-4">Stay ahead of the curve.</h4>
              <p className="text-xs text-white/70 leading-relaxed font-medium mb-6">Weekly insights on intentional growth and tactical mastery.</p>
              <button className="w-full py-3 bg-white text-seal text-[10px] font-semibold uppercase tracking-widest rounded-xl hover:bg-verdant hover:text-white transition-colors">Join Signet</button>
           </div>
           
           <div className="space-y-6">
              <h5 className="text-[10px] font-semibold uppercase tracking-widest text-ink/40 border-b border-ink/5 pb-3">Top Stories</h5>
              <div className="space-y-6">
                 {[1, 2, 3].map(i => (
                    <div key={i} className="group cursor-pointer">
                       <span className="text-[10px] font-bold text-seal block mb-2 opacity-50">0{i}</span>
                       <p className="text-sm font-bold text-ink group-hover:text-seal transition-colors line-clamp-2 leading-snug">The Architecture of Resilience in Operational Environments</p>
                    </div>
                 ))}
              </div>
           </div>
        </aside>
      </div>
    </div>
  )
}
