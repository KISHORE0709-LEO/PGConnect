import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const pgData = [
  {
    college: "NMIT",
    pgName: "Serov House",
    location: "Yelahanka",
    gender: "Female",
    distance: "~5 km",
    roomTypes: ["Double", "Triple"],
    priceRange: "8,599 - 9,999",
    amenities: ["Food", "Wi-Fi", "Laundry"]
  },
  {
    college: "NMIT",
    pgName: "Albury House",
    location: "Yelahanka",
    gender: "Male",
    distance: "~5.5 km",
    roomTypes: ["Double", "Triple"],
    priceRange: "8,299 - 9,299",
    amenities: ["Food", "Wi-Fi", "Laundry"]
  },
  {
    college: "BMSIT",
    pgName: "Shanmuka PG",
    location: "Yelahanka",
    gender: "Male",
    distance: "~1 km",
    roomTypes: ["Single", "Double"],
    priceRange: "10,000 - 15,000",
    amenities: ["Food", "Wi-Fi", "Laundry"]
  },
  {
    college: "RNSIT",
    pgName: "S V PG For Men",
    location: "Rajarajeshwari Nagar",
    gender: "Female",
    distance: "~2 km",
    roomTypes: ["Single", "Double", "Triple"],
    priceRange: "8,599 - 9,999",
    amenities: ["Meals", "Wi-Fi", "Laundry"]
  },
  {
    college: "GITAM",
    pgName: "SLN Grand PG",
    location: "Bala Nagar, Hyderabad",
    gender: "Male",
    distance: "~6.5 km",
    roomTypes: ["Single", "Double", "Triple"],
    priceRange: "11,000 - 13,000",
    amenities: ["Meals", "Wi-Fi", "Laundry"]
  }
];

export const importPGData = async () => {
  try {
    const pgsCollection = collection(db, 'pgs');
    
    for (const pg of pgData) {
      await addDoc(pgsCollection, {
        ...pg,
        createdAt: new Date(),
        isActive: true
      });
    }
    
    console.log('PG data imported successfully!');
  } catch (error) {
    console.error('Error importing PG data:', error);
  }
};