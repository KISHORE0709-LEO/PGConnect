import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: { rejectUnauthorized: false },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

export const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log('Connected to PostgreSQL database');
    client.release();
    
    // Create tables if they don't exist
    await createTables();
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};

const createTables = async () => {
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      phone VARCHAR(20),
      role VARCHAR(20) DEFAULT 'student',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const createPGsTable = `
    CREATE TABLE IF NOT EXISTS pgs (
      id SERIAL PRIMARY KEY,
      owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      address TEXT NOT NULL,
      city VARCHAR(100) NOT NULL,
      state VARCHAR(100) NOT NULL,
      pincode VARCHAR(10) NOT NULL,
      latitude DECIMAL(10, 8),
      longitude DECIMAL(11, 8),
      total_rooms INTEGER DEFAULT 0,
      available_rooms INTEGER DEFAULT 0,
      rent_amount DECIMAL(10, 2) DEFAULT 0,
      amenities TEXT[],
      rules TEXT[],
      images TEXT[],
      contact_phone VARCHAR(20),
      contact_email VARCHAR(255),
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const createRoomsTable = `
    CREATE TABLE IF NOT EXISTS rooms (
      id SERIAL PRIMARY KEY,
      pg_id INTEGER REFERENCES pgs(id) ON DELETE CASCADE,
      room_number VARCHAR(50) NOT NULL,
      room_type VARCHAR(50) NOT NULL,
      sharing_type VARCHAR(20) NOT NULL,
      rent_amount DECIMAL(10, 2) NOT NULL,
      security_deposit DECIMAL(10, 2),
      is_occupied BOOLEAN DEFAULT false,
      amenities TEXT[],
      images TEXT[],
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(createUsersTable);
    await pool.query(createPGsTable);
    await pool.query(createRoomsTable);
    console.log('Database tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
};

export { pool };