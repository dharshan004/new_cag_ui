'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import OurPresenceLayout from '../../OurPresenceLayout';
import NamesDetailsCard from '@/Reusable components/Cards/Names & Details Cards/NamesDetailsCard';
import { Office } from '@/types';
import { api } from '@/lib/api';

function TrainingInstitutesPageContent() {
  const [offices, setOffices] = useState<Office[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter') || 'regional';

  useEffect(() => {
    api.getPresence()
      .then((data) => {
        if (data) {
          // Filter training institutes
          setOffices(data.filter(x => x.type === 'training'));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredOffices = offices.filter(off => {
    const name = off.name.toLowerCase();
    if (filter === 'regional') return name.includes('regional') || name.includes('capacity');
    if (filter === 'iced') return name.includes('iced') || name.includes('environment');
    if (filter === 'icisa') return name.includes('icisa') || name.includes('information');
    if (filter === 'naaa') return name.includes('naaa') || name.includes('academy');
    if (filter === 'ical') return name.includes('ical') || name.includes('local');
    return true;
  });

  const displayTitle = filter === 'naaa' 
    ? 'National Academy of Audit & Accounts' 
    : filter === 'iced' 
      ? 'International Centre for Environment Audit' 
      : filter === 'icisa' 
        ? 'International Centre for Information Systems' 
        : filter === 'ical' 
          ? 'International Centre for Audit of Local Governance' 
          : 'Regional Capacity Building Institutes';

  return (
    <OurPresenceLayout title={displayTitle} activeTab={filter}>
      {loading ? (
        <div className="text-center py-10 text-[#0a3d30] font-medium">Loading Training Institutes...</div>
      ) : filteredOffices.length === 0 ? (
        <div className="text-center py-10 text-zinc-500">No training institutes found for this category.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredOffices.map((office) => (
            <NamesDetailsCard
              key={office.id}
              title={office.name}
              content={`Address: ${office.address}\nPhone: ${office.phone}\nEmail: ${office.email}`}
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.name + ' ' + office.address)}`}
              linkText="View on Map"
            />
          ))}
        </div>
      )}
    </OurPresenceLayout>
  );
}

export default function TrainingInstitutesPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-[#0a3d30] font-medium">Loading Training Institutes...</div>}>
      <TrainingInstitutesPageContent />
    </Suspense>
  );
}
