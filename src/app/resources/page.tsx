import { sanityFetch } from "@/lib/sanity/client";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
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
  
  const insertZeroInterrupts = interrupts.filter(i => i.insertAfter === 0);
  insertZeroInterrupts.forEach(i => stream.push({ ...i, _streamType: 'interrupt' }));

  posts.forEach((post, index) => {
    stream.push({ ...post, _streamType: 'post' });
    const afterCount = index + 1;
    const items = interrupts.filter(i => i.insertAfter === afterCount);
    items.forEach(i => stream.push({ ...i, _streamType: 'interrupt' }));
  });
  
  const maxPostIndex = posts.length;
  const remainingInterrupts = interrupts.filter(i => i.insertAfter > maxPostIndex);
  remainingInterrupts.sort((a,b) => a.insertAfter - b.insertAfter).forEach(i => stream.push({ ...i, _streamType: 'interrupt' }));

  return stream;
}

const ResourceCard = ({ data }: { data: any }) => (
  <div 
    className="group flex flex-col justify-between bg-white/5 border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-[2px] h-full"
    style={{ borderLeft: `4px solid ${data.accentColor || '#1DA756'}` }}
  >
    <div className="flex justify-between items-start mb-6">
      {data.tag && (
        <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-white/70">
          {data.tag}
        </span>
      )}
      <div className="flex items-center gap-1.5 text-white/40 text-xs font-medium ml-auto">
         <Clock size={12} />
         <span>{data.readTime || '5 min read'}</span>
      </div>
    </div>
    
    <h3 className="text-2xl font-bold mb-3 tracking-tight group-hover:text-white text-white/90 transition-colors line-clamp-2">
      {data.title}
    </h3>
    <p className="text-sm font-medium text-white/50 leading-relaxed mb-8 line-clamp-3">
      {data.description}
    </p>
    
    {data.slug?.current && (
       <div className="mt-auto">
         <Link href={`/resources/${data.slug.current}`} className="text-sm font-bold tracking-wide uppercase flex items-center gap-2 group-hover:gap-3 transition-all" style={{ color: data.accentColor || '#D3F36B' }}>
            Read <ArrowRight size={14} />
         </Link>
       </div>
    )}
  </div>
);

const SpotlightInterrupt = ({ data }: { data: any }) => (
  <div className="col-span-full py-16 px-8 md:px-16 rounded-[2rem] border border-white/5 relative overflow-hidden my-4" style={{ backgroundColor: `${data.accentColor || '#1DA756'}15` }}>
    <div className="absolute top-0 right-0 w-[400px] h-[400px] blur-[120px] rounded-full mix-blend-screen -z-10 translate-x-1/4 -translate-y-1/4" style={{ backgroundColor: data.accentColor || '#1DA756' }}></div>
    
    <div className="max-w-2xl relative z-10">
      {data.label && (
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 block" style={{ color: data.accentColor || '#1DA756' }}>
           {data.label}
        </span>
      )}
      <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-white hover:opacity-90 transition-opacity">
        {data.headline}
      </h2>
      <p className="text-lg text-white/60 font-medium mb-8 leading-relaxed">
        {data.subtext}
      </p>
      {data.ctaLabel && data.ctaUrl && (
        <Link 
          href={data.ctaUrl}
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform"
        >
           {data.ctaLabel} <ArrowRight size={14} />
        </Link>
      )}
    </div>
  </div>
);

const BannerInterrupt = ({ data }: { data: any }) => (
  <div 
    className="col-span-full rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 my-4 relative overflow-hidden shadow-2xl" 
    style={{ background: `linear-gradient(135deg, ${data.accentColor || '#1DA756'}, #0D120E)` }}
  >
     <div className="max-w-xl relative">
        <h3 className="text-2xl md:text-4xl font-black text-white mb-2 tracking-tight">{data.headline}</h3>
        <p className="text-white/80 font-medium leading-relaxed">{data.subtext}</p>
     </div>
     {data.ctaLabel && data.ctaUrl && (
        <Link 
          href={data.ctaUrl}
          className="shrink-0 px-8 py-4 bg-white/10 hover:bg-white border border-white/20 hover:text-black hover:border-white rounded-full font-bold uppercase tracking-wider text-sm transition-all shadow-lg text-white backdrop-blur-md"
        >
           {data.ctaLabel}
        </Link>
     )}
  </div>
);

const ShelfInterrupt = ({ data }: { data: any }) => (
  <div className="col-span-full py-12 my-4 border-y border-white/5">
    {data.shelfLabel && (
      <div className="flex items-center gap-3 mb-8">
        <BookOpen className="text-white/40" size={20} />
        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/60">
           {data.shelfLabel}
        </h3>
      </div>
    )}
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      {data.tiles?.map((tile: any, idx: number) => (
        <a 
          key={idx} 
          href={tile.url || '#'} 
          className="flex items-center gap-4 bg-white/[0.02] border border-white/5 hover:border-white/20 p-5 rounded-2xl transition-all hover:-translate-y-1 hover:bg-white/[0.04]"
        >
          <div className="w-12 h-12 flex shrink-0 items-center justify-center bg-white/5 rounded-xl border border-white/10 text-2xl shadow-inner">
            {tile.emoji}
          </div>
          <div>
            <h4 className="font-bold text-white/90 text-sm tracking-tight">{tile.title}</h4>
            <p className="text-xs text-white/40 font-medium mt-0.5">{tile.subtitle}</p>
          </div>
        </a>
      ))}
    </div>
  </div>
);


export default async function FeedResourcesPage() {
  const posts = await sanityFetch({ query: POSTS_QUERY, tags: ['resource'] }) || [];
  const interrupts = await sanityFetch({ query: INTERRUPTS_QUERY, tags: ['feedInterrupt'] }) || [];

  const stream = buildStream(posts, interrupts);

  return (
    <div className="relative min-h-screen bg-[#0D120E] font-sans text-white pb-32 pt-32">
      {/* Page Header */}
      <div className="max-w-5xl mx-auto px-6 mb-16">
         <h1 className="text-5xl md:text-[6rem] font-black tracking-tighter text-white leading-none">
           Library &amp; <br/> <span className="text-white/30">Resources</span>
         </h1>
         <p className="text-xl text-white/50 mt-6 font-medium max-w-2xl leading-relaxed">
           A carefully paced stream of insights, books, deep dives, and tools designed to interrupt your feed with pure value.
         </p>
      </div>

      <div className="max-w-5xl mx-auto px-6">
         {stream.length === 0 ? (
           <div className="text-center py-32 text-white/40 border border-dashed border-white/10 rounded-3xl">
              No content published yet.
           </div>
         ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
             {stream.map((item, idx) => {
               if (item._streamType === 'post') {
                 return <ResourceCard key={`post-${item._id}-${idx}`} data={item} />;
               } else {
                 if (item.interruptType === 'spotlight') return <SpotlightInterrupt key={`int-${item._id}-${idx}`} data={item} />;
                 if (item.interruptType === 'banner') return <BannerInterrupt key={`int-${item._id}-${idx}`} data={item} />;
                 if (item.interruptType === 'shelf') return <ShelfInterrupt key={`int-${item._id}-${idx}`} data={item} />;
                 return null;
               }
             })}
           </div>
         )}
      </div>
    </div>
  )
}
