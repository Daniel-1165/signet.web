import { sanityFetch } from "@/lib/sanity/client";
import { ArrowRight, BookOpen, Clock, Leaf, Search, Sparkles, TrendingUp, Star, ChevronRight, PlayCircle } from "lucide-react";
import Link from "next/link";

const POSTS_QUERY = `
  *[_type == "resourceCard"] | order(_createdAt desc) {
    _id, 
    title, 
    "tag": category, 
    "description": content, 
    _createdAt, 
    slug, 
    _type,
    "mainImageUrl": thumbnail.asset->url
  }
`;

const RESOURCE_QUERY = `
  *[_type == "resourceCard" && slug.current == $slug][0] {
    _id, 
    title, 
    "tag": category, 
    "description": content, 
    _createdAt, 
    "fileUrl": resourceFile.asset->url,
    "fileName": resourceFile.asset->originalFilename,
    "mainImageUrl": thumbnail.asset->url
  }
`;


const INTERRUPTS_QUERY = `
  *[_type == "feedInterrupt" && isActive == true] | order(insertAfter asc) {
    _id, interruptType, insertAfter, title, headline,
    subtext, ctaLabel, ctaUrl, label, accentColor,
    shelfLabel, tiles
  }
`;

function buildStream(posts: any[], interrupts: any[]) {
  const stream: any[] = [];
  posts.forEach((post, index) => {
    stream.push({ ...post, _streamType: "post" });
    const afterCount = index + 1;
    const items = interrupts.filter((i) => i.insertAfter === afterCount);
    items.forEach((i) => stream.push({ ...i, _streamType: "interrupt" }));
  });
  return stream;
}

const ResourceCard = ({ data, idx }: { data: any, idx: number }) => {
  const isLarge = idx % 5 === 0;
  
  return (
    <Link
      href={data.slug?.current ? `/resources/${data.slug.current}` : "#"}
      className={`group relative flex flex-col bg-white rounded-[2.5rem] border border-black/[0.03] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
        isLarge ? "md:col-span-2 md:row-span-2 h-[500px]" : "h-[400px]"
      }`}
    >
      {/* Background Image Placeholder (Nature/Growth) */}
      <div className="absolute inset-0 z-0 bg-[#0D120E]">
         {data.mainImageUrl ? (
           <img 
              src={data.mainImageUrl}
              alt={data.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
           />
         ) : (
           <img 
              src={idx % 2 === 0 ? "/images/serene_nature.png" : "/images/growing_plant.png"}
              alt="Nature"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-40 grayscale"
           />
         )}
         <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 mt-auto p-8 flex flex-col gap-3">
         <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black text-white uppercase tracking-widest">
                {data.tag || "Resource"}
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-white/60">
                <Clock size={10} /> {data.readTime || "5 min"}
            </span>
         </div>
         <h3 className={`font-black text-white leading-tight tracking-tight uppercase ${isLarge ? "text-3xl md:text-5xl" : "text-xl"}`}>
            {data.title}
         </h3>
         <div className="flex items-center gap-2 text-white font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300">
            Open Resource <ChevronRight size={16} />
         </div>
      </div>

      {isLarge && (
        <div className="absolute top-8 right-8 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
            <Sparkles size={20} />
        </div>
      )}
    </Link>
  );
};

export const dynamic = "force-dynamic";

export default async function ResourcesPage() {
  const posts = (await sanityFetch({ query: POSTS_QUERY, tags: ["resourceCard"] })) || [];
  const interrupts = (await sanityFetch({ query: INTERRUPTS_QUERY, tags: ["feedInterrupt"] })) || [];

  const stream = buildStream(posts, interrupts);

  return (
    <div className="min-h-screen bg-[#F7F6F0] pb-32" style={{ fontFamily: "'Melbourne', sans-serif" }}>
      
      {/* ── HEADER ────────────────────────────────────────────────── */}
      <section className="pt-24 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
         {/* Top Actions: Search & CTA */}
         <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
             <div className="relative flex-1 w-full max-w-md">
                 <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#0D120E]/30" size={18} />
                 <input 
                     type="text" 
                     placeholder="Search library..." 
                     className="w-full h-14 pl-14 pr-6 bg-white rounded-full border border-black/[0.03] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1DA756]/20 transition-all font-bold text-xs"
                 />
             </div>
             
             <div className="flex items-center gap-3 overflow-x-auto no-scrollbar w-full md:w-auto">
                {["All", "Growth", "Leadership", "Productivity"].map(tag => (
                    <button key={tag} className="h-12 px-6 rounded-full bg-white border border-black/[0.03] font-black uppercase text-[9px] tracking-widest hover:bg-[#1DA756] hover:text-white transition-all shadow-sm whitespace-nowrap">
                        {tag}
                    </button>
                ))}
             </div>

             <Link href="/join" className="h-14 px-8 rounded-full bg-[#0D120E] text-white flex items-center justify-center font-black uppercase text-[10px] tracking-[0.2em] hover:bg-[#1DA756] transition-all shadow-xl shadow-black/10">
                Join the Network
             </Link>
         </div>

         <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                    <Leaf className="text-[#1DA756]" size={16} />
                    <span className="text-[10px] font-black tracking-[0.3em] text-[#1DA756] uppercase">Wisdom Network</span>
                </div>
                <h1 className="text-4xl md:text-[4.5rem] font-black uppercase leading-[0.9] tracking-tighter">
                    Seeds of <br/>
                    <span className="text-[#1DA756]">Insight.</span>
                </h1>
            </div>
            <div className="space-y-4 max-w-sm">
                <p className="text-base md:text-lg text-[#0D120E]/50 font-medium leading-relaxed capitalize">
                    The quiet pursuit of mastery requires the finest tools. Explore our repository of disciplined growth.
                </p>
                <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-[#0D120E]/30">
                    <span>Curated</span>
                    <span className="w-1 h-1 rounded-full bg-[#1DA756]"></span>
                    <span>Structured</span>
                    <span className="w-1 h-1 rounded-full bg-[#1DA756]"></span>
                    <span>Silent</span>
                </div>
            </div>
         </div>
      </section>

      {/* ── GRID ──────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
         {stream.length === 0 ? (
            <div className="text-center py-40">
                <div className="w-20 h-20 bg-white shadow-xl rounded-full flex items-center justify-center mx-auto mb-8">
                    <BookOpen className="text-[#1DA756]" size={32} />
                </div>
                <h3 className="text-2xl font-black uppercase">Coming Soon.</h3>
            </div>
         ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-min">
                {stream.map((item, idx) => {
                    if (item._streamType === "post") {
                        return <ResourceCard key={item._id} data={item} idx={idx} />;
                    }
                    
                    // Interrupt handler (Spotlight/Banner)
                    return (
                        <div key={item._id} className="md:col-span-3 min-h-[300px] rounded-none bg-[#0D120E] p-10 md:p-16 text-white relative overflow-hidden flex flex-col justify-center border border-white/5">
                            <div className="absolute right-0 top-0 w-96 h-96 bg-[#1DA756]/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
                            <div className="absolute left-0 bottom-0 w-64 h-64 bg-[#D3F36B]/5 rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2" />
                            
                            <div className="relative z-10">
                                <span className="text-[10px] font-black tracking-[0.3em] text-[#1DA756] uppercase mb-6 block">{item.label || "Featured Insight"}</span>
                                <h2 className="text-3xl md:text-5xl font-black uppercase leading-none mb-6 max-w-3xl">{item.headline || item.title}</h2>
                                <p className="text-white/40 text-lg max-w-xl mb-8 leading-relaxed">{item.subtext || "Unlock deeper levels of self-mastery through our private network protocols."}</p>
                                <Link href={item.ctaUrl || "#"} className="h-14 px-10 bg-white text-[#0D120E] rounded-none font-black uppercase text-xs inline-flex items-center gap-3 hover:bg-[#1DA756] hover:text-white transition-all shadow-xl">
                                    {item.ctaLabel || "Learn More"} <ChevronRight size={16} />
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
         )}
      </section>

    </div>
  );
}
