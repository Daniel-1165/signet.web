import { createServerSupabaseClient } from "@/lib/supabase/server";
import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { SettingsForm } from "./SettingsForm";
import { Shield, Target, Trophy, Sparkles, ArrowLeft } from "lucide-react";

export default async function SettingsPage() {
  const user = await currentUser();
  const { userId } = await auth();
  if (!userId || !user) return null;

  const supabase = createServerSupabaseClient();
  
  // Fetch current profile data
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1D1914] pt-12 pb-32">
      {/* Editorial Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-[#D8CEBE]/30 bg-white/80 backdrop-blur-xl py-6">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-10">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="flex items-center gap-2 text-[#6E7A67] hover:text-[#1D1914] transition-colors group">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-[12px] font-bold uppercase tracking-widest">Back to Hub</span>
            </Link>
            <div className="w-[1px] h-4 bg-[#D8CEBE]" />
            <h1 className="text-[12px] font-bold tracking-[0.2em] uppercase text-[#6E7A67]/40">Profile Settings</h1>
          </div>
          <div className="flex items-center gap-8">
             <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
                <UserButton />
             </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-[1400px] px-10 pt-32 grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-16">
          <header className="space-y-4">
             <div className="flex items-center gap-3 text-[#6E7A67]">
               <Sparkles size={18} />
               <span className="text-[11px] font-bold uppercase tracking-[0.3em]">Identity Calibration</span>
             </div>
             <h2 className="text-[52px] font-bold tracking-tight leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
               Your <span className="italic font-normal text-[#6E7A67]">Growth</span> Identity.
             </h2>
             <p className="text-[16px] text-[#6E7A67] max-w-md">Edit your professional details and network presence below.</p>
          </header>

          <div className="bg-white rounded-[3rem] p-12 border border-[#D8CEBE]/40 shadow-[0_20px_60px_rgba(0,0,0,0.02)]">
             <SettingsForm initialData={profile} />
          </div>
        </div>

        <aside className="space-y-10 lg:pt-12">
          {/* Reputation Card */}
          <div className="p-10 bg-[#1D1914] border border-white/5 rounded-[3rem] shadow-2xl relative overflow-hidden group">
            <Trophy className="absolute -bottom-10 -right-10 w-40 h-40 text-white/5 group-hover:rotate-6 transition-transform duration-1000" />
            <div className="flex items-center gap-3 mb-10">
              <Trophy className="text-[#D8CEBF]" size={18} />
              <h3 className="font-bold uppercase tracking-[0.2em] text-[#D8CEBF] text-[10px]">Network Reputation</h3>
            </div>
            <div className="relative z-10">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-[56px] font-bold text-white leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>{profile?.reputation_points || 0}</span>
                <span className="text-[#D8CEBF]/40 font-bold uppercase text-[11px] tracking-widest">Points</span>
              </div>
              <p className="text-[13px] text-[#D8CEBF]/60 leading-relaxed italic">
                Earned through depth of contribution and active resonance within the Silent Network.
              </p>
            </div>
          </div>

          {/* Membership Card */}
          <div className="p-10 bg-white border border-[#D8CEBE]/40 rounded-[3rem] shadow-[0_15px_40px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-3 mb-10">
              <Shield className="text-[#6E7A67]" size={18} />
              <h3 className="font-bold uppercase tracking-[0.2em] text-[#6E7A67] text-[10px]">Membership Tier</h3>
            </div>
            
            <div className="flex items-center gap-5 p-6 bg-[#FDFCFB] rounded-[2rem] border border-[#D8CEBE]/30 mb-8 group cursor-default">
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-3xl shadow-sm border border-[#D8CEBE]/20 group-hover:scale-110 transition-transform">
                💎
              </div>
              <div>
                <h4 className="text-[16px] font-bold text-[#1D1914]">Active Elite</h4>
                <p className="text-[10px] font-bold text-[#6E7A67]/40 uppercase tracking-[0.15em]">Growth Network</p>
              </div>
            </div>
            
            <button className="w-full py-4 rounded-xl bg-[#1D1914] text-white text-[12px] font-bold uppercase tracking-widest hover:bg-[#6E7A67] shadow-lg hover:shadow-[0_10px_20px_rgba(110,122,103,0.3)] transition-all">
              Manage Credentials
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
}
