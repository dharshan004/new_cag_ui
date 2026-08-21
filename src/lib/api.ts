import { Report, Office, Officer, FormerCAG, PageContent } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

async function fetchJson<T>(path: string, options?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      cache: 'no-store',
      ...options,
    });
    if (!res.ok) {
      console.error(`API Error: ${res.status} ${res.statusText} on ${path}`);
      return null;
    }
    return await res.json() as T;
  } catch (error) {
    console.error(`Fetch error on ${path}:`, error);
    return null;
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
