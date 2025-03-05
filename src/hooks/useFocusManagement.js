import { useEffect } from 'react';

export const useFocusManagement = (isOpen, ref) => {
  useEffect(() => {
    if (isOpen && ref.current) {
      ref.current.focus();
    }
  }, [isOpen, ref]);
}; 