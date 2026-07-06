import { CreatorState } from './store';

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateStep(step: number, state: CreatorState): ValidationResult {
  switch (step) {
    case 1: {
      const recipient = state.recipient_name.trim();
      const creator = state.your_name.trim();
      if (!recipient || !creator) {
        return { valid: false, error: "Please enter both names to continue." };
      }
      return { valid: true };
    }

    case 2: {
      const hasTheme = ['romantic', 'playful', 'cinematic'].includes(state.theme);
      if (!hasTheme) {
        return { valid: false, error: "Please choose a theme." };
      }
      return { valid: true };
    }

    case 3: {
      const beats = state.story_beats;
      if (beats.length < 3) {
        return { valid: false, error: "Please write at least 3 story beats." };
      }
      const allFilled = beats.every((beat) => beat.trim() !== '');
      if (!allFilled) {
        return { valid: false, error: "Please fill out all current story beats." };
      }
      return { valid: true };
    }

    case 4: {
      const memories = state.memories;
      const hasAnyTitle = memories.some((mem) => mem.title.trim() !== '');

      if (!hasAnyTitle) {
        // Completely optional
        return { valid: true };
      }

      if (memories.length < 2) {
        return { valid: false, error: "Please write at least 2 memories." };
      }
      const allFilled = memories.every((mem) => mem.title.trim() !== '');
      if (!allFilled) {
        return { valid: false, error: "Please fill out titles for all your memories." };
      }
      return { valid: true };
    }

    case 5: {
      const ask = state.ask_line.trim();
      const handover = state.handover_note.trim();
      if (!ask) {
        return { valid: false, error: "Please enter your main ask line." };
      }
      if (!handover) {
        return { valid: false, error: "Please enter your handover note." };
      }
      return { valid: true };
    }

    case 6: {
      // 1. At least 1 category selected
      if (state.date_categories.length === 0) {
        return { valid: false, error: "Please select at least one date vibe category." };
      }
      
      // 2. At least 1 activity per selected category
      for (const cat of state.date_categories) {
        const option = state.date_options.find((o) => o.category === cat);
        if (!option || option.activities.length === 0) {
          return {
            valid: false,
            error: `Please choose at least one activity under the ${cat} category.`,
          };
        }
      }

      // 3. All 3 proposed dates must be non-empty
      const datesFilled = state.proposed_dates.every((d) => d.trim() !== '');
      if (!datesFilled) {
        return { valid: false, error: "Please enter all three option dates." };
      }
      return { valid: true };
    }

    case 7: {
      const msg = state.closing_message.trim();
      if (!msg) {
        return { valid: false, error: "Please write a closing message." };
      }
      return { valid: true };
    }

    default:
      return { valid: false, error: "Invalid step." };
  }
}
