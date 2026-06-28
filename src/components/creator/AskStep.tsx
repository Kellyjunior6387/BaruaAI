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

export default function AskStep({ onContinue, onBack }: StepProps) {
  const { state, dispatch } = useCreatorStore();

  const handleFieldChange = (field: 'ask_line' | 'handover_note', value: string) => {
    dispatch({ type: 'SET_FIELD', payload: { field, value } });
  };

  const validation = validateStep(5, state);

  return (
    <StepCard>
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-gray-900">The Pitch</h2>
        <p className="text-xs text-gray-500">Formulate your question and the message showing after they say yes.</p>
      </div>

      <div className="space-y-4 w-full">
        <FormField
          label="The ask"
          hint="Shown big, after the build-up sequence."
        >
          <div className="relative">
            <input
              type="text"
              maxLength={100}
              value={state.ask_line}
              onChange={(e) => handleFieldChange('ask_line', e.target.value)}
              placeholder="e.g. Would you let me take you on a proper date?"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 pr-12 focus:border-[#D4537E] focus:ring-0 outline-none transition-all text-sm text-gray-800"
            />
            <span className="absolute right-3 top-2.5 text-[10px] text-gray-400 font-medium">
              {state.ask_line.length}/100
            </span>
          </div>
        </FormField>

        <FormField
          label="Handover line"
          hint="Appears after they say yes — bridges into date planning."
        >
          <div className="relative">
            <input
              type="text"
              maxLength={100}
              value={state.handover_note}
              onChange={(e) => handleFieldChange('handover_note', e.target.value)}
              placeholder="e.g. I had some ideas, but I'd rather you choose."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 pr-12 focus:border-[#D4537E] focus:ring-0 outline-none transition-all text-sm text-gray-800"
            />
            <span className="absolute right-3 top-2.5 text-[10px] text-gray-400 font-medium">
              {state.handover_note.length}/100
            </span>
          </div>
        </FormField>
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
