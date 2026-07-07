'use client';

import { useState } from 'react';
import type { Experience } from '@/types';
import type { ThemeConfig } from '@/lib/recipient/themes';
import { formatDatePretty } from '@/lib/utils';

interface ScreenProps {
  experience: Experience;
  theme: ThemeConfig;
  selectedCategory: string;
  selectedActivity: string;
  selectedDate: string;
  isSubmitting: boolean;
  setIsSubmitting: (val: boolean) => void;
  onNext: () => void;
}

export default function ConfirmScreen({
  experience,
  theme,
  selectedCategory,
  selectedActivity,
  selectedDate,
  isSubmitting,
  setIsSubmitting,
  onNext,
}: ScreenProps) {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/respond', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          experience_id: experience.id,
          chosen_category: selectedCategory,
          chosen_activity: selectedActivity,
          chosen_date: selectedDate,
        }),
      });

      if (res.status === 409) {
        setError('It looks like you already responded to this Barua.');
        return;
      }

      if (!res.ok) {
        throw new Error('Response request failed');
      }

      // Go to Screen 12 on success
      onNext();
    } catch (err) {
      console.error('Failed to submit response:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center px-6 ${theme.bg} ${theme.text}`}>
      <div className="w-full max-w-[480px] space-y-8 flex flex-col">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className={`text-sm font-semibold tracking-wider uppercase ${theme.accent}`}>
            Almost there
          </span>
          <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight ${theme.font}`}>
            Here&apos;s what you chose.
          </h1>
        </div>

        {/* Summary Card */}
        <div className={`rounded-2xl border p-6 space-y-4 shadow-sm ${theme.cardBg} ${theme.border}`}>
          <div className="flex items-start space-x-3">
            <span className="text-xl select-none">🎯</span>
            <div className="space-y-0.5">
              <span className="text-xs font-semibold uppercase opacity-60 tracking-wider">Activity</span>
              <p className="text-base font-semibold">{selectedActivity}</p>
            </div>
          </div>

          <div className="h-px bg-current opacity-10 w-full" />

          <div className="flex items-start space-x-3">
            <span className="text-xl select-none">📅</span>
            <div className="space-y-0.5">
              <span className="text-xs font-semibold uppercase opacity-60 tracking-wider">Date</span>
              <p className="text-base font-semibold">{formatDatePretty(selectedDate)}</p>
            </div>
          </div>
        </div>

        {/* Informational Text */}
        <p className="text-center text-sm opacity-80 leading-relaxed">
          Once you confirm, <span className="font-semibold">{experience.your_name}</span> will be notified.
        </p>

        {error && (
          <p className="text-center text-sm text-red-500 font-semibold">
            {error}
          </p>
        )}

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full py-3.5 px-6 rounded-xl text-base font-semibold transition-all duration-300 shadow-md flex items-center justify-center space-x-2 ${
              isSubmitting
                ? 'opacity-85 cursor-not-allowed'
                : ''
            } ${theme.buttonBg}`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Sending...</span>
              </>
            ) : (
              <span>Confirm & send</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
