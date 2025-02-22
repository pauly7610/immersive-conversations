import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${theme.typography.fontFamily.sans.join(', ')};
    background-color: ${theme.colors.light.background};
    color: ${theme.colors.light.foreground};
    line-height: ${theme.typography.lineHeight.normal};
  }

  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: ${theme.colors.light.muted};
  }
  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary.main};
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.primary.hover};
  }

  a {
    color: ${theme.colors.primary.main};
    text-decoration: none;
    transition: color ${theme.transitions.default};

    &:hover {
      color: ${theme.colors.primary.hover};
    }
  }

  button {
    font-family: inherit;
    cursor: pointer;
    transition: all ${theme.transitions.default};
  }

  input, textarea {
    font-family: inherit;
    border: 1px solid ${theme.colors.light.border};
    border-radius: ${theme.borderRadius.default};
    padding: ${theme.spacing[2]};
  }
`; 