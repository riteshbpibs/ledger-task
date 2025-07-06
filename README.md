# Double Entry Ledger – Frontend Assignment

## Summary

This is a React + TypeScript web application that functions as a simple double-entry ledger. Users can record transactions, view a live transaction table, and track account balances in real-time. The application uses a mock backend and a fully type-safe, auto-generated API client from an OpenAPI specification. It supports light/dark themes, optimistic UI updates, and is deployed on Vercel with Storybook and component testing.

## Deployment Link

[Live Demo on Vercel](https://ledger-task.vercel.app/)

---

## Tech Stack

- Framework: React, Vite
- Styling: Tailwind CSS, ShadCN UI
- Data Fetching: SWR
- Form Validation: React Hook Form + Zod
- API Layer: Orval (OpenAPI to hooks)
- Mock API: json-server (locally) or Vercel Edge Function (production)
- Tooling: TypeScript, Vitest, Storybook, Sonner
- Deployment: Vercel

---

## Folder Structure

```
ledger-app/
├── api/                       # Vercel Edge Function backend (api/transactions.js)
├── src/
│   ├── api/                  # Orval-generated hooks + types
│   │   ├── ledger-api.ts
│   │   └── model/            # Transaction & NewTransaction types
│   ├── components/           # UI components
│   │   ├── TransactionRow.tsx
│   │   ├── AccountBalances.tsx
│   │   ├── TransactionForm.tsx
│   │   └── __stories__/      # Storybook stories
│   ├── App.tsx               # Main app layout
│   ├── main.tsx              # App entry point
│   ├── index.css             # Tailwind base styles
│   └── lib/utils.ts          # Utility helpers
├── storybook-static/         # Storybook build (optional)
├── ledger-api.yaml           # OpenAPI spec
├── vercel.json               # Deployment config with rewrites
├── tsconfig.json             # TypeScript config
├── .prettierrc               # Code formatting rules
└── db.json                   # Mock API data file for local testing
```

---

## Product Flow

1. App loads and fetches transactions via `useGetTransactions()`.
2. Displays transactions in a table.
3. Account balances are computed from all transactions.
4. User fills the form (description, debit, credit, amount, date).
5. On submit:
   - Zod validates input
   - Optimistic update via `mutate()`
   - POST request via `usePostTransactions()`
   - Toast on success/failure
   - Form resets and balances update immediately

---

## Architecture

- **OpenAPI Driven**: `ledger-api.yaml` defines the API contract. Orval uses this to generate SWR hooks and typed models.
- **Component Separation**:
  - `TransactionRow` – one row in the transaction table
  - `AccountBalances` – aggregates balances by account
  - `TransactionForm` – controlled form with validation and date picker
- **Theming**: Handled by `next-themes`, supporting dark/light mode via Tailwind’s `dark:` classes
- **API**: Mocked using either Vercel Edge Functions (deployed) or `json-server` (local)
- **Optimistic UI**: SWR `mutate()` used for fast feedback

---

## Design Decisions

- **Orval** ensures API type safety and eliminates manual client code
- **React Hook Form + Zod** used for declarative, type-safe validation
- **SWR** chosen for its simplicity and built-in support for mutation and revalidation
- **ShadCN + Tailwind** chosen for scalable, themeable UI
- **Edge Functions** let us run backend logic on Vercel without a real DB
- Account balances are recomputed on every render (simple but scalable for small apps)

---

## Setup Instructions

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/your-username/ledger-app.git
cd ledger-app
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Start the app locally
```bash
npm run dev
```

### 4. Run the mock API locally
```bash
npm run mock
```
This uses `json-server` to serve `db.json` at `/transactions`.

### 5. Build Storybook
```bash
npm run storybook
# or static build:
npm run storybook:build
```

### 6. Run tests
```bash
npm run test
```

---

## NPM Scripts

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "test": "vitest",
  "storybook": "storybook dev -p 6006",
  "storybook:build": "storybook build -o storybook-static",
  "mock": "json-server --watch db.json --port 3001"
}
```

---

## CI/CD (Vercel)

- Automatically deploys on push to `main`
- `vercel.json` rewrites:
  - `/transactions` → `/api/transactions`
  - `/storybook` → `/storybook-static/index.html`

---

## Assumptions & Trade-offs

- Backend is in-memory and non-persistent
- Balance is recomputed each render — performant for small datasets
- Form assumes fast and successful POST (optimistic update)
- Mock server or edge function mimics full-stack integration
- No authentication or user state handling

---

## Others

- Includes `.prettierrc` and Prettier formatting script
- Fully documented and tested with real-world component workflows
- Built with readability, accessibility, and maintainability in mind
