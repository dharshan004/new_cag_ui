'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import OurPresenceLayout from '../../OurPresenceLayout';
import NamesDetailsCard from '@/Reusable components/Cards/Names & Details Cards/NamesDetailsCard';
import { Office } from '@/types';
import { api } from '@/lib/api';
import { dataManager } from '@/lib/dataManager';

const HINDI_OFFICE_TRANSLATIONS: Record<string, { name: string; address: string; state: string }> = {
  'st-1': {
    name: 'प्रधान महालेखाकार (लेखा एवं हकदारी) का कार्यालय, तमिलनाडु',
    address: '361, अन्ना सालै, तेनामपेट, चेन्नई - 600018',
    state: 'तमिलनाडु'
  },
  'st-2': {
    name: 'प्रधान महालेखाकार (लेखा परीक्षा)-I का कार्यालय, महाराष्ट्र',
    address: '101, महर्षि कर्वे रोड, चर्चगेट, मुंबई - 400020',
    state: 'महाराष्ट्र'
  }
};

function StateOfficesPageContent() {
  const [offices, setOffices] = useState<Office[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [lang, setLang] = useState<'English' | 'हिन्दी'>('English');
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter') || 'ae'; // Default to ae

  useEffect(() => {
    api.getPresence()
      .then((data) => {
        if (data) {
          setOffices(data.filter(x => x.type === 'state'));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));

    setLang(dataManager.getLanguage());
    const handleLangChange = () => {
      setLang(dataManager.getLanguage());
    };
    window.addEventListener('languageChange', handleLangChange);
    return () => window.removeEventListener('languageChange', handleLangChange);
  }, []);

  const isHindi = lang === 'हिन्दी';

  const filteredOffices = offices.filter(off => {
    const isAE = off.name.toLowerCase().includes('a&e') || off.name.toLowerCase().includes('accounts');
    if (filter === 'ae') return isAE;
    if (filter === 'audit') return !isAE;
    return true;
  });

  const displayTitle = isHindi 
    ? (filter === 'ae' ? 'राज्य लेखा एवं हकदारी कार्यालय' : 'राज्य लेखा परीक्षा कार्यालय')
    : (filter === 'ae' ? 'State Accounts & Entitlement Offices' : 'State Audit Offices');

  return (
    <OurPresenceLayout title={displayTitle} activeTab={filter}>
      {loading ? (
        <div className="text-center py-10 text-[#0a3d30] font-medium">
          {isHindi ? 'राज्य स्तरीय कार्यालय लोड हो रहे हैं...' : 'Loading State-Level-Offices...'}
        </div>
      ) : filteredOffices.length === 0 ? (
        <div className="text-center py-10 text-zinc-500">
          {isHindi ? 'इस श्रेणी के लिए कोई कार्यालय नहीं मिला।' : 'No offices found for this category.'}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredOffices.map((office) => {
            const details = isHindi && HINDI_OFFICE_TRANSLATIONS[office.id] ? HINDI_OFFICE_TRANSLATIONS[office.id] : {
              name: office.name,
              address: office.address,
              state: office.state
            };

            return (
              <NamesDetailsCard
                key={office.id}
                title={details.name}
                content={`${isHindi ? 'राज्य' : 'State'}: ${details.state}\n${isHindi ? 'पता' : 'Address'}: ${details.address}\n${isHindi ? 'फोन' : 'Phone'}: ${office.phone}\n${isHindi ? 'ईमेल' : 'Email'}: ${office.email}`}
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.name + ' ' + office.address)}`}
                linkText={isHindi ? 'मानचित्र पर देखें' : 'View on Map'}
              />
            );
          })}
        </div>
      )}
    </OurPresenceLayout>
  );
}

export default function StateOfficesPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-[#0a3d30] font-medium">Loading State Offices...</div>}>
      <StateOfficesPageContent />
    </Suspense>
  );
}
