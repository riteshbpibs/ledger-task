import type { Transaction } from "@/api/model/transaction";

export default function TransactionRow({ tx }: { tx: Transaction }) {
  if (!tx) return null;

  return (
    <tr className="border-b text-sm">
      <td className="px-2 py-1">{tx.date}</td>
      <td className="px-2 py-1">{tx.description}</td>
      <td className="px-2 py-1">{tx.debitAccount}</td>
      <td className="px-2 py-1">{tx.creditAccount}</td>
      <td className="px-2 py-1">${tx.amount?.toFixed(2)}</td>
    </tr>
  );
}
