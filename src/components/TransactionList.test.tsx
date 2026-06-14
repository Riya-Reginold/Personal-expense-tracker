import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer, { addTransaction } from '../features/transactions/transactionsSlice';
import TransactionList from './TransactionList';
import type { Transaction } from '../features/transactions/types';

const makeStore = (transactions: Transaction[] = []) => {
  const store = configureStore({ reducer: { transactions: transactionsReducer } });
  transactions.forEach(t => store.dispatch(addTransaction(t)));
  return store;
};

const renderWithStore = (transactions: Transaction[] = [], compact = false) => {
  const store = makeStore(transactions);
  render(
    <Provider store={store}>
      <TransactionList compact={compact} />
    </Provider>
  );
  return store;
};

describe('TransactionList', () => {

  it('shows empty state when no transactions', () => {
    renderWithStore();
    expect(screen.getByText('No transactions yet — add one above!')).toBeInTheDocument();
  });

  it('renders transactions correctly', () => {
    renderWithStore([
      { id: '1', description: 'Coffee', amount: 3.5, category: 'food', type: 'expense', date: '2026-06-01' },
    ]);
    expect(screen.getByText('Coffee')).toBeInTheDocument();
    expect(screen.getByText('-€3.50')).toBeInTheDocument();
  });

  it('shows only 5 transactions in compact mode', () => {
    const transactions: Transaction[] = Array.from({ length: 8 }, (_, i) => ({
      id: String(i),
      description: `Transaction ${i}`,
      amount: 10,
      category: 'food',
      type: 'expense',
      date: '2026-06-01',
    }));
    renderWithStore(transactions, true);
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(5);
  });

  it('hides delete button in compact mode', () => {
    renderWithStore([
      { id: '1', description: 'Coffee', amount: 3.5, category: 'food', type: 'expense', date: '2026-06-01' },
    ], true);
    expect(screen.queryByLabelText('Delete transaction')).not.toBeInTheDocument();
  });

  it('deletes a transaction when delete button clicked', () => {
    const store = renderWithStore([
      { id: '1', description: 'Coffee', amount: 3.5, category: 'food', type: 'expense', date: '2026-06-01' },
    ]);
    fireEvent.click(screen.getByLabelText('Delete transaction'));
    expect(store.getState().transactions.items).toHaveLength(0);
  });

  it('hides filters in compact mode', () => {
    renderWithStore([], true);
    expect(screen.queryByText('All types')).not.toBeInTheDocument();
  });

  it('shows filters in full mode', () => {
    renderWithStore([]);
    expect(screen.getByText('All types')).toBeInTheDocument();
  });

});