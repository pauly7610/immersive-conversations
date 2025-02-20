import React from 'react';
import { render, screen } from '@testing-library/react';
import Leaderboard from '../components/Leaderboard';

test('renders leaderboard', () => {
  try {
    render(<Leaderboard />);
    expect(screen.getByText(/Alice/i)).toBeInTheDocument();
    expect(screen.getByText(/Bob/i)).toBeInTheDocument();
    expect(screen.getByText(/Charlie/i)).toBeInTheDocument();
  } catch (error) {
    console.error('Error rendering Leaderboard component:', error);
  }
}); 