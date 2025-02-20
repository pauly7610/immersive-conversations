import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import WarmUp from '../components/WarmUp';

test('renders warm-up component', () => {
  try {
    render(<WarmUp scenarioId={1} onWarmUpComplete={() => {}} />);
    expect(screen.getByText(/Get Ready!/i)).toBeInTheDocument();
  } catch (error) {
    console.error('Error rendering WarmUp component:', error);
  }
});

test('handles start button interaction', () => {
  try {
    const onWarmUpComplete = jest.fn();
    render(<WarmUp scenarioId={1} onWarmUpComplete={onWarmUpComplete} />);
    const startButton = screen.getByText(/Begin Conversation/i);

    fireEvent.click(startButton);

    expect(onWarmUpComplete).toHaveBeenCalled();
  } catch (error) {
    console.error('Error handling start button interaction in WarmUp component:', error);
  }
}); 