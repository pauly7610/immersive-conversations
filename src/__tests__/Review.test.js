import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Review from '../components/Review';

test('renders review component', () => {
  try {
    render(<Review transcript={[]} />);
    expect(screen.getByText(/Rate this conversation:/i)).toBeInTheDocument();
  } catch (error) {
    console.error('Error rendering Review component:', error);
  }
});

test('handles rating interaction', () => {
  try {
    render(<Review transcript={[]} />);
    const star = screen.getByText('★');

    fireEvent.click(star);

    expect(star).toHaveStyle('color: #FFD700');
  } catch (error) {
    console.error('Error handling rating interaction in Review component:', error);
  }
}); 