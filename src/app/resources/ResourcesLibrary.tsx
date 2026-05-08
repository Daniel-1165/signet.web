"use client";

import { useState, useMemo } from "react";
import { Search, Star, Bookmark, PlayCircle, Clock, ChevronRight, Layout, BookmarkCheck, Heart, Book, Compass, ArrowUpRight } from "lucide-react";
import Link from "next/link";

// ── SECTION HEADER ────────────────────────────────────────────────
const SectionHeader = ({ title, desc, href }: { title: string, desc?: string, href?: string }) => (
  <div className="flex items-end justify-between mb-8">
    <div>
      <h2 className="text-xl md:text-2xl font-black text-[#0D120E] tracking-tight">{title}</h2>
      {desc && <p className="text-[#0D120E]/40 font-bold text-[11px] uppercase tracking-widest mt-1.5">{desc}</p>}
    </div>
    {href && (
      <Link href={href} className="text-[11px] font-black text-[#163832] hover:text-[#0D120E] transition-colors tracking-widest uppercase flex items-center gap-1.5 bg-[#163832]/5 px-4 py-2 rounded-full">
        See All <ChevronRight className="w-3 h-3" />
      </Link>
    )}
  </div>
);

// ── BOOK / MAGAZINE CARD (Original book-cover style) ──────────────
const SimpleResourceCard = ({ data }: { data: any }) => {
  const rating = (4.0 + Math.random()).toFixed(1);
  const resourceUrl = data.fileUrl || (data.slug?.current ? `/resources/${data.slug.current}` : "#");

  return (
    <a 
      href={resourceUrl} 
      download={!!data.fileUrl} 
      target={data.fileUrl ? "_blank" : "_self"} 
      className="group block space-y-4 cursor-pointer"
    >
       <div className="aspect-[2/3] rounded-xl overflow-hidden bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#0B2B26]/5 transition-all duration-500 group-hover:shadow-[0_20px_50px_rgb(0,0,0,0.1)] group-hover:-translate-y-2 relative">
         {data.mainImageUrl ? (
            <img src={data.mainImageUrl} alt={data.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
         ) : (
            <div className="w-full h-full bg-[#0B2B26]/[0.02] flex items-center justify-center p-6 text-center">
               <Book size={24} className="text-[#163832]/10" />
            </div>
         )}
         
         {/* Overlay for actions */}
         <div className="absolute inset-0 bg-gradient-to-t from-[#051F20]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
            <div className="flex gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="w-9 h-9 rounded-full bg-white/95 backdrop-blur-md shadow-lg flex items-center justify-center text-[#163832] hover:text-red-500 hover:scale-110 transition-all">
                   <Heart size={15} />
                </div>
                <div className="w-9 h-9 rounded-full bg-white/95 backdrop-blur-md shadow-lg flex items-center justify-center text-[#163832] hover:text-[#235347] hover:scale-110 transition-all">
                   <Bookmark size={15} />
                </div>
            </div>
         </div>

         {/* Shelf Binding Effect */}
         <div className="absolute inset-y-0 left-0 w-[1px] bg-white/20 z-10" />
         <div className="absolute inset-y-0 left-[2px] w-[2px] bg-black/10 z-10" />
       </div>

       <div className="space-y-1.5 px-0.5">
          <h4 className="text-[13px] font-bold text-[#051F20] line-clamp-2 leading-snug group-hover:text-[#163832] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
            {data.title}
          </h4>
          <div className="flex items-center justify-between">
            <p className="text-[9px] text-[#051F20]/40 font-black uppercase tracking-[0.15em]">Signet Library</p>
            <div className="flex items-center gap-0.5">
                <Star size={8} className="text-[#DA8B16] fill-current" />
                <span className="text-[9px] font-black text-[#DA8B16]">{rating}</span>
            </div>
          </div>
       </div>
    </a>
  );
};

// ── ARTICLE / IMAGE CARD (image-on-top style from reference) ──────
const ArticleCard = ({ data }: { data: any }) => {
  const resourceUrl = data.fileUrl || (data.slug?.current ? `/resources/${data.slug.current}` : "#");
  const date = data._createdAt
    ? new Date(data._createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "Recent";
  const isImage = data.tag?.toLowerCase() === "image";

  return (
    <a
      href={resourceUrl}
      target={data.fileUrl ? "_blank" : "_self"}
      className="group block rounded-[1.5rem] overflow-hidden bg-white border border-black/[0.06] shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-500"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[16/10]">
        {data.mainImageUrl ? (
          <img
            src={data.mainImageUrl}
            alt={data.title}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#163832]/5 to-[#163832]/10 flex items-center justify-center">
            <span className="text-[#163832]/20 text-xs font-black uppercase tracking-widest">Signet</span>
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-[#163832] shadow-sm">
            {data.tag || "Article"}
          </span>
        </div>

        {/* Hover actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-10">
          <button className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-center text-[#0D120E]/50 hover:text-red-500 transition-colors">
            <Heart size={14} />
          </button>
          <button className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-center text-[#0D120E]/50 hover:text-[#163832] transition-colors">
            <Bookmark size={14} />
          </button>
        </div>
      </div>

      {/* Content - minimal for images, richer for articles */}
      <div className="p-5 space-y-3">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#0D120E]/30">
          <Clock size={10} />
          <span>{date}</span>
        </div>

        <h3
          className="font-bold text-[#0D120E] leading-snug group-hover:text-[#163832] transition-colors text-[15px] md:text-base"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {data.title}
        </h3>

        {data.description && !isImage && (
          <p className="text-[#0D120E]/50 leading-relaxed font-medium text-xs line-clamp-2">
            {data.description}
          </p>
        )}

        <div className="flex items-center gap-2 pt-1 text-[#163832]">
          <span className="text-[11px] font-black uppercase tracking-widest group-hover:tracking-[0.2em] transition-all">
            {isImage ? "View" : "Read More"}
          </span>
          <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </a>
  );
};

// ── WRITE-UP INTERRUPT CARD ──────────────────────────────────────
const WriteUpCard = ({ data }: { data: any }) => {
  const sizeClasses: Record<string, string> = {
    compact: "col-span-1",
    standard: "col-span-2",
    wide: "col-span-2 md:col-span-3",
    featured: "col-span-2 md:col-span-2 row-span-2",
  };
  
  return (
    <div className={`p-8 bg-white border border-[#0B2B26]/5 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col justify-between hover:shadow-xl transition-all duration-500 ${sizeClasses[data.cardSize || 'standard']}`}>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-[#8EB69B] rounded-full" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#051F20]/30">Signet Write-up</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-[#051F20] leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            {data.headline}
        </h3>
        <p className="text-[15px] text-[#051F20]/60 leading-relaxed font-medium capitalize line-clamp-6">
            {data.body}
        </p>
      </div>
      
      <div className="mt-8 flex items-center justify-between">
        {data.ctaLabel ? (
           <Link href={data.ctaUrl || "#"} className="inline-flex items-center gap-2 text-[#163832] font-black text-[11px] uppercase tracking-widest group/btn">
              {data.ctaLabel} <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
           </Link>
        ) : (
           <span className="text-[9px] font-black text-[#8EB69B] uppercase tracking-widest">Signet Network Exclusive</span>
        )}
        <div className="w-10 h-10 rounded-full bg-[#DAF1DE] flex items-center justify-center">
            <Bookmark size={16} className="text-[#163832]" />
        </div>
      </div>
    </div>
  );
};

// ── MAIN COMPONENT ────────────────────────────────────────────────
export default function ResourcesLibrary({ initialPosts, interrupts = [] }: { initialPosts: any[], interrupts?: any[] }) {
  const [search, setSearch] = useState("");

  const mergeInterrupts = (items: any[], activeInterrupts: any[]) => {
    let result = [...items].map(item => ({ ...item, _isInterrupt: false }));
    const sortedInterrupts = [...activeInterrupts].sort((a, b) => a.insertAfter - b.insertAfter);
    
    let offset = 0;
    sortedInterrupts.forEach(interrupt => {
      const position = Math.min(interrupt.insertAfter + offset, result.length);
      result.splice(position, 0, { ...interrupt, _isInterrupt: true });
      offset++;
    });
    return result;
  };

  const filteredPosts = useMemo(() => {
    if (!search) return initialPosts;
    const s = search.toLowerCase();
    return initialPosts.filter(p => 
      p.title.toLowerCase().includes(s) || 
      p.tag?.toLowerCase().includes(s) ||
      p.description?.toLowerCase().includes(s)
    );
  }, [search, initialPosts]);

  // Split by type
  const magazines = filteredPosts.filter(p => p.tag?.toLowerCase() === 'magazine');
  const articles = filteredPosts.filter(p => p.tag?.toLowerCase() === 'article' || p.tag?.toLowerCase() === 'image');
  const books = filteredPosts.filter(p => {
    const tag = p.tag?.toLowerCase();
    return tag !== 'magazine' && tag !== 'article' && tag !== 'image';
  });
  
  const booksWithInterrupts = useMemo(() => {
    if (search) return books; 
    return mergeInterrupts(books, interrupts);
  }, [books, interrupts, search]);

  const recommended = initialPosts.length > 8 ? initialPosts.slice(0, 8) : initialPosts;

  return (
    <div className="min-h-screen bg-white text-[#0D120E]" style={{ fontFamily: "'Outfit', sans-serif" }}>
      {/* ── TOP NAVIGATION ─────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-black/[0.04] min-h-[4rem] flex flex-col md:flex-row md:items-center justify-center p-4 md:px-6 gap-4">
        <div className="flex items-center justify-between w-full md:w-auto md:mr-4">
           <Link href="/" className="text-xl font-black uppercase tracking-tighter text-[#163832]" style={{ fontFamily: "'Playfair Display', serif" }}>
             RESOURCES
           </Link>
        </div>

        <div className="flex-1 w-full max-w-4xl relative group">
           <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#163832]/30 group-focus-within:text-[#163832] transition-colors" />
           <input 
             type="text"
             placeholder="Search the collection..."
             value={search}
             onChange={(e) => setSearch(e.target.value)}
             className="w-full h-12 pl-12 pr-6 bg-[#0B2B26]/[0.03] border border-transparent focus:border-[#163832]/20 rounded-full text-[13px] focus:outline-none focus:bg-white focus:shadow-xl focus:shadow-[#163832]/5 transition-all placeholder:text-[#163832]/30 font-medium"
           />
        </div>
      </header>

      <div className="flex pt-32 md:pt-16 h-screen">
        {/* ── SIDEBAR ─────────────────────────────────────────────── */}
        <aside className="w-64 border-r border-black/[0.04] p-8 hidden xl:flex flex-col gap-10 overflow-y-auto">
           <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-black/30">Browse</h4>
              <nav className="flex flex-col gap-4">
                 {[
                   { label: 'Top Books', icon: Star },
                   { label: 'Discover', icon: Compass, active: true },
                   { label: 'Categories', icon: Layout }
                 ].map(item => (
                   <button key={item.label} className={`flex items-center gap-3 text-xs font-bold ${item.active ? "text-[#163832]" : "text-black/50 hover:text-black"} transition-colors w-full text-left`}>
                      <item.icon size={16} strokeWidth={item.active ? 2.5 : 2} />
                      {item.label}
                   </button>
                 ))}
              </nav>
           </div>

           <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-black/30">Your Books</h4>
              <nav className="flex flex-col gap-4">
                 {[
                   { label: 'Reading', icon: Book },
                   { label: 'Favorite Reads', icon: Heart },
                   { label: 'History', icon: Clock }
                 ].map(item => (
                   <button key={item.label} className="flex items-center gap-3 text-xs font-bold text-black/50 hover:text-black transition-colors w-full text-left">
                      <item.icon size={16} />
                      {item.label}
                   </button>
                 ))}
              </nav>
           </div>

           <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-black/30">Shelves</h4>
              <nav className="flex flex-col gap-4">
                 <button className="flex items-center gap-3 text-xs font-bold text-black/50 hover:text-black transition-colors w-full text-left">
                    <Bookmark size={16} />
                    Your Shelves
                 </button>
              </nav>
           </div>

           <button className="mt-4 w-full py-2 bg-[#163832]/10 text-[#163832] border border-[#163832]/20 rounded-md text-[10px] font-black uppercase tracking-widest hover:bg-[#163832] hover:text-white transition-all">
             Create a Shelf
           </button>
        </aside>

        {/* ── MAIN CONTENT ────────────────────────────────────────── */}
        <main className="flex-1 overflow-y-auto bg-[#FAFAFA] p-8 md:p-12">
           <div className="max-w-6xl mx-auto space-y-20">
              
              {search !== "" ? (
                <section>
                   <div className="flex items-center justify-between mb-10">
                      <div className="flex items-center gap-3">
                         <div className="w-1.5 h-6 bg-[#163832] rounded-full" />
                         <h2 className="text-xl font-bold text-black/80">Search Results for &ldquo;{search}&rdquo;</h2>
                      </div>
                      <p className="text-[10px] font-black text-black/30 uppercase tracking-[0.2em]">{filteredPosts.length} items found</p>
                   </div>
                   {filteredPosts.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-6 auto-rows-max grid-flow-dense">
                         {filteredPosts.map(item => {
                           const tag = item.tag?.toLowerCase();
                           if (tag === 'article' || tag === 'image') {
                             return (
                               <div key={item._id} className="col-span-2">
                                 <ArticleCard data={item} />
                               </div>
                             );
                           }
                           return <SimpleResourceCard key={item._id} data={item} />;
                         })}
                      </div>
                   ) : (
                      <div className="flex flex-col items-center justify-center py-20 text-center">
                         <div className="w-20 h-20 rounded-full bg-black/5 flex items-center justify-center mb-6">
                            <Search className="w-8 h-8 text-black/20" />
                         </div>
                         <h3 className="text-lg font-bold text-black/80">No results found</h3>
                         <p className="text-sm text-black/40 mt-2">Try searching for something else or check your spelling.</p>
                      </div>
                   )}
                </section>
              ) : (
                <>
                  {/* ── ARTICLES & IMAGES SECTION ─────────────────── */}
                  {articles.length > 0 && (
                    <section>
                       <div className="flex items-center justify-between mb-10">
                          <div className="flex items-center gap-3">
                             <div className="w-1.5 h-6 bg-[#163832] rounded-full" />
                             <h2 className="text-xl font-bold text-black/80">Articles & Gallery</h2>
                          </div>
                          <p className="text-[10px] font-black text-black/30 uppercase tracking-[0.2em]">{articles.length} items</p>
                       </div>
                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {articles.map(item => (
                            <ArticleCard key={item._id} data={item} />
                          ))}
                       </div>
                    </section>
                  )}

                  {/* ── MAGAZINES SECTION ──────────────────────────── */}
                  {magazines.length > 0 && (
                    <section>
                       <div className="flex justify-center mb-10 w-full">
                          <div className="flex items-center gap-3">
                             <div className="w-1.5 h-6 bg-[#8A5A37] rounded-full" />
                             <h2 className="text-xl font-bold text-black/80">The Signet Editions</h2>
                          </div>
                       </div>
                       
                       <div className="relative group/mags">
                          <div className="flex gap-6 overflow-x-auto pb-10 no-scrollbar snap-x snap-mandatory">
                             {magazines.map(mag => (
                                <div key={mag._id} className="flex-none w-[calc(50%-12px)] md:w-[calc(25%-18px)] lg:w-[calc(16.66%-20px)] xl:w-[calc(14.28%-21px)] snap-start">
                                   <SimpleResourceCard data={mag} />
                                </div>
                             ))}
                          </div>
                       </div>
                    </section>
                  )}

                  {/* ── RECENTLY ADDED (Books + Interrupts) ────────── */}
                  <section>
                     <div className="flex items-center justify-between mb-10">
                        <h2 className="text-xl font-bold text-black/80">Recently Added</h2>
                        <Link href="#" className="text-[10px] font-black text-black/30 uppercase tracking-[0.2em] hover:text-[#163832] transition-colors">See All</Link>
                     </div>
                     <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-6 auto-rows-max grid-flow-dense">
                        {booksWithInterrupts.slice(0, 14).map((item, idx) => (
                           item._isInterrupt ? (
                             <WriteUpCard key={item._id || idx} data={item} />
                           ) : (
                             <SimpleResourceCard key={item._id || idx} data={item} />
                           )
                        ))}
                     </div>
                  </section>

                  {/* ── RECOMMENDED ─────────────────────────────────── */}
                  <section>
                     <div className="flex items-center justify-between mb-10">
                        <h2 className="text-xl font-bold text-black/80">Recommended For You</h2>
                        <Link href="#" className="text-[10px] font-black text-black/30 uppercase tracking-[0.2em] hover:text-[#163832] transition-colors">See All</Link>
                     </div>
                     <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-6 auto-rows-max grid-flow-dense">
                        {recommended.map(book => {
                          const tag = book.tag?.toLowerCase();
                          if (tag === 'article' || tag === 'image') {
                            return (
                              <div key={book._id} className="col-span-2">
                                <ArticleCard data={book} />
                              </div>
                            );
                          }
                          return <SimpleResourceCard key={book._id} data={book} />;
                        })}
                     </div>
                  </section>

                  {booksWithInterrupts.length > 14 && (
                    <section>
                       <div className="flex items-center justify-between mb-10">
                          <h2 className="text-xl font-bold text-black/80">Curated Collection</h2>
                       </div>
                       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-6 auto-rows-max grid-flow-dense">
                          {booksWithInterrupts.slice(14, 28).map((item, idx) => (
                             item._isInterrupt ? (
                               <WriteUpCard key={item._id || idx} data={item} />
                             ) : (
                               <SimpleResourceCard key={item._id || idx} data={item} />
                             )
                          ))}
                       </div>
                    </section>
                  )}
                </>
              )}
           </div>
        </main>
      </div>
    </div>
  );
}
