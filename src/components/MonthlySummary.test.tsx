import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer, { addTransaction } from '../features/transactions/transactionsSlice';
import MonthlySummary from './MonthlySummary';
import type { Transaction } from '../features/transactions/types';

const makeStore = (transactions: Transaction[] = []) => {
  const store = configureStore({ reducer: { transactions: transactionsReducer } });
  transactions.forEach(t => store.dispatch(addTransaction(t)));
  return store;
};

const currentDate = new Date().toISOString().split('T')[0];

describe('MonthlySummary', () => {

  it('renders the title', () => {
    render(<Provider store={makeStore()}><MonthlySummary /></Provider>);
    expect(screen.getByText('Monthly summary')).toBeInTheDocument();
  });

  it('shows zero transactions when empty', () => {
    render(<Provider store={makeStore()}><MonthlySummary /></Provider>);
    expect(screen.getByText('0 this month')).toBeInTheDocument();
  });

  it('shows correct transaction count', () => {
    const store = makeStore([
      { id: '1', description: 'Rent', amount: 850, category: 'bills', type: 'expense', date: currentDate },
      { id: '2', description: 'Coffee', amount: 3.5, category: 'food', type: 'expense', date: currentDate },
    ]);
    render(<Provider store={store}><MonthlySummary /></Provider>);
    expect(screen.getByText('2 this month')).toBeInTheDocument();
  });

  it('shows top category correctly', () => {
    const store = makeStore([
      { id: '1', description: 'Rent', amount: 850, category: 'bills', type: 'expense', date: currentDate },
      { id: '2', description: 'Coffee', amount: 3.5, category: 'food', type: 'expense', date: currentDate },
    ]);
    render(<Provider store={store}><MonthlySummary /></Provider>);
    expect(screen.getByText('Bills')).toBeInTheDocument();
  });

  it('shows biggest expense description', () => {
    const store = makeStore([
      { id: '1', description: 'Monthly rent', amount: 850, category: 'bills', type: 'expense', date: currentDate },
      { id: '2', description: 'Coffee', amount: 3.5, category: 'food', type: 'expense', date: currentDate },
    ]);
    render(<Provider store={store}><MonthlySummary /></Provider>);
    expect(screen.getByText('Monthly rent')).toBeInTheDocument();
  });

  it('shows month progress bar', () => {
    render(<Provider store={makeStore()}><MonthlySummary /></Provider>);
    expect(screen.getByText(/days/)).toBeInTheDocument();
  });

});