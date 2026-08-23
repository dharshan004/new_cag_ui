'use client';

import React, { useState, useEffect } from 'react';
import { dataManager } from '@/lib/dataManager';

export interface FormerCAG {
  id: string;
  name: string;
  tenure: string;
  description: string;
}

export default function FormerCAGCards() {
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

  const legacyListEnglish: FormerCAG[] = [
    { id: 'fc-1', name: 'Shri Girish Chandra Murmu', tenure: '2020 – 2024', description: 'Mandated transparency during key technological transformations in public accounts auditing.' },
    { id: 'fc-2', name: 'Shri Rajiv Mehrishi', tenure: '2017 – 2020', description: 'Streamlined environmental and compliance audits for state and central bodies.' },
    { id: 'fc-3', name: 'Shri Shashi Kant Sharma', tenure: '2013 – 2017', description: 'Emphasized IT auditing frameworks across municipal and local bodies.' },
    { id: 'fc-4', name: 'Shri Vinod Rai', tenure: '2008 – 2013', description: 'Pioneered landmark audits of national resource allocation frameworks.' },
  ];

  const legacyListHindi: FormerCAG[] = [
    { id: 'fc-1', name: 'श्री गिरीश चंद्र मुर्मू', tenure: '2020 – 2024', description: 'सार्वजनिक खातों के ऑडिट में प्रमुख तकनीकी परिवर्तनों के दौरान पारदर्शिता को अनिवार्य किया।' },
    { id: 'fc-2', name: 'श्री राजीव महर्षि', tenure: '2017 – 2020', description: 'राज्य और केंद्रीय निकायों के लिए पर्यावरण और अनुपालन ऑडिट को सुव्यवस्थित किया।' },
    { id: 'fc-3', name: 'श्री शशिकांत शर्मा', tenure: '2013 – 2017', description: 'नगरपालिका और स्थानीय निकायों में आईटी ऑडिट ढांचे पर जोर दिया।' },
    { id: 'fc-4', name: 'श्री विनोद राय', tenure: '2008 – 2013', description: 'राष्ट्रीय संसाधन आवंटन ढांचे के ऐतिहासिक ऑडिट का बीड़ा उठाया।' },
  ];

  const legacyList = isHindi ? legacyListHindi : legacyListEnglish;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-cag-dark">
          {isHindi ? 'नेतृत्व की विरासत' : 'Legacy of Leadership'}
        </h3>
        <p className="text-sm text-zinc-500 mt-1">
          {isHindi ? 'भारत के पूर्व नियंत्रक एवं महालेखा परीक्षक' : 'Former-Comptroller-and-Auditors-General of India'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {legacyList.map((cag) => (
          <div key={cag.id} className="bg-white border border-[#d7d7d7] rounded-xl p-6 shadow-sm flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-500 font-bold shrink-0">
              {isHindi ? 'सीएजी' : 'CAG'}
            </div>
            <div>
              <h4 className="font-bold text-[#2a2a2a]">{cag.name}</h4>
              <p className="text-xs text-cag-green font-semibold mt-0.5">{cag.tenure}</p>
              <p className="text-xs text-zinc-500 mt-2 leading-relaxed">{cag.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
