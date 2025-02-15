import React, { useState, useEffect } from 'react';
import { Container, StartButton } from '../styles/StyledComponents';

const WarmUp = ({ scenarioId, onWarmUpComplete }) => {
    const [vocabulary, setVocabulary] = useState([]);

    useEffect(() => {
        // Simulate loading vocabulary
        setTimeout(() => {
            setVocabulary(['Hola', 'Gracias', 'Por favor']);
        }, 500);
    }, [scenarioId]);

    return (
        <Container>
            <h2>Get Ready!</h2>
            <p>Practice these words before the conversation:</p>
            <ul>
                {vocabulary.map((word, index) => (
                    <li key={index}>{word}</li>
                ))}
            </ul>
            <StartButton onClick={onWarmUpComplete}>Begin Conversation</StartButton>
        </Container>
    );
};

export default WarmUp;