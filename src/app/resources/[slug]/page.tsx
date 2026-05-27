import { sanityFetch } from "@/lib/sanity/client";
import { ArrowLeft, BookOpen, Clock, Download, Share2, Tag, Calendar, Twitter, Linkedin, Bookmark } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import Footer from "@/components/layout/Footer";
import { urlFor } from "@/lib/sanity/image";
import { PortableText } from 'next-sanity';

const RESOURCE_QUERY = `
  *[_type == "resourceCard" && slug.current == $slug][0] {
    _id, 
    title, 
    "tag": category, 
    description, 
    _createdAt, 
    "fileUrl": resourceFile.asset->url,
    "fileName": resourceFile.asset->originalFilename,
    "mainImageUrl": thumbnail.asset->url,
    author->{name, image, bio},
    content
  }
`;

const ptComponents: any = {
  block: {
    h1: ({ children }: any) => <h1 className="text-4xl md:text-5xl font-black text-[#051F20] mt-12 mb-6 leading-tight uppercase tracking-tighter">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl md:text-4xl font-bold text-[#051F20] mt-10 mb-5 leading-tight">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl md:text-3xl font-bold text-[#051F20] mt-8 mb-4">{children}</h3>,
    normal: ({ children }: any) => <p className="text-lg md:text-xl text-[#051F20]/80 leading-relaxed mb-6 font-medium">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-[#163832] pl-8 py-4 my-10 italic text-2xl md:text-3xl text-[#163832]/90 font-serif leading-relaxed bg-[#163832]/5 rounded-r-2xl">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-black text-[#051F20]">{children}</strong>,
    em: ({ children }: any) => <em className="italic font-medium">{children}</em>,
    highlight: ({ children }: any) => <mark className="bg-[#DAF1DE] text-[#163832] px-1 rounded-sm font-bold">{children}</mark>,
    link: ({ value, children }: any) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
      return (
        <a href={value?.href} target={target} className="text-[#163832] underline decoration-2 underline-offset-4 hover:text-[#8EB69B] transition-colors">
          {children}
        </a>
      )
    },
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-8 mb-8 space-y-4 text-[#051F20]/80 text-lg md:text-xl font-medium">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-8 mb-8 space-y-4 text-[#051F20]/80 text-lg md:text-xl font-medium">{children}</ol>,
  },
}

export const dynamic = "force-dynamic";

export default async function ResourceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  let resource;
  try {
    resource = await sanityFetch({ 
      query: RESOURCE_QUERY, 
      params: { slug },
      tags: ["resourceCard"] 
    });
  } catch (error) {
    console.error("Error fetching resource:", error);
  }

  if (!resource) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#FDFCF9]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-16 py-12 md:py-24">
        
        {/* Left Sidebar */}
        <aside className="hidden lg:flex flex-col w-48 shrink-0 sticky top-32 h-fit space-y-12">
          <div className="flex flex-col gap-4">
             {resource.author?.image && (
                <div className="w-14 h-14 rounded-full overflow-hidden border border-[#051F20]/10">
                   <img src={urlFor(resource.author.image as any).url()} alt={resource.author.name} className="object-cover w-full h-full" />
                </div>
             )}
             <div className="space-y-4">
                <p className="text-xs text-[#051F20]/60 leading-relaxed font-semibold">
                   Insight provided by {resource.author?.name || 'Signet Editorial'}, architecting growth for the community.
                </p>
                <div className="flex gap-4 text-[#051F20]/40">
                   <Twitter size={18} className="hover:text-[#163832] cursor-pointer" />
                   <Linkedin size={18} className="hover:text-[#163832] cursor-pointer" />
                </div>
             </div>
          </div>

          <nav className="flex flex-col gap-6">
            {['Articles', 'Books', 'Courses', 'Podcast'].map((item) => (
              <Link 
                key={item} 
                href="/resources" 
                className={`text-sm font-black uppercase tracking-widest transition-colors ${resource.tag === item ? 'text-[#163832]' : 'text-[#051F20]/30 hover:text-[#163832]'}`}
              >
                {item}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 max-w-4xl mx-auto">
          <header className="mb-12 md:mb-20">
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#163832] mb-6">
              <span className="px-3 py-1 bg-[#DAF1DE] rounded-full">{resource.tag || "Discovery"}</span>
              <span>{new Date(resource._createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-[#051F20] leading-[1.1] tracking-tighter mb-8 bg-gradient-to-br from-[#051F20] to-[#163832] bg-clip-text text-transparent italic uppercase">
              {resource.title}
            </h1>

            <div className="flex items-center justify-between py-8 border-y border-[#051F20]/5">
               <div className="flex items-center gap-4">
                  {resource.author?.image && (
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                       <img src={urlFor(resource.author.image as any).url()} alt={resource.author.name} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#051F20]/40">Written By</span>
                    <span className="text-sm font-bold text-[#051F20]">{resource.author?.name || 'Signet Team'}</span>
                  </div>
               </div>
               <div className="flex items-center gap-4 text-[#051F20]/60">
                  <Share2 size={18} className="cursor-pointer hover:text-[#163832]" />
                  <Bookmark size={18} className="cursor-pointer hover:text-[#163832]" />
               </div>
            </div>
          </header>

          {resource.mainImageUrl && (
            <div className="relative aspect-[16/9] w-full mb-16 rounded-[2rem] overflow-hidden shadow-2xl">
              <img src={resource.mainImageUrl} alt={resource.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="max-w-3xl mx-auto">
             {typeof resource.content === 'object' && resource.content ? (
                <PortableText value={resource.content} components={ptComponents} />
             ) : (
                <p className="text-lg text-[#051F20]/80 leading-relaxed font-medium">{resource.description || resource.content}</p>
             )}
          </div>

          {resource.fileUrl && (
            <div className="mt-20 p-10 bg-[#051F20] rounded-[3rem] text-white text-center relative overflow-hidden group border border-[#163832]/30">
               <div className="absolute top-0 right-0 w-64 h-64 bg-[#163832]/20 rounded-full blur-[100px] pointer-events-none" />
               <div className="relative z-10">
                  <Download className="mx-auto mb-6 text-[#8EB69B]" size={40} />
                  <h3 className="text-3xl font-black uppercase mb-4">Tactical Resource File</h3>
                  <p className="text-white/40 mb-8 max-w-sm mx-auto font-medium text-sm">Download the complete manual for our library analysis and internal review.</p>
                  <a href={resource.fileUrl} download className="inline-flex items-center gap-3 px-10 py-4 bg-[#163832] text-white rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-[#051F20] transition-all">
                     Download {resource.fileName || 'Resource'} <ArrowLeft className="rotate-[-90deg] w-4 h-4" />
                  </a>
               </div>
            </div>
          )}

          {/* Author Bio at end */}
          <footer className="mt-24 pt-24 border-t border-[#051F20]/10 max-w-3xl mx-auto">
             <div className="p-10 bg-[#FAFAFA] rounded-[3rem] border border-[#051F20]/5 flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left transition-all hover:shadow-xl group">
                {resource.author?.image && (
                  <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-500">
                     <img src={urlFor(resource.author.image as any).url()} alt={resource.author.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-[#163832] block mb-2">Author</span>
                   <h3 className="text-2xl font-bold text-[#051F20] mb-3">{resource.author?.name || 'Signet Editorial'}</h3>
                   <p className="text-md text-[#051F20]/60 leading-relaxed font-medium mb-6 italic">
                     {resource.author?.bio || "A collective of strategic minds focused on architecting human-centric growth systems. We bridge the gap between abstract wisdom and tactical execution."}
                   </p>
                   <div className="flex gap-4 text-[#051F20]/30 justify-center md:justify-start">
                      <Twitter size={18} className="hover:text-[#163832] cursor-pointer" />
                      <Linkedin size={18} className="hover:text-[#163832] cursor-pointer" />
                   </div>
                </div>
             </div>
          </footer>
        </main>
      </div>
      <Footer />
    </div>
  );
}
