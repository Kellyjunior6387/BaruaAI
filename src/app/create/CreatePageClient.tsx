'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCreatorStore } from '../../lib/creator/store';
import { saveExperienceAction, updateExperienceAction } from './actions';
import type { Experience } from '../../types';

// Step components
import BasicsStep from '../../components/creator/BasicsStep';
import ThemeStep from '../../components/creator/ThemeStep';
import StoryStep from '../../components/creator/StoryStep';
import MemoriesStep from '../../components/creator/MemoriesStep';
import AskStep from '../../components/creator/AskStep';
import DatesStep from '../../components/creator/DatesStep';
import ClosingStep from '../../components/creator/ClosingStep';

interface CreatePageClientProps {
  userId: string;
  initialExperience?: Experience;
}

function CreatorStepRouter({ userId, initialExperience }: CreatePageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { state, dispatch } = useCreatorStore();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stepParam = searchParams.get('step');
  const currentStep = Math.min(7, Math.max(1, parseInt(stepParam || '1', 10)));

  // Sync initial experience into creator store once when loaded
  useEffect(() => {
    if (initialExperience && state.id !== initialExperience.id) {
      dispatch({
        type: 'LOAD_EXPERIENCE',
        payload: {
          id: initialExperience.id,
          slug: initialExperience.slug,
          recipient_name: initialExperience.recipient_name,
          your_name: initialExperience.your_name,
          theme: initialExperience.theme,
          story_beats: initialExperience.story_beats,
          reflection: initialExperience.reflection || '',
          ask_line: initialExperience.ask_line || '',
          handover_note: initialExperience.handover_note || '',
          memories: initialExperience.memories || [],
          date_categories: initialExperience.date_categories || [],
          date_options: initialExperience.date_options || [],
          proposed_dates: initialExperience.proposed_dates || ['', '', ''],
          closing_message: initialExperience.closing_message || '',
        },
      });
    }
  }, [initialExperience, state.id, dispatch]);

  const handleNext = () => {
    if (currentStep < 7) {
      router.push(`${pathname}?step=${currentStep + 1}`);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      router.push(`${pathname}?step=${currentStep - 1}`);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);

    try {
      const isEditing = !!state.id;
      let slug = state.slug || '';

      if (!isEditing) {
        // 1. Generate unique slug if not editing
        const randomString = Math.random().toString(36).substring(2, 6);
        const cleanRecipient = state.recipient_name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
        slug = `${cleanRecipient || 'experience'}-${randomString}`;
      }

      // 2. Prepare payload matching Experience model
      const payload = {
        user_id: userId,
        slug,
        recipient_name: state.recipient_name,
        your_name: state.your_name,
        theme: state.theme || 'romantic',
        tier: (initialExperience?.tier || 'free') as 'free' | 'premium',
        status: 'active' as const,
        story_beats: state.story_beats.filter((beat) => beat.trim() !== ''),
        reflection: state.reflection,
        ask_line: state.ask_line,
        handover_note: state.handover_note,
        memories: state.memories.filter((mem) => mem.title.trim() !== ''),
        date_categories: state.date_categories,
        date_options: state.date_options,
        proposed_dates: state.proposed_dates,
        closing_message: state.closing_message,
      };

      let result;
      if (isEditing && state.id) {
        // 3. Update existing experience
        result = await updateExperienceAction(state.id, payload);
      } else {
        // 3. Save new experience via Server Action
        result = await saveExperienceAction(payload);
      }
      
      if (result && result.slug) {
        if (isEditing) {
          router.push(`/dashboard/${result.id}`);
        } else {
          router.push(`/create/success?slug=${result.slug}`);
        }
      } else {
        throw new Error('Failed to save experience: Invalid result');
      }
    } catch (err) {
      console.error(err);
      const msg = err instanceof Error ? err.message : 'Something went wrong while saving your experience. Please try again.';
      setError(msg);
      setSubmitting(false);
    }
  };

  if (submitting) {
    return (
      <div className="text-center space-y-3 bg-white p-8 rounded-2xl shadow-sm max-w-sm w-full border border-gray-100">
        <div className="w-10 h-10 border-4 border-[#D4537E] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm font-semibold text-gray-700">Sealing your Barua...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center space-y-4 bg-white p-8 rounded-2xl shadow-sm max-w-sm w-full border border-gray-100">
        <p className="text-sm font-semibold text-red-500">{error}</p>
        <button
          type="button"
          onClick={() => setError(null)}
          className="px-4 py-2 bg-[#D4537E] text-white text-xs font-semibold rounded-lg hover:opacity-90 transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  switch (currentStep) {
    case 1:
      return <BasicsStep onContinue={handleNext} onBack={handleBack} />;
    case 2:
      return <ThemeStep onContinue={handleNext} onBack={handleBack} />;
    case 3:
      return <StoryStep onContinue={handleNext} onBack={handleBack} />;
    case 4:
      return <MemoriesStep onContinue={handleNext} onBack={handleBack} />;
    case 5:
      return <AskStep onContinue={handleNext} onBack={handleBack} />;
    case 6:
      return <DatesStep onContinue={handleNext} onBack={handleBack} />;
    case 7:
      return <ClosingStep onContinue={handleNext} onBack={handleBack} />;
    default:
      return <BasicsStep onContinue={handleNext} onBack={handleBack} />;
  }
}

export default function CreatePageClient({ userId, initialExperience }: CreatePageClientProps) {
  return (
    <Suspense
      fallback={
        <div className="text-center py-12">
          <p className="text-sm font-semibold text-gray-500">Loading editor...</p>
        </div>
      }
    >
      <CreatorStepRouter userId={userId} initialExperience={initialExperience} />
    </Suspense>
  );
}
