import test from "node:test";
import { expect } from "storybook/internal/test";

import { render, screen } from "@testing-library/react";
import TransactionRow from "@/components/TransactionRow";
import type { Transaction } from "@/api/model/transaction";

const mockTx: Transaction = {
  id: "1",
  date: "2025-07-05",
  description: "Groceries",
  debitAccount: "Food",
  creditAccount: "Bank",
  amount: 42.5,
};

test("renders transaction row with all fields", () => {
  render(
    <table>
      <tbody>
        <TransactionRow tx={mockTx} />
      </tbody>
    </table>
  );
  expect(screen.getByText("Groceries")).toBeInTheDocument();
  expect(screen.getByText("Food")).toBeInTheDocument();
  expect(screen.getByText("Bank")).toBeInTheDocument();
  expect(screen.getByText("$42.50")).toBeInTheDocument();
});
