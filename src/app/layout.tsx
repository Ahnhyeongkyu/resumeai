import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ToastProvider } from '@/components/shared/Toast';
import CookieBanner from '@/components/shared/CookieBanner';
import Analytics from '@/components/shared/Analytics';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
});

export const metadata: Metadata = {
  title: 'ResumeAI - AI Resume Builder | ATS-Optimized in 30 Seconds',
  description:
    'Paste any job description. AI builds a tailored, ATS-optimized resume in 30 seconds. Free to build, $9 to download. No subscription.',
  openGraph: {
    title: 'Your Resume Gets 6 Seconds. Make Them Count.',
    description:
      'AI builds ATS-optimized resumes for any job. Pay once, no subscription. Free to start.',
    siteName: 'ResumeAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Resume Gets 6 Seconds. Make Them Count.',
    description:
      'AI builds ATS-optimized resumes for any job. Pay once, no subscription. Free to start.',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://getresumeai.site'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body className="font-sans bg-white text-gray-900 antialiased">
        <Analytics />
        <ToastProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:bg-brand focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
          >
            Skip to content
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <CookieBanner />
          <VercelAnalytics />
        </ToastProvider>
      </body>
    </html>
  );
}
