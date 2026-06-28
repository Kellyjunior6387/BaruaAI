'use client';

interface ChipButtonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export default function ChipButton({ label, selected, onClick }: ChipButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all outline-none focus:outline-none ${
        selected
          ? 'bg-[#D4537E] border-[#D4537E] text-white'
          : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
      }`}
    >
      {label}
    </button>
  );
}
