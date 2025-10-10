import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('currentUser');
  };
  
  const dismissSuccessMessage = () => setShowSuccessMessage(false);
  const setPGRegistrationSuccess = () => setShowPGSuccessMessage(true);
  const dismissPGSuccessMessage = () => setShowPGSuccessMessage(false);

  // Check for existing session on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      const userData = JSON.parse(savedUser);
      setIsAuthenticated(true);
      setUser(userData);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
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