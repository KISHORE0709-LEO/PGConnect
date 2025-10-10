import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  User
} from "firebase/auth";
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where 
} from "firebase/firestore";
import { auth, db } from "../config/firebase";

// Auth functions
export const loginUser = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const registerUser = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const logoutUser = async () => {
  return await signOut(auth);
};

// User profile functions
export const createUserProfile = async (user: User, additionalData: any) => {
  const userRef = doc(db, 'users', user.uid);
  const userDoc = await getDoc(userRef);
  
  if (!userDoc.exists()) {
    const { email } = user;
    const createdAt = new Date();
    
    await setDoc(userRef, {
      email,
      phoneNumber: additionalData.phone,
      createdAt,
      updatedAt: createdAt,
      ...additionalData
    });
  }
  
  return userRef;
};

export const getUserProfile = async (userId: string) => {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  return userDoc.exists() ? userDoc.data() : null;
};

// PG data functions
export const getPGsByCollege = async (college: string) => {
  const pgsRef = collection(db, 'pgs');
  const q = query(pgsRef, where('college', '==', college));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const getAllPGs = async () => {
  const pgsRef = collection(db, 'pgs');
  const querySnapshot = await getDocs(pgsRef);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};