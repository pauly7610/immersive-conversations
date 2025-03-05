import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import { useConversation } from '../context/ConversationContext';

// Check for browser support of the Web Speech API
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const APIContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.light.background};
  border-radius: 1rem;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: 1.5rem;
  transition: box-shadow 300ms ease-in-out;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.lg};
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

const Transcript = styled.p`
  background-color: #e0f7fa;
  color: #00796b;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
`;

const Response = styled.p`
  background-color: #fff3e0;
  color: #e65100;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
`;

const VoiceRecognitionComponent = () => {
  const { theme } = useTheme();
  const { apiUrl } = useConversation(); // Get apiUrl from context
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [recognition, setRecognition] = useState(null);

  // Initialize speech recognition on component mount
  useEffect(() => {
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onresult = (event) => {
        const speechToText = event.results[0][0].transcript;
        setTranscript(speechToText);
        processInput(speechToText);
      };
      
      setRecognition(recognitionInstance);
    }
    
    // Cleanup function
    return () => {
      if (recognition) {
        recognition.abort();
      }
    };
  }, []);

  const startRecognition = () => {
    if (recognition) {
      recognition.start();
    }
  };

  const processInput = async (input) => {
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'distilgpt2',
          inputs: input,
          parameters: {
            max_length: 512,
            temperature: 0.5,
          },
        }),
      });

      if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`);
      }

      const data = await res.json();
      setResponse(data[0]?.generated_text || 'No response');
    } catch (error) {
      console.error('Error fetching response:', error);
      setResponse(`Error: ${error.message}`);
    }
  };

  if (!recognition) {
    return <p>Your browser does not support speech recognition.</p>;
  }

  return (
    <APIContainer theme={theme}>
      <Title theme={theme}>Hugging Face API</Title>
      <Button theme={theme} onClick={startRecognition}>Start Speaking</Button>
      <div>
        <h3>Your Speech:</h3>
        <Transcript>{transcript}</Transcript>
      </div>
      <div>
        <h3>LLM Feedback:</h3>
        <Response>{response}</Response>
      </div>
    </APIContainer>
  );
};

export default VoiceRecognitionComponent; 