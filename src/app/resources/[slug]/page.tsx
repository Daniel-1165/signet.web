import { sanityFetch } from "@/lib/sanity/client";
import { ArrowLeft, BookOpen, Clock, Download, Share2, Tag, Calendar } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";

const RESOURCE_QUERY = `
  *[_type in ["resource", "book", "article", "magazine"] && slug.current == $slug][0] {
    _id, title, tag, description, readTime, publishedAt, accentColor, content,
    "fileUrl": file.asset->url,
    "fileName": file.asset->originalFilename,
    "mainImageUrl": mainImage.asset->url
  }
`;

export default async function ResourceDetailPage({ params }: { params: { slug: string } }) {
  const resource = await sanityFetch({ 
    query: RESOURCE_QUERY, 
    params: { slug: params.slug },
    tags: ["resource"] 
  });

  if (!resource) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#F7F6F0]" style={{ fontFamily: "'Melbourne', sans-serif" }}>
      
      {/* ── NAVIGATION ────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/[0.03]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/resources" className="flex items-center gap-2 text-sm font-black uppercase tracking-widest hover:text-[#1DA756] transition-colors">
            <ArrowLeft size={16} /> Back to Library
          </Link>
          <div className="flex items-center gap-4">
             <button className="w-10 h-10 rounded-full bg-[#0D120E]/5 flex items-center justify-center hover:bg-[#1DA756] hover:text-white transition-all">
                <Share2 size={18} />
             </button>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-32">
        <article className="max-w-4xl mx-auto px-6">
          
          {/* ── HEADER ─────────────────────────────────────────────── */}
          <header className="mb-16">
            <div className="flex items-center gap-4 mb-8">
               <span className="px-4 py-1.5 bg-[#1DA756] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                  {resource.tag || "Discovery"}
               </span>
               <span className="flex items-center gap-2 text-[10px] font-bold text-black/40 uppercase tracking-widest">
                  <Clock size={12} /> {resource.readTime || "5 MIN READ"}
               </span>
               {resource.publishedAt && (
                 <span className="flex items-center gap-2 text-[10px] font-bold text-black/40 uppercase tracking-widest">
                    <Calendar size={12} /> {new Date(resource.publishedAt).toLocaleDateString()}
                 </span>
               )}
            </div>

            <h1 className="text-5xl md:text-7xl font-black uppercase leading-[0.9] tracking-tighter mb-8 italic">
               {resource.title}
            </h1>

            <p className="text-xl md:text-2xl text-[#0D120E]/60 font-medium leading-relaxed border-l-4 border-[#1DA756] pl-8">
               {resource.description}
            </p>
          </header>

          {/* ── FEATURED IMAGE ──────────────────────────────────────── */}
          {resource.mainImageUrl && (
            <div className="rounded-[3rem] overflow-hidden aspect-[16/9] mb-16 shadow-2xl">
               <img src={resource.mainImageUrl} alt={resource.title} className="w-full h-full object-cover" />
            </div>
          )}

          {/* ── CONTENT (SIMPLIFIED RENDERING) ──────────────────────── */}
          <div className="prose prose-xl max-w-none prose-headings:font-black prose-headings:uppercase prose-p:font-medium prose-p:text-[#0D120E]/70 mb-20">
             {/* If we had a PortableText component, we would use it here. 
                 For now, we display the raw content if it's a string, or a placeholder if it's block data.
             */}
             {typeof resource.content === 'string' ? (
                <div dangerouslySetInnerHTML={{ __html: resource.content }} />
             ) : (
                <div className="bg-white p-12 rounded-[2.5rem] border border-black/[0.03] shadow-sm">
                   <p className="text-lg italic text-black/40">This resource contains rich media content. [Standard Implementation pending PortableText renderer]</p>
                </div>
             )}
          </div>

          {/* ── DOWNLOAD AREA ───────────────────────────────────────── */}
          {resource.fileUrl && (
            <div className="bg-[#0D120E] rounded-[3rem] p-10 md:p-16 text-white text-center relative overflow-hidden group border border-[#1DA756]/30 shadow-2xl">
               <div className="absolute top-0 right-0 w-64 h-64 bg-[#1DA756]/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
               <div className="relative z-10">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-500">
                     <Download className="text-[#1DA756]" size={32} />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black uppercase mb-4 tracking-tight">Access Full Resource</h3>
                  <p className="text-white/40 mb-10 max-w-md mx-auto font-medium">Download the complete version of this {resource.tag?.toLowerCase() || 'document'} for offline study.</p>
                  <a 
                    href={resource.fileUrl} 
                    download={resource.fileName || "resource"}
                    className="h-16 px-12 bg-[#1DA756] text-white rounded-full font-black uppercase text-xs tracking-widest inline-flex items-center gap-3 hover:bg-white hover:text-[#0D120E] transition-all shadow-xl"
                  >
                     Download File <ArrowLeft className="rotate-[-90deg]" size={16} />
                  </a>
               </div>
            </div>
          )}

        </article>
      </main>

      <Footer />
    </div>
  );
}
