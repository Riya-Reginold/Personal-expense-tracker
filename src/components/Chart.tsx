import { useMemo, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Chart, registerables } from 'chart.js';
import type { RootState } from '../app/store';
import styles from './Chart.module.css';

Chart.register(...registerables);

const COLORS = [
  '#185FA5', '#D85A30', '#16a34a', '#9333ea',
  '#e11d48', '#0891b2', '#d97706',
];


function ChartComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);
  const [monthOffset, setMonthOffset] = useState(0);
  const transactions = useSelector((state: RootState) => state.transactions.items);

  const currentMonthKey = useMemo(() => {
    const d = new Date();
    d.setDate(1);
    d.setMonth(d.getMonth() + monthOffset);
    return {
      key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
      label: d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }),
    };
  }, [monthOffset]);

  const chartData = useMemo(() => {
    const categoryMap: Record<string, number> = {};

    transactions
      .filter(t => {
        const d = new Date(t.date);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        return t.type === 'expense' && key === currentMonthKey.key;
      })
      .forEach(t => {
        if (!categoryMap[t.category]) categoryMap[t.category] = 0;
        categoryMap[t.category] += t.amount;
      });

    return Object.entries(categoryMap).map(([category, amount]) => ({
      category,
      amount: parseFloat(amount.toFixed(2)),
    }));
  }, [transactions, currentMonthKey]);

  const total = useMemo(
    () => chartData.reduce((sum, d) => sum + d.amount, 0),
    [chartData]
  );

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartRef.current) chartRef.current.destroy();

    if (chartData.length === 0) return;

    chartRef.current = new Chart(canvasRef.current, {
      type: 'doughnut',
      data: {
        labels: chartData.map(d => d.category),
        datasets: [
          {
            data: chartData.map(d => d.amount),
            backgroundColor: COLORS.slice(0, chartData.length),
            borderWidth: 0,
            hoverOffset: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '68%',
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => ` €${Number(ctx.raw).toFixed(2)}`,
            },
          },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, [chartData]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Spending by category</h2>
        <div className={styles.monthNav}>
          <button
            className={styles.navBtn}
            onClick={() => setMonthOffset(o => o - 1)}
            aria-label="Previous month"
          >
            ‹
          </button>
          <span className={styles.monthLabel}>{currentMonthKey.label}</span>
          <button
            className={styles.navBtn}
            onClick={() => setMonthOffset(o => o + 1)}
            disabled={monthOffset >= 0}
            aria-label="Next month"
          >
            ›
          </button>
        </div>
      </div>

      {chartData.length === 0 ? (
        <p className={styles.empty}>No expenses recorded for this month.</p>
      ) : (
        <div className={styles.body}>
          <div style={{ position: 'relative', width: '140px', height: '140px' }}>
            <canvas
              ref={canvasRef}
              role="img"
              aria-label={`Donut chart for ${currentMonthKey.label}`}
            />
            <div className={styles.center}>
              <p className={styles.centerAmount}>€{total.toFixed(0)}</p>
              <p className={styles.centerLabel}>total spent</p>
            </div>
          </div>

          <div style={{ width: '100%', marginTop: '1rem' }}>
            {chartData.map((d, i) => (
              <div key={d.category}>
                <div className={styles.legendRow}>
                  <span className={styles.legendLeft}>
                    <span
                      className={styles.dot}
                      style={{ background: COLORS[i % COLORS.length] }}
                    />
                    {d.category}
                  </span>
                  <span className={styles.legendAmount}>
                    €{d.amount.toFixed(0)}
                  </span>
                </div>
                <div className={styles.bar}>
                  <div
                    className={styles.barFill}
                    style={{
                      width: `${(d.amount / total) * 100}%`,
                      background: COLORS[i % COLORS.length],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ChartComponent;