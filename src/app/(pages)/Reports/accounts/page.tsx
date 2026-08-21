'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

interface StateOption {
  name: string;
  slug: string;
}

interface AccountDocument {
  year: string;
  size: string;
  href: string;
}

export default function AccountsPage() {
  const [segment, setSegment] = useState<'reports' | 'accounts'>('accounts');
  const [category, setCategory] = useState<string>('state-accounts');
  const [activeTab, setActiveTab] = useState<string>('glance');
  const [stateSearch, setStateSearch] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('Andhra Pradesh');

  const statesList: StateOption[] = [
    { name: 'Andhra Pradesh', slug: 'andhra-pradesh' },
    { name: 'Arunachal Pradesh', slug: 'arunachal-pradesh' },
    { name: 'Assam', slug: 'assam' },
    { name: 'Bihar', slug: 'bihar' },
    { name: 'Chhattisgarh', slug: 'chhattisgarh' },
    { name: 'Delhi', slug: 'delhi' },
    { name: 'Goa', slug: 'goa' },
    { name: 'Gujarat', slug: 'gujarat' },
    { name: 'Haryana', slug: 'haryana' },
    { name: 'Himachal Pradesh', slug: 'himachal-pradesh' },
    { name: 'Jharkhand', slug: 'jharkhand' },
    { name: 'Karnataka', slug: 'karnataka' },
    { name: 'Kerala', slug: 'kerala' },
    { name: 'Madhya Pradesh', slug: 'madhya-pradesh' },
    { name: 'Maharashtra', slug: 'maharashtra' },
    { name: 'Manipur', slug: 'manipur' },
    { name: 'Meghalaya', slug: 'meghalaya' },
    { name: 'Mizoram', slug: 'mizoram' },
    { name: 'Nagaland', slug: 'nagaland' },
    { name: 'Odisha', slug: 'odisha' },
    { name: 'Punjab', slug: 'punjab' },
    { name: 'Rajasthan', slug: 'rajasthan' },
    { name: 'Sikkim', slug: 'sikkim' },
    { name: 'Tamil Nadu', slug: 'tamil-nadu' },
    { name: 'Telangana', slug: 'telangana' },
    { name: 'Tripura', slug: 'tripura' },
    { name: 'Uttar Pradesh', slug: 'uttar-pradesh' },
    { name: 'Uttarakhand', slug: 'uttarakhand' },
    { name: 'West Bengal', slug: 'west-bengal' }
  ];

  // Mock document data mapped by Tab
  const documentsByTab: Record<string, AccountDocument[]> = {
    'glance': [
      { year: '2024 - 25', size: '5.97 MB', href: '#' },
      { year: '2023 - 24', size: '1.33 MB', href: '#' },
      { year: '2022 - 23', size: '4.99 MB', href: '#' },
      { year: '2021 - 22', size: '4.86 MB', href: '#' }
    ],
    'appropriation': [
      { year: '2024 - 25', size: '12.4 MB', href: '#' },
      { year: '2023 - 24', size: '11.8 MB', href: '#' },
      { year: '2022 - 23', size: '10.2 MB', href: '#' },
      { year: '2021 - 22', size: '9.85 MB', href: '#' }
    ],
    'finance': [
      { year: '2024 - 25', size: '24.1 MB', href: '#' },
      { year: '2023 - 24', size: '22.9 MB', href: '#' },
      { year: '2022 - 23', size: '21.0 MB', href: '#' },
      { year: '2021 - 22', size: '19.4 MB', href: '#' }
    ],
    'monthly-key-indicators': [
      { year: 'June 2026', size: '412 KB', href: '#' },
      { year: 'May 2026', size: '380 KB', href: '#' },
      { year: 'April 2026', size: '425 KB', href: '#' },
      { year: 'March 2026', size: '920 KB', href: '#' }
    ],
    'faaa-data': [
      { year: '2024 - 25 FA&AA Report', size: '1.45 MB', href: '#' },
      { year: '2023 - 24 FA&AA Report', size: '1.20 MB', href: '#' }
    ]
  };

  const activeDocuments = documentsByTab[activeTab] || [];

  const filteredStates = useMemo(() => {
    return statesList.filter(st => 
      st.name.toLowerCase().includes(stateSearch.toLowerCase())
    );
  }, [stateSearch]);

  return (
    <div className="accounts-page" data-node-id="127:10564" data-name="Accounts - State Accounts">
      {/* Breadcrumbs */}
      <nav className="breadcrumbs" aria-label="Breadcrumb" data-node-id="127:10976">
        <ol className="breadcrumbs__trail">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li className="breadcrumbs__sep" aria-hidden="true">
            <img src="/assets/41f2dfbdd898e5bcb3c45bf6f39d42c82e1d2286.svg" alt="" className="breadcrumbs__chevron" />
          </li>
          <li>
            <Link href="/reports">Reports</Link>
          </li>
          <li className="breadcrumbs__sep" aria-hidden="true">
            <img src="/assets/41f2dfbdd898e5bcb3c45bf6f39d42c82e1d2286.svg" alt="" className="breadcrumbs__chevron" />
          </li>
          <li>
            <span className="breadcrumbs__muted">Accounts</span>
          </li>
          <li className="breadcrumbs__sep" aria-hidden="true">
            <img src="/assets/41f2dfbdd898e5bcb3c45bf6f39d42c82e1d2286.svg" alt="" className="breadcrumbs__chevron" />
          </li>
          <li className="breadcrumbs__current" aria-current="page">State Accounts</li>
        </ol>
      </nav>

      {/* Dynamic State Title */}
      <h1 className="page-heading">State Accounts - {selectedState}</h1>

      <div className="accounts-layout">
        {/* Sidebar Filters */}
        <aside className="filters-panel" data-node-id="269:25502" data-name="Side Menu">
          <div className="filters-panel__inner" data-node-id="269:25503">
            <h2 className="filters-panel__heading">Filters</h2>
            <div className="filters-panel__divider"></div>

            {/* Reports/Accounts toggle segment */}
            <div className="segmented-control" role="group" aria-label="Reports or Accounts">
              <button 
                type="button" 
                className={`segmented-control__btn ${segment === 'reports' ? 'segmented-control__btn--active' : ''}`}
                onClick={() => {
                  setSegment('reports');
                  window.location.href = '/Reports';
                }}
                aria-pressed={segment === 'reports' ? 'true' : 'false'}
              >
                Reports
              </button>
              <button 
                type="button" 
                className={`segmented-control__btn ${segment === 'accounts' ? 'segmented-control__btn--active' : ''}`}
                onClick={() => setSegment('accounts')}
                aria-pressed={segment === 'accounts' ? 'true' : 'false'}
              >
                Accounts
              </button>
            </div>

            {/* Category list items */}
            <div className="category-list" role="group" aria-label="Account category">
              <button 
                type="button" 
                className={`category-list__item ${category === 'state-accounts' ? 'category-list__item--active' : ''}`}
                onClick={() => setCategory('state-accounts')}
              >
                State Accounts
              </button>
              <button 
                type="button" 
                className={`category-list__item ${category === 'territories-accounts' ? 'category-list__item--active' : ''}`}
                onClick={() => setCategory('territories-accounts')}
              >
                Territories Accounts
              </button>
              <button 
                type="button" 
                className={`category-list__item ${category === 'combined-finance-revenue' ? 'category-list__item--active' : ''}`}
                onClick={() => setCategory('combined-finance-revenue')}
              >
                Combined Finance and Revenue Accounts
              </button>
              <button 
                type="button" 
                className={`category-list__item ${category === 'annual-conference' ? 'category-list__item--active' : ''}`}
                onClick={() => setCategory('annual-conference')}
              >
                Annual Conference of State Finance Secretaries
              </button>
            </div>

            {/* Scrollable list of states */}
            <div className="states-section">
              <h3 className="filters-panel__heading filters-panel__heading--sub">States</h3>
              <div className="filters-panel__divider filters-panel__divider--narrow"></div>

              <label className="states-search">
                <input 
                  type="search" 
                  className="states-search__input" 
                  placeholder="Search" 
                  aria-label="Search states" 
                  value={stateSearch}
                  onChange={(e) => setStateSearch(e.target.value)}
                />
                <img src="/assets/ef7eb7134dafeda4c8183619dad425b62c132784.svg" alt="" className="states-search__icon" />
              </label>

              <div className="states-list" id="states-list" role="group" aria-label="Select a state or union territory">
                {filteredStates.map((st) => (
                  <button 
                    key={st.slug}
                    type="button" 
                    className={`states-list__item ${selectedState === st.name ? 'states-list__item--active' : ''}`}
                    onClick={() => setSelectedState(st.name)}
                  >
                    {st.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Right Content Panel */}
        <div className="accounts-content">
          <div className="content-header" data-node-id="127:10991">
            <div className="tab-row-wrap">
              <div className="tab-row" role="tablist" aria-label="Account document tabs">
                <button 
                  type="button" 
                  className={`tab ${activeTab === 'glance' ? 'tab--active' : ''}`}
                  onClick={() => setActiveTab('glance')}
                  role="tab"
                  aria-selected={activeTab === 'glance' ? 'true' : 'false'}
                >
                  Accounts at a Glance
                </button>
                <button 
                  type="button" 
                  className={`tab ${activeTab === 'appropriation' ? 'tab--active' : ''}`}
                  onClick={() => setActiveTab('appropriation')}
                  role="tab"
                  aria-selected={activeTab === 'appropriation' ? 'true' : 'false'}
                >
                  Appropriation Accounts
                </button>
                <button 
                  type="button" 
                  className={`tab ${activeTab === 'finance' ? 'tab--active' : ''}`}
                  onClick={() => setActiveTab('finance')}
                  role="tab"
                  aria-selected={activeTab === 'finance' ? 'true' : 'false'}
                >
                  Finance Accounts
                </button>
                <button 
                  type="button" 
                  className={`tab ${activeTab === 'monthly-key-indicators' ? 'tab--active' : ''}`}
                  onClick={() => setActiveTab('monthly-key-indicators')}
                  role="tab"
                  aria-selected={activeTab === 'monthly-key-indicators' ? 'true' : 'false'}
                >
                  Monthly Key Indicators
                </button>
                <button 
                  type="button" 
                  className={`tab ${activeTab === 'faaa-data' ? 'tab--active' : ''}`}
                  onClick={() => setActiveTab('faaa-data')}
                  role="tab"
                  aria-selected={activeTab === 'faaa-data' ? 'true' : 'false'}
                >
                  FA&amp;AA Data
                </button>
              </div>
            </div>

            <button type="button" className="archive-btn" data-node-id="127:11004">
              <img src="/assets/4e13abbcaf959461c9a14f6751f87fdb1d16a88e.svg" alt="" className="archive-btn__icon" />
              <span>Archive</span>
            </button>
          </div>

          {/* Years list card */}
          <div className="years-card" data-node-id="127:10623">
            <ul className="years-list">
              {activeDocuments.map((doc, idx) => (
                <li key={idx} className="year-row">
                  <span className="year-row__label">{doc.year}</span>
                  <div className="year-row__meta">
                    <img src="/assets/c4913da1b882a52fb7cb973a9d334b9abf2e253e.png" alt="PDF document icon" className="year-row__icon" />
                    <div className="year-row__file">
                      <span className="year-row__size">{doc.size}</span>
                      <a className="year-row__link" href={doc.href}>View PDF</a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
