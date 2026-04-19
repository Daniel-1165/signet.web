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
  Award
} from "lucide-react";
import { useUser, SignOutButton } from "@clerk/nextjs";

const desktopNavItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Features", href: "/features", icon: Sparkles },
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
  { name: "Feature", href: "/features", icon: Sparkles },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <>
      {/* Mobile Bottom Navigation Bar styled like Twitter/Instagram */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-[60] bg-white border-t border-black/5 pb-safe pt-2 px-6 flex items-center justify-between shadow-[0_-8px_30px_rgba(0,0,0,0.04)] h-16">
        {mobileNavItems.map((item, index) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/");
          const isCenter = index === 2; // Search icon at the center
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center relative w-12 h-12 rounded-full transition-all duration-300 ${isCenter ? 'bg-[#1DA756] text-white shadow-lg -translate-y-4 hover:scale-105' : (isActive ? 'text-[#1DA756]' : 'text-black/50 hover:bg-black/5 hover:text-black')}`}
            >
              <item.icon className={`w-6 h-6 ${isCenter || isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
              {isActive && !isCenter && (
                 <span className="w-1.5 h-1.5 bg-[#1DA756] rounded-full absolute -bottom-1"></span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Desktop Dark Sleek Sidebar with Hover Expand Animation */}
      <aside className={`
        group hidden md:flex flex-col fixed top-0 left-0 z-50 h-screen
        bg-[#0D120E] border-r border-white/5 py-8
        transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
        w-20 hover:w-64 overflow-hidden shadow-2xl
      `}>
      
      {/* Brand Icon/Logo */}
      <div className="px-4 mb-10 flex items-center gap-4 whitespace-nowrap pl-[1.25rem]">
        <div className="shrink-0 w-10 h-10 flex items-center justify-center">
          <svg viewBox="0 0 100 50" className="w-8 h-auto text-[#1DA756]" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
              <circle cx="21" cy="18" r="8" fill="currentColor" stroke="none" />
              <circle cx="50" cy="12" r="10" fill="currentColor" stroke="none" />
              <circle cx="79" cy="18" r="8" fill="currentColor" stroke="none" />
              <path d="M6,42 L21,28 L35.5,42 L50,27 L64.5,42 L79,28 L94,42" />
          </svg>
        </div>
        <span className="font-extrabold text-[#1DA756] text-lg tracking-widest uppercase opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
          Signet
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 px-3 overflow-y-auto overflow-x-hidden no-scrollbar">
        {desktopNavItems.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-3.5 py-3 rounded-2xl transition-all duration-300 whitespace-nowrap ${
                isActive 
                  ? "bg-[#1DA756]/15 text-[#D3F36B] border border-[#1DA756]/20 shadow-[0_0_15px_rgba(29,167,86,0.1)]" 
                  : "text-white/50 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <item.icon className="w-[22px] h-[22px] shrink-0" />
              <span className="font-bold text-[13px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none tracking-wide">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="pt-6 mt-6 border-t border-white/10 px-3 space-y-2 relative">
         <Link
          href="/settings"
          className="flex items-center gap-4 px-3.5 py-3 rounded-2xl transition-all duration-300 font-bold text-[13px] text-white/50 hover:text-white hover:bg-white/[0.04] whitespace-nowrap"
         >
          <Settings className="w-[22px] h-[22px] shrink-0" />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-wide">Settings</span>
         </Link>

         <SignOutButton>
           <button className="w-full flex items-center gap-4 px-3.5 py-3 rounded-2xl transition-all duration-300 font-bold text-[13px] text-red-400 hover:text-red-300 hover:bg-red-500/10 whitespace-nowrap">
             <LogOut className="w-[22px] h-[22px] shrink-0" />
             <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-wide">Log out</span>
           </button>
         </SignOutButton>

        {/* User Profile Summary */}
        <div className="mt-4 px-2 py-2 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-3 whitespace-nowrap transition-all duration-300 group/profile">
          <div className="w-10 h-10 shrink-0 rounded-full bg-white/10 overflow-hidden flex items-center justify-center font-bold text-[#1DA756] border border-white/5 mx-auto group-hover:mx-0 transition-all">
             {user?.imageUrl ? (
                <img src={user.imageUrl} alt="User Profile" className="w-full h-full object-cover" />
             ) : (
                user?.firstName?.charAt(0) || "U"
             )}
          </div>
          <div className="flex-1 opacity-0 w-0 group-hover:w-auto group-hover:opacity-100 transition-all duration-300 overflow-hidden">
            <p className="text-[13px] font-extrabold truncate text-white">
               {user?.fullName || user?.firstName || "Anonymous"}
            </p>
            <p className="text-[11px] font-medium text-white/40 truncate">
               {user?.primaryEmailAddress?.emailAddress || "Member"}
            </p>
          </div>
        </div>
      </div>
    </aside>
    </>
  );
}
