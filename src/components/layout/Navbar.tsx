'use client'

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Shield } from "lucide-react";
import { SignInButton, UserButton, Show, useUser } from "@clerk/nextjs";
import { useSupabaseClient } from "@/lib/supabase/client";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Admin state
    const { user } = useUser();
    const supabase = useSupabaseClient();
    const [isAdmin, setIsAdmin] = useState(false);
    const [showAdminModal, setShowAdminModal] = useState(false);
    const [targetUser, setTargetUser] = useState("");
    const [adminActionStatus, setAdminActionStatus] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (user) {
            supabase.from('profiles').select('role').eq('id', user.id).single().then(({ data }) => {
                if (data && data.role === 'admin') {
                    setIsAdmin(true);
                }
            });
        }
    }, [user, supabase]);

    const handleMakeAdmin = async () => {
        if (!targetUser.trim()) return;
        setAdminActionStatus("Processing...");
        const { data: searchProfile } = await supabase
            .from('profiles')
            .select('id, first_name')
            .ilike('first_name', targetUser.trim())
            .limit(1)
            .single();

        if (searchProfile) {
            const { error: updateError } = await supabase
                .from('profiles')
                .update({ role: 'admin' })
                .eq('id', searchProfile.id);
            if (updateError) {
                setAdminActionStatus("Error: " + updateError.message);
            } else {
                setAdminActionStatus(`Success! ${searchProfile.first_name || targetUser} is now an admin.`);
                setTargetUser("");
                setTimeout(() => { setShowAdminModal(false); setAdminActionStatus(""); }, 2000);
            }
        } else {
            setAdminActionStatus("User not found!");
        }
    };

    return (
        <>
            {/* ── MOBILE TOP BAR ── */}
            <div className={`md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 h-[60px] transition-all duration-300 ${isScrolled ? 'bg-white shadow-sm border-b border-black/5' : 'bg-white/90 backdrop-blur-md'}`}>
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
                    <img src="/logo-dark.svg" alt="Signet" className="h-9 w-9 rounded-xl shadow-sm" />
                    <span className="font-extrabold text-[#0D120E] text-sm tracking-widest uppercase">Signet</span>
                </Link>

                {/* Right: User + Hamburger */}
                <div className="flex items-center gap-3">
                    <Show when="signed-in">
                        <div className="flex items-center justify-center p-[2px] rounded-full border border-black/10 bg-white shadow-sm">
                            <UserButton appearance={{ elements: { avatarBox: "w-8 h-8" } }} />
                        </div>
                    </Show>
                    <button
                        id="mobile-menu-toggle"
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="w-10 h-10 flex items-center justify-center rounded-full border border-black/[0.08] bg-white shadow-sm hover:bg-black/5 transition-colors"
                        aria-label="Open menu"
                    >
                        <Menu className="h-5 w-5 text-[#0D120E]" />
                    </button>
                </div>
            </div>

            {/* ── MOBILE SIDEBAR OVERLAY ── */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* Slide-in panel from right */}
                        <motion.div
                            key="panel"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="md:hidden fixed top-0 right-0 h-full w-[280px] bg-white z-[70] flex flex-col shadow-2xl"
                        >
                            {/* Panel Header */}
                            <div className="flex items-center justify-between px-6 py-5 border-b border-black/5">
                                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2.5">
                                    <img src="/logo-dark.svg" alt="Signet" className="h-9 w-9 rounded-xl shadow-sm" />
                                    <span className="font-extrabold text-[#0D120E] text-sm tracking-widest uppercase">Signet</span>
                                </Link>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-9 h-9 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors"
                                    aria-label="Close menu"
                                >
                                    <X className="h-4 w-4 text-[#0D120E]" />
                                </button>
                            </div>

                            {/* Nav Links */}
                            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                                {[
                                    { label: "Home", href: "/" },
                                    { label: "About Us", href: "/features" },
                                    { label: "Resources", href: "/resources" },
                                    { label: "Community", href: "/community" },
                                ].map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-[#0D120E]/70 hover:text-[#0D120E] hover:bg-black/[0.04] font-semibold text-sm tracking-tight transition-all"
                                    >
                                        {item.label}
                                    </Link>
                                ))}

                                <Show when="signed-in">
                                    <Link
                                        href="/dashboard"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-[#1DA756] hover:bg-[#1DA756]/5 font-bold text-sm tracking-tight transition-all"
                                    >
                                        Dashboard →
                                    </Link>
                                </Show>
                            </nav>

                            {/* Panel Footer */}
                            <div className="px-6 pb-8 pt-4 border-t border-black/5">
                                <Show when="signed-out">
                                    <SignInButton mode="modal">
                                        <button className="w-full flex h-12 items-center justify-center gap-2 rounded-full bg-[#0D120E] text-white font-bold text-sm tracking-wide hover:bg-[#0D120E]/90 transition-all">
                                            Join Network
                                            <ArrowRight className="h-4 w-4" />
                                        </button>
                                    </SignInButton>
                                </Show>
                                <Show when="signed-in">
                                    {isAdmin && (
                                        <button
                                            onClick={() => { setShowAdminModal(true); setIsMobileMenuOpen(false); }}
                                            className="w-full h-10 mt-3 px-3 bg-[#1DA756]/10 border border-[#1DA756]/20 text-[#1DA756] rounded-full font-bold text-xs flex items-center justify-center gap-1.5"
                                        >
                                            <Shield className="w-4 h-4" /> Admin Panel
                                        </button>
                                    )}
                                </Show>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* ── DESKTOP NAV ── */}
            <nav className={`hidden md:block fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled
                ? "bg-white py-4 shadow-md border-b border-black/5"
                : "bg-white md:bg-transparent py-4 md:py-6 border-b border-black/5 md:border-transparent"
                }`}
            >
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Link href="/" className="group flex items-center gap-3 relative hover:scale-[1.02] transition-transform">
                            <div className="absolute inset-0 -z-10 rounded-xl bg-black/5 blur-xl transition-all duration-500 group-hover:bg-black/10"></div>
                            <img src="/logo-dark.svg" alt="Signet Logo" className="h-11 w-11 rounded-xl shadow-lg ring-1 ring-white/10" />
                        </Link>
                    </motion.div>

                    <div className="hidden items-center gap-10 md:flex">
                        {["Home", "About Us", "Resources", "Community"].map((item, i) => (
                            <motion.div
                                key={item}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
                                className="relative group"
                            >
                                <Link
                                    href={item === "Home" ? "/" : item === "About Us" ? "/features" : item === "Community" ? "/community" : item === "Resources" ? "/resources" : `#${item.toLowerCase()}`}
                                    className="relative py-2 text-sm font-bold tracking-tight text-black transition-colors hover:text-black/70 inline-flex items-center gap-1"
                                >
                                    {item}
                                    <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-signet-green transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </motion.div>
                        ))}

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="flex items-center gap-4"
                        >
                            <Show when="signed-in">
                                <UserButton appearance={{ elements: { avatarBox: "w-9 h-9" } }} />
                                {isAdmin && (
                                    <button
                                        onClick={() => setShowAdminModal(true)}
                                        className="h-9 px-3 bg-accent/10 border border-accent/20 text-accent rounded-full font-bold text-xs flex items-center gap-1.5 hover:bg-accent hover:text-white transition-colors ml-3"
                                    >
                                        <Shield className="w-4 h-4" /> Admin
                                    </button>
                                )}
                            </Show>
                        </motion.div>

                        <Show when="signed-out">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <SignInButton mode="modal">
                                    <button className="group flex h-10 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-white transition-all hover:bg-foreground/90 hover:shadow-md hover:shadow-black/5">
                                        Join Network
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </button>
                                </SignInButton>
                            </motion.div>
                        </Show>
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
                            <h3 className="text-xl font-bold mb-2 flex items-center gap-2"><Shield className="text-accent h-5 w-5" /> Admin Panel</h3>
                            <p className="text-xs text-black/50 mb-6">Promote a user to Admin by entering their exact username (First Name).</p>

                            <input
                                type="text"
                                placeholder="Username"
                                value={targetUser}
                                onChange={(e) => setTargetUser(e.target.value)}
                                className="w-full px-4 py-3 bg-black/5 border border-black/10 rounded-xl text-sm mb-4 focus:outline-none focus:border-accent"
                            />
                            {adminActionStatus && <p className="text-xs font-bold text-accent mb-4">{adminActionStatus}</p>}
                            <button
                                onClick={handleMakeAdmin}
                                disabled={!targetUser.trim()}
                                className="w-full bg-accent text-white py-3 rounded-xl font-bold tracking-wide hover:bg-accent/90 transition-colors disabled:opacity-50"
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
