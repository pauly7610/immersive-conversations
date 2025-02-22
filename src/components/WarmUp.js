import React, { useState, useEffect } from 'react';
import { Container, StartButton } from '../styles/StyledComponents';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const SpeechPrompt = styled.div`
  background-color: #f0f4f8;
  border: 1px solid #b0c4de;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  text-align: center;
`;

const FeedbackArea = styled.div`
  margin-top: 20px;
  padding: 10px;
  background-color: ${props => 
    props.status === 'good' ? '#e6f3e6' : 
    props.status === 'needs-improvement' ? '#fff3e0' : 
    '#f0f0f0'};
  border-radius: 8px;
`;

const VocabularyContainer = styled.div`
  background-color: #f0f8ff;
  border: 1px solid #b0c4de;
  border-radius: 8px;
  padding: 15px;
  margin: 20px 0;
`;

const VocabularyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

const VocabularyCard = styled.div`
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding: 10px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const SpanishWord = styled.h4`
  color: #1a73e8;
  margin: 0 0 5px 0;
`;

const Translation = styled.p`
  color: #666;
  margin: 0;
  font-size: 0.9em;
`;

const Context = styled.small`
  color: #888;
  font-style: italic;
`;

const WarmUpContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.light.background};
  border-radius: 1rem;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: 1.5rem;
  transition: box-shadow 300ms ease-in-out;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
`;

const Title = styled.h3`
  font-size: 2rem;
  font-weight: bold;
  color: #4b4b4b;
  margin-bottom: 0.5rem;
  letter-spacing: -0.015em;
`;

const Button = styled.button`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.light.background};
  padding: 0.75rem;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 300ms ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.hover};
  }
`;

const WarmUp = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { scenario } = location.state || {};
    const { theme } = useTheme();

    const [prompt, setPrompt] = useState('');
    const [transcript, setTranscript] = useState('');
    const [feedback, setFeedback] = useState('');
    const [feedbackStatus, setFeedbackStatus] = useState('');

    // Speech Recognition setup
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = scenario.language === 'Spanish' ? 'es-ES' : 'en-US';

    useEffect(() => {
        if (!scenario) return;
        setPrompt(scenario.prompt);
    }, [scenario]);

    const startListening = () => {
        recognition.onresult = (event) => {
            const speechToText = event.results[0][0].transcript;
            setTranscript(speechToText);
            evaluateSpeech(speechToText);
        };

        recognition.start();
    };

    const evaluateSpeech = async (text) => {
        try {
            const apiKey = process.env.REACT_APP_HUGGING_FACE_API_KEY;
            const response = await fetch('https://api-inference.huggingface.co/models/facebook/bart-large', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    inputs: `Evaluate this speech in the context of a language learning scenario:
                    Scenario: ${scenario.title}
                    Language: ${scenario.language}
                    CEFR Level: ${scenario.cefrLevel}
                    Original Prompt: "${prompt}"
                    
                    Speech to Evaluate: "${text}"
                    
                    Provide detailed feedback on:
                    1. Relevance to the prompt
                    2. Language accuracy
                    3. Vocabulary usage
                    4. Grammatical correctness
                    5. Pronunciation hints (if applicable)
                    
                    Give a constructive assessment with specific suggestions for improvement.`,
                    parameters: {
                        max_length: 300,
                        temperature: 0.7,
                    }
                })
            });

            const data = await response.json();
            const generatedFeedback = data[0]?.generated_text || 'Good attempt!';
            
            setFeedback(generatedFeedback);
            
            // Basic feedback status determination
            if (generatedFeedback.toLowerCase().includes('excellent') || 
                generatedFeedback.toLowerCase().includes('very good')) {
                setFeedbackStatus('good');
            } else if (generatedFeedback.toLowerCase().includes('improve') || 
                       generatedFeedback.toLowerCase().includes('work on')) {
                setFeedbackStatus('needs-improvement');
            } else {
                setFeedbackStatus('neutral');
            }
        } catch (error) {
            console.error('Error evaluating speech:', error);
            setFeedback('Unable to process feedback');
            setFeedbackStatus('neutral');
        }
    };

    const handleContinue = () => {
        navigate('/conversation', { 
            state: { scenario } 
        });
    };

    if (!scenario) {
        return <div>No scenario selected</div>;
    }

    return (
        <WarmUpContainer theme={theme}>
            <Title theme={theme}>Warm Up</Title>
            <Button theme={theme} onClick={startListening}>
                Start Warm Up
            </Button>

            <SpeechPrompt>
                <h3>Speaking Prompt</h3>
                <p>{prompt}</p>
            </SpeechPrompt>

            {scenario.keyVocabulary && (
                <VocabularyContainer>
                    <h3>Key Vocabulary to Use</h3>
                    <VocabularyGrid>
                        {scenario.keyVocabulary.map((vocab, index) => (
                            <VocabularyCard key={index}>
                                <SpanishWord>{vocab.word}</SpanishWord>
                                <Translation>{vocab.translation}</Translation>
                                <Context>{vocab.context}</Context>
                            </VocabularyCard>
                        ))}
                    </VocabularyGrid>
                </VocabularyContainer>
            )}

            {transcript && (
                <div>
                    <h3>Your Response:</h3>
                    <p>{transcript}</p>
                </div>
            )}

            {feedback && (
                <FeedbackArea status={feedbackStatus}>
                    <h3>AI Language Feedback:</h3>
                    <p>{feedback}</p>
                </FeedbackArea>
            )}

            {feedback && (
                <Button theme={theme} onClick={handleContinue}>
                    Continue to Conversation
                </Button>
            )}
        </WarmUpContainer>
    );
};

export default WarmUp;