import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { GlobalStyle } from './styles/GlobalStyle';
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
  return (
    <ThemeProvider>
      <GlobalStyle />
      <Router>
        <NavigationBar />
        <Container>
          <Routes>
            <Route path="/" element={<ScenarioSelection />} />
            <Route path="/scenario/:id" element={<ScenarioDetail />} />
            <Route path="/warmup" element={<WarmUp />} />
            <Route path="/conversation" element={
              <Suspense fallback={<div>Loading...</div>}>
                <ConversationComponent />
              </Suspense>
            } />
            <Route path="/review" element={<Review />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/progress" element={<ProgressChart />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;