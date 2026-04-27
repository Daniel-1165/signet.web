"use client";

import { 
  BookOpen, Lightbulb, Heart, CheckCircle2, 
  Target, Compass, ArrowRight, Upload, 
  ImageIcon, Trash2, Sparkles, Shield,
  ArrowUpRight, ChevronRight
} from "lucide-react";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { SignUpButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

const sections = [
  {
    id: "foundation",
    title: "The Foundation of Vision",
    subtitle: "Core Concepts",
    icon: <BookOpen className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    description: "A personal vision statement is more than a goal-setting exercise—it's a declaration of your divine purpose and the unique contribution you're called to make in this world.",
    keyPoints: ['Defining your "Why"', 'Compass through Noise', 'Alignment']
  },
  {
    id: "biblical",
    title: "Biblical Framework",
    subtitle: "Spiritual Roots",
    icon: <Heart className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=1200",
    description: "The Bible provides the ultimate framework for personal vision. God's vision for humanity is revealed through Scripture, and He invites us to participate in His grand narrative.",
    verse: { verse: "Habakkuk 2:2", text: '"Write the vision and make it plain on tablets, that he may run who reads it."', interpretation: "Clarity leads to execution." }
  },
  {
    id: "framework",
    title: "Evidence-Based Framework",
    subtitle: "Modern Strategy",
    icon: <Lightbulb className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1454165833772-d996d49513d7?auto=format&fit=crop&q=80&w=1200",
    description: "Modern research provides evidence-based frameworks for crafting effective vision statements. Successful visions combine personal values and aspirations.",
    keyPoints: ['SMART Metrics', 'BHAG Alignment', 'SWOT Synthesis']
  }
];

export default function VisionGuidePage() {
  const { isSignedIn, isLoaded } = useUser();
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
    <div className="relative min-h-screen bg-[#FDFDFB] text-[#0D120E] selection:bg-[#1DA756] selection:text-white"
         style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      
      {/* ── HERO SECTION ─────────────────────────────────────────── */}
      <section className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1DA756]/10 border border-[#1DA756]/20 mb-8">
              <Sparkles className="w-3.5 h-3.5 text-[#1DA756]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1DA756]">Vision Matrix v2.0</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-10">
              Empowering <br />
              <span className="text-[#1DA756]">clarity</span> through <br />
              innovation.
            </h1>
            
            <p className="text-lg md:text-xl text-[#0D120E]/60 max-w-lg mb-12 leading-relaxed font-medium">
              Welcome to the Blueprint, where we combine spiritual insights and modern strategy to revolutionize your life trajectory.
            </p>
            
            <div className="flex flex-wrap gap-4">
              {isLoaded && !isSignedIn ? (
                <SignUpButton mode="modal">
                   <button className="h-14 px-10 rounded-full bg-[#1DA756] text-white font-bold flex items-center gap-3 hover:scale-105 transition-transform shadow-xl shadow-[#1DA756]/20">
                      Get Started <ArrowUpRight size={18} />
                   </button>
                </SignUpButton>
              ) : (
                <Link href="/dashboard" className="h-14 px-10 rounded-full bg-[#1DA756] text-white font-bold flex items-center gap-3 hover:scale-105 transition-transform shadow-xl shadow-[#1DA756]/20">
                  Enter Dashboard <ChevronRight size={18} />
                </Link>
              )}
              <button className="h-14 px-10 rounded-full bg-white border border-black/5 text-[#0D120E] font-bold hover:bg-black/5 transition-colors">
                Explore Logic
              </button>
            </div>
          </motion.div>

          {/* Featured Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative h-[400px] md:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200" 
              alt="Nature" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#1DA756]/20 to-transparent mix-blend-overlay"></div>
          </motion.div>
        </div>
      </section>

      {/* ── MODULES GRID ─────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
               <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight mb-6">
                 Integrate vision <br />
                 seamlessly into your <br />
                 <span className="text-[#1DA756]">workflow.</span>
               </h2>
               <p className="text-lg text-[#0D120E]/50 font-medium">
                 Our step-by-step guide will show you how to easily incorporate your purpose into your existing journey. Streamline your processes.
               </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
             {sections.map((section, idx) => (
                <div key={section.id} className="group">
                   <div className="w-12 h-12 rounded-xl bg-[#1DA756]/10 flex items-center justify-center text-[#1DA756] mb-6">
                      {section.icon}
                   </div>
                   <h4 className="text-xl font-bold mb-3 uppercase tracking-tight">{section.title}</h4>
                   <p className="text-sm text-[#0D120E]/50 leading-relaxed font-medium mb-8">
                      {section.description}
                   </p>
                   <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-4 shadow-xl border border-black/5">
                      <img 
                        src={section.image} 
                        alt={section.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                   </div>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* ── FINAL BUILDER SECTION ────────────────────────────────── */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="bg-[#0D120E] rounded-[4rem] p-10 md:p-20 text-white relative overflow-hidden border border-white/5 shadow-2xl">
           <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-[#1DA756]/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
           
           <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                 <span className="text-[10px] font-black tracking-[0.4em] text-[#1DA756] uppercase block mb-8">Final Declaration</span>
                 <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-10">
                   Transforming <br />
                   intentions with <br />
                   <span className="text-[#1DA756]">sustainable</span> vision.
                 </h2>
                 <p className="text-[#0D120E]/40 text-lg md:text-xl font-medium mb-12 capitalize leading-relaxed">
                   Signet empowers individuals to achieve their goals while minimizing internal friction. With our sustainable solutions, you can drive growth.
                 </p>
                 
                 <div className="flex flex-col gap-6">
                    <div className="flex gap-4">
                       <div className="w-1.5 h-1.5 rounded-full bg-[#1DA756] mt-2" />
                       <div>
                          <p className="font-bold text-lg mb-1">Efficiency</p>
                          <p className="text-white/40 text-sm">Streamline operations and reduce waste with our innovative vision.</p>
                       </div>
                    </div>
                    <div className="flex gap-4">
                       <div className="w-1.5 h-1.5 rounded-full bg-[#1DA756] mt-2" />
                       <div>
                          <p className="font-bold text-lg mb-1">Profitability</p>
                          <p className="text-white/40 text-sm">Increase your bottom line while making a positive impact.</p>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[3rem] shadow-2xl">
                 <h3 className="text-2xl font-bold mb-8">Craft Statement</h3>
                 <textarea 
                    placeholder="I will [action] so that [impact]..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-lg outline-none focus:border-[#1DA756] transition-colors min-h-[150px] mb-8"
                 />
                 
                 <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-video rounded-3xl border border-white/10 flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-white/5 transition-colors relative overflow-hidden"
                 >
                    {selectedImage ? (
                      <img src={selectedImage} className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-[#1DA756] mb-3" />
                        <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Upload Visual</span>
                      </>
                    )}
                 </div>
                 <input type="file" ref={fileInputRef} className="hidden" onChange={handleImageUpload} />
                 
                 <button className="w-full h-14 bg-[#1DA756] text-white rounded-full font-black uppercase text-xs tracking-widest mt-8 shadow-xl shadow-[#1DA756]/20">
                    Save Declaration
                 </button>
              </div>
           </div>
        </div>
      </section>

    </div>
  );
}