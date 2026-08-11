import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import Link from "next/link";
import {
  Search,
  Bell,
  Calendar,
  Eye,
  ArrowRight,
} from "lucide-react";
import Testimonials from "@/components/sections/Testimonials";
import Process from "@/components/sections/Process";
import Footer from "@/components/layout/Footer";
import PillarsGrid from "@/components/sections/PillarsGrid";

export default async function DashboardPage() {
  const user = await currentUser();
  const { userId } = await auth();

  if (!userId || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-canvas text-ink">
        <h1 className="h2">Not signed in</h1>
        <p className="lede mt-3 mb-6">Sign in to reach your dashboard.</p>
        <Link href="/" className="btn-primary">Go to home</Link>
      </div>
    );
  }

  const supabase = createServerSupabaseClient();
  
  let { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .single();

  if (error && error.code === 'PGRST116') {
    const { data: newProfile, error: insertError } = await supabase
       .from('profiles')
       .insert({
         id: userId,
         email: user.emailAddresses[0].emailAddress,
         first_name: user.firstName,
         last_name: user.lastName,
         image_url: user.imageUrl
       })
       .select()
       .single();
    
    if (!insertError) profile = newProfile;
  }

  return (
    <div className="min-h-screen bg-canvas text-ink selection:bg-rule/40 selection:text-ink pb-24 md:pb-12 pt-0 md:pt-6">
      {/* Editorial Header */}
      <header className="hidden md:flex items-center justify-between page-container py-8 border-b border-rule mb-8">
        <div>
           <h1 className="font-display text-3xl font-semibold tracking-[-0.025em] text-ink">
             Welcome back, <span className="text-seal">{user.firstName}</span>.
           </h1>
           <p className="text-sm text-ink/60 mt-1.5">Your intentional growth continues today.</p>
        </div>
        <div className="flex items-center gap-8">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
            <input
              type="text"
              aria-label="Search conversations"
              placeholder="Search conversations…"
              className="pl-11 pr-5 py-2.5 bg-surface rounded-full text-sm border border-rule focus:border-seal outline-none transition-colors w-72 text-ink"
            />
          </div>
          <div className="flex items-center gap-5">
            {/* These were `text-ink hover:text-ink` — a hover state that
                changed nothing. Muted at rest, full ink on hover. */}
            <button aria-label="Notifications" className="text-ink/55 hover:text-ink transition-colors relative">
               <Bell className="w-5 h-5" />
               <div className="absolute -top-1 -right-1 w-2 h-2 bg-wax rounded-full border-2 border-canvas" />
            </button>
            <button aria-label="Calendar" className="text-ink/55 hover:text-ink transition-colors"><Calendar className="w-5 h-5" /></button>
            <div className="w-10 h-10 rounded-full overflow-hidden border border-rule hover:scale-105 transition-transform"><UserButton /></div>
          </div>
        </div>
      </header>

      <div className="page-container space-y-12 md:space-y-20">
        {/* Premium Hero Section */}
        <section className="relative w-full h-[420px] md:h-[500px] md:rounded-[var(--radius-lg)] overflow-hidden group on-ink">
          <img src="/forest_hero_bg.png" alt="" className="absolute inset-0 w-full h-full object-cover brightness-[0.72] saturate-[0.85] group-hover:scale-[1.03] transition-transform duration-[3s] motion-reduce:transition-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/65 to-ink/25" />

          <div className="relative h-full flex flex-col justify-center px-6 md:px-16 lg:px-24 w-full overflow-hidden">
            <span className="eyebrow eyebrow-on-ink mb-6">Silent Growth Network</span>
            <h2 className="h1 text-canvas mb-8 max-w-4xl">
              Become intentional about{" "}
              <span className="text-verdant">growth</span>
              <br className="hidden md:block" /> and development.
            </h2>
            <Link href="/dashboard/community" className="flex items-center gap-3 group/btn text-canvas w-fit">
               <span className="text-sm font-semibold border-b border-verdant/50 group-hover/btn:border-verdant pb-1 transition-colors">Join the community</span>
               <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover/btn:translate-x-1.5 transition-transform motion-reduce:transition-none" />
            </Link>
          </div>
        </section>


        {/* Philosophical Foundations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mirrors the public Vision/Mission pair: one pressed into the
              paper, one struck in ink. Same idea, same treatment, so the
              dashboard reads as the same brand rather than a separate app. */}
          <div className="card md:p-12 relative">
            <Eye className="absolute top-6 right-6 md:top-12 md:right-12 w-5 h-5 text-ink/20" />
            <span className="eyebrow mb-5">The Vision</span>
            <p className="font-display text-xl md:text-[28px] font-semibold text-ink leading-[1.3] tracking-[-0.02em]">
              To build a global network of trailblazers who{" "}
              <span className="text-seal">model and replicate excellence</span> in
              diverse spheres.
            </p>
          </div>

          <div className="card-ink md:p-12 flex flex-col justify-center">
            <span className="eyebrow eyebrow-on-ink mb-5">The Mission</span>
            <p className="font-display text-lg md:text-2xl text-canvas leading-[1.35]">
              Ordinary persons achieving{" "}
              <span className="text-verdant">extraordinary results</span> — silently
              and sustainably.
            </p>
          </div>
        </div>

        {/* Growth Architecture */}
        <div className="space-y-10">
           <div className="text-center max-w-2xl mx-auto flex flex-col items-center">
              <span className="eyebrow mb-5">Methodology</span>
              <h3 className="h2">
                Growth <span className="text-seal">architecture</span>
              </h3>
              <p className="lede mt-4">The pillars of the SIGNET methodology.</p>
           </div>

           <PillarsGrid />
        </div>

        {/* Final Roadmap */}
        <div className="py-16 md:py-20 border-t border-rule">
            <Process />
        </div>

        {/* Community & Legacy — Testimonials carries its own heading, so the
            duplicate one that sat above it has been removed. */}
        <div className="py-16 md:py-20 border-t border-rule">
            <Testimonials />
        </div>
      </div>

      <Footer />
    </div>
  );
}
