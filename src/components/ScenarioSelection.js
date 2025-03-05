import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { scenarios } from '../data/scenarios.js';
import { Container, CategoryRibbon, RibbonButton } from '../styles/StyledComponents';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import ScenarioCard from './ScenarioCard';

const ScenarioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing[4]};
`;

const ScenarioSelection = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { theme } = useTheme();

  const filteredScenarios = selectedCategory === 'All'
    ? scenarios
    : scenarios.filter(scenario => scenario.type === selectedCategory.toLowerCase());

  const handleScenarioSelect = async (scenario) => {
    setLoading(true);
    setError(null);
    
    try {
      // Call your Vercel API route instead of the API directly
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch('/api/huggingface', {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'distilgpt2',
          inputs: `Scenario: ${scenario.title}\nPrompt: ${scenario.prompt}\nResponse:`,
          parameters: {
            max_length: 150,
            temperature: 0.5,
            top_p: 0.9,
          },
        }),
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API request failed with status ${response.status}`);
      }

      const data = await response.json();
      
      // Continue with your existing logic
      navigate(`/warmup`, { 
        state: { 
          scenario,
          aiResponse: data[0]?.generated_text || 'No response from AI' 
        } 
      });
    } catch (error) {
      console.error('Error fetching response:', error);
      
      // Handle AbortError specifically
      if (error.name === 'AbortError') {
        setError('Request timed out. Please try again.');
      } else {
        setError(error.message);
      }
      
      // Still navigate but with error state
      navigate(`/warmup`, { 
        state: { 
          scenario, 
          error: error.message 
        } 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <CategoryRibbon>
        <RibbonButton
          className={selectedCategory === 'All' ? 'active' : ''}
          onClick={() => setSelectedCategory('All')}
        >
          All
        </RibbonButton>
        <RibbonButton
          className={selectedCategory === 'Travel' ? 'active' : ''}
          onClick={() => setSelectedCategory('Travel')}
        >
          Travel
        </RibbonButton>
        <RibbonButton
          className={selectedCategory === 'Work' ? 'active' : ''}
          onClick={() => setSelectedCategory('Work')}
        >
          Work
        </RibbonButton>
        <RibbonButton
          className={selectedCategory === 'Social' ? 'active' : ''}
          onClick={() => setSelectedCategory('Social')}
        >
          Social
        </RibbonButton>
        <RibbonButton
          className={selectedCategory === 'Food' ? 'active' : ''}
          onClick={() => setSelectedCategory('Food')}
        >
          Food
        </RibbonButton>
      </CategoryRibbon>
      <ScenarioGrid theme={theme}>
        {filteredScenarios.map(scenario => (
          <ScenarioCard
            key={scenario.id}
            title={scenario.title}
            type={scenario.type}
            duration={scenario.duration}
            difficulty={scenario.difficulty}
            onClick={() => handleScenarioSelect(scenario)}
          />
        ))}
      </ScenarioGrid>
      {loading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.3)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}>
            Loading...
          </div>
        </div>
      )}
      {error && <div className="error-message">Error: {error}</div>}
    </Container>
  );
};

export default ScenarioSelection;