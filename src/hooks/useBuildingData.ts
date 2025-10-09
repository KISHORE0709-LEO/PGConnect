import { useState, useEffect } from 'react';

interface Occupant {
  name: string;
  email: string;
  phone?: string;
  rentPaid: boolean;
}

interface Room {
  roomNo: string;
  occupants: Occupant[];
}

interface Floor {
  floorNo: number;
  rooms: Room[];
}

interface BuildingData {
  floors: Floor[];
}

// Mock data generator for demo
const generateMockBuildingData = (floors: any[]): BuildingData => {
  const mockNames = ['Rajesh', 'Sneha', 'Amit', 'Priya', 'Vikram', 'Kavya', 'Rohit', 'Anita'];
  const mockEmails = ['raj@example.com', 'sneha@example.com', 'amit@example.com', 'priya@example.com'];
  
  return {
    floors: floors.map(floor => ({
      floorNo: floor.number,
      rooms: floor.rooms.map((room: any) => ({
        roomNo: room.number,
        occupants: Array.from({ length: Math.floor(Math.random() * room.sharing) + (Math.random() > 0.3 ? 1 : 0) }, (_, i) => ({
          name: mockNames[Math.floor(Math.random() * mockNames.length)],
          email: mockEmails[Math.floor(Math.random() * mockEmails.length)],
          phone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
          rentPaid: Math.random() > 0.4
        }))
      }))
    }))
  };
};

export const useBuildingData = (buildingId: string, floors: any[]) => {
  const [buildingData, setBuildingData] = useState<BuildingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBuildingData = async () => {
      try {
        setLoading(true);
        
        // In real app, this would be:
        // const response = await fetch(`/api/buildings/${buildingId}`);
        // const data = await response.json();
        
        // For demo, generate mock data
        const mockData = generateMockBuildingData(floors);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setBuildingData(mockData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch building data');
        setBuildingData(null);
      } finally {
        setLoading(false);
      }
    };

    if (floors && floors.length > 0) {
      fetchBuildingData();
    } else {
      setBuildingData(null);
      setLoading(false);
    }
  }, [buildingId, floors]);

  return { buildingData, loading, error };
};