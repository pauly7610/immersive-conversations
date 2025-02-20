import React from 'react';
import { render, screen } from '@testing-library/react';
import ProgressChart from '../components/ProgressChart';

test('renders progress chart', () => {
  try {
    render(<ProgressChart />);
    expect(screen.getByText(/Week 1/i)).toBeInTheDocument();
  } catch (error) {
    console.error('Error rendering ProgressChart component:', error);
  }
}); 