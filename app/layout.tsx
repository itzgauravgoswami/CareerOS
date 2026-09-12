import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'CareerOS — AI-Powered Skill Intelligence Network',
  description: 'AI-Powered Academia–Industry Skill Intelligence Network connecting Students, Academicians, Institutions, and Industry.',
  openGraph: {
    title: 'CareerOS — AI-Powered Skill Intelligence Network',
    description: 'AI-Powered Academia–Industry Skill Intelligence Network connecting Students, Academicians, Institutions, and Industry.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CareerOS — AI-Powered Skill Intelligence Network',
    description: 'AI-Powered Academia–Industry Skill Intelligence Network connecting Students, Academicians, Institutions, and Industry.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
