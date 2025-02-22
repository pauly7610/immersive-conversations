import React, { useState, Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useTheme } from './context/ThemeContext';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle';

// Import components
import ScenarioSelection from './components/ScenarioSelection';
import ScenarioDetail from './components/ScenarioDetail';
import WarmUp from './components/WarmUp';
import Review from './components/Review';
import UserProfile from './components/UserProfile';
import ProgressChart from './components/ProgressChart';
import Leaderboard from './components/Leaderboard';
import NavigationBar from './components/NavigationBar';
import { Container } from './styles/StyledComponents';

const ConversationComponent = lazy(() => import('./components/Conversation'));

const App = () => {
    const { theme } = useTheme();
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
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Router>
                <NavigationBar />
                <Container>
                    <Routes>
                        <Route 
                            path="/" 
                            element={<ScenarioSelection onScenarioSelect={handleScenarioSelect} />} 
                        />
                        <Route 
                            path="/scenario/:id" 
                            element={<ScenarioDetail />} 
                        />
                        <Route 
                            path="/warmup" 
                            element={<WarmUp scenarioId={selectedScenarioId} onWarmUpComplete={handleWarmUpComplete} />} 
                        />
                        <Route 
                            path="/conversation" 
                            element={
                                <Suspense fallback={<div>Loading...</div>}>
                                    <ConversationComponent scenarioId={selectedScenarioId} onConversationEnd={handleConversationEnd} />
                                </Suspense>
                            } 
                        />
                        <Route 
                            path="/review" 
                            element={<Review transcript={conversationTranscript} />} 
                        />
                        <Route 
                            path="/profile" 
                            element={<UserProfile />} 
                        />
                        <Route 
                            path="/progress" 
                            element={<ProgressChart />} 
                        />
                        <Route 
                            path="/leaderboard" 
                            element={<Leaderboard />} 
                        />
                    </Routes>
                </Container>
            </Router>
        </ThemeProvider>
    );
};

export default App;