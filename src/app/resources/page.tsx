import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { sanityFetch } from "@/lib/sanity/client";
import { GET_ALL_RESOURCES } from "@/lib/sanity/queries";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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

const GET_RESOURCES = `*[_type == "resourceCard"] | order(_createdAt desc)`;

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

const categories = ["Magazines", "Books", "Articles", "Designs"];
const categoryIcons = {
  Magazines: "📖",
  Books: "📚",
  Articles: "📄",
  Designs: "🎨",
};

const categoryDescriptions = {
  Magazines:
    "In-depth digital magazines covering insights, trends, and analysis",
  Books: "Comprehensive guides and knowledge resources for deep learning",
  Articles: "Curated articles on personal development and growth strategies",
  Designs: "Visual inspirations and design resources for creative minds",
};

export default async function ResourcesPage() {
  const resources = await getResources();

  // Group resources by category
  const resourcesByCategory = categories.reduce(
    (acc, cat) => {
      acc[cat] = resources.filter(
        (r) => r.category?.toLowerCase() === cat.toLowerCase()
      );
      return acc;
    },
    {} as Record<string, ResourceCard[]>
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#F7F8F5] to-white">
      <Navbar />

      <main className="pt-40 pb-24 px-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-left space-y-8 relative mb-32">
          <div className="flex justify-start gap-1.5 mb-2">
            <span className="w-2 h-2 rounded-full bg-accent shadow-sm" />
            <span className="w-2 h-2 rounded-full bg-foreground opacity-40" />
            <span className="w-2 h-2 rounded-full bg-foreground opacity-30" />
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground leading-none">
            Curated <br />
            <span className="text-accent">Resources.</span>
          </h1>
          <p className="max-w-2xl text-xl text-foreground/60 leading-relaxed">
            Access a carefully curated collection of magazines, books, articles,
            and designs to accelerate your growth journey.
          </p>
          <div className="h-[2px] w-24 bg-foreground/10 mt-12 rounded-full" />
        </div>

        {/* Categories Sections */}
        <div className="space-y-32">
          {categories.map((category) => (
            <section key={category} className="space-y-12">
              {/* Category Header */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-5xl">
                    {categoryIcons[category as keyof typeof categoryIcons]}
                  </span>
                  <div>
                    <h2 className="text-5xl font-black text-foreground uppercase tracking-tight">
                      {category}
                    </h2>
                    <p className="text-lg text-foreground/60 mt-2">
                      {
                        categoryDescriptions[
                          category as keyof typeof categoryDescriptions
                        ]
                      }
                    </p>
                  </div>
                </div>
                <div className="h-0.5 w-20 bg-accent rounded-full" />
              </div>

              {/* Category Cards Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resourcesByCategory[category] && resourcesByCategory[category].length > 0 ? (
                  resourcesByCategory[category].map((resource) => (
                    <div
                      key={resource._id}
                      className="group rounded-3xl overflow-hidden bg-white border border-black/5 hover:border-accent/20 transition-all duration-500 hover:shadow-xl hover:shadow-black/5"
                    >
                      {/* Image Container */}
                      {resource.image?.asset?.url ? (
                        <div className="relative w-full h-56 overflow-hidden bg-gradient-to-br from-accent/10 to-foreground/5">
                          <img
                            src={resource.image.asset.url}
                            alt={resource.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        </div>
                      ) : (
                        <div className="w-full h-56 bg-gradient-to-br from-accent/20 to-foreground/10 flex items-center justify-center">
                          <span className="text-6xl opacity-50">
                            {
                              categoryIcons[
                                category as keyof typeof categoryIcons
                              ]
                            }
                          </span>
                        </div>
                      )}

                      {/* Card Content */}
                      <div className="p-6 space-y-4">
                        <div>
                          <h3 className="text-xl font-black text-foreground line-clamp-2 group-hover:text-accent transition-colors">
                            {resource.title}
                          </h3>
                          <p className="text-sm text-accent font-bold uppercase tracking-widest mt-2">
                            {resource.category}
                          </p>
                        </div>

                        <p className="text-foreground/60 text-sm line-clamp-3">
                          {resource.description}
                        </p>

                        <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-accent/10 hover:bg-accent hover:text-white text-accent font-bold transition-all duration-300 group/btn">
                          Explore <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-16 text-center">
                    <p className="text-foreground/50 text-lg">
                      No resources available in this category yet.
                    </p>
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-32 rounded-3xl bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 p-12 text-center space-y-6">
          <h3 className="text-4xl font-black text-foreground">
            Can't find what you're looking for?
          </h3>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Join our community to share resources, discuss insights, and grow
            together.
          </p>
          <Link
            href="/community"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 transition-all"
          >
            Join Community <ArrowRight size={18} />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
