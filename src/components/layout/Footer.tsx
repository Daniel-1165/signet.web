import Link from "next/link";

const Footer = () => {
    return (
        <footer className="border-t border-black/[0.05] py-20 bg-background dark:border-white/[0.05]">
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <div className="grid gap-12 md:grid-cols-4">
                    <div className="col-span-2 space-y-6">
                        <Link href="/" className="group flex items-center gap-3">
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
