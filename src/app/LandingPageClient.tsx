'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';

export default function LandingPageClient() {
  // refs for scroll trigger animations
  const exampleRef = useRef(null);
  const isExampleInView = useInView(exampleRef, { once: true, margin: '-80px' });

  const diffRef = useRef(null);
  const isDiffInView = useInView(diffRef, { once: true, margin: '-80px' });

  const ctaRef = useRef(null);
  const isCtaInView = useInView(ctaRef, { once: true, margin: '-80px' });

  // smooth scroll helper
  const handleExampleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById('example')?.scrollIntoView({ behavior: 'smooth' });
  };

  // animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  };

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const stepContainerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="w-full overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[calc(100vh-68px)] flex flex-col justify-center bg-gradient-to-b from-[#FFF5F8] to-[#FFFFFF] px-6 py-20">
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="max-w-[560px] mx-auto text-center space-y-6 flex flex-col items-center justify-center"
        >
          <motion.span
            variants={fadeInUp}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4537E]"
          >
            FOR THE MOMENTS THAT MATTER
          </motion.span>

          <motion.h1
            variants={fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium text-gray-900 leading-tight tracking-tight"
          >
            Say it better than words.
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-base sm:text-lg text-gray-500 max-w-[440px] mx-auto leading-relaxed"
          >
            Barua turns your feelings into a personalised interactive experience — for the person you&apos;ve been thinking about.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 pt-4"
          >
            <Link
              href="/create"
              className="w-full sm:w-auto bg-[#D4537E] text-white rounded-xl px-8 py-3.5 font-medium text-base hover:bg-[#c3436d] hover:shadow-md transition-all text-center"
            >
              Create your Barua
            </Link>
            <a
              href="#example"
              onClick={handleExampleClick}
              className="w-full sm:w-auto border border-gray-200 bg-white text-gray-600 rounded-xl px-8 py-3.5 font-medium text-base hover:bg-gray-50 hover:border-gray-300 transition-colors text-center"
            >
              See an example
            </a>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-xs sm:text-sm text-gray-400 pt-2"
          >
            Built for asking out. Birthdays. Anniversaries. Any moment worth making memorable.
          </motion.p>
        </motion.div>
      </section>

      {/* 2. EXAMPLE SECTION */}
      <section
        id="example"
        ref={exampleRef}
        className="w-full bg-white py-24 px-6 border-t border-gray-50"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isExampleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-[640px] mx-auto text-center"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4537E]">
            HOW IT WORKS
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-3 leading-snug">
            A story, told in their language.
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-2 max-w-md mx-auto">
            You fill in the details. Barua builds the experience. They feel every word.
          </p>

          {/* 3-Step Visual Flow */}
          <motion.div
            variants={stepContainerVariants}
            initial="initial"
            animate={isExampleInView ? 'animate' : 'initial'}
            className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 mt-16 text-center"
          >
            {/* Step 1 */}
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="flex-1 flex flex-col items-center max-w-[200px]"
            >
              <div className="w-16 h-16 rounded-full bg-pink-50 text-2xl flex items-center justify-center select-none shadow-sm border border-pink-100/50 mb-4">
                ✍️
              </div>
              <h3 className="text-base font-bold text-gray-900">You share your story</h3>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                A few prompts. How you met, what you love about them, a memory or two.
              </p>
            </motion.div>

            {/* Arrow 1 */}
            <span className="hidden md:block text-gray-300 text-lg font-light select-none">
              &rarr;
            </span>

            {/* Step 2 */}
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="flex-1 flex flex-col items-center max-w-[200px]"
            >
              <div className="w-16 h-16 rounded-full bg-pink-50 text-2xl flex items-center justify-center select-none shadow-sm border border-pink-100/50 mb-4">
                ✨
              </div>
              <h3 className="text-base font-bold text-gray-900">Barua builds the experience</h3>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                A beautiful, personalised journey that plays out screen by screen.
              </p>
            </motion.div>

            {/* Arrow 2 */}
            <span className="hidden md:block text-gray-300 text-lg font-light select-none">
              &rarr;
            </span>

            {/* Step 3 */}
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="flex-1 flex flex-col items-center max-w-[200px]"
            >
              <div className="w-16 h-16 rounded-full bg-pink-50 text-2xl flex items-center justify-center select-none shadow-sm border border-pink-100/50 mb-4">
                💌
              </div>
              <h3 className="text-base font-bold text-gray-900">They feel it</h3>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                They open the link, walk through your story, and choose the date.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* 3. WHAT MAKES IT DIFFERENT SECTION */}
      <section
        ref={diffRef}
        className="w-full bg-[#FFF5F8] py-20 px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isDiffInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-[580px] mx-auto text-center space-y-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 max-w-sm mx-auto leading-snug">
            Not a card. Not a text. Something they&apos;ll remember.
          </h2>

          {/* Grid list */}
          <motion.div
            variants={stepContainerVariants}
            initial="initial"
            animate={isDiffInView ? 'animate' : 'initial'}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left"
          >
            {/* Point 1 */}
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-pink-100/20 space-y-2 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-2">
                <span className="text-base">📖</span>
                <h3 className="text-sm sm:text-base font-bold text-gray-900">A story, not a form</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                It feels personal because it is — built from your memories and your words.
              </p>
            </motion.div>

            {/* Point 2 */}
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-pink-100/20 space-y-2 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-2">
                <span className="text-base">🎭</span>
                <h3 className="text-sm sm:text-base font-bold text-gray-900">Three moods to match yours</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Romantic, Playful, or Cinematic — the whole experience shifts to fit.
              </p>
            </motion.div>

            {/* Point 3 */}
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-pink-100/20 space-y-2 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-2">
                <span className="text-base">📅</span>
                <h3 className="text-sm sm:text-base font-bold text-gray-900">They help plan the date</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Not just a yes or no — they pick the activity and the day.
              </p>
            </motion.div>

            {/* Point 4 */}
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-pink-100/20 space-y-2 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-2">
                <span className="text-base">💌</span>
                <h3 className="text-sm sm:text-base font-bold text-gray-900">You get notified instantly</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                The moment they respond, you&apos;ll know. No refreshing, no waiting.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* 4. CTA SECTION */}
      <section
        ref={ctaRef}
        className="w-full bg-[#D4537E] py-20 px-6 text-white text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isCtaInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto space-y-6 flex flex-col items-center justify-center"
        >
          <h2 className="text-3xl sm:text-4xl font-serif font-medium leading-tight">
            Someone&apos;s waiting to hear from you.
          </h2>
          <p className="opacity-85 text-base sm:text-lg leading-relaxed max-w-sm mx-auto">
            It takes about 10 minutes to build. It&apos;ll take their breath away.
          </p>
          <Link
            href="/create"
            className="bg-white text-[#D4537E] rounded-xl px-8 py-3.5 font-semibold text-base hover:bg-rose-50 hover:shadow-lg transition-all pt-4"
          >
            Create your Barua — it&apos;s free
          </Link>
        </motion.div>
      </section>

      {/* 5. FOOTER */}
      <footer className="w-full bg-white border-t border-gray-100 py-8 px-6">
        <div className="max-w-[640px] mx-auto flex items-center justify-between text-center">
          <span className="font-medium text-gray-700 text-sm">
            Barua <span className="text-[#D4537E]">💌</span>
          </span>
          <span className="text-sm text-gray-400">
            Made with love in Nairobi
          </span>
        </div>
      </footer>
    </div>
  );
}
