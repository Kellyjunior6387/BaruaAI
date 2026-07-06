import { createClient } from '@/lib/supabase/server';
import Navbar from '@/components/landing/Navbar';
import LandingPageClient from './LandingPageClient';

export default async function Home() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isLoggedIn = !!user;

  return (
    <main className="min-h-screen bg-white">
      {/* Dynamic Header Navbar */}
      <Navbar isLoggedIn={isLoggedIn} />

      {/* Interactive Marketing Page Layout */}
      <LandingPageClient />
    </main>
  );
}
