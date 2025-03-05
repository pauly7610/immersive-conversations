import { useState } from 'react';

export const useEventHandlers = () => {
  const [error, setError] = useState(null);

  const handleClick = async (callback) => {
    try {
      await callback();
    } catch (error) {
      console.error("Error in event handler:", error);
      setError(error.message);
    }
  };

  return { error, setError, handleClick };
}; 