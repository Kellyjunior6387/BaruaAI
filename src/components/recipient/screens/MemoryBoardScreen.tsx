'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Experience } from '@/types';
import type { ThemeConfig } from '@/lib/recipient/themes';

interface MemoryWithUrl {
  title: string;
  photo_path?: string;
  signedUrl?: string;
}

interface ScreenProps {
  experience: Omit<Experience, 'memories'> & { memories: MemoryWithUrl[] };
  theme: ThemeConfig;
  onNext: () => void;
}

const EMOJIS = ['✨', '🌊', '🍫', '📞', '🏃'];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  }),
};

export default function MemoryBoardScreen({ experience, theme, onNext }: ScreenProps) {
  const memories = experience.memories || [];

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center px-6 py-12 ${theme.bg} ${theme.text}`}>
      <div className="w-full max-w-[480px] space-y-8 flex flex-col">
        {/* Header Section */}
        <div className="text-center space-y-2">
          <span className={`text-xs sm:text-sm font-semibold tracking-wider uppercase ${theme.accent}`}>
            Along the way...
          </span>
          <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight ${theme.font}`}>
            Some things I won&apos;t forget.
          </h1>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-2 gap-4">
          {memories.map((memory, idx) => {
            const hasPhoto = !!memory.signedUrl;
            const emoji = EMOJIS[idx % EMOJIS.length];

            return (
              <motion.div
                key={idx}
                custom={idx}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className={`rounded-2xl shadow-sm p-4 flex flex-col items-center justify-between border ${theme.cardBg} ${theme.border} min-h-[160px] relative overflow-hidden`}
              >
                {hasPhoto ? (
                  <div className="w-full aspect-[4/3] relative rounded-lg overflow-hidden mb-3">
                    <Image
                      src={memory.signedUrl!}
                      alt={memory.title}
                      fill
                      sizes="(max-width: 480px) 50vw, 240px"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="w-full flex-1 flex items-center justify-center text-4xl py-4 select-none">
                    {emoji}
                  </div>
                )}
                
                <p className="text-sm font-medium text-center line-clamp-2 w-full mt-auto">
                  {memory.title}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <button
            onClick={onNext}
            className={`w-full py-3.5 px-6 rounded-xl text-base font-semibold transition-all duration-300 shadow-md ${theme.buttonBg}`}
          >
            Keep going
          </button>
        </div>
      </div>
    </div>
  );
}
