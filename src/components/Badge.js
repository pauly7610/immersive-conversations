import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const BadgeContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.primary.main};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  padding: ${({ theme }) => theme.spacing[3]};
  margin: ${({ theme }) => theme.spacing[2]} 0;
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
  margin-right: ${({ theme }) => theme.spacing[2]};
  width: 30px;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.primary.main};
  margin: 0;
`;

const Badge = ({ title, description, icon }) => {
  const { theme } = useTheme();

  return (
    <BadgeContainer theme={theme}>
      {icon && <Icon src={icon} alt={`${title} icon`} theme={theme} />}
      <div>
        <Title theme={theme}>{title}</Title>
        <p>{description}</p>
      </div>
    </BadgeContainer>
  );
};

export default Badge; 