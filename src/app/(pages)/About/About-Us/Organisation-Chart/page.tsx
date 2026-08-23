import React from 'react';
import AboutLayout from '@/app/(pages)/About/AboutLayout';

export default function OrganisationChartPage() {
  return (
    <AboutLayout title="Organisation-Chart">
      <p>
        The Comptroller and Auditor General of India leads the department. The organization functions through a hierarchy of senior executives overseeing audit fields:
      </p>
      
      <div className="bg-[#eee] border border-[#d7d7d7] rounded-xl p-6 mt-4 space-y-4 text-xs font-semibold text-[#2a2a2a]">
        <div className="text-center border-2 border-[#0a3d30] py-2 bg-white rounded-lg max-w-sm mx-auto shadow-sm">
          Comptroller &amp; Auditor General of India
        </div>
        <div className="text-center">⬇️</div>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center border border-[#751639] py-2 bg-white rounded-lg shadow-sm">
            Deputy CAG (Reports &amp; Central)
          </div>
          <div className="text-center border border-[#751639] py-2 bg-white rounded-lg shadow-sm">
            Deputy CAG (State Accounts)
          </div>
        </div>
        <div className="text-center">⬇️</div>
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center border border-[#d7d7d7] py-2 bg-white rounded-lg text-[10px]">
            Accountants General (State Audits)
          </div>
          <div className="text-center border border-[#d7d7d7] py-2 bg-white rounded-lg text-[10px]">
            Directors General (Central Audits)
          </div>
          <div className="text-center border border-[#d7d7d7] py-2 bg-white rounded-lg text-[10px]">
            Principal Directors (IT &amp; Training)
          </div>
        </div>
      </div>
    </AboutLayout>
  );
}
