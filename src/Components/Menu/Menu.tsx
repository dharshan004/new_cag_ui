'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Menu({ mobileMenuOpen }: { mobileMenuOpen: boolean }) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <nav className={`primary-nav ${mobileMenuOpen ? 'is-open' : ''}`} aria-label="Primary" id="primary-nav">
      <div className="nav-item">
        <Link href="/Reports">Reports</Link>
      </div>
      <div 
        className="nav-item" 
        onMouseEnter={() => setActiveMenu('presence')}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <Link href="/Our Presence/Index Menu/State Level Offices">Our Presence</Link>
        <img src="/assets/32d6d59de0cd297086b7b32eb17e03e23b4ac03d.svg" alt="" className="chevron" />
        {activeMenu === 'presence' && (
          <div className="absolute top-full left-0 bg-white border border-[#d7d7d7] py-2 w-48 shadow-lg rounded-b-lg z-50">
            <Link href="/Our Presence/Index Menu/Central Audit Offices" className="block px-4 py-2 text-xs text-[#2a2a2a] hover:bg-[#eee] transition-colors">
              Central Audit Offices
            </Link>
            <Link href="/Our Presence/Index Menu/State Level Offices" className="block px-4 py-2 text-xs text-[#2a2a2a] hover:bg-[#eee] transition-colors">
              State Level Offices
            </Link>
            <Link href="/Our Presence/Index Menu/Traning Institutes" className="block px-4 py-2 text-xs text-[#2a2a2a] hover:bg-[#eee] transition-colors">
              Training Institutes
            </Link>
          </div>
        )}
      </div>
      <div className="nav-item">
        <Link href="/About/About Us/International Relations">Global Relations</Link>
        <img src="/assets/32d6d59de0cd297086b7b32eb17e03e23b4ac03d.svg" alt="" className="chevron" />
      </div>
      <div className="nav-item">
        <Link href="/Resources">Resources</Link>
        <img src="/assets/32d6d59de0cd297086b7b32eb17e03e23b4ac03d.svg" alt="" className="chevron" />
      </div>
      <div className="nav-item">
        <Link href="/Career Engagement">Careers &amp; Engagement</Link>
        <img src="/assets/32d6d59de0cd297086b7b32eb17e03e23b4ac03d.svg" alt="" className="chevron" />
      </div>
      <div 
        className="nav-item" 
        onMouseEnter={() => setActiveMenu('about')}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <Link href="/About/About Us/Cag Of India">About Us</Link>
        <img src="/assets/32d6d59de0cd297086b7b32eb17e03e23b4ac03d.svg" alt="" className="chevron" />
        {activeMenu === 'about' && (
          <div className="absolute top-full left-0 bg-white border border-[#d7d7d7] py-2 w-56 shadow-lg rounded-b-lg z-50">
            <Link href="/About/About Us/Cag Of India" className="block px-4 py-2 text-xs text-[#2a2a2a] hover:bg-[#eee] transition-colors">
              CAG of India Profile
            </Link>
            <Link href="/About/About Us/Our Vision, Mission & Core Values" className="block px-4 py-2 text-xs text-[#2a2a2a] hover:bg-[#eee] transition-colors">
              Vision, Mission &amp; Values
            </Link>
            <Link href="/About/About Us/Organisation Chart" className="block px-4 py-2 text-xs text-[#2a2a2a] hover:bg-[#eee] transition-colors">
              Organisation Chart
            </Link>
            <Link href="/About/About Us/History of Indian Audit ans Accounts Department" className="block px-4 py-2 text-xs text-[#2a2a2a] hover:bg-[#eee] transition-colors">
              History of IAAD
            </Link>
            <Link href="/About/About Us/Former Comptroller and Auditors General" className="block px-4 py-2 text-xs text-[#2a2a2a] hover:bg-[#eee] transition-colors">
              Former CAGs Gallery
            </Link>
            <Link href="/About/About Us/Audit Advisory Board" className="block px-4 py-2 text-xs text-[#2a2a2a] hover:bg-[#eee] transition-colors">
              Audit Advisory Board
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
