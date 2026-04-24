"use client";

import { BookOpen, Lightbulb, Heart, CheckCircle2, Target, Compass, ArrowRight, Upload, ImageIcon, Trash2 } from "lucide-react";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { PortableText } from 'next-sanity';

const sections = [
  {
    id: "foundation",
    title: "The Foundation of Vision",
    subtitle: "Core Concepts",
    icon: <BookOpen className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    description: "A personal vision statement is more than a goal-setting exercise—it's a declaration of your divine purpose and the unique contribution you're called to make in this world.",
    keyPoints: ['Vision statements articulate your "why"', 'Serve as a compass during uncertainty', 'Align personal goals with eternal values']
  },
  {
    id: "biblical",
    title: "Biblical Framework for Vision",
    subtitle: "Spiritual Foundation",
    icon: <Heart className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=1200",
    description: "The Bible provides the ultimate framework for personal vision. God's vision for humanity is revealed through Scripture, and He invites us to participate in His grand narrative.",
    keyPoints: ["God has a specific purpose for each person", "Vision should glorify God and serve others"],
    verse: { verse: "Jeremiah 29:11", text: '"For I know the plans I have for you," declares the Lord...', interpretation: "Your vision should be rooted in God's good plans." }
  },
  {
    id: "framework",
    title: "Academic Vision Frameworks",
    subtitle: "Evidence-Based Framework",
    icon: <Lightbulb className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1454165833772-d996d49513d7?auto=format&fit=crop&q=80&w=1200",
    description: "Modern research provides evidence-based frameworks for crafting effective vision statements. The most successful visions combine personal values, strengths, and aspirations with measurable outcomes.",
    keyPoints: ['SMART goals framework', 'BHAG (Big Hairy Audacious Goals)', 'Personal SWOT analysis']
  },
  {
    id: "exercise",
    title: "Core Values Assessment",
    subtitle: "Practical Application",
    icon: <CheckCircle2 className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200",
    description: "Your core values are the non-negotiable principles that guide your decisions and define your character.",
    reflection: { question: "What are your top 5 core values?", guidance: "Consider moments when you felt most alive.", journalPlaceholder: "List your values here..." }
  },
  {
    id: "reflection",
    title: "Strengths & Gifts Inventory",
    subtitle: "Introspection Prompt",
    icon: <Target className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=1200",
    description: "Gallup research shows that individuals who focus on their strengths are 3 times more likely to report having an excellent quality of life.",
    reflection: { question: "What activities make you lose track of time?", guidance: "Think about work or hobbies where you excel naturally.", journalPlaceholder: "List activities..." }
  },
  {
    id: "purpose",
    title: "Life Purpose Integration",
    subtitle: "Life Integration",
    icon: <Compass className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200",
    description: "Your life purpose integrates your calling, strengths, values, and vision into a cohesive whole.",
    reflection: { question: "If you could only accomplish one thing in life, what would it be?", guidance: "This reveals your deepest calling.", journalPlaceholder: "Describe your one thing..." }
  }
];

export default function VisionGuidePage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FDFDFB]">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/5 to-transparent -z-10 pointer-events-none" />
      
      <main className="max-w-7xl mx-auto px-6 py-24">
        {/* Simplified Header */}
        <div className="max-w-4xl mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-6">Personal Development Matrix</p>
            <h1 className="text-7xl md:text-8xl font-black tracking-tighter text-foreground leading-[0.95] mb-8">
              The Vision <br /> 
              <span className="text-accent underline decoration-accent/20 underline-offset-8">Blueprint</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/60 max-w-2xl leading-relaxed">
              A masterclass framework to architect your future and align your divine purpose with actionable excellence.
            </p>
          </motion.div>
        </div>

        {/* Normal Sections (Grid of Modules) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {sections.map((section, idx) => (
            <motion.section
              key={section.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx % 2 * 0.1 }}
              className="flex flex-col group"
            >
              {/* Image Container */}
              <div className="relative h-[400px] rounded-[2rem] overflow-hidden mb-8 shadow-2xl shadow-black/5">
                <img 
                  src={section.image} 
                  alt={section.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20">
                    {section.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/70 leading-none mb-1">{section.subtitle}</p>
                    <h3 className="text-xl font-bold text-white tracking-tight leading-none">{section.title}</h3>
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="px-2">
                <p className="text-lg text-foreground/70 leading-relaxed mb-6">
                  {section.description}
                </p>

                {section.keyPoints && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {section.keyPoints.map(point => (
                      <span key={point} className="px-3 py-1.5 bg-black/[0.03] border border-black/[0.06] rounded-full text-[10px] font-bold text-foreground/50 uppercase tracking-wider">
                        {point}
                      </span>
                    ))}
                  </div>
                )}

                {section.verse && (
                  <div className="p-6 bg-accent/[0.03] border-l-4 border-accent rounded-r-2xl mb-8">
                    <p className="text-sm font-black text-accent mb-2">{section.verse.verse}</p>
                    <p className="text-base italic text-foreground/80 mb-4">"{section.verse.text}"</p>
                    <p className="text-xs text-foreground/50 uppercase font-black tracking-widest leading-relaxed">
                      {section.verse.interpretation}
                    </p>
                  </div>
                )}

                {section.reflection && (
                  <div className="space-y-4">
                    <div className="p-4 bg-black/[0.02] border border-black/[0.04] rounded-2xl">
                      <p className="text-sm font-bold text-foreground mb-1">{section.reflection.question}</p>
                      <p className="text-xs text-foreground/50 italic mb-4">{section.reflection.guidance}</p>
                      <textarea 
                        placeholder={section.reflection.journalPlaceholder}
                        className="w-full bg-white border border-black/5 rounded-xl p-4 text-sm focus:ring-1 focus:ring-accent/20 focus:border-accent outline-none min-h-[100px] transition-all"
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Final Vision Builder - The "Normal Section and Image Input" */}
        <section className="mt-48 pt-32 border-t border-black/[0.05]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div className="space-y-12">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-6">Phase 07: Synthesis</p>
                <h2 className="text-6xl font-black tracking-tighter text-foreground leading-[0.95] mb-8">
                  Craft Your <br /> Final Declaration
                </h2>
                <p className="text-xl text-foreground/60 leading-relaxed max-w-md">
                  Combine your insights into a singular, powerful vision statement. Upload an image that visualizes your future.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-black uppercase tracking-widest text-foreground/40">Your Vision Statement</label>
                  <textarea 
                    placeholder="I will [action] so that [impact] because [why/purpose]..."
                    className="w-full bg-black/[0.02] border border-black/[0.06] rounded-3xl p-8 text-xl font-medium focus:ring-2 focus:ring-accent/10 focus:border-accent outline-none min-h-[200px] transition-all"
                  />
                </div>

                {/* Final Image Input Area */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-black uppercase tracking-widest text-foreground/40">Visual Representation</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative w-full aspect-video rounded-[3rem] border-2 border-dashed border-black/5 bg-black/[0.01] hover:bg-black/[0.03] transition-all cursor-pointer flex flex-col items-center justify-center p-8 text-center group overflow-hidden ${selectedImage ? 'border-solid border-accent/20' : ''}`}
                  >
                    {selectedImage ? (
                      <>
                        <img src={selectedImage} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                           <button onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }} className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                              <Trash2 className="w-5 h-5" />
                           </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-accent mb-4 group-hover:scale-110 transition-transform">
                          <Upload className="w-6 h-6" />
                        </div>
                        <p className="text-lg font-bold text-foreground">Upload Vision Image</p>
                        <p className="text-sm text-foreground/40 mt-1">PNG, JPG or WebP (max 10MB)</p>
                      </>
                    )}
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleImageUpload} 
                      className="hidden" 
                      accept="image/*"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-8">
                 <button className="h-16 px-10 bg-accent text-white font-black rounded-2xl shadow-xl shadow-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-3">
                   Save Vision <ArrowRight className="w-5 h-5" />
                 </button>
                 <button className="h-16 px-10 bg-white border border-black/10 text-foreground font-black rounded-2xl hover:bg-black/5 transition-all">
                   Share Blueprint
                 </button>
              </div>
            </div>

            {/* Sidebar / Tip Area */}
            <div className="lg:sticky lg:top-24 space-y-8">
               <div className="p-10 rounded-[3rem] bg-accent text-white shadow-2xl shadow-accent/20">
                  <Heart className="w-10 h-10 mb-6 opacity-40 shrink-0" />
                  <h4 className="text-2xl font-black tracking-tight mb-4 leading-tight">Why a Vision Image Matters?</h4>
                  <p className="text-white/80 leading-relaxed text-lg italic">
                    "Visualization is one of the most powerful mind exercises you can do. According to popular research, visualization activates the same brain regions as actual experience."
                  </p>
               </div>
               
               <div className="p-10 rounded-[3rem] bg-black text-white shadow-2xl shadow-black/10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-2 h-2 rounded-full bg-[#1DA756]" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#1DA756]">Academy Tip</span>
                  </div>
                  <h4 className="text-xl font-bold mb-4">The Clarity Rule</h4>
                  <p className="text-white/50 text-sm leading-relaxed">
                    If your vision cannot be explained to a 10-year old in less than 30 seconds, it's not clear enough. Refine until it's simple, evocative, and undeniable.
                  </p>
               </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

}