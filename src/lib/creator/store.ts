'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface CreatorState {
  recipient_name: string;
  your_name: string;
  theme: 'romantic' | 'playful' | 'cinematic' | '';
  story_beats: string[];
  reflection: string;
  ask_line: string;
  handover_note: string;
  memories: { title: string; photo_path?: string }[];
  date_categories: ('outdoor' | 'food' | 'indoor')[];
  date_options: { category: string; activities: string[] }[];
  proposed_dates: string[];
  closing_message: string;
}

export type CreatorAction =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | { type: 'SET_FIELD'; payload: { field: keyof CreatorState; value: any } }
  | { type: 'SET_BEAT'; payload: { index: number; value: string } }
  | { type: 'ADD_BEAT' }
  | { type: 'SET_MEMORY'; payload: { index: number; title: string; photo_path?: string } }
  | { type: 'ADD_MEMORY' }
  | { type: 'TOGGLE_CATEGORY'; payload: { category: 'outdoor' | 'food' | 'indoor' } }
  | { type: 'TOGGLE_ACTIVITY'; payload: { category: string; activity: string } }
  | { type: 'SET_DATE'; payload: { index: number; value: string } }
  | { type: 'RESET' };

export const initialState: CreatorState = {
  recipient_name: '',
  your_name: '',
  theme: '',
  story_beats: ['', '', ''], // min 3 beats
  reflection: '',
  ask_line: 'Would you let me take you on a proper date?',
  handover_note: "I had some ideas, but I'd rather you choose.",
  memories: [{ title: '' }, { title: '' }], // min 2 memories
  date_categories: [],
  date_options: [],
  proposed_dates: ['', '', ''], // exactly 3 proposed dates
  closing_message: '',
};

function creatorReducer(state: CreatorState, action: CreatorAction): CreatorState {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };

    case 'SET_BEAT': {
      const newBeats = [...state.story_beats];
      newBeats[action.payload.index] = action.payload.value;
      return {
        ...state,
        story_beats: newBeats,
      };
    }

    case 'ADD_BEAT':
      if (state.story_beats.length >= 6) return state;
      return {
        ...state,
        story_beats: [...state.story_beats, ''],
      };

    case 'SET_MEMORY': {
      const newMemories = [...state.memories];
      newMemories[action.payload.index] = {
        title: action.payload.title,
        photo_path: action.payload.photo_path,
      };
      return {
        ...state,
        memories: newMemories,
      };
    }

    case 'ADD_MEMORY':
      if (state.memories.length >= 5) return state;
      return {
        ...state,
        memories: [...state.memories, { title: '' }],
      };

    case 'TOGGLE_CATEGORY': {
      const cat = action.payload.category;
      const exists = state.date_categories.includes(cat);
      let nextCats: ('outdoor' | 'food' | 'indoor')[];
      let nextOptions = [...state.date_options];

      if (exists) {
        nextCats = state.date_categories.filter((c) => c !== cat);
        nextOptions = nextOptions.filter((o) => o.category !== cat);
      } else {
        nextCats = [...state.date_categories, cat];
        nextOptions = [...nextOptions, { category: cat, activities: [] }];
      }

      return {
        ...state,
        date_categories: nextCats,
        date_options: nextOptions,
      };
    }

    case 'TOGGLE_ACTIVITY': {
      const { category, activity } = action.payload;
      const nextOptions = state.date_options.map((option) => {
        if (option.category === category) {
          const exists = option.activities.includes(activity);
          const nextActs = exists
            ? option.activities.filter((a) => a !== activity)
            : [...option.activities, activity];
          return {
            ...option,
            activities: nextActs,
          };
        }
        return option;
      });

      return {
        ...state,
        date_options: nextOptions,
      };
    }

    case 'SET_DATE': {
      const nextDates = [...state.proposed_dates];
      nextDates[action.payload.index] = action.payload.value;
      return {
        ...state,
        proposed_dates: nextDates,
      };
    }

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

interface CreatorStoreContextType {
  state: CreatorState;
  dispatch: React.Dispatch<CreatorAction>;
}

const CreatorStoreContext = createContext<CreatorStoreContextType | undefined>(undefined);

export function CreatorStoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(creatorReducer, initialState);
  return React.createElement(CreatorStoreContext.Provider, { value: { state, dispatch } }, children);
}

export function useCreatorStore() {
  const context = useContext(CreatorStoreContext);
  if (!context) {
    throw new Error('useCreatorStore must be used within a CreatorStoreProvider');
  }
  return context;
}
