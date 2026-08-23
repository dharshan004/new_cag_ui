import { Report, Office, Officer, FormerCAG, PageContent } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

function getMockData(path: string): any {
  if (path.startsWith('/api/presence')) {
    return [
      {
        id: 'st-1',
        state: 'Maharashtra',
        name: 'Office of the Accountant General (A&E) - I, Maharashtra',
        address: '101, Maharshi Karve Marg, New Marine Lines, Mumbai - 400020',
        phone: '+91-22-22039680',
        email: 'agaeMaharashtra1@cag.gov.in',
        lat: 18.9400,
        lng: 72.8200,
        type: 'state'
      },
      {
        id: 'st-2',
        state: 'Karnataka',
        name: 'Office of the Principal Accountant General (Audit) - I, Karnataka',
        address: 'Park House Road, Near Vidhana Soudha, Bengaluru - 560001',
        phone: '+91-80-22258410',
        email: 'agauKarnataka@cag.gov.in',
        lat: 12.9716,
        lng: 77.5946,
        type: 'state'
      },
      {
        id: 'st-3',
        state: 'Maharashtra',
        name: 'Office of the Principal Accountant General (Audit) - I, Maharashtra',
        address: 'Pratishtha Bhavan, 101 Maharshi Karve Marg, Mumbai - 400020',
        phone: '+91-22-22190500',
        email: 'agauMaharashtra1@cag.gov.in',
        lat: 18.9400,
        lng: 72.8200,
        type: 'state'
      },
      {
        id: 'st-4',
        state: 'Delhi',
        name: 'Office of the Accountant General (Audit), Delhi',
        address: 'AGCR Building, I.P. Estate, New Delhi - 110002',
        phone: '+91-11-23702280',
        email: 'agauDelhi@cag.gov.in',
        lat: 28.6139,
        lng: 77.2090,
        type: 'state'
      },
      {
        id: 'ce-1',
        state: 'Delhi',
        name: 'Director General of Audit (Defence Services), New Delhi',
        address: 'L-II Block, Brassey Avenue, Church Road, New Delhi - 110001',
        phone: '+91-11-23012270',
        email: 'dgadefencesdelhi@cag.gov.in',
        lat: 28.6139,
        lng: 77.2090,
        type: 'central'
      },
      {
        id: 'ce-2',
        state: 'Maharashtra',
        name: 'Principal Director of Audit (Central Railway), Mumbai',
        address: 'CST Terminus, Mumbai - 400001',
        phone: '+91-22-22621060',
        email: 'pdacentralrailway@cag.gov.in',
        lat: 18.9400,
        lng: 72.8200,
        type: 'central'
      },
      {
        id: 'ce-3',
        state: 'London',
        name: 'Office of the Director General of Audit, London',
        address: 'High Commission of India, India House, Aldwych, London WC2B 4NA',
        phone: '+44-20-78368484',
        email: 'dgaLondon@cag.gov.in',
        lat: 51.5074,
        lng: -0.1278,
        type: 'central'
      },
      {
        id: 'ce-4',
        state: 'Delhi',
        name: 'Director General of Audit (Central Receipts), New Delhi',
        address: 'AGCR Building, I.P. Estate, New Delhi - 110002',
        phone: '+91-11-23702280',
        email: 'dgacrDelhi@cag.gov.in',
        lat: 28.6139,
        lng: 77.2090,
        type: 'central'
      },
      {
        id: 'tr-1',
        state: 'Rajasthan',
        name: 'International Centre for Environment Audit and Sustainable Development (iCED)',
        address: 'Kant Kalwar, RIICO Industrial Area, NH-11C, Jaipur, Rajasthan - 303002',
        phone: '+91-141-2772000',
        email: 'iced@cag.gov.in',
        lat: 26.9124,
        lng: 75.7873,
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
        id: 'tr-3',
        state: 'Himachal Pradesh',
        name: 'National Academy of Audit & Accounts (NAAA)',
        address: 'Chaura Maidan, Shimla, Himachal Pradesh - 171004',
        phone: '+91-177-2652150',
        email: 'naaa@cag.gov.in',
        lat: 31.1048,
        lng: 77.1734,
        type: 'training'
      },
      {
        id: 'tr-4',
        state: 'West Bengal',
        name: 'International Centre for Audit of Local Governance (iCAL)',
        address: 'Salt Lake City, Kolkata - 700091',
        phone: '+91-33-23351230',
        email: 'ical@cag.gov.in',
        lat: 22.5726,
        lng: 88.3639,
        type: 'training'
      },
      {
        id: 'tr-5',
        state: 'Rajasthan',
        name: 'Regional Capacity Building Institute, Jaipur',
        address: 'Janpath, Lalkothi Scheme, Jaipur, Rajasthan - 302005',
        phone: '+91-141-2741510',
        email: 'rcbiJaipur@cag.gov.in',
        lat: 26.9124,
        lng: 75.7873,
        type: 'training'
      }
    ];
  }
  if (path.startsWith('/api/home')) {
    return {
      hero_title: 'Comptroller and Auditor General of India',
      hero_subtitle: 'Supreme Audit Institution of India',
      stats: [
        { label: 'Years of Excellence', value: '150+' },
        { label: 'Reports Tabled Annually', value: '700+' }
      ],
      cag_message: {
        name: 'Shri K. Sanjay Murthy',
        title: 'Comptroller and Auditor General of India',
        message: 'Welcome to the official portal of the Comptroller and Auditor General of India...'
      }
    };
  }
  if (path.startsWith('/api/reports')) {
    return {
      items: [
        {
          id: 'rep-1',
          title: 'Audit Report on Health Services and Polio Vaccination Administrations in Rural Districts',
          sector: 'Social Welfare',
          admin_level: 'States',
          report_type: 'Performance',
          published_date: '2026-06-04',
          file_url: '#'
        },
        {
          id: 'rep-2',
          title: 'Defence Audit Report on Border Security Procurement and Modernization Schemes',
          sector: 'Finance',
          admin_level: 'Union',
          report_type: 'Compliance',
          published_date: '2026-07-15',
          file_url: '#'
        }
      ],
      total: 2
    };
  }
  if (path.startsWith('/api/officers')) {
    return {
      id: '1',
      name: 'Shri K. Sanjay Murthy',
      designation: 'Comptroller & Auditor General of India',
      email: 'cagindia@cag.gov.in',
      phone: '+91-11-23235790',
      tier: 1,
      children: [
        {
          id: '2',
          name: 'Shri Vishvanath Singh Jadon',
          designation: 'Secretary to CAG',
          email: 'sec-cag@cag.gov.in',
          phone: '+91-11-23239843',
          tier: 2,
          children: []
        }
      ]
    };
  }
  if (path.startsWith('/api/pages/')) {
    const slug = path.split('/').pop() || '';
    return {
      id: 'page-' + slug,
      slug: slug,
      title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      content_html: `<p>Detailed content for ${slug} is rendered here dynamically.</p>`
    };
  }
  return null;
}

async function fetchJson<T>(path: string, options?: RequestInit): Promise<T | null> {
  const useMock = !process.env.NEXT_PUBLIC_API_URL;
  if (useMock) {
    const mock = getMockData(path);
    if (mock !== null) {
      return mock as T;
    }
  }

  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      cache: 'no-store',
      ...options,
    });
    if (!res.ok) {
      console.error(`API Error: ${res.status} ${res.statusText} on ${path}`);
      return getMockData(path) as T;
    }
    return await res.json() as T;
  } catch (error) {
    console.error(`Fetch error on ${path}:`, error);
    return getMockData(path) as T;
  }
}

export const api = {
  getHomeData: async () => {
    return fetchJson<{
      hero_title: string;
      hero_subtitle: string;
      stats: { label: string; value: string }[];
      cag_message: { name: string; title: string; message: string };
    }>('/api/home');
  },

  getReports: async (params: {
    page: number;
    level: string;
    sector: string;
    type: string;
    query: string;
  }) => {
    const queryParams = new URLSearchParams({
      page: params.page.toString(),
      level: params.level,
      sector: params.sector,
      type: params.type,
      query: params.query,
    });
    return fetchJson<{ items: Report[]; total: number }>(`/api/reports?${queryParams.toString()}`);
  },

  getPresence: async () => {
    return fetchJson<Office[]>('/api/presence');
  },

  getPageContent: async (slug: string) => {
    return fetchJson<PageContent>(`/api/pages/${slug}`);
  },

  getOfficers: async () => {
    return fetchJson<Officer>('/api/officers');
  },
};
