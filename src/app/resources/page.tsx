import { sanityFetch } from "@/lib/sanity/client";
import { ArrowRight, BookOpen, Clock, Search, Sparkles, TrendingUp, Star, ChevronRight, PlayCircle } from "lucide-react";
import Link from "next/link";

const POSTS_QUERY = `
  *[_type == "resource"] | order(publishedAt desc) {
    _id, title, tag, description, readTime, publishedAt, accentColor, slug
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
      <div className="absolute inset-0 z-0">
         <img 
            src={`https://images.unsplash.com/photo-${[
                "1441974231531-c6227db76b6e",
                "1518133910546-b6c2fb7d79e3",
                "1464822759023-fed622ff2c3b",
                "1470071459604-3b5ec3a7fe05",
                "1501854140801-50d01698950b"
            ][idx % 5]}?auto=format&fit=crop&q=80&w=800`}
            alt="Nature"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
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

export default async function ResourcesPage() {
  const posts = (await sanityFetch({ query: POSTS_QUERY, tags: ["resource"] })) || [];
  const interrupts = (await sanityFetch({ query: INTERRUPTS_QUERY, tags: ["feedInterrupt"] })) || [];
  const stream = buildStream(posts, interrupts);

  return (
    <div className="min-h-screen bg-[#F7F6F0] pb-32" style={{ fontFamily: "'Melbourne', sans-serif" }}>
      
      {/* ── HEADER ────────────────────────────────────────────────── */}
      <section className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div className="max-w-2xl">
                <span className="text-[11px] font-black tracking-[0.3em] text-[#1DA756] uppercase mb-6 block">The Library</span>
                <h1 className="text-5xl md:text-[6rem] font-black uppercase leading-[0.85] tracking-tighter">
                    Fuel for <br/>
                    <span className="text-[#1DA756]">The Silent.</span>
                </h1>
            </div>
            <p className="text-lg md:text-xl text-[#0D120E]/50 font-medium max-w-sm capitalize">
                A meticulously curated collection of knowledge, tools, and inspiration for the modern trailblazer.
            </p>
         </div>
      </section>

      {/* ── SEARCH & FILTER ───────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
         <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[300px]">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#0D120E]/30" size={18} />
                <input 
                    type="text" 
                    placeholder="Search library..." 
                    className="w-full h-16 pl-16 pr-6 bg-white rounded-full border border-black/[0.03] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1DA756]/20 transition-all font-bold text-sm"
                />
            </div>
            {["All", "Growth", "Leadership", "Productivity", "Mindset"].map(tag => (
                <button key={tag} className="h-16 px-8 rounded-full bg-white border border-black/[0.03] font-black uppercase text-[10px] tracking-widest hover:bg-[#1DA756] hover:text-white transition-all shadow-sm">
                    {tag}
                </button>
            ))}
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
                    if (item.interruptType === "banner") {
                        return (
                            <div key={item._id} className="md:col-span-3 min-h-[300px] rounded-[3rem] bg-[#0D120E] p-10 md:p-16 text-white relative overflow-hidden flex flex-col justify-center">
                                <div className="absolute right-0 top-0 w-96 h-96 bg-[#1DA756]/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
                                <span className="text-[10px] font-black tracking-[0.3em] text-[#1DA756] uppercase mb-6 block">{item.label}</span>
                                <h2 className="text-3xl md:text-5xl font-black uppercase leading-none mb-6 relative z-10">{item.headline}</h2>
                                <p className="text-white/50 text-lg max-w-xl mb-8 relative z-10">{item.subtext}</p>
                                <Link href={item.ctaUrl || "#"} className="h-14 px-8 bg-[#1DA756] text-white rounded-full font-black uppercase text-xs inline-flex items-center gap-2 self-start hover:scale-105 transition-transform shadow-xl shadow-[#1DA756]/20">
                                    {item.ctaLabel} <ArrowRight size={14} />
                                </Link>
                            </div>
                        );
                    }
                    
                    return null;
                })}
            </div>
         )}
      </section>

    </div>
  );
}
