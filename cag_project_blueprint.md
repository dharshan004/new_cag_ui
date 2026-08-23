# Project Codebase Blueprint — Next.js + TypeScript + FastAPI + ShaktiDB

This document contains the complete, modular source code blueprint for the Comptroller and Auditor General (CAG) of India web application based on the 16 Figma mockup screens. Use these files to construct the project.

---

## 1. Frontend Configuration & Global Layout

### `tailwind.config.ts`
```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cag: {
          green: {
            DEFAULT: '#267C55',
            hover: '#1e6243',
            light: '#e9f5ef',
          },
          dark: '#2A2A2A',
          gray: {
            DEFAULT: '#E1E1E1',
            light: '#F5F5F5',
            border: '#E6E6E6',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
```

### `src/app/globals.css`
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-cag-gray-light text-cag-dark font-sans antialiased;
}

/* Micro-animations and utility classes */
.cag-card-hover {
  @apply transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:border-cag-green;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  @apply bg-transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-cag-green/20 rounded-full hover:bg-cag-green/40;
}
```

### `src/app/layout.tsx`
```tsx
import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import Breadcrumb from '@/components/common/Breadcrumb';

export const metadata: Metadata = {
  title: 'Comptroller and Auditor General of India',
  description: 'Supreme Audit Institution of India - Transparency, Integrity & Accountability',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col justify-between">
        <div>
          <Navbar />
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
```

---

## 2. Reusable Layout Components

### `src/components/common/Navbar.tsx`
```tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Subcategory {
  name: string;
  slug: string;
}

interface Category {
  name: string;
  slug: string;
  subcategories: Subcategory[];
}

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  // Mock static layout navigation based on Figma designs
  const navigation: Category[] = [
    {
      name: 'About Us',
      slug: 'about',
      subcategories: [
        { name: 'CAG of India Profile', slug: 'cag-profile' },
        { name: 'Vision, Mission & Values', slug: 'vision-mission' },
        { name: 'Organisation Chart', slug: 'organisation-chart' },
        { name: 'History of IAAD', slug: 'history' },
        { name: 'Former CAGs Gallery', slug: 'former-cags' },
        { name: 'International Relations', slug: 'international-relations' },
        { name: 'Audit Advisory Board', slug: 'audit-advisory-board' },
      ],
    },
    {
      name: 'Reports & Publications',
      slug: 'reports',
      subcategories: [
        { name: 'Audit Reports Directory', slug: '' },
      ],
    },
  ];

  return (
    <header className="bg-white border-b border-cag-gray-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Branding */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 relative bg-cag-green rounded-full flex items-center justify-center text-white font-bold">
              CAG
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-cag-dark leading-none">
                COMPTROLLER & AUDITOR GENERAL OF INDIA
              </h1>
              <p className="text-xs text-zinc-500 mt-1">Supreme Audit Institution of India</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="flex space-x-8">
            <Link href="/" className="text-sm font-medium hover:text-cag-green py-2">
              Home
            </Link>

            {navigation.map((category) => (
              <div
                key={category.slug}
                className="relative"
                onMouseEnter={() => setActiveMenu(category.slug)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button className="text-sm font-medium hover:text-cag-green py-2 flex items-center gap-1 focus:outline-none">
                  {category.name}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Submenu Dropdown Overlay (Figma Mockups 2, 5, 6) */}
                {activeMenu === category.slug && (
                  <div className="absolute left-0 mt-0 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 z-50">
                    <div className="py-1">
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub.slug}
                          href={`/${category.slug}/${sub.slug}`}
                          className="block px-4 py-2 text-sm text-cag-dark hover:bg-cag-green-light hover:text-cag-green transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <Link href="/reports" className="text-sm font-medium text-white bg-cag-green px-4 py-2 rounded-md hover:bg-cag-green-hover transition-colors">
              Explore Reports
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
```

### `src/components/common/Footer.tsx`
```tsx
import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-cag-dark text-white border-t border-zinc-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-zinc-400 tracking-wider uppercase mb-4">
              CAG of India
            </h3>
            <p className="text-sm text-zinc-300">
              Supreme Audit Institution mandated to bring transparency and financial accountability under the Indian Constitution.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-400 tracking-wider uppercase mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-zinc-300">
              <li><Link href="/reports" className="hover:text-cag-green">Audit Reports</Link></li>
              <li><Link href="/about/organisation-chart" className="hover:text-cag-green">Organisational Structure</Link></li>
              <li><Link href="/about/vision-mission" className="hover:text-cag-green">Vision & Values</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-400 tracking-wider uppercase mb-4">
              External Portals
            </h3>
            <ul className="space-y-2 text-sm text-zinc-300">
              <li><a href="https://india.gov.in" target="_blank" rel="noreferrer" className="hover:text-cag-green">National Portal of India</a></li>
              <li><a href="https://intosai.org" target="_blank" rel="noreferrer" className="hover:text-cag-green">INTOSAI</a></li>
              <li><a href="https://asosai.org" target="_blank" rel="noreferrer" className="hover:text-cag-green">ASOSAI</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-400 tracking-wider uppercase mb-4">
              Contact Desk
            </h3>
            <p className="text-sm text-zinc-300">
              Pocket-9, Deen Dayal Upadhyaya Marg, New Delhi - 110124
            </p>
            <p className="text-sm text-zinc-300 mt-2">Email: cagoffice@cag.gov.in</p>
          </div>
        </div>
        <div className="mt-8 border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-zinc-400">
          <p>© {new Date().getFullYear()} Comptroller & Auditor General of India. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link href="/terms" className="hover:underline">Terms of Service</Link>
            <Link href="/sitemap" className="hover:underline">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

### `src/components/common/Breadcrumb.tsx`
```tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumb() {
  const pathname = usePathname();
  if (pathname === '/') return null;

  const paths = pathname.split('/').filter(Boolean);

  return (
    <nav className="text-sm text-zinc-500 flex items-center gap-2">
      <Link href="/" className="hover:text-cag-green">Home</Link>
      {paths.map((path, idx) => {
        const url = `/${paths.slice(0, idx + 1).join('/')}`;
        const isLast = idx === paths.length - 1;
        const displayName = path.replace(/-/g, ' ');

        return (
          <React.Fragment key={path}>
            <span>/</span>
            {isLast ? (
              <span className="capitalize text-zinc-800 font-semibold">{displayName}</span>
            ) : (
              <Link href={url} className="hover:text-cag-green capitalize">{displayName}</Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
```

---

## 3. About Subcategory Layout System

### `src/app/about/[subcategory]/page.tsx`
```tsx
import React from 'react';
import { notFound } from 'next/navigation';
import OrgChartTree from '@/components/about/OrgChartTree';
import DocumentList from '@/components/about/DocumentList';
import FormerCAGs from '@/components/about/FormerCAGs';

interface SubcategoryPageProps {
  params: {
    subcategory: string;
  };
}

async function getPageData(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pages/${slug}`, {
    cache: 'no-store',
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function AboutSubcategoryPage({ params }: SubcategoryPageProps) {
  const data = await getPageData(params.subcategory);
  
  if (!data) {
    // If the database API fails, fallback to rendering interactive custom client components directly
    const specialComponents: Record<string, React.ReactNode> = {
      'organisation-chart': <OrgChartTree />,
      'history': <DocumentList />,
      'former-cags': <FormerCAGs />,
    };

    if (params.subcategory in specialComponents) {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {specialComponents[params.subcategory]}
        </div>
      );
    }
    return notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-3xl font-extrabold text-cag-dark tracking-tight border-b border-cag-gray-border pb-4 mb-6">
        {data.title}
      </h2>
      <div 
        className="prose prose-emerald max-w-none text-zinc-700 leading-relaxed space-y-6"
        dangerouslySetInnerHTML={{ __html: data.content_html }}
      />
    </div>
  );
}
```

### `src/components/about/OrgChartTree.tsx`
```tsx
'use client';

import React, { useState, useEffect } from 'react';

interface Officer {
  id: string;
  name: string;
  designation: string;
  email: string;
  phone: string;
  tier: number;
  children: Officer[];
}

export default function OrgChartTree() {
  const [hierarchy, setHierarchy] = useState<Officer | null>(null);
  const [selectedOfficer, setSelectedOfficer] = useState<Officer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/officers`)
      .then((res) => res.json())
      .then((data) => {
        setHierarchy(data);
        setLoading(false);
      })
      .catch(() => {
        // Fallback mock hierarchy hierarchy representation
        setHierarchy({
          id: '1',
          name: 'Shri K. Sanjay Murthy',
          designation: 'Comptroller & Auditor General of India',
          email: 'cagindia@cag.gov.in',
          phone: '+91-11-23235790',
          tier: 1,
          children: [
            {
              id: '2',
              name: 'Shri Vishvanath Singh Jadon',
              designation: 'Secretary to CAG',
              email: 'sec-cag@cag.gov.in',
              phone: '+91-11-23239843',
              tier: 2,
              children: [],
            },
            {
              id: '3',
              name: 'Shri K. S. Subramanian',
              designation: 'Deputy CAG (Reports)',
              email: 'ksubramanian@cag.gov.in',
              phone: '+91-11-23231123',
              tier: 2,
              children: [],
            },
            {
              id: '4',
              name: 'Ms. Geeta Menon',
              designation: 'Deputy CAG (Administration)',
              email: 'geetamenon@cag.gov.in',
              phone: '+91-11-23234455',
              tier: 2,
              children: [],
            },
          ],
        });
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-10 text-cag-green font-medium">Loading Organisation Chart...</div>;

  return (
    <div className="bg-white border border-cag-gray-border rounded-xl p-8 shadow-sm">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-cag-dark">Organisational Structure</h2>
        <p className="text-sm text-zinc-500 mt-1">Indian Audit and Accounts Department (IAAD)</p>
      </div>

      {/* Basic Node Tree Representation */}
      <div className="flex flex-col items-center">
        {hierarchy && (
          <div className="flex flex-col items-center">
            {/* Top Node */}
            <div
              onClick={() => setSelectedOfficer(hierarchy)}
              className="bg-cag-green text-white p-4 rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform text-center w-64"
            >
              <h3 className="font-semibold text-sm">{hierarchy.name}</h3>
              <p className="text-xs opacity-90 mt-1">{hierarchy.designation}</p>
            </div>

            {/* Connecting lines */}
            <div className="w-1 h-8 bg-cag-green/30"></div>

            {/* Child Tiers */}
            <div className="flex flex-wrap justify-center gap-6">
              {hierarchy.children.map((child) => (
                <div
                  key={child.id}
                  onClick={() => setSelectedOfficer(child)}
                  className="bg-cag-green-light border border-cag-green/20 hover:border-cag-green p-4 rounded-lg cursor-pointer text-center w-56 cag-card-hover"
                >
                  <h4 className="font-semibold text-xs text-cag-green">{child.name}</h4>
                  <p className="text-3xs text-zinc-500 mt-1">{child.designation}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Interactive Node Drawer/Modal State (Figma Mockup 10) */}
      {selectedOfficer && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl relative border border-cag-gray-border">
            <button
              onClick={() => setSelectedOfficer(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 focus:outline-none"
            >
              ✕
            </button>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-cag-green/10 text-cag-green rounded-full flex items-center justify-center font-bold text-lg">
                {selectedOfficer.name.substring(5, 6) || 'O'}
              </div>
              <div>
                <h3 className="font-bold text-cag-dark">{selectedOfficer.name}</h3>
                <p className="text-xs text-zinc-500">{selectedOfficer.designation}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm border-t border-cag-gray-border pt-4">
              <p className="flex justify-between"><span className="text-zinc-500">Email:</span> <span className="font-medium">{selectedOfficer.email}</span></p>
              <p className="flex justify-between"><span className="text-zinc-500">Telephone:</span> <span className="font-medium">{selectedOfficer.phone}</span></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

### `src/components/about/DocumentList.tsx`
```tsx
'use client';

import React from 'react';

interface DocumentChapter {
  chapter: string;
  title: string;
  size: string;
  url: string;
}

export default function DocumentList() {
  const chapters: DocumentChapter[] = [
    { chapter: 'Chapter 1', title: 'Constitutional Mandate & Authority of Auditor General', size: '2.4 MB', url: '#' },
    { chapter: 'Chapter 2', title: 'Audit of Union Government Accounts & Budgets', size: '1.8 MB', url: '#' },
    { chapter: 'Chapter 3', title: 'Thematic Audit of Railways & Scientific Departments', size: '3.1 MB', url: '#' },
    { chapter: 'Chapter 4', title: 'State Level Audit & Decentralised Panchayati Raj Institutions', size: '4.2 MB', url: '#' },
  ];

  return (
    <div className="bg-white border border-cag-gray-border rounded-xl p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-cag-dark">Historical Publications Archive</h3>
        <p className="text-xs text-zinc-500 mt-1">Download specific chapters of the IAAD Thematic History books.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-cag-gray-border text-sm">
          <thead className="bg-cag-gray-light text-zinc-700">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Volume Chapter</th>
              <th className="px-6 py-3 text-left font-semibold">Title</th>
              <th className="px-6 py-3 text-left font-semibold">Size</th>
              <th className="px-6 py-3 text-right font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cag-gray-border">
            {chapters.map((chap, idx) => (
              <tr key={idx} className="hover:bg-zinc-50 transition-colors">
                <td className="px-6 py-4 font-medium text-cag-green">{chap.chapter}</td>
                <td className="px-6 py-4 text-cag-dark">{chap.title}</td>
                <td className="px-6 py-4 text-zinc-500">{chap.size}</td>
                <td className="px-6 py-4 text-right">
                  <a
                    href={chap.url}
                    className="inline-flex items-center gap-1 text-xs text-white bg-cag-green hover:bg-cag-green-hover px-3 py-1.5 rounded transition-colors"
                  >
                    Download PDF
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

### `src/components/about/FormerCAGs.tsx`
```tsx
'use client';

import React from 'react';

interface FormerCAG {
  name: string;
  tenure: string;
  description: string;
}

export default function FormerCAGs() {
  const legacyList: FormerCAG[] = [
    { name: 'Shri Girish Chandra Murmu', tenure: '2020 – 2024', description: 'Mandated transparency during key technological transformations in public accounts auditing.' },
    { name: 'Shri Rajiv Mehrishi', tenure: '2017 – 2020', description: 'Streamlined environmental and compliance audits for state and central bodies.' },
    { name: 'Shri Shashi Kant Sharma', tenure: '2013 – 2017', description: 'Emphasized IT auditing frameworks across municipal and local bodies.' },
    { name: 'Shri Vinod Rai', tenure: '2008 – 2013', description: 'Pioneered landmark audits of national resource allocation frameworks.' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-cag-dark">Legacy of Leadership</h3>
        <p className="text-sm text-zinc-500 mt-1">Former Comptroller and Auditors General of India</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {legacyList.map((cag, idx) => (
          <div key={idx} className="bg-white border border-cag-gray-border rounded-xl p-6 shadow-sm cag-card-hover flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-500 font-bold shrink-0">
              CAG
            </div>
            <div>
              <h4 className="font-bold text-cag-dark">{cag.name}</h4>
              <p className="text-xs text-cag-green font-semibold mt-0.5">{cag.tenure}</p>
              <p className="text-xs text-zinc-500 mt-2 leading-relaxed">{cag.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 4. Reports Directory Module

### `src/app/reports/page.tsx`
```tsx
'use client';

import React, { useState, useEffect } from 'react';
import SidebarFilters from '@/components/reports/SidebarFilters';
import ReportCard from '@/components/reports/ReportCard';
import Pagination from '@/components/reports/Pagination';

interface Report {
  id: string;
  title: string;
  sector: string;
  admin_level: string;
  report_type: string;
  published_date: string;
  file_url: string;
}

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  // Filters State
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const params = new URLSearchParams({
      page: page.toString(),
      level: selectedLevel,
      sector: selectedSector,
      type: selectedType,
      query: searchQuery,
    });

    fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/reports?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setReports(data.items);
        setTotalCount(data.total);
      })
      .catch(() => {
        // Fallback mockup items
        const mockReports: Report[] = [
          { id: '1', title: 'Audit Report on Defence Procurement & Logistics Support (Union Government)', sector: 'Defence', admin_level: 'Union', report_type: 'Performance', published_date: '2026-03-12', file_url: '#' },
          { id: '2', title: 'Audit Report on State Highway Networks (State Government of Maharashtra)', sector: 'Transport', admin_level: 'States', report_type: 'Compliance', published_date: '2026-04-05', file_url: '#' },
          { id: '3', title: 'Thematic Audit of Rural Employment Schemes & Welfare Budgets', sector: 'Social Welfare', admin_level: 'Local Bodies', report_type: 'Compliance', published_date: '2026-05-18', file_url: '#' },
        ];
        setReports(mockReports);
        setTotalCount(3);
      });
  }, [page, selectedLevel, selectedSector, selectedType, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Filter controls (Mockup 3/4) */}
        <aside className="w-full lg:w-64 shrink-0">
          <SidebarFilters
            selectedLevel={selectedLevel}
            setSelectedLevel={setSelectedLevel}
            selectedSector={selectedSector}
            setSelectedSector={setSelectedSector}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
        </aside>

        {/* Reports Grid & Search area */}
        <main className="flex-grow space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white border border-cag-gray-border p-4 rounded-xl shadow-sm">
            <div className="w-full sm:max-w-md relative">
              <input
                type="text"
                placeholder="Search Reports by Title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-cag-gray-border rounded-lg text-sm focus:outline-none focus:border-cag-green"
              />
              <span className="absolute left-3 top-2.5 text-zinc-400">🔍</span>
            </div>
            <div className="text-xs text-zinc-500">{totalCount} audit reports found</div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {reports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>

          <Pagination page={page} setPage={setPage} totalCount={totalCount} />
        </main>
      </div>
    </div>
  );
}
```

### `src/components/reports/SidebarFilters.tsx`
```tsx
import React from 'react';

interface SidebarFiltersProps {
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  selectedSector: string;
  setSelectedSector: (sector: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
}

export default function SidebarFilters({
  selectedLevel,
  setSelectedLevel,
  selectedSector,
  setSelectedSector,
  selectedType,
  setSelectedType,
}: SidebarFiltersProps) {
  const levels = ['All', 'Union', 'States', 'Local Bodies'];
  const sectors = ['All', 'Finance', 'Social Welfare', 'Transport', 'Defence', 'Environment'];
  const types = ['All', 'Compliance', 'Performance', 'Financial'];

  return (
    <div className="bg-white border border-cag-gray-border rounded-xl p-5 shadow-sm space-y-6">
      <div>
        <h3 className="text-sm font-bold text-cag-dark border-b border-cag-gray-border pb-2 mb-3">
          Administrative Level
        </h3>
        <div className="space-y-2">
          {levels.map((lvl) => (
            <label key={lvl} className="flex items-center gap-2 text-xs text-zinc-700 cursor-pointer">
              <input
                type="radio"
                name="level"
                checked={selectedLevel === lvl}
                onChange={() => setSelectedLevel(lvl)}
                className="text-cag-green focus:ring-cag-green"
              />
              {lvl}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-cag-dark border-b border-cag-gray-border pb-2 mb-3">
          Audit Sector
        </h3>
        <div className="space-y-2">
          {sectors.map((sec) => (
            <label key={sec} className="flex items-center gap-2 text-xs text-zinc-700 cursor-pointer">
              <input
                type="radio"
                name="sector"
                checked={selectedSector === sec}
                onChange={() => setSelectedSector(sec)}
                className="text-cag-green focus:ring-cag-green"
              />
              {sec}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-cag-dark border-b border-cag-gray-border pb-2 mb-3">
          Report Type
        </h3>
        <div className="space-y-2">
          {types.map((tp) => (
            <label key={tp} className="flex items-center gap-2 text-xs text-zinc-700 cursor-pointer">
              <input
                type="radio"
                name="type"
                checked={selectedType === tp}
                onChange={() => setSelectedType(tp)}
                className="text-cag-green focus:ring-cag-green"
              />
              {tp}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
```

### `src/components/reports/ReportCard.tsx`
```tsx
import React from 'react';

interface ReportCardProps {
  report: {
    title: string;
    sector: string;
    admin_level: string;
    report_type: string;
    published_date: string;
    file_url: string;
  };
}

export default function ReportCard({ report }: ReportCardProps) {
  return (
    <div className="bg-white border border-cag-gray-border rounded-xl p-5 shadow-sm cag-card-hover flex justify-between items-center gap-6">
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2">
          <span className="bg-cag-green/10 text-cag-green text-3xs font-semibold px-2 py-0.5 rounded-full">
            {report.admin_level}
          </span>
          <span className="bg-zinc-100 text-zinc-600 text-3xs font-semibold px-2 py-0.5 rounded-full">
            {report.sector}
          </span>
          <span className="bg-emerald-100 text-emerald-800 text-3xs font-semibold px-2 py-0.5 rounded-full">
            {report.report_type}
          </span>
        </div>
        <h4 className="font-bold text-sm text-cag-dark">{report.title}</h4>
        <p className="text-3xs text-zinc-500">Published Date: {report.published_date}</p>
      </div>

      <div>
        <a
          href={report.file_url}
          className="bg-cag-green hover:bg-cag-green-hover text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
        >
          📄 View PDF
        </a>
      </div>
    </div>
  );
}
```

### `src/components/reports/Pagination.tsx`
```tsx
import React from 'react';

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  totalCount: number;
}

export default function Pagination({ page, setPage, totalCount }: PaginationProps) {
  const totalPages = Math.ceil(totalCount / 10) || 1;

  return (
    <div className="flex justify-center items-center gap-4 py-6 border-t border-cag-gray-border mt-8">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="px-3 py-1.5 border border-cag-gray-border rounded-md text-xs disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-50 transition-colors"
      >
        Previous
      </button>
      <span className="text-xs font-medium text-zinc-600">
        Page {page} of {totalPages}
      </span>
      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="px-3 py-1.5 border border-cag-gray-border rounded-md text-xs disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-50 transition-colors"
      >
        Next
      </button>
    </div>
  );
}
```

---

## 5. Backend REST API Architecture (Python FastAPI)

### `backend/app/models/shakti.py`
```python
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import date

class Category(BaseModel):
    id: str
    name: str
    slug: str

class Subcategory(BaseModel):
    id: str
    category_id: str
    name: str
    slug: str

class PageContent(BaseModel):
    id: str
    slug: str
    title: str
    content_html: str

class Report(BaseModel):
    id: str
    title: str
    sector: str
    admin_level: str
    report_type: str
    published_date: str
    file_url: str

class Officer(BaseModel):
    id: str
    name: str
    designation: str
    email: str
    phone: str
    tier: int
    parent_id: Optional[str] = None
    children: List["Officer"] = []
```

### `backend/app/main.py`
```python
from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List, Dict, Any
from app.models.shakti import Report, PageContent, Officer

app = FastAPI(title="CAG of India Website Backend", version="1.0.0")

# CORS setup for Next.js communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock Data Repositories for ShaktiDB abstraction representation
MOCK_REPORTS = [
    Report(id="1", title="Audit Report on Defence Procurement & Logistics Support (Union Government)", sector="Defence", admin_level="Union", report_type="Performance", published_date="2026-03-12", file_url="#"),
    Report(id="2", title="Audit Report on State Highway Networks (State Government of Maharashtra)", sector="Transport", admin_level="States", report_type="Compliance", published_date="2026-04-05", file_url="#"),
    Report(id="3", title="Thematic Audit of Rural Employment Schemes & Welfare Budgets", sector="Social Welfare", admin_level="Local Bodies", report_type="Compliance", published_date="2026-05-18", file_url="#")
]

MOCK_PAGES = {
    "vision-mission": PageContent(
        id="v1",
        slug="vision-mission",
        title="Vision, Mission & Core Values",
        content_html="<h3>Our Vision</h3><p>Continue to provide independent and credible assurance on public resources and be a global leader in public sector auditing.</p><h3>Our Mission</h3><p>Promote accountability, transparency, and good governance through high-quality auditing and accounting.</p>"
    ),
    "cag-profile": PageContent(
        id="p1",
        slug="cag-profile",
        title="Comptroller & Auditor General Profile",
        content_html="<h3>Shri K. Sanjay Murthy</h3><p>Shri K. Sanjay Murthy commenced his tenure as the Comptroller and Auditor General of India in November 2024. Prior to this, he served in various senior administrative capacities in public departments.</p>"
    )
}

MOCK_OFFICER_TREE = Officer(
    id="1",
    name="Shri K. Sanjay Murthy",
    designation="Comptroller & Auditor General of India",
    email="cagindia@cag.gov.in",
    phone="+91-11-23235790",
    tier=1,
    children=[
        Officer(
            id="2",
            name="Shri Vishvanath Singh Jadon",
            designation="Secretary to CAG",
            email="sec-cag@cag.gov.in",
            phone="+91-11-23239843",
            tier=2
        ),
        Officer(
            id="3",
            name="Shri K. S. Subramanian",
            designation="Deputy CAG (Reports)",
            email="ksubramanian@cag.gov.in",
            phone="+91-11-23231123",
            tier=2
        )
    ]
)

@app.get("/api/reports")
def get_reports(
    level: str = "All",
    sector: str = "All",
    type: str = "All",
    query: str = "",
    page: int = 1,
    page_size: int = 10
):
    filtered = MOCK_REPORTS
    if level != "All":
        filtered = [r for r in filtered if r.admin_level == level]
    if sector != "All":
        filtered = [r for r in filtered if r.sector == sector]
    if type != "All":
        filtered = [r for r in filtered if r.report_type == type]
    if query:
        filtered = [r for r in filtered if query.lower() in r.title.lower()]
        
    start = (page - 1) * page_size
    end = start + page_size
    return {
        "items": filtered[start:end],
        "total": len(filtered)
    }

@app.get("/api/pages/{slug}", response_model=PageContent)
def get_page_content(slug: str):
    if slug not in MOCK_PAGES:
        raise HTTPException(status_code=404, detail="Page not found")
    return MOCK_PAGES[slug]

@app.get("/api/officers", response_model=Officer)
def get_officer_chart():
    return MOCK_OFFICER_TREE
```
