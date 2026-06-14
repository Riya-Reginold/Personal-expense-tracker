import { useState } from 'react';
import Summary from './components/Summary';
import ChartComponent from './components/Chart';
import AddTransactionForm from './components/AddTransactionForm';
import TransactionList from './components/TransactionList';
import MonthlySummary from './components/MonthlySummary';
import { useTheme } from './hooks/useTheme';
import styles from './App.module.css';
import {
  IconLayoutDashboard,
  IconList,
  IconChartPie,
  IconSun,
  IconMoon,
  IconWallet,
} from '@tabler/icons-react';

type Page = 'dashboard' | 'transactions' | 'analytics';

function App() {
  const { theme, toggleTheme } = useTheme();
  const [page, setPage] = useState<Page>('dashboard');

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <p className={styles.logo}> 
          <IconWallet size={30} stroke={1.8} />
          Personal Expense Tracker</p>
        <nav className={styles.nav}>
          <button
            className={`${styles.navItem} ${page === 'dashboard' ? styles.navActive : ''}`}
            onClick={() => setPage('dashboard')}>
            <IconLayoutDashboard size={16} /> Dashboard
          </button>
          <button
            className={`${styles.navItem} ${page === 'transactions' ? styles.navActive : ''}`}
            onClick={() => setPage('transactions')}>
           <IconList size={16} /> Transactions
          </button>
          <button
             className={`${styles.navItem} ${page === 'analytics' ? styles.navActive : ''}`}
             onClick={() => setPage('analytics')}>
            <IconChartPie size={16} /> Analytics
          </button>


          <button className={styles.themeBtn} onClick={toggleTheme}>
             {theme === 'light'
             ? <><IconMoon size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} /> Dark mode</>
             : <><IconSun size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} /> Light mode</>
              }
          </button>
        </nav>
        
      </aside>

      <main className={styles.main}>
        <div className={styles.topBar}>
          <p className={styles.pageTitle}>
            {page === 'dashboard' && 'Dashboard'}
            {page === 'transactions' && 'Transactions'}
            {page === 'analytics' && 'Analytics'}
          </p>
        </div>

        {page === 'dashboard' && (
          <>
            <Summary />
            <div className={styles.contentGrid}>
              <TransactionList compact />
              <ChartComponent />
              <MonthlySummary />
            </div>
          </>
        )}

        {page === 'transactions' && (
          <>
            <AddTransactionForm />
            <TransactionList />
          </>
        )}

        {page === 'analytics' && (
          <ChartComponent />
        )}
      </main>
    </div>
  );
}

export default App;