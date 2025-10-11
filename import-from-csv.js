import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import fs from 'fs';
import * as XLSX from 'xlsx';

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

const xlsxFilePath = 'public/pg_list.xlsx';

const fileBuffer = fs.readFileSync(xlsxFilePath);
const workbook = XLSX.read(fileBuffer);
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const jsonData = XLSX.utils.sheet_to_json(worksheet);

async function importData() {
  const filteredData = jsonData.filter(row => row['PG Name'] && row['PG Name'].trim() !== ''); // Filter out empty rows

  console.log(`Found ${filteredData.length} PG entries to import.`);

  for (let index = 0; index < filteredData.length; index++) {
    const row = filteredData[index];
    const pgId = (index + 1).toString();
    const pgData = {
      name: row['PG Name'] || '',
      description: '',
      address: row.Location || '',
      city: 'Bangalore',
      pgType: row.Gender || 'any',
      totalRooms: 10,
      availableRooms: 5,
      monthlyRent: parseInt(row['Price (_/month)']?.split(' - ')[0]?.replace(/,/g, '') || 8500),
      nearestCollege: row.College || '',
      distance: parseFloat(row['Distance from NMIT']?.replace('~', '').replace(' km', '') || 0),
      rating: 4.5,
      amenities: row.Amenities ? row.Amenities.split(',').map(a => a.trim()) : ['WiFi'],
      sharing: row['Room Types'] || '2 Sharing',
      images: row.Images ? row.Images.split(',').map(img => img.trim()) : [],
      ownerId: 'imported',
      ownerName: 'PG Owner',
      ownerEmail: 'owner@example.com',
      createdAt: new Date().toISOString(),
      status: 'active'
    };

    try {
      const { setDoc, doc } = await import('firebase/firestore');
      await setDoc(doc(db, 'pgs', pgId), pgData);
      console.log(`Added: ${pgData.name} with ID: ${pgId}`);
    } catch (error) {
      console.error(`Error adding ${pgData.name}:`, error);
    }
  }

  console.log('Data import completed!');
}

importData().catch(console.error);
