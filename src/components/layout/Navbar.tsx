'use client'

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Shield } from "lucide-react";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { useSupabaseClient } from "@/lib/supabase/client";
import {
  Home, Users, FolderOpen, Brain, Lightbulb, Target, Award, Info,
} from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/features" },
  { label: "Resources", href: "/resources" },
  { label: "Community", href: "/community" },
];

const sidebarLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "About Us", href: "/features", icon: Info },
  { label: "Resources", href: "/resources", icon: FolderOpen },
  { label: "Community", href: "/community", icon: Users },
  { label: "EQ Test", href: "/eq-test", icon: Brain },
  { label: "IQ Assessment", href: "/iq-test", icon: Lightbulb },
  { label: "Vision Guide", href: "/vision-guide", icon: Target },
  { label: "Certificates", href: "/certificates", icon: Award },
];

// Pages with dark hero backgrounds where navbar text should be white
const DARK_HERO_ROUTES = ["/", "/features"];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const { user, isLoaded, isSignedIn } = useUser();
  const supabase = useSupabaseClient();
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [targetUser, setTargetUser] = useState("");
  const [adminActionStatus, setAdminActionStatus] = useState("");

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
          if (data?.role === "admin") setIsAdmin(true);
        });
    }
  }, [user, supabase]);

  const handleMakeAdmin = async () => {
    if (!targetUser.trim()) return;
    setAdminActionStatus("Processing...");
    const { data: profile } = await supabase
      .from("profiles")
      .select("id, first_name")
      .ilike("first_name", targetUser.trim())
      .limit(1)
      .single();

    if (profile) {
      const { error } = await supabase
        .from("profiles")
        .update({ role: "admin" })
        .eq("id", profile.id);
      if (error) {
        setAdminActionStatus("Error: " + error.message);
      } else {
        setAdminActionStatus(`Success! ${profile.first_name || targetUser} is now an admin.`);
        setTargetUser("");
        setTimeout(() => { setShowAdminModal(false); setAdminActionStatus(""); }, 2000);
      }
    } else {
      setAdminActionStatus("User not found!");
    }
  };

  return (
    <>

      {/* ════════════════════════════════════════════════════════════
          MOBILE TOP BAR  (visible on all screen sizes < md)
      ════════════════════════════════════════════════════════════ */}
      <header
        className="md:hidden fixed left-0 right-0 z-[50] flex items-center justify-between px-5 h-[70px] transition-all duration-300 top-0 bg-transparent"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          {/* Logo Image */}
          <div className="w-10 h-10 flex-shrink-0 flex items-center">
            <img 
              src="/signet-brand-logo.svg" 
              alt="Signet Logo" 
              className={`h-10 w-auto object-contain transition-all duration-300 ${isLightText ? "brightness-[10]" : ""}`}
              style={isLightText ? { filter: "brightness(10)" } : undefined}
            />
          </div>
        </Link>

        {/* Right side: hamburger */}
        <div className="flex items-center gap-4">
          {/* Join button */}
          {!isLoaded && (
             <SignUpButton mode="modal">
               <button className="px-5 py-2 text-[11px] font-bold text-white bg-[#1DA756] rounded-full shadow-lg shadow-[#1DA756]/20">
                 Join
               </button>
             </SignUpButton>
          )}
          {isLoaded && !isSignedIn && (
             <SignUpButton mode="modal">
               <button className="px-5 py-2 text-[11px] font-bold text-white bg-[#1DA756] rounded-full shadow-lg shadow-[#1DA756]/20">
                 Join
               </button>
             </SignUpButton>
          )}
          {isSignedIn && (
            <div className="flex items-center justify-center p-[2px] rounded-full border border-black/10 bg-white shadow-sm">
              <UserButton appearance={{ elements: { avatarBox: "w-8 h-8" } }} />
            </div>
          )}

          {/* Custom Hamburger — always visible */}
          <button
            id="mobile-menu-btn"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open menu"
            className="w-10 h-10 flex items-center justify-center"
          >
            <svg viewBox="0 0 24 24" className={`w-6 h-6 ${isLightText ? "text-white" : "text-[#0D120E]"}`} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="10" y1="17" x2="20" y2="17" />
            </svg>
          </button>
        </div>
      </header>

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
              className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
              onClick={() => setIsSidebarOpen(false)}
            />

            <motion.div
              key="panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden fixed top-0 right-0 h-full w-[280px] bg-white z-[70] flex flex-col shadow-2xl"
            >
              {/* Panel header - Text Logo */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-black/[0.06]">
                <Link
                  href="/"
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex items-center"
                >
                  <span className="font-black text-[#0D120E] text-xl tracking-tighter uppercase font-heading">
                    SIGNET
                  </span>
                </Link>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-black/[0.05] hover:bg-black/[0.09] transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4 text-[#0D120E]" />
                </button>
              </div>

              {/* Nav Links */}
              <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                {sidebarLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl text-[#0D120E]/60 hover:text-[#0D120E] hover:bg-black/[0.04] font-semibold text-sm tracking-tight transition-all"
                  >
                    <item.icon className="w-4 h-4 shrink-0 text-[#0D120E]/35" />
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Panel Footer — auth actions */}
              <div className="px-6 pb-8 pt-4 border-t border-black/[0.05] space-y-3">
                {isLoaded && (
                  isSignedIn ? (
                    <div className="flex items-center gap-3 px-2 py-2">
                      <UserButton appearance={{ elements: { avatarBox: "w-9 h-9" } }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-bold text-[#0D120E] truncate">
                          {user?.fullName || user?.firstName || "Member"}
                        </p>
                        <p className="text-[11px] text-[#0D120E]/40 truncate">
                          {user?.primaryEmailAddress?.emailAddress}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <SignInButton mode="modal">
                        <button className="w-full h-11 flex items-center justify-center rounded-full border border-black/[0.1] text-sm font-bold text-[#0D120E] hover:bg-black/[0.04] transition-colors">
                          Login
                        </button>
                      </SignInButton>
                      <SignUpButton mode="modal">
                        <button className="w-full h-11 flex items-center justify-center gap-2 rounded-full bg-[#1DA756] text-white text-sm font-bold hover:bg-[#158C45] transition-colors shadow-md shadow-[#1DA756]/20">
                          Get Started <ArrowRight className="h-4 w-4" />
                        </button>
                      </SignUpButton>
                    </>
                  )
                )}

                {isAdmin && isSignedIn && (
                  <button
                    onClick={() => { setShowAdminModal(true); setIsSidebarOpen(false); }}
                    className="w-full h-10 mt-1 px-3 bg-[#1DA756]/10 border border-[#1DA756]/20 text-[#1DA756] rounded-full font-bold text-xs flex items-center justify-center gap-1.5"
                  >
                    <Shield className="w-4 h-4" /> Admin Panel
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════════
          DESKTOP NAV BAR
      ════════════════════════════════════════════════════════════ */}
      <nav
        className="hidden md:block fixed z-[50] w-full transition-all duration-300 top-0 bg-transparent py-6"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="h-10 flex-shrink-0 flex items-center">
              <img 
                src="/signet-brand-logo.svg" 
                alt="Signet Logo" 
                className={`h-10 w-auto object-contain transition-all duration-300`}
                style={isLightText ? { filter: "brightness(10)" } : undefined}
              />
            </div>
          </Link>

          {/* Links */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`relative group py-2 text-sm font-bold tracking-tight transition-colors ${isLightText ? "text-white hover:text-white/80" : "text-[#0D120E] hover:text-[#0D120E]/70"}`}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#1DA756] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Auth - Only shows Join when scrolled or in specialized context */}
          <div className="hidden md:flex items-center gap-3">
            {isLoaded && (
              isSignedIn ? (
                <>
                  <UserButton appearance={{ elements: { avatarBox: "w-9 h-9" } }} />
                  {isAdmin && (
                    <button
                      onClick={() => setShowAdminModal(true)}
                      className="h-9 px-3 bg-[#1DA756]/10 border border-[#1DA756]/20 text-[#1DA756] rounded-full font-bold text-xs flex items-center gap-1.5 hover:bg-[#1DA756] hover:text-white transition-colors"
                    >
                      <Shield className="w-4 h-4" /> Admin
                    </button>
                  )}
                </>
              ) : (
                <>
                  <SignInButton mode="modal">
                    <button className={`h-10 px-5 text-sm font-bold rounded-full transition-colors ${isLightText ? "text-white/90 border border-white/20 hover:bg-white/10" : "text-[#0D120E]/70 border border-black/[0.1] hover:bg-black/[0.04]"}`}>
                      Login
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="group h-10 px-6 flex items-center gap-2 rounded-full bg-[#0D120E] text-white text-sm font-bold hover:bg-[#0D120E]/85 transition-all shadow-sm">
                      Join Now
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </SignUpButton>
                </>
              )
            )}
          </div>
        </div>
      </nav>

      {/* Admin Modal */}
      <AnimatePresence>
        {showAdminModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-sm relative"
            >
              <button onClick={() => setShowAdminModal(false)} className="absolute top-4 right-4 text-black/40 hover:text-black">
                <X className="h-5 w-5" />
              </button>
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Shield className="text-[#1DA756] h-5 w-5" /> Admin Panel
              </h3>
              <p className="text-xs text-black/50 mb-6">Promote a user to Admin by entering their First Name.</p>
              <input
                type="text"
                placeholder="Username"
                value={targetUser}
                onChange={(e) => setTargetUser(e.target.value)}
                className="w-full px-4 py-3 bg-black/[0.05] border border-black/[0.1] rounded-xl text-sm mb-4 focus:outline-none focus:border-[#1DA756]"
              />
              {adminActionStatus && (
                <p className="text-xs font-bold text-[#1DA756] mb-4">{adminActionStatus}</p>
              )}
              <button
                onClick={handleMakeAdmin}
                disabled={!targetUser.trim()}
                className="w-full bg-[#1DA756] text-white py-3 rounded-xl font-bold tracking-wide hover:bg-[#158C45] transition-colors disabled:opacity-50"
              >
                Make Admin
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
