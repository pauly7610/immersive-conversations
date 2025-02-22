import React, { useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';

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
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');

  if (!SpeechRecognition) {
    return <p>Your browser does not support speech recognition.</p>;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  const startRecognition = () => {
    recognition.start();
    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setTranscript(speechToText);
      processInput(speechToText);
    };
  };

  const processInput = async (input) => {
    const apiKey = process.env.REACT_APP_HUGGING_FACE_API_KEY;
    const model = 'distilgpt2';

    try {
      const res = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: input,
          parameters: {
            max_length: 512,
            temperature: 0.5,
          },
        }),
      });

      const data = await res.json();
      setResponse(data[0]?.generated_text || 'No response');
    } catch (error) {
      console.error('Error fetching response:', error);
      setResponse('Error fetching response');
    }
  };

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