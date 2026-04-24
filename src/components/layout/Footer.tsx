import Link from "next/link";

const Footer = () => {
    return (
        <footer className="border-t border-black/[0.05] py-20 bg-background dark:border-white/[0.05]">
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <div className="grid gap-12 md:grid-cols-4">
                    <div className="col-span-2 space-y-6">
                        <Link href="/" className="group flex items-center gap-3 relative hover:scale-[1.02] transition-transform">
                            <div className="h-10 flex-shrink-0 flex items-center">
                                <img 
                                    src="/signet-brand-logo.svg" 
                                    alt="Signet Logo" 
                                    className="h-10 w-auto object-contain"
                                />
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
