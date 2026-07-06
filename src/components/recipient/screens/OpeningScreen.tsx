'use client';

import type { Experience } from '@/types';
import type { ThemeConfig } from '@/lib/recipient/themes';

interface ScreenProps {
  experience: Experience;
  theme: ThemeConfig;
  onNext: () => void;
}

export default function OpeningScreen({ theme, onNext }: ScreenProps) {
  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center px-6 ${theme.bg} ${theme.text}`}>
      <div className="w-full max-w-[480px] text-center space-y-6">
        <span className={`text-sm font-semibold tracking-wider uppercase ${theme.accent}`}>
          A little something
        </span>
        
        <h1 className={`text-3xl font-bold tracking-tight ${theme.font}`}>
          Before you continue...
        </h1>
        
        <p className="text-base opacity-80 leading-relaxed">
          What you&apos;re about to see was made specifically for you. Take your time with it.
        </p>
        
        <div className="pt-4">
          <button
            onClick={onNext}
            className={`w-full py-3.5 px-6 rounded-xl text-base font-semibold transition-all duration-300 shadow-md ${theme.buttonBg}`}
          >
            Let&apos;s go
          </button>
        </div>
      </div>
    </div>
  );
}
