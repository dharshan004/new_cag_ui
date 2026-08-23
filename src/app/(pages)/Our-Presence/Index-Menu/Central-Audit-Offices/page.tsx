'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import OurPresenceLayout from '../../OurPresenceLayout';
import NamesDetailsCard from '@/Reusable components/Cards/Names & Details Cards/NamesDetailsCard';
import { Office } from '@/types';
import { api } from '@/lib/api';

function CentralOfficesPageContent() {
  const [offices, setOffices] = useState<Office[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter') || 'defense';

  useEffect(() => {
    api.getPresence()
      .then((data) => {
        if (data) {
          // Filter central offices
          setOffices(data.filter(x => x.type === 'central'));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredOffices = offices.filter(off => {
    const name = off.name.toLowerCase();
    if (filter === 'defense') return name.includes('defense') || name.includes('defence');
    if (filter === 'railway') return name.includes('railway');
    if (filter === 'overseas') return name.includes('overseas') || name.includes('london') || name.includes('washington');
    if (filter === 'other') {
      return (
        !name.includes('defense') &&
        !name.includes('defence') &&
        !name.includes('railway') &&
        !name.includes('overseas') &&
        !name.includes('london') &&
        !name.includes('washington')
      );
    }
    return true;
  });

  const displayTitle = filter.charAt(0).toUpperCase() + filter.slice(1) + ' Audit Offices';

  return (
    <OurPresenceLayout title={displayTitle} activeTab={filter}>
      {loading ? (
        <div className="text-center py-10 text-[#0a3d30] font-medium">Loading Central-Audit-Offices...</div>
      ) : filteredOffices.length === 0 ? (
        <div className="text-center py-10 text-zinc-500">No offices found for this category.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredOffices.map((office) => (
            <NamesDetailsCard
              key={office.id}
              title={office.name}
              content={`Address: ${office.address}\nPhone: ${office.phone}\nEmail: ${office.email}`}
            />
          ))}
        </div>
      )}
    </OurPresenceLayout>
  );
}

export default function CentralOfficesPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-[#0a3d30] font-medium">Loading Central Offices...</div>}>
      <CentralOfficesPageContent />
    </Suspense>
  );
}
