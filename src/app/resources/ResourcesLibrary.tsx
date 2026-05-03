"use client";

import { useState, useMemo } from "react";
import { Search, Star, Bookmark, PlayCircle, Clock, ChevronRight, Layout, BookmarkCheck, Heart, Book } from "lucide-react";
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
  const featured = initialPosts[0]; // Featured stays as the latest one regardless of search, or we could filter it?

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-32">
      <header className="sticky top-0 z-[50] bg-white/70 backdrop-blur-3xl border-b border-black/[0.03] px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-black text-[#0D120E] tracking-tight flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#1DA756] flex items-center justify-center text-white">
                <Layout className="w-4 h-4" />
              </div>
              Library.
            </h1>
            
            <nav className="hidden lg:flex items-center gap-8">
              {['Top Books', 'Discover', 'Categories', 'History'].map((link, i) => (
                <button key={link} className={`text-[11px] font-black uppercase tracking-[0.2em] ${i === 1 ? "text-[#1DA756]" : "text-[#0D120E]/30 hover:text-[#0D120E]"} transition-colors`}>
                  {link}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3 w-full max-w-xl">
            <div className="relative w-full group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0D120E]/20 group-focus-within:text-[#1DA756] transition-colors" />
              <input 
                type="text"
                placeholder="Search Book, Author, or ISBN..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-12 pl-12 pr-6 bg-black/[0.03] hover:bg-black/[0.05] rounded-[1.25rem] border-none focus:outline-none focus:ring-2 focus:ring-[#1DA756]/10 font-bold text-xs transition-all placeholder:text-[#0D120E]/20"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-16 space-y-32">
        {search === "" && (
          <>
            <section>
              <SectionHeader title="Top Authors" desc="Insights from the masters" />
              <div className="flex items-center gap-10 md:gap-16 overflow-x-auto no-scrollbar pb-6 pt-2">
                {MOCK_AUTHORS.map((author) => (
                   <div key={author.name} className="flex flex-col items-center gap-4 shrink-0 group">
                      <div className="relative">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#1DA756] transition-all p-1">
                          <img src={author.img} alt={author.name} className="w-full h-full object-cover rounded-full shadow-inner" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center border border-black/[0.05]">
                          <Star className="w-3.5 h-3.5 text-[#F5B041] fill-current" />
                        </div>
                      </div>
                      <div className="text-center">
                        <h4 className="text-sm font-black text-[#0D120E] leading-none mb-1 group-hover:text-[#1DA756] transition-colors">{author.name}</h4>
                        <p className="text-[10px] font-bold text-[#0D120E]/30 uppercase tracking-tight">{author.role}</p>
                      </div>
                   </div>
                ))}
              </div>
            </section>

            {featured && (
              <section>
                <SectionHeader title="Featured Selection" desc="Handpicked for your growth" />
                <Link 
                  href={`/resources/${featured.slug?.current}`}
                  className="relative block w-full bg-[#1F1B16] rounded-[4rem] overflow-hidden group shadow-2xl shadow-black/10 transition-transform duration-500 hover:scale-[1.01]"
                >
                  <div className="absolute inset-0 opacity-40 mix-blend-overlay">
                    <img src={featured.mainImageUrl} alt="" className="w-full h-full object-cover blur-3xl scale-125 transition-transform duration-[3s] group-hover:scale-150" />
                  </div>
                  <div className="relative z-10 p-12 md:p-20 flex flex-col md:flex-row items-center gap-16">
                    <div className="flex-1 text-center md:text-left space-y-10">
                      <div className="space-y-6">
                        <div className="px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 w-fit mx-auto md:mx-0">
                          <p className="text-[11px] font-black uppercase tracking-[0.4em] text-white">Editors Choice</p>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-white leading-[1] tracking-tight italic">
                          {featured.title}
                        </h2>
                        <p className="text-xl md:text-2xl text-white/50 font-medium max-w-xl mx-auto md:mx-0 leading-relaxed">
                          Transformative insights curated specifically for the Signet community trajectory.
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-5">
                        <button className="h-16 px-12 bg-[#1DA756] text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#158C45] transition-all shadow-xl shadow-[#1DA756]/20">
                          Explore Resource
                        </button>
                        <div className="flex items-center gap-4 px-8 h-16 rounded-2xl bg-white/5 border border-white/10 text-white/80">
                          <Clock className="w-5 h-5 text-[#1DA756]" />
                          <span className="text-base font-bold">12 min read</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-72 md:w-96 shrink-0 transform group-hover:-rotate-3 group-hover:-translate-y-6 transition-transform duration-700 ease-out">
                      <div className="aspect-[2/3] rounded-[2rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] ring-1 ring-white/20">
                        <img src={featured.mainImageUrl} alt="" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                </Link>
              </section>
            )}
          </>
        )}

        <section>
          <SectionHeader 
            title={search ? `Search Results (${filteredPosts.length})` : "Curated Bookshelf"} 
            desc={search ? "Showing resources matching your query" : "The latest from our selection"} 
            href={!search ? "#" : undefined} 
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-20">
            {books.slice(0, search ? undefined : 8).map(book => (
              <ResourceCard key={book._id} data={book} />
            ))}
            {books.length === 0 && (
              <div className="col-span-full py-32 bg-black/[0.02] rounded-[3rem] border border-dashed border-black/[0.1] flex flex-col items-center justify-center text-[#0D120E]/20">
                 <Book className="w-16 h-16 mb-6 opacity-30" />
                 <h3 className="font-black uppercase tracking-[0.3em] text-sm">
                   {search ? "No matching books found" : "Library currently empty"}
                 </h3>
              </div>
            )}
          </div>
        </section>

        {magazines.length > 0 && (
          <section className="relative px-8 py-20 bg-[#F7F6F0]/60 rounded-[4rem]">
            <SectionHeader title="Journals & Magazines" desc="Periodic growth insights" href={!search ? "#" : undefined} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-10 gap-y-16">
              {magazines.map(magazine => (
                <ResourceCard key={magazine._id} data={magazine} type="Magazine" />
              ))}
            </div>
          </section>
        )}

        {search === "" && (
          <section>
            <SectionHeader title="Recommended For You" desc="Based on your growth profile" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-20">
              {initialPosts.length > 5 ? initialPosts.slice(5, 13).map(post => (
                <ResourceCard key={post._id} data={post} />
              )) : filteredPosts.map(post => (
                <ResourceCard key={post._id} data={post} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
