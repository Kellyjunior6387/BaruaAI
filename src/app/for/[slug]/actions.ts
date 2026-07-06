'use server';

import { submitResponse as dbSubmitResponse, logEvent as dbLogEvent } from '../../../lib/supabase/queries';
import type { Response, Event } from '../../../types';

export async function submitResponseAction(data: Partial<Response>) {
  return await dbSubmitResponse(data);
}

export async function logEventAction(
  experienceId: string,
  type: Event['type'],
  meta?: object
) {
  return await dbLogEvent(experienceId, type, meta);
}
