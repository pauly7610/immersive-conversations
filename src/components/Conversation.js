/* global webkitSpeechRecognition */
import React, { useState, useEffect } from 'react';
import { 
    Container, 
    TranscriptContainer, 
    MessageBubble, 
    InputContainer, 
    InputBox, 
    SendButton, 
    RecordButton, 
    EndButton 
} from '../styles/StyledComponents';

const Conversation = ({ scenarioId, onConversationEnd }) => {
    const [transcript, setTranscript] = useState([]);
    const [input, setInput] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        // Initial AI message based on scenario
        const initialMessage = getInitialMessage(scenarioId);
        setTranscript([{ speaker: 'AI', text: initialMessage }]);
    }, [scenarioId]);

    const getInitialMessage = (id) => {
        const initialMessages = {
            1: "Hola! ¿Qué le gustaría ordenar hoy?",
            2: "Bonjour, parlez-moi de votre expérience professionnelle.",
            // Add more initial messages for different scenarios
            default: "Hello! Let's start our conversation."
        };
        return initialMessages[id] || initialMessages.default;
    };

    const generateMockAIResponse = (userMessage) => {
        // Mock AI response logic with cultural context
        const responses = [
            "That's interesting, can you tell me more?",
            "I see, what else would you like to discuss?",
            "Great point! Let's explore that further."
        ];
        const culturalContext = "Remember to use formal language in professional settings.";
        return `${responses[Math.floor(Math.random() * responses.length)]} ${culturalContext}`;
    };

    const mockPronunciationFeedback = (userMessage) => {
        // Mock pronunciation feedback
        const feedback = "Your pronunciation is clear, but try to emphasize the 'r' sound.";
        return feedback;
    };

    const mockGrammarFeedback = (userMessage) => {
        // Mock grammar feedback
        const feedback = "Consider using 'have' instead of 'has' in this context.";
        return feedback;
    };

    const sendMessage = (text, speaker = 'User') => {
        if (text.trim()) {
            const newTranscript = [...transcript, { speaker, text }];
            setTranscript(newTranscript);

            if (speaker === 'User') {
                const aiResponse = generateMockAIResponse(text);
                const pronunciationFeedback = mockPronunciationFeedback(text);
                const grammarFeedback = mockGrammarFeedback(text);
                setTranscript(prev => [
                    ...prev, 
                    { speaker: 'AI', text: aiResponse },
                    { speaker: 'System', text: pronunciationFeedback },
                    { speaker: 'System', text: grammarFeedback }
                ]);
            }
        }
    };

    const handleSend = () => {
        if (!input.trim()) {
            setError("Input cannot be empty.");
            return;
        }
        sendMessage(input);
        setInput('');
        setError(null);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSend();
        }
    };

    const handleEndConversation = () => {
        onConversationEnd(transcript);
    };

    const handleVoiceInput = () => {
        if ('webkitSpeechRecognition' in window) {
            const recognition = new webkitSpeechRecognition();
            recognition.lang = 'en-US';
            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                sendMessage(transcript);
            };
            recognition.start();
        } else {
            alert('Speech recognition not supported in this browser.');
        }
    };

    return (
        <Container>
            <h2>Conversation Practice</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <TranscriptContainer>
                {transcript.map((message, index) => (
                    <MessageBubble key={index} speaker={message.speaker} className="fade-in">
                        {message.text}
                    </MessageBubble>
                ))}
            </TranscriptContainer>
            <InputContainer>
                <InputBox
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your response..."
                    aria-label="Conversation input"
                />
                <SendButton 
                    onClick={handleSend} 
                    aria-label="Send message"
                    disabled={!input.trim()}
                >
                    Send
                </SendButton>
            </InputContainer>
            <div>
                <RecordButton 
                    onClick={handleVoiceInput} 
                    aria-label="Start speech recognition"
                >
                    Speak
                </RecordButton>
                <EndButton 
                    onClick={handleEndConversation}
                    aria-label="End conversation"
                >
                    End Conversation
                </EndButton>
            </div>
        </Container>
    );
};

export default Conversation;