"use client";

import { useState } from "react";
import { Search, Bell, Calendar, ChevronRight, Bookmark, ArrowRight, BookOpen, Brain, Leaf } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import Footer from "@/components/layout/Footer";

export default function ResourcesLibrary({ initialPosts, interrupts = [] }: { initialPosts: any[], interrupts?: any[] }) {
  const [search, setSearch] = useState("");

  // Refined filtering logic to include search and ensure all Sanity posts are captured
  const filteredPosts = initialPosts.filter(p => {
    const searchLower = search.toLowerCase();
    return (
      p.title?.toLowerCase().includes(searchLower) ||
      p.description?.toLowerCase().includes(searchLower) ||
      p.tag?.toLowerCase().includes(searchLower) ||
      p.category?.toLowerCase().includes(searchLower)
    );
  });

  const magazines = filteredPosts.filter(p => 
    p.tag?.toLowerCase() === 'magazine' || 
    p.category?.toLowerCase() === 'magazine' ||
    p._type === 'magazine'
  );

  const articles = filteredPosts.filter(p => 
    p.tag?.toLowerCase() === 'article' || 
    p.category?.toLowerCase() === 'article' || 
    p._type === 'post' ||
    p.tag?.toLowerCase() === 'image'
  );

  const books = filteredPosts.filter(p => {
    const tag = p.tag?.toLowerCase() || p.category?.toLowerCase();
    const isMagazine = tag === 'magazine' || p._type === 'magazine';
    const isArticle = tag === 'article' || p._type === 'post' || tag === 'image';
    return !isMagazine && !isArticle;
  });

  return (
    <div className="bg-[#F8FAFB] text-[#191c1d] pb-24 px-4 md:px-6">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between py-6 max-w-[1200px] mx-auto gap-4 sm:gap-0">
        <div>
          <h1 className="text-[24px] sm:text-[28px] font-bold text-[#005746] leading-tight" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
            Resources
          </h1>
          <p className="text-[#6e7975] text-[13px] sm:text-[14px]">
            Curated knowledge for silent growth
          </p>
        </div>
        
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="relative group flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6e7975]" />
            <input 
              type="text" 
              placeholder="Search..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-[#f2f4f5] rounded-full text-[13px] border border-transparent focus:border-[#83fba5] outline-none transition-all w-full sm:w-[240px] text-[#3e4945] font-body"
            />
          </div>
          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
            <button className="text-[#191c1d] hover:text-[#005746] transition-colors"><Bell className="w-5 h-5" /></button>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-[#83fba5] shadow-sm"><UserButton /></div>
          </div>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto space-y-16">
        
        {/* Curated Books Section */}
        <section>
          <div className="mb-6">
            <span className="text-[10px] font-bold tracking-widest text-[#006b58] uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              FOUNDATION
            </span>
            <div className="flex items-center justify-between mt-1">
              <h2 className="text-[24px] font-bold text-[#005746]" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
                Curated Books
              </h2>
              <button className="flex items-center gap-1.5 text-[14px] font-bold text-[#191c1d] hover:text-[#005746] transition-colors">
                Explore Library <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Feature Book */}
             <div className="bg-white rounded-[1.2rem] p-4 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#f2f4f5] flex flex-col sm:flex-row gap-4 md:gap-6 relative overflow-hidden group">
               <div className="w-28 md:w-40 shrink-0 aspect-[2/3] shadow-lg rounded-md overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent w-4 z-10" />
                  {books[0]?.mainImageUrl ? (
                    <img src={books[0].mainImageUrl} alt={books[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full bg-[#005746] flex justify-center items-center">
                       <span className="text-white text-xs">The Silent Lead</span>
                    </div>
                  )}
               </div>
               
               <div className="flex flex-col justify-center">
                 <div className="flex justify-between items-start">
                   <div>
                     <h3 className="text-[18px] font-bold text-[#005746]" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>The Silent Lead</h3>
                     <p className="text-[10px] uppercase tracking-widest text-[#6e7975] mt-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>By Elena Vance</p>
                   </div>
                   <span className="bg-[#83fba5] text-[#005746] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shrink-0 shadow-sm whitespace-nowrap hidden sm:block">
                     Book of the Month
                   </span>
                 </div>
                 <p className="text-[14px] text-[#3e4945] mt-4 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                   A transformative guide on harnessing introversion as a strategic advantage in competitive leadership environments.
                 </p>
                 <div className="flex items-center gap-3 mt-6">
                   <button className="px-5 py-2 rounded-full bg-[#005746] text-white text-[14px] font-bold hover:bg-[#006d36] transition-colors">
                     Read Summary
                   </button>
                   <button className="w-10 h-10 rounded-full border border-[#bec9c4] text-[#6e7975] flex items-center justify-center hover:bg-[#f2f4f5] transition-colors">
                     <Bookmark size={18} />
                   </button>
                 </div>
               </div>
             </div>

             <div className="grid grid-cols-1 gap-6">
                {(books.length > 1 ? books.slice(1) : [
                  { title: "Deep Work Ethics", tag: "Marcus Thorne", description: "Strategies for cognitive persistence in the age of constant digital distraction." },
                  { title: "Organic Systems", tag: "Sarah Jenkins", description: "Building habits that mirror natural growth cycles for sustainable results." }
                ]).map((book: any, idx: number) => (
                   <a href={book.slug?.current ? `/resources/${book.slug.current}` : "#"} key={book._id || idx} className="bg-white rounded-[1.2rem] p-4 shadow-sm border border-[#f2f4f5] flex gap-4 group items-center hover:shadow-md transition-shadow">
                     <div className="w-14 md:w-16 h-20 md:h-24 shrink-0 shadow-md rounded overflow-hidden">
                       <img src={book.mainImageUrl || "/placeholder-avatar.png"} className="w-full h-full bg-emerald-800 object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                     </div>
                     <div>
                       <h3 className="text-[16px] font-bold text-[#005746] line-clamp-1" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{book.title}</h3>
                       <p className="text-[10px] uppercase tracking-widest text-[#6e7975] mt-0.5 mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{book.tag || "Signet Author"}</p>
                       <p className="text-[12px] text-[#3e4945] line-clamp-2" style={{ fontFamily: "'Inter', sans-serif" }}>{book.description || "In-depth strategies for cognitive persistence and continuous intentional growth."}</p>
                     </div>
                  </a>
                ))}
             </div>
          </div>
        </section>

        {/* Magazines & Journals Section */}
        <section>
          <div className="mb-6">
            <span className="text-[10px] font-bold tracking-widest text-[#006b58] uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              INDUSTRY PULSE
            </span>
            <div className="flex items-center mt-1">
              <h2 className="text-[24px] font-bold text-[#005746]" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
                Magazines & Journals
              </h2>
            </div>
          </div>

          <div className="flex overflow-x-auto pb-8 gap-6 scrollbar-hide snap-x snap-mandatory">
            {(magazines.length > 0 ? magazines : [
               { title: "Signet Quarterly", description: "Issue #14: The Winter Resilience Edition", special: false },
               { title: "The Modern Lead", description: "Special Report: Asynchronous Mentorship", special: false },
               { title: "Growth Science", description: "Neuroplasticity and Habit Formation", special: true },
               { title: "Silent Edge", description: "Strategic Advantages of Discretion", special: false }
            ]).map((mag: any, idx: number) => (
              <a 
                href={mag.slug?.current ? `/resources/${mag.slug.current}` : "#"} 
                key={mag._id || idx} 
                className="group cursor-pointer flex-none w-[160px] md:w-[240px] snap-start"
              >
                <div className={`aspect-[3/4.2] rounded-[1.2rem] overflow-hidden shadow-sm relative ${mag.special ? 'bg-[#f2f4f5]' : 'bg-[#e1e3e4]'}`}>
                   <img 
                    src={mag.mainImageUrl || "/placeholder-avatar.png"} 
                    className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${mag.special ? 'mix-blend-multiply opacity-20' : ''}`} 
                   />
                   {!mag.special && (
                    <div className="absolute inset-0 bg-gradient-to-t from-[#005746]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                   )}
                </div>
                <div className="mt-4 px-1">
                  <h3 className="text-[14px] font-bold text-[#005746] line-clamp-1" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{mag.title}</h3>
                  <p className="text-[11px] text-[#6e7975] mt-1 line-clamp-1 font-medium">{mag.description}</p>
                </div>
                {mag.special && (
                   <button className="absolute top-3 right-3 w-8 h-8 bg-[#005746] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#006d36] transition-colors z-10">
                     +
                   </button>
                )}
              </a>
            ))}
          </div>
        </section>

        {/* Curated Articles Section */}
        <section>
          <div className="mb-6 flex items-end justify-between">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-[#006b58] uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                FRESH PERSPECTIVES
              </span>
              <div className="flex items-center mt-1">
                <h2 className="text-[24px] font-bold text-[#005746]" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
                  Curated Articles
                </h2>
              </div>
            </div>
            <div className="flex bg-[#f2f4f5] rounded-full p-1 border border-[#e1e3e4]">
                <button className="px-5 py-1.5 rounded-full bg-[#e6e8e9] text-[#191c1d] text-[12px] font-bold tracking-wide shadow-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Latest
                </button>
                <button className="px-5 py-1.5 rounded-full text-[#6e7975] text-[12px] font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Trending
                </button>
            </div>
          </div>

          <div className="space-y-3">
             {articles.map((article: any, idx: number) => {
               const IconComponent = article.icon || BookOpen;
               const ColorClass = article.colorClass || "bg-[#e1e3e4] text-[#191c1d]";
               
               return (
                 <a 
                   href={article.slug?.current ? `/resources/${article.slug.current}` : article.fileUrl || "#"} 
                   key={article._id || idx} 
                   className="bg-white rounded-[1.2rem] p-3 md:p-5 shadow-sm border border-[#f2f4f5] flex items-center gap-4 md:gap-6 group hover:shadow-md hover:border-[#e1e3e4] transition-all cursor-pointer"
                 >
                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-[0.8rem] flex items-center justify-center shrink-0 ${ColorClass}`}>
                       <IconComponent className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                    <div className="flex-1">
                       <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                          <span className="bg-[#e6fcf2] text-[#005746] uppercase text-[8px] md:text-[9px] font-bold px-2 py-0.5 rounded tracking-widest">
                            {article.tag || article.category || "Article"}
                          </span>
                          <span className="text-[10px] md:text-[11px] text-[#bec9c4] font-medium">5 min read</span>
                       </div>
                       <h3 className="text-[14px] md:text-[16px] font-bold text-[#191c1d] group-hover:text-[#005746] transition-colors line-clamp-1" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
                         {article.title}
                       </h3>
                       <p className="text-[12px] md:text-[13px] text-[#6e7975] mt-0.5 md:mt-1 line-clamp-1 md:line-clamp-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                         {article.description || article.content}
                       </p>
                    </div>
                    <div className="hidden sm:flex items-center gap-1 text-[13px] text-[#6e7975] italic shrink-0 pr-4 font-serif">
                       {article.provider || "Signet Exclusive"} <ChevronRight size={14} className="not-italic opacity-50" />
                    </div>
                 </a>
               )
             })}
          </div>
        </section>

      </div>
      
      <Footer />
    </div>
  );
}
