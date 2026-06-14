import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from '../features/transactions/transactionsSlice';
import AddTransactionForm from './AddTransactionForm';

const makeStore = () =>
  configureStore({ reducer: { transactions: transactionsReducer } });

const renderWithStore = () => {
  const store = makeStore();
  render(
    <Provider store={store}>
      <AddTransactionForm />
    </Provider>
  );
  return store;
};

describe('AddTransactionForm', () => {

  it('renders all form fields', () => {
    renderWithStore();
    expect(screen.getByPlaceholderText('e.g. Monthly rent payment')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('0.00')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add transaction/i })).toBeInTheDocument();
  });

  it('shows error when description is empty', () => {
    renderWithStore();
    fireEvent.click(screen.getByRole('button', { name: /add transaction/i }));
    expect(screen.getByText('Please add a description.')).toBeInTheDocument();
  });

  it('shows error when amount is invalid', () => {
    renderWithStore();
    fireEvent.change(screen.getByPlaceholderText('e.g. Monthly rent payment'), {
      target: { value: 'Coffee' },
    });
    fireEvent.click(screen.getByRole('button', { name: /add transaction/i }));
    expect(screen.getByText('Please enter a valid amount.')).toBeInTheDocument();
  });

  it('dispatches addTransaction and resets form on valid submit', () => {
    const store = renderWithStore();

    fireEvent.change(screen.getByPlaceholderText('e.g. Monthly rent payment'), {
      target: { value: 'Coffee' },
    });
    fireEvent.change(screen.getByPlaceholderText('0.00'), {
      target: { value: '3.50' },
    });
    fireEvent.click(screen.getByRole('button', { name: /add transaction/i }));

    const state = store.getState();
    expect(state.transactions.items).toHaveLength(1);
    expect(state.transactions.items[0].description).toBe('Coffee');
    expect(state.transactions.items[0].amount).toBe(3.5);
    expect(screen.getByPlaceholderText('e.g. Monthly rent payment')).toHaveValue('');
    expect(screen.getByPlaceholderText('0.00')).toHaveValue(null);
  });

  it('income toggle works', () => {
    renderWithStore();
    fireEvent.click(screen.getByRole('button', { name: /income/i }));
    expect(screen.getByRole('button', { name: /income/i })).toHaveClass('activeIncome');
  });

});