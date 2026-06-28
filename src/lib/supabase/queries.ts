import { createClient } from './server';
import type { Experience, Response, Event } from '../../types';

/**
 * Fetches a single active experience by slug, no auth needed
 */
export async function getExperienceBySlug(slug: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'active')
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // Postgrest error code for "0 rows returned" when expecting a single row
      return null;
    }
    throw error;
  }

  return data as Experience;
}

/**
 * Fetches all experiences for a logged-in creator
 */
export async function getExperiencesByUser(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Experience[];
}

/**
 * Inserts a new experience, returns the created record
 */
export async function createExperience(data: Partial<Experience>) {
  const supabase = createClient();
  const { data: createdData, error } = await supabase
    .from('experiences')
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return createdData as Experience;
}

/**
 * Updates an experience by id
 */
export async function updateExperience(id: string, data: Partial<Experience>) {
  const supabase = createClient();
  const { data: updatedData, error } = await supabase
    .from('experiences')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return updatedData as Experience;
}

/**
 * Inserts a response record
 */
export async function submitResponse(data: Partial<Response>) {
  const supabase = createClient();
  const { data: responseData, error } = await supabase
    .from('responses')
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return responseData as Response;
}

/**
 * Inserts an event row for analytics
 */
export async function logEvent(
  experienceId: string,
  type: Event['type'],
  meta?: object
) {
  const supabase = createClient();
  const { data: eventData, error } = await supabase
    .from('events')
    .insert({
      experience_id: experienceId,
      type,
      meta,
    })
    .select()
    .single();

  if (error) throw error;
  return eventData as Event;
}
