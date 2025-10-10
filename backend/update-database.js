import dotenv from 'dotenv';
import { pool } from './src/config/database.js';

dotenv.config();

const updateDatabase = async () => {
  try {
    console.log('🔄 Updating database schema...');
    
    // Add rent_amount column if it doesn't exist
    await pool.query(`
      ALTER TABLE pgs 
      ADD COLUMN IF NOT EXISTS rent_amount DECIMAL(10, 2) DEFAULT 0
    `);
    
    console.log('✅ Added rent_amount column');
    
    // Check current table structure
    const result = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'pgs' 
      ORDER BY ordinal_position
    `);
    
    console.log('📋 Current PGs table structure:');
    result.rows.forEach(row => {
      console.log(`  - ${row.column_name}: ${row.data_type}`);
    });
    
    // Update existing PGs with default rent if null
    await pool.query(`
      UPDATE pgs 
      SET rent_amount = 8500 
      WHERE rent_amount IS NULL OR rent_amount = 0
    `);
    
    console.log('✅ Updated existing PGs with default rent');
    
    // Show current data
    const pgsResult = await pool.query('SELECT id, name, rent_amount, contact_phone, contact_email FROM pgs');
    console.log('📊 Current PGs data:');
    console.table(pgsResult.rows);
    
  } catch (error) {
    console.error('❌ Error updating database:', error);
  } finally {
    process.exit(0);
  }
};

updateDatabase();