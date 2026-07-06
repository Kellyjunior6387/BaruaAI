'use client';

import type { Experience } from '@/types';
import type { ThemeConfig } from '@/lib/recipient/themes';

interface ScreenProps {
  experience: Experience;
  theme: ThemeConfig;
  selectedCategory: string;
  selectedActivity: string;
  setSelectedActivity: (activity: string) => void;
  onNext: () => void;
}

export default function ActivityScreen({
  experience,
  theme,
  selectedCategory,
  selectedActivity,
  setSelectedActivity,
  onNext,
}: ScreenProps) {
  const options = experience.date_options || [];
  const categoryData = options.find((opt) => opt.category === selectedCategory);
  const activities = categoryData ? categoryData.activities : [];

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
            Specifically...
          </span>
          <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight ${theme.font}`}>
            Pick one.
          </h1>
        </div>

        {/* Activities List */}
        <div className="space-y-3">
          {activities.length > 0 ? (
            activities.map((activity) => {
              const isSelected = selectedActivity === activity;

              return (
                <button
                  key={activity}
                  type="button"
                  onClick={() => setSelectedActivity(activity)}
                  className={`w-full text-left rounded-xl border py-4 px-5 transition-all duration-300 outline-none ${
                    isSelected
                      ? getSelectedClasses()
                      : `${theme.cardBg} ${theme.border} hover:opacity-90`
                  }`}
                >
                  <p className="text-base font-medium">
                    {activity}
                  </p>
                </button>
              );
            })
          ) : (
            <p className="text-center opacity-60">No activities found for this category.</p>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <button
            onClick={onNext}
            disabled={!selectedActivity}
            className={`w-full py-3.5 px-6 rounded-xl text-base font-semibold transition-all duration-300 shadow-md ${
              selectedActivity
                ? theme.buttonBg
                : theme.buttonDisabled
            }`}
          >
            Perfect
          </button>
        </div>
      </div>
    </div>
  );
}
