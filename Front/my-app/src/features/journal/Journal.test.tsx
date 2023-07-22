// src/features/journal/Journal.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Journal from './Journal';
import { getAllJournals, createJournalEntry, updateJournalEntry, deleteJournalEntry, updateViewJournal, selectJournals } from './journalSlice';

// Mock the Redux store
const mockStore = configureStore([]);
const store = mockStore({
  journal: {
    journals: [
      {
        id: 1,
        strategy: 'Test Strategy',
        entryprice: 100,
        exitprice: 150,
        position: 'Long',
        description: 'Test Description',
        instrument: 'Test Instrument',
        date: '01-01-2023',
        time: '12:00',
        image: null,
        user: 1,
        quantity: 10,
        winorlose: 'Win',
      },
    ],
  },
});

test('renders the Journal component', () => {
  render(
    <Provider store={store}>
      <Journal />
    </Provider>
  );

  // Check if the header is rendered
  expect(screen.getByRole('heading', { level: 1, name: /Journal/i })).toBeInTheDocument();

  // Check if the "Add Trade" button is rendered
  expect(screen.getByRole('button', { name: /Add Trade/i })).toBeInTheDocument();

  // Check if the journal entry is rendered
  expect(screen.getByText(/Test Strategy/i)).toBeInTheDocument();
  expect(screen.getByText(/Test Description/i)).toBeInTheDocument();
  expect(screen.getByText(/Test Instrument/i)).toBeInTheDocument();
  expect(screen.getByText(/01-01-2023/i)).toBeInTheDocument();
  expect(screen.getByText(/12:00/i)).toBeInTheDocument();
  expect(screen.getByText(/10/i)).toBeInTheDocument();
  expect(screen.getByText(/Win/i)).toBeInTheDocument();

  // Check if the "View" button is rendered
  expect(screen.getByRole('button', { name: /View/i })).toBeInTheDocument();

  // Check if the "Delete" button is rendered
  expect(screen.getByRole('button', { name: /Delete/i })).toBeInTheDocument();
});

test('renders the add trade form when clicking "Add Trade" button', () => {
  render(
    <Provider store={store}>
      <Journal />
    </Provider>
  );

  // Check if the add trade form is not rendered initially
  expect(screen.queryByLabelText(/Strategy/i)).not.toBeInTheDocument();
  expect(screen.queryByLabelText(/Instrument/i)).not.toBeInTheDocument();
  expect(screen.queryByLabelText(/Date/i)).not.toBeInTheDocument();
  expect(screen.queryByLabelText(/Time/i)).not.toBeInTheDocument();
  expect(screen.queryByLabelText(/Position/i)).not.toBeInTheDocument();
  expect(screen.queryByLabelText(/Entry Price/i)).not.toBeInTheDocument();
  expect(screen.queryByLabelText(/Exit Price/i)).not.toBeInTheDocument();
  expect(screen.queryByLabelText(/Quantity/i)).not.toBeInTheDocument();
  expect(screen.queryByLabelText(/Win or Lose/i)).not.toBeInTheDocument();
  expect(screen.queryByLabelText(/Description/i)).not.toBeInTheDocument();
  expect(screen.queryByLabelText(/Image/i)).not.toBeInTheDocument();

  // Click on the "Add Trade" button
  fireEvent.click(screen.getByRole('button', { name: /Add Trade/i }));

  // Check if the add trade form is rendered after clicking the button
  expect(screen.getByLabelText(/Strategy/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Instrument/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Time/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Position/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Entry Price/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Exit Price/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Quantity/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Win or Lose/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Image/i)).toBeInTheDocument();
});

test('shows correct journal entry details when clicking "View" button', () => {
  render(
    <Provider store={store}>
      <Journal />
    </Provider>
  );

  // Click on the "View" button
  fireEvent.click(screen.getByRole('button', { name: /View/i }));

  // Check if the view details form is rendered after clicking the button
  expect(screen.getByLabelText(/Strategy/i)).toHaveValue('Test Strategy');
  expect(screen.getByLabelText(/Instrument/i)).toHaveValue('Test Instrument');
  expect(screen.getByLabelText(/Date/i)).toHaveValue('01-01-2023');
  expect(screen.getByLabelText(/Time/i)).toHaveValue('12:00');
  expect(screen.getByLabelText(/Position/i)).toHaveValue('Long');
  expect(screen.getByLabelText(/Entry Price/i)).toHaveValue('100');
  expect(screen.getByLabelText(/Exit Price/i)).toHaveValue('150');
  expect(screen.getByLabelText(/Quantity/i)).toHaveValue('10');
  expect(screen.getByLabelText(/Win or Lose/i)).toHaveValue('Win');
  expect(screen.getByLabelText(/Description/i)).toHaveValue('Test Description');
});

// Add more test cases as needed

