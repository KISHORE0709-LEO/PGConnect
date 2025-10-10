import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc } from 'firebase/firestore';

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

async function cleanupDatabase() {
  console.log('🧹 Cleaning up redundant pgs collection...\n');
  
  const pgsSnapshot = await getDocs(collection(db, 'pgs'));
  
  for (const doc of pgsSnapshot.docs) {
    await deleteDoc(doc.ref);
    console.log(`Deleted: ${doc.data().pgName}`);
  }
  
  console.log('\n✅ Cleanup completed! Use pg_listings collection only.');
}

cleanupDatabase().catch(console.error);