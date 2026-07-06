import * as React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Button,
  Hr,
} from '@react-email/components';

interface ExperienceCreatedEmailProps {
  creatorName?: string;
  recipientName: string;
  shareLink: string;
}

export default function ExperienceCreatedEmail({
  creatorName = 'Creator',
  recipientName,
  shareLink,
}: ExperienceCreatedEmailProps) {
  const containerStyle = {
    maxWidth: '480px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    backgroundColor: '#ffffff',
  };

  const headerStyle = {
    color: '#D4537E',
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center' as const,
    margin: '20px 0',
  };

  const headingStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#111827',
    margin: '24px 0 16px 0',
  };

  const textStyle = {
    fontSize: '15px',
    lineHeight: '1.6',
    color: '#4b5563',
  };

  const linkBoxStyle = {
    backgroundColor: '#f9fafb',
    border: '1px border #e5e7eb',
    borderRadius: '8px',
    padding: '12px',
    margin: '16px 0',
    fontFamily: 'monospace',
    fontSize: '13px',
    color: '#D4537E',
    textAlign: 'center' as const,
    wordBreak: 'break-all' as const,
  };

  const buttonStyle = {
    backgroundColor: '#D4537E',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: '600',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    padding: '12px 20px',
    margin: '20px 0',
  };

  const tipBoxStyle = {
    backgroundColor: '#fef3c7',
    border: '1px solid #fde68a',
    borderRadius: '8px',
    padding: '16px',
    margin: '24px 0',
  };

  const tipTextStyle = {
    fontSize: '13.5px',
    lineHeight: '1.5',
    color: '#78350f',
    margin: 0,
  };

  const footerStyle = {
    fontSize: '12px',
    color: '#9ca3af',
    textAlign: 'center' as const,
    marginTop: '40px',
  };

  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#fafafa', padding: '24px 0' }}>
        <Container style={containerStyle}>
          {/* Header */}
          <Text style={headerStyle}>Barua 💌</Text>
          <Hr style={{ borderColor: '#f3f4f6' }} />

          {/* Body */}
          <Heading style={headingStyle}>
            Your Barua for {recipientName} is ready
          </Heading>
          
          <Text style={textStyle}>
            Hi {creatorName},
          </Text>
          <Text style={textStyle}>
            All you have to do now is send them the link below. We&apos;ll notify you the moment they respond.
          </Text>

          {/* Link Monospace Box */}
          <Section style={linkBoxStyle}>
            {shareLink}
          </Section>

          {/* CTA Button */}
          <Button href={shareLink} style={buttonStyle}>
            Copy & share
          </Button>

          {/* Tips Box */}
          <Section style={tipBoxStyle}>
            <Text style={tipTextStyle}>
              <strong>💡 Tip:</strong> Send it with a short message asking them to spare two minutes. Don&apos;t explain what it is — the mystery is the hook.
            </Text>
          </Section>

          {/* Footer */}
          <Hr style={{ borderColor: '#f3f4f6', marginTop: '30px' }} />
          <Text style={footerStyle}>
            Made with Barua
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
