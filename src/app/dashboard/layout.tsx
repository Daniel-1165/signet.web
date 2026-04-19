import DashboardSidebar from "@/components/layout/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#0D120E]">
      {/* Persistent Sidebar */}
      <DashboardSidebar />
      
      {/* Main Content Area */}
      <main className="flex-1 md:pl-64 flex flex-col min-h-screen">
        <div className="flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-8 py-8">
          {children}
        </div>
      </main>
      
      {/* Universal Glow Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1DA756]/5 blur-[120px]" />
        <div className="absolute bottom-0 left-64 w-[400px] h-[400px] bg-[#1DA756]/5 blur-[150px]" />
      </div>
    </div>
  );
}
