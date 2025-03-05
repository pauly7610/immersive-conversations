import { useState, useEffect } from 'react';

export const useNetworkStatus = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [error, setError] = useState(isOffline ? "You're offline. Some features may not work." : null);

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

  return { isOffline, error };
}; 