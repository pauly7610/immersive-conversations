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
        lg: '1.5rem',
        xl: '1.75rem'
      },
      fontWeight: {
        normal: '400',
        semibold: '600',
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
      1: '4px',
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

const BASE_URL = process.env.PUBLIC_URL || ''; 

const ChartContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.light.background};
  padding: ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.borderRadius.default};
`; 

const renderMessage = useCallback((message) => {
  // Rendering logic
}, [dependencies]); 

const generateAIResponse = async (userMessage) => {
  const requestId = Date.now();
  setCurrentRequestId(requestId);
  
  // API call
  
  // Only update if this is still the most recent request
  if (requestId === currentRequestId) {
    setMessages(prevMessages => [...prevMessages, { text: response, isUser: false }]);
  }
}; 

const handleClick = async () => {
  try {
    // Event handler code
  } catch (error) {
    console.error("Error in event handler:", error);
    setError(error.message);
  }
}; 

useEffect(() => {
  const handleOffline = () => {
    setIsOffline(true);
    setError("You're offline. Some features may not work.");
  };
  
  const handleOnline = () => {
    setIsOffline(false);
    setError(null);
  };
  
  window.addEventListener('offline', handleOffline);
  window.addEventListener('online', handleOnline);
  
  return () => {
    window.removeEventListener('offline', handleOffline);
    window.removeEventListener('online', handleOnline);
  };
}, []); 

const [errors, setErrors] = useState({});

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setUserInfo({ ...userInfo, [name]: value });
  
  if (name === 'email' && !validateEmail(value)) {
    setErrors(prev => ({ ...prev, email: 'Please enter a valid email' }));
  } else {
    setErrors(prev => ({ ...prev, [name]: null }));
  }
}; 

const ResponsiveGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`; 

// Create a simple i18n utility
const translations = {
  en: {
    userProfile: 'User Profile',
    // other translations
  },
  es: {
    userProfile: 'Perfil de Usuario',
    // other translations
  }
};

const t = (key) => {
  const language = localStorage.getItem('language') || 'en';
  return translations[language][key] || key;
};

// Then use
<h2>{t('userProfile')}</h2> 

const trackEvent = (eventName, properties = {}) => {
  // In a real app, send to your analytics service
  console.log(`[Analytics] ${eventName}`, properties);
  
  // Example integration with Google Analytics
  if (window.gtag) {
    window.gtag('event', eventName, properties);
  }
};

// Usage
<button onClick={() => {
  trackEvent('scenario_selected', { id: scenario.id, title: scenario.title });
  handleScenarioSelect(scenario);
}}>
  Start
</button> 

// For primary buttons, ensure text color has sufficient contrast with background
const PrimaryButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: #ffffff; // Ensure this has good contrast with the background
`; 

// Add focus styles
const FocusableButton = styled.button`
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary.main};
    outline-offset: 2px;
  }
`;

// Manage focus programmatically when needed
useEffect(() => {
  if (isModalOpen && modalRef.current) {
    modalRef.current.focus();
  }
}, [isModalOpen]); 