'use server';

import { query } from '@/lib/db';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function deleteRecord(table: string, id: any, editBase: string) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    const h = await headers();
    const ip = h.get('x-forwarded-for') || '127.0.0.1';

    await query(`DELETE FROM cag_new.${table} WHERE id = $1`, [id]);

    // Log deletion
    await query(`
      INSERT INTO admin_audit_log (user_id, action, table_name, record_id, ip_address, created_at)
      VALUES ($1, $2, $3, $4, $5, NOW())
    `, [userId ? parseInt(userId) : null, 'DELETE', table, id, ip]);

    revalidatePath(editBase);
    return { success: true };
  } catch (err: any) {
    console.error('Delete error:', err);
    return { error: 'Cannot delete this record because it is referenced by other data.' };
  }
}
