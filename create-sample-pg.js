import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

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

async function createSamplePG() {
  const pgData = {
    name: "Sample PG for Testing",
    description: "A comfortable PG with all modern amenities",
    address: "123 Test Street, Bangalore",
    city: "Bangalore",
    pgType: "any",
    totalRooms: 12,
    availableRooms: 8,
    monthlyRent: 12000,
    nearestCollege: "NMIT",
    distance: 2.5,
    rating: 4.5,
    amenities: ["WiFi", "AC", "Food Included", "Laundry", "CCTV"],
    sharing: "Triple Sharing",
    images: [],
    ownerId: "test-owner",
    ownerName: "Test Owner",
    ownerEmail: "owner@test.com",
    createdAt: new Date().toISOString(),
    status: "active",
    availability: "open",
    gateOpening: "6:00 AM",
    gateClosing: "10:00 PM",
    smokingAllowed: false,
    drinkingAllowed: false
  };

  try {
    await setDoc(doc(db, 'pgs', '1'), pgData);
    console.log('Sample PG created with ID: 1');
  } catch (error) {
    console.error('Error creating sample PG:', error);
  }
}

createSamplePG();