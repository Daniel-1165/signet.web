import { sanityFetch } from "@/lib/sanity/client";
import { GET_ALL_RESOURCES } from "@/lib/sanity/queries";
import Link from "next/link";
import { ArrowRight, BookOpen, Compass, Sparkles, Image as ImageIcon, FileText, Download } from "lucide-react";

interface ResourceCard {
  _id: string;
  title: string;
  category: string;
  thumbnail?: {
    asset?: {
      _id: string;
      url: string;
    };
  };
  resourceFile?: {
    asset?: {
      _id: string;
      url: string;
      extension: string;
    };
  };
  content?: string;
}

async function getResources(): Promise<ResourceCard[]> {
  try {
    const resources = await sanityFetch({
      query: GET_ALL_RESOURCES,
      tags: ["resourceCard"],
    });
    return resources || [];
  } catch (err) {
    console.error("Failed to load resources:", err);
    return [];
  }
}

const categories = [
  { id: "Book", title: "Essential Books", icon: BookOpen, desc: "Fundamental knowledge and deep learning" },
  { id: "Design", title: "Visual Designs", icon: ImageIcon, desc: "Blueprints, UX/UI, and aesthetic inspirations" },
  { id: "Magazine", title: "Magazines & Serials", icon: Sparkles, desc: "In-depth issues on growth and systems" },
  { id: "Article", title: "Curated Articles", icon: FileText, desc: "Bite-sized insights and mental models" },
];

export default async function ResourcesPage() {
  const resources = await getResources();

  // Group resources by category
  const resourcesByCategory = categories.reduce(
    (acc, cat) => {
      acc[cat.id] = resources.filter(
        (r) => r.category?.toLowerCase() === cat.id.toLowerCase()
      );
      return acc;
    },
    {} as Record<string, ResourceCard[]>
  );

  return (
    <div className="relative min-h-screen bg-[#0D120E] font-sans selection:bg-[#1DA756]/20 text-white">
      <main className="pt-8 pb-32 pl-6 md:pl-12 max-w-[1800px] mx-auto pr-0">
        
        {/* Dynamic Hero Area */}
        <div className="bg-[#1DA756]/10 rounded-l-[3rem] p-8 md:p-16 mb-20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between border-y border-l border-[#1DA756]/20">
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#1DA756]/20 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl pr-6 md:pr-12">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6 text-white">
              The Signet <br />
              <span className="text-[#D3F36B]">Resource Library.</span>
            </h1>
            <p className="text-lg text-white/60 leading-relaxed font-medium">
              Dive into our handpicked collection of books, articles, magazines, and design resources. Build your mental models and accelerate your journey to excellence.
            </p>
          </div>
        </div>

        {/* Resources Content - Horizontal Scrolling */}
        <div className="space-y-24">
          {categories.map((category) => {
            const items = resourcesByCategory[category.id] || [];
            
            return (
              <section key={category.id} className="scroll-mt-32" id={category.id.toLowerCase()}>
                <div className="flex items-center justify-between mb-8 pr-6 md:pr-12">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D3F36B] shadow-inner">
                        <category.icon size={24} strokeWidth={2.5} />
                     </div>
                     <div>
                       <h2 className="text-3xl font-extrabold tracking-tight">
                         {category.title}
                       </h2>
                       <p className="text-white/40 text-sm font-medium mt-1">
                         {category.desc}
                       </p>
                     </div>
                  </div>
                  <div className="hidden sm:flex gap-2">
                     <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40"><ArrowRight className="rotate-180" size={16}/></div>
                     <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white"><ArrowRight size={16}/></div>
                  </div>
                </div>

                {/* Horizontal Scroll Container */}
                <div className="flex overflow-x-auto gap-6 pb-8 pt-2 no-scrollbar snap-x snap-mandatory pr-6 md:pr-12">
                  {items.length > 0 ? (
                    items.map((resource) => (
                      <div key={resource._id} className="group shrink-0 w-[280px] md:w-[340px] snap-start flex flex-col h-full bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden hover:bg-white/[0.04] transition-colors relative">
                        {/* Thumbnail */}
                        <div className="relative w-full aspect-[4/3] overflow-hidden bg-black/20">
                          {resource.thumbnail?.asset?.url ? (
                            <img
                              src={resource.thumbnail.asset.url}
                              alt={resource.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              loading="lazy"
                            />
                          ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center opacity-30">
                              <category.icon size={40} className="mb-3" />
                            </div>
                          )}
                          
                          {/* File Type Badge Overlay */}
                          {resource.resourceFile?.asset?.extension && (
                             <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
                               <Download size={12} className="text-[#D3F36B]" />
                               <span className="text-[10px] font-bold tracking-widest uppercase">{resource.resourceFile.asset.extension}</span>
                             </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="font-extrabold text-lg leading-snug line-clamp-2 group-hover:text-[#D3F36B] transition-colors">
                            {resource.title}
                          </h3>
                          {resource.content && (
                            <p className="text-sm text-white/50 mt-3 line-clamp-3 leading-relaxed">
                              {resource.content}
                            </p>
                          )}
                          
                          {/* Access Button / Link */}
                          <div className="mt-6 pt-4 border-t border-white/5 w-full flex items-center justify-between">
                             <span className="text-xs font-bold uppercase tracking-wider text-white/30">{category.id}</span>
                             <Link 
                               href={resource.resourceFile?.asset?.url || "#"} 
                               target={resource.resourceFile ? "_blank" : "_self"}
                               className="w-8 h-8 rounded-full bg-[#1DA756]/20 text-[#1DA756] flex items-center justify-center group-hover:bg-[#1DA756] group-hover:text-white transition-colors"
                             >
                                <ArrowRight size={14} className="-rotate-45" />
                             </Link>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    /* Empty State horizontally aligned */
                    <div className="shrink-0 w-[400px] snap-start rounded-3xl border border-dashed border-white/10 bg-white/[0.01] p-10 flex flex-col items-center justify-center text-center">
                       <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                          <category.icon size={24} className="text-white/20" />
                       </div>
                       <h3 className="text-lg font-bold text-white/50 mb-1">No {category.id.toLowerCase()}s uploaded</h3>
                       <p className="text-sm font-medium text-white/30 max-w-[250px]">
                         Upload via Sanity Studio to populate this shelf.
                       </p>
                    </div>
                  )}
                </div>
              </section>
            );
          })}
        </div>
      </main>

      {/* Global CSS for hiding scrollbar but maintaining swipe */}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
