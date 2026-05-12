"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden">
      <Navbar />
      
      <div className="flex flex-1 pt-[69px] md:pt-0">
        <Sidebar aria-label="Main Navigation" />
        <main className="flex-1 min-w-0 overflow-x-hidden relative pb-[110px] md:pb-0 md:pl-[88px]">
          {children}
        </main>
      </div>

      <MobileBottomNav />
    </div>
  );
}
