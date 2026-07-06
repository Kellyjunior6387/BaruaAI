import { useState } from 'react';

export function useRecipientState() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const next = () => setCurrentScreen((prev) => prev + 1);
  const back = () => setCurrentScreen((prev) => Math.max(0, prev - 1));

  return {
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
    isSubmitted,
    setIsSubmitted,
    next,
    back,
  };
}
