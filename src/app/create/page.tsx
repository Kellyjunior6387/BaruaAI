'use client';

import React, { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCreatorStore } from '../../lib/creator/store';
import { saveExperienceAction } from './actions';

// Step components
import BasicsStep from '../../components/creator/BasicsStep';
import ThemeStep from '../../components/creator/ThemeStep';
import StoryStep from '../../components/creator/StoryStep';
import MemoriesStep from '../../components/creator/MemoriesStep';
import AskStep from '../../components/creator/AskStep';
import DatesStep from '../../components/creator/DatesStep';
import ClosingStep from '../../components/creator/ClosingStep';

function CreatorStepRouter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { state } = useCreatorStore();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stepParam = searchParams.get('step');
  const currentStep = Math.min(7, Math.max(1, parseInt(stepParam || '1', 10)));

  const handleNext = () => {
    if (currentStep < 7) {
      router.push(`/create?step=${currentStep + 1}`);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      router.push(`/create?step=${currentStep - 1}`);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);

    try {
      // 1. Generate unique slug
      const randomString = Math.random().toString(36).substring(2, 6);
      const cleanRecipient = state.recipient_name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      const slug = `${cleanRecipient || 'experience'}-${randomString}`;

      // 2. Prepare payload matching Experience model
      const payload = {
        slug,
        recipient_name: state.recipient_name,
        your_name: state.your_name,
        theme: state.theme || 'romantic',
        tier: 'free' as const,
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

      // 3. Save via Server Action
      const result = await saveExperienceAction(payload);
      
      if (result && result.slug) {
        router.push(`/create/success?slug=${result.slug}`);
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

export default function CreatePage() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-12">
          <p className="text-sm font-semibold text-gray-500">Loading editor...</p>
        </div>
      }
    >
      <CreatorStepRouter />
    </Suspense>
  );
}
