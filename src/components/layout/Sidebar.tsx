"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Compass, BarChart3, Settings, LogOut, Brain, Target, Lightbulb, MessageCircle, Share2, Award } from "lucide-react";
import { useUser, SignOutButton } from "@clerk/nextjs";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Community Feed", href: "/community", icon: Users },
  { name: "EQ Test", href: "/eq-test", icon: Brain },
  { name: "IQ Assessment", href: "/iq-test", icon: Lightbulb },
  { name: "Personal Vision Guide", href: "/vision-guide", icon: Target },
  { name: "Certificates", href: "/certificates", icon: Award },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <aside className="group w-20 hover:w-64 transition-all duration-300 h-[calc(100vh-6rem)] bg-[#F9FBF4] border-r border-[#E0E7E2] flex flex-col py-8 sticky top-24 overflow-hidden shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-40">
      
      {/* Brand Icon/Logo */}
      <div className="px-5 mb-10 flex items-center justify-center lg:justify-start gap-4 whitespace-nowrap">
        <div className="flex items-center justify-center shrink-0 w-8 h-8">
          <svg viewBox="0 0 100 50" className="w-full h-auto text-black" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
              <circle cx="21" cy="18" r="8" fill="currentColor" stroke="none" />
              <circle cx="50" cy="12" r="10" fill="currentColor" stroke="none" />
              <circle cx="79" cy="18" r="8" fill="currentColor" stroke="none" />
              <path d="M6,42 L21,28 L35.5,42 L50,27 L64.5,42 L79,28 L94,42" />
          </svg>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-3 px-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-3 py-3.5 rounded-2xl transition-all duration-300 font-bold text-sm whitespace-nowrap overflow-hidden ${
                isActive 
                  ? "bg-white shadow-[0_4px_12px_rgba(0,0,0,0.04)] text-accent border border-black/5" 
                  : "text-black hover:bg-black/[0.04]"
              }`}
            >
              <item.icon className={`w-6 h-6 shrink-0 ${isActive ? 'text-accent' : 'text-black'}`} />
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Support / Quick Links */}
      <div className="pt-6 border-t border-[#E0E7E2] mb-6 space-y-3 px-3">
         <Link href="/contact" className="flex items-center gap-4 px-3 py-3 rounded-2xl font-bold text-sm text-black hover:text-green-700 hover:bg-green-50 transition-all whitespace-nowrap overflow-hidden">
            <MessageCircle className="w-6 h-6 shrink-0" /> 
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">Contact & Support</span>
         </Link>
      </div>

      {/* Bottom Section */}
      <div className="pt-6 border-t border-[#E0E7E2] px-3 space-y-3">
         <Link
          href="/settings"
          className="flex items-center gap-4 px-3 py-3 rounded-2xl transition-all duration-300 font-bold text-sm text-black hover:bg-black/[0.04] whitespace-nowrap overflow-hidden"
         >
          <Settings className="w-6 h-6 shrink-0" />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">Settings</span>
         </Link>

         <SignOutButton>
           <button className="w-full flex items-center gap-4 px-3 py-3 rounded-2xl transition-all duration-300 font-bold text-sm text-red-600 hover:text-red-700 hover:bg-red-50 whitespace-nowrap overflow-hidden">
             <LogOut className="w-6 h-6 shrink-0" />
             <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">Log out</span>
           </button>
         </SignOutButton>

        {/* User Profile Summary */}
        <div className="mt-6 mx-1 p-2 rounded-[2rem] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-black/[0.02] flex items-center gap-3 whitespace-nowrap overflow-hidden transition-all duration-300">
          <div className="w-10 h-10 shrink-0 rounded-full bg-black/5 overflow-hidden flex items-center justify-center font-bold text-accent">
             {user?.imageUrl ? (
                <img src={user.imageUrl} alt="User Profile" className="w-full h-full object-cover" />
             ) : (
                user?.firstName?.charAt(0) || "U"
             )}
          </div>
          <div className="flex-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 overflow-hidden">
            <p className="text-sm font-extrabold truncate text-black">
               {user?.fullName || user?.firstName || "Anonymous"}
            </p>
            <p className="text-xs font-bold text-black/80 truncate">
               {user?.primaryEmailAddress?.emailAddress || "Member"}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
