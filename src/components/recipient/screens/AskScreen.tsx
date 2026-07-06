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

export default function AskScreen({ experience, theme, onNext }: ScreenProps) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const askLineText = experience.ask_line || "Would you let me take you on a proper date?";

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center px-6 ${theme.bg} ${theme.text}`}>
      <div className="w-full max-w-[480px] text-center space-y-12 flex flex-col justify-between py-12 min-h-[50vh]">
        <div className="flex-1 flex flex-col justify-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight ${theme.font}`}
          >
            {askLineText}
          </motion.h1>
        </div>

        {/* Action Button */}
        <div className="h-20 flex items-center justify-center">
          <AnimatePresence>
            {showButton && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <motion.button
                  animate="pulse"
                  variants={{
                    pulse: {
                      scale: [1, 1.03, 1],
                      transition: {
                        duration: 1.6,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      },
                    },
                  }}
                  onClick={onNext}
                  className={`w-full py-4 px-6 rounded-xl text-lg font-bold tracking-wide transition-all duration-300 shadow-lg ${theme.buttonBg}`}
                >
                  Yes, I&apos;d love that.
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
