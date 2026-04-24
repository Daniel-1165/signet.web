"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, Users, FolderOpen, Settings, LogOut,
  Brain, Lightbulb, Target, Search, Award, Info,
  ChevronRight,
} from "lucide-react";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useState } from "react";

const desktopNavItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "About Signet", href: "/features", icon: Info },
  { name: "Resources", href: "/resources", icon: FolderOpen },
  { name: "Community", href: "/community", icon: Users },
  { name: "EQ Test", href: "/eq-test", icon: Brain },
  { name: "IQ Assessment", href: "/iq-test", icon: Lightbulb },
  { name: "Vision Guide", href: "/vision-guide", icon: Target },
  { name: "Certificates", href: "/certificates", icon: Award },
];

const mobileNavItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Resources", href: "/resources", icon: FolderOpen },
  { name: "Community", href: "/community", icon: Users },
  { name: "About", href: "/features", icon: Info },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();
  const isVisible = useScrollDirection();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* ── MOBILE BOTTOM NAV (scroll-aware) ── */}
      <div
        className={`md:hidden fixed bottom-0 left-0 w-full z-[55] bg-white/80 backdrop-blur-lg border-t border-[#0D120E]/5 flex items-center justify-between px-2 h-[68px] shadow-[0_-4px_24px_rgba(0,0,0,0.04)] transition-transform duration-300 ${
          isVisible && pathname !== '/' ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {mobileNavItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (pathname.startsWith(item.href) && item.href !== "/");

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors duration-200 ${
                isActive
                  ? "text-[#1DA756]"
                  : "text-[#0D120E]/70 hover:text-[#0D120E]"
              }`}
            >
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-xl transition-colors ${
                  isActive ? "bg-[#1DA756]/10" : "bg-transparent"
                }`}
              >
                <item.icon
                  className={`w-5 h-5 ${isActive ? "stroke-[2.5px]" : "stroke-[1.8px]"}`}
                />
              </div>
              <span className={`text-[9px] leading-none ${isActive ? "font-bold" : "font-medium"}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>

      {/* ── DESKTOP MODERN SIDEBAR ── */}
      <motion.aside
        initial={false}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        animate={{ width: isExpanded ? 280 : 88 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:flex flex-col fixed top-0 left-0 z-[45] h-screen bg-white border-r border-[#0D120E]/5 py-8 overflow-hidden shadow-[4px_0_24px_rgba(0,0,0,0.02)]"
      >
        {/* Brand/Logo - Only Text */}
        <div className="px-6 mb-10 flex items-center h-12 overflow-hidden">
          <Link href="/" className="flex items-center gap-3">
            <span className={`font-black text-[#0D120E] text-2xl tracking-tighter uppercase font-heading transition-all duration-300 ${!isExpanded ? "scale-75 -ml-1" : ""}`}>
              SIGNET
            </span>
          </Link>
        </div>

        {/* Navigation - No Scrollbar */}
        <nav className="flex-1 px-4 space-y-1.5 no-scrollbar overflow-y-auto">
          {desktopNavItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (pathname.startsWith(item.href) && item.href !== "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative ${
                  isActive
                    ? "bg-[#1DA756] text-white shadow-lg shadow-[#1DA756]/20"
                    : "text-[#0D120E]/50 hover:text-[#0D120E] hover:bg-black/[0.03]"
                }`}
              >
                <item.icon
                  className={`w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                    isActive ? "stroke-[2.5px]" : "stroke-[1.8px]"
                  }`}
                />
                
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="font-bold text-[13px] whitespace-nowrap"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>

                {isActive && !isExpanded && (
                  <motion.div
                    layoutId="active-dot"
                    className="absolute right-0 w-1.5 h-1.5 bg-white rounded-full translate-x-3"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="mt-6 pt-6 border-t border-[#0D120E]/5 px-4 space-y-2">
          <Link
            href="/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#0D120E]/50 hover:text-[#0D120E] hover:bg-black/[0.03] transition-all"
          >
            <Settings className="w-5 h-5 shrink-0 stroke-[1.8px]" />
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="font-bold text-[13px] whitespace-nowrap"
                >
                  Settings
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <SignOutButton>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500/60 hover:text-red-600 hover:bg-red-50/50 transition-all">
              <LogOut className="w-5 h-5 shrink-0 stroke-[1.8px]" />
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="font-bold text-[13px] whitespace-nowrap"
                  >
                    Logout
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </SignOutButton>

          {/* User Profile */}
          <div className="mt-4 px-2 py-2 rounded-2xl border border-black/[0.03] bg-black/[0.01] flex items-center gap-3 whitespace-nowrap transition-all duration-300">
            <div className="w-10 h-10 shrink-0 rounded-xl bg-[#1DA756]/10 overflow-hidden flex items-center justify-center font-bold text-[#1DA756] border border-[#1DA756]/5 shadow-inner">
              {user?.imageUrl ? (
                <img src={user.imageUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                user?.firstName?.charAt(0) || "U"
              )}
            </div>
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex flex-col min-w-0"
                >
                  <p className="text-[12px] font-black truncate text-[#0D120E] leading-none mb-1">
                    {user?.fullName || user?.firstName || "Member"}
                  </p>
                  <p className="text-[10px] font-bold text-[#1DA756] truncate leading-none">
                    View profile
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
