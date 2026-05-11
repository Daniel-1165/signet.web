"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  const isLandingPage = pathname === "/" || pathname === "/features" || pathname === "/vision-guide";

  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden">
      <Navbar />
      
      <div className={`flex flex-1 ${!isDashboard ? "pt-[69px] md:pt-0" : "pt-0"}`}>
        {!isDashboard && <Sidebar />}
        <main className={`flex-1 w-full min-w-0 overflow-x-hidden relative ${!isDashboard ? "pb-[110px] md:pb-0 md:pl-[88px]" : "pb-0"}`}>
          {children}
        </main>
      </div>

      <MobileBottomNav />
    </div>
  );
}
