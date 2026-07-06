import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import CreatePageClient from './CreatePageClient';

export default async function CreatePage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/create');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-24 bg-rose-50/30 text-foreground w-full">
      <CreatePageClient userId={user.id} />
    </main>
  );
}
