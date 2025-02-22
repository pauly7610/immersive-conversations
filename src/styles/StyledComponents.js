import styled, { keyframes } from 'styled-components';

export const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

export const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const Container = styled.div`
  max-width: ${({ theme }) => theme.container.maxWidth.lg};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[4]}px;
  background-color: ${({ theme }) => theme.colors.light.background};
  color: ${({ theme }) => theme.colors.light.text};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans.join(', ')};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing[4]};
  }
`;

export const TranscriptContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

export const MessageBubble = styled.div`
  background-color: ${({ isUser, theme }) => 
    isUser ? theme.colors.secondary.main : theme.colors.light.muted};
  color: ${({ isUser, theme }) => 
    isUser ? theme.colors.light.background : theme.colors.light.foreground};
  padding: ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  margin: ${({ theme }) => theme.spacing[2]} 0;
  animation: ${fadeIn} 0.5s ease-in-out;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

export const InputBox = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing[2]};
  border: 1px solid ${({ theme }) => theme.colors.light.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  margin-right: ${({ theme }) => theme.spacing[2]};
`;

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.light.background};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.default};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.hover};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.light.muted};
  }
`;

export const RecordButton = styled.button`
  padding: 10px 20px;
  background-color: #ff5722;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
`;

export const EndButton = styled.button`
  padding: 10px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export const CategoryRibbon = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: ${({ theme }) => theme.spacing[4]}px;
`;

export const RibbonButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  &.active {
    font-weight: bold;
  }
`;

export const RatingContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
`;

export const StarButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${({ active }) => (active ? '#FFD700' : '#ccc')};
  transition: color 0.2s;

  &:hover {
    color: #FFD700;
  }
`;

// Define ScenarioCarousel if needed
export const ScenarioCarousel = styled.div`
  // Add your styles here
`;

export const ScenarioCard = styled.div`
  background: ${({ theme }) => theme.colors.light.background};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing[4]};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

export const ScenarioTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.light.text};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

export const DurationText = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.light.mutedForeground};
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

export const DifficultyBadge = styled.span`
  color: ${({ type }) => {
    switch (type) {
      case 'food': return '#58cc02';
      case 'job': case 'work': return '#ff4b4b';
      case 'social': return '#ffc800';
      case 'travel': return '#ce82ff';
      default: return '#58cc02';
    }
  }};
  font-size: 14px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

export const StartButton = styled.button`
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
  border-radius: 9999px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  border: 2px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.15);
  transition: all ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(1px);
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
    background-color: ${({ type }) => {
      switch (type) {
        case 'food': return '#46a302';
        case 'job': case 'work': return '#e53e3e';
        case 'social': return '#e6b400';
        case 'travel': return '#b85eff';
        default: return '#46a302';
      }
    }};
  }
`;

// Define Illustration if needed
export const Illustration = styled.img`
  // Add your styles here
`;

// Define Duration if needed
export const Duration = styled.span`
  // Add your styles here
`;

