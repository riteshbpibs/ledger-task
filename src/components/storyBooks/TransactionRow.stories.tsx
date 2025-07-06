import TransactionRow from "../TransactionRow";
// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from "@storybook/react";
import type { Transaction } from "@/api/model/transaction";

const meta: Meta<typeof TransactionRow> = {
  component: TransactionRow,
  title: "Components/TransactionRow",
};

export default meta;
type Story = StoryObj<typeof TransactionRow>;

const sample: Transaction = {
  id: "1",
  date: "2025-07-05",
  description: "Lunch",
  debitAccount: "Food",
  creditAccount: "Cash",
  amount: 25,
};

export const Default: Story = {
  args: {
    tx: sample,
  },
};
