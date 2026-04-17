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
        const { data: searchProfile, error: searchError } = await supabase
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
        <nav
            className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled
                ? "bg-white py-4 shadow-md border-b border-black/5"
                : "bg-transparent py-6"
                }`}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <Link href="/" className="group flex items-center gap-3 relative">
                        <div className="absolute inset-0 -z-10 rounded-full bg-signet-green/0 blur-xl transition-all duration-500 group-hover:bg-signet-green/20"></div>
                        <svg viewBox="0 0 100 50" className="h-8 w-auto text-foreground transition-transform duration-500 group-hover:scale-105" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="21" cy="18" r="8" fill="currentColor" stroke="none" />
                            <circle cx="50" cy="12" r="10" fill="currentColor" stroke="none" />
                            <circle cx="79" cy="18" r="8" fill="currentColor" stroke="none" />
                            <path d="M6,42 L21,28 L35.5,42 L50,27 L64.5,42 L79,28 L94,42" />
                        </svg>
                        <div className="flex flex-col text-[10px] font-bold leading-[1.1] tracking-widest uppercase text-foreground transition-colors duration-500">
                            <span>Signet</span>
                            <span>Network</span>
                        </div>
                    </Link>
                </motion.div>

                <div className="hidden items-center gap-10 md:flex">
                    {["Home", "Features", "Resources", "Community"].map((item, i) => (
                        <motion.div
                            key={item}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
                            className="relative group"
                        >
                            <Link
                                href={item === "Home" ? "/" : item === "Features" ? "/features" : item === "Community" ? "/community" : item === "Resources" ? "/resources" : `#${item.toLowerCase()}`}
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
                                <UserButton
                                    appearance={{
                                        elements: {
                                            avatarBox: "w-9 h-9"
                                        }
                                    }}
                                />
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

                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.05] md:hidden"
                >
                    {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-black/[0.05] bg-white py-8 md:hidden"
                    >
                        <div className="flex flex-col items-center gap-6 px-6">
                            {["Home", "Features", "Products", "Community"].map((item) => (
                                <Link
                                    key={item}
                                    href={item === "Home" ? "/" : item === "Features" ? "/features" : item === "Community" ? "/community" : `#${item.toLowerCase()}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-lg font-medium tracking-tight text-foreground/60 hover:text-foreground"
                                >
                                    {item}
                                </Link>
                            ))}
                            <Show when="signed-in">
                                <Link
                                    href="/dashboard"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-lg font-medium tracking-tight text-foreground/60 hover:text-foreground"
                                >
                                    Dashboard
                                </Link>
                                <div className="mt-4">
                                    <UserButton />
                                </div>
                            </Show>
                            <Show when="signed-out">
                                <SignInButton mode="modal">
                                    <button className="mt-4 flex h-14 w-full items-center justify-center rounded-full bg-black text-base font-bold text-white">
                                        Join Network
                                    </button>
                                </SignInButton>
                            </Show>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

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
        </nav>
    );
};

export default Navbar;
