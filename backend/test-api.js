import dotenv from 'dotenv';

dotenv.config();

const testAPI = async () => {
  try {
    console.log('🧪 Testing API endpoints...\n');
    
    // Test GET /api/pgs
    console.log('📋 Testing GET /api/pgs');
    const response = await fetch('http://localhost:8080/api/pgs');
    
    if (response.ok) {
      const pgs = await response.json();
      console.log('✅ API working! Found PGs:');
      pgs.forEach(pg => {
        console.log(`  - ${pg.name}: ₹${pg.rent_amount}/month`);
        console.log(`    Contact: ${pg.contact_phone} | ${pg.contact_email}`);
        console.log(`    Address: ${pg.address}`);
        console.log('');
      });
    } else {
      console.log('❌ API not working:', response.status);
    }
    
    // Test GET /api/pgs/1
    console.log('📋 Testing GET /api/pgs/1');
    const detailResponse = await fetch('http://localhost:8080/api/pgs/1');
    
    if (detailResponse.ok) {
      const pgDetail = await detailResponse.json();
      console.log('✅ PG Details API working!');
      console.log(`  Name: ${pgDetail.name}`);
      console.log(`  Rent: ₹${pgDetail.rent_amount}`);
      console.log(`  Owner: ${pgDetail.owner_name || 'N/A'}`);
      console.log(`  Phone: ${pgDetail.contact_phone}`);
    } else {
      console.log('❌ PG Details API not working:', detailResponse.status);
    }
    
  } catch (error) {
    console.error('❌ Error testing API:', error.message);
    console.log('\n💡 Make sure backend server is running: npm run dev');
  }
};

testAPI();