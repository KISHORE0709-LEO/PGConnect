import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import Papa from 'papaparse';

export const importPGDataFromFile = async (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: async (results) => {
        try {
          const jsonData = results.data.filter(row => Object.keys(row).length > 0); // Remove empty rows

          for (const row of jsonData) {
            const pgData = {
              name: row['PG Name'] || '',
              description: '',
              address: row.Location || '',
              city: 'Bangalore',
              pgType: row.Gender || 'any',
              totalRooms: 10,
              availableRooms: 5,
              monthlyRent: parseInt(row['Price (_/month)'] || 8500),
              nearestCollege: row.College || '',
              distance: parseFloat(row['Distance from NMIT'] || 0),
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

            await addDoc(collection(db, 'pgs'), pgData);
          }

          resolve({ success: true, count: jsonData.length });
        } catch (error) {
          resolve({ success: false, error: error.message });
        }
      },
      error: (error) => {
        resolve({ success: false, error: error.message });
      }
    });
  });
};
