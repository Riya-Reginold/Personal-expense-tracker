import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  IconTrendingUp,
  IconTrendingDown,
  IconWallet,
} from '@tabler/icons-react';
import type { RootState } from '../app/store';
import styles from './Summary.module.css';

function Summary() {
  const transactions = useSelector((state: RootState) => state.transactions.items);

  const { income, expenses, balance } = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return { income, expenses, balance: income - expenses };
  }, [transactions]);

  return (
    <div className={styles.container}>
      <div className={styles.grid}>

        <div className={styles.card}>
          <div className={styles.cardTop}>
            <p className={styles.label}>Income</p>
            <div className={styles.iconWrap} style={{ background: '#f0fdf4' }}>
              <IconTrendingUp size={16} color="#16a34a" />
            </div>
          </div>
          <p className={`${styles.amount} ${styles.income}`}>
            +€{income.toFixed(2)}
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTop}>
            <p className={styles.label}>Expenses</p>
            <div className={styles.iconWrap} style={{ background: '#fef2f2' }}>
              <IconTrendingDown size={16} color="#dc2626" />
            </div>
          </div>
          <p className={`${styles.amount} ${styles.expense}`}>
            -€{expenses.toFixed(2)}
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTop}>
            <p className={styles.label}>Balance</p>
            <div className={styles.iconWrap} style={{ background: '#eff6ff' }}>
              <IconWallet size={16} color="#185FA5" />
            </div>
          </div>
          <p className={`${styles.amount} ${styles.balance}`}>
            €{balance.toFixed(2)}
          </p>
        </div>

      </div>
    </div>
  );
}

export default Summary;