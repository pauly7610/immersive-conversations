// Email validation utility
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Simple i18n utility
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

export const t = (key) => {
  const language = typeof localStorage !== 'undefined' ? localStorage.getItem('language') || 'en' : 'en';
  return translations[language]?.[key] || key;
};

// Analytics tracking utility
export const trackEvent = (eventName, properties = {}) => {
  // In a real app, send to your analytics service
  console.log(`[Analytics] ${eventName}`, properties);
  
  // Example integration with Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties);
  }
}; 