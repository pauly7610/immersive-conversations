import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Conversation from './Conversation';
import { needsTransliteration } from '../utils/transliteration';
import { useTheme } from '../context/ThemeContext';

const PronunciationGuide = styled.div`
  background-color: ${({ theme }) => theme.colors.light.muted};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  padding: ${({ theme }) => theme.spacing[3]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const ScenarioDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const scenario = state?.scenario;

  if (!scenario) {
    return (
      <div>
        <h2>No scenario data available</h2>
        <p>Please select a scenario from the home page.</p>
        <button onClick={() => navigate('/')}>Return to Scenarios</button>
      </div>
    );
  }

  const showPronunciationGuide = needsTransliteration(scenario.language);

  return (
    <div>
      {showPronunciationGuide && (
        <PronunciationGuide theme={theme}>
          <h3>Pronunciation Guide</h3>
          <p>This scenario uses {scenario.language}, which has a different writing system than English. 
          Don't worry! We'll provide pronunciation guides to help you read and speak the language.</p>
          <p>Look for the <em>italic text</em> under each phrase to see how to pronounce it in English letters.</p>
        </PronunciationGuide>
      )}
      
      <Conversation scenario={scenario} />
    </div>
  );
};

export default ScenarioDetail; 