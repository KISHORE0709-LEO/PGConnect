import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  showSuccessMessage: boolean;
  showPGSuccessMessage: boolean;
  login: () => void;
  logout: () => void;
  dismissSuccessMessage: () => void;
  setPGRegistrationSuccess: () => void;
  dismissPGSuccessMessage: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showPGSuccessMessage, setShowPGSuccessMessage] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
    setShowSuccessMessage(true);
  };
  const logout = () => setIsAuthenticated(false);
  const dismissSuccessMessage = () => setShowSuccessMessage(false);
  const setPGRegistrationSuccess = () => setShowPGSuccessMessage(true);
  const dismissPGSuccessMessage = () => setShowPGSuccessMessage(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, showSuccessMessage, showPGSuccessMessage, login, logout, dismissSuccessMessage, setPGRegistrationSuccess, dismissPGSuccessMessage }}>
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