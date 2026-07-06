'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Experience } from '@/types';
import type { ThemeConfig } from '@/lib/recipient/themes';

interface ScreenProps {
  experience: Experience;
  theme: ThemeConfig;
  onNext: () => void;
}

export default function StoryScreen({ experience, theme, onNext }: ScreenProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const beats = experience.story_beats || [];

  useEffect(() => {
    if (visibleCount < beats.length) {
      const timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [visibleCount, beats.length]);

  const showButton = visibleCount === beats.length;

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center px-6 ${theme.bg} ${theme.text}`}>
      <div className="w-full max-w-[480px] flex flex-col justify-between py-12 min-h-[70vh]">
        {/* Story beats container */}
        <div className="flex-1 flex flex-col justify-center">
          {beats.slice(0, visibleCount).map((beat, idx) => {
            const isLatest = idx === visibleCount - 1;
            return (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: isLatest ? 1 : 0.6, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={`text-xl sm:text-2xl font-medium mt-4 first:mt-0 ${theme.font} leading-relaxed transition-opacity duration-500`}
              >
                {beat}
              </motion.p>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="h-16 flex items-end">
          <AnimatePresence>
            {showButton && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                onClick={onNext}
                className={`w-full py-3.5 px-6 rounded-xl text-base font-semibold transition-all duration-300 shadow-md ${theme.buttonBg}`}
              >
                Continue
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
