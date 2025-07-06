import AccountBalances from "../AccountBalances";
// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from "@storybook/react";
import type { Transaction } from "@/api/model/transaction";

const meta: Meta<typeof AccountBalances> = {
  component: AccountBalances,
  title: "Components/AccountBalances",
};

export default meta;
type Story = StoryObj<typeof AccountBalances>;

const transactions: Transaction[] = [
  {
    id: "1",
    date: "2025-07-01",
    description: "Coffee",
    debitAccount: "Food",
    creditAccount: "Cash",
    amount: 5,
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

export const Default: Story = {
  args: {
    transactions,
  },
};
