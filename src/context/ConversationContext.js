import React, { createContext, useContext, useState } from 'react';

const ConversationContext = createContext();

export const useConversation = () => useContext(ConversationContext);

export const ConversationProvider = ({ children }) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState(null);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [conversationTranscript, setConversationTranscript] = useState([]);
  const [currentScreen, setCurrentScreen] = useState('selection');

  const handleScenarioSelect = (scenario) => {
    setSelectedScenarioId(scenario.id);
    setSelectedScenario(scenario);
    setCurrentScreen('warmup');
  };

  const handleWarmUpComplete = () => {
    setCurrentScreen('conversation');
  };

  const handleConversationEnd = (transcript) => {
    setConversationTranscript(transcript);
    setCurrentScreen('review');
  };

  const resetConversation = () => {
    setSelectedScenarioId(null);
    setSelectedScenario(null);
    setConversationTranscript([]);
    setCurrentScreen('selection');
  };

  return (
    <ConversationContext.Provider
      value={{
        selectedScenarioId,
        selectedScenario,
        conversationTranscript,
        currentScreen,
        handleScenarioSelect,
        handleWarmUpComplete,
        handleConversationEnd,
        resetConversation
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};