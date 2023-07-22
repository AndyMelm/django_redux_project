// src/features/footer/Donations.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import Donations from './Donations';

test('renders the Donations component', () => {
  render(<Donations />);
  const donationsElement = screen.getByTestId('donations-title');
  expect(donationsElement).toBeInTheDocument();
  expect(
    screen.getByText(/We are constantly upgrading and planning to build new features./)
  ).toBeInTheDocument();
});
