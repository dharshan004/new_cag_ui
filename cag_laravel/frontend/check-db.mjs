import pg from 'pg';
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

const TABLES = [
  'admin_users','admin_audit_log','audit_reports','audit_report_files',
  'banners','circulars','contact_submissions','events','faqs','former_cags',
  'government_types','journal_articles','journal_issues','media_gallery',
  'news','notifications','offices','org_designations','org_officers','pages',
  'public_consultations','publications','quick_links','recruitment_notices',
  'state_accounts','states','tenders'
];

try {
  await client.connect();
  console.log('✅ Connected\n');

  for (const table of TABLES) {
    const res = await client.query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_schema = 'cag_new' AND table_name = $1
      ORDER BY ordinal_position
    `, [table]);
    if (res.rows.length) {
      console.log(`\n=== ${table} ===`);
      res.rows.forEach(r => console.log(`  ${r.column_name}: ${r.data_type}${r.is_nullable==='NO'?' NOT NULL':''}`));
    }
  }

  // Sample rows from admin_users
  const usersRes = await client.query('SELECT * FROM cag_new.admin_users LIMIT 3');
  console.log('\n=== admin_users sample ===', usersRes.rows);

  await client.end();
} catch (err) {
  console.error('❌ Error:', err.message);
  process.exit(1);
}
