"use client";

import { useState, useMemo } from "react";
import { Search, Star, Bookmark, PlayCircle, Clock, ChevronRight, Layout, BookmarkCheck, Heart, Book, Compass } from "lucide-react";
import Link from "next/link";

// Reusable Section Header
const SectionHeader = ({ title, desc, href }: { title: string, desc?: string, href?: string }) => (
  <div className="flex items-end justify-between mb-8">
    <div>
      <h2 className="text-xl md:text-2xl font-black text-[#0D120E] tracking-tight">{title}</h2>
      {desc && <p className="text-[#0D120E]/40 font-bold text-[11px] uppercase tracking-widest mt-1.5">{desc}</p>}
    </div>
    {href && (
      <Link href={href} className="text-[11px] font-black text-[#1DA756] hover:text-[#0D120E] transition-colors tracking-widest uppercase flex items-center gap-1.5 bg-[#1DA756]/5 px-4 py-2 rounded-full">
        See All <ChevronRight className="w-3 h-3" />
      </Link>
    )}
  </div>
);

// Redesigned Resource Card
const ResourceCard = ({ data, type = "Book" }: { data: any, type?: string }) => {
  const mockAuthor = "Signet Curated";
  const mockRating = (4.2 + (Math.random() * 0.7)).toFixed(1);
  const isMagazine = data.tag === "Magazine" || type === "Magazine";

  return (
    <Link href={data.slug?.current ? `/resources/${data.slug.current}` : "#"} className="group flex flex-col gap-5">
      <div className={`relative ${isMagazine ? "aspect-[4/5.5]" : "aspect-[2/3]"} rounded-[1.5rem] overflow-hidden bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-black/[0.05] transition-all duration-500 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.2)] group-hover:-translate-y-4`}>
        {data.mainImageUrl ? (
          <img 
            src={data.mainImageUrl} 
            alt={data.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#F7F6F0] to-[#EBE9E1] flex flex-col items-center justify-center p-8 text-center ring-inset ring-1 ring-black/[0.05]">
            <Book className={`w-10 h-10 ${isMagazine ? "text-[#D0652B]" : "text-[#1DA756]"} opacity-30 mb-4`} />
            <span className="font-black text-[#0D120E]/30 text-base uppercase tracking-[0.2em]">{data.title.substring(0, 10)}</span>
          </div>
        )}
        <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/20 to-transparent opacity-40 z-20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-60 z-10 pointer-events-none" />
        
        <div className="absolute top-6 right-6 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 z-30">
          <button className="w-11 h-11 rounded-full bg-white/95 backdrop-blur-md shadow-xl flex items-center justify-center text-[#0D120E]/60 hover:text-red-500 hover:scale-110 transition-all">
            <Heart className="w-5 h-5" />
          </button>
          <button className="w-11 h-11 rounded-full bg-white/95 backdrop-blur-md shadow-xl flex items-center justify-center text-[#0D120E]/60 hover:text-[#1DA756] hover:scale-110 transition-all">
            <BookmarkCheck className="w-5 h-5" />
          </button>
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
           <div className="w-16 h-16 rounded-full bg-white shadow-2xl flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500">
              <PlayCircle className={`w-8 h-8 ${isMagazine ? "text-[#D0652B]" : "text-[#1DA756]"}`} />
           </div>
        </div>
      </div>

      <div className="px-1 space-y-1.5">
        <div className="flex items-center justify-between">
           <div className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest ${isMagazine ? "bg-[#FFF0E6] text-[#D0652B]" : "bg-[#E6F4EA] text-[#1DA756]"}`}>
             {isMagazine ? "Magazine" : "Curated Book"}
           </div>
           <div className="flex items-center gap-1.5 text-[#F5B041]">
             <Star className="w-3 h-3 fill-current" />
             <span className="text-[11px] font-black text-[#D08B16]">{mockRating}</span>
           </div>
        </div>
        <h3 className="font-bold text-[#0D120E] text-base md:text-lg leading-[1.3] line-clamp-2 min-h-[3.5rem] group-hover:text-[#1DA756] transition-colors italic">
          {data.title}
        </h3>
        <p className="text-[12px] text-[#0D120E]/40 font-bold uppercase tracking-widest">
          {mockAuthor}
        </p>
      </div>
    </Link>
  );
};

const MOCK_AUTHORS = [
  { name: "Ellen Eugen", role: "Mindset Coach", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" },
  { name: "Mathew Carl", role: "Psychologist", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150" },
  { name: "Millman", role: "Growth Strategist", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150" },
  { name: "S.L. Benson", role: "Author", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150" },
  { name: "R.M. Ball", role: "Theologian", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" },
];

export default function ResourcesLibrary({ initialPosts }: { initialPosts: any[] }) {
  const [search, setSearch] = useState("");

  const filteredPosts = useMemo(() => {
    if (!search) return initialPosts;
    const s = search.toLowerCase();
    return initialPosts.filter(p => 
      p.title.toLowerCase().includes(s) || 
      p.tag?.toLowerCase().includes(s) ||
      p.description?.toLowerCase().includes(s)
    );
  }, [search, initialPosts]);

  const magazines = filteredPosts.filter(p => p.tag === 'Magazine');
  const books = filteredPosts.filter(p => p.tag === 'Book' || (p.tag !== 'Magazine' && p.tag !== 'Article'));
  const recommended = initialPosts.length > 8 ? initialPosts.slice(0, 8) : initialPosts;

  return (
    <div className="min-h-screen bg-white text-[#0D120E]" style={{ fontFamily: "'Outfit', sans-serif" }}>
      {/* ── TOP NAVIGATION ─────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-black/[0.04] h-16 flex items-center px-6">
        <div className="flex items-center gap-12 w-full">
           <Link href="/" className="text-2xl font-black italic tracking-tighter text-[#1DA756]">
             resources.
           </Link>

           <div className="flex-1 max-w-4xl relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20 group-focus-within:text-[#1DA756] transition-colors" />
              <input 
                type="text"
                placeholder="Search by title, author or ISBN"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-11 pl-11 pr-4 bg-black/[0.03] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1DA756]/10 transition-all placeholder:text-black/20"
              />
           </div>

           <div className="flex items-center gap-6 ml-auto">
              <div className="flex items-center gap-3">
                 <span className="text-[11px] font-bold text-black/40 uppercase">Member</span>
                 <div className="w-8 h-8 rounded-full bg-black/5" />
              </div>
           </div>
        </div>
      </header>

      <div className="flex pt-16 h-screen">
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
                   <button key={item.label} className={`flex items-center gap-3 text-xs font-bold ${item.active ? "text-[#1DA756]" : "text-black/50 hover:text-black"} transition-colors w-full text-left`}>
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

           <button className="mt-4 w-full py-2 bg-[#1DA756]/10 text-[#1DA756] border border-[#1DA756]/20 rounded-md text-[10px] font-black uppercase tracking-widest hover:bg-[#1DA756] hover:text-white transition-all">
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
                         <div className="w-1.5 h-6 bg-[#1DA756] rounded-full" />
                         <h2 className="text-xl font-bold text-black/80">Search Results for "{search}"</h2>
                      </div>
                      <p className="text-[10px] font-black text-black/30 uppercase tracking-[0.2em]">{filteredPosts.length} items found</p>
                   </div>
                   {filteredPosts.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-6">
                         {filteredPosts.map(item => (
                            <SimpleResourceCard key={item._id} data={item} />
                         ))}
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
                  {/* Magazines Section */}
                  {magazines.length > 0 && (
                    <section>
                       <div className="flex items-center justify-between mb-10">
                          <div className="flex items-center gap-3">
                             <div className="w-1.5 h-6 bg-[#1DA756] rounded-full" />
                             <h2 className="text-xl font-bold text-black/80">Monthly Magazines</h2>
                          </div>
                          <Link href="#" className="text-[10px] font-black text-black/30 uppercase tracking-[0.2em] hover:text-[#1DA756] transition-colors">Digital Edition</Link>
                       </div>
                       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-6">
                          {magazines.map(mag => (
                             <SimpleResourceCard key={mag._id} data={mag} />
                          ))}
                       </div>
                    </section>
                  )}

                  {/* Recently Added Section */}
                  <section>
                     <div className="flex items-center justify-between mb-10">
                        <h2 className="text-xl font-bold text-black/80">Recently Added</h2>
                        <Link href="#" className="text-[10px] font-black text-black/30 uppercase tracking-[0.2em] hover:text-[#1DA756] transition-colors">See All</Link>
                     </div>
                     <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-6">
                        {books.slice(0, 7).map(book => (
                           <SimpleResourceCard key={book._id} data={book} />
                        ))}
                     </div>
                  </section>

                  {/* Recommended Section */}
                  <section>
                     <div className="flex items-center justify-between mb-10">
                        <h2 className="text-xl font-bold text-black/80">Recommended For You</h2>
                        <Link href="#" className="text-[10px] font-black text-black/30 uppercase tracking-[0.2em] hover:text-[#1DA756] transition-colors">See All</Link>
                     </div>
                     <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-6">
                        {recommended.map(book => (
                           <SimpleResourceCard key={book._id} data={book} />
                        ))}
                     </div>
                  </section>

                  {books.length > 14 && (
                    <section>
                       <div className="flex items-center justify-between mb-10">
                          <h2 className="text-xl font-bold text-black/80">Curated Collection</h2>
                       </div>
                       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-6 text-xs">
                          {books.slice(14, 21).map(book => (
                             <SimpleResourceCard key={book._id} data={book} />
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

// ── COMPACT RESOURCE CARD ─────────────────────────────────────────

const SimpleResourceCard = ({ data }: { data: any }) => {
  const rating = (4.0 + Math.random()).toFixed(1);
  const resourceUrl = data.fileUrl || (data.slug?.current ? `/resources/${data.slug.current}` : "#");

  return (
    <a 
      href={resourceUrl} 
      download={!!data.fileUrl} 
      target={data.fileUrl ? "_blank" : "_self"} 
      className="group block space-y-3 cursor-pointer"
    >
       <div className="aspect-[2/3] rounded-lg overflow-hidden bg-white shadow-sm border border-black/5 transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1 relative">
         {data.mainImageUrl ? (
            <img src={data.mainImageUrl} alt={data.title} className="w-full h-full object-cover" />
         ) : (
            <div className="w-full h-full bg-black/5 flex items-center justify-center">
               <Book size={24} className="text-black/10" />
            </div>
         )}
         <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-black/60 hover:text-red-500 scale-90 group-hover:scale-100 transition-all">
               <Heart size={14} />
            </div>
            <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-black/60 hover:text-[#1DA756] scale-90 group-hover:scale-100 transition-all">
               <Bookmark size={14} />
            </div>
         </div>
       </div>
       <div className="space-y-1">
          <h4 className="text-[12px] font-bold text-black/80 line-clamp-2 leading-tight group-hover:text-[#1DA756] transition-colors">{data.title}</h4>
          <p className="text-[10px] text-black/40 font-medium">Signet Curated</p>
          <div className="flex items-center gap-1 mt-1">
             {[...Array(5)].map((_, i) => (
                <Star key={i} size={8} className={`${i < Math.floor(Number(rating)) ? "text-[#F5B041] fill-current" : "text-black/10"}`} />
             ))}
          </div>
       </div>
    </a>
  );
};
