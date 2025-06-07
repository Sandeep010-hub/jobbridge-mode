
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  type: 'student' | 'recruiter';
  avatar?: string;
  bio?: string;
  followers?: number;
  following?: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, type: 'student' | 'recruiter') => Promise<void>;
  register: (email: string, password: string, name: string, type: 'student' | 'recruiter') => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing session
    const savedUser = localStorage.getItem('jobbridge_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, type: 'student' | 'recruiter') => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      type,
      avatar: `https://images.unsplash.com/photo-1472396961693-142e6e269027?w=150&h=150&fit=crop&crop=face`,
      bio: type === 'student' ? 'Full-stack developer passionate about AI and web technologies' : 'Tech recruiter looking for exceptional talent',
      followers: Math.floor(Math.random() * 1000),
      following: Math.floor(Math.random() * 500),
    };
    
    setUser(mockUser);
    localStorage.setItem('jobbridge_user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const register = async (email: string, password: string, name: string, type: 'student' | 'recruiter') => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '1',
      email,
      name,
      type,
      avatar: `https://images.unsplash.com/photo-1472396961693-142e6e269027?w=150&h=150&fit=crop&crop=face`,
      bio: type === 'student' ? 'New developer ready to showcase my projects' : 'Recruiter seeking fresh talent',
      followers: 0,
      following: 0,
    };
    
    setUser(mockUser);
    localStorage.setItem('jobbridge_user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('jobbridge_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
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
