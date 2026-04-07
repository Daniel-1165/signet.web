import { createServerSupabaseClient } from "@/lib/supabase/server";
import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { SettingsForm } from "./SettingsForm";
import { Shield, Target, Trophy } from "lucide-react";

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
    <div className="min-h-screen bg-[#0a0f0a] text-white">
      <nav className="fixed top-0 z-40 w-full border-b border-white/5 bg-[#0a0f0a]/80 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-xl font-bold tracking-tighter text-[#4ade80] hover:opacity-80 transition-opacity">
              SIGNET
            </Link>
            <span className="text-white/20">/</span>
            <h1 className="text-sm font-medium tracking-wide uppercase text-white/60">Settings</h1>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-sm hover:text-[#4ade80] transition-colors">
              Dashboard
            </Link>
            <UserButton />
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-6 pt-32 pb-24 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <header>
            <h2 className="text-4xl font-bold tracking-tight mb-2">Account Profile</h2>
            <p className="text-white/40">Keep your growth identity updated within the network.</p>
          </header>

          <SettingsForm initialData={profile} />
        </div>

        <aside className="space-y-8">
          <div className="p-8 bg-[#121812] border border-white/5 rounded-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Trophy className="text-[#4ade80]" size={20} />
              <h3 className="font-bold uppercase tracking-widest text-[#4ade80] text-xs">Network Reputation</h3>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-5xl font-black">{profile?.reputation_points || 0}</span>
              <span className="text-white/20 font-bold uppercase text-[10px]">Points</span>
            </div>
            <p className="text-xs text-white/40 leading-relaxed font-medium">
              You earn reputation through helpful feedback, community interactions, and academy completions.
            </p>
          </div>

          <div className="p-8 bg-[#121812] border border-white/5 rounded-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="text-white/40" size={20} />
              <h3 className="font-bold uppercase tracking-widest text-white/40 text-xs">Membership Status</h3>
            </div>
            <div className="flex items-center gap-4 py-4 px-5 bg-[#1a201a] rounded-2xl border border-white/5 mb-4 group cursor-help">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                💎
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-tight">Active Elite</h4>
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Growth Network</p>
              </div>
            </div>
            <button className="w-full h-12 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-xs font-bold uppercase tracking-widest">
              Manage Billing
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
}
