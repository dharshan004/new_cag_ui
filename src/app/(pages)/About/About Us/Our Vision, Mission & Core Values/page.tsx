import React from 'react';
import AboutLayout from '@/app/(pages)/About/AboutLayout';

export default function VisionMissionPage() {
  return (
    <AboutLayout title="Our Vision, Mission &amp; Core Values">
      <h3 className="text-lg font-bold text-[#2a2a2a] mt-4">Our Vision</h3>
      <p className="italic pl-4 border-l-4 border-[#0a3d30]">
        "To be a global leader in public sector auditing, upholding transparency, integrity, and accountability in governance."
      </p>
      
      <h3 className="text-lg font-bold text-[#2a2a2a] mt-6">Our Mission</h3>
      <p>
        To promote accountability, transparency, and clean governance through high-quality auditing of public revenues and expenditures, helping legislature monitor administrative branches.
      </p>

      <h3 className="text-lg font-bold text-[#2a2a2a] mt-6">Core Values</h3>
      <ul className="list-disc pl-5 space-y-1 mt-2 text-sm text-zinc-600">
        <li><strong>Independence:</strong> Constitutionally protected from executive influence.</li>
        <li><strong>Objectivity:</strong> Fact-based assessments without political bias.</li>
        <li><strong>Integrity:</strong> Honest reporting of audited facts.</li>
      </ul>
    </AboutLayout>
  );
}
