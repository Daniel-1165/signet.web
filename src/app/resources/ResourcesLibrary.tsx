"use client";

import { useState, useEffect } from "react";
import { Search, Bell, Bookmark, ArrowRight, BookOpen, ChevronLeft, ChevronRight, Menu, FileText, Compass, Newspaper } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import Footer from "@/components/layout/Footer";

export default function ResourcesLibrary({ initialPosts, interrupts = [] }: { initialPosts: any[], interrupts?: any[] }) {
  const [search, setSearch] = useState("");
  const { user } = useUser();
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [activeFeaturedIdx, setActiveFeaturedIdx] = useState(0);

  // Load bookmarks from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("signet_resource_bookmarks");
      if (stored) {
        setBookmarks(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load bookmarks:", e);
    }
  }, []);

  const toggleBookmark = (id: string) => {
    let updated = [...bookmarks];
    if (updated.includes(id)) {
      updated = updated.filter(b => b !== id);
    } else {
      updated.push(id);
    }
    setBookmarks(updated);
    try {
      localStorage.setItem("signet_resource_bookmarks", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save bookmarks:", e);
    }
  };

  // Filter posts based on search term
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

  // Featured resources are the first 4 books
  const featuredResources = books.slice(0, 4);
  const curatedBooks = books.slice(1);

  const nextFeatured = () => {
    if (featuredResources.length === 0) return;
    setActiveFeaturedIdx(prev => (prev + 1) % featuredResources.length);
  };

  const prevFeatured = () => {
    if (featuredResources.length === 0) return;
    setActiveFeaturedIdx(prev => (prev - 1 + featuredResources.length) % featuredResources.length);
  };

  const featured = featuredResources[activeFeaturedIdx];

  return (
    <div className="bg-[#FAF9F6] text-[#1D1914] pb-24 font-dm-sans min-h-screen">
      
      {/* Header Container */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        
        {/* Top Header Row */}
        <header className="flex flex-col md:flex-row md:items-center justify-between py-6 gap-4 border-b border-gray-150/40">
          <div className="flex items-center gap-3">
            <button className="md:hidden p-1.5 rounded-lg hover:bg-gray-100 text-gray-700">
              <Menu size={20} />
            </button>
            <div>
              <h1 className="text-[28px] md:text-[34px] font-black text-[#1E6B3A] leading-tight tracking-tight">
                Resources
              </h1>
              <p className="text-gray-500 text-[13px] md:text-[14px] font-medium mt-0.5">
                Curated knowledge for silent growth
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:w-[320px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search resources, books, topics..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-full text-[14px] border border-transparent focus:bg-white focus:border-[#1E6B3A] outline-none transition-all text-gray-900 font-medium placeholder-gray-400 shadow-inner"
              />
            </div>
            
            <div className="flex items-center gap-4 shrink-0">
              <button className="text-gray-600 hover:text-[#1E6B3A] transition-colors p-2 rounded-full hover:bg-gray-100">
                <Bell className="w-5 h-5" />
              </button>
              <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 shadow-sm flex items-center justify-center bg-white">
                <UserButton />
              </div>
            </div>
          </div>
        </header>

        {/* FEATURED RESOURCE Section */}
        {featured && (
          <section className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[11px] font-black tracking-widest text-[#1E6B3A] uppercase flex items-center gap-1.5">
                <span className="text-[12px]">&#9733;</span> Featured Resource
              </span>
            </div>

            {/* Featured Book Card */}
            <div className="bg-[#FFFFFF] rounded-3xl p-5 md:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.02)] border border-gray-150/60 flex flex-col sm:flex-row gap-6 md:gap-10 relative overflow-hidden group">
              
              {/* Left Cover Image */}
              <div 
                onClick={() => featured.fileUrl && window.open(featured.fileUrl, '_blank')}
                className="w-full sm:w-[150px] md:w-[220px] shrink-0 aspect-[3/4.2] shadow-2xl rounded-2xl overflow-hidden relative cursor-pointer border border-gray-100/50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/15 to-transparent w-4 z-10" />
                {featured.mainImageUrl ? (
                  <img 
                    src={featured.mainImageUrl} 
                    alt={featured.title} 
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700" 
                  />
                ) : (
                  <div className="w-full h-full bg-[#1E6B3A] flex justify-center items-center p-4">
                    <span className="text-white text-sm text-center font-bold uppercase tracking-widest leading-normal">
                      {featured.title}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Right Content */}
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="bg-[#EAF4EC] text-[#1E6B3A] text-[9px] md:text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Latest Release
                    </span>
                  </div>
                  
                  <h3 
                    onClick={() => featured.fileUrl && window.open(featured.fileUrl, '_blank')}
                    className="text-[20px] md:text-[28px] font-black text-[#0B2B26] leading-tight mt-3 hover:underline cursor-pointer"
                  >
                    {featured.title}
                  </h3>
                  
                  <p className="text-[11px] md:text-[12px] uppercase tracking-wider text-[#1E6B3A] mt-2 font-bold">
                    BY {featured.author?.name || featured.tag || 'Patrick Lencioni'}
                  </p>
                  
                  <p className="text-[13px] md:text-[15px] text-gray-600 mt-4 leading-relaxed font-medium line-clamp-3 md:line-clamp-4">
                    {featured.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => featured.fileUrl && window.open(featured.fileUrl, '_blank')}
                      className="px-6 md:px-8 py-2.5 md:py-3.5 rounded-full bg-[#0B2B26] text-white text-[13px] font-bold hover:bg-[#1E6B3A] transition-all transform hover:scale-[1.01] shadow-md flex items-center gap-2"
                    >
                      Open Resource <span className="text-[14px] font-bold">&rarr;</span>
                    </button>
                    
                    <button 
                      onClick={() => toggleBookmark(featured._id)}
                      className={`w-11 h-11 md:w-12 md:h-12 rounded-full border border-gray-200 flex items-center justify-center transition-all ${bookmarks.includes(featured._id) ? 'bg-[#1E6B3A]/10 border-[#1E6B3A] text-[#1E6B3A]' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                    >
                      <Bookmark size={18} className={bookmarks.includes(featured._id) ? "fill-[#1E6B3A]" : ""} />
                    </button>
                  </div>

                  {/* Desktop Carousel Navigation */}
                  <div className="hidden md:flex items-center gap-2">
                    <button 
                      onClick={prevFeatured}
                      className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button 
                      onClick={nextFeatured}
                      className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Mobile Carousel Indicators (Dots) */}
            {featuredResources.length > 1 && (
              <div className="flex justify-center items-center gap-1.5 mt-4">
                {featuredResources.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setActiveFeaturedIdx(dotIdx)}
                    className={`w-2 h-2 rounded-full transition-all ${activeFeaturedIdx === dotIdx ? 'bg-[#1E6B3A] w-4' : 'bg-gray-350'}`}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Curated Books Section */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[20px] md:text-[24px] font-black text-[#0B2B26]">
              Curated Books
            </h2>
            <button className="flex items-center gap-1 text-[13px] md:text-[14px] font-bold text-[#1E6B3A] hover:underline transition-colors">
              View all books <ArrowRight size={14} />
            </button>
          </div>

          {curatedBooks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {curatedBooks.map((book: any, idx: number) => (
                <div 
                  key={book._id || idx}
                  className="bg-[#FFFFFF] rounded-2xl p-4 border border-gray-150/60 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex gap-4 relative group hover:border-[#1E6B3A]/30 transition-all"
                >
                  {/* Book Cover */}
                  <div 
                    onClick={() => book.fileUrl && window.open(book.fileUrl, '_blank')}
                    className="w-18 md:w-20 h-24 md:h-28 shrink-0 shadow-md rounded-xl overflow-hidden relative cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent w-2 z-10" />
                    <img 
                      src={book.mainImageUrl || "/placeholder-avatar.png"} 
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 bg-gray-100" 
                    />
                  </div>

                  {/* Book Info */}
                  <div className="flex-1 min-w-0 pr-6 flex flex-col justify-between py-0.5">
                    <div>
                      <h3 
                        onClick={() => book.fileUrl && window.open(book.fileUrl, '_blank')}
                        className="text-[15px] md:text-[16px] font-bold text-[#0B2B26] line-clamp-2 leading-snug hover:underline cursor-pointer"
                      >
                        {book.title}
                      </h3>
                      
                      <span className="text-[9px] uppercase tracking-wider text-[#1E6B3A] mt-1 font-bold block">
                        {book.tag || "BOOK"}
                      </span>
                    </div>

                    <p className="text-[12px] text-gray-500 line-clamp-2 leading-relaxed font-medium mt-1">
                      {book.description}
                    </p>
                  </div>

                  {/* Bookmark Button */}
                  <button 
                    onClick={() => toggleBookmark(book._id)}
                    className={`absolute top-4 right-4 p-1.5 rounded-full border transition-colors ${bookmarks.includes(book._id) ? 'bg-[#1E6B3A]/10 border-[#1E6B3A] text-[#1E6B3A]' : 'bg-transparent border-transparent text-gray-400 hover:text-[#1E6B3A]'}`}
                  >
                    <Bookmark size={16} className={bookmarks.includes(book._id) ? "fill-[#1E6B3A]" : ""} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center bg-white rounded-2xl border border-dashed border-gray-250">
              <p className="text-gray-500 text-sm italic">No books match your filter.</p>
            </div>
          )}
        </section>

        {/* Magazines & Journals Section */}
        {magazines.length > 0 && (
          <section className="mt-14">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-[20px] md:text-[24px] font-black text-[#0B2B26]">
                Magazines & Journals
              </h2>
            </div>

            <div className="flex overflow-x-auto pb-6 gap-5 scrollbar-hide snap-x snap-mandatory">
              {magazines.map((mag: any, idx: number) => (
                <a 
                  href={mag.slug?.current ? `/resources/${mag.slug.current}` : mag.fileUrl || "#"} 
                  key={mag._id || idx} 
                  className="group cursor-pointer flex-none w-[160px] md:w-[220px] snap-start"
                >
                  <div className="aspect-[3/4.2] rounded-2xl overflow-hidden shadow-sm relative border border-gray-100 bg-white">
                    <img 
                      src={mag.mainImageUrl || "/placeholder-avatar.png"} 
                      className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="mt-3 px-1">
                    <h3 className="text-[14px] font-bold text-[#0B2B26] line-clamp-1 group-hover:underline">{mag.title}</h3>
                    <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-1 font-medium">{mag.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Curated Articles Section */}
        {articles.length > 0 && (
          <section className="mt-12">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-[20px] md:text-[24px] font-black text-[#0B2B26]">
                Curated Articles
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {articles.map((article: any, idx: number) => {
                const icons = [BookOpen, FileText, Compass, Newspaper];
                const IconComponent = icons[idx % icons.length];
                return (
                  <a 
                    href={article.slug?.current ? `/resources/${article.slug.current}` : article.fileUrl || "#"} 
                    key={article._id || idx} 
                    className="bg-white rounded-2xl p-4 border border-gray-150/60 shadow-[0_2px_15px_rgba(0,0,0,0.01)] flex items-center gap-4 group hover:border-[#1E6B3A]/30 transition-all cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-[#EAF4EC] text-[#1E6B3A]">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[14px] md:text-[16px] font-bold text-[#0B2B26] group-hover:text-[#1E6B3A] transition-colors line-clamp-1">
                        {article.title}
                      </h3>
                      <p className="text-[12px] text-gray-500 mt-1 font-semibold tracking-wide uppercase text-[10px]">
                        By {article.author?.name || "Signet Team"}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </section>
        )}

      </div>
      
      {/* Footer */}
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}
