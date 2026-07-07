'use client';

import type { Experience } from '@/types';
import type { ThemeConfig } from '@/lib/recipient/themes';
import { formatDatePretty } from '@/lib/utils';

interface ScreenProps {
  experience: Experience;
  theme: ThemeConfig;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  onNext: () => void;
}

export default function DatePickerScreen({
  experience,
  theme,
  selectedDate,
  setSelectedDate,
  onNext,
}: ScreenProps) {
  const dates = experience.proposed_dates || [];

  const getSelectedClasses = () => {
    switch (experience.theme) {
      case 'romantic':
        return 'border-[#D4537E] bg-[#D4537E]/10';
      case 'playful':
        return 'border-orange-500 bg-orange-500/10';
      case 'cinematic':
        return 'border-amber-400 bg-amber-400/10';
      default:
        return 'border-current bg-opacity-10';
    }
  };

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center px-6 ${theme.bg} ${theme.text}`}>
      <div className="w-full max-w-[480px] space-y-8 flex flex-col">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className={`text-sm font-semibold tracking-wider uppercase ${theme.accent}`}>
            When?
          </span>
          <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight ${theme.font}`}>
            Choose a date.
          </h1>
        </div>

        {/* Dates List */}
        <div className="space-y-3">
          {dates.length > 0 ? (
            dates.map((dateStr) => {
              const isSelected = selectedDate === dateStr;

              return (
                <button
                  key={dateStr}
                  type="button"
                  onClick={() => setSelectedDate(dateStr)}
                  className={`w-full text-center rounded-xl border py-4 px-5 transition-all duration-300 outline-none ${
                    isSelected
                      ? getSelectedClasses()
                      : `${theme.cardBg} ${theme.border} hover:opacity-90`
                  }`}
                >
                  <span className="text-base font-semibold">
                    {formatDatePretty(dateStr)}
                  </span>
                </button>
              );
            })
          ) : (
            <p className="text-center opacity-60">No dates proposed yet.</p>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <button
            onClick={onNext}
            disabled={!selectedDate}
            className={`w-full py-3.5 px-6 rounded-xl text-base font-semibold transition-all duration-300 shadow-md ${
              selectedDate
                ? theme.buttonBg
                : theme.buttonDisabled
            }`}
          >
            This works for me
          </button>
        </div>
      </div>
    </div>
  );
}
