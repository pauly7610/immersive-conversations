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
  const navigate = useNavigate();
  const { theme } = useTheme();

  const filteredScenarios = selectedCategory === 'All'
    ? scenarios
    : scenarios.filter(scenario => scenario.type === selectedCategory.toLowerCase());

  const handleScenarioSelect = async (scenario) => {
    if (!scenario.prompt) {
      navigate(`/scenario/${scenario.id}`, { state: { scenario } });
      return;
    }

    setLoading(true);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const apiKey = process.env.REACT_APP_HUGGING_FACE_API_KEY;
      const model = 'distilgpt2';

      const res = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
        method: 'POST',
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: `Scenario: ${scenario.title}\nPrompt: ${scenario.prompt}\nResponse:`,
          parameters: {
            max_length: 150,
            temperature: 0.5,
            top_p: 0.9,
          },
        }),
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`);
      }

      const data = await res.json();
      const generatedResponse = data[0]?.generated_text || 'No response from AI';

      navigate(`/scenario/${scenario.id}`, { state: { scenario } });

      setResponse(generatedResponse);
    } catch (error) {
      console.error('Error fetching response:', error);
      
      navigate(`/scenario/${scenario.id}`, { 
        state: { 
          scenario, 
          response: `Error: ${error.message}` 
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
      {loading ? <p>Loading...</p> : <p>{response}</p>}
    </Container>
  );
};

export default ScenarioSelection;