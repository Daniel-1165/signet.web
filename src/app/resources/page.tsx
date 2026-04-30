import { sanityFetch } from "@/lib/sanity/client";
import { Search, Star, Bookmark, PlayCircle, Clock, ChevronRight, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const POSTS_QUERY = `
  *[_type == "resourceCard"] | order(_createdAt desc) {
    _id, 
    title, 
    "tag": category, 
    "description": content, 
    _createdAt, 
    slug, 
    _type,
    "mainImageUrl": thumbnail.asset->url
  }
`;

// Helper component for book cards
const BookCard = ({ data, isFeatured = false }: { data: any, isFeatured?: boolean }) => {
  // Mock author and rating based on title
  const mockAuthor = "Signet Curated";
  const mockRating = (4.2 + (Math.random() * 0.7)).toFixed(1);

  return (
    <Link href={data.slug?.current ? `/resources/${data.slug.current}` : "#"} className="group flex flex-col gap-3">
      {/* Book Cover */}
      <div className={`relative rounded-2xl overflow-hidden bg-[#F3F2EE] shadow-sm border border-black/[0.02] transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-1.5 ${isFeatured ? "aspect-[4/5]" : "aspect-[2/3]"}`}>
        {data.mainImageUrl ? (
          <img 
            src={data.mainImageUrl} 
            alt={data.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1DA756]/10 to-[#1DA756]/5 flex flex-col items-center justify-center p-4 text-center">
            <span className="font-black text-[#1DA756]/80 text-3xl uppercase tracking-tighter">{data.title.substring(0, 2)}</span>
          </div>
        )}
        
        {/* Hover overlay with action */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
          <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:scale-110">
            <Bookmark className="w-4 h-4" />
          </div>
          <div className="w-10 h-10 rounded-full bg-[#1DA756] text-white flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 hover:scale-110">
            <PlayCircle className="w-4 h-4" />
          </div>
        </div>

        {/* Tag badge */}
        {data.tag && (
          <div className="absolute top-3 left-3 px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-lg text-[9px] font-black uppercase tracking-widest text-[#0D120E] shadow-sm">
            {data.tag}
          </div>
        )}
      </div>

      {/* Book Info */}
      <div className="flex flex-col gap-1.5 px-0.5">
        <h3 className="font-extrabold text-[#0D120E] text-base leading-snug line-clamp-2 group-hover:text-[#1DA756] transition-colors">
          {data.title}
        </h3>
        <p className="text-xs text-[#0D120E]/50 font-bold capitalize">
          {mockAuthor}
        </p>
        
        {/* Rating & Pages */}
        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center bg-[#FFF8E7] px-2 py-0.5 rounded text-[#F5B041]">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-[10px] font-black text-[#D08B16] ml-1.5">{mockRating}</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-black/10" />
          <span className="text-[10px] font-bold text-[#0D120E]/40 uppercase tracking-wider">Premium</span>
        </div>
      </div>
    </Link>
  );
}

export const dynamic = "force-dynamic";

export default async function ResourcesPage() {
  const posts = (await sanityFetch({ query: POSTS_QUERY, tags: ["resourceCard"] })) || [];

  const featuredBook = posts[0];
  const recentlyAdded = posts.slice(0, 5);
  const recommendedForYou = posts.length > 5 ? posts.slice(5) : posts;

  return (
    <div className="min-h-screen bg-[#FDFDFC] pb-32">

      {/* ── TOP SEARCH & FILTER BAR ── */}
      <div className="sticky top-0 z-[40] bg-[#FDFDFC]/80 backdrop-blur-xl border-b border-black/[0.04] px-6 py-4 md:py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          <h1 className="hidden md:block text-2xl font-black tracking-tight text-[#0D120E]">
            Library.
          </h1>
          <div className="flex-1 flex items-center gap-3 w-full max-w-2xl">
            <div className="relative w-full">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0D120E]/30" />
              <input 
                type="text"
                placeholder="Search Book, Author, or ISBN..."
                className="w-full h-14 pl-14 pr-6 bg-[#F5F4F0] rounded-2xl border-none focus:outline-none focus:ring-2 focus:ring-[#1DA756]/20 font-bold text-sm transition-all placeholder:text-[#0D120E]/30"
              />
            </div>
            <button className="w-14 h-14 shrink-0 flex items-center justify-center bg-[#F5F4F0] rounded-2xl text-[#0D120E]/70 hover:bg-[#1DA756] hover:text-white transition-colors">
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <main className="max-w-7xl mx-auto px-6 py-10 space-y-16">

        {/* FEATURED PICK HERO */}
        {featuredBook && (
          <section className="relative">
            <div className="flex items-center mb-6 gap-3">
              <span className="w-2 h-2 rounded-full bg-[#D0652B] animate-pulse"></span>
              <h2 className="text-[#0D120E]/60 font-black uppercase text-[10px] tracking-[0.2em]">Popular This Week</h2>
            </div>
            
            <Link 
              href={featuredBook.slug?.current ? `/resources/${featuredBook.slug.current}` : "#"} 
              className="block bg-gradient-to-br from-[#FFF5ED] to-[#FDF0E6] rounded-[2rem] p-8 md:p-12 relative overflow-hidden group shadow-sm border border-[#D0652B]/5"
            >
              <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center md:items-start">
                
                {/* Info Side */}
                <div className="flex-1 space-y-6 text-center md:text-left pt-2 md:pt-6">
                  <div>
                    <h1 className="text-4xl md:text-[3.5rem] font-black text-[#0D120E] leading-[1.1] mb-4">
                      {featuredBook.title}
                    </h1>
                    <p className="text-lg font-bold text-[#D0652B]">Morgan Housel <span className="text-[#0D120E]/30 font-medium">(2020)</span></p>
                  </div>
                  
                  <p className="text-[#0D120E]/60 font-medium leading-relaxed max-w-md mx-auto md:mx-0 line-clamp-3">
                    {featuredBook.description || "Timeless lessons on wealth, greed, and happiness doing well with money isn't necessarily about what you know. It's about how you behave."}
                  </p>
                  
                  <div className="flex items-center justify-center md:justify-start gap-3 mt-4">
                    <button className="h-12 flex items-center justify-center px-8 bg-[#0D120E] text-white rounded-xl font-bold text-sm hover:bg-[#1DA756] hover:-translate-y-1 transition-all shadow-xl shadow-black/10">
                      Read Now
                    </button>
                    <button className="h-12 w-12 flex items-center justify-center bg-white text-[#0D120E] rounded-xl font-bold border border-black/[0.05] hover:bg-black/[0.02] transition-colors">
                      <Bookmark className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Cover Hero Image Float */}
                <div className="w-56 md:w-72 shrink-0 relative transition-transform duration-700 ease-out group-hover:-translate-y-4 group-hover:scale-105 group-hover:rotate-2">
                  <div className="aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl shadow-black/20 relative z-20">
                    {featuredBook.mainImageUrl ? (
                      <img src={featuredBook.mainImageUrl} alt="Featured" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-[#1DA756] flex flex-col items-center justify-center p-6 text-center">
                         <span className="font-black text-white text-3xl uppercase">{featuredBook.title.split(' ')[0]}</span>
                      </div>
                    )}
                    {/* Glossy overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-50 z-10 pointer-events-none" />
                  </div>
                  
                  {/* Backdrop shadow/reflection */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-12 bg-black/30 blur-2xl rounded-full z-0" />
                </div>
              </div>

              {/* Decorative Background Elements */}
              <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-white/40 rounded-full blur-[80px] pointer-events-none"></div>
              <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-[#D0652B]/5 rounded-full blur-[80px] pointer-events-none"></div>
            </Link>
          </section>
        )}

        {/* ── CATEGORIES TAB BAR ── */}
        <section>
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-4 pt-2 -mx-6 px-6 md:mx-0 md:px-0">
            {["All Genre", "Comedy", "Fiction", "Romance", "Biography", "Business"].map((genre, idx) => (
              <button 
                key={genre} 
                className={`h-12 px-8 rounded-2xl text-sm font-bold whitespace-nowrap transition-all ${
                  idx === 0 
                  ? "bg-[#0D120E] text-white shadow-xl shadow-black/10" 
                  : "bg-white text-[#0D120E] border border-black/[0.04] hover:bg-[#1DA756] hover:text-white hover:border-transparent hover:shadow-xl hover:shadow-[#1DA756]/20"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </section>

        {/* ── CONTINUE READING / RECENTLY ADDED ── */}
        {recentlyAdded.length > 0 ? (
          <section>
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl font-black text-[#0D120E]">Recently Added</h2>
                <p className="text-[#0D120E]/50 font-bold text-sm mt-1">Discover new arrivals</p>
              </div>
              <Link href="#" className="hidden md:flex items-center gap-1 text-sm font-bold text-[#1DA756] hover:text-[#0D120E] transition-colors">
                SEE ALL <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10">
              {recentlyAdded.map(post => (
                <BookCard key={post._id} data={post} />
              ))}
            </div>
          </section>
        ) : (
          <div className="text-center py-20">
             <h2 className="text-2xl font-black text-[#0D120E]/30 uppercase">No resources yet.</h2>
          </div>
        )}

        {/* ── RECOMMENDED FOR YOU ── */}
        {(recommendedForYou.length > 0 || posts.length > 0) && (
          <section className="pt-8 border-t border-black/[0.04]">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl font-black text-[#0D120E]">Recommended For You</h2>
                <p className="text-[#0D120E]/50 font-bold text-sm mt-1">Based on your interests</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10">
              {(recommendedForYou.length > 0 ? recommendedForYou : posts).map(post => (
                <BookCard key={post._id} data={post} />
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  );
}
