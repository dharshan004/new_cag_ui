import type { Metadata } from 'next';
import './globals.css';
import Header from '@/Components/Header/Header';
import Footer from '@/Components/Footer/Footer';
import Breadcrumb from '@/Components/Breadcrumb/Breadcrumb';
import { Inter } from 'next/font/google';

import { siteConfig } from '@/config/site';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-inter',
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
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} min-h-screen flex flex-col justify-between`}>
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

