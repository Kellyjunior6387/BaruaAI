'use client';

import type { Experience } from '@/types';
import type { ThemeConfig } from '@/lib/recipient/themes';

interface ScreenProps {
  experience: Experience;
  theme: ThemeConfig;
  onNext: () => void;
}

export default function HandoverScreen({ experience, theme, onNext }: ScreenProps) {
  const handoverText = experience.handover_note || "I had some ideas, but I'd rather you choose.";

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center px-6 ${theme.bg} ${theme.text}`}>
      <div className="w-full max-w-[480px] text-center space-y-6">
        <span className={`text-sm font-semibold tracking-wider uppercase ${theme.accent}`}>
          Now...
        </span>
        
        <p className={`text-xl sm:text-2xl font-medium leading-relaxed ${theme.font}`}>
          {handoverText}
        </p>
        
        <div className="pt-6">
          <button
            onClick={onNext}
            className={`w-full py-3.5 px-6 rounded-xl text-base font-semibold transition-all duration-300 shadow-md ${theme.buttonBg}`}
          >
            Show me
          </button>
        </div>
      </div>
    </div>
  );
}
