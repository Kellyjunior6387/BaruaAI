'use client';

import { useCreatorStore } from '../../lib/creator/store';
import { validateStep } from '../../lib/creator/validation';
import ThemeCard from '../ui/ThemeCard';
import StepCard from '../ui/StepCard';
import BackNextBar from '../ui/BackNextBar';

interface StepProps {
  onContinue: () => void;
  onBack: () => void;
}

export default function ThemeStep({ onContinue, onBack }: StepProps) {
  const { state, dispatch } = useCreatorStore();

  const handleSelectTheme = (theme: 'romantic' | 'playful' | 'cinematic') => {
    dispatch({ type: 'SET_FIELD', payload: { field: 'theme', value: theme } });
  };

  const validation = validateStep(2, state);

  return (
    <StepCard>
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-gray-900">Choose a Theme</h2>
        <p className="text-xs text-gray-500">Pick the visual and emotional vibe of the experience.</p>
      </div>

      <div className="flex justify-center w-full">
        <div className="max-w-xs w-full">
          <ThemeCard
            emoji="🌹"
            name="Romantic"
            description="Warm, soft, intimate"
            selected={state.theme === 'romantic'}
            onClick={() => handleSelectTheme('romantic')}
          />
        </div>
      </div>

      <BackNextBar
        onBack={onBack}
        onContinue={onContinue}
        continueDisabled={!validation.valid}
        isFirstStep={false}
        isLastStep={false}
      />
    </StepCard>
  );
}
