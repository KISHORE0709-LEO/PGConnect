import dotenv from 'dotenv';
import { pool } from './src/config/database.js';

dotenv.config();

const viewData = async () => {
  try {
    console.log('📊 Database Tables and Data:\n');
    
    // Check if tables exist
    const tablesResult = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log('📋 Available Tables:');
    tablesResult.rows.forEach(row => console.log(`  - ${row.table_name}`));
    console.log('');
    
    // View users table
    const usersResult = await pool.query('SELECT id, email, name, phone, role, created_at FROM users ORDER BY created_at DESC');
    console.log('👥 Users Table:');
    if (usersResult.rows.length === 0) {
      console.log('  No users found');
    } else {
      console.table(usersResult.rows);
    }
    console.log('');
    
    // View PGs table
    const pgsResult = await pool.query('SELECT id, name, city, owner_id, total_rooms, available_rooms, rent_amount, contact_phone, contact_email, created_at FROM pgs ORDER BY created_at DESC');
    console.log('🏠 PGs Table:');
    if (pgsResult.rows.length === 0) {
      console.log('  No PGs found');
    } else {
      console.table(pgsResult.rows);
    }
    console.log('');
    
    // View rooms table
    const roomsResult = await pool.query('SELECT id, pg_id, room_number, room_type, sharing_type, rent_amount, is_occupied FROM rooms ORDER BY pg_id, room_number');
    console.log('🛏️ Rooms Table:');
    if (roomsResult.rows.length === 0) {
      console.log('  No rooms found');
    } else {
      console.table(roomsResult.rows);
    }
    
  } catch (error) {
    console.error('❌ Error viewing data:', error.message);
  } finally {
    process.exit(0);
  }
};

viewData();