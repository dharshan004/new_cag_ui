'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarGroup {
  heading: string;
  links: { name: string; href: string }[];
}

export default function AboutusSidemenu() {
  const pathname = usePathname();

  const groups: SidebarGroup[] = [
    {
      heading: 'Who We Are',
      links: [
        { name: 'CAG of India', href: '/About/About-Us/Cag-Of-India' },
        { name: 'Our Vision, Mission and Core Values', href: '/About/About-Us/Our-Vision,-Mission-&-Core-Values' },
        { name: 'Organisation-Chart', href: '/About/About-Us/Organisation-Chart' }
      ]
    },
    {
      heading: 'Leadership & Legacy',
      links: [
        { name: 'Former CAGs', href: '/About/About-Us/Former-Comptroller-and-Auditors-General' },
        { name: 'History of IAAD', href: '/About/About-Us/History-of-Indian-Audit-ans-Accounts-Department' },
        { name: 'Audit-Advisory-Board', href: '/About/About-Us/Audit-Advisory-Board' }
      ]
    },
    {
      heading: 'Governance-&-Mandate',
      links: [
        { name: 'Constitutional-Provisions', href: '/About/About-Us/Constitutional-Provisions' },
        { name: 'Duties-&-Powers-Act', href: '/About/About-Us/Duties-&-Powers-Act' },
        { name: 'Audit-Regulation', href: '/About/About-Us/Audit-Regulation' }
      ]
    }
  ];

  return (
    <div className="about-sidebar" data-name="Side Menu">
      <h2 className="about-sidebar__heading text-left">About Us</h2>
      <div className="about-sidebar__divider"></div>
      <div className="about-sidebar__menus" data-name="Menus">
        {groups.map((grp, idx) => (
          <div key={idx} data-name={grp.heading}>
            <p className="about-sidebar__group-heading text-left">{grp.heading}</p>
            <div className="about-sidebar__sublist" data-name="Sub Menus">
              {grp.links.map((link) => {
                const isActive = decodeURIComponent(pathname).toLowerCase() === link.href.toLowerCase();
                return (
                  <Link 
                    key={link.href}
                    href={link.href}
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
    </div>
  );
}
