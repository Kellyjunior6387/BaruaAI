export interface ThemeConfig {
  bg: string;
  text: string;
  accent: string;
  accentBg: string;
  border: string;
  cardBg: string;
  font: string;
  buttonBg: string;
  buttonDisabled: string;
}

export const THEMES: Record<'romantic' | 'playful' | 'cinematic', ThemeConfig> = {
  romantic: {
    bg: 'bg-rose-50/50',
    text: 'text-gray-900',
    accent: 'text-[#D4537E]',
    accentBg: 'bg-[#D4537E]',
    border: 'border-rose-100',
    cardBg: 'bg-white',
    font: 'font-sans',
    buttonBg: 'bg-[#D4537E] text-white hover:bg-[#c3436d]',
    buttonDisabled: 'bg-rose-100 text-rose-300 cursor-not-allowed',
  },
  playful: {
    bg: 'bg-[#FFFDF5]', // Beautiful soft cream background
    text: 'text-amber-950', // High contrast dark amber/brown
    accent: 'text-amber-600',
    accentBg: 'bg-amber-600',
    border: 'border-amber-100',
    cardBg: 'bg-white',
    font: 'font-sans',
    buttonBg: 'bg-orange-500 text-white hover:bg-orange-600',
    buttonDisabled: 'bg-orange-100 text-orange-300 cursor-not-allowed',
  },
  cinematic: {
    bg: 'bg-gray-950',
    text: 'text-gray-100',
    accent: 'text-amber-400',
    accentBg: 'bg-amber-400',
    border: 'border-gray-800',
    cardBg: 'bg-gray-900',
    font: 'font-mono',
    buttonBg: 'bg-white text-gray-950 hover:bg-gray-100', // Modern high contrast white button
    buttonDisabled: 'bg-gray-800 text-gray-500 cursor-not-allowed',
  },
};
