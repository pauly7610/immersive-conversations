import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.light.background};
  font-size: 1.2rem;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing[2]};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color ${({ theme }) => theme.transitions.default};
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const ThemeToggle = () => {
  const { themeMode, toggleTheme } = useTheme();
  
  return (
    <ToggleButton onClick={toggleTheme} aria-label="Toggle theme">
      {themeMode === 'light' ? '🌙' : '☀️'}
    </ToggleButton>
  );
};

export default ThemeToggle; 