'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import OurPresenceLayout from '../../OurPresenceLayout';
import NamesDetailsCard from '@/Reusable components/Cards/Names & Details Cards/NamesDetailsCard';
import { Office } from '@/types';
import { api } from '@/lib/api';

function StateOfficesPageContent() {
  const [offices, setOffices] = useState<Office[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter') || 'ae'; // Default to ae

  useEffect(() => {
    api.getPresence()
      .then((data) => {
        if (data) {
          // Filter only State-Level-Offices
          setOffices(data.filter(x => x.type === 'state'));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Filter based on active tab
  const filteredOffices = offices.filter(off => {
    const isAE = off.name.toLowerCase().includes('a&e') || off.name.toLowerCase().includes('accounts');
    if (filter === 'ae') return isAE;
    if (filter === 'audit') return !isAE;
    return true;
  });

  const displayTitle = filter === 'ae' ? 'State Accounts & Entitlement Offices' : 'State Audit Offices';

  return (
    <OurPresenceLayout title={displayTitle} activeTab={filter}>
      {loading ? (
        <div className="text-center py-10 text-[#0a3d30] font-medium">Loading State-Level-Offices...</div>
      ) : filteredOffices.length === 0 ? (
        <div className="text-center py-10 text-zinc-500">No offices found for this category.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredOffices.map((office) => (
            <NamesDetailsCard
              key={office.id}
              title={office.name}
              content={`State: ${office.state}\nAddress: ${office.address}\nPhone: ${office.phone}\nEmail: ${office.email}`}
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.name + ' ' + office.address)}`}
              linkText="View on Map"
            />
          ))}
        </div>
      )}
    </OurPresenceLayout>
  );
}

export default function StateOfficesPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-[#0a3d30] font-medium">Loading State-Level-Offices...</div>}>
      <StateOfficesPageContent />
    </Suspense>
  );
}
