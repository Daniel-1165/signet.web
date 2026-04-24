import Link from "next/link";

const Footer = () => {
    return (
        <footer className="border-t border-black/[0.05] py-20 bg-background dark:border-white/[0.05]">
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <div className="grid gap-12 md:grid-cols-4">
                    <div className="col-span-2 space-y-6">
                        <Link href="/" className="group flex items-center gap-3 relative hover:scale-[1.02] transition-transform">
                            <div className="w-10 h-10 flex-shrink-0">
                                <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="22" cy="42" r="12" fill="#1DA756" />
                                    <circle cx="50" cy="24" r="18" fill="#1DA756" />
                                    <circle cx="78" cy="42" r="12" fill="#1DA756" />
                                    <path 
                                        d="M8,82 L22,52 L36,76 L50,38 L64,76 L78,52 L92,82" 
                                        stroke="#107C5F" 
                                        strokeWidth="12" 
                                        strokeLinecap="square" 
                                        strokeLinejoin="miter" 
                                        fill="none" 
                                    />
                                </svg>
                            </div>
                            <div className="flex flex-col leading-none font-bold text-[#0D120E] dark:text-white text-[10px] tracking-tight uppercase">
                                <span>Silent</span>
                                <span>Growth</span>
                                <span>Network</span>
                            </div>
                        </Link>
                        <p className="max-w-xs text-sm leading-relaxed text-foreground/50">
                            Build your life right. A community dedicated to continuous growth, mindful living, and mature discipline.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">Platform</h4>
                        <ul className="space-y-2 text-sm text-foreground/50">
                            <li><Link href="#" className="hover:text-foreground">Growth Modules</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Mentorship</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Resources</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">Community</h4>
                        <ul className="space-y-2 text-sm text-foreground/50">
                            <li><Link href="#" className="hover:text-foreground">Events</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Stories</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Guidelines</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-20 flex flex-col items-center justify-between border-t border-black/[0.05] pt-8 md:flex-row dark:border-white/[0.05]">
                    <p className="text-xs text-foreground/40 font-medium">
                        © {new Date().getFullYear()} Signet Network. All rights reserved.
                    </p>
                    <div className="mt-4 flex gap-6 md:mt-0">
                        <Link href="#" className="text-xs text-foreground/30 hover:text-foreground">Privacy Policy</Link>
                        <Link href="#" className="text-xs text-foreground/30 hover:text-foreground">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
