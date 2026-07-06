import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Heart, Eye, ArrowRight, Sparkles, Film } from 'lucide-react';
import { relativeTime } from '@/lib/utils/relativeTime';

export const dynamic = 'force-dynamic';

interface ExperienceItem {
  id: string;
  recipient_name: string;
  created_at: string;
  theme: 'romantic' | 'playful' | 'cinematic';
  responses: { id: string; responded_at: string }[];
  events: { id: string; type: string }[];
}

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/dashboard');
  }

  // Fetch experiences, along with responses and events (to count opens) in one query
  const { data: experiences, error } = await supabase
    .from('experiences')
    .select(`
      *,
      responses (
        id,
        responded_at
      ),
      events (
        id,
        type
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching experiences:', error);
  }

  const list = (experiences || []) as unknown as ExperienceItem[];

  if (list.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 max-w-md mx-auto">
        <div className="w-20 h-20 bg-pink-50/50 text-[#D4537E] rounded-3xl flex items-center justify-center shadow-sm border border-pink-100/50">
          <Heart className="w-10 h-10 fill-current animate-pulse text-[#D4537E]" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Create your first Barua</h2>
          <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
            Turn your feelings into a personalised interactive experience. It takes about 10 minutes.
          </p>
        </div>
        <Link
          href="/create"
          className="bg-[#D4537E] text-white px-6 py-3.5 rounded-xl text-sm font-semibold hover:bg-[#c3436d] hover:shadow-md transition-all shadow-sm"
        >
          Create Barua 💌
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="space-y-1.5">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Your Baruas</h2>
        <p className="text-sm text-gray-500">Manage, share, and track your personalized experiences.</p>
      </div>

      {/* Grid Layout of Premium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {list.map((exp: ExperienceItem) => {
          const hasResponse = exp.responses && exp.responses.length > 0;
          const openCount = exp.events ? exp.events.filter((e: { type: string }) => e.type === 'opened').length : 0;
          const relativeCreated = relativeTime(exp.created_at);

          // Get custom styling pills for themes
          const getThemePill = () => {
            switch (exp.theme) {
              case 'romantic':
                return {
                  label: 'Romantic',
                  icon: <Heart className="w-3 h-3 fill-current" />,
                  classes: 'bg-rose-50 text-[#D4537E] border-rose-100/50',
                };
              case 'playful':
                return {
                  label: 'Playful',
                  icon: <Sparkles className="w-3 h-3" />,
                  classes: 'bg-amber-50 text-amber-600 border-amber-100/50',
                };
              case 'cinematic':
                return {
                  label: 'Cinematic',
                  icon: <Film className="w-3 h-3" />,
                  classes: 'bg-slate-50 text-slate-600 border-slate-100',
                };
              default:
                return {
                  label: 'Romantic',
                  icon: <Heart className="w-3 h-3 fill-current" />,
                  classes: 'bg-rose-50 text-[#D4537E] border-rose-100/50',
                };
            }
          };

          const themePill = getThemePill();

          return (
            <Link
              key={exp.id}
              href={`/dashboard/${exp.id}`}
              className="group relative block bg-white rounded-3xl p-6 border border-gray-100/80 shadow-sm hover:shadow-md hover:border-pink-200/40 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex flex-col justify-between h-full space-y-6">
                {/* Top Strip */}
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${themePill.classes}`}>
                    {themePill.icon}
                    <span>{themePill.label}</span>
                  </span>
                  
                  <div className="text-gray-300 group-hover:text-[#D4537E] group-hover:translate-x-0.5 transition-all duration-300">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Recipient Header */}
                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#D4537E] transition-colors leading-tight">
                    {exp.recipient_name}
                  </h3>
                  <p className="text-xs text-gray-400">
                    Created {relativeCreated}
                  </p>
                </div>

                {/* Bottom Stats & Status badges */}
                <div className="flex items-center justify-between border-t border-gray-50 pt-4 mt-2">
                  {hasResponse ? (
                    <span className="bg-pink-50 text-[#D4537E] border border-pink-100/50 rounded-xl px-3 py-1.5 text-[11px] font-bold flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4537E] animate-ping" />
                      <span>Responded! 💌</span>
                    </span>
                  ) : (
                    <span className="bg-slate-50 text-slate-600 border border-slate-100 rounded-xl px-3 py-1.5 text-[11px] font-semibold flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                      <span>Waiting</span>
                    </span>
                  )}

                  <span className="flex items-center space-x-1 text-xs font-semibold text-gray-400">
                    <Eye className="w-4 h-4 opacity-75" />
                    <span>{openCount} {openCount === 1 ? 'open' : 'opens'}</span>
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
