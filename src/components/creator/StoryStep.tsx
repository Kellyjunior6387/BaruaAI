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

const beatPlaceholders = [
  'We met because of...',
  'Then somehow...',
  'Then... happened.',
  'And I started...',
  'Before I knew it...',
  'And now we\'re here.',
];

export default function StoryStep({ onContinue, onBack }: StepProps) {
  const { state, dispatch } = useCreatorStore();

  const handleBeatChange = (index: number, value: string) => {
    dispatch({ type: 'SET_BEAT', payload: { index, value } });
  };

  const handleAddBeat = () => {
    dispatch({ type: 'ADD_BEAT' });
  };

  const handleReflectionChange = (value: string) => {
    dispatch({ type: 'SET_FIELD', payload: { field: 'reflection', value } });
  };

  const validation = validateStep(3, state);

  return (
    <StepCard>
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-gray-900">Your Story</h2>
        <p className="text-xs text-gray-500">Build up the narrative beats leading to the big ask.</p>
      </div>

      <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
        {state.story_beats.map((beat, idx) => (
          <FormField key={idx} label={`Beat ${idx + 1}`}>
            <input
              type="text"
              value={beat}
              onChange={(e) => handleBeatChange(idx, e.target.value)}
              placeholder={beatPlaceholders[idx] || "What happened next?"}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-[#D4537E] focus:ring-0 outline-none transition-all text-sm text-gray-800"
            />
          </FormField>
        ))}

        {state.story_beats.length < 6 && (
          <button
            type="button"
            onClick={handleAddBeat}
            className="text-xs font-semibold text-[#D4537E] hover:underline"
          >
            + Add another line
          </button>
        )}

        <hr className="border-gray-100 my-4" />

        <FormField label="Reflection — in your own words">
          <div className="relative">
            <textarea
              maxLength={300}
              rows={4}
              value={state.reflection}
              onChange={(e) => handleReflectionChange(e.target.value)}
              placeholder="Getting to know you has been one of the best parts of this year..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-[#D4537E] focus:ring-0 outline-none transition-all text-sm text-gray-800 resize-none"
            />
            <span className="absolute bottom-2 right-3 text-[10px] text-gray-400 font-medium">
              {state.reflection.length}/300
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
