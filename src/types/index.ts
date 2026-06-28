export interface Experience {
  id: string;
  user_id: string;
  slug: string;
  recipient_name: string;
  your_name: string;
  theme: 'romantic' | 'playful' | 'cinematic';
  tier: 'free' | 'premium';
  status: 'draft' | 'active' | 'responded';
  story_beats: string[];
  reflection: string;
  ask_line: string;
  handover_note: string;
  memories: { title: string; photo_path?: string }[];
  date_categories: ('outdoor' | 'food' | 'indoor')[];
  date_options: { category: string; activities: string[] }[];
  proposed_dates: string[];
  closing_message: string;
  created_at: string;
}

export interface Response {
  id: string;
  experience_id: string;
  chosen_category: string;
  chosen_activity: string;
  chosen_date: string;
  responded_at: string;
}

export interface Event {
  id: string;
  experience_id: string;
  type: 'opened' | 'responded' | 'shared';
  meta?: string;
  occurred_at: string;
}
