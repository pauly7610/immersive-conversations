import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const StyledButton = styled.button`
  background-color: ${({ variant, theme }) => 
    variant === 'primary' ? theme.colors.primary.main : 
    variant === 'secondary' ? theme.colors.secondary.main :
    variant === 'danger' ? theme.colors.accent.red :
    theme.colors.light.muted};
  color: ${({ variant }) => 
    variant === 'primary' || variant === 'secondary' || variant === 'danger' 
      ? 'white' 
      : 'inherit'};
  padding: ${({ size, theme }) => 
    size === 'sm' ? `${theme.spacing[1]} ${theme.spacing[2]}` :
    size === 'lg' ? `${theme.spacing[3]} ${theme.spacing[4]}` :
    `${theme.spacing[2]} ${theme.spacing[3]}`};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.default};
  
  &:hover {
    background-color: ${({ variant, theme }) => 
      variant === 'primary' ? theme.colors.primary.hover : 
      variant === 'secondary' ? theme.colors.secondary.hover :
      variant === 'danger' ? theme.colors.accent.redHover :
      theme.colors.light.border};
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.light.muted};
    cursor: not-allowed;
  }
`;

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  ...props 
}) => {
  const { theme } = useTheme();
  
  return (
    <StyledButton 
      variant={variant} 
      size={size} 
      theme={theme} 
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button; 