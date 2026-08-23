'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { dataManager } from '@/lib/dataManager';

interface SidebarLink {
  name: string;
  hindiName: string;
  href: string;
}

interface SidebarGroup {
  heading: string;
  hindiHeading: string;
  links: SidebarLink[];
}

export default function AboutusSidemenu() {
  const pathname = usePathname();
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

  const groups: SidebarGroup[] = [
    {
      heading: 'Who We Are',
      hindiHeading: 'हम कौन हैं',
      links: [
        { name: 'CAG of India', hindiName: 'भारत के सीएजी', href: '/About/About-Us/Cag-Of-India' },
        { name: 'Our Vision, Mission and Core Values', hindiName: 'दृष्टिकोण, ध्येय और मूल्य', href: '/About/About-Us/Our-Vision,-Mission-&-Core-Values' },
        { name: 'Organisation-Chart', hindiName: 'संगठन चार्ट', href: '/About/About-Us/Organisation-Chart' }
      ]
    },
    {
      heading: 'Leadership & Legacy',
      hindiHeading: 'नेतृत्व और विरासत',
      links: [
        { name: 'Former CAGs', hindiName: 'पूर्व सीएजी गैलरी', href: '/About/About-Us/Former-Comptroller-and-Auditors-General' },
        { name: 'History of IAAD', hindiName: 'आईएएडी का इतिहास', href: '/About/About-Us/History-of-Indian-Audit-ans-Accounts-Department' },
        { name: 'Audit-Advisory-Board', hindiName: 'लेखा परीक्षा सलाहकार बोर्ड', href: '/About/About-Us/Audit-Advisory-Board' }
      ]
    },
    {
      heading: 'Governance-&-Mandate',
      hindiHeading: 'शासन और अधिदेश',
      links: [
        { name: 'Constitutional-Provisions', hindiName: 'संवैधानिक प्रावधान', href: '/About/About-Us/Constitutional-Provisions' },
        { name: 'Duties-&-Powers-Act', hindiName: 'कर्तव्य और शक्तियां अधिनियम', href: '/About/About-Us/Duties-&-Powers-Act' },
        { name: 'Audit-Regulation', hindiName: 'लेखा परीक्षा विनियम', href: '/About/About-Us/Audit-Regulation' }
      ]
    }
  ];

  return (
    <div className="about-sidebar" data-name="Side Menu">
      <h2 className="about-sidebar__heading text-left">
        {isHindi ? 'हमारे बारे में' : 'About Us'}
      </h2>
      <div className="about-sidebar__divider"></div>
      <div className="about-sidebar__menus" data-name="Menus">
        {groups.map((grp, idx) => (
          <div key={idx} data-name={grp.heading}>
            <p className="about-sidebar__group-heading text-left">
              {isHindi ? grp.hindiHeading : grp.heading}
            </p>
            <div className="about-sidebar__sublist" data-name="Sub Menus">
              {grp.links.map((link) => {
                const isActive = decodeURIComponent(pathname).toLowerCase() === link.href.toLowerCase();
                return (
                  <Link 
                    key={link.href}
                    href={link.href}
                    className={`about-sidebar__link ${isActive ? 'about-sidebar__link--active' : ''}`}
                  >
                    {isHindi ? link.hindiName : link.name}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
