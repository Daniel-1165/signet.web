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
          setIsAdmin(data?.role === 'admin');
        }, () => {
          setIsAdmin(false);
        });
    } else {
      setIsAdmin(false);
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
          // The rail previously expanded on hover only, so a keyboard user
          // tabbing through it saw icons with no labels at any point. Focus
          // now opens it the same way the pointer does.
          onFocus={() => setIsExpanded(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsExpanded(false);
          }}
          animate={{ width: isExpanded ? 280 : 88 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:flex flex-col fixed top-0 left-0 z-[45] h-screen bg-surface border-r border-rule py-8 overflow-hidden"
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
                aria-current={isActive ? "page" : undefined}
                // The collapsed rail shows icons only, so each link needs an
                // accessible name that survives the label being unmounted.
                title={item.name}
                aria-label={item.name}
                className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative ${
                  isActive
                    ? "bg-seal text-canvas"
                    : "text-ink/50 hover:text-ink hover:bg-mist/50"
                }`}
              >
                <item.icon
                  className={`w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                    isActive ? "stroke-[2.2px]" : "stroke-[1.8px]"
                  }`}
                />
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="font-semibold text-[13px] whitespace-nowrap"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
                {isActive && !isExpanded && (
                  <motion.div layoutId="active-dot" className="absolute right-0 w-1.5 h-1.5 bg-verdant rounded-full translate-x-3" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="mt-auto px-4 pt-6 border-t border-rule space-y-2">
          <SignOutButton>
            {/* Sign out is the one destructive control here, so it keeps a red
                — but a muted brick rather than a UI-kit red, so it belongs to
                the same page as everything else. */}
            <button
              aria-label="Sign out"
              title="Sign out"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#9B3A2F]/70 hover:text-[#9B3A2F] hover:bg-[#9B3A2F]/[0.06] transition-all"
            >
              <LogOut className="w-5 h-5 shrink-0 stroke-[1.8px]" />
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="font-semibold text-[13px] whitespace-nowrap"
                  >
                    Sign out
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </SignOutButton>

          {/* User Profile */}
          <div className="mt-2 px-2 py-2 rounded-2xl border border-rule flex items-center gap-3">
            <div className="w-10 h-10 shrink-0 rounded-xl bg-mist overflow-hidden flex items-center justify-center font-mono font-medium text-seal">
              {user?.imageUrl ? (
                <img src={user.imageUrl} alt="" className="w-full h-full object-cover" />
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
                  <p className="text-[12px] font-semibold truncate text-ink leading-none mb-1">
                    {user?.fullName || user?.firstName || "Member"}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/45 truncate leading-none">
                    Member
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
