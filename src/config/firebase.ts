import { getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyA7b_qt0wkdMKHKTg28hjsPXQJLlZIi31I",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "pgconnect-9bc51.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "pgconnect-9bc51",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "pgconnect-9bc51.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "667002551443",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:667002551443:web:22bb7244b4fb795a22a166",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-XY0QK390D7"
};

// Initialize Firebase
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;
