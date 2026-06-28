'use client';

interface ThemeCardProps {
  emoji: string;
  name: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

export default function ThemeCard({ emoji, name, description, selected, onClick }: ThemeCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-5 rounded-xl border text-center transition-all cursor-pointer outline-none focus:outline-none w-full ${
        selected
          ? 'border-[#D4537E] bg-[#FBEAF0] text-gray-900'
          : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
      }`}
    >
      <span className="text-3xl mb-2">{emoji}</span>
      <span className="font-bold text-sm">{name}</span>
      <span className="text-xs text-gray-500 mt-1">{description}</span>
    </button>
  );
}
