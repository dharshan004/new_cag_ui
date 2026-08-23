'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Menu({ mobileMenuOpen }: { mobileMenuOpen: boolean }) {
  const [activeMega, setActiveMega] = useState<'about' | 'global' | 'presence' | null>(null);

  const toggleMega = (e: React.MouseEvent, type: 'about' | 'global') => {
    e.preventDefault();
    e.stopPropagation();
    if (activeMega === type) {
      setActiveMega(null);
    } else {
      setActiveMega(type);
    }
  };

  useEffect(() => {
    if (!activeMega) return;
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest('.primary-nav') &&
        !target.closest('.about-menu') &&
        !target.closest('.global-relations-menu')
      ) {
        setActiveMega(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveMega(null);
    };
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeMega]);

  return (
    <nav className={`primary-nav ${mobileMenuOpen ? 'is-open' : ''}`} aria-label="Primary" id="primary-nav">
      <div className="nav-item">
        <Link href="/Reports" onClick={() => setActiveMega(null)}>Reports</Link>
      </div>
      
      {/* Our Presence dropdown */}
      <div 
        className="nav-item relative" 
        onMouseEnter={() => setActiveMega('presence')}
        onMouseLeave={() => setActiveMega(null)}
      >
        <Link href="/Our-Presence/Index-Menu/State-Level-Offices" onClick={() => setActiveMega(null)}>Our Presence</Link>
        <img src="/assets/32d6d59de0cd297086b7b32eb17e03e23b4ac03d.svg" alt="" className="chevron" />
        {activeMega === 'presence' && (
          <div className="absolute top-full left-0 bg-white border border-[#d7d7d7] py-2 w-48 shadow-lg rounded-b-lg z-50">
            <Link href="/Our-Presence/Index-Menu/Central-Audit-Offices" className="block px-4 py-2 text-xs text-[#2a2a2a] hover:bg-[#eee] transition-colors" onClick={() => setActiveMega(null)}>
              Central-Audit-Offices
            </Link>
            <Link href="/Our-Presence/Index-Menu/State-Level-Offices" className="block px-4 py-2 text-xs text-[#2a2a2a] hover:bg-[#eee] transition-colors" onClick={() => setActiveMega(null)}>
              State-Level-Offices
            </Link>
            <Link href="/Our-Presence/Index-Menu/Traning-Institutes" className="block px-4 py-2 text-xs text-[#2a2a2a] hover:bg-[#eee] transition-colors" onClick={() => setActiveMega(null)}>
              Training Institutes
            </Link>
          </div>
        )}
      </div>

      {/* Global Relations mega-menu trigger */}
      <div className="nav-item">
        <a 
          href="#" 
          id="global-relations-trigger"
          onClick={(e) => toggleMega(e, 'global')}
          aria-expanded={activeMega === 'global'}
        >
          Global Relations
        </a>
        <img src="/assets/32d6d59de0cd297086b7b32eb17e03e23b4ac03d.svg" alt="" className="chevron" />
        
        {activeMega === 'global' && (
          <div className="global-relations-menu" id="global-relations-menu" role="menu">
            <h2 className="grm-title text-left">Global-relations</h2>
            <div className="grm-divider" aria-hidden="true"></div>
            <div className="grm-columns">
              <div className="grm-column">
                <p className="grm-column__heading text-left">International Bodies</p>
                <div className="grm-link-group">
                  <Link href="/About/Index-Menu-About/Global-relations/Association with INTOSAI" className="grm-link-box" onClick={() => setActiveMega(null)}>Association with INTOSAI</Link>
                  <Link href="/About/Index-Menu-About/Global-relations/Association with ASOSAI" className="grm-link-box" onClick={() => setActiveMega(null)}>Association with ASOSAI</Link>
                  <Link href="/About/Index-Menu-About/Global-relations/Multilateral Engagement" className="grm-link-box" onClick={() => setActiveMega(null)}>Multilateral Engagement</Link>
                </div>
              </div>
              <div className="grm-column">
                <p className="grm-column__heading text-left">Bilateral Relations</p>
                <div className="grm-desc-box">
                  <p className="grm-desc-box__text text-left">Explore SAI India's bilateral partnerships and international cooperation with audit institutions across countries</p>
                  <Link href="/About/Index-Menu-About/Global-relations/Bilateral Relations" className="grm-desc-box__cta text-left" onClick={() => setActiveMega(null)}>View all countries &rarr;</Link>
                </div>
              </div>
              <div className="grm-column">
                <p className="grm-column__heading text-left">Audit Engagements</p>
                <div className="grm-link-group">
                  <Link href="/About/Index-Menu-About/Global-relations/UN Panel of External Auditors" className="grm-link-box" onClick={() => setActiveMega(null)}>UN Panel of External Auditors</Link>
                  <Link href="/About/Index-Menu-About/Global-relations/Present International Audits" className="grm-link-box" onClick={() => setActiveMega(null)}>Present International Audits</Link>
                  <Link href="/About/Index-Menu-About/Global-relations/Past International Audits" className="grm-link-box" onClick={() => setActiveMega(null)}>Past International Audits</Link>
                  <Link href="/About/Index-Menu-About/Global-relations/Overseas Audit Offices" className="grm-link-box" onClick={() => setActiveMega(null)}>Overseas Audit Offices</Link>
                </div>
              </div>
              <div className="grm-column">
                <p className="grm-column__heading text-left">Training Institutes</p>
                <div className="grm-link-group">
                  <Link href="/About/Index-Menu-About/Global-relations/iCED" className="grm-link-box" onClick={() => setActiveMega(null)}>iCED</Link>
                  <Link href="/About/Index-Menu-About/Global-relations/iCISA" className="grm-link-box" onClick={() => setActiveMega(null)}>iCISA</Link>
                  <Link href="/About/Index-Menu-About/Global-relations/NAAA" className="grm-link-box" onClick={() => setActiveMega(null)}>NAAA</Link>
                  <Link href="/About/Index-Menu-About/Global-relations/iCAL" className="grm-link-box" onClick={() => setActiveMega(null)}>iCAL</Link>
                </div>
              </div>
              <div className="grm-column">
                <p className="grm-column__heading text-left">Contact</p>
                <div className="grm-desc-box">
                  <p className="grm-desc-box__text text-left">Connect with the International Relations Wing for information on global partnerships and initiatives</p>
                  <Link href="/About/Index-Menu-About/Global-relations/International Relations Wing" className="grm-desc-box__cta text-left" onClick={() => setActiveMega(null)}>Contact IR Wing &rarr;</Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="nav-item">
        <Link href="/Resources" onClick={() => setActiveMega(null)}>Resources</Link>
        <img src="/assets/32d6d59de0cd297086b7b32eb17e03e23b4ac03d.svg" alt="" className="chevron" />
      </div>
      
      <div className="nav-item">
        <Link href="/Career-Engagement" onClick={() => setActiveMega(null)}>Careers &amp; Engagement</Link>
        <img src="/assets/32d6d59de0cd297086b7b32eb17e03e23b4ac03d.svg" alt="" className="chevron" />
      </div>

      {/* About Us mega-menu trigger */}
      <div className="nav-item">
        <a 
          href="#" 
          id="about-us-trigger"
          onClick={(e) => toggleMega(e, 'about')}
          aria-expanded={activeMega === 'about'}
        >
          About Us
        </a>
        <img src="/assets/32d6d59de0cd297086b7b32eb17e03e23b4ac03d.svg" alt="" className="chevron" />

        {activeMega === 'about' && (
          <div className="about-menu" id="about-menu" role="menu">
            <h2 className="about-menu__title text-left">About Us</h2>
            <div className="about-menu__divider" aria-hidden="true"></div>
            <div className="about-menu__columns">
              <div className="about-menu__column">
                <p className="about-menu__heading text-left">Who We Are</p>
                <ul className="about-menu__list">
                  <li><Link href="/About/About-Us/Cag-Of-India" onClick={() => setActiveMega(null)}>CAG of India Profile</Link></li>
                  <li><Link href="/About/About-Us/Our-Vision,-Mission-&-Core-Values" onClick={() => setActiveMega(null)}>Our Vision, Mission &amp; Core Values</Link></li>
                  <li><Link href="/About/About-Us/Organisation-Chart" onClick={() => setActiveMega(null)}>Organisation-Chart</Link></li>
                </ul>
              </div>
              <div className="about-menu__column">
                <p className="about-menu__heading text-left">Leadership &amp; Legacy</p>
                <ul className="about-menu__list">
                  <li><Link href="/About/About-Us/Former-Comptroller-and-Auditors-General" onClick={() => setActiveMega(null)}>Former CAGs Gallery</Link></li>
                  <li><Link href="/About/About-Us/History-of-Indian-Audit-ans-Accounts-Department" onClick={() => setActiveMega(null)}>History of IAAD</Link></li>
                  <li><Link href="/About/About-Us/Audit-Advisory-Board" onClick={() => setActiveMega(null)}>Audit-Advisory-Board</Link></li>
                </ul>
              </div>
              <div className="about-menu__column">
                <p className="about-menu__heading text-left">Governance &amp; Mandate</p>
                <ul className="about-menu__list">
                  <li><Link href="/About/About-Us/Constitutional-Provisions" onClick={() => setActiveMega(null)}>Constitutional-Provisions</Link></li>
                  <li><Link href="/About/About-Us/Duties-&-Powers-Act" onClick={() => setActiveMega(null)}>Duties-&-Powers-Act</Link></li>
                  <li><Link href="/About/About-Us/Audit-Regulation" onClick={() => setActiveMega(null)}>Audit-Regulation</Link></li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
