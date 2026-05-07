"use client";

import { useState, useMemo } from "react";
import { Search, ArrowUpRight, Clock, ChevronRight, Heart, Bookmark, Filter, TrendingUp, Sparkles, Flame } from "lucide-react";
import Link from "next/link";

// ── FILTER TABS ───────────────────────────────────────────────────
const FILTER_TABS = [
  { label: "All", value: "all", icon: Sparkles },
  { label: "Articles", value: "article", icon: TrendingUp },
  { label: "Books", value: "book", icon: null },
  { label: "Magazines", value: "magazine", icon: null },
  { label: "Design", value: "design", icon: null },
];

// ── ARTICLE CARD (Image-on-top style) ──────────────────────────────
const ArticleCard = ({ data, featured = false }: { data: any; featured?: boolean }) => {
  const resourceUrl = data.fileUrl || (data.slug?.current ? `/resources/${data.slug.current}` : "#");
  const date = data._createdAt
    ? new Date(data._createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "Recent";

  return (
    <a
      href={resourceUrl}
      target={data.fileUrl ? "_blank" : "_self"}
      className={`group block rounded-[1.5rem] overflow-hidden bg-white border border-black/[0.06] shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-500 ${
        featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${featured ? "aspect-[16/10]" : "aspect-[16/10]"}`}>
        {data.mainImageUrl ? (
          <img
            src={data.mainImageUrl}
            alt={data.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#163832]/5 to-[#163832]/10 flex items-center justify-center">
            <span className="text-[#163832]/20 text-xs font-black uppercase tracking-widest">Signet</span>
          </div>
        )}

        {/* Category badge */}
        {data.tag && (
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-[#163832] shadow-sm">
              {data.tag}
            </span>
          </div>
        )}

        {/* Hover actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-10">
          <button className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-center text-[#0D120E]/50 hover:text-red-500 transition-colors">
            <Heart size={14} />
          </button>
          <button className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-center text-[#0D120E]/50 hover:text-[#163832] transition-colors">
            <Bookmark size={14} />
          </button>
        </div>

        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className={`p-5 ${featured ? "md:p-8" : ""} space-y-3`}>
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#0D120E]/30">
          <Clock size={10} />
          <span>{date}</span>
        </div>

        <h3
          className={`font-bold text-[#0D120E] leading-snug group-hover:text-[#163832] transition-colors ${
            featured ? "text-xl md:text-2xl" : "text-[15px] md:text-base"
          }`}
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {data.title}
        </h3>

        {data.description && (
          <p className={`text-[#0D120E]/50 leading-relaxed font-medium ${featured ? "text-sm line-clamp-3" : "text-xs line-clamp-2"}`}>
            {data.description}
          </p>
        )}

        <div className="flex items-center gap-2 pt-2 text-[#163832]">
          <span className="text-[11px] font-black uppercase tracking-widest group-hover:tracking-[0.2em] transition-all">
            Read More
          </span>
          <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </a>
  );
};

// ── WRITE-UP INTERRUPT CARD ──────────────────────────────────────
const WriteUpCard = ({ data }: { data: any }) => {
  return (
    <div className="p-8 bg-gradient-to-br from-[#163832] to-[#0B2B26] rounded-[1.5rem] flex flex-col justify-between text-white md:col-span-2 min-h-[280px]">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-[#8EB69B] rounded-full" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Signet Write-up</span>
        </div>
        <h3
          className="text-2xl md:text-3xl font-bold leading-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {data.headline}
        </h3>
        <p className="text-[15px] text-white/50 leading-relaxed font-medium capitalize line-clamp-4">
          {data.body}
        </p>
      </div>

      <div className="mt-8 flex items-center justify-between">
        {data.ctaLabel ? (
          <Link
            href={data.ctaUrl || "#"}
            className="inline-flex items-center gap-2 text-[#8EB69B] font-black text-[11px] uppercase tracking-widest hover:text-white transition-colors"
          >
            {data.ctaLabel} <ChevronRight className="w-3 h-3" />
          </Link>
        ) : (
          <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Signet Exclusive</span>
        )}
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
          <Bookmark size={16} className="text-[#8EB69B]" />
        </div>
      </div>
    </div>
  );
};

// ── MAIN COMPONENT ────────────────────────────────────────────────
export default function ResourcesLibrary({ initialPosts, interrupts = [] }: { initialPosts: any[]; interrupts?: any[] }) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  // Merge interrupts into the feed
  const mergeInterrupts = (items: any[], activeInterrupts: any[]) => {
    let result = [...items].map((item) => ({ ...item, _isInterrupt: false }));
    const sorted = [...activeInterrupts].sort((a, b) => a.insertAfter - b.insertAfter);

    let offset = 0;
    sorted.forEach((interrupt) => {
      const position = Math.min(interrupt.insertAfter + offset, result.length);
      result.splice(position, 0, { ...interrupt, _isInterrupt: true });
      offset++;
    });
    return result;
  };

  // Filter by search + category tab
  const filteredPosts = useMemo(() => {
    let posts = initialPosts;

    if (search) {
      const s = search.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title?.toLowerCase().includes(s) ||
          p.tag?.toLowerCase().includes(s) ||
          p.description?.toLowerCase().includes(s)
      );
    }

    if (activeFilter !== "all") {
      posts = posts.filter((p) => p.tag?.toLowerCase() === activeFilter);
    }

    return posts;
  }, [search, activeFilter, initialPosts]);

  const feedItems = useMemo(() => {
    if (search || activeFilter !== "all") return filteredPosts.map((p) => ({ ...p, _isInterrupt: false }));
    return mergeInterrupts(filteredPosts, interrupts);
  }, [filteredPosts, interrupts, search, activeFilter]);

  // Hero featured items (first image from each category for the top grid)
  const heroItems = useMemo(() => {
    return initialPosts.filter((p) => p.mainImageUrl).slice(0, 4);
  }, [initialPosts]);

  return (
    <div className="min-h-screen bg-white text-[#0D120E]" style={{ fontFamily: "'Outfit', sans-serif" }}>
      
      {/* ── HERO IMAGE GRID ──────────────────────────────────────── */}
      {heroItems.length > 0 && !search && activeFilter === "all" && (
        <section className="relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1 h-[280px] md:h-[360px] overflow-hidden">
            {heroItems.map((item, i) => (
              <div key={item._id || i} className="relative overflow-hidden group">
                {item.mainImageUrl ? (
                  <img
                    src={item.mainImageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#163832]/10 to-[#163832]/20" />
                )}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            ))}
          </div>
          {/* Overlay gradient at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
        </section>
      )}

      {/* ── HEADER + SEARCH + FILTERS ────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-4">
        <div className="space-y-2 mb-8">
          <h1
            className="text-3xl md:text-5xl font-bold text-[#0D120E] tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Discover with Confidence
          </h1>
          <p className="text-[#0D120E]/40 text-sm md:text-base font-medium max-w-lg">
            Curated articles, books, and resources — all in one place.
          </p>
        </div>

        {/* Search */}
        <div className="relative group mb-8 max-w-2xl">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#163832]/30 group-focus-within:text-[#163832] transition-colors" />
          <input
            type="text"
            placeholder="Search the collection..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-13 pl-12 pr-6 bg-[#0B2B26]/[0.03] border border-transparent focus:border-[#163832]/20 rounded-2xl text-[13px] focus:outline-none focus:bg-white focus:shadow-xl focus:shadow-[#163832]/5 transition-all placeholder:text-[#163832]/30 font-medium"
          />
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          {FILTER_TABS.map((tab) => {
            const isActive = activeFilter === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${
                  isActive
                    ? "bg-[#163832] text-white shadow-lg shadow-[#163832]/20"
                    : "bg-[#0B2B26]/[0.04] text-[#0D120E]/50 hover:bg-[#0B2B26]/[0.08] hover:text-[#0D120E]"
                }`}
              >
                {tab.icon && <tab.icon size={12} />}
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* ── CONTENT GRID ─────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        {feedItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedItems.map((item, idx) =>
              item._isInterrupt ? (
                <WriteUpCard key={item._id || `int-${idx}`} data={item} />
              ) : (
                <ArticleCard
                  key={item._id || idx}
                  data={item}
                  featured={idx === 0 && !search && activeFilter === "all"}
                />
              )
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-full bg-[#163832]/5 flex items-center justify-center mb-6">
              <Search className="w-8 h-8 text-[#163832]/15" />
            </div>
            <h3 className="text-lg font-bold text-[#0D120E]/80">No results found</h3>
            <p className="text-sm text-[#0D120E]/40 mt-2">Try a different search or filter.</p>
          </div>
        )}
      </section>

      {/* ── BOTTOM SPACER ─────────────────────────────────────────── */}
      <div className="h-24" />
    </div>
  );
}
