import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const ExampleContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.light.background};
  color: ${({ theme }) => theme.colors.light.foreground};
  padding: ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  transition: background-color ${({ theme }) => theme.transitions.default};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing[2]};
  }
`;

const ExampleButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.light.background};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.default};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.hover};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.light.muted};
  }
`;

const ExampleComponent = () => {
  const { theme } = useTheme();

  return (
    <ExampleContainer theme={theme}>
      <h2>Example Component</h2>
      <ExampleButton theme={theme}>Click Me</ExampleButton>
    </ExampleContainer>
  );
};

export default ExampleComponent; 