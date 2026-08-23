'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import FiltersSidemenu from '@/Reusable components/Side Menu/Filters_sidemenu/FiltersSidemenu';
import { dataManager } from '@/lib/dataManager';

interface ReportItem {
  id: string;
  title: string;
  image: string;
  tag: string;
  date: string;
  year: string;
  sector: string;
  level: string;
  type: string;
}

function ReportsPageContent() {
  const [segment, setSegment] = useState<'reports' | 'accounts'>('reports');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  
  // Sidebar criteria states
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedSector, setSelectedSector] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  const searchParams = useSearchParams();
  const router = useRouter();
  const urlQuery = searchParams.get('query');

  const [allReports, setAllReports] = useState<ReportItem[]>([]);

  useEffect(() => {
    if (urlQuery !== null) {
      setSearchQuery(urlQuery);
    }
  }, [urlQuery]);

  useEffect(() => {
    setAllReports(dataManager.getReports());
  }, []);

  const clearAllFilters = () => {
    setSelectedLevel('All');
    setSelectedSector('All');
    setSelectedType('All');
    setSelectedYear('');
    setSearchQuery('');
  };

  const filteredReports = useMemo(() => {
    return allReports.filter(report => {
      if (segment === 'accounts') return false;
      if (searchQuery && !report.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (selectedYear && report.year !== selectedYear) return false;
      if (selectedLevel !== 'All' && report.level !== selectedLevel) return false;
      if (selectedSector !== 'All' && report.sector !== selectedSector) return false;
      if (selectedType !== 'All' && report.type !== selectedType) return false;
      return true;
    });
  }, [allReports, segment, searchQuery, selectedYear, selectedLevel, selectedSector, selectedType]);

  return (
    <div className="reports-page" data-node-id="364:18601" data-name="Reports">
      <div className="page-title-row" data-node-id="364:18645">
        <div className="page-title">
          <h1 className="page-title__heading">Reports</h1>
          <p className="page-title__count">{filteredReports.length} results found</p>
        </div>
        <div className="page-search">
          <label className="page-search__inner">
            <input 
              type="search" 
              className="page-search__input" 
              placeholder="Search by keyword, report number, ministry" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="page-search__icon-wrap">
              <img src="/assets/bc54b9bd4234b01dd18bbef742b1324bb4e5da58.svg" alt="" className="page-search__icon" />
            </span>
          </label>
        </div>
      </div>

      <div className="reports-layout">
        {/* Restructured Filters Panel */}
        <aside className="filters-panel">
          <div className="filters-panel__inner">
            <div className="flex justify-between items-center mb-4">
              <h2 className="filters-panel__heading">Filters</h2>
              <button onClick={clearAllFilters} className="text-xs text-[#751639] hover:underline font-semibold">
                Clear All
              </button>
            </div>
            <div className="filters-panel__divider"></div>

            <div className="segmented-control mb-6" role="group">
              <button 
                type="button" 
                className={`segmented-control__btn ${segment === 'reports' ? 'segmented-control__btn--active' : ''}`}
                onClick={() => setSegment('reports')}
              >
                Reports
              </button>
              <button 
                type="button" 
                className={`segmented-control__btn ${segment === 'accounts' ? 'segmented-control__btn--active' : ''}`}
                onClick={() => {
                  setSegment('accounts');
                  window.location.href = '/Reports/accounts';
                }}
              >
                Accounts
              </button>
            </div>

            <div className="date-range mb-6">
              <label className="date-range__label" htmlFor="select-year">Select Year</label>
              <div className="date-range__field-wrap">
                <select 
                  id="select-year" 
                  className="date-range__field text-xs text-zinc-700 bg-white"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  <option value="">Select year</option>
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                </select>
                <img src="/assets/c25447f75bf3c75dcd800d5c0bce7784d9deef17.svg" alt="" className="date-range__chevron" />
              </div>
            </div>

            <FiltersSidemenu
              selectedLevel={selectedLevel}
              setSelectedLevel={setSelectedLevel}
              selectedSector={selectedSector}
              setSelectedSector={setSelectedSector}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
          </div>
        </aside>

        {/* Reports cards grid */}
        <section className="card-grid" aria-label="Report results">
          {filteredReports.length === 0 ? (
            <div className="text-center py-20 text-zinc-500 font-medium col-span-3">
              No reports matching search filters.
            </div>
          ) : (
            filteredReports.map((report) => (
              <article 
                key={report.id} 
                className="report-card cursor-pointer transition-transform duration-200 hover:-translate-y-1 hover:shadow-md" 
                data-node-id={report.id}
                onClick={() => router.push(`/Reports/${report.id}`)}
              >
                <Link href={`/Reports/${report.id}`} className="report-card__banner" onClick={(e) => e.stopPropagation()}>
                  <img src={report.image} alt={report.title} className="report-card__photo" />
                </Link>
                <div className="report-card__tag-row">
                  <span className="report-card__tag">{report.tag}</span>
                  <span className="report-card__date">{report.date}</span>
                </div>
                <div className="report-card__body">
                  <h3 className="report-card__title">
                    <Link href={`/Reports/${report.id}`} className="report-card__title-link" onClick={(e) => e.stopPropagation()}>
                      {report.title}
                    </Link>
                  </h3>
                  <div className="report-card__cta" onClick={(e) => e.stopPropagation()}>
                    <img src="/assets/e48d21d03bf5d85f98dd2bf1b2a8c03db29e05e0.svg" alt="" className="report-card__download-icon" />
                    <a href="#" className="report-card__label">Download Full Report</a>
                  </div>
                  <p className="report-card__sector">
                    <span className="report-card__sector-label">Sector: </span>
                    {report.sector}
                  </p>
                </div>
              </article>
            ))
          )}
        </section>
      </div>
    </div>
  );
}

export default function ReportsPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-[#0a3d30] font-medium">Loading Reports...</div>}>
      <ReportsPageContent />
    </Suspense>
  );
}
