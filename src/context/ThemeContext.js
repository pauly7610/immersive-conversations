import React, { createContext, useState, useContext, useMemo } from 'react';
import { theme as lightTheme } from '../styles/theme';

// Create a function to generate dark theme variations
const generateDarkTheme = (baseTheme) => {
  return {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      // Override with dark mode color variations
      light: baseTheme.colors.dark,
      dark: baseTheme.colors.light
    }
  };
};

export const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [themeMode, setThemeMode] = useState('light');
    
    // Memoize the theme to prevent unnecessary re-renders
    const theme = useMemo(() => {
        return themeMode === 'light' 
            ? lightTheme 
            : generateDarkTheme(lightTheme);
    }, [themeMode]);

    const toggleTheme = () => {
        setThemeMode((prevTheme) => 
            prevTheme === 'light' ? 'dark' : 'light'
        );
    };

    return (
        <ThemeContext.Provider value={{ 
            theme, 
            themeMode, 
            toggleTheme 
        }}>
            {children}
        </ThemeContext.Provider>
    );
}; 