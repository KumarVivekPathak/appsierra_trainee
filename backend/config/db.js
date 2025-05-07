import pkg from 'pg';
import 'dotenv/config';

const { Pool } = pkg;

console.log("DB_HOST",process.env.DB_HOST);
console.log("DB_USER",process.env.DB_USER);
console.log("DB_PASSWORD",process.env.DB_PASSWORD);
console.log("DB_NAME",process.env.DB_NAME);
console.log("DB_PORT",process.env.DB_PORT);

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('connect', () => {

  console.log('Database connection established Here');
});

// Handle pool errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// export { pool, testConnection };
// export default { pool, initDb, testConnection };
export default  pool;