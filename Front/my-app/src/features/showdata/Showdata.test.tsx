// src/features/showdata/Showdata.test.tsx

import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import JournalData from './Showdata';
import { store } from '../../app/store';

// Mock the axios module
jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({})),
}));

// Mock ResizeObserver
class ResizeObserverMock {
  constructor(callback: ResizeObserverCallback) {}
  observe() {}
  unobserve() {}
  disconnect() {} // Add the missing disconnect property
}

window.ResizeObserver = ResizeObserverMock;

test('renders the JournalData component', () => {
  // Wrap the component with Provider and pass the store
  const { getByText, getByTestId } = render(
    <Provider store={store}>
      <JournalData />
    </Provider>
  );

  // Test if the main heading is present
  const mainHeading = getByText('Your Trading Journal Data');
  expect(mainHeading).toBeInTheDocument();

  // Test if the profit summary section is present
  const profitSummaryTitle = getByText('Profit Summary');
  expect(profitSummaryTitle).toBeInTheDocument();

  // Test if the profit or loss by strategy section is present
  const profitLossByStrategyTitle = getByText('Profit or Loss by Strategy');
  expect(profitLossByStrategyTitle).toBeInTheDocument();

  // Test if the profit or loss over trades section is present
  const profitLossOverTradesTitle = getByText('Profit or Loss over Trades');
  expect(profitLossOverTradesTitle).toBeInTheDocument();

  // Test if the winning & losing trades section is present
  const winningLosingTradesTitle = getByText('Winning & Losing Trades');
  expect(winningLosingTradesTitle).toBeInTheDocument();

  // You can add more specific assertions for individual elements if needed
  // For example, you can test the presence of specific data or chart elements
  // using getByTestId or other queries based on your component structure
});
