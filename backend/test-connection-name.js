import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Try with connection name
const pool = new Pool({
  host: '/cloudsql/pgconnect-backend:asia-south1:pgconnect-db',
  database: 'pgconnect',
  user: 'postgres',
  password: 'Kishore@07',
});

console.log('Testing with connection name...');

pool.connect()
  .then(client => {
    console.log('✅ Connected with connection name!');
    client.release();
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Connection name failed:', error.message);
    
    // Try with public IP and different SSL settings
    const pool2 = new Pool({
      host: '34.14.136.64',
      port: 5432,
      database: 'pgconnect',
      user: 'postgres',
      password: 'Kishore@07',
      ssl: false, // Try without SSL
    });
    
    console.log('Trying without SSL...');
    return pool2.connect();
  })
  .then(client => {
    if (client) {
      console.log('✅ Connected without SSL!');
      client.release();
    }
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ All connection attempts failed:', error.message);
    process.exit(1);
  });