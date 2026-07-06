'use server';

import { createExperience as dbCreateExperience } from '../../lib/supabase/queries';
import { createClient } from '../../lib/supabase/server';
import { sendExperienceCreated } from '../../lib/resend/sendEmails';
import type { Experience } from '../../types';

export async function saveExperienceAction(data: Partial<Experience>) {
  const result = await dbCreateExperience(data);

  if (result && result.slug) {
    // Non-blocking fire-and-forget email sending
    (async () => {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user && user.email) {
          // Query creator profile name
          const { data: userData } = await supabase
            .from('users')
            .select('name')
            .eq('id', user.id)
            .single();

          const creatorName = userData?.name || user.email.split('@')[0];

          await sendExperienceCreated({
            to: user.email,
            creatorName,
            recipientName: result.recipient_name,
            experienceId: result.id,
            slug: result.slug,
          });
        }
      } catch (err) {
        console.error('[Resend] Silent failure sending experience created email:', err);
      }
    })();
  }

  return result;
}
