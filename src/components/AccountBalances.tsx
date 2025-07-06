import type { Transaction } from "@/api/model/transaction";

interface Props {
  transactions: Transaction[];
}

export default function AccountBalances({ transactions }: Props) {
  const balances: Record<string, number> = {};

  transactions.forEach(tx => {
    const debit = tx.debitAccount;
    const credit = tx.creditAccount;
    const amount = tx.amount ?? 0;

    if (debit) {
      balances[debit] = (balances[debit] || 0) + amount;
    }

    if (credit) {
      balances[credit] = (balances[credit] || 0) - amount;
    }
  });

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">Account Balances</h3>
      <ul className="list-disc ml-4">
        {Object.entries(balances).map(([account, balance]) => (
          <li key={account}>
            {account}: ${balance.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}
