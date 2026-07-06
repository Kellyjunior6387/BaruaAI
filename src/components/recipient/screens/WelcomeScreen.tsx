'use client';

import { motion } from 'framer-motion';
import type { Experience } from '@/types';
import type { ThemeConfig } from '@/lib/recipient/themes';

interface ScreenProps {
  experience: Experience;
  theme: ThemeConfig;
  onNext: () => void;
}

export default function WelcomeScreen({ experience, theme, onNext }: ScreenProps) {
  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center px-6 ${theme.bg} ${theme.text}`}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.8 }}
        className="w-full max-w-[480px] text-center space-y-6"
      >
        <span className={`text-sm font-semibold tracking-wider uppercase ${theme.accent}`}>
          Something was made for you
        </span>
        
        <h1 className={`text-3xl sm:text-4xl font-bold tracking-tight ${theme.font}`}>
          Hi, {experience.recipient_name}.
        </h1>
        
        <p className="text-base opacity-80 leading-relaxed">
          Someone asked me to give you this. Spare two minutes?
        </p>
        
        <div className="pt-4">
          <button
            onClick={onNext}
            className={`w-full py-3.5 px-6 rounded-xl text-base font-semibold transition-all duration-300 shadow-md ${theme.buttonBg}`}
          >
            I have two minutes
          </button>
        </div>
      </motion.div>
    </div>
  );
}
