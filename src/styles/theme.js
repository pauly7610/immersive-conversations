const createTheme = () => {
  const themeColors = {
    primary: {
      main: '#58cc02',
      hover: '#46a302'
    },
    secondary: {
      main: '#1cb0f6',
      hover: '#0095d8'
    },
    accent: {
      red: '#ff4b4b',
      redHover: '#e53e3e',
      yellow: '#ffc800',
      yellowHover: '#e6b400',
      purple: '#ce82ff',
      purpleHover: '#b85eff'
    },
    background: '#235390',
    light: {
      background: '#ffffff',
      text: '#4b4b4b'
    },
    dark: {
      background: 'hsl(222.2 84% 4.9%)',
      foreground: 'hsl(210 40% 98%)',
      card: 'hsl(222.2 84% 4.9%)',
      cardForeground: 'hsl(210 40% 98%)',
      popover: 'hsl(222.2 84% 4.9%)',
      popoverForeground: 'hsl(210 40% 98%)',
      muted: 'hsl(217.2 32.6% 17.5%)',
      mutedForeground: 'hsl(215 20.2% 65.1%)',
      border: 'hsl(217.2 32.6% 17.5%)',
      input: 'hsl(217.2 32.6% 17.5%)',
      ring: 'hsl(212.7 26.8% 83.9%)'
    },
    scenarios: {
      food: {
        main: '#58cc02',
        hover: '#46a302'
      },
      job: {
        main: '#ff4b4b',
        hover: '#e53e3e'
      },
      social: {
        main: '#ffc800',
        hover: '#e6b400'
      },
      travel: {
        main: '#ce82ff',
        hover: '#b85eff'
      }
    }
  };

  return {
    colors: themeColors,
    
    typography: {
      fontFamily: {
        sans: ['Arial', 'sans-serif']
      },
      fontSize: {
        base: '1rem',
        lg: '1.5rem'
      },
      fontWeight: {
        normal: '400',
        bold: '700'
      },
      lineHeight: {
        none: 1,
        tight: 1.25,
        snug: 1.375,
        normal: 1.5,
        relaxed: 1.625,
        loose: 2
      }
    },

    spacing: {
      2: '8px',
      3: '12px',
      4: '1rem',
      6: '1.5rem'
    },

    borderRadius: {
      none: '0',
      sm: '0.125rem',
      default: '4px',
      md: '0.75rem',
      lg: '1rem',
      xl: '0.75rem',
      full: '9999px'
    },

    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      default: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
      xl: '0 20px 25px rgba(0, 0, 0, 0.1)'
    },

    transitions: {
      default: '300ms ease-in-out'
    },

    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },

    container: {
      center: true,
      padding: '2rem',
      maxWidth: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
      }
    },

    // Global styles and mixins
    globalStyles: {
      scrollbar: `
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: ${themeColors.light.muted};
        }
        ::-webkit-scrollbar-thumb {
          background: ${themeColors.primary.main};
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: ${themeColors.primary.hover};
        }
      `
    }
  };
};

export const theme = createTheme(); 