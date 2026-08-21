'use client';

import React, { useState, useEffect } from 'react';
import { Office } from '@/types';
import { api } from '@/lib/api';
import NamesDetailsCard from '@/Reusable components/Cards/Names & Details Cards/NamesDetailsCard';

export default function TrainingInstitutesPage() {
  const [offices, setOffices] = useState<Office[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    api.getPresence()
      .then((data) => {
        if (data) {
          // Filter only Training Institutes
          setOffices(data.filter(x => x.type === 'training'));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-[#e6e6e6] pb-4">
        <h2 className="text-3xl font-extrabold text-[#2a2a2a] tracking-tight">Training Institutes</h2>
      </div>

      {loading ? (
        <div className="text-center py-10 text-[#0a3d30] font-medium">Loading Training Institutes...</div>
      ) : offices.length === 0 ? (
        <div className="text-center py-10 text-zinc-500">No Training Institutes found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offices.map((office) => (
            <NamesDetailsCard
              key={office.id}
              title={office.name}
              content={`State: ${office.state}\nAddress: ${office.address}\nPhone: ${office.phone}\nEmail: ${office.email}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
