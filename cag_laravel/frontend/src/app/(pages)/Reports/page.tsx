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

const HINDI_TRANSLATIONS: Record<string, { title: string; tag: string; sector: string }> = {
  'rep-1': {
    title: 'ग्रामीण जिलों में स्वास्थ्य सेवाओं और पोलियो टीकाकरण प्रशासन पर लेखा परीक्षा रिपोर्ट',
    tag: 'वित्त',
    sector: 'सामाजिक कल्याण'
  },
  'rep-2': {
    title: 'सीमा सुरक्षा खरीद और आधुनिकीकरण योजनाओं पर रक्षा लेखा परीक्षा रिपोर्ट',
    tag: 'विपणन',
    sector: 'वित्त'
  },
  'rep-3': {
    title: 'भारतीय रेलवे सिग्नलिंग सिस्टम और आधुनिकीकरण योजनाओं पर निष्पादन लेखा परीक्षा',
    tag: 'प्रौद्योगिकी',
    sector: 'परिवहन'
  },
  'rep-4': {
    title: 'मेट्रो क्षेत्रों में प्रत्यक्ष कर प्राप्तियों और कॉर्पोरेट कर निर्धारण का अनुपालन ऑडिट',
    tag: 'वित्त',
    sector: 'वित्त'
  },
  'rep-5': {
    title: 'नगर निगम राजस्व और संपत्ति कर निर्धारण पर लेखा परीक्षा रिपोर्ट',
    tag: 'वित्त',
    sector: 'सामाजिक कल्याण'
  },
  'rep-6': {
    title: 'केंद्रीय उत्पाद शुल्क विभाग में सूचना प्रौद्योगिकी प्रणालियों का निष्पादन मूल्यांकन',
    tag: 'प्रौद्योगिकी',
    sector: 'परिवहन'
  },
  'home-rep-1': {
    title: 'बुनियादी ढांचा विकास और नगरपालिका ठोस कचरा प्रबंधन पर लेखा परीक्षा रिपोर्ट',
    tag: 'पाठ',
    sector: 'नागरिक / शहरी विकास'
  },
  'home-rep-2': {
    title: 'तमिलनाडु के तटीय जिलों में पर्यावरण प्रबंधन पर विषयगत लेखा परीक्षा',
    tag: 'पाठ',
    sector: 'तमिलनाडु / पर्यावरण प्रबंधन'
  },
  'home-rep-3': {
    title: 'आंध्र प्रदेश में सिंचाई योजनाओं और नहर नेटवर्क पर निष्पादन लेखा परीक्षा',
    tag: 'पाठ',
    sector: 'आंध्र प्रदेश / सिंचाई योजनाएं'
  }
};

function ReportsPageContent() {
  const [segment, setSegment] = useState<'reports' | 'accounts'>('reports');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  
  // Sidebar criteria states
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedSector, setSelectedSector] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  // Pagination states
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const urlQuery = searchParams.get('query');

  const [allReports, setAllReports] = useState<ReportItem[]>([]);
  const [lang, setLang] = useState<'English' | 'हिन्दी'>('English');

  useEffect(() => {
    if (urlQuery !== null) {
      setSearchQuery(urlQuery);
      setPage(1);
    }
  }, [urlQuery]);

  useEffect(() => {
    setLang(dataManager.getLanguage());
    const handleLangChange = () => {
      setLang(dataManager.getLanguage());
    };
    window.addEventListener('languageChange', handleLangChange);
    return () => window.removeEventListener('languageChange', handleLangChange);
  }, []);

  // Fetch live reports dynamically whenever page, search, or filters change
  useEffect(() => {
    setLoading(true);
    const queryParams = new URLSearchParams({
      page: String(page),
      query: searchQuery,
      level: selectedLevel,
      sector: selectedSector,
      type: selectedType,
      year: selectedYear
    });

    fetch(`/api/reports?${queryParams.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (data.items && Array.isArray(data.items)) {
          const mapped = data.items.map((r: any) => ({
            id: r.id,
            title: r.title,
            title_hi: r.title_hi,
            tag: r.report_type || 'Audit',
            date: r.published_date,
            year: String(new Date(r.published_date).getFullYear()) || r.published_date,
            sector: r.sector,
            level: r.admin_level,
            type: r.report_type,
            image: '/assets/4c1eaa81c93edbe02d6f7d5437565571dcec4b04.png'
          }));
          setAllReports(mapped);
          setTotal(data.total);
          setTotalPages(Math.ceil(data.total / 10)); // 10 per page in server API
        } else {
          setAllReports([]);
          setTotal(0);
          setTotalPages(1);
        }
        setLoading(false);
      })
      .catch(err => {
        console.warn('Reports listing fetch failed:', err);
        setLoading(false);
      });
  }, [page, searchQuery, selectedYear, selectedLevel, selectedSector, selectedType]);

  const isHindi = lang === 'हिन्दी';

  const handleFilterChange = (setter: (v: any) => void, val: any) => {
    setter(val);
    setPage(1);
  };

  const clearAllFilters = () => {
    setSelectedLevel('All');
    setSelectedSector('All');
    setSelectedType('All');
    setSelectedYear('');
    setSearchQuery('');
    setPage(1);
  };

  const filteredReports = allReports;

  return (
    <div className="reports-page" data-node-id="364:18601" data-name="Reports">
      <div className="page-title-row" data-node-id="364:18645">
        <div className="page-title">
          <h1 className="page-title__heading">{isHindi ? 'रिपोर्ट' : 'Reports'}</h1>
          <p className="page-title__count">
            {filteredReports.length} {isHindi ? 'परिणाम मिले' : 'results found'}
          </p>
        </div>
        <div className="page-search">
          <label className="page-search__inner">
            <input 
              type="search" 
              className="page-search__input" 
              placeholder={isHindi ? 'रिपोर्ट खोजें...' : 'Search by keyword, report number, ministry'} 
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
              <h2 className="filters-panel__heading">{isHindi ? 'फ़िल्टर' : 'Filters'}</h2>
              <button onClick={clearAllFilters} className="text-xs text-[#751639] hover:underline font-semibold border-none bg-transparent cursor-pointer">
                {isHindi ? 'सभी साफ़ करें' : 'Clear All'}
              </button>
            </div>
            <div className="filters-panel__divider"></div>

            <div className="segmented-control mb-6" role="group">
              <button 
                type="button" 
                className={`segmented-control__btn ${segment === 'reports' ? 'segmented-control__btn--active' : ''}`}
                onClick={() => setSegment('reports')}
              >
                {isHindi ? 'रिपोर्ट' : 'Reports'}
              </button>
              <button 
                type="button" 
                className={`segmented-control__btn ${segment === 'accounts' ? 'segmented-control__btn--active' : ''}`}
                onClick={() => {
                  setSegment('accounts');
                  window.location.href = '/Reports/accounts';
                }}
              >
                {isHindi ? 'लेखा' : 'Accounts'}
              </button>
            </div>

            <div className="date-range mb-6">
              <label className="date-range__label" htmlFor="select-year">{isHindi ? 'वर्ष चुनें' : 'Select Year'}</label>
              <div className="date-range__field-wrap">
                <select 
                  id="select-year" 
                  className="date-range__field text-xs text-zinc-700 bg-white"
                  value={selectedYear}
                  onChange={(e) => { setSelectedYear(e.target.value); setPage(1); }}
                >
                  <option value="">{isHindi ? 'वर्ष चुनें' : 'Select year'}</option>
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                </select>
                <img src="/assets/c25447f75bf3c75dcd800d5c0bce7784d9deef17.svg" alt="" className="date-range__chevron" />
              </div>
            </div>

            <FiltersSidemenu
              selectedLevel={selectedLevel}
              setSelectedLevel={(val) => handleFilterChange(setSelectedLevel, val)}
              selectedSector={selectedSector}
              setSelectedSector={(val) => handleFilterChange(setSelectedSector, val)}
              selectedType={selectedType}
              setSelectedType={(val) => handleFilterChange(setSelectedType, val)}
            />
          </div>
        </aside>

        {/* Reports cards grid */}
        <section className="card-grid" aria-label="Report results">
          {filteredReports.length === 0 ? (
            <div className="text-center py-20 text-zinc-500 font-medium col-span-3">
              {isHindi ? 'कोई रिपोर्ट फ़िल्टर से मेल नहीं खाती।' : 'No reports matching search filters.'}
            </div>
          ) : (
            <>
              {filteredReports.map((report: any) => {
                const details = {
                  title: isHindi ? (report.title_hi || HINDI_TRANSLATIONS[report.id]?.title || report.title) : report.title,
                  tag: isHindi ? (HINDI_TRANSLATIONS[report.id]?.tag || report.tag) : report.tag,
                  sector: isHindi ? (HINDI_TRANSLATIONS[report.id]?.sector || report.sector) : report.sector
                };

                return (
                  <article 
                    key={report.id} 
                    className="report-card cursor-pointer transition-transform duration-200 hover:-translate-y-1 hover:shadow-md" 
                    data-node-id={report.id}
                    onClick={() => router.push(`/Reports/${report.id}`)}
                  >
                    <Link href={`/Reports/${report.id}`} className="report-card__banner" onClick={(e) => e.stopPropagation()}>
                      <img src={report.image} alt={details.title} className="report-card__photo" />
                    </Link>
                    <div className="report-card__tag-row">
                      <span className="report-card__tag">{details.tag}</span>
                      <span className="report-card__date">{report.date}</span>
                    </div>
                    <div className="report-card__body">
                      <h3 className="report-card__title">
                        <Link href={`/Reports/${report.id}`} className="report-card__title-link" onClick={(e) => e.stopPropagation()}>
                          {details.title}
                        </Link>
                      </h3>
                      <div className="report-card__cta" onClick={(e) => e.stopPropagation()}>
                        <img src="/assets/e48d21d03bf5d85f98dd2bf1b2a8c03db29e05e0.svg" alt="" className="report-card__download-icon" />
                        <a href="#" className="report-card__label">{isHindi ? 'पूरी रिपोर्ट डाउनलोड करें' : 'Download Full Report'}</a>
                      </div>
                      <p className="report-card__sector">
                        <span className="report-card__sector-label">{isHindi ? 'क्षेत्र: ' : 'Sector: '}</span>
                        {details.sector}
                      </p>
                    </div>
                  </article>
                );
              })}

              {totalPages > 1 && (
                <div className="flex items-center justify-between col-span-3 mt-8 pt-4 border-t border-gray-200">
                  <span className="text-sm text-zinc-600">
                    {isHindi ? `पृष्ठ ${page} का ${totalPages}` : `Page ${page} of ${totalPages}`}
                  </span>
                  <div className="flex gap-2">
                    <button
                      disabled={page <= 1}
                      onClick={() => setPage(p => p - 1)}
                      className="px-4 py-2 border border-zinc-300 rounded-lg text-sm font-medium hover:bg-zinc-50 disabled:opacity-50 transition-colors"
                    >
                      {isHindi ? 'पिछला' : 'Previous'}
                    </button>
                    <button
                      disabled={page >= totalPages}
                      onClick={() => setPage(p => p + 1)}
                      className="px-4 py-2 bg-[#0a3d30] text-white rounded-lg text-sm font-medium hover:bg-[#0f5a45] disabled:opacity-50 transition-colors"
                    >
                      {isHindi ? 'अगला' : 'Next'}
                    </button>
                  </div>
                </div>
              )}
            </>
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
