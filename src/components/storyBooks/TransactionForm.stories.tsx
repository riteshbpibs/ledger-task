import TransactionForm from "../TransactionForm";
// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TransactionForm> = {
  component: TransactionForm,
  title: "Components/TransactionForm",
};

export default meta;
type Story = StoryObj<typeof TransactionForm>;

export const Default: Story = {};
