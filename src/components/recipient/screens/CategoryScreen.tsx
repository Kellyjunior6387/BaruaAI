'use client';

import type { Experience } from '@/types';
import type { ThemeConfig } from '@/lib/recipient/themes';

interface ScreenProps {
  experience: Experience;
  theme: ThemeConfig;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  onNext: () => void;
}

const CATEGORY_MAP: Record<string, { icon: string; label: string }> = {
  outdoor: { icon: '🌿', label: 'Outdoor Adventure' },
  food: { icon: '🍽️', label: 'Food & Drinks' },
  indoor: { icon: '🎮', label: 'Indoor Fun' },
};

export default function CategoryScreen({
  experience,
  theme,
  selectedCategory,
  setSelectedCategory,
  onNext,
}: ScreenProps) {
  const categories = experience.date_categories || [];

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
            The date
          </span>
          <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight ${theme.font}`}>
            What kind of date feels right?
          </h1>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-4">
          {categories.map((cat) => {
            const mapped = CATEGORY_MAP[cat] || { icon: '✨', label: cat };
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`w-full rounded-2xl border p-6 flex flex-col items-center justify-center space-y-3 transition-all duration-300 outline-none ${
                  isSelected
                    ? getSelectedClasses()
                    : `${theme.cardBg} ${theme.border} hover:opacity-90`
                }`}
              >
                <span className="text-4xl select-none" role="img" aria-label={mapped.label}>
                  {mapped.icon}
                </span>
                <span className="text-base font-semibold">
                  {mapped.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <button
            onClick={onNext}
            disabled={!selectedCategory}
            className={`w-full py-3.5 px-6 rounded-xl text-base font-semibold transition-all duration-300 shadow-md ${
              selectedCategory
                ? theme.buttonBg
                : theme.buttonDisabled
            }`}
          >
            This one
          </button>
        </div>
      </div>
    </div>
  );
}
