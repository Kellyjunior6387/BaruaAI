import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: 'Barua — Say it better than words',
    template: '%s · Barua',
  },
  description:
    "Turn your feelings into a personalised interactive experience. For the person you've been thinking about.",
  keywords: ['ask someone out', 'personalised experience', 'romantic gesture', 'Nairobi', 'Kenya'],
  openGraph: {
    title: 'Barua — Say it better than words',
    description: 'Turn your feelings into a personalised interactive experience.',
    siteName: 'Barua',
    locale: 'en_KE',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
