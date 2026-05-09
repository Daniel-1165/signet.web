import DashboardSidebar from "@/components/layout/DashboardSidebar";

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#F8FAFB]">
      <DashboardSidebar />
      <main className="flex-1 md:pl-64 flex flex-col min-h-screen pt-16 md:pt-0">
        <div className="flex-1 w-full mx-auto px-4 md:px-8 py-8 md:py-8 max-w-[1200px]">
          {children}
        </div>
      </main>
    </div>
  );
}
