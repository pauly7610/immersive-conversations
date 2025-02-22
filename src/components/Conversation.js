/* global webkitSpeechRecognition */
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../styles/theme';

const ConversationContainer = styled.div`
  max-width: ${theme.container.maxWidth.lg};
  margin: 0 auto;
  padding: ${theme.spacing[4]};
  font-family: ${theme.typography.fontFamily.sans.join(', ')};
`;

const MessageList = styled.div`
  height: 400px;
  overflow-y: auto;
  border: 1px solid ${theme.colors.light.border};
  border-radius: ${theme.borderRadius.default};
  padding: ${theme.spacing[4]};
  margin-bottom: ${theme.spacing[4]};
  background-color: ${theme.colors.light.background};
`;

const MessageBubble = styled.div`
  background-color: ${props => 
    props.isUser 
      ? theme.colors.secondary.main 
      : theme.colors.light.muted
  };
  color: ${props => 
    props.isUser 
      ? theme.colors.light.background 
      : theme.colors.light.foreground
  };
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing[3]};
  margin: ${theme.spacing[2]} 0;
  max-width: 80%;
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  box-shadow: ${theme.shadows.sm};
`;

const SuggestedResponsesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing[2]};
  margin-top: ${theme.spacing[4]};
`;

const SuggestedResponseButton = styled.button`
  background-color: ${theme.colors.primary.main};
  color: ${theme.colors.light.background};
  border: none;
  padding: ${theme.spacing[2]} ${theme.spacing[3]};
  border-radius: ${theme.borderRadius.default};
  cursor: pointer;
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.semibold};
  transition: background-color ${theme.transitions.default};

  &:hover {
    background-color: ${theme.colors.primary.hover};
  }

  &:disabled {
    background-color: ${theme.colors.light.muted};
    cursor: not-allowed;
  }
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

  &:hover {
    background-color: ${theme.colors.secondary.hover};
  }

  &:disabled {
    background-color: ${theme.colors.light.muted};
    cursor: not-allowed;
  }
`;

const Conversation = ({ scenario }) => {
    const navigate = useNavigate();

    const [messages, setMessages] = useState([]);
    const [suggestedResponses, setSuggestedResponses] = useState([]);
    const [isListening, setIsListening] = useState(false);
    const messageListRef = useRef(null);

    // Speech Recognition and Synthesis setup
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechSynthesis = window.speechSynthesis;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = scenario.language === 'Spanish' ? 'es-ES' : 
                       scenario.language === 'French' ? 'fr-FR' :
                       scenario.language === 'German' ? 'de-DE' :
                       scenario.language === 'Italian' ? 'it-IT' :
                       scenario.language === 'Portuguese' ? 'pt-PT' :
                       scenario.language === 'Japanese' ? 'ja-JP' :
                       'en-US';

    useEffect(() => {
        generateInitialAIMessage();
    }, [scenario, generateInitialAIMessage]);

    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [messages, suggestedResponses]);

    const generateInitialAIMessage = async () => {
        try {
            const apiKey = process.env.REACT_APP_HUGGING_FACE_API_KEY;
            const response = await fetch('https://api-inference.huggingface.co/models/gpt2', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    inputs: `Generate an initial greeting and opening line for a conversation in ${scenario.language} based on the scenario: ${scenario.title}. 
                    Context: ${scenario.prompt}
                    Generate 3 possible response options for the user.`,
                    parameters: {
                        max_length: 200,
                        temperature: 0.7,
                    }
                })
            });

            const data = await response.json();
            const aiMessage = data[0]?.generated_text || 
                `Hello! I'm ready to have a conversation about ${scenario.title}.`;
            
            // Extract suggested responses
            const responseOptions = aiMessage.split('\n')
                .filter(line => line.trim() !== '')
                .slice(1, 4)  // Take 3 response options
                .map(option => option.replace(/^\d+\.\s*/, '').trim());
            
            addMessage(aiMessage.split('\n')[0], false);
            setSuggestedResponses(responseOptions);
            speakMessage(aiMessage.split('\n')[0]);
        } catch (error) {
            console.error('Error generating initial message:', error);
        }
    };

    const addMessage = (text, isUser) => {
        setMessages(prev => [...prev, { text, isUser }]);
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
        addMessage(response, true);
        generateAIResponse(response);
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
                    inputs: `Conversation Context: ${scenario.title} in ${scenario.language}
                    Previous Conversation: ${messages.map(m => m.text).join('\n')}
                    User's Last Message: ${userMessage}
                    
                    Generate a contextually appropriate response in ${scenario.language} that:
                    1. Continues the conversation
                    2. Matches the scenario's theme
                    3. Uses language appropriate for ${scenario.cefrLevel} level
                    4. Provide 3 possible next response options for the user`,
                    parameters: {
                        max_length: 250,
                        temperature: 0.7,
                    }
                })
            });

            const data = await response.json();
            const fullResponse = data[0]?.generated_text || 
                'I understand. Could you tell me more about that?';
            
            // Split response into AI message and suggested responses
            const responseParts = fullResponse.split('\n');
            const aiMessage = responseParts[0].trim();
            const newSuggestedResponses = responseParts
                .slice(1, 4)
                .map(option => option.replace(/^\d+\.\s*/, '').trim())
                .filter(option => option);

            addMessage(aiMessage, false);
            setSuggestedResponses(newSuggestedResponses);
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
        <ConversationContainer>
            <h2>{scenario.title}</h2>
            <p>{scenario.prompt}</p>
            <div>
                <h3>Suggested Responses:</h3>
                <ul>
                    {scenario.suggestedResponses.map((response, index) => (
                        <li key={index}>{response}</li>
                    ))}
                </ul>
            </div>
            <MessageList ref={messageListRef}>
                {messages.map((message, index) => (
                    <MessageBubble key={index} isUser={message.isUser}>
                        {message.text}
                    </MessageBubble>
                ))}
            </MessageList>
            
            <SuggestedResponsesContainer>
                {suggestedResponses.map((response, index) => (
                    <SuggestedResponseButton 
                        key={index} 
                        onClick={() => handleSuggestedResponse(response)}
                    >
                        {response}
                    </SuggestedResponseButton>
                ))}
            </SuggestedResponsesContainer>

            <div>
                <SpeechButton 
                    onClick={startListening} 
                    disabled={isListening}
                >
                    {isListening ? 'Listening...' : 'Speak Freely'}
                </SpeechButton>
                <SpeechButton onClick={handleEndConversation}>
                    End Conversation
                </SpeechButton>
            </div>
        </ConversationContainer>
    );
};

export default Conversation;