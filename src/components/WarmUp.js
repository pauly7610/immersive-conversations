import React, { useState, useEffect } from 'react';
import { Container, StartButton } from '../styles/StyledComponents';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import { getTransliteration, needsTransliteration } from '../utils/transliteration';

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

const Transliteration = styled.div`
  font-style: italic;
  font-size: 0.85em;
  color: #666;
  margin-top: 3px;
  border-top: 1px dashed #e0e0e0;
  padding-top: 3px;
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
  max-width: ${({ theme }) => theme.container.maxWidth.md};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[4]};
  background-color: ${({ theme }) => theme.colors.light.background};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.light.foreground};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

const PromptCard = styled.div`
  background-color: #f0f8ff;
  border: 1px solid ${({ theme }) => theme.colors.light.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  padding: ${({ theme }) => theme.spacing[4]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const ActionButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: white;
  padding: ${({ theme }) => theme.spacing[3]};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  cursor: pointer;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  transition: background-color ${({ theme }) => theme.transitions.default};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.hover};
  }
`;

const FeedbackContainer = styled.div`
  background-color: ${({ status, theme }) => 
    status === 'good' ? '#e6f3e6' : 
    status === 'needs-improvement' ? '#fff3e0' : 
    theme.colors.light.muted};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  padding: ${({ theme }) => theme.spacing[3]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

// Language code mapping
const getLanguageCode = (language) => {
  const languageMap = {
    'Spanish': 'es-ES',
    'French': 'fr-FR',
    'German': 'de-DE',
    'Italian': 'it-IT',
    'Portuguese': 'pt-PT',
    'Japanese': 'ja-JP',
    'Korean': 'ko-KR',
    'Russian': 'ru-RU',
    'Arabic': 'ar-SA',
    'English': 'en-US'
  };
  
  return languageMap[language] || 'en-US';
};

const WarmUp = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { scenario } = location.state || {};
    const { theme } = useTheme();

    const [prompt, setPrompt] = useState('');
    const [transcript, setTranscript] = useState('');
    const [feedback, setFeedback] = useState('');
    const [feedbackStatus, setFeedbackStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [speechSupported, setSpeechSupported] = useState(true);

    // Speech Recognition setup
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = getLanguageCode(scenario.language);

    useEffect(() => {
        if (!scenario) return;
        setPrompt(scenario.prompt);
    }, [scenario]);

    useEffect(() => {
        // Check if speech recognition is supported
        if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
            setSpeechSupported(false);
        }
    }, []);

    const startListening = () => {
        if (!SpeechRecognition) {
            setFeedback("Speech recognition is not supported in your browser.");
            return;
        }
        
        try {
            recognition.onresult = (event) => {
                const speechToText = event.results[0][0].transcript;
                setTranscript(speechToText);
                evaluateSpeech(speechToText);
            };
            
            recognition.onerror = (event) => {
                setFeedback(`Speech recognition error: ${event.error}`);
            };

            recognition.start();
        } catch (error) {
            console.error("Speech recognition error:", error);
            setFeedback("Failed to start speech recognition. Please try again.");
        }
    };

    const evaluateSpeech = async (text) => {
        setIsLoading(true);
        try {
            const apiKey = process.env.REACT_APP_HUGGING_FACE_API_KEY;
            if (!apiKey) {
                throw new Error('API key is missing. Please check your environment configuration.');
            }
            
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
            setFeedback(`Error: ${error.message}`);
            setFeedbackStatus('neutral');
        } finally {
            setIsLoading(false);
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
            <SectionTitle theme={theme}>Warm Up</SectionTitle>
            <PromptCard>
                <h3>Speaking Prompt</h3>
                <p>{prompt}</p>
            </PromptCard>

            {scenario.keyVocabulary && (
                <VocabularyContainer>
                    <h3>Key Vocabulary to Use</h3>
                    <VocabularyGrid>
                        {scenario.keyVocabulary.map((vocab, index) => {
                            const showTransliteration = needsTransliteration(scenario.language);
                            const transliteration = showTransliteration 
                                ? getTransliteration(vocab.word, scenario.language)
                                : '';
                            
                            return (
                                <VocabularyCard key={index}>
                                    <SpanishWord>{vocab.word}</SpanishWord>
                                    {showTransliteration && transliteration && (
                                        <Transliteration>{transliteration}</Transliteration>
                                    )}
                                    <Translation>{vocab.translation}</Translation>
                                    <Context>{vocab.context}</Context>
                                </VocabularyCard>
                            );
                        })}
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
                <FeedbackContainer status={feedbackStatus}>
                    <h3>AI Language Feedback:</h3>
                    <p>{feedback}</p>
                </FeedbackContainer>
            )}

            {isLoading && (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    <p>Analyzing your response...</p>
                    {/* You could add a spinner here */}
                </div>
            )}

            {speechSupported ? (
                <ActionButton theme={theme} onClick={handleContinue}>
                    Continue to Conversation
                </ActionButton>
            ) : (
                <div className="error-message">
                    <h3>Speech Recognition Not Supported</h3>
                    <p>Your browser doesn't support speech recognition. Please try using Chrome, Edge, or Safari.</p>
                    <ActionButton theme={theme} onClick={handleContinue}>
                        Skip to Conversation
                    </ActionButton>
                </div>
            )}
        </WarmUpContainer>
    );
};

export default WarmUp;