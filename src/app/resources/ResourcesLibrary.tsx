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
          <h1 className="text-[24px] sm:text-[28px] font-bold text-[#005746] leading-tight" >
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
            <span className="text-[10px] font-bold tracking-widest text-[#006b58] uppercase" >
              FOUNDATION
            </span>
            <div className="flex items-center justify-between mt-1">
              <h2 className="text-[24px] font-bold text-[#005746]" >
                Curated Books
              </h2>
              <button className="flex items-center gap-1.5 text-[14px] font-bold text-[#191c1d] hover:text-[#005746] transition-colors">
                Explore Library <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
             {/* Feature Book - Reverted Mobile UI to be more list-like but prominent */}
             <div 
               onClick={() => books[0]?.fileUrl && window.open(books[0].fileUrl, '_blank')}
               className="bg-white rounded-[2rem] p-5 md:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.03)] border border-[#f2f4f5] flex flex-row md:flex-row gap-5 md:gap-10 relative overflow-hidden group cursor-pointer"
             >
               <div className="w-24 md:w-56 shrink-0 aspect-[2/3] md:aspect-[3/4.5] shadow-2xl rounded-xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent w-4 md:w-6 z-10" />
                  {books[0]?.mainImageUrl ? (
                    <img src={books[0].mainImageUrl} alt={books[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full bg-[#005746] flex justify-center items-center p-2">
                       <span className="text-white text-[8px] md:text-xs text-center font-bold uppercase tracking-widest">{books[0]?.title || 'Silent Lead'}</span>
                    </div>
                  )}
               </div>
               
               <div className="flex flex-col justify-center py-2">
                 <div className="flex justify-between items-start">
                    <div className="min-w-0 flex-1 pr-2">
                      <h3 className="text-[16px] md:text-[24px] font-extrabold text-[#005746] leading-tight line-clamp-2 md:line-clamp-none" >
                        {books[0]?.title}
                      </h3>
                      <p className="text-[9px] md:text-[11px] uppercase tracking-[0.2em] text-[#006b58] mt-1.5 md:mt-2 font-bold" >
                        By {books[0]?.author?.name || books[0]?.tag || 'Signet Expert'}
                      </p>
                    </div>
                    <span className="bg-[#83fba5] text-[#005746] text-[8px] md:text-[10px] font-bold px-3 md:px-4 py-1 rounded-full uppercase tracking-widest shrink-0 shadow-sm whitespace-nowrap hidden sm:block">
                      Latest Release
                    </span>
                 </div>
                 <p className="text-[13px] md:text-[15px] text-[#3e4945] mt-3 md:mt-6 leading-relaxed line-clamp-3 md:line-clamp-4" >
                    {books[0]?.description}
                 </p>
                 <div className="flex items-center gap-3 md:gap-4 mt-6 md:mt-10">
                    <button className="px-5 md:px-8 py-2 md:py-3 rounded-full bg-[#005746] text-white text-[12px] md:text-[14px] font-bold hover:bg-[#006d36] transition-all transform hover:scale-105 shadow-lg shadow-[#005746]/20">
                      {books[0]?.fileUrl ? 'Open Resource' : 'Read Now'}
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); }} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#bec9c4] text-[#6e7975] flex items-center justify-center hover:bg-[#f2f4f5] transition-all hover:scale-110">
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
                   <button 
                     onClick={() => book.fileUrl && window.open(book.fileUrl, '_blank')} 
                     key={book._id || idx} 
                     className="bg-white rounded-[1.2rem] p-4 shadow-sm border border-[#f2f4f5] flex gap-4 group items-center hover:shadow-md transition-shadow text-left w-full"
                   >
                     <div className="w-14 md:w-16 h-20 md:h-24 shrink-0 shadow-md rounded overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent w-2 z-10" />
                        <img src={book.mainImageUrl || "/placeholder-avatar.png"} className="w-full h-full bg-emerald-800 object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                     </div>
                     <div className="min-w-0 flex-1">
                       <h3 className="text-[15px] md:text-[16px] font-bold text-[#005746] line-clamp-2 leading-snug" >{book.title}</h3>
                       <p className="text-[10px] uppercase tracking-widest text-[#6e7975] mt-0.5 mb-1" >{book.author?.name || book.tag || "Signet Author"}</p>
                       <p className="text-[12px] text-[#3e4945] line-clamp-2 opacity-70" >{book.description}</p>
                     </div>
                   </button>
                ))}
             </div>
          </div>
        </section>

        {/* Magazines & Journals Section */}
        <section>
          <div className="mb-6">
            <span className="text-[10px] font-bold tracking-widest text-[#006b58] uppercase" >
              INDUSTRY PULSE
            </span>
            <div className="flex items-center mt-1">
              <h2 className="text-[24px] font-bold text-[#005746]" >
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
                  <h3 className="text-[14px] font-bold text-[#005746] line-clamp-1" >{mag.title}</h3>
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
              <span className="text-[10px] font-bold tracking-widest text-[#006b58] uppercase" >
                FRESH PERSPECTIVES
              </span>
              <div className="flex items-center mt-1">
                <h2 className="text-[24px] font-bold text-[#005746]" >
                  Curated Articles
                </h2>
              </div>
            </div>
            <div className="flex bg-[#f2f4f5] rounded-full p-1 border border-[#e1e3e4]">
                <button className="px-5 py-1.5 rounded-full bg-[#e6e8e9] text-[#191c1d] text-[12px] font-bold tracking-wide shadow-sm" >
                  Latest
                </button>
                <button className="px-5 py-1.5 rounded-full text-[#6e7975] text-[12px] font-medium" >
                  Trending
                </button>
            </div>
          </div>

          <div className="space-y-3">
             {articles.length > 0 ? (
               articles.map((article: any, idx: number) => {
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
                         <h3 className="text-[14px] md:text-[16px] font-bold text-[#191c1d] group-hover:text-[#005746] transition-colors line-clamp-1" >
                           {article.title}
                         </h3>
                         <p className="text-[12px] md:text-[13px] text-[#6e7975] mt-0.5 md:mt-1 line-clamp-1 md:line-clamp-2" >
                           {article.description || article.content}
                         </p>
                      </div>
                      <div className="hidden sm:flex items-center gap-1 text-[13px] text-[#6e7975] italic shrink-0 pr-4 font-serif">
                         {article.provider || "Signet Exclusive"} <ChevronRight size={14} className="not-italic opacity-50" />
                      </div>
                   </a>
                 )
               })
             ) : (
                <div className="py-12 text-center bg-white rounded-3xl border border-dashed border-[#bec9c4]/40">
                   <p className="text-[#6e7975] text-sm italic">New insights arriving soon from our editors.</p>
                </div>
             )}
          </div>
        </section>

      </div>
      
      <Footer />
    </div>
  );
}
