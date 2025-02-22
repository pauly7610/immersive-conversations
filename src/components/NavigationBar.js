import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const Nav = styled.nav`
  background-color: ${({ theme }) => theme.colors.primary.main};
  padding: ${({ theme }) => theme.spacing[3]};
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  justify-content: space-around;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin: 0 ${({ theme }) => theme.spacing[2]};
`;

const StyledLink = styled(NavLink)`
  color: ${({ theme }) => theme.colors.light.background};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};

  &.active {
    text-decoration: underline;
  }
`;

const NavigationBar = () => {
  const { theme } = useTheme();

  return (
    <Nav theme={theme} role="navigation" aria-label="Main Navigation">
      <NavList theme={theme}>
        <NavItem>
          <StyledLink to="/" exact activeClassName="active" tabIndex="0">
            Home
          </StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink to="/profile" activeClassName="active">
            Profile
          </StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink to="/progress" activeClassName="active">
            Progress
          </StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink to="/leaderboard" activeClassName="active">
            Leaderboard
          </StyledLink>
        </NavItem>
      </NavList>
    </Nav>
  );
};

export default NavigationBar; 