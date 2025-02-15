import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ScenarioSelection from './components/ScenarioSelection';
import WarmUp from './components/WarmUp';
import Conversation from './components/Conversation';
import Review from './components/Review';
import { Container } from './styles/StyledComponents';

const App = () => {
    const [currentScreen, setCurrentScreen] = useState('selection');
    const [selectedScenarioId, setSelectedScenarioId] = useState(null);
    const [conversationTranscript, setConversationTranscript] = useState([]);

    const handleScenarioSelect = (id) => {
        setSelectedScenarioId(id);
        setCurrentScreen('warmup');
    };

    const handleWarmUpComplete = () => {
        setCurrentScreen('conversation');
    };

    const handleConversationEnd = (transcript) => {
        setConversationTranscript(transcript);
        setCurrentScreen('review');
    };

    return (
        <Router>
            <Container>
                <Routes>
                    <Route 
                        path="/" 
                        element={
                            currentScreen === 'selection' && (
                                <ScenarioSelection onScenarioSelect={handleScenarioSelect} />
                            )
                        } 
                    />
                    <Route 
                        path="/warmup" 
                        element={
                            currentScreen === 'warmup' && (
                                <WarmUp 
                                    scenarioId={selectedScenarioId} 
                                    onWarmUpComplete={handleWarmUpComplete} 
                                />
                            )
                        } 
                    />
                    <Route 
                        path="/conversation" 
                        element={
                            currentScreen === 'conversation' && (
                                <Conversation 
                                    scenarioId={selectedScenarioId} 
                                    onConversationEnd={handleConversationEnd} 
                                />
                            )
                        } 
                    />
                    <Route 
                        path="/review" 
                        element={
                            currentScreen === 'review' && (
                                <Review transcript={conversationTranscript} />
                            )
                        } 
                    />
                </Routes>
            </Container>
        </Router>
    );
};

export default App;