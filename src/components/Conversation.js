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
        { text: '¿Dónde está el mostrador de facturación?', translation: 'Where is the check-in counter?' },
        { text: '¿Cuánto tiempo falta para el embarque?', translation: 'How long until boarding?' }
      ],
      hotel: [
        { text: '¿Puedo hacer el check-in temprano?', translation: 'Can I check in early?' },
        { text: '¿Hay servicio de habitaciones?', translation: 'Is there room service?' }
      ]
    },
    french: {
      interview: [
        { text: 'Pourquoi voulez-vous ce poste?', translation: 'Why do you want this position?' },
        { text: 'Parlez-moi de votre expérience.', translation: 'Tell me about your experience.' }
      ],
      party: [
        { text: 'Joyeux anniversaire!', translation: 'Happy birthday!' },
        { text: 'Quelle musique aimez-vous?', translation: 'What music do you like?' }
      ],
      travel: [
        { text: 'Où est la gare?', translation: 'Where is the train station?' },
        { text: 'Pouvez-vous me recommander un restaurant?', translation: 'Can you recommend a restaurant?' }
      ]
    },
    german: {
      shopping: [
        { text: 'Wie viel kostet das?', translation: 'How much does this cost?' },
        { text: 'Haben Sie das in einer anderen Größe?', translation: 'Do you have this in another size?' }
      ],
      meeting: [
        { text: 'Können wir das Meeting verschieben?', translation: 'Can we reschedule the meeting?' },
        { text: 'Was ist die Agenda für heute?', translation: 'What is the agenda for today?' }
      ]
    },
    italian: {
      restaurant: [
        { text: 'Posso vedere il menu?', translation: 'Can I see the menu?' },
        { text: 'Qual è il piatto del giorno?', translation: 'What is the dish of the day?' }
      ],
      sightseeing: [
        { text: 'Dove si trova il museo?', translation: 'Where is the museum?' },
        { text: 'Quali sono le attrazioni principali?', translation: 'What are the main attractions?' }
      ]
    },
    portuguese: {
      business: [
        { text: 'Qual é o seu papel na empresa?', translation: 'What is your role in the company?' },
        { text: 'Podemos discutir o contrato?', translation: 'Can we discuss the contract?' }
      ],
      vacation: [
        { text: 'Onde fica a praia mais próxima?', translation: 'Where is the nearest beach?' },
        { text: 'Quais atividades você recomenda?', translation: 'What activities do you recommend?' }
      ]
    },
    japanese: {
      work: [
        { text: 'このプロジェクトの締め切りはいつですか？', translation: 'When is the deadline for this project?', pronunciation: 'Kono pu-ro-je-ku-to no shi-me-ki-ri wa i-tsu de-su ka?' },
        { text: '会議は何時に始まりますか？', translation: 'What time does the meeting start?', pronunciation: 'Kai-gi wa nan-ji ni ha-ji-ma-ri-ma-su ka?' }
      ],
      travel: [
        { text: '駅はどこですか？', translation: 'Where is the station?', pronunciation: 'E-ki wa do-ko de-su ka?' },
        { text: 'おすすめの観光地はありますか？', translation: 'Do you have any sightseeing recommendations?', pronunciation: 'O-su-su-me no kan-ko-u-chi wa a-ri-ma-su ka?' }
      ]
    },
    korean: {
      dining: [
        { text: '메뉴를 볼 수 있을까요?', translation: 'Can I see the menu?', pronunciation: 'Me-nyu-reul bol su i-sseul-kka-yo?' },
        { text: '오늘의 추천 요리는 무엇인가요?', translation: 'What is today\'s special?', pronunciation: 'O-neul-ui chu-cheon yo-ri-neun mu-eot-in-ga-yo?' }
      ],
      shopping: [
        { text: '이것은 얼마입니까?', translation: 'How much is this?', pronunciation: 'I-geot-eun eol-ma-im-ni-kka?' },
        { text: '다른 색상이 있나요?', translation: 'Do you have this in another color?', pronunciation: 'Da-reun saek-sang-i it-na-yo?' }
      ]
    },
    russian: {
      hotel: [
        { text: 'Можно ли заказать завтрак в номер?', translation: 'Can I order breakfast to my room?', pronunciation: 'Mozh-no li za-ka-zat zav-trak v no-mer?' },
        { text: 'Какой у вас Wi-Fi пароль?', translation: 'What is your Wi-Fi password?', pronunciation: 'Ka-koy u vas Wi-Fi pa-rol?' }
      ],
      transport: [
        { text: 'Где находится ближайшая автобусная остановка?', translation: 'Where is the nearest bus stop?', pronunciation: 'Gde na-kho-dits-ya bli-zhai-sha-ya av-to-bus-na-ya os-ta-nov-ka?' },
        { text: 'Как добраться до аэропорта?', translation: 'How do I get to the airport?', pronunciation: 'Kak do-brat-sya do ae-ro-por-ta?' }
      ]
    },
    arabic: {
      market: [
        { text: 'كم سعر هذا؟', translation: 'How much is this?', pronunciation: 'Kam si\'r ha-dha?' },
        { text: 'هل لديك حجم أكبر؟', translation: 'Do you have a larger size?', pronunciation: 'Hal la-day-ka hajm ak-bar?' }
      ],
      education: [
        { text: 'ما هي المواد التي تدرسها؟', translation: 'What subjects do you teach?', pronunciation: 'Ma hi-ya al-ma-wad al-la-ti ta-dru-su-ha?' },
        { text: 'متى تبدأ الحصة؟', translation: 'When does the class start?', pronunciation: 'Ma-ta tab-da al-his-sa?' }
      ]
    },
    english: {
      general: [
        { text: 'How are you today?', translation: '' },
        { text: 'What\'s your favorite hobby?', translation: '' }
      ],
      travel: [
        { text: 'Where is the nearest train station?', translation: '' },
        { text: 'Can you recommend a good restaurant?', translation: '' }
      ]
    }
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

    const addMessage = (text, isUser) => {
        const messageId = `${text}-${isUser}`;
        if (!messageIds.has(messageId)) {
            setMessages(prev => [...prev, { text, isUser }]);
            setMessageIds(prev => new Set(prev).add(messageId));
        }
    };

    useEffect(() => {
        setMessages([]);
        setMessageIds(new Set());
        const initialMessage = welcomeMessages[scenarioLanguage] || welcomeMessages.english;
        const responses = getInitialResponses(scenarioLanguage, scenarioType);
        addMessage(initialMessage, false);
        setSuggestedResponses(responses);
    }, [scenario, addMessage, scenarioLanguage, scenarioType]);

    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [messages, suggestedResponses]);

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