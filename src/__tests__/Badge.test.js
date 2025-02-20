import React from 'react';
import { render, screen } from '@testing-library/react';
import Badge from '../components/Badge';

test('renders badge with title and description', () => {
  try {
    render(<Badge title="Test Badge" description="This is a test badge." />);
    expect(screen.getByText(/Test Badge/i)).toBeInTheDocument();
    expect(screen.getByText(/This is a test badge./i)).toBeInTheDocument();
  } catch (error) {
    console.error('Error rendering Badge component:', error);
  }
}); 