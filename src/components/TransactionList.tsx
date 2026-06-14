import { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../app/store';
import { deleteTransaction } from '../features/transactions/transactionsSlice';
import Filters from './Filters';
import type { FilterState } from './Filters';
import {
  CATEGORY_ICONS,
  CATEGORY_COLORS,
  CATEGORY_ICON_COLORS,
} from '../features/transactions/types';
import type { Category } from '../features/transactions/types';
import styles from './TransactionList.module.css';

interface Props {
  compact?: boolean;
}

function TransactionList({ compact = false }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const transactions = useSelector((state: RootState) => state.transactions.items);

  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    type: 'all',
  });

  const filtered = useMemo(() => {
    return [...transactions]
      .filter(t => filters.type === 'all' || t.type === filters.type)
      .filter(t => filters.category === 'all' || t.category === filters.category)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, compact ? 5 : undefined);
  }, [transactions, filters, compact]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {compact ? 'Recent transactions' : 'Transactions'}
      </h2>

      {!compact && <Filters filters={filters} onChange={setFilters} />}

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          {transactions.length === 0
            ? 'No transactions yet — add one above!'
            : 'No transactions match your filters.'}
        </div>
      ) : (
        <ul className={styles.list}>
          {filtered.map(transaction => {
            const CategoryIcon = CATEGORY_ICONS[transaction.category as Category];
            const bgColor = CATEGORY_COLORS[transaction.category as Category];
            const iconColor = CATEGORY_ICON_COLORS[transaction.category as Category];

            return (
              <li key={transaction.id} className={styles.item}>
                <div className={styles.itemLeft}>
                  <div
                    className={styles.iconWrap}
                    style={{ backgroundColor: bgColor }}
                  >
                    <CategoryIcon size={18} stroke={1.8} color={iconColor} />
                  </div>
                  <div>
                    <p className={styles.description}>
                      {transaction.description}
                    </p>
                    <p className={styles.date}>
                      {transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1)} · {formatDate(transaction.date)}
                    </p>
                  </div>
                </div>

                <div className={styles.itemRight}>
                  <span className={`${styles.amount} ${styles[transaction.type]}`}>
                    {transaction.type === 'income' ? '+' : '-'}€{transaction.amount.toFixed(2)}
                  </span>
                  {!compact && (
                    <button
                      className={styles.deleteBtn}
                      onClick={() => dispatch(deleteTransaction(transaction.id))}
                      aria-label="Delete transaction"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default TransactionList;