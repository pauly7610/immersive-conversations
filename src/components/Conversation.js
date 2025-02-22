/* global webkitSpeechRecognition */
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../styles/theme';

const ConversationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 16px;
`;

const MessageArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 60vh;
  overflow-y: auto;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: ${theme.shadows.sm};
`;

const InteractionArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.light.border};
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MessageBubble = styled.div`
  background-color: ${({ isUser, theme }) => 
    isUser ? theme.colors.secondary.main : theme.colors.light.muted};
  color: ${({ isUser, theme }) => 
    isUser ? theme.colors.light.background : theme.colors.light.foreground};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing[3]};
  margin: ${theme.spacing[2]} 0;
  max-width: 80%;
  align-self: ${({ isUser }) => isUser ? 'flex-end' : 'flex-start'};
  box-shadow: ${theme.shadows.sm};
  position: relative;
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ isUser }) => isUser ? '#1cb0f6' : '#ffcc00'};
  position: absolute;
  top: 0;
  ${({ isUser }) => isUser ? 'right: -40px;' : 'left: -40px;'}
`;

const SuggestedResponsesContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const SuggestedResponseButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.light.background};
  border: none;
  padding: 12px;
  border-radius: ${theme.borderRadius.default};
  cursor: pointer;
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.bold};
  transition: background-color ${theme.transitions.default};
  flex-grow: 1;
  min-width: 150px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.hover};
  }

  &::after {
    content: attr(data-translation);
    display: block;
    font-size: 0.8em;
    color: ${({ theme }) => theme.colors.light.foreground};
    margin-top: 4px;
    font-weight: normal;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.light.border};
`;

const SpeechButton = styled.button`
  background-color: ${theme.colors.secondary.main};
  color: ${theme.colors.light.background};
  border: none;
  padding: ${theme.spacing[2]} ${theme.spacing[4]};
  border-radius: ${theme.borderRadius.default};
  cursor: pointer;
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.semibold};
  margin-right: ${theme.spacing[2]};
  transition: background-color ${theme.transitions.default};

  &:disabled {
    background-color: ${theme.colors.light.muted};
    cursor: not-allowed;
  }
`;

const PrimaryButton = styled(SpeechButton)`
  background-color: ${({ theme }) => theme.colors.primary.main};
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.hover};
  }
`;

const SecondaryButton = styled(SpeechButton)`
  background-color: ${({ theme }) => theme.colors.secondary.main};
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary.hover};
  }
`;

const welcomeMessages = {
  spanish: '¡Hola! Bienvenido a la práctica de conversación.',
  french: 'Bonjour! Bienvenue à la pratique de conversation.',
  german: 'Hallo! Willkommen zur Konversationsübung.',
  italian: 'Ciao! Benvenuto alla pratica della conversazione.',
  portuguese: 'Olá! Bem-vindo à prática de conversação.',
  japanese: 'こんにちは！会話の練習へようこそ。',
  korean: '안녕하세요! 대화 연습에 오신 것을 환영합니다.',
  russian: 'Здравствуйте! Добро пожаловать на разговорную практику.',
  arabic: 'مرحباً! أهلاً بك في تدريب المحادثة.',
  english: 'Hello! Welcome to conversation practice.'
};

const getInitialResponses = (language, scenario) => {
  const responseMap = {
    spanish: {
      food: [
        { text: '¿Cuál es el especial del día?', translation: "What's today's special?" },
        { text: 'Me gustaría ordenar...', translation: 'I would like to order...' },
        { text: '¿Qué me recomienda?', translation: 'What do you recommend?' }
      ],
      airport: [
        { text: '¿Dónde está el mostrador de facturación?', translation: 'Where is the check-in counter?' }
      ]
    },
    french: {
      interview: [
        { text: 'Pourquoi voulez-vous ce poste?', translation: 'Why do you want this position?' },
        { text: 'Parlez-moi de votre expérience.', translation: 'Tell me about your experience.' }
      ],
      party: [
        { text: 'Joyeux anniversaire!', translation: 'Happy birthday!' }
      ]
    },
    // ... similar mappings for each language and scenario type
  };

  return responseMap[language]?.[scenario] || [];
};

const Conversation = ({ scenario }) => {
    const navigate = useNavigate();

    const [messages, setMessages] = useState([]);
    const [messageIds, setMessageIds] = useState(new Set());
    const [suggestedResponses, setSuggestedResponses] = useState([]);
    const [isListening, setIsListening] = useState(false);
    const messageListRef = useRef(null);

    const scenarioLanguage = scenario.language || 'english';
    const scenarioType = scenario.type || 'general';

    // Speech Recognition and Synthesis setup
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechSynthesis = window.speechSynthesis;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = scenario.language === 'spanish' ? 'es-ES' : 
                       scenario.language === 'french' ? 'fr-FR' :
                       scenario.language === 'german' ? 'de-DE' :
                       scenario.language === 'italian' ? 'it-IT' :
                       scenario.language === 'portuguese' ? 'pt-PT' :
                       scenario.language === 'japanese' ? 'ja-JP' :
                       scenario.language === 'korean' ? 'ko-KR' :
                       scenario.language === 'russian' ? 'ru-RU' :
                       scenario.language === 'arabic' ? 'ar-AR' :
                       'en-US';

    useEffect(() => {
        setMessages([]);
        setMessageIds(new Set());
        const initialMessage = welcomeMessages[scenarioLanguage] || welcomeMessages.english;
        const responses = getInitialResponses(scenarioLanguage, scenarioType);
        addMessage(initialMessage, false);
        setSuggestedResponses(responses);
    }, [scenario]);

    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [messages, suggestedResponses]);

    const addMessage = (text, isUser) => {
        const messageId = `${text}-${isUser}`;
        if (!messageIds.has(messageId)) {
            setMessages(prev => [...prev, { text, isUser }]);
            setMessageIds(prev => new Set(prev).add(messageId));
        }
    };

    const speakMessage = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = recognition.lang;
        SpeechSynthesis.speak(utterance);
    };

    const startListening = () => {
        setIsListening(true);
        recognition.onresult = (event) => {
            const userSpeech = event.results[0][0].transcript;
            addMessage(userSpeech, true);
            generateAIResponse(userSpeech);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.start();
    };

    const handleSuggestedResponse = (response) => {
        addMessage(response.text, true);
        generateAIResponse(response.text);
    };

    const generateAIResponse = async (userMessage) => {
        try {
            const apiKey = process.env.REACT_APP_HUGGING_FACE_API_KEY;
            const response = await fetch('https://api-inference.huggingface.co/models/facebook/bart-large', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    inputs: `Continue the conversation in ${scenario.language} for the scenario: ${scenario.title}.
                    User's Last Message: ${userMessage}
                    Provide 3 possible user responses in ${scenario.language}.`,
                    parameters: {
                        max_length: 250,
                        temperature: 0.7,
                    }
                })
            });

            const data = await response.json();
            const fullResponse = data[0]?.generated_text || 
                'Entiendo. ¿Podrías contarme más sobre eso?';
            
            // Split response into AI message and suggested responses
            const responseParts = fullResponse.split('\n');
            const aiMessage = responseParts[0].trim();
            const newSuggestedResponses = responseParts
                .slice(1, 4)
                .map(option => option.replace(/^\d+\.\s*/, '').trim())
                .filter(option => option);

            addMessage(aiMessage, false);
            setSuggestedResponses(newSuggestedResponses.map(text => ({ text, translation: '' })));
            speakMessage(aiMessage);
        } catch (error) {
            console.error('Error generating AI response:', error);
        }
    };

    const handleEndConversation = () => {
        navigate('/review', { 
            state: { 
                scenario, 
                messages 
            } 
        });
    };

    if (!scenario) {
        return <div>No scenario selected</div>;
    }

    return (
        <ConversationContainer theme={theme}>
            <MessageArea>
                <h2>{scenario.title}</h2>
                <p>{scenario.prompt}</p>
                <MessageList ref={messageListRef}>
                    {messages.map((message, index) => (
                        <MessageBubble key={index} isUser={message.isUser}>
                            <Avatar isUser={message.isUser} />
                            {message.text}
                        </MessageBubble>
                    ))}
                </MessageList>
            </MessageArea>
            
            <InteractionArea>
                <SuggestedResponsesContainer>
                    {suggestedResponses.map((response, index) => (
                        <SuggestedResponseButton 
                            key={index} 
                            onClick={() => handleSuggestedResponse(response)}
                            data-translation={response.translation}
                        >
                            {response.text}
                        </SuggestedResponseButton>
                    ))}
                </SuggestedResponsesContainer>

                <Footer>
                    <PrimaryButton 
                        onClick={startListening} 
                        disabled={isListening}
                    >
                        {isListening ? 'Listening...' : 'Speak Freely'}
                    </PrimaryButton>
                    <SecondaryButton onClick={handleEndConversation}>
                        End Conversation
                    </SecondaryButton>
                </Footer>
            </InteractionArea>
        </ConversationContainer>
    );
};

export default Conversation;