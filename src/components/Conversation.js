/* global webkitSpeechRecognition */
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { useConversation } from '../context/ConversationContext';
import { useTheme } from '../context/ThemeContext';
import { scenarios } from '../data/scenarios';
import { getTransliteration, needsTransliteration } from '../utils/transliteration';
import { fadeIn } from '../styles/StyledComponents';

const ConversationContainer = styled.div`
  max-width: ${({ theme }) => theme.container.maxWidth.md};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[4]};
  background-color: ${({ theme }) => theme.colors.light.background};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  box-shadow: ${({ theme }) => theme.shadows.md};
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
  gap: ${({ theme }) => theme.spacing[2]};
  max-height: 60vh;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing[3]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  border: 1px solid ${({ theme }) => theme.colors.light.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};
`;

const MessageBubble = styled.div`
  background-color: ${({ isUser, theme }) => 
    isUser ? theme.colors.primary.main : theme.colors.light.muted};
  color: ${({ isUser, theme }) => 
    isUser ? theme.colors.light.background : theme.colors.light.foreground};
  padding: ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  margin: ${({ theme }) => theme.spacing[2]} 0;
  max-width: 80%;
  align-self: ${({ isUser }) => isUser ? 'flex-end' : 'flex-start'};
  animation: ${fadeIn} 0.5s ease-in-out;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  box-shadow: ${({ theme }) => theme.shadows.sm};
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
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const SuggestedResponseButton = styled.button`
  background-color: ${({ theme }) => theme.colors.light.background};
  color: ${({ theme }) => theme.colors.light.foreground};
  border: 1px solid ${({ theme }) => theme.colors.light.border};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.default};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.main + '10'};
    border-color: ${({ theme }) => theme.colors.primary.main};
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

const TransliterationText = styled.div`
  font-style: italic;
  font-size: 0.9em;
  margin-top: 5px;
  color: ${({ theme }) => theme.colors.light.mutedForeground};
  border-top: 1px dashed ${({ theme }) => theme.colors.light.border};
  padding-top: 5px;
`;

const InputContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const InputField = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing[3]};
  border: 1px solid ${({ theme }) => theme.colors.light.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary.main};
    border-color: transparent;
  }
`;

const ActionButton = styled.button`
  background-color: ${({ primary, theme }) => 
    primary ? theme.colors.primary.main : theme.colors.secondary.main};
  color: white;
  padding: ${({ theme }) => theme.spacing[3]};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.default};
  
  &:hover {
    background-color: ${({ primary, theme }) => 
      primary ? theme.colors.primary.hover : theme.colors.secondary.hover};
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.light.muted};
    cursor: not-allowed;
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

// Comprehensive initial responses for all languages and scenario types
const getInitialResponses = (language, scenarioType) => {
  // Convert to lowercase for consistency
  const lang = language?.toLowerCase() || 'english';
  const type = scenarioType?.toLowerCase() || 'general';
  
  // Complete mapping of initial responses for all languages and scenarios
  const responseMap = {
    spanish: {
      food: [
        "Me gustaría ordenar paella, por favor.",
        "¿Cuál es el especial de hoy?",
        "¿Me puede traer la cuenta, por favor?"
      ],
      travel: [
        "¿Dónde está el aeropuerto?",
        "Necesito un taxi, por favor.",
        "¿Cuánto cuesta un boleto a Madrid?"
      ],
      work: [
        "Tengo una reunión a las 10.",
        "¿Podemos discutir el proyecto?",
        "Necesito enviar un correo electrónico."
      ],
      social: [
        "¿Cómo te llamas?",
        "Me gusta tu camisa.",
        "¿De dónde eres?"
      ]
    },
    french: {
      food: [
        "Je voudrais commander le plat du jour.",
        "Quelle est la spécialité du chef?",
        "L'addition, s'il vous plaît."
      ],
      travel: [
        "Où est la gare?",
        "Je cherche un hôtel.",
        "Combien coûte un billet pour Paris?"
      ],
      work: [
        "J'ai une réunion à 14h.",
        "Pouvons-nous discuter du projet?",
        "Je dois envoyer un email."
      ],
      social: [
        "Comment vous appelez-vous?",
        "J'aime votre chemise.",
        "D'où venez-vous?"
      ]
    },
    german: {
      food: [
        "Ich möchte Schnitzel bestellen, bitte.",
        "Was ist das Tagesgericht?",
        "Die Rechnung, bitte."
      ],
      travel: [
        "Wo ist der Bahnhof?",
        "Ich suche ein Hotel.",
        "Wie viel kostet eine Fahrkarte nach Berlin?"
      ],
      work: [
        "Ich habe um 11 Uhr ein Meeting.",
        "Können wir über das Projekt sprechen?",
        "Ich muss eine E-Mail senden."
      ],
      social: [
        "Wie heißen Sie?",
        "Ich mag dein Hemd.",
        "Woher kommen Sie?"
      ]
    },
    italian: {
      food: [
        "Vorrei ordinare la pasta, per favore.",
        "Qual è il piatto del giorno?",
        "Il conto, per favore."
      ],
      travel: [
        "Dov'è la stazione?",
        "Sto cercando un albergo.",
        "Quanto costa un biglietto per Roma?"
      ],
      work: [
        "Ho una riunione alle 10.",
        "Possiamo discutere del progetto?",
        "Devo inviare un'email."
      ],
      social: [
        "Come ti chiami?",
        "Mi piace la tua camicia.",
        "Di dove sei?"
      ]
    },
    portuguese: {
      food: [
        "Eu gostaria de pedir bacalhau, por favor.",
        "Qual é o prato do dia?",
        "A conta, por favor."
      ],
      travel: [
        "Onde fica a estação?",
        "Estou procurando um hotel.",
        "Quanto custa uma passagem para Lisboa?"
      ],
      work: [
        "Tenho uma reunião às 10h.",
        "Podemos discutir o projeto?",
        "Preciso enviar um e-mail."
      ],
      social: [
        "Como você se chama?",
        "Gosto da sua camisa.",
        "De onde você é?"
      ]
    },
    japanese: {
      food: [
        "寿司を注文したいです。",
        "今日のおすすめは何ですか？",
        "お会計をお願いします。"
      ],
      travel: [
        "駅はどこですか？",
        "ホテルを探しています。",
        "東京までの切符はいくらですか？"
      ],
      work: [
        "10時に会議があります。",
        "プロジェクトについて話し合えますか？",
        "メールを送る必要があります。"
      ],
      social: [
        "お名前は何ですか？",
        "そのシャツが好きです。",
        "どこから来ましたか？"
      ]
    },
    korean: {
      food: [
        "비빔밥을 주문하고 싶습니다.",
        "오늘의 특선 요리는 무엇인가요?",
        "계산서 부탁드립니다."
      ],
      travel: [
        "역이 어디에 있나요?",
        "호텔을 찾고 있습니다.",
        "서울까지 티켓은 얼마인가요?"
      ],
      work: [
        "10시에 회의가 있습니다.",
        "프로젝트에 대해 논의할 수 있을까요?",
        "이메일을 보내야 합니다."
      ],
      social: [
        "이름이 뭐예요?",
        "셔츠가 마음에 들어요.",
        "어디에서 왔어요?"
      ]
    },
    russian: {
      food: [
        "Я хотел бы заказать борщ, пожалуйста.",
        "Какое у вас фирменное блюдо?",
        "Счет, пожалуйста."
      ],
      travel: [
        "Где находится вокзал?",
        "Я ищу гостиницу.",
        "Сколько стоит билет до Москвы?"
      ],
      work: [
        "У меня встреча в 10 часов.",
        "Можем ли мы обсудить проект?",
        "Мне нужно отправить электронное письмо."
      ],
      social: [
        "Как вас зовут?",
        "Мне нравится ваша рубашка.",
        "Откуда вы?"
      ]
    },
    arabic: {
      food: [
        "أود أن أطلب الكسكس من فضلك.",
        "ما هو طبق اليوم؟",
        "الحساب من فضلك."
      ],
      travel: [
        "أين المحطة؟",
        "أبحث عن فندق.",
        "كم تكلفة تذكرة إلى القاهرة؟"
      ],
      work: [
        "لدي اجتماع في الساعة 10.",
        "هل يمكننا مناقشة المشروع؟",
        "أحتاج إلى إرسال بريد إلكتروني."
      ],
      social: [
        "ما هو اسمك؟",
        "أحب قميصك.",
        "من أين أنت؟"
      ]
    },
    english: {
      food: [
        "I'd like to order the special, please.",
        "What do you recommend?",
        "Could I see the dessert menu?"
      ],
      travel: [
        "Where is the nearest subway station?",
        "I need directions to the museum.",
        "How much is a taxi to the airport?"
      ],
      work: [
        "I have a meeting at 10 AM.",
        "Can we discuss the project timeline?",
        "I need to send an important email."
      ],
      social: [
        "What's your name?",
        "I like your shirt.",
        "Where are you from?"
      ]
    }
  };
  
  // Default responses if specific ones aren't available
  const defaultResponses = [
    "I'm not sure how to respond.",
    "Could you help me with this conversation?",
    "Let's continue the conversation."
  ];
  
  // Try to get language-specific and scenario-specific responses
  // Fall back to defaults if not available
  return responseMap[lang]?.[type] || defaultResponses;
};

const Conversation = ({ scenarioId, scenario: propScenario, onConversationEnd }) => {
  const { selectedScenario } = useConversation();
    const navigate = useNavigate();
  const [scenario, setScenario] = useState(null);
    const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
    const [suggestedResponses, setSuggestedResponses] = useState([]);
    const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(true);
  const [apiLoading, setApiLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const { theme } = useTheme();

  // Load the scenario
  useEffect(() => {
    console.log('Conversation component mounted with props:', { scenarioId, propScenario });
    
    try {
      let scenarioData = null;
      
      if (propScenario) {
        scenarioData = propScenario;
      } else if (scenarioId) {
        const foundScenario = scenarios.find(s => s.id === parseInt(scenarioId));
        if (!foundScenario) {
          throw new Error(`Scenario with ID ${scenarioId} not found`);
        }
        scenarioData = foundScenario;
      } else if (selectedScenario) {
        scenarioData = selectedScenario;
      } else {
        throw new Error("No scenario provided");
      }
      
      setScenario(scenarioData);
      console.log('Scenario loaded successfully:', scenarioData);
      
      // Initialize with welcome message and AI first message
      const language = scenarioData.language?.toLowerCase() || 'english';
      const welcomeMessage = welcomeMessages[language] || welcomeMessages.english;
      
      // Get initial AI message based on scenario type
      let initialAIMessage = '';
      
      switch (scenarioData.type) {
        case 'food':
          initialAIMessage = language === 'spanish' 
            ? '¡Hola! ¿Qué le gustaría ordenar hoy?' 
            : 'Hello! What would you like to order today?';
          break;
        case 'travel':
          initialAIMessage = language === 'spanish'
            ? '¡Hola! ¿En qué puedo ayudarle con su viaje?'
            : 'Hello! How can I help you with your travel?';
          break;
        case 'work':
        case 'job':
          initialAIMessage = language === 'spanish'
            ? 'Buenos días. Bienvenido a la entrevista.'
            : 'Good morning. Welcome to the interview.';
          break;
        case 'social':
          initialAIMessage = language === 'spanish'
            ? '¡Hola! Es un placer conocerte.'
            : 'Hello! It\'s nice to meet you.';
          break;
        default:
          initialAIMessage = language === 'spanish'
            ? '¡Hola! ¿Cómo puedo ayudarte hoy?'
            : 'Hello! How can I help you today?';
      }
      
      setMessages([
        { text: welcomeMessage, isUser: false, isWelcome: true },
        { text: initialAIMessage, isUser: false }
      ]);
      
      // Load initial suggested responses
      const initialResponses = getInitialResponses(language, scenarioData.type);
      setSuggestedResponses(initialResponses);
      
    } catch (err) {
      console.error('Error loading scenario:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [propScenario, scenarioId, selectedScenario]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Add a new message to the conversation
    const addMessage = (text, isUser) => {
            setMessages(prev => [...prev, { text, isUser }]);
    
    // If it's a user message, generate AI response
    if (isUser) {
      generateAIResponse(text);
    }
  };

  // Handle speech recognition
  const startListening = () => {
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      alert('Speech recognition is not supported in your browser. Try Chrome or Edge.');
      return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = getLanguageCode(scenario.language);
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onstart = () => {
      setIsListening(true);
    };
    
        recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      addMessage(transcript, true);
    };
    
    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.start();
    };

  // Handle suggested response click
    const handleSuggestedResponse = (response) => {
    addMessage(response, true);
    };

  // Generate AI response based on conversation context
    const generateAIResponse = async (userMessage) => {
    try {
      setLoading(true);
      
      const response = await fetch('/api/huggingface', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'distilgpt2',
          inputs: userMessage,
          parameters: {
            max_length: 150,
            temperature: 0.7,
          },
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      const aiResponse = data[0]?.generated_text || 'I\'m not sure how to respond to that.';
      
      // Process the response
      addMessage(aiResponse, false);
      
      // Generate suggested responses based on the AI response
      await generateSuggestedResponses(aiResponse);
    } catch (error) {
      console.error('Error generating response:', error);
      setError(error.message);
      addMessage("Sorry, I couldn't generate a response. Please try again.", false);
    } finally {
      setLoading(false);
    }
  };

  // Generate new suggested responses based on conversation context
  const generateSuggestedResponses = async (aiResponse) => {
    try {
      const response = await fetch('/api/huggingface', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'distilgpt2',
          inputs: aiResponse,
          parameters: {
            max_length: 200,
            temperature: 0.7,
          },
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      const generatedText = data[0]?.generated_text || '';
      
      // Try to extract JSON array from the response
      try {
        // Look for anything that looks like a JSON array in the response
        const jsonMatch = generatedText.match(/\[.*\]/s);
        
        if (jsonMatch) {
          const jsonStr = jsonMatch[0];
          const parsedResponses = JSON.parse(jsonStr);
          
          if (Array.isArray(parsedResponses) && parsedResponses.length > 0) {
            setSuggestedResponses(parsedResponses);
            return;
          }
        }
        
        // If we couldn't parse JSON, extract lines that look like responses
        const lines = generatedText.split('\n')
          .map(line => line.trim())
          .filter(line => line.length > 0 && !line.startsWith('[') && !line.startsWith(']'))
          .map(line => line.replace(/^["']|["']$/g, '').replace(/^[0-9]+[.:]/, '').trim())
          .filter(line => line.length > 0);
        
        if (lines.length > 0) {
          setSuggestedResponses(lines.slice(0, 3));
          return;
        }
      } catch (jsonError) {
        console.error('Error parsing suggested responses:', jsonError);
      }
      
      // Fall back to static responses if parsing fails
      const language = scenario.language?.toLowerCase() || 'english';
      const staticResponses = getInitialResponses(language, scenario.type);
      setSuggestedResponses(staticResponses);
      
    } catch (error) {
      console.error('Error generating suggested responses:', error);
      
      // Fall back to static responses
      const language = scenario.language?.toLowerCase() || 'english';
      const staticResponses = getInitialResponses(language, scenario.type);
      setSuggestedResponses(staticResponses);
    }
  };

  // Handle form submission
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (inputText.trim() === '') return;
    
    addMessage(inputText, true);
    setInputText('');
    generateAIResponse(inputText);
  }, [inputText, addMessage, generateAIResponse]);

  // Handle end conversation
    const handleEndConversation = () => {
    if (onConversationEnd) {
      onConversationEnd(messages);
    }
    navigate('/review', { state: { transcript: messages } });
  };

  // Memoize expensive computations and callbacks
  const getLanguageCode = useCallback((language) => {
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
  }, []);

  // Use React.memo for child components that don't need to re-render often
  const SuggestedResponse = React.memo(({ text, onClick }) => (
    <button 
      onClick={() => onClick(text)}
      className="suggested-response"
    >
      {text}
    </button>
  ));

  // Use useMemo for expensive renders
  const renderedMessages = useMemo(() => {
    return messages.map((message, index) => renderMessage(message, index));
  }, [messages, renderMessage]);

  // Render a message with transliteration if needed
  const renderMessage = (message) => {
    const showTransliteration = !message.isUser && 
      needsTransliteration(scenario.language) && 
      message.text.trim() !== '';
    
    const transliteration = showTransliteration 
      ? getTransliteration(message.text, scenario.language)
      : '';
    
    return (
      <div 
        style={{
          backgroundColor: message.isUser 
            ? theme.colors.primary.main 
            : message.isWelcome 
              ? theme.colors.light.muted 
              : theme.colors.primary.main,
          color: message.isUser || message.isWelcome ? 'black' : 'white',
          padding: theme.spacing[2],
          borderRadius: theme.borderRadius.default,
          marginBottom: theme.spacing[2],
          maxWidth: '80%',
          marginLeft: message.isUser ? 'auto' : '0',
          marginRight: message.isUser ? '0' : 'auto'
        }}
      >
        <div>{message.text}</div>
        
        {showTransliteration && transliteration && (
          <TransliterationText theme={theme}>
            How to pronounce: {transliteration}
          </TransliterationText>
        )}
      </div>
    );
  };

  // Show loading state
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h2>Loading conversation...</h2>
        <p>Preparing your language practice session</p>
      </div>
    );
  }
  
  // Show error state
  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h2>Error loading conversation</h2>
        <p>{error}</p>
        <button 
          onClick={() => navigate('/')}
          style={{
            backgroundColor: theme.colors.primary.main,
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '20px'
          }}
        >
          Return to Scenarios
        </button>
      </div>
    );
    }

    return (
    <div>
                <h2>{scenario.title}</h2>
      <p>{scenario.description}</p>
      
      {/* Messages container */}
      <div 
        style={{ 
          height: '400px', 
          overflowY: 'auto',
          border: `1px solid ${theme.colors.light.border}`,
          borderRadius: theme.borderRadius.default,
          padding: theme.spacing[3],
          marginBottom: theme.spacing[4]
        }}
      >
        {renderedMessages}
        <div ref={messagesEndRef} />
        
        {apiLoading && (
          <div style={{ textAlign: 'center', padding: '10px' }}>
            <p>AI is thinking...</p>
          </div>
        )}
      </div>
      
      {/* Input form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: theme.spacing[4] }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Type your response in ${scenario.language}...`}
            style={{ 
              flex: 1,
              padding: '10px',
              borderRadius: theme.borderRadius.default,
              border: `1px solid ${theme.colors.light.border}`
            }}
          />
          <button
            type="submit"
            disabled={!inputText.trim() || apiLoading}
            style={{
              backgroundColor: theme.colors.primary.main,
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: theme.borderRadius.default,
              cursor: inputText.trim() && !apiLoading ? 'pointer' : 'not-allowed',
              opacity: inputText.trim() && !apiLoading ? 1 : 0.7
            }}
          >
            Send
          </button>
          <button
            type="button"
                        onClick={startListening} 
            disabled={isListening || apiLoading}
            style={{
              backgroundColor: isListening ? 'red' : theme.colors.secondary.main,
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: theme.borderRadius.default,
              cursor: !isListening && !apiLoading ? 'pointer' : 'not-allowed',
              opacity: !isListening && !apiLoading ? 1 : 0.7
            }}
          >
            {isListening ? 'Listening...' : 'Speak'}
          </button>
        </div>
      </form>
      
      {/* Suggested responses with transliteration */}
      <div>
        <h3>Suggested Responses:</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: theme.spacing[4] }}>
          {suggestedResponses.map((response, index) => {
            const showTransliteration = needsTransliteration(scenario.language);
            const transliteration = showTransliteration 
              ? getTransliteration(response, scenario.language)
              : '';
              
            return (
              <SuggestedResponse
                key={index}
                text={response}
                onClick={handleSuggestedResponse}
              />
            );
          })}
        </div>
      </div>
      
      {/* End conversation button */}
      <button
        onClick={handleEndConversation}
        style={{
          backgroundColor: theme.colors.accent.red,
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: theme.borderRadius.default,
          cursor: 'pointer'
        }}
      >
                        End Conversation
      </button>
    </div>
    );
};

export default Conversation;