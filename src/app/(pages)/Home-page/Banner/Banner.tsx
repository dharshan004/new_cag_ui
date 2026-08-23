'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { dataManager } from '@/lib/dataManager';

export default function Banner() {
  const [quickLinksOpen, setQuickLinksOpen] = useState(false);
  const [activePromo, setActivePromo] = useState<{ title: string; text: string } | null>(null);
  const [lang, setLang] = useState<'English' | 'हिन्दी'>('English');

  useEffect(() => {
    setLang(dataManager.getLanguage());
    const handleLangChange = () => {
      setLang(dataManager.getLanguage());
    };
    window.addEventListener('languageChange', handleLangChange);
    return () => window.removeEventListener('languageChange', handleLangChange);
  }, []);

  const isHindi = lang === 'हिन्दी';

  const handlePromoClick = (e: React.MouseEvent, title: string) => {
    e.preventDefault();
    setActivePromo({
      title,
      text: isHindi 
        ? `${title} के लिए आधिकारिक दिशा-निर्देश और जमा विवरण। प्रविष्टियां पात्र अकादमिक विद्वानों, शोधकर्ताओं और सार्वजनिक नीति के छात्रों के लिए खुली हैं। पंजीकरण और सारांश अपलोड करने की अंतिम तिथि 15 अक्टूबर, 2026 है। विवरण के लिए कृपया research-contest@cag.gov.in पर ईमेल करें।`
        : `Official guidelines and submission details for the ${title}. Submissions are open to eligible academic scholars, researchers, and public policy students. The deadline for registration and abstract upload is October 15, 2026. Please email research-contest@cag.gov.in for details.`
    });
  };

  return (
    <>
      <section className="hero" data-node-id="356:17253" aria-label="Hero banner">
        <img 
          src="/assets/17a8a6edf588630a0c7494a054fb34e604c4f41c.png" 
          alt="Government office meeting in progress" 
          className="hero__bg" 
        />
        <div className="hero__overlay"></div>
        <div className="hero__content" data-node-id="356:17259">
          <div className="hero__text-block" data-node-id="356:17260">
            <span className="hero__accent-line" data-node-id="356:17261"></span>
            <h1 className="hero__heading" data-node-id="356:17262">
              <span className="hero__heading-line1">{isHindi ? 'सुनिश्चित करना' : 'Ensuring'}</span>
              <span className="hero__heading-line2">{isHindi ? 'पारदर्शिता, सत्यनिष्ठा और' : 'Transparency, Integrity & '}</span>
              <span className="hero__heading-line2 hero__heading-accent">{isHindi ? 'जवाबदेही' : 'Accountability'}</span>
            </h1>
            <p className="hero__subtext" data-node-id="356:17263">
              {isHindi 
                ? 'भारत के सर्वोच्च लेखापरीक्षा संस्थान से ऑडिट रिपोर्ट, खाते और संस्थागत संसाधन प्राप्त करें।'
                : 'Access audit reports, accounts, and institutional resources from India’s Supreme Audit Institution.'}
            </p>
          </div>
          <div className="hero__ctas" data-node-id="356:17264">
            <Link href="/Reports" className="btn btn--white" data-node-id="356:17265">
              {isHindi ? 'रिपोर्ट देखें' : 'Explore Reports'}
            </Link>
            <Link href="/About/About-Us/Cag-Of-India" className="btn btn--outline-white" data-node-id="356:17266">
              {isHindi ? 'सीएजी के बारे में जानें' : 'Learn about CAG'}
            </Link>
          </div>
        </div>
        
        {/* Quick Links Popover Button */}
        <button 
          type="button" 
          className="hero__quick-link" 
          aria-label="Quick links" 
          aria-expanded={quickLinksOpen ? 'true' : 'false'} 
          aria-controls="quick-links-popover" 
          id="quick-links-trigger" 
          data-node-id="356:17267"
          onClick={() => setQuickLinksOpen(!quickLinksOpen)}
        >
          <img src="/assets/15127c48fb77285b1afc7e3ee3fa785964fd244e.svg" alt="" />
        </button>

        {/* Quick Links popover */}
        {quickLinksOpen && (
          <div 
            className="quick-links-popover" 
            id="quick-links-popover" 
            role="dialog" 
            aria-label="Quick Links" 
            data-node-id="177:18398" 
            data-name="Quick Links"
          >
            <div className="quick-links-popover__header" data-node-id="177:18399">
              <p className="quick-links-popover__title" data-node-id="177:18400">
                {isHindi ? 'त्वरित लिंक' : 'Quick Links'}
              </p>
              <button 
                type="button" 
                className="quick-links-popover__close" 
                id="quick-links-close" 
                aria-label="Close" 
                data-node-id="177:18401"
                onClick={() => setQuickLinksOpen(false)}
              >
                <img src="/assets/e9a1045ccbcca4a2eddc203691c9fb9e235abcaa.svg" alt="" />
              </button>
            </div>
            <Link href="/Reports/accounts" className="quick-links-popover__item quick-links-popover__item--featured" data-node-id="177:18405">
              <span>{isHindi ? 'राज्य वित्त' : 'State Finances'}</span>
              <img src="/assets/517691af6f71975297c0dea90934ffd1b080ef9f.svg" alt="" className="quick-links-popover__item-icon" />
            </Link>
            <a href="#" className="quick-links-popover__item" onClick={(e) => handlePromoClick(e, isHindi ? 'सीएजी - आईसीएसएसआर शोध लेख प्रतियोगिता (राष्ट्रीय स्तर)' : 'CAG - ICSSR Research Article Competition (National Level)')} data-node-id="177:18411">
              <span>{isHindi ? 'सीएजी - आईसीएसएसआर शोध लेख प्रतियोगिता (राष्ट्रीय स्तर)' : 'CAG - ICSSR Research Article Competition (National Level)'}</span>
            </a>
            <a href="#" className="quick-links-popover__item" onClick={(e) => handlePromoClick(e, isHindi ? 'सीएजी - आईसीएसएसआर शोध लेख प्रतियोगिता (राज्य/केंद्र शासित प्रदेश स्तर)' : 'CAG - ICSSR Research Article Competition (State/UT Level)')} data-node-id="177:18413">
              <span>{isHindi ? 'सीएजी - आईसीएसएसआर शोध लेख प्रतियोगिता (राज्य/केंद्र शासित प्रदेश स्तर)' : 'CAG - ICSSR Research Article Competition (State/UT Level)'}</span>
            </a>
          </div>
        )}

        <div className="hero__carousel" role="tablist" aria-label="Hero image carousel" data-node-id="356:17272">
          <span className="hero__carousel-dot hero__carousel-dot--active" role="tab" aria-selected="true"></span>
          <span className="hero__carousel-dot" role="tab" aria-selected="false"></span>
          <span className="hero__carousel-dot" role="tab" aria-selected="false"></span>
          <span className="hero__carousel-dot" role="tab" aria-selected="false"></span>
        </div>
      </section>

      {/* Promo overlay modal */}
      {activePromo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl overflow-hidden max-w-xl w-full shadow-2xl relative">
            <div className="p-4 border-b border-[#e6e6e6] flex justify-between items-center bg-[#0a3d30]">
              <h3 className="font-bold text-white text-sm">{activePromo.title}</h3>
              <button 
                onClick={() => setActivePromo(null)}
                className="text-white hover:text-zinc-300 font-bold text-sm cursor-pointer bg-transparent border-none"
              >
                ✕ {isHindi ? 'बंद करें' : 'Close'}
              </button>
            </div>
            <div className="p-6 text-sm text-zinc-700 leading-relaxed bg-[#fbfbfb]">
              {activePromo.text}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
