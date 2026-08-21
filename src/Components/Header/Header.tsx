'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Menu from '@/Components/Menu/Menu';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [highContrast, setHighContrast] = useState(false);
  const router = useRouter();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleHighContrast = () => {
    const isHigh = !highContrast;
    setHighContrast(isHigh);
    if (typeof document !== 'undefined') {
      if (isHigh) {
        document.documentElement.classList.add('high-contrast');
      } else {
        document.documentElement.classList.remove('high-contrast');
      }
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchVal.trim()) {
      router.push(`/Reports?query=${encodeURIComponent(searchVal.trim())}`);
    }
  };

  return (
    <header className="site-header" data-node-id="115:2138" data-name="Menu">
      {/* Utility Bar */}
      <div className="utility-bar" data-node-id="115:2156">
        <nav className="utility-links" aria-label="Utility links">
          <a href="#" className="utility-link">Knowledge Hub</a>
          <a href="#" className="utility-link">Employee Portal</a>
          <a href="#" className="utility-link">News &amp; Events</a>
          <a href="#" className="utility-link">Contact</a>
        </nav>
        <div className="accessibility">
          <button 
            type="button" 
            className={`a11y-toggle ${highContrast ? 'a11y-toggle--active' : ''}`} 
            aria-label="Toggle accessibility options"
            onClick={toggleHighContrast}
          >
            <span className="a11y-toggle__bg"></span>
            <span className="a11y-toggle__label">A</span>
          </button>
          <img src="/assets/375873ae673ed89a10f1c4f0795d68cf55801045.svg" alt="" className="chevron chevron--small" />
          <div className="lang-select">
            <span>English</span>
            <img src="/assets/375873ae673ed89a10f1c4f0795d68cf55801045.svg" alt="" className="chevron chevron--small" />
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="main-nav">
        <Link className="cag-logo" href="/">
          <img src="/assets/12e6d254adf33bbd46537f45eb8f9ecd50a15e55.png" alt="Comptroller and Auditor General of India crest logo" />
        </Link>
        
        {/* Render Menu Component */}
        <Menu mobileMenuOpen={mobileMenuOpen} />

        <button 
          type="button" 
          className="nav-toggle" 
          id="nav-toggle" 
          aria-label="Toggle navigation menu" 
          aria-expanded={mobileMenuOpen ? 'true' : 'false'}
          onClick={toggleMobileMenu}
        >
          <span></span><span></span><span></span>
        </button>
        <div className="search-box">
          <label className="search-box__inner">
            <span className="search-box__text">Search</span>
            <img src="/assets/ef7eb7134dafeda4c8183619dad425b62c132784.svg" alt="Search" className="search-box__icon" />
            <input 
              type="search" 
              aria-label="Search"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search reports..."
            />
          </label>
        </div>
      </div>
    </header>
  );
}
