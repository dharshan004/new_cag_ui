import { Office } from '@/types';

export interface ReportItem {
  id: string;
  title: string;
  image: string;
  tag: string;
  date: string;
  year: string;
  sector: string;
  level: string;
  type: string;
  isFeatured?: boolean;
  label?: string;
  desc?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  desc: string;
  date: string;
  type: 'trending' | 'featured';
  tag?: string;
  image?: string;
}

// Default initial data matching site contents (9 featured reports in total)
const DEFAULT_REPORTS: ReportItem[] = [
  {
    id: 'rep-1',
    title: 'Audit Report on Health Services and Polio Vaccination Administrations in Rural Districts',
    image: '/assets/4c1eaa81c93edbe02d6f7d5437565571dcec4b04.png',
    tag: 'Finance',
    date: 'Jun 4, 2026',
    year: '2026',
    sector: 'Social Welfare',
    level: 'States',
    type: 'Performance',
    label: 'Health Audit',
    desc: 'Review of vaccine distribution logistics, primary health center infrastructure, and public health fund implementation.',
    isFeatured: true
  },
  {
    id: 'rep-2',
    title: 'Defence Audit Report on Border Security Procurement and Modernization Schemes',
    image: '/assets/269d11ffce72c4343f0fa24955e0dc48a33d8255.png',
    tag: 'Marketing',
    date: 'Jul 15, 2026',
    year: '2026',
    sector: 'Finance',
    level: 'Union',
    type: 'Compliance',
    label: 'Defence Audit',
    desc: 'Detailed compliance assessment of security hardware acquisitions, border fence structures, and modern systems procurement.',
    isFeatured: true
  },
  {
    id: 'rep-3',
    title: 'Performance Audit on Indian Railways Signaling Systems and Modernization Schemes',
    image: '/assets/6574e2c9289333c9bdf86fe596a04b3f1c0238c3.png',
    tag: 'Technology',
    date: 'Aug 30, 2026',
    year: '2026',
    sector: 'Transport',
    level: 'Union',
    type: 'Performance',
    label: 'Railways Audit',
    desc: 'Signaling upgrade projects review evaluating budget allocations, installation timelines, and system integration reliability checks.',
    isFeatured: true
  },
  {
    id: 'rep-4',
    title: 'Compliance Audit of Direct Tax Receipts and Corporate Assessments in Metro Regions',
    image: '/assets/269d11ffce72c4343f0fa24955e0dc48a33d8255.png',
    tag: 'Finance',
    date: 'Jun 4, 2026',
    year: '2025',
    sector: 'Finance',
    level: 'Union',
    type: 'Compliance',
    label: 'Direct Tax Audit',
    desc: 'Audit evaluating compliance of corporate tax exemptions, assessment timelines, and direct receipt accounts clearance.',
    isFeatured: true
  },
  {
    id: 'rep-5',
    title: 'Audit Report on Municipal Corporation Revenue and Property Tax Assessments',
    image: '/assets/12e6d254adf33bbd46537f45eb8f9ecd50a15e55.png',
    tag: 'Finance',
    date: 'Sep 10, 2026',
    year: '2026',
    sector: 'Social Welfare',
    level: 'States',
    type: 'Compliance',
    label: 'Revenue Audit',
    desc: 'Review of local property assessments, tax collectors efficiency, and municipal development fund distributions.',
    isFeatured: true
  },
  {
    id: 'rep-6',
    title: 'Performance Evaluation of Information Technology Systems in Central Excise Department',
    image: '/assets/cc8a1a5614f48c98f397dcafcf38e8f22843dc2a.png',
    tag: 'Technology',
    date: 'Oct 05, 2026',
    year: '2026',
    sector: 'Transport',
    level: 'Union',
    type: 'Performance',
    label: 'Excise IT Audit',
    desc: 'Audit reviewing custom software deployments, server security frameworks, and processing performance benchmarks.',
    isFeatured: true
  },
  // Home page featured reports
  {
    id: 'home-rep-1',
    title: 'Audit Report on Infrastructure Development and Municipal Solid Waste Management',
    image: '/assets/d14889fd29ae93bd23d9b51c4dad883e07f826bf.png',
    tag: 'Text',
    date: 'Jun 4, 2026',
    year: '2026',
    sector: 'Civic / Urban Development',
    level: 'States',
    type: 'Performance',
    isFeatured: true,
    label: 'Civic',
    desc: 'Comprehensive review of urban infrastructure planning, fund utilization, and waste treatment plants across municipal corporations.'
  },
  {
    id: 'home-rep-2',
    title: 'Thematic Audit on Environmental Management in Coastal Districts of Tamil Nadu',
    image: '/assets/56272e2a85b8227dfa00af6d4065211e9ac5de8f.png',
    tag: 'Text',
    date: 'Jun 4, 2026',
    year: '2026',
    sector: 'Tamil Nadu / Environmental Management',
    level: 'States',
    type: 'Performance',
    isFeatured: true,
    label: 'Tamil Nadu',
    desc: 'Assessment of measures taken to prevent marine pollution, coastal erosion, and implementation of CRZ notifications.'
  },
  {
    id: 'home-rep-3',
    title: 'Performance Audit on Irrigation Schemes and Canal Networks in Andhra Pradesh',
    image: '/assets/28f782be18b6cfdf23aa0c90ec681e3916b8d6c7.png',
    tag: 'Text',
    date: 'Jun 4, 2026',
    year: '2026',
    sector: 'Andhra Pradesh / Irrigation Schemes',
    level: 'States',
    type: 'Performance',
    isFeatured: true,
    label: 'Andhra Pradesh',
    desc: 'Evaluation of major and medium irrigation projects, command area development, and drinking water supply provisions.'
  }
];

const DEFAULT_OFFICES: Office[] = [
  {
    id: 'st-1',
    state: 'Tamil Nadu',
    name: 'Office of the Principal Accountant General (A&E), Tamil Nadu',
    address: '361, Anna Salai, Teynampet, Chennai - 600018',
    phone: '+91-44-24324500',
    email: 'agaeTamilnadu@cag.gov.in',
    lat: 13.0405,
    lng: 80.2504,
    type: 'state'
  },
  {
    id: 'st-2',
    state: 'Maharashtra',
    name: 'Office of the Principal Accountant General (Audit)-I, Maharashtra',
    address: '101, Maharshi Karve Road, Churchgate, Mumbai - 400020',
    phone: '+91-22-22039680',
    email: 'agaemumbai@cag.gov.in',
    lat: 18.9322,
    lng: 72.8264,
    type: 'state'
  },
  {
    id: 'c-def',
    state: 'Delhi',
    name: 'Office of the Director General of Audit (Defence Services), New Delhi',
    address: 'L-II Block, Brassey Avenue, New Delhi - 110001',
    phone: '+91-11-23012290',
    email: 'dgadefenceserv@cag.gov.in',
    lat: 28.6143,
    lng: 77.2014,
    type: 'central'
  },
  {
    id: 'c-rail',
    state: 'Delhi',
    name: 'Office of the Director General of Audit (Railways), New Delhi',
    address: 'Rail Bhavan, Raisina Road, New Delhi - 110001',
    phone: '+91-11-23389012',
    email: 'dgarailways@cag.gov.in',
    lat: 28.6163,
    lng: 77.2114,
    type: 'central'
  },
  {
    id: 'c-over',
    state: 'Overseas',
    name: 'Office of the Director General of Audit, London (Overseas Office)',
    address: 'High Commission of India, India House, Aldwych, London WC2B 4NA',
    phone: '+44-20-78368484',
    email: 'caglondon@cag.gov.in',
    lat: 51.5132,
    lng: -0.1195,
    type: 'central'
  },
  {
    id: 'c-1',
    state: 'Delhi',
    name: 'Director General of Audit (Post & Telecommunications)',
    address: 'Sham Nath Marg, Near Civil Lines Metro Station, Delhi - 110054',
    phone: '+91-11-23812800',
    email: 'dgapt@cag.gov.in',
    lat: 28.6738,
    lng: 77.2274,
    type: 'central'
  },
  {
    id: 'tr-reg-1',
    state: 'Karnataka',
    name: 'Regional Training Institute (RTI), Bengaluru',
    address: 'Basava Samithi Building, Bengaluru, Karnataka - 560001',
    phone: '+91-80-22261000',
    email: 'rtibangalore@cag.gov.in',
    lat: 12.9716,
    lng: 77.5946,
    type: 'training'
  },
  {
    id: 'tr-reg-2',
    state: 'Maharashtra',
    name: 'Regional Training Centre (RTC), Mumbai',
    address: 'Pratishtha Bhavan, Marine Lines, Mumbai - 400020',
    phone: '+91-22-22039680',
    email: 'rtcmumbai@cag.gov.in',
    lat: 18.9440,
    lng: 72.8258,
    type: 'training'
  },
  {
    id: 'tr-1',
    state: 'Rajasthan',
    name: 'International Centre for Environment Audit and Sustainable Development (iCED)',
    address: 'Kant Kalwar, RIICO Industrial Area, NH-11C, Jaipur, Rajasthan - 303002',
    phone: '+91-141-2772000',
    email: 'iced@cag.gov.in',
    lat: 27.1350,
    lng: 75.8744,
    type: 'training'
  },
  {
    id: 'tr-2',
    state: 'Uttar Pradesh',
    name: 'International Centre for Information Systems and Audit (iCISA)',
    address: 'Sector 25, Noida, Uttar Pradesh - 201301',
    phone: '+91-120-2400050',
    email: 'icisa@cag.gov.in',
    lat: 28.5355,
    lng: 77.3910,
    type: 'training'
  },
  {
    id: 'tr-naaa',
    state: 'Shimla',
    name: 'National Academy of Audit & Accounts (NAAA), Shimla',
    address: 'Chaura Maidan, Shimla, Himachal Pradesh - 171004',
    phone: '+91-177-2803153',
    email: 'naaashimla@cag.gov.in',
    lat: 31.1048,
    lng: 77.1734,
    type: 'training'
  },
  {
    id: 'tr-ical',
    state: 'Kerala',
    name: 'International Centre for Audit of Local Governance (iCAL), Kozhikode',
    address: 'Kozhikode, Kerala - 673001',
    phone: '+91-495-2371000',
    email: 'ical@cag.gov.in',
    lat: 11.2588,
    lng: 75.7804,
    type: 'training'
  }
];

const DEFAULT_NEWS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Release of Union Government Finance Accounts for 2025-26',
    desc: 'Official publication of audited finance and appropriation accounts details for central ministries.',
    date: 'June 4, 2026',
    type: 'trending'
  },
  {
    id: 'news-2',
    title: 'International Training Program on Environmental Audit Commences',
    desc: 'iCISA hosts delegates from 32 countries for specialized training in auditing ecological policies.',
    date: 'June 4, 2026',
    type: 'trending'
  },
  {
    id: 'news-3',
    title: 'Empanelment Open for Chartered Accountant Firms for FY 2026-27',
    desc: 'Eligible CA firms can submit online applications for audit allocations in public sector units.',
    date: 'June 4, 2026',
    type: 'trending'
  },
  {
    id: 'news-featured',
    title: 'CAG tables performance audit report on Indian Railways modernization schemes',
    desc: 'Featured headline story detailing the signaling systems audit report tabled in Parliament.',
    date: '03 June 2026',
    type: 'featured',
    image: '/assets/e2c5a3b888a0623426c634ce2f2bee016b8fb5ab.png',
    tag: 'News'
  }
];

export const dataManager = {
  getLanguage(): 'English' | 'हिन्दी' {
    if (typeof window === 'undefined') return 'English';
    return (localStorage.getItem('cag_language') as any) || 'English';
  },

  setLanguage(lang: 'English' | 'हिन्दी') {
    if (typeof window === 'undefined') return;
    localStorage.setItem('cag_language', lang);
    window.dispatchEvent(new Event('languageChange'));
  },

  getReports(): ReportItem[] {
    if (typeof window === 'undefined') return DEFAULT_REPORTS;
    try {
      const stored = localStorage.getItem('cag_reports');
      if (!stored || stored === 'undefined' || stored === 'null') {
        localStorage.setItem('cag_reports', JSON.stringify(DEFAULT_REPORTS));
        return DEFAULT_REPORTS;
      }
      const parsed = JSON.parse(stored);
      const featuredCount = Array.isArray(parsed) ? parsed.filter((r: any) => r.isFeatured).length : 0;
      if (!Array.isArray(parsed) || parsed.length === 0 || !parsed.some(r => r.label) || featuredCount !== 9) {
        localStorage.setItem('cag_reports', JSON.stringify(DEFAULT_REPORTS));
        return DEFAULT_REPORTS;
      }
      return parsed;
    } catch (e) {
      console.error('Error reading reports from localStorage:', e);
      return DEFAULT_REPORTS;
    }
  },

  saveReport(report: ReportItem) {
    if (typeof window === 'undefined') return;
    const reports = this.getReports();
    const idx = reports.findIndex(r => r.id === report.id);
    if (idx >= 0) {
      reports[idx] = report;
    } else {
      reports.push(report);
    }
    localStorage.setItem('cag_reports', JSON.stringify(reports));
  },

  deleteReport(id: string) {
    if (typeof window === 'undefined') return;
    const reports = this.getReports();
    const filtered = reports.filter(r => r.id !== id);
    localStorage.setItem('cag_reports', JSON.stringify(filtered));
  },

  getOffices(): Office[] {
    if (typeof window === 'undefined') return DEFAULT_OFFICES;
    try {
      const stored = localStorage.getItem('cag_offices');
      if (!stored || stored === 'undefined' || stored === 'null') {
        localStorage.setItem('cag_offices', JSON.stringify(DEFAULT_OFFICES));
        return DEFAULT_OFFICES;
      }
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed) || parsed.length !== 12) {
        localStorage.setItem('cag_offices', JSON.stringify(DEFAULT_OFFICES));
        return DEFAULT_OFFICES;
      }
      return parsed;
    } catch (e) {
      console.error('Error reading offices from localStorage:', e);
      return DEFAULT_OFFICES;
    }
  },

  saveOffice(office: Office) {
    if (typeof window === 'undefined') return;
    const offices = this.getOffices();
    const idx = offices.findIndex(o => o.id === office.id);
    if (idx >= 0) {
      offices[idx] = office;
    } else {
      offices.push(office);
    }
    localStorage.setItem('cag_offices', JSON.stringify(offices));
  },

  deleteOffice(id: string) {
    if (typeof window === 'undefined') return;
    const offices = this.getOffices();
    const filtered = offices.filter(o => o.id !== id);
    localStorage.setItem('cag_offices', JSON.stringify(filtered));
  },

  getNews(): NewsItem[] {
    if (typeof window === 'undefined') return DEFAULT_NEWS;
    try {
      const stored = localStorage.getItem('cag_news');
      if (!stored || stored === 'undefined' || stored === 'null') {
        localStorage.setItem('cag_news', JSON.stringify(DEFAULT_NEWS));
        return DEFAULT_NEWS;
      }
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        localStorage.setItem('cag_news', JSON.stringify(DEFAULT_NEWS));
        return DEFAULT_NEWS;
      }
      return parsed;
    } catch (e) {
      console.error('Error reading news from localStorage:', e);
      return DEFAULT_NEWS;
    }
  },

  saveNews(item: NewsItem) {
    if (typeof window === 'undefined') return;
    const news = this.getNews();
    const idx = news.findIndex(n => n.id === item.id);
    if (idx >= 0) {
      news[idx] = item;
    } else {
      news.push(item);
    }
    localStorage.setItem('cag_news', JSON.stringify(news));
  },

  deleteNews(id: string) {
    if (typeof window === 'undefined') return;
    const news = this.getNews();
    const filtered = news.filter(n => n.id !== id);
    localStorage.setItem('cag_news', JSON.stringify(filtered));
  }
};
