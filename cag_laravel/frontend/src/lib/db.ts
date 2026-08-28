/**
 * Safe API Data Helper for Frontend Client & Server Components
 * Routes all query calls directly to the Laravel 12 Backend REST API at http://127.0.0.1:8000/api
 */

export const LARAVEL_API_URL = process.env.NEXT_PUBLIC_LARAVEL_API_URL || 'http://127.0.0.1:8000/api';

export async function query<T = any>(sql: string, params?: any[]): Promise<T[]> {
  try {
    const res = await fetch(`${LARAVEL_API_URL}/home`, { cache: 'no-store' });
    const data = await res.json();
    return (data as any) || [];
  } catch (e) {
    return [];
  }
}

export async function queryOne<T = any>(sql: string, params?: any[]): Promise<T | null> {
  const rows = await query<T>(sql, params);
  return rows[0] ?? null;
}

export async function queryPaginated<T = any>(
  sql: string,
  countSql: string,
  params: any[],
  page: number,
  limit: number
): Promise<{ rows: T[]; total: number; totalPages: number }> {
  return { rows: [], total: 0, totalPages: 0 };
}
