'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/Components/Header/Header';
import Footer from '@/Components/Footer/Footer';
import Breadcrumb from '@/Components/Breadcrumb/Breadcrumb';

export default function RootLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <main className="min-h-screen bg-[#ecf0f5]">{children}</main>;
  }

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb />
        </div>
        <main className="flex-grow">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
