#  Personal Expense Tracker - React + TypeScript + Vite
A modern personal finance tracker built with React, TypeScript, and Redux. Track your income and expenses, visualise spending by category, and monitor your monthly financial health.

# ✨ Features
 
- **Dashboard** — Dashboard with summary cards, spending chart, and monthly insights
- **Transactions** — Add, filter, and delete income and expense transactions
- **Analytics** — spending by category with month-by-month navigation
- **Donut chart** — visualise expenses per category with progress bars
- **Monthly summary** — top spending category, biggest expense, transaction count, and month progress
- **Filters** — filter transactions by type and category
- **Dark / Light mode** — toggle theme with preference saved
- **Persistent storage** — transactions saved to localStorage and restored on page reload
- **Category icons** — Tabler Icons for each spending category
---
## 🛠 Tech Stack
 
| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| TypeScript | Type safety |
| Redux Toolkit | Global state management |
| CSS Modules | Scoped component styling |
| Chart.js | Donut chart visualisation |
| Tabler Icons | Category and UI icons |
| Jest | Unit and component testing |
| React Testing Library | DOM-based component tests |
| Vite | Build tool and dev server |
 
---
## 🧪 Testing
 
The project includes 5 test suites covering all layers of the app:
 
| Test file | What it covers |
|---|---|
| `transactionsSlice.test.ts` | Redux slice — add, delete, initial state |
| `AddTransactionForm.test.tsx` | Form validation, dispatch, reset |
| `Summary.test.tsx` | Derived state calculations |
| `TransactionList.test.tsx` | Rendering, filtering, compact mode, delete |
| `MonthlySummary.test.tsx` | Monthly stats, top category, biggest expense |
 
Run all tests:
 
```bash
npx jest
```
 
--











This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
