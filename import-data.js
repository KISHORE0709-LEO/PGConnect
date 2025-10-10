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

const csvData = `College,PG Name,Location,Gender,Distance from NMIT,Room Types,Price (_/month),Amenities,Images
NMIT,Serov House,Yelahanka,Female,~5 km,"Double, Triple","8,599 - 9,999","Food, Wi-Fi, Laundry",
NMIT,Albury House,Yelahanka,Male,~5.5 km,"Double, Triple","8,299 - 9,299","Food, Wi-Fi, Laundry",
BMSIT,Shanmuka PG,Yelahanka,Male,~1 km,"Single,Double","10,000 - 15,000","Food, Wi-Fi, Laundry",
RNSIT,S V PG For Men,Rajarajeshwari Nagar,Female,~2 km,"Single,Double,Triple","8,599 - 9,999","Meals, Wi-Fi, Laundry",
GITAM,SLN Grand PG,"Bala Nagar, Hyderabad",Male,~6.5 km,"Single,Double,Triple","11,000 - 13,000","Meals, Wi-Fi, Laundry"`;

async function importData() {
  const lines = csvData.trim().split('\n');
  const headers = lines[0].split(',');
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    if (values[0] && values[1]) { // Skip empty rows
      const pgData = {
        college: values[0],
        pgName: values[1],
        location: values[2],
        gender: values[3],
        distance: values[4],
        roomTypes: values[5].replace(/"/g, '').split(',').map(s => s.trim()),
        priceRange: values[6].replace(/"/g, ''),
        amenities: values[7].replace(/"/g, '').split(',').map(s => s.trim()),
        createdAt: new Date(),
        isActive: true
      };
      
      await addDoc(collection(db, 'pgs'), pgData);
      console.log(`Added: ${pgData.pgName}`);
    }
  }
  console.log('Data import completed!');
}

importData().catch(console.error);