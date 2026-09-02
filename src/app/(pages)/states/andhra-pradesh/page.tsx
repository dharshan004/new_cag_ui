'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';

export default function AndhraPradeshSubsitePage() {
  const [lang, setLang] = useState<'English' | 'हिन्दी'>('English');
  const [searchQuery, setSearchQuery] = useState('');
  const [subsiteData, setSubsiteData] = useState<any>(null);

  useEffect(() => {
    api.getStateSubsite('andhra-pradesh').then((data) => {
      if (data) setSubsiteData(data);
    });
  }, []);

  const isHindi = lang === 'हिन्दी';

  const toggleLanguage = () => {
    setLang(prev => (prev === 'English' ? 'हिन्दी' : 'English'));
  };

  return (
    <div className="min-h-screen bg-white font-['Noto_Sans',sans-serif] text-[#2A2A2A] overflow-x-hidden">
      {/* 1. Subsite Top Header Bar (Matching Picture 2 Specs) */}
      <header className="w-full shadow-sm relative z-30">
        {/* Top Dark Green Bar */}
        <div className="bg-[#0A3D30] text-white py-2 px-6 md:px-16 flex flex-wrap justify-between items-center text-xs">
          {/* Left: Crest Emblem & Title */}
          <div className="flex items-center gap-3">
            <img 
              src="/assets/12e6d254adf33bbd46537f45eb8f9ecd50a15e55.png" 
              alt="CAG Emblem" 
              className="h-7 w-auto object-contain brightness-200" 
            />
            <span className="font-medium text-xs tracking-wide text-white/95">
              Principal Accountant General (A&E), Andhra Pradesh, Vijayawada
            </span>
          </div>

          {/* Right: Utility Links */}
          <div className="flex items-center gap-5 text-[11px] font-normal text-white/90">
            <Link href="/Resources" className="hover:underline transition-colors">Knowledge Hub</Link>
            <a 
              href="/admin" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:underline font-semibold text-white"
              onClick={(e) => {
                e.preventDefault();
                window.open('/admin', '_blank');
              }}
            >
              Employee Portal
            </a>
            <Link href="/#news-events-heading" className="hover:underline transition-colors">News & Events</Link>
            <Link href="/About/Index-Menu-About/Global-relations/International%20Relations%20Wing" className="hover:underline transition-colors">Contact</Link>
            
            {/* Accessibility Button */}
            <div className="flex items-center border border-white/40 rounded px-1.5 py-0.5 text-[10px] gap-1 cursor-pointer hover:bg-white/10">
              <span>A</span>
              <span className="text-[8px]">▼</span>
            </div>

            {/* Language Selector */}
            <button 
              onClick={toggleLanguage}
              className="bg-transparent border-none text-white cursor-pointer hover:underline text-[11px] flex items-center gap-1 font-medium"
            >
              <span>{lang}</span>
              <span className="text-[8px]">▼</span>
            </button>
          </div>
        </div>

        {/* Main Header Menu Bar */}
        <div className="bg-white border-b border-[#D7D7D7] py-3.5 px-6 md:px-16 flex justify-between items-center">
          {/* Left: CAG Crest Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <img 
              src="/assets/12e6d254adf33bbd46537f45eb8f9ecd50a15e55.png" 
              alt="CAG Crest Logo" 
              className="h-12 w-auto object-contain" 
            />
          </Link>

          {/* Center: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-[14px] font-normal text-[#4D4D4D]">
            <div className="relative group cursor-pointer py-1 flex items-center gap-1.5 hover:text-[#0A3D30] transition-colors">
              <span>About Us</span>
              <span className="text-[9px] text-zinc-400">▼</span>
            </div>
            <div className="relative group cursor-pointer py-1 flex items-center gap-1.5 text-[#0A3D30] font-semibold">
              <span>State Accounts</span>
              <span className="text-[9px] text-[#0A3D30]">▼</span>
            </div>
            <div className="relative group cursor-pointer py-1 flex items-center gap-1.5 hover:text-[#0A3D30] transition-colors">
              <span>GPF</span>
              <span className="text-[9px] text-zinc-400">▼</span>
            </div>
            <div className="relative group cursor-pointer py-1 flex items-center gap-1.5 hover:text-[#0A3D30] transition-colors">
              <span>Pension</span>
              <span className="text-[9px] text-zinc-400">▼</span>
            </div>
            <div className="relative group cursor-pointer py-1 flex items-center gap-1.5 hover:text-[#0A3D30] transition-colors">
              <span>Employee Corner</span>
              <span className="text-[9px] text-zinc-400">▼</span>
            </div>
            <div className="relative group cursor-pointer py-1 flex items-center gap-1.5 hover:text-[#0A3D30] transition-colors">
              <span>RTI</span>
              <span className="text-[9px] text-zinc-400">▼</span>
            </div>
            <Link href="/Resources" className="hover:text-[#0A3D30] transition-colors">Citizen Charter</Link>
            <div className="relative group cursor-pointer py-1 flex items-center gap-1.5 hover:text-[#0A3D30] transition-colors">
              <span>Contact Us</span>
              <span className="text-[9px] text-zinc-400">▼</span>
            </div>
          </nav>

          {/* Right: Search Box */}
          <div className="flex items-center border border-[#D7D7D7] rounded-md px-3 py-1.5 bg-white w-52 focus-within:border-[#0A3D30] transition-colors">
            <input 
              type="text"
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-xs text-[#2A2A2A] placeholder:text-zinc-400"
            />
            <svg className="w-4 h-4 text-zinc-400 shrink-0 cursor-pointer hover:text-[#0A3D30]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative w-full min-h-[460px] md:min-h-[540px] flex items-center justify-start overflow-hidden bg-[#090C1E]">
        {/* Background Image with Gradient Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
          style={{ backgroundImage: `url('/assets/e2c5a3b888a0623426c634ce2f2bee016b8fb5ab.png')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090C1E] via-[#090C1E]/80 to-transparent z-0" />

        {/* Hero Content Box */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 py-16 flex flex-col items-start gap-6 w-full">
          {/* Gold Accent Indicator Line */}
          <div className="w-24 h-1 bg-[#FFCE7B] rounded-full" />

          {/* Hero Titles */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal text-[#FEFEFE] leading-tight max-w-2xl tracking-wide">
            Ensuring <br />
            <span className="font-bold text-white">Transparency, Integrity & Accountability</span>
          </h1>

          <p className="text-sm sm:text-base text-[#FEFEFE]/90 max-w-xl leading-relaxed">
            Access audit reports, accounts, and institutional resources from India&apos;s Supreme Audit Institution.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <Link 
              href="/Reports"
              className="bg-white hover:bg-zinc-100 text-[#0A3D30] font-semibold px-6 py-3 rounded-lg text-sm transition-all shadow-md hover:shadow-lg"
            >
              Explore Reports
            </Link>
            <Link 
              href="/About/Index-Menu-About/Global-relations/International%20Relations%20Wing"
              className="border border-white hover:bg-white/10 text-white font-medium px-6 py-3 rounded-lg text-sm transition-all backdrop-blur-sm"
            >
              Learn About CAG
            </Link>
          </div>
        </div>

        {/* Floating Quick Action Button */}
        <button 
          aria-label="Quick links icon"
          className="absolute right-8 bottom-8 z-20 w-14 h-14 bg-[#0A3D30] hover:bg-[#082f25] border border-white/20 rounded-full shadow-2xl flex items-center justify-center cursor-pointer transition-transform hover:scale-110"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </button>
      </section>

      {/* 3. About Pension Section */}
      <section className="bg-[#F7FFF8] py-16 px-6 md:px-16 w-full flex flex-col items-center">
        <div className="max-w-6xl w-full flex flex-col items-center gap-10">
          {/* Section Description Header */}
          <div className="flex flex-col items-center text-center gap-4 max-w-4xl">
            <h2 className="text-3xl md:text-[32px] font-bold text-[#2A2A2A] leading-tight">
              About Pension
            </h2>
            <p className="text-sm md:text-base text-[#565656] leading-[30px] font-normal">
              The PAG (A&E) authorises the pensionary benefits for the following categories: 1. State Government employees covered under the AP RPR Rules, 1980 2. AIS officers borne on the Andhra Pradesh cadre (excepting those who have opted to receive their pensions from the Central Pension Payment Authority). 3. Constitutional authorities such as Hon’ble Judges of the AP High Court, Lok Ayukta and AP Administrative Tribunal, Members of AP Public Service Commission 4. Political (Freedom Fighters) Pensions
            </p>
          </div>

          {/* Pension Card */}
          <div className="w-full max-w-[582px] bg-white rounded-lg p-6 shadow-[0px_0px_20px_rgba(0,0,0,0.09)] border border-zinc-100 flex flex-col items-start gap-4 transition-all hover:shadow-xl hover:-translate-y-1">
            {/* Crest Emblem Icon */}
            <div className="w-16 h-16 rounded-full bg-red-50 border border-red-200 flex items-center justify-center p-2">
              <img 
                src="/assets/12e6d254adf33bbd46537f45eb8f9ecd50a15e55.png" 
                alt="Emblem" 
                className="w-10 h-10 object-contain" 
              />
            </div>
            
            <div className="flex flex-col gap-1 w-full">
              <h3 className="text-xl md:text-[22px] font-bold text-[#2A2A2A] leading-[30px]">
                Know your Pension Case Status
              </h3>
              <p className="text-sm text-[#565656] leading-[24px]">
                Know your status on 10/06/2026
              </p>
            </div>

            <Link 
              href="/Reports" 
              className="text-[#0D61AE] text-base underline font-medium hover:text-blue-800 transition-colors mt-2"
            >
              Read More
            </Link>
          </div>
        </div>
      </section>

      {/* 4. About General Provident Fund Section */}
      <section className="bg-gradient-to-b from-[#FAF5ED] to-white py-16 px-6 md:px-16 w-full flex flex-col items-center">
        <div className="max-w-6xl w-full flex flex-col items-center gap-10">
          {/* Section Description Header */}
          <div className="flex flex-col items-center text-center gap-4 max-w-4xl">
            <h2 className="text-3xl md:text-[32px] font-bold text-[#2A2A2A] leading-tight">
              About General Provident Fund
            </h2>
            <p className="text-sm md:text-base text-[#565656] leading-[30px] font-normal">
              The Principal Accountant General (A&E) maintains the individual GPF accounts of nearly 2.29 lakh employees of the AP State Governments as per the rules and procedures contained in the GPF (AP) Rules 1935 and AIS (PF) Rules 1955 respectively. The Provident Fund Group in the Office is headed by an IA & AS Officer in the rank of Deputy Accountant General who is assisted by Accounts Officers.
            </p>
          </div>

          {/* GPF Card */}
          <div className="w-full max-w-[582px] bg-white rounded-lg p-6 shadow-[0px_0px_20px_rgba(0,0,0,0.09)] border border-zinc-100 flex flex-col items-start gap-4 transition-all hover:shadow-xl hover:-translate-y-1">
            {/* Crest Emblem Icon */}
            <div className="w-16 h-16 rounded-full bg-red-50 border border-red-200 flex items-center justify-center p-2">
              <img 
                src="/assets/12e6d254adf33bbd46537f45eb8f9ecd50a15e55.png" 
                alt="Emblem" 
                className="w-10 h-10 object-contain" 
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <h3 className="text-xl md:text-[22px] font-bold text-[#2A2A2A] leading-[30px]">
                GPF Annual Account Statements
              </h3>
              <p className="text-sm text-[#565656] leading-[22px]">
                Theme-wise access to relevant CAG Audit Reports relating to Punjab is provided in link given above.
              </p>
            </div>

            <Link 
              href="/Reports" 
              className="text-[#0D61AE] text-base underline font-medium hover:text-blue-800 transition-colors mt-2"
            >
              Read More
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Account Section (4 Grid Cards) */}
      <section className="bg-white py-16 px-6 md:px-16 w-full flex flex-col items-center">
        <div className="max-w-6xl w-full flex flex-col items-center gap-10">
          {/* Section Header */}
          <div className="flex flex-col items-center text-center gap-4 max-w-4xl">
            <h2 className="text-3xl md:text-[32px] font-bold text-[#2A2A2A] leading-tight">
              Account
            </h2>
            <p className="text-sm md:text-base text-[#565656] leading-[30px] font-normal">
              The Accounts Group of this office is headed by an IA & AS officer of the rank of Deputy Accountant General (DAG/Sr.DAG). The accounts of the Government of Andhra Pradesh are compiled based on the initial accounts rendered by 13 Districts...
            </p>
          </div>

          {/* 4 Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {[
              { title: 'Monthly Key Indicators', href: '/Reports' },
              { title: 'Appropriation Accounts', href: '/Reports' },
              { title: 'Finance Account', href: '/Reports' },
              { title: 'Accounts at a Glance', href: '/Reports' },
            ].map((card, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-lg p-5 shadow-[0px_0px_20px_rgba(0,0,0,0.09)] border border-zinc-100 flex flex-col justify-between items-start min-h-[204px] transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-full bg-red-50 border border-red-200 flex items-center justify-center p-2 mb-2">
                  <img 
                    src="/assets/12e6d254adf33bbd46537f45eb8f9ecd50a15e55.png" 
                    alt="Emblem" 
                    className="w-8 h-8 object-contain" 
                  />
                </div>

                <h3 className="text-lg md:text-[20px] font-bold text-[#2A2A2A] leading-[26px] mb-4">
                  {card.title}
                </h3>

                <Link 
                  href={card.href}
                  className="text-[#0D61AE] text-sm underline font-medium hover:text-blue-800 transition-colors mt-auto"
                >
                  Read More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Quick Links & What's New Section */}
      <section className="bg-[#F7FFF8] py-16 px-6 md:px-16 w-full flex flex-col items-center">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Column 1: Quick Links */}
          <div className="bg-white border border-[#D7D7D7] rounded-lg p-6 flex flex-col justify-between shadow-sm min-h-[324px]">
            <div>
              {/* Header */}
              <div className="flex items-center gap-3 pb-4 border-b border-[#B1B1B1]">
                <div className="w-6 h-6 bg-[#0A3D30] rounded-sm flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
                <h3 className="font-bold text-sm text-[#2A2A2A]">Quick Links</h3>
              </div>

              {/* Items List */}
              <ul className="flex flex-col gap-4 mt-5">
                {[
                  'Pension Adalat in Amritsar on 09/03/2026 and in Ferozepur on 10/03/2026',
                  'National Online Essay Writing Competition 2025',
                  'Location of AG Office for essay writing competition',
                  'National Essay Writing Competition 2024'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-xs md:text-sm text-[#2A2A2A] hover:text-[#0A3D30] transition-colors cursor-pointer">
                    <span className="w-4 h-[2px] bg-black shrink-0" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer View All */}
            <div className="flex justify-end pt-4 mt-4">
              <Link href="/Resources" className="text-[#0D61AE] text-xs font-semibold flex items-center gap-1 hover:underline">
                <span>View All</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Column 2: What's New? */}
          <div className="bg-white border border-[#D7D7D7] rounded-lg p-6 flex flex-col justify-between shadow-sm min-h-[324px]">
            <div>
              {/* Header */}
              <div className="flex items-center gap-3 pb-4 border-b border-[#B1B1B1]">
                <div className="w-6 h-6 bg-[#0A3D30] rounded-sm flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
                <h3 className="font-bold text-sm text-[#2A2A2A]">What’s New?</h3>
              </div>

              {/* Items List */}
              <ul className="flex flex-col gap-4 mt-5">
                {[
                  { date: '24 Jun', text: '25 Split Air Conditioner' },
                  { date: '24 Jun', text: 'Purchase & Installation of CCTV Camera' },
                  { date: '03 Oct', text: 'Bid for Mobile Storage Compactors (Q3)' },
                  { date: '14 May', text: 'Public Notice regarding Pension Adalat' }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-xs md:text-sm text-[#2A2A2A] hover:text-[#0A3D30] transition-colors cursor-pointer">
                    <span className="font-semibold text-[#0A3D30] shrink-0 text-xs">{item.date}</span>
                    <span className="leading-snug">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer View All */}
            <div className="flex justify-end pt-4 mt-4">
              <Link href="/#news-events-heading" className="text-[#0D61AE] text-xs font-semibold flex items-center gap-1 hover:underline">
                <span>View All</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Subsite Footer */}
      <footer className="w-full">
        {/* Top Links Bar */}
        <div className="bg-[#0A3D30] text-white py-4 px-6 md:px-16 flex flex-wrap justify-center items-center gap-6 text-xs font-medium">
          <Link href="/" className="hover:underline">Copyright Policy</Link>
          <Link href="/" className="hover:underline">Help</Link>
          <Link href="/" className="hover:underline">Hyperlinking Policy</Link>
          <Link href="/" className="hover:underline">Privacy Policy</Link>
          <Link href="/" className="hover:underline">Terms & Conditions</Link>
          <Link href="/" className="hover:underline">Archive</Link>
        </div>

        {/* Bottom Bar */}
        <div className="bg-[#2A2A2A] text-white py-3 px-6 md:px-16 flex flex-wrap justify-between items-center text-[11px] font-normal text-zinc-300">
          <span>© Copyright 2020 - Content owned by Principal Accountant General (A&E), Andhra Pradesh, Vijayawada. All rights reserved.</span>
          <span>Page last updated : 27 Jul 2026</span>
        </div>
      </footer>
    </div>
  );
}
