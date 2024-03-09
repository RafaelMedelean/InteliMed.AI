import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean; // Add an isLoading state to handle async operations
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

const authTokenKey = 'authToken'; // Define a key for storing the token in localStorage

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Initialize as true to handle initial loading

  useEffect(() => {
    const token = localStorage.getItem(authTokenKey);
    setIsAuthenticated(!!token); // Set isAuthenticated based on token presence
    setIsLoading(false); // Set loading to false after checking the token
  }, []);

  const login = (token: string) => {
    localStorage.setItem(authTokenKey, token); // Store the token in localStorage on login
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem(authTokenKey); // Remove the token from localStorage on logout
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
