import type { Metadata } from 'next';
import './globals.css';
import Header from '@/Components/Header/Header';
import Footer from '@/Components/Footer/Footer';
import Breadcrumb from '@/Components/Breadcrumb/Breadcrumb';
import { Noto_Sans, DM_Sans } from 'next/font/google';
import { headers } from 'next/headers';

import { siteConfig } from '@/config/site';

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  const isAdmin = pathname.startsWith('/admin') || pathname === '/login';

  if (isAdmin) {
    return (
      <html lang="en" className={`${notoSans.variable} ${dmSans.variable}`}>
        <body className={`${notoSans.className} min-h-screen bg-gray-50 flex flex-col`}>
          <main className="flex-grow flex flex-col">{children}</main>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className={`${notoSans.variable} ${dmSans.variable}`}>
      <body className={`${notoSans.className} min-h-screen flex flex-col justify-between`}>
        <div>
          <Header />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumb />
          </div>
          <main className="flex-grow">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}

