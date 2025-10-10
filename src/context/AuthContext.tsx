import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User as FirebaseUser, signOut, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { auth } from '../config/firebase';
import { getUserProfile } from '../lib/firebase';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'student' | 'owner';
  created_at?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  showSuccessMessage: boolean;
  showPGSuccessMessage: boolean;
  login: (email: string, password: string) => boolean;
  register: (userData: User) => void;
  setAuthenticatedUser: (userData: any) => void;
  logout: () => void;
  dismissSuccessMessage: () => void;
  setPGRegistrationSuccess: () => void;
  dismissPGSuccessMessage: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showPGSuccessMessage, setShowPGSuccessMessage] = useState(false);

  const register = (userData: User) => {
    // This is now handled by the Auth component
    // Just update the context state
    setIsAuthenticated(true);
    setUser(userData);
    setShowSuccessMessage(true);
  };

  const login = (email: string, password: string) => {
    // This is now handled by the Auth component
    // Just return true for compatibility
    return true;
  };

  const setAuthenticatedUser = (userData: any) => {
    setIsAuthenticated(true);
    setUser(userData);
    setShowSuccessMessage(true);
  };
  
  const logout = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
      setUser(null);
      localStorage.clear();
    } catch (error) {
      console.error('Error signing out:', error);
      setIsAuthenticated(false);
      setUser(null);
      localStorage.clear();
    }
  };
  
  const dismissSuccessMessage = () => setShowSuccessMessage(false);
  const setPGRegistrationSuccess = () => setShowPGSuccessMessage(true);
  const dismissPGSuccessMessage = () => setShowPGSuccessMessage(false);

  // Set Firebase auth to session persistence only
  useEffect(() => {
    setPersistence(auth, browserSessionPersistence);
  }, []);

  // Check for Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const userProfile = await getUserProfile(firebaseUser.uid);
        if (userProfile) {
          setIsAuthenticated(true);
          setUser({
            id: parseInt(firebaseUser.uid.slice(-6), 16),
            name: userProfile.name || firebaseUser.displayName || '',
            email: firebaseUser.email || '',
            phone: userProfile.phone || '',
            role: userProfile.role || 'student'
          });
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.clear();
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Clear any stale authentication data on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      loading,
      showSuccessMessage, 
      showPGSuccessMessage, 
      login, 
      register, 
      setAuthenticatedUser,
      logout, 
      dismissSuccessMessage, 
      setPGRegistrationSuccess, 
      dismissPGSuccessMessage 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};