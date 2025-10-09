import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  fullName: string;
  email: string;
  username: string;
  phone: string;
  role: 'student' | 'owner';
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  showSuccessMessage: boolean;
  showPGSuccessMessage: boolean;
  login: (username: string, password: string) => boolean;
  register: (userData: User) => void;
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
    // Store user in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto login after registration
    setIsAuthenticated(true);
    setUser(userData);
    setShowSuccessMessage(true);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const login = (username: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u: User) => u.username === username);
    
    if (foundUser) {
      setIsAuthenticated(true);
      setUser(foundUser);
      setShowSuccessMessage(true);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      return true;
    }
    return false;
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
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
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