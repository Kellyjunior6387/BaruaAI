'use server';

import { createExperience as dbCreateExperience } from '../../lib/supabase/queries';
import type { Experience } from '../../types';

export async function saveExperienceAction(data: Partial<Experience>) {
  return await dbCreateExperience(data);
}
