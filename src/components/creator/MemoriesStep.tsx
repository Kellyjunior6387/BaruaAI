'use client';

import { useCreatorStore } from '../../lib/creator/store';
import { validateStep } from '../../lib/creator/validation';
import FormField from '../ui/FormField';
import StepCard from '../ui/StepCard';
import BackNextBar from '../ui/BackNextBar';
import { Camera } from 'lucide-react';

interface StepProps {
  onContinue: () => void;
  onBack: () => void;
}

const placeholders = [
  'First memory',
  'Second memory',
  'Third Memory',
  'Fourth memory',
];

export default function MemoriesStep({ onContinue, onBack }: StepProps) {
  const { state, dispatch } = useCreatorStore();

  const handleMemoryChange = (index: number, title: string) => {
    dispatch({ type: 'SET_MEMORY', payload: { index, title, photo_path: state.memories[index]?.photo_path } });
  };

  const handleAddMemory = () => {
    dispatch({ type: 'ADD_MEMORY' });
  };

  const validation = validateStep(4, state);

  return (
    <StepCard>
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-gray-900">Shared Memories <span className="text-sm font-normal text-gray-500">(OPTIONAL)</span></h2>
        <p className="text-xs text-gray-500">Add some key moments you shared together (min 2, max 5).</p>
      </div>

      <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
        {state.memories.map((memory, idx) => (
          <FormField key={idx} label={`Memory ${idx + 1}`}>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={memory.title}
                onChange={(e) => handleMemoryChange(idx, e.target.value)}
                placeholder={placeholders[idx] || 'e.g. Coffee Dates'}
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 focus:border-[#D4537E] focus:ring-0 outline-none transition-all text-sm text-gray-800"
              />
              <div className="relative group">
                <button
                  type="button"
                  className="p-2 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-gray-400 cursor-help outline-none"
                >
                  <Camera size={18} />
                </button>
                <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-[10px] px-2.5 py-1.5 rounded-lg shadow-lg whitespace-nowrap z-10 transition-all font-semibold">
                  Photo uploads available on premium
                </div>
              </div>
            </div>
          </FormField>
        ))}

        {state.memories.length < 5 && (
          <button
            type="button"
            onClick={handleAddMemory}
            className="text-xs font-semibold text-[#D4537E] hover:underline"
          >
            + Add a memory
          </button>
        )}
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
