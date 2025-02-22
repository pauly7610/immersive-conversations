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
      text: '#4b4b4b',
      muted: '#f0f0f0',
      border: '#e0e0e0'
    },
    dark: {
      background: '#1a1a1a',
      text: '#f5f5f5'
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
    spacing: [0, 4, 8, 16, 32, 64],
    borderRadius: {
      default: '4px',
      xl: '12px'
    },
    typography: {
      fontFamily: {
        sans: ['Arial', 'sans-serif']
      },
      fontSize: {
        base: '16px',
        lg: '18px'
      },
      fontWeight: {
        bold: 700
      }
    },
    shadows: {
      sm: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    transitions: {
      default: '0.2s ease'
    },
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    },
    container: {
      maxWidth: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px'
      }
    }
  };
};

export const theme = createTheme(); 