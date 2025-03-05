const createTheme = () => {
  return {
    colors: {
      primary: {
        main: '#58cc02',
        hover: '#46a302',
        light: '#d7ffb8',
        dark: '#2b8000'
      },
      secondary: {
        main: '#1cb0f6',
        hover: '#0095d9',
        light: '#c0e6fd',
        dark: '#0076ad'
      },
      accent: {
        yellow: '#ffc800',
        yellowHover: '#e6b400',
        red: '#ff4b4b',
        redHover: '#e53e3e',
        purple: '#ce82ff',
        purpleHover: '#b85eff'
      },
      light: {
        background: '#ffffff',
        foreground: '#333333',
        text: '#4b4b4b',
        mutedForeground: '#6a6a6a',
        muted: '#f5f5f5',
        border: '#e0e0e0',
        card: '#ffffff',
        cardForeground: '#333333',
        popover: '#ffffff',
        popoverForeground: '#333333',
        input: '#ffffff',
        ring: '#e0e0e0'
      },
      dark: {
        background: '#333333',
        foreground: '#ffffff',
        text: '#f5f5f5',
        mutedForeground: '#a0a0a0',
        muted: '#444444',
        border: '#555555',
        card: '#444444',
        cardForeground: '#ffffff',
        popover: '#444444',
        popoverForeground: '#ffffff',
        input: '#444444',
        ring: '#666666'
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
    },
    typography: {
      fontFamily: {
        sans: [
          'DIN Round Pro',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif'
        ],
        serif: ['Georgia', 'Times New Roman', 'serif'],
        mono: ['Menlo', 'Monaco', 'Consolas', 'monospace']
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem'
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800
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
      0: '0',
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      8: '2rem',
      10: '2.5rem',
      12: '3rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      32: '8rem',
      40: '10rem',
      48: '12rem',
      56: '14rem',
      64: '16rem'
    },
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      default: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      '2xl': '1rem',
      '3xl': '1.5rem',
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
      default: '0.3s ease',
      fast: '0.15s ease',
      slow: '0.5s ease'
    },
    container: {
      maxWidth: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px'
      }
    },
    breakpoints: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    }
  };
};

export const theme = createTheme();
export const BASE_URL = process.env.PUBLIC_URL || ''; 