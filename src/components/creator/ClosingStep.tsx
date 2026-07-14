'use client';

import { useCreatorStore } from '../../lib/creator/store';
import { validateStep } from '../../lib/creator/validation';
import FormField from '../ui/FormField';
import StepCard from '../ui/StepCard';
import BackNextBar from '../ui/BackNextBar';

interface StepProps {
  onContinue: () => void;
  onBack: () => void;
}

export default function ClosingStep({ onContinue, onBack }: StepProps) {
  const { state, dispatch } = useCreatorStore();

  const handleFieldChange = (value: string) => {
    dispatch({ type: 'SET_FIELD', payload: { field: 'closing_message', value } });
  };

  const validation = validateStep(7, state);

  return (
    <StepCard>
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-gray-900">Sign Off</h2>
        <p className="text-xs text-gray-500">Leave a warm final note or an inside joke to close the experience.</p>
      </div>

      <div className="space-y-4 w-full">
        <FormField label="The sign-off">
          <div className="relative">
            <textarea
              maxLength={300}
              value={state.closing_message}
              onChange={(e) => handleFieldChange(e.target.value)}
              placeholder="Can't wait to see your amazing smile"
              className="w-full min-h-[120px] border border-gray-200 rounded-lg px-3 py-2 pr-3 pb-8 focus:border-[#D4537E] focus:ring-0 outline-none transition-all text-sm text-gray-800 resize-none"
            />
            <span className="absolute bottom-2 right-3 text-[10px] text-gray-400 font-medium">
              {state.closing_message.length}/300
            </span>
          </div>
        </FormField>

        <div className="border-l-4 border-[#D4537E] bg-[#FBEAF0] p-4 text-xs text-gray-700 rounded-r-lg leading-relaxed">
          <strong>Tip:</strong> This screen gets screenshotted and shared. Inside jokes land hardest here.
        </div>
      </div>

      <BackNextBar
        onBack={onBack}
        onContinue={onContinue}
        continueDisabled={!validation.valid}
        isFirstStep={false}
        isLastStep={true}
      />
    </StepCard>
  );
}
