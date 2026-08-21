# Reusable Components Specifications — Next.js + TypeScript

This document consolidates the source code for all identified reusable components derived from the Figma mockups. These components are structured dynamically with typed parameters to prevent duplicate code across the application.

---

## 1. Global Shell Components (`src/components/common/`)

### A. Generic Dynamic Card (`Card.tsx`)
*   **Purpose**: Renders Who We Are, news feeds, profile galleries, and quick navigation cards.
*   **Props**: `image` (picture), `title`, `content` (description), and `href` (action link).

```tsx
import React from 'react';

interface CardProps {
  image?: string;
  title: string;
  content: string;
  href?: string;
}

export default function Card({ image, title, content, href }: CardProps) {
  const CardWrapper = href ? 'a' : 'div';
  
  return (
    <CardWrapper 
      href={href}
      className={`bg-white border border-cag-gray-border rounded-xl overflow-hidden shadow-sm flex flex-col justify-between ${
        href ? 'cag-card-hover cursor-pointer block' : ''
      }`}
    >
      <div>
        {image ? (
          <div className="h-48 w-full relative bg-zinc-200">
            <img src={image} alt={title} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="h-48 w-full bg-cag-green/10 flex items-center justify-center text-cag-green font-bold">
            CAG INDIA
          </div>
        )}
        <div className="p-5 space-y-2">
          <h4 className="font-bold text-sm text-cag-dark leading-tight">{title}</h4>
          <p className="text-xs text-zinc-500 leading-relaxed">{content}</p>
        </div>
      </div>
      {href && (
        <div className="px-5 pb-5 pt-2">
          <span className="text-xs font-semibold text-cag-green flex items-center gap-1">
            Read details ➔
          </span>
        </div>
      )}
    </CardWrapper>
  );
}
```

### B. Generic Page Hero (`Hero.tsx`)
*   **Purpose**: Top banner displayed across Vision, Profile, History, and Board subpages.
*   **Props**: `title`, `subtitle`, and optional background banner `bgImage`.

```tsx
import React from 'react';

interface HeroProps {
  title: string;
  subtitle?: string;
  bgImage?: string;
}

export default function Hero({ title, subtitle, bgImage }: HeroProps) {
  return (
    <section className="bg-cag-green text-white py-16 relative overflow-hidden">
      {bgImage && (
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img src={bgImage} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-base sm:text-lg text-cag-green-light max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
```

### C. Site Header Navigation (`Navbar.tsx`)
*   **Purpose**: Renders the site-wide logo, links, and subcategory overlays dynamically.

```tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';

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

---

## 2. Directory Layout Components

### A. Interactive SVG offices pin Map (`MapPresence.tsx`)
*   **Purpose**: Renders coordinates pins dynamically mapping to the selected state office contacts.

```tsx
'use client';

import React from 'react';

interface Office {
  id: string;
  state: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  lat: number;
  lng: number;
}

interface MapPresenceProps {
  offices: Office[];
  selectedOffice: Office | null;
  setSelectedOffice: (office: Office) => void;
}

export default function MapPresence({ offices, selectedOffice, setSelectedOffice }: MapPresenceProps) {
  return (
    <div className="relative w-full h-[500px] bg-emerald-50/50 border border-cag-gray-border rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#267c55_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      <div className="text-center text-zinc-300 font-bold select-none text-4xl uppercase tracking-widest absolute opacity-20">
        SAI INDIA MAP
      </div>

      <div className="relative w-80 h-96 border-2 border-dashed border-cag-green/20 rounded-xl bg-white/50">
        {offices.map((office) => {
          const isSelected = selectedOffice?.id === office.id;
          return (
            <button
              key={office.id}
              onClick={() => setSelectedOffice(office)}
              style={{ top: `${office.lat}%`, left: `${office.lng}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none z-10"
            >
              <span className={`relative flex h-5 w-5 items-center justify-center rounded-full transition-all ${
                isSelected ? 'scale-125' : 'hover:scale-110'
              }`}>
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isSelected ? 'bg-red-400' : 'bg-cag-green/40'
                }`}></span>
                <span className={`relative inline-flex rounded-full h-3.5 w-3.5 shadow ${
                  isSelected ? 'bg-red-500' : 'bg-cag-green'
                }`}></span>
              </span>
              
              <span className="absolute left-1/2 -translate-x-1/2 bottom-6 scale-0 group-hover:scale-100 transition-transform bg-cag-dark text-white text-3xs font-semibold px-2 py-1 rounded shadow-md whitespace-nowrap z-20">
                {office.state} Office
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
```

### B. Filter Sidebar controls (`SidebarFilters.tsx`)
*   **Purpose**: Audit directory filters matching Mockup 3.

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

---

## 3. Common Shared Components

### A. Dynamic Breadcrumbs (`Breadcrumb.tsx`)
*   **Purpose**: Renders client navigation path indicator site-wide.

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

### B. Standard Audit Item Row (`ReportCard.tsx`)
*   **Purpose**: Display individual reports with filter sector and level badges in directories.

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

### C. Standard List Pager (`Pagination.tsx`)
*   **Purpose**: Swapping data tables/grids.

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

### D. Institutional Footer Sitemap (`Footer.tsx`)

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

