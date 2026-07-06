import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { sendResponseNotification } from '@/lib/resend/sendEmails';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { experience_id, chosen_category, chosen_activity, chosen_date } = body;

    // 1. Validate all fields are present
    if (!experience_id || !chosen_category || !chosen_activity || !chosen_date) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Initialize Supabase Service Role client to bypass RLS policies
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 2. Submit response to responses table
    const { error: responseError } = await supabaseAdmin
      .from('responses')
      .insert({
        experience_id,
        chosen_category,
        chosen_activity,
        chosen_date,
      })
      .select()
      .single();

    if (responseError) {
      // If code is 23505 (unique constraint violation), it means already responded!
      if (responseError.code === '23505') {
        return NextResponse.json(
          { success: false, error: 'already_responded' },
          { status: 409 }
        );
      }
      throw responseError;
    }

    // 3. Call logEvent() with type 'responded'
    const { error: eventError } = await supabaseAdmin
      .from('events')
      .insert({
        experience_id,
        type: 'responded',
      });

    if (eventError) {
      console.error('[API] Failed to log responded event:', eventError);
    }

    // 4. Fetch the experience to get the creator's user_id and recipient_name
    const { data: experience, error: expError } = await supabaseAdmin
      .from('experiences')
      .select('user_id, recipient_name')
      .eq('id', experience_id)
      .single();

    if (expError || !experience) {
      console.error('[API] Failed to fetch experience:', expError);
    } else {
      // 5 & 6. Fetch the creator's email and name from public.users
      const { data: creator, error: creatorError } = await supabaseAdmin
        .from('users')
        .select('email, name')
        .eq('id', experience.user_id)
        .single();

      if (creatorError || !creator) {
        console.error('[API] Failed to fetch creator profile:', creatorError);
      } else {
        // 7. Call sendResponseNotification() with all params (non-blocking)
        (async () => {
          try {
            const creatorName = creator.name || creator.email.split('@')[0];
            await sendResponseNotification({
              to: creator.email,
              creatorName,
              recipientName: experience.recipient_name,
              chosenActivity: chosen_activity,
              chosenDate: chosen_date,
              experienceId: experience_id,
            });
          } catch (err) {
            console.error('[Resend] Failed to send response notification:', err);
          }
        })();
      }
    }

    // 8. Update the experience status to 'responded' in the experiences table
    const { error: updateError } = await supabaseAdmin
      .from('experiences')
      .update({ status: 'responded' })
      .eq('id', experience_id);

    if (updateError) {
      console.error('[API] Failed to update experience status to responded:', updateError);
    }

    // 9. Return success
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error('[API] Respond endpoint error:', err);
    const msg = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
