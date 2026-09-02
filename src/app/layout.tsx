import type { Metadata } from 'next';
import './globals.css';
import { Noto_Sans, DM_Sans } from 'next/font/google';
import { siteConfig } from '@/config/site';
import RootLayoutWrapper from './RootLayoutWrapper';

const notoSans = Noto_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-noto',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
  variable: '--font-dm',
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.tagline,
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${notoSans.variable} ${dmSans.variable}`}>
      <body className={`${notoSans.className} min-h-screen`}>
        <RootLayoutWrapper>{children}</RootLayoutWrapper>
      </body>
    </html>
  );
}

