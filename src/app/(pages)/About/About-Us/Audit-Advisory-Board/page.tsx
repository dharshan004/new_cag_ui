import React from 'react';
import AboutLayout from '@/app/(pages)/About/AboutLayout';

export default function AuditAdvisoryBoardPage() {
  return (
    <AboutLayout title="Audit-Advisory-Board">
      <p>
        The Audit-Advisory-Board has been constituted to advise the Comptroller and Auditor General of India in matters relating to audit, including the development of audit methodologies, coverage of audit, and overall improvement in public accountability and governance frameworks.
      </p>
      <h3 className="text-lg font-bold text-[#2a2a2a] mt-4">Board Members</h3>
      <ul className="list-disc pl-5 space-y-2 mt-2 text-zinc-600 text-sm">
        <li><strong>Shri K. Sanjay Murthy</strong> - Chairman (Comptroller and Auditor General of India)</li>
        <li><strong>Deputy Comptroller and Auditor General</strong> - Member Secretary</li>
        <li>Prominent economists, former civil servants, and financial advisors from public institutions.</li>
      </ul>
    </AboutLayout>
  );
}
