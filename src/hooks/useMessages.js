import { useState, useCallback } from 'react';

export const useMessages = () => {
  const [messages, setMessages] = useState([]);
  const [currentRequestId, setCurrentRequestId] = useState(null);

  const renderMessage = useCallback((message) => {
    // Rendering logic for messages
    return (
      <div key={message.id} className={message.isUser ? 'user-message' : 'ai-message'}>
        {message.text}
      </div>
    );
  }, []);

  const generateAIResponse = async (userMessage) => {
    const requestId = Date.now();
    setCurrentRequestId(requestId);
    
    // API call would go here
    // const response = await fetchAIResponse(userMessage);
    const response = "This is a placeholder AI response";
    
    // Only update if this is still the most recent request
    if (requestId === currentRequestId) {
      setMessages(prevMessages => [...prevMessages, { text: response, isUser: false, id: Date.now() }]);
    }
  };

  return { messages, setMessages, renderMessage, generateAIResponse };
}; 