"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { Home, FolderOpen, Users, Compass } from "lucide-react";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/" || pathname === "/features" || pathname === "/vision-guide";
  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Library", href: "/resources", icon: FolderOpen },
    { label: "Community", href: "/community", icon: Users },
    { label: "About", href: "/features", icon: Compass },
  ];

  return (
    <div className="flex flex-col min-h-screen relative">
      {pathname !== "/features" && pathname !== "/resources" && <Navbar />}
      <div className={`flex flex-1 ${!isLandingPage && pathname !== "/resources" ? "pt-[80px] md:pt-0" : ""}`}>
        {!isLandingPage && <Sidebar />}
        <main className={`flex-1 w-full overflow-x-hidden relative ${!isLandingPage ? "pb-[80px] md:pb-0 md:pl-[88px]" : ""}`}>
          {children}
        </main>
      </div>
      {pathname !== "/" && <MobileBottomNav items={navItems} />}
    </div>
  );
}
