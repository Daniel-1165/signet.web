import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Shield, Zap, Globe, MessageCircle, BarChart3, Users, Sparkles } from "lucide-react";
import { GerminationAnimation } from "@/components/animations/GerminationAnimation";

export default function FeaturesPage() {
  return (
    <div className="relative min-h-screen premium-gradient bg-background">
      <Navbar />
      
      <main className="pt-40 pb-24 px-8 max-w-7xl mx-auto space-y-32">
        {/* Hero Section */}
        <div className="text-left space-y-8 relative">
          <div className="flex justify-start gap-1.5 mb-2">
             <span className="w-2 h-2 rounded-full bg-accent shadow-sm" />
             <span className="w-2 h-2 rounded-full bg-foreground opacity-40" />
             <span className="w-2 h-2 rounded-full bg-foreground opacity-30" />
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground leading-none">
            The Blueprint <br /><span className="text-accent">Features.</span>
          </h1>
          <p className="max-w-2xl text-xl text-foreground/60 leading-relaxed">
            A meticulously crafted environment designed for those seeking clarity, community, and exponential personal growth.
          </p>
          <div className="h-[2px] w-24 bg-foreground/10 mt-12 rounded-full" />
        </div>

        {/* Animation & Motivation */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
           <div className="p-12 rounded-[3.5rem] bg-foreground/5 border border-foreground/10 relative group overflow-hidden">
              <div className="absolute inset-0 bg-white opacity-20 transform translate-x-full group-hover:translate-x-0 transition-transform duration-1000" />
              <GerminationAnimation />
              <div className="text-center mt-12 space-y-3 relative z-10">
                 <h3 className="text-xs font-black uppercase tracking-[0.3em] text-foreground/40">Growth Protocol</h3>
                 <p className="text-sm font-bold text-foreground tracking-tight">Watching the ascent — your evolution is rhythmic.</p>
              </div>
           </div>
           
           <div className="space-y-10">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-accent/5 text-accent text-[10px] font-black uppercase tracking-widest border border-accent/10">
                 <Sparkles size={12} strokeWidth={2} /> High-Signal Integrity
              </div>
              <h2 className="text-5xl font-black tracking-tight uppercase text-foreground leading-none">Precision <br />Engineering.</h2>
              <div className="space-y-6">
                 <div className="flex gap-4">
                    <div className="w-1 h-20 bg-accent/20 rounded-full shrink-0" />
                    <p className="text-foreground/60 text-lg leading-relaxed">
                       Our tools are built with <span className="text-accent font-bold">rhythmic efficiency</span>. We use clean minimalism to nudge your brain towards focus, ensuring you stay in the high-signal zone.
                    </p>
                 </div>
              </div>
           </div>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-12 relative">
           <div className="absolute -top-12 -left-12 w-24 h-24 bg-accent/5 blur-3xl animate-pulse" />
          {features.map((f, i) => (
            <div key={i} className="group p-10 rounded-[2.5rem] bg-white border border-black/5 hover:border-black/10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-4 right-4 w-1 h-1 rounded-full bg-foreground opacity-0 group-hover:opacity-40 transition-opacity" />
              <div className="w-16 h-16 rounded-2xl bg-black/5 flex items-center justify-center text-foreground mb-8 group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-sm">
                <f.icon size={32} strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{f.title}</h3>
              <p className="text-foreground/60 text-base leading-relaxed">
                {f.desc}
              </p>
              <div className="mt-8 pt-6 border-t border-black/5 flex items-center gap-2">
                 <span className={`w-1.5 h-1.5 rounded-full ${i % 3 === 0 ? 'bg-accent' : i % 3 === 1 ? 'bg-foreground' : 'bg-black/20'}`} />
                 <span className="text-[9px] font-black uppercase tracking-widest text-black/20">Operational Details</span>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Section: The Protocols Experience */}
        <div className="p-16 rounded-[4rem] bg-foreground text-white relative overflow-hidden signet-glow">
           <div className="absolute top-0 right-0 w-[600px] h-full bg-accent/10 blur-[120px]" />
           <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-white/5 blur-[150px] rounded-full" />
           
           <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                 <div className="flex gap-2">
                    <div className="w-8 h-[2px] bg-accent mt-4" />
                    <h2 className="text-4xl font-black tracking-tighter uppercase leading-none">The Protocols Hub.</h2>
                 </div>
                 <p className="text-white/60 text-lg leading-relaxed">
                    Access our curated library of mental models, performance frameworks, and exclusive content updated weekly. From high-stakes decision making to deep focus rituals.
                 </p>
                 <div className="flex gap-4">
                    <button className="px-10 py-4 rounded-xl bg-accent text-[#0a0f0a] font-bold hover:scale-105 transition-all shadow-lg shadow-accent/20">Explore Library</button>
                    <button className="px-10 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all">Curriculum Roadmap</button>
                 </div>
              </div>
              <div className="relative group">
                 <div className="grid grid-cols-2 gap-6 p-4">
                    {[1,2,3,4].map(i => (
                       <div key={i} className="h-44 rounded-3xl bg-white/5 border border-white/10 flex flex-col p-6 space-y-4 hover:bg-white/10 transition-colors">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${i % 2 === 0 ? 'bg-white/20 text-white' : 'bg-accent/20 text-accent'}`}>
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
