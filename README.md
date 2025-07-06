# 🧾 Double Entry Ledger – Frontend Assignment

A modern, type-safe ledger app built with **React**, **TypeScript**, **TailwindCSS**, and **ShadCN UI**. It showcases API integration using **Orval** from an OpenAPI specification, with features like optimistic updates, account balances, form validation, and a clean component architecture.

---

## 📦 Tech Stack

| Layer            | Tooling                          |
| ---------------- | -------------------------------- |
| UI               | React, TailwindCSS, ShadCN UI    |
| State/Network    | SWR, Axios                       |
| Forms/Validation | react-hook-form + Zod            |
| API Client       | Orval (OpenAPI → hooks & models) |
| Tooling          | Vite, Vitest, Storybook, Sonner  |
| Mock API         | json-server                      |

---

## 🗂️ Folder Structure

```
src/
├── api/                       # Orval-generated hooks + types
│   ├── ledger-api.ts         # useGetTransactions, usePostTransactions
│   └── model/                # Transaction & NewTransaction types
├── components/               # UI components
│   ├── TransactionRow.tsx
│   ├── AccountBalances.tsx
│   ├── TransactionForm.tsx
│   └── __stories__/          # Storybook stories
├── App.tsx                   # Main page layout
├── main.tsx                  # Root renderer with ThemeProvider
├── index.css                 # Tailwind base styles
└── lib/utils.ts              # Utility functions (e.g., `cn`)
```

---

## 🛠️ Architecture & Code Flow

### 1. 🔌 API Integration (via Orval)

- The `ledger-api.yaml` OpenAPI file defines the backend contract.
- Orval uses this file to generate:
  - `useGetTransactions()` → fetch all transactions
  - `usePostTransactions()` → create a transaction
  - TypeScript interfaces for `Transaction` and `NewTransaction`

✅ Result: You never write manual API calls or types — it's all safe and automatic.

---

### 2. 📄 Component Overview

#### ✅ `TransactionRow.tsx`

- Renders one transaction row (date, description, debit, credit, amount).

#### ✅ `AccountBalances.tsx`

- Takes a list of transactions and calculates balances per account.
- Balances update dynamically as you add new entries.

#### ✅ `TransactionForm.tsx`

- Uses `react-hook-form` with Zod validation.
- Includes date picker (ShadCN Calendar + Popover).
- On submit:
  - Optimistically updates `/transactions` cache
  - Triggers mutation
  - Displays toast via Sonner

#### ✅ `App.tsx`

- Main entry point.
- Renders:
  - Header
  - Transactions Table
  - Account Balances
  - Transaction Form

---

## 🧪 Validation & Optimistic UX

- Uses `Zod` to validate form fields:
  - Required fields
  - Positive amount
  - Debit ≠ Credit account
- Uses `mutate('/transactions', newData, false)` before API call
- Adds temporary `id` for stable rendering
- Resets form on success

---

## 💡 Light/Dark Mode

- Implemented via `next-themes` + Tailwind `dark:` class strategy
- Toggle button switches themes and persists in localStorage
- ShadCN UI auto-adapts to theme

---

## 🧪 Testing

- Testing setup via **Vitest** and **Testing Library**
- Test files for:
  - `TransactionRow`
  - `AccountBalances`
- Run tests:

```bash
npx vitest
```

---

## 📚 Storybook

- Visual testing for each component
- Files in `src/components/__stories__/`
- Run Storybook:

```bash
npm run storybook
```

---

## 🔄 Mock API Setup

We use `json-server` to simulate the API defined in `ledger-api.yaml`.

### ➕ Add `db.json`

```json
{
  "transactions": []
}
```

### 🚀 Start the mock server:

```bash
npx json-server --watch db.json --port 3001
```

### 🔁 Proxy API calls in Vite:

```ts
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      "/transactions": "http://localhost:3001",
    },
  },
});
```

---

## 🧾 Product Flow

1. User lands on the page
2. `useGetTransactions` fetches existing transactions
3. UI renders table + account balances
4. User fills the form:
   - Picks date
   - Enters description, debit, credit, amount
5. On submit:
   - Optimistically adds to SWR cache
   - Triggers API call to POST `/transactions`
   - Shows success or failure toast
6. Account balances and table update immediately

---

## 🚀 Deployment

This app is deployed via **Vercel**.

Live Demo: [https://your-vercel-url.vercel.app](https://your-vercel-url.vercel.app)

---

## 🤝 Contribution & Credits

This project was built as part of a **Senior Frontend Engineer Assignment**, demonstrating:

- API-first dev using OpenAPI
- Real-world React architecture
- Clean component design
- Form validation + optimistic UX
- Mocked backend + testable UI

---

## ✅ Final Checklist

- [x] Transaction table
- [x] Account balance calculations
- [x] Validated transaction form
- [x] Optimistic updates with SWR
- [x] OpenAPI-driven client via Orval
- [x] Light/Dark mode with ShadCN
- [x] Component tests + Storybook
- [x] Local mock API
- [x] Vercel deployment

---

Feel free to clone this repo, study the architecture, and build on it ✨

> Built with care and clarity to be readable for both juniors and seniors 🧠
