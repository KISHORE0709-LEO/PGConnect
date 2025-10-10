import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import * as XLSX from 'xlsx';

export const importPGDataFromFile = async (file) => {
  try {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    for (const row of jsonData) {
      const pgData = {
        name: row.name || row.pg_name || row['PG Name'] || '',
        description: row.description || row.desc || '',
        address: row.address || row.location || '',
        city: row.city || 'Bangalore',
        pgType: row.pgType || row.gender || row.type || 'any',
        totalRooms: parseInt(row.totalRooms || row.total_rooms || row.rooms || 10),
        availableRooms: parseInt(row.availableRooms || row.available_rooms || 5),
        monthlyRent: parseInt(row.monthlyRent || row.rent || row.price || 8500),
        nearestCollege: row.nearestCollege || row.college || '',
        distance: parseFloat(row.distance || 0),
        rating: parseFloat(row.rating || 4.5),
        amenities: row.amenities ? row.amenities.split(',').map(a => a.trim()) : ['WiFi'],
        sharing: row.sharing || row.sharingType || '2 Sharing',
        images: row.images ? row.images.split(',').map(img => img.trim()) : [],
        ownerId: 'imported',
        ownerName: row.ownerName || row.owner || 'PG Owner',
        ownerEmail: row.ownerEmail || 'owner@example.com',
        createdAt: new Date().toISOString(),
        status: 'active'
      };

      await addDoc(collection(db, 'pgs'), pgData);
    }

    return { success: true, count: jsonData.length };
  } catch (error) {
    return { success: false, error: error.message };
  }
};