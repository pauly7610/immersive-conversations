import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import { FaHome, FaUser, FaChartLine, FaTrophy } from 'react-icons/fa';

const Nav = styled.nav`
  background-color: ${({ theme }) => theme.colors.primary.main};
  padding: ${({ theme }) => theme.spacing[3]};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  justify-content: space-around;
  padding: 0;
  margin: 0;
  max-width: ${({ theme }) => theme.container.maxWidth.lg};
  margin: 0 auto;
`;

const NavItem = styled.li`
  margin: 0 ${({ theme }) => theme.spacing[2]};
`;

const StyledLink = styled(NavLink)`
  color: ${({ theme }) => theme.colors.light.background};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  padding: ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  transition: background-color ${({ theme }) => theme.transitions.default};

  &.active {
    text-decoration: underline;
    background-color: rgba(255, 255, 255, 0.1);
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  &:focus {
    outline: 2px solid white;
    outline-offset: 2px;
  }
`;

const AppLogo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const NavigationBar = () => {
  const { theme } = useTheme();

  return (
    <Nav theme={theme} role="navigation" aria-label="Main Navigation">
      <AppLogo>Immersive Conversations</AppLogo>
      <NavList theme={theme}>
        <NavItem theme={theme}>
          <StyledLink 
            to="/" 
            theme={theme}
            aria-label="Navigate to home page"
          >
            <FaHome /> <span>Home</span>
          </StyledLink>
        </NavItem>
        <NavItem theme={theme}>
          <StyledLink to="/profile" theme={theme}>
            <FaUser /> <span>Profile</span>
          </StyledLink>
        </NavItem>
        <NavItem theme={theme}>
          <StyledLink to="/progress" theme={theme}>
            <FaChartLine /> <span>Progress</span>
          </StyledLink>
        </NavItem>
        <NavItem theme={theme}>
          <StyledLink to="/leaderboard" theme={theme}>
            <FaTrophy /> <span>Leaderboard</span>
          </StyledLink>
        </NavItem>
      </NavList>
    </Nav>
  );
};

export default NavigationBar; 