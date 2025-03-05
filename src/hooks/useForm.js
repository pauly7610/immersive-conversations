import { useState } from 'react';
import { validateEmail } from '../utils/helpers';

export const useForm = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    
    // Validate email fields
    if (name === 'email' && !validateEmail(value)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email' }));
    } else {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  return { values, errors, handleInputChange, setValues, setErrors };
}; 