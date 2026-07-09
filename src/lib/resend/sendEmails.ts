import { render } from '@react-email/components';
import { resend } from './client';
import ResponseNotificationEmail from './emails/ResponseNotificationEmail';
import ExperienceCreatedEmail from './emails/ExperienceCreatedEmail';
import React from 'react';

interface SendResponseNotificationParams {
  to: string;
  creatorName: string;
  recipientName: string;
  chosenActivity: string;
  chosenDate: string;
  experienceId: string;
}

interface SendExperienceCreatedParams {
  to: string;
  creatorName: string;
  recipientName: string;
  experienceId: string;
  slug: string;
}

export async function sendResponseNotification({
  to,
  creatorName,
  recipientName,
  chosenActivity,
  chosenDate,
  experienceId,
}: SendResponseNotificationParams) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const experienceUrl = `${baseUrl}/dashboard/${experienceId}`;

    // Pre-render the React template to HTML to bypass Resend SDK's internal render engine issues
    const html = await render(
      React.createElement(ResponseNotificationEmail, {
        creatorName,
        recipientName,
        chosenActivity,
        chosenDate,
        experienceUrl,
      })
    );

    const { data, error } = await resend.emails.send({
      from: 'hello@barua.me',
      to,
      subject: `💌 ${recipientName} responded to your Barua`,
      html,
    });

    if (error) {
      console.error('[Resend] Failed to send response notification:', error);
      return { success: false };
    }

    console.log('[Resend] Response notification email sent successfully:', data?.id);
    return { success: true };
  } catch (err) {
    console.error('[Resend] Failed to send response notification:', err);
    return { success: false };
  }
}

export async function sendExperienceCreated(params: SendExperienceCreatedParams) {
  const { to, creatorName, recipientName, slug } = params;
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const shareLink = `${baseUrl}/for/${slug}`;

    // Pre-render the React template to HTML to bypass Resend SDK's internal render engine issues
    const html = await render(
      React.createElement(ExperienceCreatedEmail, {
        creatorName,
        recipientName,
        shareLink,
      })
    );

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to,
      subject: `Your Barua for ${recipientName} is ready 💌`,
      html,
    });

    if (error) {
      console.error('[Resend] Failed to send creation notification:', error);
      return { success: false };
    }

    console.log('[Resend] Creation notification email sent successfully:', data?.id);
    return { success: true };
  } catch (err) {
    console.error('[Resend] Failed to send creation notification:', err);
    return { success: false };
  }
}
