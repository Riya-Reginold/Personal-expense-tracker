import type { Category, TransactionType } from '../features/transactions/types';
import styles from './Filters.module.css';

const CATEGORIES: Category[] = [
  'food', 'transport', 'salary', 'shopping', 'bills', 'entertainment', 'other'
];

export interface FilterState {
  category: Category | 'all';
  type: TransactionType | 'all';
}

interface FiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

function Filters({ filters, onChange }: FiltersProps) {
  const handleReset = () => onChange({ category: 'all', type: 'all' });

  const isActive = filters.category !== 'all' || filters.type !== 'all';

  return (
    <div className={styles.container}>

      <select
        className={styles.select}
        value={filters.type}
        onChange={e =>
          onChange({ ...filters, type: e.target.value as TransactionType | 'all' })
        }
      >
        <option value="all">All types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select
        className={styles.select}
        value={filters.category}
        onChange={e =>
          onChange({ ...filters, category: e.target.value as Category | 'all' })
        }
      >
        <option value="all">All categories</option>
        {CATEGORIES.map(c => (
          <option key={c} value={c}>
            {c.charAt(0).toUpperCase() + c.slice(1)}
          </option>
        ))}
      </select>

      {isActive && (
        <button className={styles.resetBtn} onClick={handleReset}>
          Clear filters
        </button>
      )}

    </div>
  );
}

export default Filters;