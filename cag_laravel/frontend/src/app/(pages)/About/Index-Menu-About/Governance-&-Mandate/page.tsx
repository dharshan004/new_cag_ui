import React from 'react';
import AboutLayout from '@/app/(pages)/About/AboutLayout';
import DynamicCMSWrapper from '@/Components/admin/DynamicCMSWrapper';

export default function GovernanceMandatePage() {
  const content = (
    <>
      <p>
        The mandate of the CAG is derived from Articles 149 to 151 of the Constitution of India.
      </p>
      <p>
        The Comptroller and Auditor General's (Duties, Powers and Conditions of Service) Act, 1971 governs the terms of service and defines the scope of audits of union, state, and local bodies.
      </p>
    </>
  );

  return (
    <AboutLayout title="Governance &amp; Mandate">
      <DynamicCMSWrapper slug="governance-mandate" fallbackContent={content} />
    </AboutLayout>
  );
}
