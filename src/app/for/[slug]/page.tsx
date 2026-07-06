import { getExperienceBySlug, logEvent } from '@/lib/supabase/queries';
import { createClient } from '@/lib/supabase/server';
import RecipientExperience from '@/components/recipient/RecipientExperience';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function RecipientPage({ params }: PageProps) {
  const { slug } = params;
  
  let experience = null;
  try {
    experience = await getExperienceBySlug(slug);
  } catch (err) {
    console.error('Error fetching experience:', err);
  }

  // If not found or not active -> show a clean, beautiful 404 screen
  if (!experience || experience.status !== 'active') {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-rose-50 text-rose-900 font-serif">
        <div className="text-center space-y-4 max-w-md">
          <div className="text-5xl select-none mb-2">💌</div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-rose-950">
            This Barua doesn&apos;t exist.
          </h1>
          <p className="text-base text-rose-900/80 leading-relaxed">
            It may have already been opened, or the link might be wrong.
          </p>
        </div>
      </main>
    );
  }

  // Log the 'opened' event (non-blocking for UX, but awaited to ensure it is logged)
  try {
    await logEvent(experience.id, 'opened');
  } catch (err) {
    console.error('Failed to log experience opened event:', err);
  }

  // Pre-resolve storage signed URLs for memory photos in parallel on the server
  let memoriesWithUrls: { title: string; photo_path?: string; signedUrl?: string }[] = [];
  if (experience.memories && Array.isArray(experience.memories)) {
    const supabase = createClient();
    memoriesWithUrls = await Promise.all(
      experience.memories.map(async (memory: { title: string; photo_path?: string }) => {
        if (memory.photo_path) {
          try {
            const { data } = await supabase.storage
              .from('experience-photos')
              .createSignedUrl(memory.photo_path, 3600); // 1 hour expiry
            if (data?.signedUrl) {
              return { ...memory, signedUrl: data.signedUrl };
            }
          } catch (err) {
            console.error(`Error signing URL for ${memory.photo_path}:`, err);
          }
        }
        return memory;
      })
    );
  }

  const experienceWithUrls = {
    ...experience,
    memories: memoriesWithUrls,
  };

  return <RecipientExperience experience={experienceWithUrls} />;
}

export async function generateMetadata({ params }: PageProps) {
  const experience = await getExperienceBySlug(params.slug);
  if (!experience) return {};

  return {
    title: `Someone made something for you, ${experience.recipient_name} 💌`,
    description: 'Open this when you have two minutes.',
    openGraph: {
      title: `Someone made something for you, ${experience.recipient_name} 💌`,
      description: 'Open this when you have two minutes.',
      siteName: 'Barua',
    },
    twitter: {
      card: 'summary',
      title: 'Someone made something for you 💌',
      description: 'Open this when you have two minutes.',
    },
  };
}
