import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function DashboardPage() {
  const user = await currentUser();
  const { userId } = await auth();

  if (!userId || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0f0a] text-white">
        <h1 className="text-2xl font-bold">Unauthorized</h1>
        <Link href="/" className="mt-4 text-[#4ade80] hover:underline">
          Go back home
        </Link>
      </div>
    );
  }

  const supabase = createServerSupabaseClient();
  
  // Try to fetch profile, if not exists, create it (idempotent for this example)
  // In a real app, this should be done via Clerk webhooks to ensure consistency
  let { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .single();

  if (error && error.code === 'PGRST116') {
    // Profile not found, let's create it
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
    <div className="min-h-screen bg-[#0a0f0a] text-white selection:bg-[#4ade80]/30 selection:text-[#4ade80]">
      <nav className="fixed top-0 z-40 w-full border-b border-white/5 bg-[#0a0f0a]/80 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-bold tracking-tighter text-[#4ade80] hover:opacity-80 transition-opacity">
              SIGNET
            </Link>
            <span className="text-white/20">/</span>
            <h1 className="text-sm font-medium tracking-wide uppercase text-white/60">Dashboard</h1>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm hover:text-[#4ade80] transition-colors font-medium">
              Home
            </Link>
            <UserButton />
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-8 pt-32 pb-24">
        {/* Welcome Block */}
        <div className="relative group mb-12">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#4ade80]/5 via-transparent to-transparent opacity-50 rounded-[2.5rem]" />
          <div className="relative bg-[#121812] border border-white/5 rounded-[2.5rem] p-10 md:p-14 overflow-hidden shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center gap-10">
              <div className="relative">
                <div className="w-28 h-28 rounded-3xl overflow-hidden border border-[#4ade80]/20 shadow-2xl shadow-[#4ade80]/5">
                  <img 
                    src={user.imageUrl} 
                    alt={user.firstName || "User"} 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-[#4ade80] flex items-center justify-center text-[#0a0f0a]">
                   <span className="text-xs font-bold">Lvl 1</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#4ade80]/10 text-[#4ade80] text-[10px] font-bold uppercase tracking-widest">Growth Leader</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Collective Member since {new Date(user.createdAt).getFullYear()}</span>
                </div>
                <h2 className="text-5xl font-bold tracking-tight mb-4">
                  Advance, {user.firstName || "Seeker"}.
                </h2>
                <p className="text-white/40 text-lg max-w-xl leading-relaxed">
                  Your path to high-performance and disciplined living continues here. Engage with the hub to accelerate your progress.
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/dashboard/chat" className="block outline-none group">
            <DashboardCard 
              title="Collective Chat" 
              description="Real-time global transmissions with the core."
              icon="🌱"
              accent="green"
            />
          </Link>
          <Link href="/dashboard/community" className="block outline-none group">
            <DashboardCard 
              title="Community Feed" 
              description="Review insights and share your milestones."
              icon="⛓️"
              accent="white"
            />
          </Link>
          <Link href="/dashboard/academy" className="block outline-none group">
            <DashboardCard 
              title="Academy" 
              description="Master the subtle arts of strategic growth."
              icon="🪐"
              accent="white"
            />
          </Link>
          <Link href="/dashboard/settings" className="block outline-none group">
            <DashboardCard 
              title="Identity" 
              description="Refine your profile and system presence."
              icon="💠"
              accent="white"
            />
          </Link>
        </section>
      </main>
    </div>
  );
}

function DashboardCard({ title, description, icon, accent }: { title: string; description: string; icon: string; accent: string }) {
  return (
    <div className={`h-full p-8 bg-[#121812] border border-white/5 rounded-3xl hover:border-${accent === 'green' ? '[#4ade80]' : 'white'}/20 transition-all group flex flex-col items-start shadow-xl`}>
      <div className={`w-14 h-14 mb-8 rounded-2xl bg-[#1a201a] border border-white/5 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-500 shadow-inner`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 group-hover:text-[#4ade80] transition-colors">{title}</h3>
      <p className="text-sm text-white/40 leading-relaxed font-medium">{description}</p>
      
      <div className="mt-auto pt-8 w-full">
         <div className="h-0.5 w-0 group-hover:w-full bg-[#4ade80]/20 transition-all duration-700" />
      </div>
    </div>
  );
}
