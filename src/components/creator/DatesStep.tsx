'use client';

import { useCreatorStore } from '../../lib/creator/store';
import { validateStep } from '../../lib/creator/validation';
import CategoryCard from '../ui/CategoryCard';
import FormField from '../ui/FormField';
import StepCard from '../ui/StepCard';
import BackNextBar from '../ui/BackNextBar';

interface StepProps {
  onContinue: () => void;
  onBack: () => void;
}

export default function DatesStep({ onContinue, onBack }: StepProps) {
  const { state, dispatch } = useCreatorStore();

  const handleToggleCategory = (category: 'outdoor' | 'food' | 'indoor') => {
    dispatch({ type: 'TOGGLE_CATEGORY', payload: { category } });
  };

  const handleDateChange = (index: number, value: string) => {
    dispatch({ type: 'SET_DATE', payload: { index, value } });
  };

  const validation = validateStep(6, state);

  return (
    <StepCard>
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-gray-900">Plan the Date</h2>
        <p className="text-xs text-gray-500">Provide custom options for them to choose from after they say yes.</p>
      </div>

      <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
        {/* Vibe Selector */}
        <FormField label="Date Vibes (Select all that apply)">
          <div className="grid grid-cols-3 gap-2 w-full">
            <CategoryCard
              emoji="🌳"
              name="Outdoor"
              selected={state.date_categories.includes('outdoor')}
              onClick={() => handleToggleCategory('outdoor')}
            />
            <CategoryCard
              emoji="🍽️"
              name="Food"
              selected={state.date_categories.includes('food')}
              onClick={() => handleToggleCategory('food')}
            />
            <CategoryCard
              emoji="🎮"
              name="Indoor"
              selected={state.date_categories.includes('indoor')}
              onClick={() => handleToggleCategory('indoor')}
            />
          </div>
        </FormField>

        {/* Activity Picker */}
        {state.date_categories.map((cat) => {
          const catOption = state.date_options.find((o) => o.category === cat);
          const chosenActivities = catOption?.activities || [];

          const handleActivityChange = (index: number, val: string) => {
            dispatch({
              type: 'SET_ACTIVITY_AT_INDEX',
              payload: { category: cat, index, value: val },
            });
          };

          return (
            <FormField
              key={cat}
              label={`Activities - ${cat.charAt(0).toUpperCase() + cat.slice(1)} (At least 1 required)`}
            >
              <div className="space-y-2 pt-1">
                {[0, 1, 2].map((idx) => {
                  const activityVal = chosenActivities[idx] || '';

                  return (
                    <div key={idx} className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-gray-400 w-16">
                        Option {idx + 1}
                      </span>
                      <input
                        type="text"
                        value={activityVal}
                        onChange={(e) => handleActivityChange(idx, e.target.value)}
                        placeholder={`e.g. ${
                          cat === 'outdoor'
                            ? idx === 0
                              ? 'Run & coffee'
                              : idx === 1
                              ? 'Picnic in the park'
                              : 'Sunset hike'
                            : cat === 'food'
                            ? idx === 0
                              ? 'Rooftop dinner'
                              : idx === 1
                              ? 'Sushi date'
                              : 'Ice cream & walk'
                            : idx === 0
                            ? 'Bowling & arcade'
                            : idx === 1
                            ? 'Cozy movie night'
                            : 'Cooking class together'
                        }`}
                        className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 focus:border-[#D4537E] focus:ring-0 outline-none transition-all text-sm text-gray-800"
                      />
                    </div>
                  );
                })}
              </div>
            </FormField>
          );
        })}

        <hr className="border-gray-100 my-4" />

        {/* Proposed Dates */}
        <FormField label="Proposed Dates (All 3 required)">
          <div className="space-y-3 pt-1">
            {state.proposed_dates.map((date, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="text-xs font-semibold text-gray-400 w-16">
                  Option {idx + 1}
                </span>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => handleDateChange(idx, e.target.value)}
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 focus:border-[#D4537E] focus:ring-0 outline-none transition-all text-sm text-gray-800"
                />
              </div>
            ))}
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
