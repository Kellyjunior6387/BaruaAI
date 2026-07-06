import { createClient } from '@/lib/supabase/server';
import UserMenu from '@/components/ui/UserMenu';
import Link from 'next/link';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-slate-50/50 text-gray-800 flex flex-col font-sans">
      {/* Sleek Combined Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-100/80 bg-white/95 backdrop-blur shadow-sm">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link
              href="/dashboard"
              className="text-xl font-extrabold tracking-tight text-[#D4537E] hover:opacity-90 transition-opacity flex items-center space-x-1.5"
            >
              <span>Barua</span>
              <span className="text-base">💌</span>
            </Link>
            <span className="hidden sm:inline-block h-4 w-px bg-gray-200" />
            <span className="hidden sm:inline-block text-xs font-bold text-gray-400 tracking-wider uppercase">
              Creator Hub
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/create"
              className="bg-[#D4537E] text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-[#c3436d] hover:shadow-md transition-all duration-300"
            >
              + New Barua
            </Link>
            <UserMenu email={user?.email} />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-8">
        {children}
      </main>
    </div>
  );
}
