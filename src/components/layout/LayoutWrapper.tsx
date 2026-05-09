"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  const isLandingPage = pathname === "/" || pathname === "/features" || pathname === "/vision-guide";

  return (
    <div className="flex flex-col min-h-screen relative">
      {!isDashboard && <Navbar />}
      <div className={`flex flex-1 ${!isLandingPage && !isDashboard ? "pt-[80px] md:pt-0" : ""}`}>
        {!isDashboard && <Sidebar />}
        <main className={`flex-1 w-full overflow-x-hidden relative ${!isLandingPage && !isDashboard ? "pb-[80px] md:pb-0 md:pl-[88px]" : ""}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
