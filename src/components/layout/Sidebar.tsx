"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Users, 
  FolderOpen, 
  Settings, 
  LogOut, 
  Brain, 
  Lightbulb, 
  Target,
  Search,
  Sparkles,
  Award,
  Info
} from "lucide-react";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { useScrollDirection } from "@/hooks/useScrollDirection";

const desktopNavItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "About Us", href: "/features", icon: Info },
  { name: "Resources", href: "/resources", icon: FolderOpen },
  { name: "Community", href: "/community", icon: Users },
  { name: "EQ Test", href: "/eq-test", icon: Brain },
  { name: "IQ Assessment", href: "/iq-test", icon: Lightbulb },
  { name: "Vision Guide", href: "/vision-guide", icon: Target },
  { name: "Certificates", href: "/certificates", icon: Award },
];

const mobileNavItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Resource", href: "/resources", icon: FolderOpen },
  { name: "Search", href: "#", icon: Search }, // Search in center
  { name: "Community", href: "/community", icon: Users },
  { name: "About", href: "/features", icon: Info },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();
  const isVisible = useScrollDirection();

  return (
    <>
      {/* Mobile Bottom Navigation - Native App Style */}
      <div className={`md:hidden fixed bottom-0 left-0 w-full z-[60] bg-white border-t border-[#0D120E]/5 pb-safe flex items-center justify-between px-2 h-[72px] shadow-[0_-4px_24px_rgba(0,0,0,0.03)] transition-transform duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
        {mobileNavItems.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/");
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full gap-1.5 transition-colors duration-200 ${isActive ? 'text-[#1DA756]' : 'text-[#0D120E]/40 hover:text-[#0D120E]/70'}`}
            >
              <div className={`relative flex items-center justify-center w-8 h-8 rounded-full ${isActive ? 'bg-[#1DA756]/10' : 'bg-transparent'}`}>
                <item.icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-[2px]'}`} />
              </div>
              <span className={`text-[10px] leading-none ${isActive ? 'font-bold' : 'font-medium'}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Desktop Minimal White Sidebar Navigation (Untitled UI style) */}
      <aside className={`
        group hidden md:flex flex-col fixed top-0 left-0 z-50 h-screen
        bg-white border-r border-[#0D120E]/5 py-6
        transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
        w-[72px] hover:w-[260px] overflow-hidden shadow-[0_4px_40px_rgba(0,0,0,0.02)]
      `}>
      
      {/* Brand Icon/Logo */}
      <div className="px-4 mb-8 flex items-center gap-4 whitespace-nowrap overflow-hidden">
        <Link href="/" className="shrink-0 w-10 h-10 flex items-center justify-center hover:scale-[1.05] transition-transform">
          <img src="/logo-dark.svg" alt="Signet Logo" className="w-8 h-8 rounded-lg shadow-sm" />
        </Link>
        <div className="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mt-1">
          <span className="font-extrabold text-[#0D120E] text-[13px] tracking-widest uppercase leading-none font-heading">Signet</span>
          <span className="font-medium text-[#0D120E]/50 text-[9px] tracking-[0.2em] uppercase mt-0.5">Community</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1.5 px-3 overflow-y-auto overflow-x-hidden no-scrollbar">
        {desktopNavItems.map((item, i) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/");
          // Fake some badges exactly like the Untitled UI image ("Drafts 10", "Scheduled 2", etc.)
          const count = item.name === "Community" ? 12 : item.name === "About Us" ? 3 : null;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3.5 px-3 py-2.5 rounded-xl transition-all duration-300 whitespace-nowrap overflow-hidden ${
                isActive 
                  ? "bg-black/[0.04] text-[#0D120E]" 
                  : "text-[#0D120E]/60 hover:text-[#0D120E] hover:bg-black/[0.02]"
              }`}
            >
              <item.icon className={`w-[20px] h-[20px] shrink-0 transition-colors ${isActive ? 'text-[#0D120E] stroke-[2.2px]' : 'text-[#0D120E]/50 stroke-[1.8px]'}`} />
              <span className={`font-semibold text-[13px] opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none tracking-wide flex-1 ${isActive ? "text-[#0D120E]" : "text-[#0D120E]/80"}`}>
                {item.name}
              </span>
              
              {count && (
                <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 h-5 px-2 rounded-full bg-[#0D120E] text-white text-[10px] font-bold flex items-center justify-center pointer-events-none">
                  {count}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="pt-4 mt-4 border-t border-[#0D120E]/5 px-3 space-y-1.5 relative overflow-hidden">
         <Link
          href="/settings"
          className="flex items-center gap-3.5 px-3 py-2.5 rounded-xl transition-all duration-300 text-[#0D120E]/60 hover:text-[#0D120E] hover:bg-black/[0.02] whitespace-nowrap overflow-hidden"
         >
          <Settings className="w-[20px] h-[20px] shrink-0 stroke-[1.8px]" />
          <span className="font-semibold text-[13px] text-[#0D120E]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-wide">Settings</span>
         </Link>

         <SignOutButton>
           <button className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl transition-all duration-300 text-red-500/70 hover:text-red-600 hover:bg-red-500/[0.05] whitespace-nowrap overflow-hidden">
             <LogOut className="w-[20px] h-[20px] shrink-0 stroke-[1.8px]" />
             <span className="font-semibold text-[13px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-wide">Log out</span>
           </button>
         </SignOutButton>

        {/* User Profile Summary */}
        <div className="mt-4 px-2 py-2 rounded-xl border border-transparent hover:border-[#0D120E]/5 hover:bg-black/[0.02] flex items-center gap-3 whitespace-nowrap transition-all duration-300 group/profile overflow-hidden cursor-pointer">
          <div className="w-8 h-8 shrink-0 rounded-full bg-black/5 overflow-hidden flex items-center justify-center font-bold text-[#1DA756] mx-auto group-hover:mx-0 transition-all shadow-sm">
             {user?.imageUrl ? (
                <img src={user.imageUrl} alt="User Profile" className="w-full h-full object-cover" />
             ) : (
                user?.firstName?.charAt(0) || "U"
             )}
          </div>
          <div className="flex-1 opacity-0 w-0 group-hover:w-auto group-hover:opacity-100 transition-all duration-300 overflow-hidden">
            <p className="text-[13px] font-bold truncate text-[#0D120E]">
               {user?.fullName || user?.firstName || "Anonymous"}
            </p>
            <p className="text-[11px] font-medium text-[#0D120E]/40 truncate mt-0.5">
               {user?.primaryEmailAddress?.emailAddress || "Member"}
            </p>
          </div>
        </div>
      </div>
    </aside>
    </>
  );
}
