import React, { Suspense, lazy, Component } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useTheme } from './context/ThemeContext';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle';
import { ConversationProvider } from './context/ConversationContext';

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

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong. Please refresh the page.</div>;
    }
    return this.props.children;
  }
}

const App = () => {
    const { theme } = useTheme();

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <ErrorBoundary>
                <ConversationProvider>
                    <Router>
                        <NavigationBar />
                        <Container>
                            <Routes>
                                <Route path="/" element={<ScenarioSelection />} />
                                <Route path="/scenario/:id" element={<ScenarioDetail />} />
                                <Route path="/warmup" element={<WarmUp />} />
                                <Route 
                                    path="/conversation" 
                                    element={
                                        <Suspense fallback={<div>Loading...</div>}>
                                            <ConversationComponent />
                                        </Suspense>
                                    } 
                                />
                                <Route path="/review" element={<Review />} />
                                <Route path="/profile" element={<UserProfile />} />
                                <Route path="/progress" element={<ProgressChart />} />
                                <Route path="/leaderboard" element={<Leaderboard />} />
                            </Routes>
                        </Container>
                    </Router>
                </ConversationProvider>
            </ErrorBoundary>
        </ThemeProvider>
    );
};

export default App;