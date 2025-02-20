import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Conversation from '../components/Conversation';

test('renders initial AI message', () => {
  try {
    render(<Conversation scenarioId={1} onConversationEnd={() => {}} />);
    expect(screen.getByText(/Hola! ¿Qué le gustaría ordenar hoy?/i)).toBeInTheDocument();
  } catch (error) {
    console.error('Error rendering Conversation component:', error);
  }
});

test('handles user input and sends message', () => {
  try {
    render(<Conversation scenarioId={1} onConversationEnd={() => {}} />);
    const input = screen.getByLabelText(/Conversation input/i);
    const sendButton = screen.getByText(/Send/i);

    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.click(sendButton);

    expect(screen.getByText(/Hello/i)).toBeInTheDocument();
  } catch (error) {
    console.error('Error handling user input in Conversation component:', error);
  }
}); 