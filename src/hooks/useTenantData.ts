import { useState, useEffect } from 'react';
import { db } from '@/config/firebase';
import { collection, getDocs } from 'firebase/firestore';

interface Occupant {
  name: string;
  email: string;
  phone?: string;
  rentPaid: boolean;
}

interface Room {
  roomNo: string;
  floorNo?: number;
  occupants: Occupant[];
}

interface Floor {
  floorNo: number;
  rooms: Room[];
}

interface BuildingData {
  floors: Floor[];
}

export const useTenantData = (pgId: string | undefined, refreshTrigger?: number) => {
  const [buildingData, setBuildingData] = useState<BuildingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pgId) {
      setLoading(false);
      return;
    }

    const fetchTenantData = async () => {
      try {
        setLoading(true);
        setError(null);

        const roomsRef = collection(db, 'pgs', pgId, 'rooms');
        const roomsSnapshot = await getDocs(roomsRef);

        const rooms: Room[] = roomsSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            roomNo: data.roomNo,
            floorNo: data.floorNo,
            occupants: data.occupants?.map((occ: any) => ({
              name: occ.name,
              email: occ.email,
              phone: occ.phone,
              rentPaid: occ.rentStatus || false,
            })) || [],
          };
        });

        const floorsMap = new Map<number, Room[]>();
        rooms.forEach(room => {
          const floorNo = room.floorNo || 1;
          if (!floorsMap.has(floorNo)) {
            floorsMap.set(floorNo, []);
          }
          floorsMap.get(floorNo)!.push(room);
        });

        const floors: Floor[] = Array.from(floorsMap.entries()).map(([floorNo, rooms]) => ({
          floorNo,
          rooms,
        })).sort((a, b) => b.floorNo - a.floorNo);

        setBuildingData({ floors });
      } catch (err) {
        console.error('Error fetching tenant data:', err);
        setError('Failed to load tenant data');
      } finally {
        setLoading(false);
      }
    };

    fetchTenantData();
  }, [pgId, refreshTrigger]);

  return { buildingData, loading, error };
};
