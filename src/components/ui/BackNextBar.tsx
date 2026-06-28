'use client';

interface BackNextBarProps {
  onBack?: () => void;
  onContinue: () => void;
  continueDisabled: boolean;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export default function BackNextBar({
  onBack,
  onContinue,
  continueDisabled,
  isFirstStep,
  isLastStep,
}: BackNextBarProps) {
  return (
    <div className="flex items-center justify-between w-full pt-4 border-t border-gray-100">
      <div>
        {!isFirstStep && onBack && (
          <button
            type="button"
            onClick={onBack}
            className="px-5 py-2.5 text-sm font-semibold text-gray-500 hover:text-gray-700 outline-none focus:outline-none"
          >
            Back
          </button>
        )}
      </div>
      <button
        type="button"
        disabled={continueDisabled}
        onClick={onContinue}
        className={`px-6 py-2.5 text-sm font-semibold text-white rounded-lg transition-all outline-none focus:outline-none ${
          continueDisabled
            ? 'bg-[#D4537E] opacity-40 cursor-not-allowed'
            : 'bg-[#D4537E] hover:opacity-90 active:scale-95'
        }`}
      >
        {isLastStep ? 'Create Barua' : 'Continue'}
      </button>
    </div>
  );
}
