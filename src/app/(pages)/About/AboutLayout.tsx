import React from 'react';
import AboutusSidemenu from '@/Reusable components/Side Menu/Aboutus_sidemenu/AboutusSidemenu';

export default function AboutLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <aside className="w-full lg:w-64 shrink-0">
          <AboutusSidemenu />
        </aside>
        <main className="flex-grow bg-white border border-[#d7d7d7] rounded-xl p-8 shadow-sm w-full">
          <h2 className="text-3xl font-extrabold text-[#2a2a2a] tracking-tight border-b border-[#e6e6e6] pb-4 mb-6">
            {title}
          </h2>
          <div className="prose prose-emerald max-w-none text-zinc-700 leading-relaxed space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
