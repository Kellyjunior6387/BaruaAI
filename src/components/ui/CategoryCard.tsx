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
      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border font-semibold text-sm transition-all cursor-pointer outline-none focus:outline-none w-full ${
        selected
          ? 'border-[#D4537E] bg-[#FBEAF0] text-gray-900'
          : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
      }`}
    >
      <span className="text-xl">{emoji}</span>
      <span>{name}</span>
    </button>
  );
}
