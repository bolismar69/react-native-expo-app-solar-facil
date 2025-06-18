// src/context/AppThemeContext.tsx
import { darkTheme } from "@/styles/darkTheme";
import { lightTheme } from "@/styles/lightTheme";
import { AppThemeStyles } from "@/types/ThemeTypes";
import React, { createContext, ReactNode, useContext, useState } from "react";

const AppThemeContext = createContext<{
  theme: AppThemeStyles;
  toggleTheme: () => void;
} | null>(null);

export const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <AppThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </AppThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const context = useContext(AppThemeContext);
  if (!context) {
    throw new Error("useAppTheme must be used within an AppThemeProvider");
  }
  return context;
};
