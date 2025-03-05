import React, { createContext, useState, useContext, useMemo } from 'react';
import { theme as lightTheme } from '../styles/theme';

// Create a function to generate dark theme variations
const generateDarkTheme = (baseTheme) => {
  return {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: {
        ...baseTheme.colors.primary,
        main: '#7dd633', // Brighter green for dark mode
        hover: '#8ee644'
      },
      secondary: {
        ...baseTheme.colors.secondary,
        main: '#3cc8ff',
        hover: '#5ad4ff'
      },
      light: {
        background: '#333', // From design document
        foreground: '#fff', // From design document
        text: '#fff',
        mutedForeground: '#aaa',
        muted: '#444',
        border: '#555',
        card: '#444',
        cardForeground: '#fff',
        popover: '#444',
        popoverForeground: '#fff',
        input: '#444',
        ring: '#666'
      },
      dark: baseTheme.colors.light,
      scenarios: {
        ...baseTheme.colors.scenarios,
        food: {
          main: '#7dd633',
          hover: '#8ee644'
        },
        job: {
          main: '#ff6b6b',
          hover: '#ff8a8a'
        },
        social: {
          main: '#ffe066',
          hover: '#fff099'
        },
        travel: {
          main: '#e9a6ff',
          hover: '#f0c4ff'
        }
      }
    },
    shadows: {
      ...baseTheme.shadows,
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
      default: '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.2)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
      lg: '0 10px 15px rgba(0, 0, 0, 0.4)',
      xl: '0 20px 25px rgba(0, 0, 0, 0.4)'
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