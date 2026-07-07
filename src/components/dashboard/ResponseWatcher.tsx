'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Compass, Calendar, Clock } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { relativeTime } from '@/lib/utils/relativeTime';
import { formatDatePretty } from '@/lib/utils';

interface ResponseWatcherProps {
  experienceId: string;
  recipientName: string;
  initialResponse: {
    id: string;
    chosen_category: string;
    chosen_activity: string;
    chosen_date: string;
    responded_at: string;
  } | null;
  initialOpenCount: number;
}

export default function ResponseWatcher({
  experienceId,
  recipientName,
  initialResponse,
  initialOpenCount,
}: ResponseWatcherProps) {
  const [response, setResponse] = useState(initialResponse);
  const supabase = createClient();

  useEffect(() => {
    const channel = supabase
      .channel(`response-watch-${experienceId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'responses',
          filter: `experience_id=eq.${experienceId}`,
        },
        (payload: {
          new: {
            id: string;
            chosen_category: string;
            chosen_activity: string;
            chosen_date: string;
            responded_at: string;
          };
        }) => {
          console.log('[Realtime] Received new response:', payload.new);
          setResponse(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [experienceId, supabase]);

  return (
    <AnimatePresence mode="wait">
      {response ? (
        /* Celebratory Response Card */
        <motion.div
          key="celebration"
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="bg-gradient-to-br from-rose-50 to-pink-50/50 rounded-3xl border border-pink-100/60 p-6 sm:p-8 space-y-6 shadow-sm relative overflow-hidden"
        >
          {/* Subtle top brand decoration */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pink-400 to-[#D4537E]" />

          {/* Celebration Header */}
          <div className="flex items-center space-x-3 text-[#D4537E]">
            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 animate-bounce">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-xl font-extrabold tracking-tight">
                {recipientName} said YES! 💌
              </h3>
              <p className="text-xs text-gray-500 font-semibold">Your date is locked in.</p>
            </div>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/80 backdrop-blur rounded-2xl p-5 border border-pink-100/40 flex items-start space-x-3 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center text-pink-500 flex-shrink-0">
                <Compass className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider block">
                  Chosen Activity
                </span>
                <p className="text-sm font-bold text-gray-800 leading-snug">
                  {response.chosen_activity}
                </p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur rounded-2xl p-5 border border-pink-100/40 flex items-start space-x-3 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center text-pink-500 flex-shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider block">
                  Locked Date
                </span>
                <p className="text-sm font-bold text-gray-800 leading-snug">
                  {formatDatePretty(response.chosen_date)}
                </p>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="flex items-center space-x-2 text-xs text-gray-400 font-semibold pt-2 border-t border-pink-100/40">
            <Clock className="w-3.5 h-3.5" />
            <span>Responded {relativeTime(response.responded_at)}</span>
          </div>
        </motion.div>
      ) : (
        /* Waiting Card with tracking timeline */
        <motion.div
          key="waiting"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 space-y-6 shadow-sm"
        >
          <div className="space-y-1.5 pb-4 border-b border-gray-50">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-bold text-gray-900">
                Awaiting {recipientName}&apos;s reply
              </h3>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4537E]"></span>
              </span>
            </div>
            <p className="text-xs text-gray-400 font-medium">
              We are listening for real-time response updates. Send them their link to get started.
            </p>
          </div>

          {/* Tracking Timeline */}
          <div className="relative border-l border-gray-100 ml-3 pl-6 space-y-6 py-2">
            {/* Timeline Item 1: Link Created */}
            <div className="relative">
              <span className="absolute -left-[32px] top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-pink-100 text-[#D4537E] ring-4 ring-white text-[10px] font-bold">
                ✓
              </span>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-gray-700">Barua Sealed & Active</h4>
                <p className="text-[11px] text-gray-400 font-semibold">Your personalized experience link is live and tracking.</p>
              </div>
            </div>

            {/* Timeline Item 2: Link Visited */}
            <div className="relative">
              {initialOpenCount > 0 ? (
                <>
                  <span className="absolute -left-[32px] top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-pink-100 text-[#D4537E] ring-4 ring-white text-[10px] font-bold">
                    ✓
                  </span>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-gray-700">Link Opened</h4>
                    <p className="text-[11px] text-gray-400 font-semibold">
                      Recipient has opened it {initialOpenCount} {initialOpenCount === 1 ? 'time' : 'times'}.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <span className="absolute -left-[32px] top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-gray-50 border border-gray-200 text-gray-400 ring-4 ring-white text-[10px] font-bold">
                    2
                  </span>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-gray-400">Waiting for first visit</h4>
                    <p className="text-[11px] text-gray-400 font-semibold">Recipient has not visited the page yet.</p>
                  </div>
                </>
              )}
            </div>

            {/* Timeline Item 3: Submit responses */}
            <div className="relative">
              <span className="absolute -left-[32px] top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-gray-50 border border-gray-200 text-gray-400 ring-4 ring-white text-[10px] font-bold">
                3
              </span>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-gray-400">Date Confirmed</h4>
                <p className="text-[11px] text-gray-400 font-semibold">Real-time answers will populate right here the moment they finish.</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
