import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: number;
  email: string;
  full_name: string;
  role: 'user' | 'admin' | 'superadmin';
  department?: string;
  position?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  full_name: string;
  department?: string;
  position?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_API = 'https://functions.poehali.dev/b438a7ab-6531-4658-9ce9-0e90e4b0eb1e';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('asubt_token');
    const savedUser = localStorage.getItem('asubt_user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch(`${AUTH_API}?action=login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }

    const data = await response.json();
    setToken(data.token);
    setUser(data.user);
    
    localStorage.setItem('asubt_token', data.token);
    localStorage.setItem('asubt_user', JSON.stringify(data.user));
  };

  const register = async (registerData: RegisterData) => {
    const response = await fetch(`${AUTH_API}?action=register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Registration failed');
    }

    const data = await response.json();
    setToken(data.token);
    setUser(data.user);
    
    localStorage.setItem('asubt_token', data.token);
    localStorage.setItem('asubt_user', JSON.stringify(data.user));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('asubt_token');
    localStorage.removeItem('asubt_user');
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin' || user?.role === 'superadmin',
    isSuperAdmin: user?.role === 'superadmin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
