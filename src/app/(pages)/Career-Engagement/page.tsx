'use client';

import React from 'react';
import NamesDetailsCard from '@/Reusable components/Cards/Names & Details Cards/NamesDetailsCard';

export default function CareerEngagementPage() {
  const recruitmentStreams = [
    {
      title: 'Indian Audit & Accounts Service (IA&AS)',
      content: 'Recruited through Union Public Service Commission (UPSC) Civil Services Examination. Officers manage supreme audits of government ministries.'
    },
    {
      title: 'Direct Recruitment via Staff Selection Commission (SSC)',
      content: 'Audit officers, senior auditors, and clerical executives recruited through the Combined Graduate Level (CGL) examination conducted by SSC.'
    },
    {
      title: 'Young Professional and Internship Programs',
      content: 'We offer contract positions and internships for graduates in statistics, economics, and computer applications.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="border-b border-[#e6e6e6] pb-4">
        <h2 className="text-3xl font-extrabold text-[#2a2a2a] tracking-tight">Careers &amp; Engagement</h2>
        <p className="text-sm text-zinc-500 mt-1">Join the Comptroller &amp; Auditor General of India to build transparency in governance.</p>
      </div>

      <section className="space-y-6">
        <div className="border-l-4 border-[#0a3d30] pl-4">
          <h3 className="text-xl font-bold text-[#2a2a2a]">Recruitment Pathways</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recruitmentStreams.map((stream, idx) => (
            <NamesDetailsCard
              key={idx}
              title={stream.title}
              content={stream.content}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
