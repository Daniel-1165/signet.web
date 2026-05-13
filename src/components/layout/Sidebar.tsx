"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, Users, FolderOpen, LogOut, Brain, Lightbulb, Target, Award, Info, CheckSquare,
} from "lucide-react";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Shield } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    if (user) {
      supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()
        .then(({ data }) => {
          if (data?.role === 'admin') setIsAdmin(true);
        });
    }
  }, [user]);

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Resources", href: "/resources", icon: FolderOpen },
    { name: "Community", href: "/dashboard/community", icon: Users },
    { name: "Exercises", href: "/dashboard/exercises", icon: CheckSquare },
    { name: "Vision Guide", href: "/vision-guide", icon: Target },
    { name: "EQ Test", href: "/eq-test", icon: Brain },
    { name: "IQ Test", href: "/iq-test", icon: Lightbulb },
    { name: "About Signet", href: "/features", icon: Info },
    { name: "Certificates", href: "/certificates", icon: Award },
    ...(isAdmin ? [{ name: "Admin", href: "/dashboard/admin", icon: Shield }] : []),
  ];

  return (
    <>
      <motion.aside
          initial={false}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
          animate={{ width: isExpanded ? 280 : 88 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:flex flex-col fixed top-0 left-0 z-[45] h-screen bg-white border-r border-[#0D120E]/5 py-8 overflow-hidden shadow-[4px_0_24px_rgba(0,0,0,0.02)]"
        >
        {/* Brand/Logo */}
        <div className="px-6 mb-10 flex items-center h-12 overflow-hidden">
          <Link href="/" className="flex items-center gap-3">
            <img 
              src="/signet-brand-logo.svg" 
              alt="Signet Logo" 
              className={`h-10 w-auto object-contain transition-all duration-300 ${!isExpanded ? "scale-75 -ml-1" : ""}`}
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto no-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/");

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
                  <motion.div layoutId="active-dot" className="absolute right-0 w-1.5 h-1.5 bg-white rounded-full translate-x-3" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="mt-auto px-4 pt-6 border-t border-[#0D120E]/5 space-y-2">
          {/* Upgrade Box */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#1DA756]/5 rounded-2xl p-5 border border-[#1DA756]/10 mb-4"
              >
                <h4 className="text-[12px] font-black text-[#0D120E] mb-1 uppercase tracking-tight">Upgrade to Pro</h4>
                <p className="text-[10px] text-[#0D120E]/50 leading-relaxed mb-4 font-bold">Access exclusive mentorship and advanced modules.</p>
                <Link href="/join" className="block w-full py-2.5 rounded-xl bg-[#1DA756] text-white text-center font-bold text-[11px] uppercase tracking-widest shadow-lg shadow-[#1DA756]/20 hover:bg-[#158C45] transition-all">
                   Upgrade Now
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

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
          <div className="mt-2 px-2 py-2 rounded-2xl border border-black/[0.03] bg-black/[0.01] flex items-center gap-3">
            <div className="w-10 h-10 shrink-0 rounded-xl bg-[#1DA756]/10 overflow-hidden flex items-center justify-center font-bold text-[#1DA756] border border-[#1DA756]/5 shadow-inner">
              {user?.imageUrl ? <img src={user.imageUrl} alt="Profile" className="w-full h-full object-cover" /> : (user?.firstName?.charAt(0) || "U")}
            </div>
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex flex-col min-w-0"
                >
                  <p className="text-[12px] font-black truncate text-[#0D120E] leading-none mb-1">{user?.fullName || user?.firstName || "Member"}</p>
                  <p className="text-[10px] font-bold text-[#1DA756] truncate leading-none">View profile</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
