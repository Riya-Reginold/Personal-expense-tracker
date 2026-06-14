import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer, { addTransaction } from '../features/transactions/transactionsSlice';
import Summary from './Summary';
import type { Transaction } from '../features/transactions/types';

const makeStore = (transactions: Transaction[] = []) => {
  const store = configureStore({ reducer: { transactions: transactionsReducer } });
  transactions.forEach(t => store.dispatch(addTransaction(t)));
  return store;
};

describe('Summary', () => {

  it('shows zero balances with no transactions', () => {
    render(<Provider store={makeStore()}><Summary /></Provider>);
    expect(screen.getByText('+€0.00')).toBeInTheDocument();
    expect(screen.getByText('-€0.00')).toBeInTheDocument();
    expect(screen.getByText('€0.00')).toBeInTheDocument();
  });

  it('shows income label', () => {
    render(<Provider store={makeStore()}><Summary /></Provider>);
    expect(screen.getByText('Income')).toBeInTheDocument();
    expect(screen.getByText('Expenses')).toBeInTheDocument();
    expect(screen.getByText('Balance')).toBeInTheDocument();
  });

  it('calculates income correctly', () => {
    const store = makeStore([
      { id: '1', description: 'Salary', amount: 3000, category: 'salary', type: 'income', date: '2026-06-01' },
    ]);
    render(<Provider store={store}><Summary /></Provider>);
    expect(screen.getByText('+€3000.00')).toBeInTheDocument();
  });

  it('calculates expenses correctly', () => {
    const store = makeStore([
      { id: '1', description: 'Rent', amount: 1000, category: 'bills', type: 'expense', date: '2026-06-01' },
    ]);
    render(<Provider store={store}><Summary /></Provider>);
    expect(screen.getByText('-€1000.00')).toBeInTheDocument();
  });

  it('calculates balance correctly', () => {
    const store = makeStore([
      { id: '1', description: 'Salary', amount: 3000, category: 'salary', type: 'income', date: '2026-06-01' },
      { id: '2', description: 'Rent', amount: 1000, category: 'bills', type: 'expense', date: '2026-06-02' },
    ]);
    render(<Provider store={store}><Summary /></Provider>);
    expect(screen.getByText('€2000.00')).toBeInTheDocument();
  });

});