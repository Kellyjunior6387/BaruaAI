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

export default function ReflectionScreen({ experience, theme, onNext }: ScreenProps) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center px-6 ${theme.bg} ${theme.text}`}>
      <div className="w-full max-w-[520px] text-center space-y-8 flex flex-col justify-between py-12 min-h-[50vh]">
        <div className="flex-1 flex flex-col justify-center space-y-6">
          <span className={`text-sm font-semibold tracking-wider uppercase opacity-80 ${theme.accent}`}>
            A thought
          </span>
          
          <blockquote className={`text-lg sm:text-xl italic leading-relaxed font-medium md:px-4 ${theme.font}`}>
            &ldquo;{experience.reflection}&rdquo;
          </blockquote>
          
          <cite className="block text-sm font-semibold not-italic opacity-70">
            — {experience.your_name}
          </cite>
        </div>

        {/* Action Button */}
        <div className="h-16 flex items-end">
          <AnimatePresence>
            {showButton && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
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
