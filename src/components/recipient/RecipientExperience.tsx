'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRecipientState } from './useRecipientState';
import { THEMES } from '@/lib/recipient/themes';
import type { Experience } from '@/types';

// Import Screen Components
import WelcomeScreen from './screens/WelcomeScreen';
import OpeningScreen from './screens/OpeningScreen';
import StoryScreen from './screens/StoryScreen';
import MemoryBoardScreen from './screens/MemoryBoardScreen';
import ReflectionScreen from './screens/ReflectionScreen';
import BuildUpScreen from './screens/BuildUpScreen';
import AskScreen from './screens/AskScreen';
import HandoverScreen from './screens/HandoverScreen';
import CategoryScreen from './screens/CategoryScreen';
import ActivityScreen from './screens/ActivityScreen';
import DatePickerScreen from './screens/DatePickerScreen';
import ConfirmScreen from './screens/ConfirmScreen';
import SubmittedScreen from './screens/SubmittedScreen';
import ClosingScreen from './screens/ClosingScreen';

interface RecipientExperienceProps {
  experience: Omit<Experience, 'memories'> & {
    memories: { title: string; photo_path?: string; signedUrl?: string }[];
  };
}

export default function RecipientExperience({ experience }: RecipientExperienceProps) {
  const {
    currentScreen,
    setCurrentScreen,
    selectedCategory,
    setSelectedCategory,
    selectedActivity,
    setSelectedActivity,
    selectedDate,
    setSelectedDate,
    isSubmitting,
    setIsSubmitting,
    next,
  } = useRecipientState();

  const theme = THEMES[experience.theme || 'romantic'];

  const memories = experience.memories || [];
  const hasMemories = memories.length > 0 && memories.some((m) => m.title && m.title.trim() !== '');

  const handleNext = () => {
    if (currentScreen === 2 && !hasMemories) {
      // Skip MemoryBoardScreen (Screen 3)
      setCurrentScreen(4);
    } else {
      next();
    }
  };

  const renderScreen = () => {
    const commonProps = { experience, theme, onNext: handleNext };

    switch (currentScreen) {
      case 0:
        return <WelcomeScreen {...commonProps} />;
      case 1:
        return <OpeningScreen {...commonProps} />;
      case 2:
        return <StoryScreen {...commonProps} />;
      case 3:
        return <MemoryBoardScreen {...commonProps} />;
      case 4:
        return <ReflectionScreen {...commonProps} />;
      case 5:
        return <BuildUpScreen {...commonProps} />;
      case 6:
        return <AskScreen {...commonProps} />;
      case 7:
        return <HandoverScreen {...commonProps} />;
      case 8:
        return (
          <CategoryScreen
            {...commonProps}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        );
      case 9:
        return (
          <ActivityScreen
            {...commonProps}
            selectedCategory={selectedCategory}
            selectedActivity={selectedActivity}
            setSelectedActivity={setSelectedActivity}
          />
        );
      case 10:
        return (
          <DatePickerScreen
            {...commonProps}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        );
      case 11:
        return (
          <ConfirmScreen
            {...commonProps}
            selectedCategory={selectedCategory}
            selectedActivity={selectedActivity}
            selectedDate={selectedDate}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
          />
        );
      case 12:
        return <SubmittedScreen {...commonProps} />;
      case 13:
        return <ClosingScreen {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen w-full ${theme.bg}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full min-h-screen"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
