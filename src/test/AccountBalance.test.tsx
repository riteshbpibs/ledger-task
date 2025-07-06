import test from "node:test";
import { expect } from "storybook/internal/test";
import { render, screen } from "@testing-library/react";

import AccountBalances from "@/components/AccountBalances";
import type { Transaction } from "@/api/model/transaction";

const transactions: Transaction[] = [
  {
    id: "1",
    date: "2025-07-01",
    description: "Lunch",
    debitAccount: "Food",
    creditAccount: "Cash",
    amount: 20,
  },
  {
    id: "2",
    date: "2025-07-02",
    description: "Salary",
    debitAccount: "Bank",
    creditAccount: "Income",
    amount: 1000,
  },
];

test("calculates and displays account balances", () => {
  render(<AccountBalances transactions={transactions} />);
  expect(screen.getByText("Food: $20.00")).toBeInTheDocument();
  expect(screen.getByText("Cash: -$20.00")).toBeInTheDocument();
  expect(screen.getByText("Bank: $1000.00")).toBeInTheDocument();
  expect(screen.getByText("Income: -$1000.00")).toBeInTheDocument();
});
