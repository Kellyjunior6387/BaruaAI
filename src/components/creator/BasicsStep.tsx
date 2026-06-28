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

export default function BasicsStep({ onContinue, onBack }: StepProps) {
  const { state, dispatch } = useCreatorStore();

  const handleFieldChange = (field: 'recipient_name' | 'your_name', value: string) => {
    dispatch({ type: 'SET_FIELD', payload: { field, value } });
  };

  const validation = validateStep(1, state);

  return (
    <StepCard>
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-gray-900">The Basics</h2>
        <p className="text-xs text-gray-500">Let&apos;s set up the core names for your Barua.</p>
      </div>

      <div className="space-y-4">
        <FormField
          label="Their name"
          hint="Used on the welcome screen and throughout."
        >
          <input
            type="text"
            value={state.recipient_name}
            onChange={(e) => handleFieldChange('recipient_name', e.target.value)}
            placeholder="e.g. Sarah"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-[#D4537E] focus:ring-0 outline-none transition-all text-sm text-gray-800"
          />
        </FormField>

        <FormField label="Your name">
          <input
            type="text"
            value={state.your_name}
            onChange={(e) => handleFieldChange('your_name', e.target.value)}
            placeholder="e.g. Alex"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-[#D4537E] focus:ring-0 outline-none transition-all text-sm text-gray-800"
          />
        </FormField>
      </div>

      <BackNextBar
        onBack={onBack}
        onContinue={onContinue}
        continueDisabled={!validation.valid}
        isFirstStep={true}
        isLastStep={false}
      />
    </StepCard>
  );
}
