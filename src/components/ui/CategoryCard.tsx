'use client';

interface CategoryCardProps {
  emoji: string;
  name: string;
  selected: boolean;
  onClick: () => void;
}

export default function CategoryCard({ emoji, name, selected, onClick }: CategoryCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-3 px-2 py-3 sm:px-4 sm:py-3.5 rounded-xl border font-semibold text-xs sm:text-sm transition-all cursor-pointer outline-none focus:outline-none w-full ${
        selected
          ? 'border-[#D4537E] bg-[#FBEAF0] text-gray-900 font-bold'
          : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
      }`}
    >
      <span className="text-lg sm:text-xl">{emoji}</span>
      <span className="truncate w-full sm:w-auto text-center sm:text-left">{name}</span>
    </button>
  );
}
