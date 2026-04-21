import Link from "next/link";

const Footer = () => {
    return (
        <footer className="border-t border-black/[0.05] py-20 bg-background dark:border-white/[0.05]">
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <div className="grid gap-12 md:grid-cols-4">
                    <div className="col-span-2 space-y-6">
                        <Link href="/" className="group flex items-center gap-3 relative hover:scale-[1.02] transition-transform">
                            <div className="w-10 h-10 flex-shrink-0">
                                <svg viewBox="0 0 100 80" className="w-full h-full text-[#0D120E] dark:text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="25" cy="20" r="12" />
                                    <circle cx="50" cy="12" r="14" />
                                    <circle cx="75" cy="20" r="12" />
                                    <path d="M10,65 L30,40 L50,65 L70,40 L90,65" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
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
