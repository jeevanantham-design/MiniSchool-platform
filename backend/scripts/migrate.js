const fs = require('fs/promises');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;

if (!connectionString) {
  console.error('DATABASE_URL or DIRECT_URL is required to run migrations.');
  process.exit(1);
}

const pool = new Pool({
  connectionString,
  ssl: connectionString.includes('sslmode=require') || process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: false }
    : undefined,
});

async function migrate() {
  const sql = await fs.readFile(path.join(__dirname, '..', 'migrations', '001_initial_schema.sql'), 'utf8');
  await pool.query(sql);
  console.log('Database migration completed.');
}

migrate()
  .catch((error) => {
    console.error('Database migration failed:', error.message);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
