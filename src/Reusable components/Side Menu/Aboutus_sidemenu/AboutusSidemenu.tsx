'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AboutusSidemenu() {
  const pathname = usePathname();
  
  const subcategories = [
    { name: 'CAG of India Profile', slug: 'cag-profile' },
    { name: 'Vision, Mission & Values', slug: 'vision-mission' },
    { name: 'Organisation Chart', slug: 'organisation-chart' },
    { name: 'History of IAAD', slug: 'history' },
    { name: 'Former CAGs Gallery', slug: 'former-cags' },
    { name: 'Audit Advisory Board', slug: 'audit-advisory-board' },
  ];

  return (
    <div className="bg-white border border-[#d7d7d7] rounded-xl p-5 shadow-sm space-y-4">
      <h3 className="text-sm font-bold text-[#2a2a2a] border-b border-[#e6e6e6] pb-2">
        About Us Section
      </h3>
      <nav className="flex flex-col space-y-1">
        {subcategories.map((sub) => {
          const href = `/About/About%20Us/${encodeURIComponent(sub.name)}`;
          // Support checking active state
          const isActive = pathname.toLowerCase().includes(sub.slug) || pathname.toLowerCase().includes(encodeURIComponent(sub.name).toLowerCase());
          return (
            <Link
              key={sub.slug}
              href={href}
              className={`text-xs px-3 py-2 rounded-lg transition-colors text-left ${
                isActive
                  ? 'bg-[#0a3d30] text-white font-semibold'
                  : 'hover:bg-[#eee] text-zinc-700'
              }`}
            >
              {sub.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
