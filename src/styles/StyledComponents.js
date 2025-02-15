import styled, { keyframes } from 'styled-components';

export const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
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

// Add other styled components from the original file...