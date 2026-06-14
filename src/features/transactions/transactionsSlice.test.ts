import reducer, {
  addTransaction,
  deleteTransaction,
} from './transactionsSlice';
import type { Transaction } from './types';

const mockTransaction: Transaction = {
  id: '1',
  description: 'Grocery run',
  amount: 50,
  category: 'food',
  type: 'expense',
  date: '2026-06-01',
};

describe('transactionsSlice', () => {

  it('should return the initial state', () => {
    const state = reducer(undefined, { type: '@@INIT' });
    expect(Array.isArray(state.items)).toBe(true);
  });

  it('should add a transaction', () => {
    const state = reducer({ items: [] }, addTransaction(mockTransaction));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].description).toBe('Grocery run');
    expect(state.items[0].amount).toBe(50);
  });

  it('should delete a transaction by id', () => {
    const initialState = { items: [mockTransaction] };
    const state = reducer(initialState, deleteTransaction('1'));
    expect(state.items).toHaveLength(0);
  });

  it('should not delete other transactions', () => {
    const second: Transaction = { ...mockTransaction, id: '2', description: 'Bus ticket' };
    const initialState = { items: [mockTransaction, second] };
    const state = reducer(initialState, deleteTransaction('1'));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe('2');
  });

  it('should handle multiple transactions', () => {
    let state = reducer({ items: [] }, addTransaction(mockTransaction));
    state = reducer(state, addTransaction({ ...mockTransaction, id: '2', description: 'Rent' }));
    expect(state.items).toHaveLength(2);
  });

});