import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  IconTrophy,
  IconArrowUpRight,
  IconReceipt,
  IconCalendar,
} from '@tabler/icons-react';
import type { RootState } from '../app/store';
import {
  CATEGORY_ICONS,
  CATEGORY_COLORS,
  CATEGORY_ICON_COLORS,
} from '../features/transactions/types';
import type { Category } from '../features/transactions/types';
import styles from './MonthlySummary.module.css';

function MonthlySummary() {
  const transactions = useSelector((state: RootState) => state.transactions.items);

  const currentMonthKey = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  }, []);

  const monthTransactions = useMemo(() => {
    return transactions.filter(t => {
      const d = new Date(t.date);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      return key === currentMonthKey;
    });
  }, [transactions, currentMonthKey]);

  const stats = useMemo(() => {
    const expenses = monthTransactions.filter(t => t.type === 'expense');

    const categoryTotals: Record<string, number> = {};
    expenses.forEach(t => {
      if (!categoryTotals[t.category]) categoryTotals[t.category] = 0;
      categoryTotals[t.category] += t.amount;
    });

    const topCategory = Object.entries(categoryTotals).sort(([, a], [, b]) => b - a)[0];
    const biggest = [...expenses].sort((a, b) => b.amount - a.amount)[0];

    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const dayOfMonth = today.getDate();
    const monthProgress = Math.round((dayOfMonth / daysInMonth) * 100);

    return {
      topCategory: topCategory ? { name: topCategory[0], amount: topCategory[1] } : null,
      biggest: biggest || null,
      count: monthTransactions.length,
      dayOfMonth,
      daysInMonth,
      monthProgress,
    };
  }, [monthTransactions]);

  const monthName = new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

  const TopCategoryIcon = stats.topCategory
    ? CATEGORY_ICONS[stats.topCategory.name as Category]
    : null;

  const BiggestIcon = stats.biggest
    ? CATEGORY_ICONS[stats.biggest.category as Category]
    : null;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}> Current Monthly summary</h2>

      <div className={styles.statList}>

        <div className={styles.statItem}>
          <div className={styles.iconWrap} style={{ background: '#fef9c3' }}>
            <IconTrophy size={18} color="#b45309" />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Top category</p>
            <p className={styles.statVal}>
              {stats.topCategory && TopCategoryIcon ? (
                <span className={styles.catRow}>
                  <span
                    className={styles.catIcon}
                    style={{
                      background: CATEGORY_COLORS[stats.topCategory.name as Category],
                    }}
                  >
                    <TopCategoryIcon
                      size={13}
                      stroke={1.8}
                      color={CATEGORY_ICON_COLORS[stats.topCategory.name as Category]}
                    />
                  </span>
                  {stats.topCategory.name.charAt(0).toUpperCase() + stats.topCategory.name.slice(1)}
                </span>
              ) : '—'}
            </p>
          </div>
          {stats.topCategory && (
            <span className={styles.amountRed}>
              €{stats.topCategory.amount.toFixed(0)}
            </span>
          )}
        </div>

        <div className={styles.statItem}>
          <div className={styles.iconWrap} style={{ background: '#fef2f2' }}>
            <IconArrowUpRight size={18} color="#dc2626" />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Biggest expense</p>
            <p className={styles.statVal}>
              {stats.biggest && BiggestIcon ? (
                <span className={styles.catRow}>
                  <span
                    className={styles.catIcon}
                    style={{
                      background: CATEGORY_COLORS[stats.biggest.category as Category],
                    }}
                  >
                    <BiggestIcon
                      size={13}
                      stroke={1.8}
                      color={CATEGORY_ICON_COLORS[stats.biggest.category as Category]}
                    />
                  </span>
                  {stats.biggest.description}
                </span>
              ) : '—'}
            </p>
          </div>
          {stats.biggest && (
            <span className={styles.amountRed}>
              €{stats.biggest.amount.toFixed(0)}
            </span>
          )}
        </div>

        <div className={styles.statItem}>
          <div className={styles.iconWrap} style={{ background: '#f0fdf4' }}>
            <IconReceipt size={18} color="#16a34a" />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Transactions</p>
            <p className={styles.statVal}>{stats.count} this month</p>
          </div>
        </div>

      </div>

      <div className={styles.progressSection}>
        <div className={styles.progressHeader}>
          <span className={styles.progressLabel}>
            <IconCalendar size={13} style={{ marginRight: 4, verticalAlign: 'middle' }} />
            {monthName}
          </span>
          <span className={styles.progressLabel}>
            {stats.dayOfMonth} / {stats.daysInMonth} days
          </span>
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${stats.monthProgress}%` }}
          />
        </div>
      </div>

    </div>
  );
}

export default MonthlySummary;