import  { createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Transaction } from './types';

interface TransactionsState {
  items: Transaction[];
}

const loadFromStorage = (): Transaction[] => {
  try {
    const data = localStorage.getItem('transactions');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const initialState: TransactionsState = {
  items: loadFromStorage(),
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction(state, action: PayloadAction<Transaction>) {
      state.items.push(action.payload);
      localStorage.setItem('transactions', JSON.stringify(state.items));
    },
    deleteTransaction(state, action: PayloadAction<string>) {
      state.items = state.items.filter(t => t.id !== action.payload);
      localStorage.setItem('transactions', JSON.stringify(state.items));
    },
  },
});

export const { addTransaction, deleteTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;