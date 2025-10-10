import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Papa from 'papaparse';
import fs from 'fs';

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
const storage = getStorage(app);

const csvFilePath = 'Copy of pg_list(1).csv';

const fileContent = fs.readFileSync(csvFilePath, 'utf8');

async function uploadBase64Image(base64Data, fileName) {
  try {
    // Remove the data:image/jpeg;base64, part
    const base64 = base64Data.split(',')[1];
    const buffer = Buffer.from(base64, 'base64');

    const storageRef = ref(storage, `pg-images/${fileName}`);
    const snapshot = await uploadBytes(storageRef, buffer, {
      contentType: 'image/jpeg'
    });
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
}

Papa.parse(fileContent, {
  header: true,
  complete: async (results) => {
    try {
      const jsonData = results.data.filter(row => Object.keys(row).length > 0 && row['PG Name'] && row['PG Name'].trim() !== ''); // Remove empty rows

      console.log(`Found ${jsonData.length} PG entries to import.`);

      for (const row of jsonData) {
        let imageUrls = [];
        if (row.Images) {
          if (row.Images.startsWith('data:image')) {
            // Base64 image, upload to storage
            const fileName = `${row['PG Name'].replace(/\s+/g, '_')}_${Date.now()}.jpg`;
            const uploadedUrl = await uploadBase64Image(row.Images, fileName);
            if (uploadedUrl) {
              imageUrls = [uploadedUrl];
            }
          } else {
            // Assume it's a URL
            imageUrls = [row.Images.trim()];
          }
        }

        const pgData = {
          name: row['PG Name'] || '',
          description: '',
          address: row.Location || '',
          city: 'Bangalore',
          pgType: row.Gender || 'any',
          totalRooms: 10,
          availableRooms: 5,
          monthlyRent: parseInt(row['Price (_/month)']?.split(' - ')[0]?.replace(/,/g, '') || 8500),
          nearestCollege: row.College || '',
          distance: parseFloat(row.DistanceFromCollege?.replace('~', '').replace(' km', '') || 0),
          rating: 4.5,
          amenities: row.Amenities ? row.Amenities.split(',').map(a => a.trim()) : ['WiFi'],
          sharing: row['Room Types'] || '2 Sharing',
          images: imageUrls,
          ownerId: 'imported',
          ownerName: 'PG Owner',
          ownerEmail: 'owner@example.com',
          createdAt: new Date().toISOString(),
          status: 'active'
        };

        try {
          await addDoc(collection(db, 'pgs'), pgData);
          console.log(`Added: ${pgData.name}`);
        } catch (error) {
          console.error(`Error adding ${pgData.name}:`, error);
        }
      }

      console.log('Data import completed!');
    } catch (error) {
      console.error('Error during import:', error);
    }
  },
  error: (error) => {
    console.error('Error parsing CSV:', error);
  }
});
