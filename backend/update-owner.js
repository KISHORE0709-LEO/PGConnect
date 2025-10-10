import dotenv from 'dotenv';
import { pool } from './src/config/database.js';

dotenv.config();

const updateOwner = async () => {
  try {
    console.log('🔄 Updating PG owner to real owner...\n');
    
    // Update MM Boys PG to be owned by kishore (user ID 3)
    await pool.query(`
      UPDATE pgs 
      SET owner_id = 3,
          contact_phone = '07845420588',
          contact_email = '1nt23cb027.kishore@nmit.ac.in'
      WHERE id = 1
    `);
    
    console.log('✅ Updated MM Boys PG owner to kishore');
    
    // Show updated data
    const result = await pool.query(`
      SELECT p.id, p.name, p.rent_amount, p.contact_phone, p.contact_email,
             u.name as owner_name, u.email as owner_email
      FROM pgs p
      JOIN users u ON p.owner_id = u.id
    `);
    
    console.log('📊 Updated PG details:');
    console.table(result.rows);
    
  } catch (error) {
    console.error('❌ Error updating owner:', error);
  } finally {
    process.exit(0);
  }
};

updateOwner();