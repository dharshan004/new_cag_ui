'use client';

import React from 'react';
import NamesDetailsCard from '@/Reusable components/Cards/Names & Details Cards/NamesDetailsCard';

export default function ResourcesPage() {
  const resourceCategories = [
    {
      title: 'Audit Manuals & Technical Guides',
      content: 'Access official audit manuals including the Regulations on Audit & Accounts, MSO (Audit), IT Audit Manual, and Revenue Audit guides.',
      href: '#manuals'
    },
    {
      title: 'Guidance Notes & Accounting Standards',
      content: 'Explore guidance papers, accounting frameworks, and policy manuals issued by the GASAB (Government Accounting Standards Advisory Board).',
      href: '#standards'
    },
    {
      title: 'Gazette Notifications & Regulations',
      content: 'View historical gazette notifications, constitutional provisions (Articles 148-151), and official CAG mandates.',
      href: '#regulations'
    },
    {
      title: 'Departmental Circulars & Rules',
      content: 'Read internal IAAD circulars, recruitments regulations, staff orders, and administrative instructions.',
      href: '#circulars'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="border-b border-[#e6e6e6] pb-4">
        <h2 className="text-3xl font-extrabold text-[#2a2a2a] tracking-tight">Resources &amp; Library</h2>
        <p className="text-sm text-zinc-500 mt-1">Official manual guides, accounting publications, and circular documents library.</p>
      </div>

      <section className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resourceCategories.map((cat, idx) => (
            <NamesDetailsCard
              key={idx}
              title={cat.title}
              content={cat.content}
              href={cat.href}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
