'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Experience } from '@/types';
import type { ThemeConfig } from '@/lib/recipient/themes';

interface ScreenProps {
  experience: Experience;
  theme: ThemeConfig;
  onNext: () => void;
}

export default function SubmittedScreen({ experience, theme, onNext }: ScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onNext();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center px-6 ${theme.bg} ${theme.text}`}>
      <div className="w-full max-w-[480px] text-center space-y-6 flex flex-col items-center justify-center min-h-[50vh]">
        {/* Animated Checkmark */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.2, 1], opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-md border ${theme.cardBg} ${theme.border}`}
        >
          ✨
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-3"
        >
          <h1 className={`text-3xl font-bold tracking-tight ${theme.font}`}>
            Sent. 💌
          </h1>
          <p className="text-base opacity-80">
            {experience.your_name} will know soon.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
