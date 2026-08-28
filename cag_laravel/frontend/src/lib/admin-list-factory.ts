import { query } from '@/lib/db';
import AdminHeader from '@/Components/admin/AdminHeader';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import { Pencil, Trash2, Plus, Eye, Search, ChevronLeft, ChevronRight } from 'lucide-react';

// ─── Generic List Page Factory ────────────────────────────────────────────────
// Each module page is a thin wrapper around this shared implementation.

interface ListPageConfig {
  title: string;
  table: string;
  schema?: string;
  searchCol: string;
  addHref: string;
  editHref: (id: any) => string;
  viewHref?: (id: any) => string;
  deleteTable?: string;
  columns: { key: string; label: string; render?: (row: any) => React.ReactNode }[];
}

export async function renderListPage(
  config: ListPageConfig,
  page: number,
  search: string
) {
  const schema = config.schema || 'cag_new';
  const fullTable = `${schema}.${config.table}`;
  const deleteTable = config.deleteTable ? `${schema}.${config.deleteTable}` : fullTable;

  const offset = (page - 1) * 20;
  const whereClause = search ? `WHERE ${config.searchCol} ILIKE $1` : '';
  const params = search ? [`%${search}%`] : [];

  const [rows, countRows] = await Promise.all([
    query<any>(`SELECT * FROM ${fullTable} ${whereClause} ORDER BY id DESC LIMIT 20 OFFSET ${offset}`, params),
    query<{ count: string }>(`SELECT COUNT(*) as count FROM ${fullTable} ${whereClause}`, params)
  ]);

  const total = parseInt(countRows[0]?.count || '0');
  const totalPages = Math.ceil(total / 20);

  return { rows, total, totalPages };
}
