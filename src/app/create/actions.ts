'use server';

import { createClient as createSupabaseAdminClient } from '@supabase/supabase-js';
import { createExperience as dbCreateExperience, updateExperience as dbUpdateExperience } from '../../lib/supabase/queries';
import { createClient } from '../../lib/supabase/server';
import { sendExperienceCreated } from '../../lib/resend/sendEmails';
import { revalidatePath } from 'next/cache';
import type { Experience } from '../../types';

export async function updateExperienceAction(id: string, data: Partial<Experience>) {
  // If the status is being set/reset to active, clear any existing responses
  if (data.status === 'active') {
    try {
      const supabaseAdmin = createSupabaseAdminClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );
      const { error } = await supabaseAdmin
        .from('responses')
        .delete()
        .eq('experience_id', id);
      
      if (error) throw error;
      console.log(`[Admin] Cleared old responses for edited experience: ${id}`);
    } catch (err) {
      console.error('[Admin] Failed to clear responses during update:', err);
    }
  }

  const result = await dbUpdateExperience(id, data);
  revalidatePath('/dashboard');
  revalidatePath(`/dashboard/${id}`);
  if (result && result.slug) {
    revalidatePath(`/for/${result.slug}`);
  }
  return result;
}

export async function saveExperienceAction(data: Partial<Experience>) {
  const result = await dbCreateExperience(data);
  return result;
}
