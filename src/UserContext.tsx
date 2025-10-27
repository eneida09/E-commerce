// UserContext.tsx
import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface User {
  lastname: ReactNode;
  firstname: ReactNode;
  id?: number;
  username?: string;
  email?: string;
  name: { firstname: string; lastname: string };
  phone?: string;
  address?: any;
  role?: "admin" | "user"; 
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  isAdmin: () => boolean; 
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const logout = () => {
    localStorage.removeItem("userData");
    setUser(null);
  };

//check user or admin
  const isAdmin = () => user?.role === "admin";

  return (
    <UserContext.Provider value={{ user, setUser, logout, isAdmin }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
