import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

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

async function setupDatabase() {
  console.log('🔧 Setting up database collections...\n');

  // 1. Users collection
  await addDoc(collection(db, 'users'), {
    fullName: "Demo Student",
    email: "student@example.com",
    username: "demo_student",
    phoneNumber: "+91-9876543210",
    role: "student",
    createdAt: new Date(),
    updatedAt: new Date()
  });

  await addDoc(collection(db, 'users'), {
    fullName: "Demo Owner",
    email: "owner@example.com",
    username: "demo_owner",
    phoneNumber: "+91-9876543211",
    role: "owner",
    createdAt: new Date(),
    updatedAt: new Date()
  });

  // 2. Colleges collection
  await addDoc(collection(db, 'colleges'), {
    name: "NMIT",
    fullName: "Nitte Meenakshi Institute of Technology",
    address: "Yelahanka, Bangalore",
    createdAt: new Date()
  });

  await addDoc(collection(db, 'colleges'), {
    name: "BMSIT",
    fullName: "BMS Institute of Technology",
    address: "Avalahalli, Bangalore",
    createdAt: new Date()
  });

  // 3. PG Listings (enhanced structure)
  await addDoc(collection(db, 'pg_listings'), {
    ownerId: "demo_owner_id",
    pgName: "Serov House",
    address: "Yelahanka, Near NMIT College",
    pgType: "Female",
    description: "Safe and secure PG for female students",
    totalRooms: 20,
    monthlyRent: 9000,
    nearestCollegeId: "nmit_id",
    distanceKm: 5.0,
    amenities: ["Food", "Wi-Fi", "Laundry", "Security"],
    rules: "No smoking, No drinking, Gate closes at 10 PM",
    gateOpenTime: "06:00",
    gateCloseTime: "22:00",
    smokingAllowed: false,
    drinkingAllowed: false,
    availableNow: true,
    createdAt: new Date(),
    updatedAt: new Date()
  });

  // 4. Bookings collection
  await addDoc(collection(db, 'bookings'), {
    userId: "demo_student_id",
    pgId: "demo_pg_id",
    bookingDate: new Date(),
    checkInDate: new Date(),
    status: "confirmed",
    monthlyRent: 9000,
    securityDeposit: 18000,
    createdAt: new Date()
  });

  // 5. PG Images collection
  await addDoc(collection(db, 'pg_images'), {
    pgId: "demo_pg_id",
    imageUrl: "/images/pg1.jpg",
    imageType: "exterior",
    uploadedAt: new Date()
  });

  // 6. Reviews collection
  await addDoc(collection(db, 'reviews'), {
    userId: "demo_student_id",
    pgId: "demo_pg_id",
    rating: 4,
    comment: "Great place to stay, good facilities",
    createdAt: new Date()
  });

  // 7. Payments collection
  await addDoc(collection(db, 'payments'), {
    userId: "demo_student_id",
    pgId: "demo_pg_id",
    amount: 9000,
    paymentDate: new Date(),
    paymentMethod: "online",
    status: "completed",
    transactionId: "TXN123456789"
  });

  console.log('✅ Database setup completed!');
  console.log('\n📊 Collections created:');
  console.log('- users (authentication & profiles)');
  console.log('- colleges (college information)');
  console.log('- pg_listings (PG properties)');
  console.log('- bookings (student bookings)');
  console.log('- pg_images (property images)');
  console.log('- reviews (student reviews)');
  console.log('- payments (payment records)');
}

setupDatabase().catch(console.error);