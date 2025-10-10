import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
<<<<<<< HEAD
import Papa from 'papaparse';

export const importPGDataFromFile = async (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: async (results) => {
        try {
          const jsonData = results.data.filter(row => Object.keys(row).length > 0); // Remove empty rows
=======
import ExcelJS from 'exceljs';

export const importPGDataFromFile = async (file) => {
  try {
    const workbook = new ExcelJS.Workbook();
    const buffer = await file.arrayBuffer();
    await workbook.xlsx.load(buffer);
    const worksheet = workbook.worksheets[0];
    const jsonData = [];
    
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // Skip header row
      const rowData = {};
      row.eachCell((cell, colNumber) => {
        const header = worksheet.getRow(1).getCell(colNumber).value;
        rowData[header] = cell.value;
      });
      jsonData.push(rowData);
    });
>>>>>>> ce9f727a983b282483d6b4856ac15efa33556fc8

          for (const row of jsonData) {
            const pgData = {
              name: row.PGName || '',
              description: '',
              address: row.Location || '',
              city: 'Bangalore',
              pgType: row.Gender || 'any',
              totalRooms: 10,
              availableRooms: 5,
              monthlyRent: parseInt(row['Price (_/month)'] || 8500),
              nearestCollege: row.College || '',
              distance: parseFloat(row.DistanceFromCollege || 0),
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
