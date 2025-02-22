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
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: ${({ theme }) => (theme === 'light' ? '#f0f8ff' : '#333')};
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
  font-family: 'Arial', sans-serif;
  @media (max-width: 600px) {
      padding: 10px;
  }
`;

export const TranscriptContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 20px;
`;

export const MessageBubble = styled.div`
  background-color: ${({ speaker }) => (speaker === 'AI' ? '#e0f7fa' : '#58cc02')};
  color: ${({ speaker }) => (speaker === 'AI' ? '#000' : '#fff')};
  padding: 10px;
  border-radius: 10px;
  margin: 5px 0;
  animation: ${fadeIn} 0.5s ease-in-out;
  font-size: 16px;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const InputBox = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
`;

export const SendButton = styled.button`
  padding: 10px 20px;
  background-color: #58cc02;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:disabled {
    background-color: #ccc;
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
  padding: 10px;
  background-color: #f0f0f0;
`;

export const RibbonButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 20px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &.active {
    background-color: #58cc02;
    color: white;
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

// Define ScenarioCard if needed
export const ScenarioCard = styled.div`
  // Add your styles here
`;

// Define Illustration if needed
export const Illustration = styled.img`
  // Add your styles here
`;

// Define DifficultyBadge if needed
export const DifficultyBadge = styled.span`
  // Add your styles here
`;

// Define Duration if needed
export const Duration = styled.span`
  // Add your styles here
`;

// Define StartButton if needed
export const StartButton = styled.button`
  // Add your styles here
`;

