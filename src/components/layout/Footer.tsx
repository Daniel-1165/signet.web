import Link from "next/link";
import { Mail, Instagram, Twitter, Linkedin, ArrowRight, MapPin, Phone } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-[#F5F7F4] border-t border-[#D8CEBE]/40 pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Upper Section with Newsletter */}
                <div className="grid lg:grid-cols-2 gap-10 pb-12 border-b border-[#D8CEBE]/20">
                    <div>
                        <h3 className="text-[28px] md:text-[32px] font-bold text-[#1D1914] mb-4" >
                            Stay in the <span className="italic font-normal text-[#6E7A67]">Silent Loop.</span>
                        </h3>
                        <p className="text-[#6E7A67] text-[15px] leading-relaxed max-w-md font-medium">
                            Join our monthly brief on architectural action and intentional growth strategies.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3 justify-center">
                        <div className="flex w-full bg-white rounded-2xl p-1 md:p-1.5 border border-[#D8CEBE]/40 shadow-sm focus-within:border-[#6E7A67] transition-all overflow-hidden items-center">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="flex-1 min-w-0 bg-transparent px-2 md:px-4 py-2 md:py-2.5 text-[13px] md:text-sm outline-none text-[#1D1914] font-medium"
                            />
                            <button className="shrink-0 bg-[#1D1914] text-white px-3 md:px-6 py-2 md:py-2.5 rounded-xl font-bold text-[9px] md:text-xs uppercase tracking-widest hover:bg-[#6E7A67] transition-all flex items-center gap-1.5 md:gap-2">
                                Subscribe <ArrowRight size={12} className="md:w-[14px] md:h-[14px]" />
                            </button>
                        </div>
                        <p className="text-[9px] text-[#6E7A67]/40 uppercase tracking-[0.2em] font-bold ml-2">
                            No noise. Just substance.
                        </p>
                    </div>
                </div>

                {/* Middle Section with Links - More Compact */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 py-12">
                    {/* Brand Column */}
                    <div className="col-span-2 lg:col-span-1 space-y-6">
                        <Link href="/" className="block">
                            <img src="/signet-brand-logo.svg" alt="Signet Logo" className="h-8 w-auto object-contain" />
                        </Link>
                        <p className="text-[13px] text-[#6E7A67] leading-relaxed font-medium max-w-xs">
                            The curated ecosystem for high-performers seeking impact over volume.
                        </p>
                        <div className="flex gap-3">
                            {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                                <Link key={i} href="#" className="w-8 h-8 rounded-full border border-[#D8CEBE]/40 flex items-center justify-center text-[#6E7A67] hover:bg-[#1D1914] hover:text-white transition-all">
                                    <Icon size={16} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Platform Links */}
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1D1914] mb-6">Platform</h4>
                        <ul className="space-y-3">
                            {[
                                { name: "Dashboard", href: "/dashboard" },
                                { name: "Resources", href: "/resources" },
                                { name: "Exercises", href: "/dashboard/exercises" }
                            ].map(link => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-[13px] text-[#6E7A67] hover:text-[#1D1914] transition-colors font-medium">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support & Legal */}
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1D1914] mb-6">Collective</h4>
                        <ul className="space-y-3">
                            {[
                                { name: "About Us", href: "/features" },
                                { name: "Community Hub", href: "/dashboard/community" },
                                { name: "Mentorship", href: "/join" }
                            ].map(link => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-[13px] text-[#6E7A67] hover:text-[#1D1914] transition-colors font-medium">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-[#D8CEBE]/20 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                    <p className="text-[10px] font-bold text-[#6E7A67]/40 uppercase tracking-[0.2em]">
                        © {new Date().getFullYear()} Silent Growth Network.
                    </p>
                    <div className="flex items-center gap-4 text-[10px] font-black text-[#1D1914] uppercase tracking-widest">
                        <span>Established in Silence</span>
                        <div className="w-1 h-1 rounded-full bg-[#6E7A67]" />
                        <span>Architected for Growth</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
