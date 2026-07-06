import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Calendar, Eye } from 'lucide-react';
import ExperienceDetailActions from '@/components/dashboard/ExperienceDetailActions';
import ResponseWatcher from '@/components/dashboard/ResponseWatcher';

export const dynamic = 'force-dynamic';

interface DetailPageProps {
  params: {
    id: string;
  };
}

export default async function ExperienceDetailPage({ params }: DetailPageProps) {
  const { id } = params;

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?redirect=/dashboard/${id}`);
  }

  // Fetch experience with joined responses and events
  const { data: experience, error } = await supabase
    .from('experiences')
    .select(`
      *,
      responses (
        *
      ),
      events (
        *
      )
    `)
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (error || !experience) {
    console.error('Error fetching experience details:', error);
    redirect('/dashboard');
  }

  const responses = experience.responses || [];
  const response = responses.length > 0 ? responses[0] : null;
  const events = experience.events || [];
  const openCount = events.filter((e: { type: string }) => e.type === 'opened').length;

  const formattedDate = new Date(experience.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Info */}
      <div className="flex flex-col space-y-3">
        <div>
          <Link
            href="/dashboard"
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-white border border-gray-100 hover:border-gray-200 rounded-full text-xs text-gray-500 font-semibold hover:text-[#D4537E] transition-all duration-300 shadow-sm"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-1">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Barua for {experience.recipient_name}
            </h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-gray-400">
              <span className="flex items-center space-x-1.5">
                <Calendar className="w-3.5 h-3.5 opacity-75" />
                <span>Created on {formattedDate}</span>
              </span>
              <span className="h-3 w-px bg-gray-200 hidden sm:inline" />
              <span className="flex items-center space-x-1.5">
                <Eye className="w-3.5 h-3.5 opacity-75" />
                <span>Opened {openCount} {openCount === 1 ? 'time' : 'times'}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Side: Status / Response Watcher */}
        <div className="lg:col-span-2 space-y-6">
          <ResponseWatcher
            experienceId={experience.id}
            recipientName={experience.recipient_name}
            initialResponse={response}
            initialOpenCount={openCount}
          />
        </div>

        {/* Right Side: Quick Action Sidebar */}
        <div className="lg:col-span-1">
          <ExperienceDetailActions
            slug={experience.slug}
            experienceId={experience.id}
            recipientName={experience.recipient_name}
          />
        </div>
      </div>
    </div>
  );
}
