'use client';

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageData {
  title: string;
  group: string;
  logo: string;
  description: string;
}

const GLOBAL_RELATIONS_DATA: Record<string, PageData> = {
  'association with intosai': {
    title: 'Association with INTOSAI',
    group: 'International Bodies',
    logo: 'intosai-logo.svg',
    description: 'SAI India is a prominent member of the International Organization of Supreme Audit Institutions (INTOSAI), contributing actively to its governing board and technical committees.'
  },
  'association with asosai': {
    title: 'Association with ASOSAI',
    group: 'International Bodies',
    logo: 'asosai-logo.png',
    description: 'SAI India actively engages with the Asian Organization of Supreme Audit Institutions (ASOSAI), promoting knowledge sharing and professional capacity building among Asian SAIs.'
  },
  'multilateral engagement': {
    title: 'Multilateral Engagement',
    group: 'International Bodies',
    logo: 'multilateral-logo.png',
    description: 'Engaging in international forums and cooperative audits to address global audit challenges and share innovative methodologies.'
  },
  'bilateral relations': {
    title: 'Bilateral Relations',
    group: 'Bilateral Relations',
    logo: 'bilateral-logo.png',
    description: 'SAI India maintains bilateral ties and memoranda of understanding (MoUs) with numerous audit institutions worldwide for mutual exchange programs.'
  },
  'un panel of external auditors': {
    title: 'UN Panel of External Auditors',
    group: 'Audit Engagements',
    logo: 'un-logo.png',
    description: 'SAI India is an active member of the United Nations Panel of External Auditors, playing a key role in setting audit standards for international organizations.'
  },
  'present international audits': {
    title: 'Present International Audits',
    group: 'Audit Engagements',
    logo: 'present-logo.png',
    description: 'Ongoing audit assignments of global organizations, international tribunals, and UN agencies conducted by the officers of SAI India.'
  },
  'past international audits': {
    title: 'Past International Audits',
    group: 'Audit Engagements',
    logo: 'past-logo.png',
    description: 'A summary gallery of historical audit engagements conducted by SAI India for the World Health Organization, Food and Agriculture Organization, and other bodies.'
  },
  'overseas audit offices': {
    title: 'Overseas Audit Offices',
    group: 'Audit Engagements',
    logo: 'overseas-logo.png',
    description: 'SAI India operates dedicated overseas audit offices (including London and Washington) to coordinate audits of diplomatic missions and state entities abroad.'
  },
  'iced': {
    title: 'International Centre for Environment Audit and Sustainable Development (iCED)',
    group: 'Training Institutes',
    logo: 'iced-logo.png',
    description: 'Located in Jaipur, iCED is a global hub for training in environmental auditing and sustainable development under the auspices of INTOSAI.'
  },
  'icisa': {
    title: 'International Centre for Information Systems and Audit (iCISA)',
    group: 'Training Institutes',
    logo: 'icisa-logo.png',
    description: 'iCISA is a premier institute offering international training programs in information systems audit and data analytics for global auditors.'
  },
  'naaa': {
    title: 'National Academy of Audit & Accounts (NAAA)',
    group: 'Training Institutes',
    logo: 'naaa-logo.png',
    description: 'Located in Shimla, NAAA is the apex training institution for the officers of the Indian Audit & Accounts Service (IA&AS).'
  },
  'ical': {
    title: 'International Centre for Audit of Local Governance (iCAL)',
    group: 'Training Institutes',
    logo: 'ical-logo.png',
    description: 'iCAL focuses on capacity building, research, and audit methodologies for local self-government institutions (panchayats and municipalities).'
  },
  'international relations wing': {
    title: 'International Relations Wing',
    group: 'Contact',
    logo: 'contact-logo.png',
    description: 'Get in touch with the International Relations Wing of the CAG of India for partnership proposals, training inquiries, or global delegations.'
  }
};

interface SidebarGroup {
  heading: string;
  links: { name: string; slug: string }[];
}

export default function GlobalRelationsDynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = React.use(params);
  const slugDecoded = decodeURIComponent(resolvedParams.slug).toLowerCase();
  const pageData = GLOBAL_RELATIONS_DATA[slugDecoded];

  if (!pageData) {
    notFound();
  }

  const groups: SidebarGroup[] = [
    {
      heading: 'International Bodies',
      links: [
        { name: 'Association with INTOSAI', slug: 'association with intosai' },
        { name: 'Association with ASOSAI', slug: 'association with asosai' },
        { name: 'Multilateral Engagement', slug: 'multilateral engagement' }
      ]
    },
    {
      heading: 'Bilateral Relations',
      links: [
        { name: 'Bilateral Relations', slug: 'bilateral relations' }
      ]
    },
    {
      heading: 'Audit Engagements',
      links: [
        { name: 'UN Panel of External Auditors', slug: 'un panel of external auditors' },
        { name: 'Present International Audits', slug: 'present international audits' },
        { name: 'Past International Audits', slug: 'past international audits' },
        { name: 'Overseas Audit Offices', slug: 'overseas audit offices' }
      ]
    },
    {
      heading: 'Training Institutes',
      links: [
        { name: 'iCED', slug: 'iced' },
        { name: 'iCISA', slug: 'icisa' },
        { name: 'NAAA', slug: 'naaa' },
        { name: 'iCAL', slug: 'ical' }
      ]
    },
    {
      heading: 'Contact',
      links: [
        { name: 'International Relations Wing', slug: 'international relations wing' }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumbs */}
      <nav className="breadcrumbs mb-8" aria-label="Breadcrumb">
        <ol className="breadcrumbs__trail flex items-center gap-2 text-xs text-zinc-500">
          <li><Link href="/">Home</Link></li>
          <li className="breadcrumbs__sep" aria-hidden="true">&gt;</li>
          <li><span>Global Relations</span></li>
          <li className="breadcrumbs__sep" aria-hidden="true">&gt;</li>
          <li className="breadcrumbs__current text-[#751639] font-semibold">{pageData.title}</li>
        </ol>
      </nav>

      {/* Hero Banner */}
      <div className="gr-hero">
        <div className="gr-hero__swoosh" aria-hidden="true"></div>
        <h1 className="gr-hero__title text-left">{pageData.title}</h1>
        <div className="gr-hero__logo-box">
          <span className="text-white text-xs font-bold uppercase">{pageData.group.substring(0, 3)}</span>
        </div>
      </div>

      <div className="about-layout flex flex-col lg:flex-row gap-8 items-start">
        {/* Sidebar */}
        <aside className="about-sidebar w-full lg:w-80 shrink-0">
          <h2 className="about-sidebar__heading text-left text-lg font-bold border-b border-[#e6e6e6] pb-2 mb-4">
            Global Relations
          </h2>
          <div className="about-sidebar__menus">
            {groups.map((grp, idx) => (
              <div key={idx}>
                <p className="about-sidebar__group-heading text-left">{grp.heading}</p>
                <div className="about-sidebar__sublist">
                  {grp.links.map((link) => {
                    const isActive = slugDecoded === link.slug;
                    return (
                      <Link
                        key={link.slug}
                        href={`/About/Index-Menu-About/Global-relations/${encodeURIComponent(link.name)}`}
                        className={`about-sidebar__link ${isActive ? 'about-sidebar__link--active' : ''}`}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Content */}
        <main className="about-content flex-grow w-full bg-white border border-[#e6e6e6] rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-zinc-800 border-b border-zinc-200 pb-3 mb-6 text-left">
            Overview
          </h2>
          <p className="text-sm text-zinc-600 leading-relaxed text-left">
            {pageData.description}
          </p>
        </main>
      </div>
    </div>
  );
}
