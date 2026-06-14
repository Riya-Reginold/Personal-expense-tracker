import { useState } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../app/store';
import { addTransaction } from '../features/transactions/transactionsSlice';
import type { Category, TransactionType } from '../features/transactions/types';
import styles from './AddTransactionForm.module.css';

const CATEGORIES: Category[] = [
  'food', 'transport', 'salary', 'shopping', 'bills', 'entertainment', 'other'
];

function AddTransactionForm() {
  const dispatch = useDispatch<AppDispatch>();

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>('other');
  const [type, setType] = useState<TransactionType>('expense');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return setError('Please add a description.');
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0)
      return setError('Please enter a valid amount.');

    dispatch(addTransaction({
      id: crypto.randomUUID(),
      description: description.trim(),
      amount: parseFloat(amount),
      category,
      type,
      date,
    }));

    setDescription('');
    setAmount('');
    setCategory('other');
    setType('expense');
    setDate(new Date().toISOString().split('T')[0]);
    setError('');
  };

  const getToggleClass = (t: TransactionType) => {
    if (type !== t) return styles.toggleBtn;
    return `${styles.toggleBtn} ${t === 'income' ? styles.activeIncome : styles.activeExpense}`;
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Add transaction</h2>

      <form onSubmit={handleSubmit}>

        {/* Income / Expense toggle */}
        <div className={styles.toggleGroup}>
          {(['expense', 'income'] as TransactionType[]).map(t => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={getToggleClass(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Description */}
        <div className={styles.field}>
          <label className={styles.label}>Description</label>
          <input
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="e.g. Monthly rent payment"
            className={styles.input}
          />
        </div>

        {/* Amount + Category */}
        <div className={styles.row}>
          <div>
            <label className={styles.label}>Amount (€)</label>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="0.00"
              min="0"
              step="0.01"
              className={styles.input}
            />
          </div>
          <div>
            <label className={styles.label}>Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value as Category)}
              className={styles.input}
            >
              {CATEGORIES.map(c => (
                <option key={c} value={c}>
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Date */}
        <div className={styles.field}>
          <label className={styles.label}>Date</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className={styles.input}
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.submitBtn}>
          Add transaction
        </button>

      </form>
    </div>
  );
}

export default AddTransactionForm;