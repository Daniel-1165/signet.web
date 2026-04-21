import { sanityFetch } from "@/lib/sanity/client";
import { ArrowRight, BookOpen, Clock, Search, Sparkles, TrendingUp, Star } from "lucide-react";
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
  const insertZeroInterrupts = interrupts.filter((i) => i.insertAfter === 0);
  insertZeroInterrupts.forEach((i) =>
    stream.push({ ...i, _streamType: "interrupt" })
  );
  posts.forEach((post, index) => {
    stream.push({ ...post, _streamType: "post" });
    const afterCount = index + 1;
    const items = interrupts.filter((i) => i.insertAfter === afterCount);
    items.forEach((i) => stream.push({ ...i, _streamType: "interrupt" }));
  });
  const maxPostIndex = posts.length;
  const remainingInterrupts = interrupts.filter(
    (i) => i.insertAfter > maxPostIndex
  );
  remainingInterrupts
    .sort((a, b) => a.insertAfter - b.insertAfter)
    .forEach((i) => stream.push({ ...i, _streamType: "interrupt" }));
  return stream;
}

// Color palette for tags
const TAG_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  Book: { bg: "bg-amber-100", text: "text-amber-700", dot: "bg-amber-500" },
  Article: { bg: "bg-sky-100", text: "text-sky-700", dot: "bg-sky-500" },
  Tool: { bg: "bg-violet-100", text: "text-violet-700", dot: "bg-violet-500" },
  Guide: { bg: "bg-emerald-100", text: "text-emerald-700", dot: "bg-emerald-500" },
  Video: { bg: "bg-rose-100", text: "text-rose-700", dot: "bg-rose-500" },
  Course: { bg: "bg-orange-100", text: "text-orange-700", dot: "bg-orange-500" },
  default: { bg: "bg-[#1DA756]/10", text: "text-[#1DA756]", dot: "bg-[#1DA756]" },
};

function getTagStyle(tag: string) {
  return TAG_COLORS[tag] || TAG_COLORS.default;
}

// ── Resource Card ──────────────────────────────────────────────────
const ResourceCard = ({ data, featured = false }: { data: any; featured?: boolean }) => {
  const tagStyle = getTagStyle(data.tag);
  const accent = data.accentColor || "#1DA756";

  if (featured) {
    return (
      <Link
        href={data.slug?.current ? `/resources/${data.slug.current}` : "#"}
        className="group col-span-full relative flex flex-col md:flex-row gap-6 bg-white rounded-3xl p-7 border border-black/[0.06] hover:border-black/[0.12] shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
      >
        {/* Accent stripe */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1 rounded-l-3xl"
          style={{ backgroundColor: accent }}
        />

        {/* Cover Art placeholder */}
        <div
          className="w-full md:w-[120px] h-[160px] md:h-[160px] flex-shrink-0 rounded-2xl flex items-center justify-center text-4xl font-black text-white shadow-md"
          style={{ background: `linear-gradient(135deg, ${accent}, ${accent}99)` }}
        >
          {data.title?.charAt(0) || "R"}
        </div>

        <div className="flex flex-col justify-between flex-1 min-w-0 py-1">
          <div>
            {data.tag && (
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-3 ${tagStyle.bg} ${tagStyle.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${tagStyle.dot}`} />
                {data.tag}
              </span>
            )}
            <h3 className="text-xl md:text-2xl font-black text-[#0D120E] tracking-tight leading-snug group-hover:text-[#1DA756] transition-colors mb-2">
              {data.title}
            </h3>
            <p className="text-sm text-[#0D120E]/50 leading-relaxed line-clamp-2">
              {data.description}
            </p>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <span className="flex items-center gap-1.5 text-[11px] text-[#0D120E]/40 font-medium">
              <Clock size={11} />
              {data.readTime || "5 min read"}
            </span>
            <span className="flex items-center gap-1 text-[11px] font-bold text-[#1DA756] group-hover:gap-2 transition-all">
              Read now <ArrowRight size={11} />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={data.slug?.current ? `/resources/${data.slug.current}` : "#"}
      className="group flex flex-col bg-white rounded-3xl border border-black/[0.06] hover:border-black/[0.12] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden hover:-translate-y-[2px]"
    >
      {/* Cover */}
      <div
        className="w-full h-[120px] flex items-center justify-center text-5xl font-black text-white/80 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${accent}dd, ${accent}66)` }}
      >
        <span className="text-5xl font-black text-white/90">
          {data.title?.charAt(0) || "R"}
        </span>
        {/* Decorative circle */}
        <div
          className="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-20"
          style={{ backgroundColor: "white" }}
        />
      </div>

      <div className="p-5 flex flex-col flex-1">
        {data.tag && (
          <span className={`inline-flex items-center gap-1.5 self-start px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3 ${tagStyle.bg} ${tagStyle.text}`}>
            <span className={`w-1 h-1 rounded-full ${tagStyle.dot}`} />
            {data.tag}
          </span>
        )}

        <h3 className="text-[15px] font-black text-[#0D120E] tracking-tight leading-snug group-hover:text-[#1DA756] transition-colors mb-1.5 line-clamp-2">
          {data.title}
        </h3>
        <p className="text-[12px] text-[#0D120E]/45 leading-relaxed line-clamp-2 mb-4 flex-1">
          {data.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-black/[0.05]">
          <span className="flex items-center gap-1 text-[11px] text-[#0D120E]/35 font-medium">
            <Clock size={10} />
            {data.readTime || "5 min"}
          </span>
          <span className="flex items-center gap-0.5 text-[11px] font-bold text-[#1DA756] group-hover:gap-1.5 transition-all">
            Read <ArrowRight size={10} />
          </span>
        </div>
      </div>
    </Link>
  );
};

// ── Spotlight Interrupt ────────────────────────────────────────────
const SpotlightInterrupt = ({ data }: { data: any }) => (
  <div
    className="col-span-full relative rounded-3xl p-8 md:p-12 overflow-hidden my-2"
    style={{ backgroundColor: `${data.accentColor || "#1DA756"}12` }}
  >
    <div
      className="absolute top-0 right-0 w-[300px] h-[300px] blur-[100px] rounded-full opacity-30 -z-0 translate-x-1/4 -translate-y-1/4"
      style={{ backgroundColor: data.accentColor || "#1DA756" }}
    />
    <div className="relative z-10 max-w-2xl">
      {data.label && (
        <span
          className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3 block"
          style={{ color: data.accentColor || "#1DA756" }}
        >
          {data.label}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#0D120E] mb-3">
        {data.headline}
      </h2>
      <p className="text-base text-[#0D120E]/55 font-medium mb-7 leading-relaxed">
        {data.subtext}
      </p>
      {data.ctaLabel && data.ctaUrl && (
        <Link
          href={data.ctaUrl}
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white tracking-wide hover:scale-[1.03] transition-transform shadow-md"
          style={{ backgroundColor: data.accentColor || "#1DA756" }}
        >
          {data.ctaLabel} <ArrowRight size={14} />
        </Link>
      )}
    </div>
  </div>
);

// ── Banner Interrupt ───────────────────────────────────────────────
const BannerInterrupt = ({ data }: { data: any }) => (
  <div
    className="col-span-full rounded-3xl p-7 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 my-2 relative overflow-hidden shadow-lg"
    style={{
      background: `linear-gradient(135deg, ${data.accentColor || "#1DA756"}, ${data.accentColor || "#1DA756"}88)`,
    }}
  >
    <div className="absolute right-0 top-0 w-[200px] h-[200px] rounded-full bg-white/10 blur-2xl translate-x-1/3 -translate-y-1/3" />
    <div className="max-w-xl relative z-10">
      <h3 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">
        {data.headline}
      </h3>
      <p className="text-white/80 font-medium leading-relaxed text-sm">
        {data.subtext}
      </p>
    </div>
    {data.ctaLabel && data.ctaUrl && (
      <Link
        href={data.ctaUrl}
        className="shrink-0 px-7 py-3.5 bg-white text-[#0D120E] rounded-full font-bold text-sm hover:shadow-xl transition-all shadow-md"
      >
        {data.ctaLabel}
      </Link>
    )}
  </div>
);

// ── Shelf Interrupt ────────────────────────────────────────────────
const ShelfInterrupt = ({ data }: { data: any }) => (
  <div className="col-span-full py-8 my-2">
    {data.shelfLabel && (
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-full bg-[#1DA756]/10 flex items-center justify-center">
          <BookOpen className="text-[#1DA756]" size={16} />
        </div>
        <h3 className="text-sm font-black uppercase tracking-[0.15em] text-[#0D120E]">
          {data.shelfLabel}
        </h3>
        <div className="flex-1 h-px bg-black/[0.06]" />
      </div>
    )}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {data.tiles?.map((tile: any, idx: number) => (
        <a
          key={idx}
          href={tile.url || "#"}
          className="flex items-center gap-4 bg-white border border-black/[0.06] hover:border-[#1DA756]/30 p-5 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-md group"
        >
          <div className="w-12 h-12 flex shrink-0 items-center justify-center bg-[#F7F6F0] rounded-2xl border border-black/[0.06] text-2xl">
            {tile.emoji}
          </div>
          <div>
            <h4 className="font-black text-[#0D120E] text-sm tracking-tight group-hover:text-[#1DA756] transition-colors">
              {tile.title}
            </h4>
            <p className="text-[12px] text-[#0D120E]/40 font-medium mt-0.5">
              {tile.subtitle}
            </p>
          </div>
        </a>
      ))}
    </div>
  </div>
);

// ── Empty State ────────────────────────────────────────────────────
const EmptyState = () => (
  <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
    <div className="w-20 h-20 rounded-full bg-[#1DA756]/10 flex items-center justify-center mb-5">
      <BookOpen className="text-[#1DA756]" size={32} />
    </div>
    <h3 className="text-xl font-black text-[#0D120E] mb-2">Library Coming Soon</h3>
    <p className="text-sm text-[#0D120E]/45 max-w-xs">
      We're curating premium resources for you. Check back soon.
    </p>
  </div>
);

// ── Page ──────────────────────────────────────────────────────────
export default async function FeedResourcesPage() {
  const posts =
    (await sanityFetch({ query: POSTS_QUERY, tags: ["resource"] })) || [];
  const interrupts =
    (await sanityFetch({
      query: INTERRUPTS_QUERY,
      tags: ["feedInterrupt"],
    })) || [];

  const stream = buildStream(posts, interrupts);
  const categories = ["All", "Book", "Article", "Guide", "Tool", "Video", "Course"];

  return (
    <div className="relative min-h-screen bg-[#F7F6F0] font-sans pb-32">
      {/* ── Hero Header ─────────────────────────────────────────── */}
      <div className="bg-white border-b border-black/[0.06] pt-[76px] md:pt-10 md:pl-[72px] pb-8">
        <div className="max-w-5xl mx-auto px-6">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={14} className="text-[#1DA756]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1DA756]">
              Curated Library
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-[#0D120E] leading-[0.95] mb-4">
            Resources &{" "}
            <span className="text-[#1DA756]">Reading List</span>
          </h1>
          <p className="text-base text-[#0D120E]/50 font-medium max-w-xl leading-relaxed">
            Hand-picked books, articles, tools and deep-dives — everything you
            need to grow, lead, and think differently.
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-6 mt-6">
            <div className="flex items-center gap-1.5">
              <TrendingUp size={14} className="text-[#1DA756]" />
              <span className="text-xs font-bold text-[#0D120E]/60">
                {posts.length} Resources
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star size={14} className="text-amber-500" />
              <span className="text-xs font-bold text-[#0D120E]/60">
                Editor's Picks
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Category Chips ──────────────────────────────────────── */}
      <div className="sticky top-[60px] md:top-0 z-30 bg-white/90 backdrop-blur-md border-b border-black/[0.05] md:pl-[72px]">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat, i) => {
            const style = i === 0 ? getTagStyle("Guide") : getTagStyle(cat);
            return (
              <button
                key={cat}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-[12px] font-bold tracking-wide transition-all ${
                  i === 0
                    ? "bg-[#0D120E] text-white shadow-sm"
                    : `${style.bg} ${style.text} hover:shadow-sm`
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Main Content ────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 pt-8 md:pl-[calc(72px+24px)]">
        {stream.length === 0 ? (
          <div className="grid grid-cols-1">
            <EmptyState />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 items-start">
            {stream.map((item, idx) => {
              if (item._streamType === "post") {
                // First post is featured (full-width)
                const isFeatured = idx === 0;
                return (
                  <ResourceCard
                    key={`post-${item._id}-${idx}`}
                    data={item}
                    featured={isFeatured}
                  />
                );
              } else {
                if (item.interruptType === "spotlight")
                  return (
                    <SpotlightInterrupt
                      key={`int-${item._id}-${idx}`}
                      data={item}
                    />
                  );
                if (item.interruptType === "banner")
                  return (
                    <BannerInterrupt
                      key={`int-${item._id}-${idx}`}
                      data={item}
                    />
                  );
                if (item.interruptType === "shelf")
                  return (
                    <ShelfInterrupt
                      key={`int-${item._id}-${idx}`}
                      data={item}
                    />
                  );
                return null;
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
}
