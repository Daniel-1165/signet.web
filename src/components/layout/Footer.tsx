"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useUser, SignInButton, SignOutButton } from "@clerk/nextjs";
import { useSupabaseClient } from "@/lib/supabase/client";
import { Mail, Instagram, ArrowRight, Shield, MessageCircle, Facebook } from "lucide-react";
import SealMark from "@/components/brand/SealMark";

const contactLinks = [
  { icon: MessageCircle, href: "https://wa.me/2349032387758?text=Hi%20Signet%20Network%2C%20I%20need%20help%20with...", label: "WhatsApp" },
  { icon: Mail, href: "mailto:info@signet.org?subject=Support%20Request", label: "Email" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
];

const Footer = () => {
    const { user, isSignedIn, isLoaded } = useUser();
    const supabase = useSupabaseClient();
    const [isAdmin, setIsAdmin] = useState(false);
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

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

    // Automatically pre-fill the email when Clerk loads the user info
    useEffect(() => {
        if (isLoaded && isSignedIn && user?.primaryEmailAddress?.emailAddress) {
            setEmail(user.primaryEmailAddress.emailAddress);
        }
    }, [user, isSignedIn, isLoaded]);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        try {
            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: {
 "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    name: user?.fullName || user?.firstName || "Anonymous Subscriber",
                }),
            });

            const data = await res.json();
            if (res.ok) {
                setStatus("success");
                setMessage(data.message || "Subscribed successfully to Signet");
            } else {
                setStatus("error");
                setMessage(data.error || "Something went wrong. Please try again.");
            }
        } catch (err) {
            console.error("Subscription error:", err);
            setStatus("error");
            setMessage("Failed to submit. Please check your connection.");
        }
    };

    return (
        <footer className="bg-ink on-ink pt-16 pb-8 relative overflow-hidden">
            {/* The footer is the one full-ink surface on the public site. It
                closes the page the way a seal closes a letter — which is also
                why the mark lives here. */}
            <div className="absolute -bottom-10 -right-10 opacity-[0.13] pointer-events-none hidden md:block">
                <SealMark size={280} tone="canvas" />
            </div>

            <div className="page-container relative z-10">
                {/* Upper Section with Newsletter */}
                <div className="grid lg:grid-cols-2 gap-10 pb-12 border-b border-verdant/15">
                    <div>
                        <h3 className="font-display text-3xl md:text-4xl font-semibold tracking-[-0.025em] text-canvas mb-4">
                            Stay in the <span className="text-verdant">silent loop</span>.
                        </h3>
                        <p className="text-mist/65 text-[15px] leading-relaxed max-w-md">
                            A monthly brief on intentional growth — no noise, just substance.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3 justify-center">
                        {isLoaded && !isSignedIn ? (
                            <div className="flex flex-col gap-2.5">
                                <div className="flex w-full bg-canvas/[0.06] rounded-[var(--radius-lg)] p-1.5 border border-verdant/20 items-center">
                                    <input
                                        type="email"
                                        disabled
                                        aria-label="Email address"
                                        placeholder="Sign in to subscribe"
                                        className="flex-1 min-w-0 bg-transparent px-3 md:px-4 py-2.5 text-sm outline-none text-mist/40 cursor-not-allowed"
                                    />
                                    <SignInButton mode="modal">
                                        <button className="shrink-0 bg-verdant text-ink px-5 py-2.5 rounded-xl font-semibold text-xs hover:bg-mist transition-colors flex items-center gap-2">
                                            Sign in <ArrowRight size={14} />
                                        </button>
                                    </SignInButton>
                                </div>
                                {/* Explains the constraint plainly instead of
                                    gesturing at it with a padlock emoji. */}
                                <p className="text-[11px] text-mist/50 ml-2">
                                    Sign in first so we can attach your name to the subscription.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubscribe} className="flex flex-col gap-2.5">
                                <div className="flex w-full bg-canvas/[0.06] rounded-[var(--radius-lg)] p-1.5 border border-verdant/20 focus-within:border-verdant transition-colors items-center">
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        aria-label="Email address"
                                        placeholder="you@example.com"
                                        className="flex-1 min-w-0 bg-transparent px-3 md:px-4 py-2.5 text-sm outline-none text-canvas placeholder:text-mist/35"
                                        disabled={status === "loading" || status === "success"}
                                    />
                                    <button
                                        type="submit"
                                        disabled={status === "loading" || status === "success" || !email}
                                        className="shrink-0 bg-verdant disabled:opacity-40 text-ink px-5 py-2.5 rounded-xl font-semibold text-xs hover:bg-mist transition flex items-center gap-2"
                                    >
                                        {status === "loading" ? "Subscribing…" : "Subscribe"} <ArrowRight size={14} />
                                    </button>
                                </div>
                                {/* One live region for both outcomes, so a
                                    screen reader hears the result without
                                    having to go looking for it. The success
                                    message no longer pulses — a confirmation
                                    that keeps moving reads as unresolved. */}
                                <p
                                    role="status"
                                    aria-live="polite"
                                    className={`text-xs ml-2 min-h-[1rem] ${
                                        status === "error" ? "text-[#E2A08F]" : "text-verdant"
                                    }`}
                                >
                                    {status === "success" || status === "error" ? message : ""}
                                </p>
                            </form>
                        )}
                        <p className="font-mono text-[10px] text-mist/35 uppercase tracking-[0.2em] ml-2">
                            No noise. Just substance.
                        </p>
                    </div>
                </div>

                {/* Middle Section with Links - More Compact */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 py-12">
                    {/* Brand Column */}
                    <div className="col-span-2 lg:col-span-1 space-y-6">
                        <Link href="/" className="block">
                            <img
                                src="/signet-brand-logo.svg"
                                alt="SIGNET"
                                className="h-8 w-auto object-contain brightness-0 invert opacity-90"
                            />
                        </Link>
                        <p className="text-[13px] text-mist/60 leading-relaxed max-w-xs">
                            The curated ecosystem for high-performers seeking impact over volume.
                        </p>
                        <div className="flex gap-3">
                            {contactLinks.map((item, i) => (
                                <a
                                    key={i}
                                    href={item.href}
                                    target={item.href.startsWith("http") ? "_blank" : undefined}
                                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                    className="w-9 h-9 rounded-full border border-verdant/25 flex items-center justify-center text-mist/70 hover:bg-verdant hover:text-ink hover:border-verdant transition-colors"
                                    aria-label={item.label}
                                >
                                    <item.icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Platform Links */}
                    <div>
                        <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist/45 mb-6">Platform</h4>
                        <ul className="space-y-3">
                            {[
                                { name: "Dashboard", href: "/dashboard" },
                                { name: "Resources", href: "/resources" },
                                { name: "Exercises", href: "/dashboard/exercises" }
                            ].map(link => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-[13px] text-mist/70 hover:text-canvas transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support & Legal */}
                    <div>
                        <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist/45 mb-6">Collective</h4>
                        <ul className="space-y-3">
                            {[
                                { name: "About Us", href: "/features" },
                                { name: "Community Hub", href: "/dashboard/community" },
                                { name: "Mentorship", href: "/join" }
                            ].map(link => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-[13px] text-mist/70 hover:text-canvas transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-verdant/15 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                    <p className="font-mono text-[10px] text-mist/40 uppercase tracking-[0.18em]">
                        © {new Date().getFullYear()} Silent Growth Network.
                    </p>

                    <div className="flex items-center gap-4 font-mono text-[10px] text-mist/55 uppercase tracking-[0.18em]">
                        <span>Established in Silence</span>
                        <div className="w-1 h-1 rounded-full bg-verdant/60" />
                        <span>Architected for Growth</span>
                    </div>
                </div>

                {/* Sign Out & Admin text links as the absolute last thing in the footer */}
                {isLoaded && isSignedIn && (
                    <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-verdant/15 text-[11px] tracking-wide text-mist/60">
                        {isAdmin && (
                            <Link href="/dashboard/admin" className="text-verdant hover:text-mist transition-colors flex items-center gap-1.5 font-semibold">
                                <Shield className="w-3.5 h-3.5" /> Admin
                            </Link>
                        )}
                        {isAdmin && <span className="w-1 h-1 rounded-full bg-verdant/40" />}
                        <SignOutButton>
                            <button className="text-[#E2A08F] hover:text-[#F0C4B7] transition-colors font-semibold cursor-pointer">
                                Sign out
                            </button>
                        </SignOutButton>
                    </div>
                )}
            </div>
        </footer>
    );
};

export default Footer;
