import Link from 'next/link';
import { ArrowUpRight, BookOpen, Target, Clock, Shield } from 'lucide-react';

export default function FeaturesPreview() {
  return (
    <section className="relative py-24 bg-transparent text-foreground overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-full bg-accent/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-growth-green/10 blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1 space-y-8">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-black/5 text-foreground text-[10px] font-black uppercase tracking-widest border border-black/10">
             🌟 Mentoring Program
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight">
            Accelerate Your <br />
            <span className="text-accent">Personal Growth.</span>
          </h2>
          <p className="text-foreground/60 text-lg max-w-lg leading-relaxed">
            Join our structured transformational journey designed to equip you with the skills required to excel across all dimensions of your life. Master self-awareness, leadership, and emotional intelligence.
          </p>
          
          <ul className="space-y-4 pt-4 mb-8">
             <li className="flex items-center gap-3 text-foreground/80"><Clock className="text-accent w-5 h-5" /> 16th March - 15th June, 2026</li>
             <li className="flex items-center gap-3 text-foreground/80"><BookOpen className="text-accent w-5 h-5" /> 13 Core Curriculum Modules</li>
             <li className="flex items-center gap-3 text-foreground/80"><Shield className="text-accent w-5 h-5" /> Certificate of Participation</li>
          </ul>

          <Link href="/features">
            <button className="h-14 px-8 rounded-xl bg-accent text-white font-bold tracking-wide flex items-center gap-3 hover:scale-105 transition-transform shadow-[0_0_30px_rgba(16,129,114,0.3)]">
                Explore Full Curriculum <ArrowUpRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
        
        <div className="flex-1 w-full max-w-lg relative">
            <div className="grid grid-cols-2 gap-4">
                <div className="p-6 rounded-3xl bg-white border border-black/5 flex flex-col items-start gap-4 hover:shadow-xl transition-all shadow-sm">
                    <Target className="w-8 h-8 text-accent" />
                    <h3 className="font-bold">Power of Vision</h3>
                    <p className="text-xs text-foreground/50">Aligning with purpose</p>
                </div>
                <div className="p-6 rounded-3xl bg-white border border-black/5 flex flex-col items-start gap-4 hover:shadow-xl transition-all shadow-sm mt-8">
                    <BookOpen className="w-8 h-8 text-growth-green" />
                    <h3 className="font-bold">Self-Awareness</h3>
                    <p className="text-xs text-foreground/50">Understanding yourself</p>
                </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-accent/20 blur-xl -z-10" />
        </div>
      </div>
    </section>
  );
}
