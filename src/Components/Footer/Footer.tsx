'use client';

import React, { useState } from 'react';

export default function Footer() {
  const [activePolicy, setActivePolicy] = useState<{ title: string; text: string } | null>(null);

  const policiesData: Record<string, string> = {
    'Terms & Conditions': 'These terms govern the use of the official portal of the Comptroller and Auditor General of India. All contents provided on this website are for informational purposes only. The department reserves the right to make modifications to the site contents at any time without notice.',
    'Privacy Policy': 'We respect your privacy. This portal does not collect personal identifiers from visitors. Any information provided voluntarily via query logs or contact forms is kept confidential and processed solely for administrative responses.',
    'Copyright Policy': 'Material featured on this portal may be reproduced free of charge in any format or media without requiring specific permission. This is subject to the material being reproduced accurately and not being used in a derogatory manner or in a misleading context.',
    'Hyperlinking Policy': 'Prior permission is required before hyperlinks are directed from any website to this portal. To obtain permission, please submit a query stating the nature of content on the destination site and the URL of links.',
    'Accessibility Statement': 'We are committed to ensuring that the CAG India portal is accessible to all users, regardless of device, technology, or ability. It has been built with guidelines for web content accessibility (WCAG 2.0 AA compliance).',
    'Archive': 'The Archive section stores historical audit publications, union account reviews, and circular manuals dating back over the past decade. Use the search index filters to view archived files.',
    'Sitemap': 'The Sitemap lists the structural tree hierarchy of the portal, indexing home sliders, about us subpages, reports search, and careers recruitment streams.',
    'Help': 'For any technical assistance, download instructions, or website navigation help, please contact our web support team or refer to the FAQs section.',
    'FAQs': 'Frequently Asked Questions (FAQs) cover reports tabling schedules, CAs empanelment timelines, recruitments exam syllabi, and administrative procedures.',
    'Contact Us': 'Office of the Comptroller and Auditor General of India\\nAddress: Pocket-9, Deen Dayal Upadhyaya Marg, New Delhi - 110124\\nPhone: +91-11-23235790\\nEmail: cagoffice@cag.gov.in',
    'Web Information Manager': 'The Web Information Manager manages all portal publications, asset revisions, and accessibility feedback. Contact: webmanager-cag@cag.gov.in'
  };

  const handlePolicyClick = (e: React.MouseEvent, title: string) => {
    e.preventDefault();
    const text = policiesData[title] || 'This is a mock description detailing institutional guidelines and policies for the Comptroller and Auditor General of India portal.';
    setActivePolicy({ title, text });
  };

  return (
    <>
      <footer className="site-footer" data-node-id="0_5" data-name="Footer">
        <div className="site-footer__row">
          <div className="site-footer__logo">
            <img 
              src="/assets/a72ec713c358ecb4dbb439440d7b3ccd8e29e8ca.png" 
              alt="Comptroller and Auditor General of India crest" 
              className="site-footer__crest" 
            />
            <div className="site-footer__logo-text">
              <p>Comptroller and Auditor General of india </p>
              <p>Supreme Audit Institution of india</p>
            </div>
          </div>
          <div className="site-footer__divider" aria-hidden="true"></div>
          <nav className="site-footer__links" aria-label="Policies">
            <a href="#" onClick={(e) => handlePolicyClick(e, 'Terms & Conditions')}>Terms &amp; Conditions</a>
            <a href="#" onClick={(e) => handlePolicyClick(e, 'Privacy Policy')}>Privacy Policy</a>
            <a href="#" onClick={(e) => handlePolicyClick(e, 'Copyright Policy')}>Copyright Policy</a>
            <a href="#" onClick={(e) => handlePolicyClick(e, 'Hyperlinking Policy')}>Hyperlinking Policy</a>
            <a href="#" onClick={(e) => handlePolicyClick(e, 'Accessibility Statement')}>Accessibility Statement</a>
            <a href="#" onClick={(e) => handlePolicyClick(e, 'Archive')}>Archive</a>
          </nav>
          <div className="site-footer__divider" aria-hidden="true"></div>
          <nav className="site-footer__links" aria-label="Site resources">
            <a href="#" onClick={(e) => handlePolicyClick(e, 'Sitemap')}>Sitemap</a>
            <a href="#" onClick={(e) => handlePolicyClick(e, 'Help')}>Help</a>
            <a href="#" onClick={(e) => handlePolicyClick(e, 'FAQs')}>FAQs</a>
            <a href="#" onClick={(e) => handlePolicyClick(e, 'Contact Us')}>Contact Us</a>
            <a href="#" onClick={(e) => handlePolicyClick(e, 'Web Information Manager')}>Web Information Manager</a>
          </nav>
          <div className="site-footer__divider" aria-hidden="true"></div>
          <div className="site-footer__updated">
            <p className="site-footer__updated-label">Last Updated: 06/07/2026</p>
            <img 
              src="/assets/f679b6981977fe76b3284bb41dc2d56cb8022644.png" 
              alt="india.gov.in — The National Portal of India" 
              className="site-footer__badge" 
            />
          </div>
        </div>
        <p className="site-footer__social">
          <a href="#">Click here for Social Media Account of the CAG</a>
        </p>
        <p className="site-footer__copyright">
          Copyright &copy; {new Date().getFullYear()}. Comptroller and Auditor General of India. All rights reserved.
        </p>
      </footer>

      {/* Policy Overlay Modal */}
      {activePolicy && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl overflow-hidden max-w-xl w-full shadow-2xl relative">
            <div className="p-4 border-b border-[#e6e6e6] flex justify-between items-center bg-[#751639]">
              <h3 className="font-bold text-white text-sm">{activePolicy.title}</h3>
              <button 
                onClick={() => setActivePolicy(null)}
                className="text-white hover:text-zinc-300 font-bold text-sm cursor-pointer"
              >
                ✕ Close
              </button>
            </div>
            <div className="p-6 text-sm text-zinc-700 leading-relaxed whitespace-pre-line">
              {activePolicy.text}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
