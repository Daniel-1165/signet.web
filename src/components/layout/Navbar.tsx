'use client'

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Shield } from "lucide-react";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { useSupabaseClient } from "@/lib/supabase/client";
import {
  Home, Users, FolderOpen, Brain, Lightbulb, Target, Award, Info,
  MessageCircle
} from "lucide-react";
import { useScrollDirection } from "@/hooks/useScrollDirection";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/#about-us" },
  { label: "Programs", href: "/#programs" },
  { label: "Resources", href: "/resources" },
  { label: "Community", href: "/dashboard/community" },
  { label: "Contact Us", href: "/contact" },
];

const sidebarLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "About Us", href: "/features", icon: Info },
  { label: "Resources", href: "/resources", icon: FolderOpen },
  { label: "Community", href: "/dashboard/community", icon: Users },
  { label: "Contact", href: "/contact", icon: MessageCircle },
  { label: "EQ Test", href: "/eq-test", icon: Brain },
  { label: "IQ Test", href: "/iq-test", icon: Lightbulb },
  { label: "Vision Guide", href: "/vision-guide", icon: Target },
  { label: "Certificates", href: "/certificates", icon: Award },
];

// Pages with dark hero backgrounds where navbar text should be white
const DARK_HERO_ROUTES: string[] = [];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const isVisible = useScrollDirection();
  const isDashboard = pathname.startsWith("/dashboard");

  const { user, isLoaded, isSignedIn } = useUser();
  const supabase = useSupabaseClient();
  const [isAdmin, setIsAdmin] = useState(false);

  // Determine if this page has a dark hero (navbar needs white text when not scrolled)
  const hasDarkHero = DARK_HERO_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
  // Dark hero pages get white text, light pages get dark text
  const isLightText = hasDarkHero;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (user) {
      supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single()
        .then(({ data }) => {
          setIsAdmin(data?.role === "admin");
        }, () => {
          setIsAdmin(false);
        });
    } else {
      setIsAdmin(false);
    }
  }, [user, supabase]);



  return (
    <>

      {/* ════════════════════════════════════════════════════════════
          MOBILE TOP BAR  (hidden on dashboard pages — DashboardSidebar handles nav)
      ════════════════════════════════════════════════════════════ */}
      {!isDashboard && (
      <header
        className={`hidden sm:flex md:hidden fixed left-0 right-0 z-[50] items-center justify-between px-6 h-[69px] border-b border-rule bg-canvas/85 backdrop-blur-xl transition-transform duration-500 motion-reduce:transition-none top-0 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 flex-shrink-0 flex items-center">
            <img
              src="/signet-brand-logo.svg"
              alt=""
              className="h-7 w-auto object-contain"
            />
          </div>
          <span className="font-display font-semibold text-lg tracking-tight text-ink">
            SIGNET
          </span>
        </Link>

        {/* Right side: User Profile & Hamburger */}
        <div className="flex items-center gap-4">
          {isLoaded && isSignedIn ? (
            <div className="w-8 h-8 rounded-full overflow-hidden border border-rule">
               <UserButton appearance={{ elements: { avatarBox: "w-full h-full" } }} />
            </div>
          ) : (
             <SignUpButton mode="modal">
               {/* One name for this action everywhere: "Join SIGNET" in the
                   hero, "Join" here, "Join" in the panel. It previously read
                   JOIN / Get Started / Learn More across three surfaces for
                   the identical sign-up modal. */}
               <button className="btn-primary text-xs px-5 py-2.5">
                 Join
               </button>
             </SignUpButton>
          )}

          {/* Hamburger — hidden on dashboard pages (DashboardSidebar handles nav there) */}
          {!isDashboard && (
            <button
              id="mobile-menu-btn"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open menu"
              className="w-8 h-8 flex items-center justify-center text-ink"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 7h14M5 12h14M5 17h14" />
              </svg>
            </button>
          )}
        </div>
      </header>
      )} {/* end !isDashboard mobile header */}

      {/* ════════════════════════════════════════════════════════════
          MOBILE SLIDE-IN SIDEBAR PANEL
      ════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 bg-ink/50 backdrop-blur-sm z-[60]"
              onClick={() => setIsSidebarOpen(false)}
            />

            <motion.div
              key="panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden fixed top-0 right-0 h-full w-[280px] bg-canvas z-[70] flex flex-col shadow-2xl"
            >
              {/* Panel header - Text Logo */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-rule">
                <Link
                  href="/"
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex items-center"
                >
                  <span className="font-display font-semibold text-ink text-xl tracking-tight">
                    SIGNET
                  </span>
                </Link>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-mist/60 hover:bg-mist transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4 text-ink" />
                </button>
              </div>

              {/* Nav Links */}
              <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto no-scrollbar">
                {sidebarLinks.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsSidebarOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-sm tracking-tight transition-all ${
                        isActive ? "bg-mist text-seal" : "text-ink hover:bg-mist/50"
                      }`}
                    >
                      <item.icon className="w-4 h-4 shrink-0 text-seal" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Panel Footer — auth actions */}
              <div className="px-6 pb-8 pt-4 border-t border-rule space-y-3">
                {isLoaded && (
                  isSignedIn ? (
                    <div className="flex items-center gap-3 px-2 py-2">
                      <UserButton appearance={{ elements: { avatarBox: "w-9 h-9" } }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold text-ink truncate">
                          {user?.fullName || user?.firstName || "Member"}
                        </p>
                        <p className="text-[11px] text-ink/45 truncate">
                          {user?.primaryEmailAddress?.emailAddress}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <SignInButton mode="modal">
                        <button className="btn-secondary w-full">
                          Sign in
                        </button>
                      </SignInButton>
                      <SignUpButton mode="modal">
                        <button className="btn-primary w-full">
                          Join <ArrowRight className="h-4 w-4" />
                        </button>
                      </SignUpButton>
                    </>
                  )
                )}

                {isAdmin && isSignedIn && (
                  <Link
                    href="/dashboard/admin"
                    onClick={() => setIsSidebarOpen(false)}
                    className="w-full h-10 mt-1 px-3 bg-wax/10 border border-wax/25 text-wax rounded-full font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-wax/15 transition-colors"
                  >
                    <Shield className="w-4 h-4" /> Admin
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════════
          DESKTOP NAV BAR
      ════════════════════════════════════════════════════════════ */}
      {/* NOTE: this block is `hidden` with no responsive unhide, so it renders
          at no breakpoint — desktop navigation is handled by Sidebar instead.
          Left switched off deliberately (turning it on would overlap the
          rail), but restyled so it is on-brand if it is ever brought back. */}
      <nav
        className={`hidden fixed z-[50] w-full transition-all duration-500 top-0 py-[21px] ${
          isScrolled ? "bg-canvas/85 backdrop-blur-2xl border-b border-rule py-[15px]" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-10 lg:px-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
            <div className="h-8 flex-shrink-0 flex items-center">
              <img 
                src="/signet-brand-logo.svg" 
                alt="Signet Logo" 
                className={`h-7 w-auto object-contain transition-all duration-300 ${isLightText && !isScrolled ? "brightness-[10]" : ""}`}
              />
            </div>
          </Link>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8 font-sans">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm font-semibold tracking-wide transition-all relative py-2 ${
                  isLightText && !isScrolled
                    ? "text-canvas/80 hover:text-canvas"
                    : "text-ink/70 hover:text-seal"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth CTA */}
          <div className="flex items-center gap-6">
            {isLoaded && (
              isSignedIn ? (
                <div className="flex items-center gap-4">
                  <UserButton appearance={{ elements: { avatarBox: "w-9 h-9 border-2 border-verdant/30" } }} />
                  {isAdmin && (
                    <Link
                      href="/dashboard/admin"
                      className="h-9 px-4 flex items-center justify-center bg-wax/10 text-wax border border-wax/25 rounded-full font-mono font-medium text-[10px] uppercase tracking-[0.14em] hover:bg-wax hover:text-canvas transition-all"
                    >
                      Admin
                    </Link>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-6">
                  <SignInButton mode="modal">
                    <button className={`text-sm font-semibold transition-colors ${
                      isLightText && !isScrolled ? "text-canvas/80 hover:text-canvas" : "text-ink/60 hover:text-ink"
                    }`}>
                      Sign in
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    {/* Was labelled "Learn More" while opening a sign-up modal.
                        A control should say what it actually does. */}
                    <button className="btn-primary">
                      Join SIGNET
                    </button>
                  </SignUpButton>
                </div>
              )
            )}
          </div>
        </div>
      </nav>


    </>
  );
};

export default Navbar;
