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

interface ResponseNotificationEmailProps {
  creatorName?: string;
  recipientName: string;
  chosenActivity: string;
  chosenDate: string;
  experienceUrl: string;
}

export default function ResponseNotificationEmail({
  creatorName = 'Creator',
  recipientName,
  chosenActivity,
  chosenDate,
  experienceUrl,
}: ResponseNotificationEmailProps) {
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

  const summaryBoxStyle = {
    backgroundColor: '#f3f4f6',
    borderRadius: '12px',
    padding: '20px',
    margin: '24px 0',
  };

  const summaryLineStyle = {
    fontSize: '15px',
    fontWeight: '500',
    color: '#1f2937',
    margin: '8px 0',
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
    margin: '24px 0',
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
            {recipientName} responded to your Barua
          </Heading>
          
          <Text style={textStyle}>
            Hi {creatorName},
          </Text>
          <Text style={textStyle}>
            Great news — here&apos;s what they chose for your date:
          </Text>

          {/* Summary Box */}
          <Section style={summaryBoxStyle}>
            <Text style={{ ...summaryLineStyle, marginTop: 0 }}>
              🎯 <strong>Activity:</strong> {chosenActivity}
            </Text>
            <Text style={{ ...summaryLineStyle, marginBottom: 0 }}>
              📅 <strong>Date:</strong> {chosenDate}
            </Text>
          </Section>

          {/* Action Button */}
          <Button href={experienceUrl} style={buttonStyle}>
            View in dashboard
          </Button>

          {/* Footer */}
          <Hr style={{ borderColor: '#f3f4f6', marginTop: '30px' }} />
          <Text style={footerStyle}>
            Made with Barua · Unsubscribe
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
