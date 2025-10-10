import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';

export interface PGData {
  id: string;
  college: string;
  pgName: string;
  location: string;
  gender: string;
  distance: string;
  roomTypes: string[];
  priceRange: string;
  amenities: string[];
}

export const usePGData = (college?: string) => {
  const [pgs, setPGs] = useState<PGData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPGs = async () => {
      try {
        const pgsRef = collection(db, 'pgs');
        const q = college ? query(pgsRef, where('college', '==', college)) : pgsRef;
        const snapshot = await getDocs(q);
        
        const pgData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as PGData[];
        
        setPGs(pgData);
      } catch (error) {
        console.error('Error fetching PGs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPGs();
  }, [college]);

  return { pgs, loading };
};