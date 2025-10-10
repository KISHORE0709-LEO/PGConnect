import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, query, where } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { college, gender, minPrice, maxPrice } = req.query;
      
      let pgQuery = collection(db, 'pg_listings');
      
      if (college) {
        pgQuery = query(pgQuery, where('nearestCollege', '==', college));
      }
      
      if (gender && gender !== 'all') {
        pgQuery = query(pgQuery, where('pgType', 'in', [gender, 'Any']));
      }
      
      const snapshot = await getDocs(pgQuery);
      let pgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Filter by price range if specified
      if (minPrice || maxPrice) {
        pgs = pgs.filter(pg => {
          const rent = pg.monthlyRent;
          if (minPrice && rent < parseInt(minPrice)) return false;
          if (maxPrice && rent > parseInt(maxPrice)) return false;
          return true;
        });
      }
      
      res.json({ pgs });
    } catch (error) {
      console.error('Error fetching PGs:', error);
      res.status(500).json({ error: 'Failed to fetch PGs' });
    }
  } else if (req.method === 'POST') {
    try {
      const { pgName, address, pgType, monthlyRent, amenities, nearestCollege } = req.body;
      
      const docRef = await addDoc(collection(db, 'pg_listings'), {
        pgName,
        address,
        pgType,
        monthlyRent: parseInt(monthlyRent),
        amenities: amenities.split(','),
        nearestCollege,
        availableNow: true,
        createdAt: new Date()
      });
      
      res.status(201).json({ message: 'PG added successfully', id: docRef.id });
    } catch (error) {
      console.error('Error adding PG:', error);
      res.status(500).json({ error: 'Failed to add PG' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}