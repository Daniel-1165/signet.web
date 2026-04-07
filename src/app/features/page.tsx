import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Shield, Zap, Globe, MessageCircle, BarChart3, Users, Sparkles } from "lucide-react";
import { GerminationAnimation } from "@/components/animations/GerminationAnimation";

export default function FeaturesPage() {
  return (
    <div className="relative min-h-screen premium-gradient bg-[#F8F9F5]">
      <Navbar />
      
      <main className="pt-40 pb-24 px-8 max-w-7xl mx-auto space-y-32">
        {/* Hero Section */}
        <div className="text-center space-y-8 relative">
          <div className="flex justify-center gap-1.5 mb-2">
             <span className="w-1.5 h-1.5 rounded-full bg-solar-gold shadow-[0_0_8px_#fbbf24]" />
             <span className="w-1.5 h-1.5 rounded-full bg-terra-soil opacity-40" />
             <span className="w-1.5 h-1.5 rounded-full bg-vision-blue opacity-30" />
          </div>
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-[#0A261D] font-heading leading-none">
            The Blueprint <br /><span className="text-[#4C7D4D]">Features.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-[#0A261D]/60 leading-relaxed font-outfit">
            A meticulously crafted environment designed for those seeking clarity, community, and exponential personal growth.
          </p>
          <div className="h-[2px] w-24 bg-terra-soil/10 mx-auto mt-12 rounded-full" />
        </div>

        {/* Animation & Motivation */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
           <div className="p-12 rounded-[3.5rem] bg-[#0A261D]/5 border border-[#0A261D]/10 relative group overflow-hidden">
              <div className="absolute inset-0 bg-white opacity-20 transform translate-x-full group-hover:translate-x-0 transition-transform duration-1000" />
              <GerminationAnimation />
              <div className="text-center mt-12 space-y-3 relative z-10">
                 <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#0A261D]/40 font-heading">Growth Protocol</h3>
                 <p className="text-sm font-bold text-[#0A261D] tracking-tight">Watching the ascent — your evolution is rhythmic.</p>
              </div>
           </div>
           
           <div className="space-y-10">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-vision-blue/5 text-vision-blue text-[10px] font-bold uppercase tracking-widest border border-vision-blue/10">
                 <Sparkles size={12} /> High-Signal Integrity
              </div>
              <h2 className="text-5xl font-bold tracking-tight font-heading uppercase text-[#0A261D] leading-none">Precision <br />Engineering.</h2>
              <div className="space-y-6">
                 <div className="flex gap-4">
                    <div className="w-1 h-20 bg-solar-gold/20 rounded-full shrink-0" />
                    <p className="text-[#0A261D]/60 text-lg leading-relaxed font-outfit">
                       Our tools are built with <span className="text-[#2D6A4F] font-bold">rhythmic efficiency</span>. We use color psychology to nudge your brain towards focus (Solar Gold) and grounding (Terra Soil), ensuring you stay in the high-signal zone (Vision Blue).
                    </p>
                 </div>
              </div>
           </div>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-12 relative">
           <div className="absolute -top-12 -left-12 w-24 h-24 bg-vision-blue/5 blur-3xl animate-pulse" />
          {features.map((f, i) => (
            <div key={i} className="group p-10 rounded-[2.5rem] bg-white border border-[#0A261D]/5 hover:border-[#2D6A4F]/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-4 right-4 w-1 h-1 rounded-full bg-terra-soil opacity-0 group-hover:opacity-40 transition-opacity" />
              <div className="w-16 h-16 rounded-2xl bg-[#4C7D4D]/10 flex items-center justify-center text-[#4C7D4D] mb-8 group-hover:bg-[#4C7D4D] group-hover:text-white transition-all duration-500 shadow-sm">
                <f.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold text-[#0A261D] mb-4 font-heading">{f.title}</h3>
              <p className="text-[#0A261D]/60 text-base leading-relaxed font-outfit">
                {f.desc}
              </p>
              <div className="mt-8 pt-6 border-t border-black/5 flex items-center gap-2">
                 <span className={`w-1.5 h-1.5 rounded-full ${i % 3 === 0 ? 'bg-solar-gold' : i % 3 === 1 ? 'bg-terra-soil' : 'bg-vision-blue'}`} />
                 <span className="text-[9px] font-black uppercase tracking-widest text-black/20">Operational Details</span>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Section: The Protocols Experience */}
        <div className="p-16 rounded-[4rem] bg-[#0A261D] text-white relative overflow-hidden signet-glow">
           <div className="absolute top-0 right-0 w-[600px] h-full bg-[#2D6A4F]/20 blur-[120px]" />
           <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-solar-gold/5 blur-[150px] rounded-full" />
           
           <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                 <div className="flex gap-2">
                    <div className="w-8 h-[2px] bg-solar-gold mt-4" />
                    <h2 className="text-4xl font-bold tracking-tight font-heading uppercase leading-none">The Protocols Hub.</h2>
                 </div>
                 <p className="text-white/60 text-lg leading-relaxed font-outfit">
                    Access our curated library of mental models, performance frameworks, and exclusive content updated weekly. From high-stakes decision making to deep focus rituals.
                 </p>
                 <div className="flex gap-4">
                    <button className="px-10 py-4 rounded-xl bg-solar-gold text-[#0a0f0a] font-bold hover:scale-105 transition-all shadow-lg shadow-solar-gold/20">Explore Library</button>
                    <button className="px-10 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all font-outfit">Curriculum Roadmap</button>
                 </div>
              </div>
              <div className="relative group">
                 <div className="grid grid-cols-2 gap-6 p-4">
                    {[1,2,3,4].map(i => (
                       <div key={i} className="h-44 rounded-3xl bg-white/5 border border-white/10 flex flex-col p-6 space-y-4 hover:bg-white/10 transition-colors">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${i % 2 === 0 ? 'bg-vision-blue/20 text-vision-blue' : 'bg-solar-gold/20 text-solar-gold'}`}>
                             <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                          </div>
                          <div className="space-y-2">
                             <div className="w-full h-1.5 bg-white/10 rounded-full" />
                             <div className="w-2/3 h-1.5 bg-white/10 rounded-full opacity-60" />
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

const features = [
  { icon: Shield, title: "Private Collective", desc: "Access the exclusive Inner Circle where high-performers share insights, builds, and strategies in absolute privacy." },
  { icon: Zap, title: "Real-time Dynamics", desc: "Our infrastructure supports low-latency transmissions, ensuring you never miss a critical update or community pulse." },
  { icon: Globe, title: "Resource Network", desc: "A curated repository of global opportunities, blueprints, and templates optimized for the modern digital economy." },
  { icon: Users, title: "Peer Mentorship", desc: "Leverage the expertise of our community through structured advisory sessions and collaborative group sprints." },
  { icon: BarChart3, title: "Performance Alpha", desc: "Advanced tracking systems to monitor your personal and professional evolution across our three core growth pillars." },
  { icon: MessageCircle, title: "Secure Channels", desc: "End-to-end encrypted direct messaging and group threads for sensitive professional communication." },
];
