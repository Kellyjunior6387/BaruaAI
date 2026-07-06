import { render } from '@react-email/components';
import React from 'react';
import ResponseNotificationEmail from '@/lib/resend/emails/ResponseNotificationEmail';
import ExperienceCreatedEmail from '@/lib/resend/emails/ExperienceCreatedEmail';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Guard the route: only accessible in development
  if (process.env.NODE_ENV !== 'development') {
    return new Response('Not found', { status: 404 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  try {
    if (type === 'response') {
      const html = await render(
        React.createElement(ResponseNotificationEmail, {
          creatorName: 'Aidan',
          recipientName: 'Sarah',
          chosenActivity: 'Stargazing at the observatory 🌟',
          chosenDate: 'Friday, Oct 15th at 7:30 PM',
          experienceUrl: 'http://localhost:3000/dashboard/test-id',
        })
      );
      return new Response(html, {
        headers: { 'Content-Type': 'text/html' },
      });
    }

    if (type === 'created') {
      const html = await render(
        React.createElement(ExperienceCreatedEmail, {
          creatorName: 'Aidan',
          recipientName: 'Sarah',
          shareLink: 'http://localhost:3000/for/sarah-4x92',
        })
      );
      return new Response(html, {
        headers: { 'Content-Type': 'text/html' },
      });
    }

    return NextResponse.json(
      { error: 'Invalid or missing type parameter. Use type=response or type=created.' },
      { status: 400 }
    );
  } catch (err: unknown) {
    console.error('[Preview API] Failed to render email template:', err);
    const msg = err instanceof Error ? err.message : 'Render error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
