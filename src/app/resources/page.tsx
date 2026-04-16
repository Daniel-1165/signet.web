import { sanityFetch } from "@/lib/sanity/client";
import { GET_ALL_RESOURCES } from "@/lib/sanity/queries";
import Link from "next/link";
import { ArrowRight, BookOpen, Compass, Sparkles, Image as ImageIcon } from "lucide-react";

interface ResourceCard {
  _id: string;
  title: string;
  category: string;
  description: string;
  image?: {
    asset?: {
      _id: string;
      url: string;
    };
  };
  color?: string;
  iconName?: string;
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
  { id: "Books", title: "Essential Reads", icon: BookOpen, desc: "Fundamental knowledge and deep learning" },
  { id: "Articles", title: "Curated Articles", icon: Compass, desc: "Bite-sized insights and mental models" },
  { id: "Magazines", title: "Periodicals", icon: Sparkles, desc: "In-depth issues on growth and systems" },
  { id: "Designs", title: "Visual Architecture", icon: ImageIcon, desc: "Blueprints and aesthetic inspiration" },
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
    <div className="relative min-h-screen bg-[#FDFDFD] font-sans selection:bg-accent/20">
      <main className="pt-8 pb-24 px-6 md:px-12 max-w-[1600px] mx-auto">
        
        {/* Dynamic Hero Area inspired by ExploreEase */}
        <div className="bg-[#F4F6F0] rounded-[2.5rem] p-8 md:p-16 mb-20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-black/[0.03]">
          {/* Subtle background decoration */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/10 blur-3xl rounded-full mix-blend-multiply" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-100/50 blur-3xl rounded-full mix-blend-multiply" />
          
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-black/5 shadow-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-bold text-foreground">Signet Library</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-foreground leading-[1.1] mb-6">
              Curated assets for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-600">
                your evolution.
              </span>
            </h1>
            <p className="text-lg text-foreground/60 leading-relaxed max-w-xl font-medium">
              Dive into our handpicked collection of books, articles, and design resources. Build your mental models and accelerate your journey to excellence.
            </p>
          </div>

          <div className="relative z-10 hidden lg:block w-72 h-72">
            {/* Abstract decorative element representing the library structure */}
            <div className="absolute inset-0 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-black/5 transform rotate-3 flex items-center justify-center overflow-hidden">
               <div className="grid grid-cols-2 gap-3 w-full h-full p-6">
                 <div className="bg-accent/10 rounded-xl w-full h-full" />
                 <div className="bg-[#0055FF]/5 rounded-xl w-full h-4/5 mt-auto" />
                 <div className="bg-black/5 rounded-xl w-full h-3/4" />
                 <div className="bg-orange-500/10 rounded-xl w-full h-full" />
               </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white px-5 py-3 rounded-2xl shadow-xl border border-black/5 transform -rotate-6">
               <p className="font-bold text-sm text-foreground">Explore Deep Work ↗</p>
            </div>
          </div>
        </div>

        {/* Resources Content */}
        <div className="space-y-20">
          {categories.map((category) => {
            const items = resourcesByCategory[category.id] || [];
            
            return (
              <section key={category.id} className="scroll-mt-32" id={category.id.toLowerCase()}>
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                       <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                          <category.icon size={20} strokeWidth={2.5} />
                       </div>
                       <h2 className="text-3xl font-extrabold text-foreground tracking-tight">
                         {category.title}
                       </h2>
                    </div>
                    <p className="text-foreground/50 font-medium pl-14">
                      {category.desc}
                    </p>
                  </div>
                  {items.length > 0 && (
                    <button className="text-sm font-bold text-accent hover:text-accent/80 transition-colors flex items-center gap-1">
                      View all <ArrowRight size={16} />
                    </button>
                  )}
                </div>

                {/* Library Grid Layout */}
                {items.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-10">
                    {items.map((resource) => (
                      <div key={resource._id} className="group cursor-pointer flex flex-col h-full">
                        {/* Book/Resource Cover */}
                        <div className="relative w-full aspect-[2/3] rounded-2xl overflow-hidden bg-[#F3F4F1] border border-black/[0.04] shadow-sm transform transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
                          {resource.image?.asset?.url ? (
                            <img
                              src={resource.image.asset.url}
                              alt={resource.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              loading="lazy"
                            />
                          ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                              <category.icon size={32} className="text-black/10 mb-3" />
                              <span className="text-xs font-bold text-black/20 uppercase tracking-widest">{category.id}</span>
                            </div>
                          )}
                          
                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                             <div className="bg-white text-black text-xs font-bold px-4 py-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
                               View Resource
                             </div>
                          </div>
                        </div>

                        {/* Resource Info */}
                        <div className="mt-4 flex-1 flex flex-col">
                          <h3 className="font-extrabold text-[15px] leading-snug text-foreground line-clamp-2 group-hover:text-accent transition-colors">
                            {resource.title}
                          </h3>
                          <p className="text-xs font-semibold text-foreground/40 mt-1 uppercase tracking-wider">
                            {resource.category}
                          </p>
                          {resource.description && (
                            <p className="text-sm text-foreground/60 mt-2 line-clamp-2 leading-relaxed">
                              {resource.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Empty State optimized for the "Wait to upload via Studio" requirement */
                  <div className="w-full rounded-3xl border border-dashed border-black/10 bg-black/[0.01] p-12 text-center flex flex-col items-center justify-center">
                     <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-black/5 flex items-center justify-center mb-4">
                        <category.icon size={24} className="text-black/20" />
                     </div>
                     <h3 className="text-lg font-bold text-foreground/50 mb-1">No {category.id.toLowerCase()} curated yet</h3>
                     <p className="text-sm font-medium text-foreground/40 max-w-sm">
                       Head over to your Sanity Studio at <code className="bg-black/5 px-1.5 py-0.5 rounded text-xs">/studio</code> to upload elements for this section.
                     </p>
                  </div>
                )}
              </section>
            );
          })}
        </div>

        {/* Global CTA */}
        <div className="mt-40 bg-foreground text-white rounded-[2.5rem] p-12 flex flex-col items-center text-center relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-accent/20 rounded-full blur-[100px] opacity-30 pointer-events-none" />
           <h2 className="text-4xl font-black mb-4 relative z-10">Cultivate Your Mind.</h2>
           <p className="text-white/60 font-medium max-w-lg mb-8 relative z-10">
             Transform information into implementation. Join the network to discuss insights and frameworks with top-tier operators.
           </p>
           <Link
             href="/community"
             className="relative z-10 flex items-center gap-2 px-8 py-4 bg-white text-black font-extrabold rounded-full hover:scale-105 transition-transform"
           >
             Enter the Network <ArrowRight size={18} />
           </Link>
        </div>

      </main>
    </div>
  );
}
