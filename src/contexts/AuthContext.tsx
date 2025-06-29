import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '@/services/api';

interface User {
  id: string;
  email: string;
  name: string;
  type: 'student' | 'recruiter';
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  skills?: string[];
  githubUsername?: string;
  followers?: number;
  following?: number;
  isPublic?: boolean;
  autoSyncProjects?: boolean;
  company?: string;
  jobTitle?: string;
  aiSummary?: string;
  isVerified?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, type: 'student' | 'recruiter') => Promise<void>;
  register: (email: string, password: string, name: string, type: 'student' | 'recruiter') => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  isLoading: boolean;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(localStorage.getItem('jobbridge_token'));

  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem('jobbridge_token');
      const savedUser = localStorage.getItem('jobbridge_user');
      
      if (savedToken && savedUser) {
        try {
          setToken(savedToken);
          // Verify token is still valid by fetching current user
          const response = await authAPI.getCurrentUser();
          setUser(response.data.user);
        } catch (error) {
          console.error('Token validation failed:', error);
          localStorage.removeItem('jobbridge_token');
          localStorage.removeItem('jobbridge_user');
          setToken(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string, type: 'student' | 'recruiter') => {
    setIsLoading(true);
    try {
      const response = await authAPI.login({ email, password, type });
      const { token: newToken, user: userData } = response.data;
      
      setToken(newToken);
      setUser(userData);
      localStorage.setItem('jobbridge_token', newToken);
      localStorage.setItem('jobbridge_user', JSON.stringify(userData));
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string, type: 'student' | 'recruiter') => {
    setIsLoading(true);
    try {
      const response = await authAPI.register({ email, password, name, type });
      const { token: newToken, user: userData } = response.data;
      
      setToken(newToken);
      setUser(userData);
      localStorage.setItem('jobbridge_token', newToken);
      localStorage.setItem('jobbridge_user', JSON.stringify(userData));
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('jobbridge_token');
    localStorage.removeItem('jobbridge_user');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('jobbridge_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      updateUser,
      isLoading, 
      token 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}