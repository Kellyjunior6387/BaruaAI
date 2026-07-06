import { Resend } from 'resend';

/**
 * DEV NOTE: 
 * - Sign up at resend.com (free tier allows 3,000 emails/month).
 * - For development, Resend's free tier restricts sending emails ONLY to your own verified account email address.
 * - Make sure you verify your domain in the Resend dashboard before going live in production.
 */
export const resend = new Resend(process.env.RESEND_API_KEY);
