import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import fs from 'fs';

const firebaseConfig = {
  apiKey: "AIzaSyA7b_qt0wkdMKHKTg28hjsPXQJLlZIi31I",
  authDomain: "pgconnect-9bc51.firebaseapp.com",
  projectId: "pgconnect-9bc51",
  storageBucket: "pgconnect-9bc51.firebasestorage.app",
  messagingSenderId: "667002551443",
  appId: "1:667002551443:web:22bb7244b4fb795a22a166"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function parseCSV(csvText) {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',');
  const data = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = values[index];
    });
    data.push(obj);
  }
  return data;
}

async function importAllData() {
  console.log('📊 Importing all data from CSV files...\n');

  // Import Users
  const usersCSV = fs.readFileSync('./data/users.csv', 'utf8');
  const users = parseCSV(usersCSV);
  for (const user of users) {
    await addDoc(collection(db, 'users'), {
      ...user,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    console.log(`✅ Added user: ${user.fullName}`);
  }

  // Import Colleges
  const collegesCSV = fs.readFileSync('./data/colleges.csv', 'utf8');
  const colleges = parseCSV(collegesCSV);
  for (const college of colleges) {
    await addDoc(collection(db, 'colleges'), {
      ...college,
      createdAt: new Date()
    });
    console.log(`✅ Added college: ${college.name}`);
  }

  // Import PG Listings
  const pgListingsCSV = fs.readFileSync('./data/pg_listings.csv', 'utf8');
  const pgListings = parseCSV(pgListingsCSV);
  for (const pg of pgListings) {
    await addDoc(collection(db, 'pg_listings'), {
      ...pg,
      totalRooms: parseInt(pg.totalRooms),
      monthlyRent: parseInt(pg.monthlyRent),
      distanceKm: parseFloat(pg.distanceKm),
      amenities: pg.amenities.split(','),
      smokingAllowed: pg.smokingAllowed === 'true',
      drinkingAllowed: pg.drinkingAllowed === 'true',
      availableNow: pg.availableNow === 'true',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    console.log(`✅ Added PG: ${pg.pgName}`);
  }

  console.log('\n🎉 All data imported successfully!');
}

importAllData().catch(console.error);