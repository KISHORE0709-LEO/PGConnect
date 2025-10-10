import dotenv from 'dotenv';
import { pool } from './src/config/database.js';

dotenv.config();

const fixContactDetails = async () => {
  try {
    console.log('🔧 Fixing contact details...\n');
    
    // Get all PGs with their owners
    const result = await pool.query(`
      SELECT p.id, p.name, p.owner_id, p.contact_phone, p.contact_email,
             u.name as owner_name, u.phone as owner_phone, u.email as owner_email
      FROM pgs p
      JOIN users u ON p.owner_id = u.id
    `);
    
    console.log('📋 Current PGs and their owners:');
    result.rows.forEach(row => {
      console.log(`PG: ${row.name}`);
      console.log(`  Current contact: ${row.contact_phone} | ${row.contact_email}`);
      console.log(`  Owner: ${row.owner_name}`);
      console.log(`  Owner contact: ${row.owner_phone} | ${row.owner_email}`);
      console.log('');
    });
    
    // Update all PGs to use their owner's contact details
    for (const pg of result.rows) {
      await pool.query(`
        UPDATE pgs 
        SET contact_phone = $1, contact_email = $2
        WHERE id = $3
      `, [pg.owner_phone, pg.owner_email, pg.id]);
      
      console.log(`✅ Updated ${pg.name} contact details`);
    }
    
    // Show updated data
    const updatedResult = await pool.query(`
      SELECT p.id, p.name, p.contact_phone, p.contact_email,
             u.name as owner_name
      FROM pgs p
      JOIN users u ON p.owner_id = u.id
    `);
    
    console.log('\n📊 Updated PGs:');
    console.table(updatedResult.rows);
    
  } catch (error) {
    console.error('❌ Error fixing contact details:', error);
  } finally {
    process.exit(0);
  }
};

fixContactDetails();