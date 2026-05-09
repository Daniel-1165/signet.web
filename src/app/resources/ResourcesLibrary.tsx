"use client";

import { useState } from "react";
import { Search, Bell, Calendar, ChevronRight, Bookmark, ArrowRight, BookOpen, Brain, Leaf } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

export default function ResourcesLibrary({ initialPosts, interrupts = [] }: { initialPosts: any[], interrupts?: any[] }) {
  const [search, setSearch] = useState("");

  const magazines = initialPosts.filter(p => p.tag?.toLowerCase() === 'magazine');
  const articles = initialPosts.filter(p => p.tag?.toLowerCase() === 'article' || p.tag?.toLowerCase() === 'image');
  const books = initialPosts.filter(p => {
    const tag = p.tag?.toLowerCase();
    return tag !== 'magazine' && tag !== 'article' && tag !== 'image';
  });

  return (
    <div className="bg-[#F8FAFB] text-[#191c1d] pb-32">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between py-6 max-w-[1200px] mx-auto gap-6 lg:gap-0">
        <div>
          <h1 className="text-[28px] font-bold text-[#005746] leading-tight" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
            Resources
          </h1>
          <p className="text-[#6e7975] text-[14px]">
            Curated knowledge for silent growth
          </p>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6e7975]" />
            <input 
              type="text" 
              placeholder="Search knowledge..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 bg-[#f2f4f5] rounded-full text-[14px] border border-transparent focus:border-[#83fba5] outline-none transition-all w-[240px] text-[#3e4945] font-body"
            />
          </div>
          <button className="text-[#191c1d] hover:text-[#005746] transition-colors"><Bell className="w-5 h-5" /></button>
          <button className="text-[#191c1d] hover:text-[#005746] transition-colors"><Calendar className="w-5 h-5" /></button>
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#83fba5] shadow-sm"><UserButton /></div>
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
             <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#f2f4f5] flex flex-col sm:flex-row gap-6 relative overflow-hidden group">
               <div className="w-32 sm:w-40 shrink-0 aspect-[2/3] shadow-lg rounded-md overflow-hidden relative">
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

             {/* Secondary Books Grid */}
             <div className="flex flex-col gap-6">
                {(books.length > 1 ? books.slice(1, 3) : [
                  { title: "Deep Work Ethics", tag: "Marcus Thorne", description: "Strategies for cognitive persistence in the age of constant digital distraction." },
                  { title: "Organic Systems", tag: "Sarah Jenkins", description: "Building habits that mirror natural growth cycles for sustainable results." }
                ]).map((book: any, idx: number) => (
                  <a href={book.slug?.current ? `/resources/${book.slug.current}` : "#"} key={book._id || idx} className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-[#f2f4f5] flex gap-5 group items-center flex-1 hover:shadow-md transition-shadow">
                     <div className="w-16 h-24 shrink-0 shadow-md rounded overflow-hidden">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(magazines.length > 0 ? magazines.slice(0,3) : [
               { title: "Signet Quarterly", description: "Issue #14: The Winter Resilience Edition", special: false },
               { title: "The Modern Lead", description: "Special Report: Asynchronous Mentorship", special: false },
               { title: "Growth Science", description: "Neuroplasticity and Habit Formation", special: true }
            ]).map((mag: any, idx) => (
              <a href={mag.slug?.current ? `/resources/${mag.slug.current}` : "#"} key={mag._id || idx} className={`group cursor-pointer ${idx === 2 ? 'relative hidden md:block' : ''}`}>
                <div className={`aspect-[3/4] rounded-[1.5rem] overflow-hidden shadow-sm relative ${mag.special ? 'bg-[#f2f4f5]' : ''}`}>
                   <img src={mag.mainImageUrl || "/placeholder-avatar.png"} className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${mag.special ? 'mix-blend-multiply opacity-20' : 'bg-[#e1e3e4]'}`} />
                   {!mag.special && <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />}
                </div>
                <div className="mt-4 px-2">
                  <h3 className="text-[16px] font-bold text-[#005746] line-clamp-1" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{mag.title}</h3>
                  <p className="text-[12px] text-[#6e7975] mt-1 line-clamp-1">{mag.description}</p>
                </div>
                {mag.special && (
                   <button className="absolute top-4 right-4 w-10 h-10 bg-[#005746] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#006d36] transition-colors z-10">
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

          <div className="space-y-4">
             {(articles.length > 0 ? articles.slice(0, 5) : [
               { tag: 'Strategy', title: "The Art of Active Silence in Negotiations", description: "How leaving space for silence can reveal more than asking direct questions.", provider: "Harvard Business Review", icon: BookOpen, colorClass: "bg-[#83fba5] text-[#005746]" },
               { tag: 'Psychology', title: "Breaking the Feedback Loop of Burnout", description: "Practical steps for middle managers to reclaim their focus and energy.", provider: "Psychology Today", icon: Brain, colorClass: "bg-[#e1e3e4] text-[#191c1d]" },
               { tag: 'Sustainability', title: "Sustainable Career Paths in 2025", description: "Aligning personal growth with ecological and social impact goals.", provider: "Forbes Growth", icon: Leaf, colorClass: "bg-[#9ef3da] text-[#005746]" }
             ]).map((article: any, idx) => {
               const IconComponent = article.icon || BookOpen;
               const ColorClass = article.colorClass || "bg-[#e1e3e4] text-[#191c1d]";
               
               return (
                 <a href={article.slug?.current ? `/resources/${article.slug.current}` : article.fileUrl || "#"} key={article._id || idx} className="bg-white rounded-[1rem] p-6 shadow-sm border border-[#f2f4f5] flex items-center gap-6 group hover:shadow-md hover:border-[#e1e3e4] transition-all cursor-pointer">
                    <div className={`w-14 h-14 rounded-[0.5rem] flex items-center justify-center shrink-0 ${ColorClass}`}>
                       <IconComponent size={24} />
                    </div>
                    <div className="flex-1">
                       <div className="flex items-center gap-3 mb-2">
                          <span className={`${idx === 1 ? 'bg-[#f8fafb] border border-[#e1e3e4] text-[#3e4945]' : 'bg-[#e6fcf2] text-[#005746]'} uppercase text-[9px] font-bold px-2 py-0.5 rounded tracking-widest`}>
                            {article.tag || "Article"}
                          </span>
                          <span className="text-[11px] text-[#bec9c4] font-medium">5 min read</span>
                       </div>
                       <h3 className="text-[16px] font-bold text-[#191c1d] group-hover:text-[#005746] transition-colors line-clamp-1" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
                         {article.title}
                       </h3>
                       <p className="text-[13px] text-[#6e7975] mt-1 line-clamp-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                         {article.description}
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
      
      <footer className="max-w-[1200px] mx-auto mt-24 text-center border-t border-[#e1e3e4] pt-8">
        <p className="text-[12px] text-[#bec9c4]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          &copy; 2024 SIGNET Silent Growth Network. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
