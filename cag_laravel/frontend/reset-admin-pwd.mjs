import pg from 'pg';
import bcrypt from 'bcryptjs';
const { Client } = pg;

const client = new Client({
  host: '10.10.182.225',
  port: 5432,
  database: 'd_cag',
  user: 'dhar',
  password: 'dhar@123',
  ssl: false,
  connectionTimeoutMillis: 10000,
});

const newPassword = 'admin';

try {
  await client.connect();
  console.log('✅ Connected to PostgreSQL');

  const hash = await bcrypt.hash(newPassword, 12);
  console.log(`🔐 Generated hash for "${newPassword}":`, hash);

  const res = await client.query(`
    UPDATE cag_new.admin_users 
    SET password_hash = $1, is_active = true
    WHERE username = 'admin'
    RETURNING id, username, email
  `, [hash]);

  if (res.rows.length) {
    console.log('✨ Successfully updated admin user:', res.rows[0]);
  } else {
    // User does not exist, insert it
    const insRes = await client.query(`
      INSERT INTO cag_new.admin_users (username, password_hash, email, full_name, role, is_active, created_at)
      VALUES ('admin', $1, 'admin@cag.gov.in', 'CAG Admin Coordinator', 'super_admin', true, NOW())
      RETURNING id, username, email
    `, [hash]);
    console.log('✨ Successfully created new admin user:', insRes.rows[0]);
  }

  await client.end();
} catch (err) {
  console.error('❌ Error resetting password:', err.message);
  process.exit(1);
}
