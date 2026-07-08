import CreatorNavbar from '@/components/ui/CreatorNavbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50/50 text-gray-800 flex flex-col font-sans">
      <CreatorNavbar />

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-8">
        {children}
      </main>
    </div>
  );
}
