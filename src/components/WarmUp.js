import React, { useState, useEffect } from 'react';
import { Container, StartButton } from '../styles/StyledComponents';

const WarmUp = ({ scenarioId, onWarmUpComplete }) => {
    const [vocabulary, setVocabulary] = useState([]);
    const [timeLeft, setTimeLeft] = useState(30); // 30 seconds timer

    useEffect(() => {
        // Simulate loading vocabulary
        setTimeout(() => {
            setVocabulary(['Hola', 'Gracias', 'Por favor']);
        }, 500);

        // Timer countdown
        const timer = setInterval(() => {
            setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
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
            <p>Time left: {timeLeft} seconds</p>
            <StartButton onClick={onWarmUpComplete} disabled={timeLeft > 0}>Begin Conversation</StartButton>
        </Container>
    );
};

export default WarmUp;