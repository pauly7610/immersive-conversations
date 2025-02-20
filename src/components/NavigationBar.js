import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: #58cc02;
  padding: 10px;
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  justify-content: space-around;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin: 0 10px;
`;

const StyledLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-weight: bold;

  &.active {
    text-decoration: underline;
  }
`;

const NavigationBar = () => {
  return (
    <Nav>
      <NavList>
        <NavItem>
          <StyledLink to="/" exact activeClassName="active">
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