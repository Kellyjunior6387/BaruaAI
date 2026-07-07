import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import CreatePageClient from '@/app/create/CreatePageClient';
import type { Experience } from '@/types';

interface EditPageProps {
  params: {
    id: string;
  };
}

export default async function EditExperiencePage({ params }: EditPageProps) {
  const { id } = params;

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?redirect=/dashboard/${id}/edit`);
  }

  // Fetch the experience to edit, ensuring it belongs to the current user
  const { data: experience, error } = await supabase
    .from('experiences')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (error || !experience) {
    console.error('Error fetching experience for edit:', error);
    redirect('/dashboard');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-24 bg-rose-50/30 text-foreground w-full">
      <CreatePageClient userId={user.id} initialExperience={experience as Experience} />
    </main>
  );
}
