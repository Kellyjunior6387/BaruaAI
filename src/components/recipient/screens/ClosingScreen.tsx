'use client';

import { motion } from 'framer-motion';
import type { Experience } from '@/types';
import type { ThemeConfig } from '@/lib/recipient/themes';

interface ScreenProps {
  experience: Experience;
  theme: ThemeConfig;
  onNext: () => void;
}

export default function ClosingScreen({ experience, theme }: ScreenProps) {
  const closingMessage = experience.closing_message || "Can't wait to see you.";

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-between px-6 py-12 ${theme.bg} ${theme.text}`}>
      {/* Spacer to push content to center */}
      <div />

      {/* Main Content */}
      <div className="w-full max-w-[480px] text-center space-y-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`text-xl sm:text-2xl italic font-medium leading-relaxed ${theme.font}`}
        >
          &ldquo;{closingMessage}&rdquo;
        </motion.p>

        <motion.cite
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="block text-sm sm:text-base font-semibold not-italic"
        >
          — {experience.your_name}
        </motion.cite>
      </div>

      {/* Watermark at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 0.8, delay: 2 }}
        className="text-center pt-8 mt-12 space-y-1.5 z-10"
      >
        <div className="text-sm font-bold tracking-wide select-none">
          Barua 💌
        </div>
        {experience.tier !== 'premium' && (
          <a
            href={process.env.NEXT_PUBLIC_APP_URL || 'https://barua.app'}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-xs underline opacity-80 hover:opacity-100 transition-opacity"
          >
            Create your own at barua.me
          </a>
        )}
      </motion.div>
    </div>
  );
}
