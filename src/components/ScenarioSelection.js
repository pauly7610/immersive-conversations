import React, { useState } from 'react';
import { scenarios } from '../data/scenarios.js';
import { 
    Container, 
    CategoryRibbon, 
    RibbonButton, 
    ScenarioCarousel, 
    ScenarioCard, 
    Illustration, 
    DifficultyBadge, 
    Duration, 
    StartButton 
} from '../styles/StyledComponents';

const ScenarioSelection = ({ onScenarioSelect }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredScenarios = selectedCategory === 'All'
        ? scenarios
        : scenarios.filter(scenario => scenario.category === selectedCategory);

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
            </CategoryRibbon>
            <ScenarioCarousel>
                {filteredScenarios.map(scenario => (
                    <ScenarioCard key={scenario.id}>
                        <Illustration src={scenario.illustration} alt={scenario.title} />
                        <DifficultyBadge level={scenario.cefrLevel}>{scenario.cefrLevel}</DifficultyBadge>
                        <h3>{scenario.title}</h3>
                        <Duration>{scenario.duration}</Duration>
                        <StartButton onClick={() => onScenarioSelect(scenario.id)}>Start</StartButton>
                    </ScenarioCard>
                ))}
            </ScenarioCarousel>
        </Container>
    );
};

export default ScenarioSelection;