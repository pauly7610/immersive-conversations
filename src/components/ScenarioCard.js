import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const Card = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing[4]};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: box-shadow ${({ theme }) => theme.transitions.default}, 
              transform ${({ theme }) => theme.transitions.default};
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
    transform: translateY(-2px);
  }
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.light.text};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  line-height: 1.3;
`;

const DurationText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.light.mutedForeground};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const StartButton = styled.button`
  width: 100%;
  background-color: ${({ type }) => {
    switch (type) {
      case 'food': return '#58cc02';
      case 'job': case 'work': return '#ff4b4b';
      case 'social': return '#ffc800';
      case 'travel': return '#ce82ff';
      default: return '#58cc02';
    }
  }};
  color: white;
  padding: ${({ theme }) => theme.spacing[3]};
  border-radius: 12px;
  font-weight: bold;
  border: none;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
  }
`;

const ScenarioCard = ({ 
  title, 
  type = 'food',
  duration,
  difficulty = 'Easy',
  onClick 
}) => {
  const { theme } = useTheme();

  return (
    <Card theme={theme}>
      <Title theme={theme}>{title}</Title>
      <DurationText theme={theme}>{duration}</DurationText>
      <StartButton 
        type={type}
        onClick={onClick}
        theme={theme}
      >
        Start
      </StartButton>
    </Card>
  );
};

export default ScenarioCard;