import { AssociadoType } from "@/types/AssociadoType";
import React, { createContext, useContext, useState, ReactNode } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  login: (_userID: string, _userName: string, _associado?: AssociadoType) => void;
  logout: () => void;
  userID: string | null;
  userName?: string | null;
  associado?: AssociadoType; // Placeholder for AssociadoType
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [associado, setAssociado] = useState<AssociadoType>(); // Placeholder for AssociadoType

  const login = (_userID: string,
    _userName?: string,
    _associado?: AssociadoType
  ) => {
    console.log("login");
    setIsLoggedIn(true);
    setUserID(_userID || null);
    setUserName(_userName || _userID || null);
    setAssociado(_associado);
  };

  const logout = () => {
    console.log("logout");
    setIsLoggedIn(false);
    setUserID(null);
    setUserName(null);
    setAssociado(undefined); // Reset associado on logout
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userID, userName, associado }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
