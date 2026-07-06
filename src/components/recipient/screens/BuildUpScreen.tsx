'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Experience } from '@/types';
import type { ThemeConfig } from '@/lib/recipient/themes';

interface ScreenProps {
  experience: Experience;
  theme: ThemeConfig;
  onNext: () => void;
}

const LINES = [
  "So...",
  "I've been thinking.",
  "We've somehow done everything...",
  "...except one thing.",
];

export default function BuildUpScreen({ theme, onNext }: ScreenProps) {
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    if (visibleCount < LINES.length) {
      const timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        onNext();
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [visibleCount, onNext]);

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center px-6 ${theme.bg} ${theme.text}`}>
      <div className="w-full max-w-[480px] text-center space-y-8 flex flex-col items-center justify-center min-h-[50vh]">
        {LINES.slice(0, visibleCount).map((line, idx) => (
          <motion.h2
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`text-2xl sm:text-3xl font-semibold tracking-tight ${theme.font}`}
          >
            {line}
          </motion.h2>
        ))}
      </div>
    </div>
  );
}
