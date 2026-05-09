import Link from "next/link";
import { Mail, Instagram, Twitter, Linkedin, ArrowRight, MapPin, Phone } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-[#FDFCFB] border-t border-[#D8CEBE]/40 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Upper Section with Newsletter */}
                <div className="grid lg:grid-cols-2 gap-16 pb-20 border-b border-[#D8CEBE]/20">
                    <div>
                        <h3 className="text-[32px] font-bold text-[#1D1914] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Stay in the <span className="italic font-normal text-[#6E7A67]">Silent Loop.</span>
                        </h3>
                        <p className="text-[#6E7A67] text-[16px] leading-relaxed max-w-md font-medium">
                            Join our monthly brief on architectural action, professional resilience, and intentional growth strategies.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex bg-white rounded-2xl p-2 border border-[#D8CEBE]/40 shadow-sm focus-within:border-[#6E7A67] transition-all">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="flex-1 bg-transparent px-6 py-3 text-sm outline-none text-[#1D1914] font-medium"
                            />
                            <button className="bg-[#1D1914] text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#6E7A67] transition-all flex items-center gap-2">
                                Subscribe <ArrowRight size={14} />
                            </button>
                        </div>
                        <p className="text-[10px] text-[#6E7A67]/40 uppercase tracking-[0.2em] font-bold ml-4">
                            No noise. Just substance. Unsubscribe anytime.
                        </p>
                    </div>
                </div>

                {/* Middle Section with Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-20">
                    {/* Brand Column */}
                    <div className="space-y-8">
                        <Link href="/" className="block">
                            <img src="/signet-brand-logo.svg" alt="Signet Logo" className="h-10 w-auto object-contain" />
                        </Link>
                        <p className="text-[14px] text-[#6E7A67] leading-relaxed font-medium">
                            The curated ecosystem for high-performers who prefer impact over volume. Built for the silent architects of the future.
                        </p>
                        <div className="flex gap-4">
                            {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                                <Link key={i} href="#" className="w-10 h-10 rounded-full border border-[#D8CEBE]/40 flex items-center justify-center text-[#6E7A67] hover:bg-[#1D1914] hover:text-white hover:border-[#1D1914] transition-all">
                                    <Icon size={18} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Platform Links */}
                    <div>
                        <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#1D1914] mb-8">Platform</h4>
                        <ul className="space-y-4">
                            {[
                                { name: "Dashboard", href: "/dashboard" },
                                { name: "Resources", href: "/resources" },
                                { name: "Exercises", href: "/dashboard/exercises" },
                                { name: "Community Hub", href: "/dashboard/community" },
                                { name: "Mentorship", href: "/join" }
                            ].map(link => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-[14px] text-[#6E7A67] hover:text-[#1D1914] transition-colors font-medium">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support & Legal */}
                    <div>
                        <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#1D1914] mb-8">Support</h4>
                        <ul className="space-y-4">
                            {[
                                { name: "About Us", href: "/features" },
                                { name: "Privacy Policy", href: "#" },
                                { name: "Terms of Growth", href: "#" },
                                { name: "Member Guidelines", href: "#" },
                                { name: "Contact Support", href: "/contact" }
                            ].map(link => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-[14px] text-[#6E7A67] hover:text-[#1D1914] transition-colors font-medium">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#1D1914] mb-8">Headquarters</h4>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <MapPin size={18} className="text-[#6E7A67] shrink-0 mt-0.5" />
                                <p className="text-[14px] text-[#6E7A67] leading-relaxed font-medium">
                                    Savile Row, Mayfair<br />
                                    London, England
                                </p>
                            </div>
                            <div className="flex items-start gap-4">
                                <Phone size={18} className="text-[#6E7A67] shrink-0 mt-0.5" />
                                <p className="text-[14px] text-[#6E7A67] font-medium">+44 (0) 20 7946 0123</p>
                            </div>
                            <div className="flex items-start gap-4">
                                <Mail size={18} className="text-[#6E7A67] shrink-0 mt-0.5" />
                                <p className="text-[14px] text-[#6E7A67] font-medium">collective@signetnetwork.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-12 border-t border-[#D8CEBE]/20 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-[11px] font-bold text-[#6E7A67]/40 uppercase tracking-[0.2em]">
                        © {new Date().getFullYear()} Silent Growth Network. All rights reserved.
                    </p>
                    <div className="flex items-center gap-8">
                        <p className="text-[11px] font-black text-[#1D1914] uppercase tracking-widest">
                            Established in Silence
                        </p>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#6E7A67]" />
                        <p className="text-[11px] font-black text-[#1D1914] uppercase tracking-widest">
                            Architected for Growth
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
