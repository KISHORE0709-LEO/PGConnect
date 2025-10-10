import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

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

async function viewDatabase() {
  console.log('📊 PGConnect Database Contents:\n');
  
  const collections = ['users', 'colleges', 'pgs', 'pg_listings', 'bookings', 'pg_images', 'reviews', 'payments'];
  
  for (const collectionName of collections) {
    try {
      const snapshot = await getDocs(collection(db, collectionName));
      console.log(`📋 ${collectionName} (${snapshot.size} documents)`);
      
      if (snapshot.size > 0) {
        snapshot.forEach(doc => {
          const data = doc.data();
          if (collectionName === 'users') {
            console.log(`  - ${data.fullName} (${data.role})`);
          } else if (collectionName === 'colleges') {
            console.log(`  - ${data.name}: ${data.fullName}`);
          } else if (collectionName === 'pgs' || collectionName === 'pg_listings') {
            console.log(`  - ${data.pgName}`);
          } else {
            console.log(`  - Document ID: ${doc.id}`);
          }
        });
      }
      console.log('');
    } catch (error) {
      console.log(`❌ ${collectionName}: Collection doesn't exist yet`);
    }
  }
}

viewDatabase().catch(console.error);