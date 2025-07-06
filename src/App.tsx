import { useGetTransactions } from "./api/ledger-api";
import TransactionRow from "./components/TransactionRow";
import TransactionForm from "./components/TransactionForm";
import AccountBalances from "./components/AccountBalances";

export default function App() {
  const { data, error, isLoading } = useGetTransactions();

  const transactions = data?.data ?? [];

  if (isLoading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-4">Error loading data</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Double Entry Ledger</h1>

      <table className="w-full text-left mb-6 border rounded shadow">
        <thead className="bg-gray-100">
          <tr className="text-sm font-semibold">
            <th className="px-2 py-2">Date</th>
            <th className="px-2 py-2">Description</th>
            <th className="px-2 py-2">Debit</th>
            <th className="px-2 py-2">Credit</th>
            <th className="px-2 py-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <TransactionRow key={tx.id} tx={tx} />
          ))}
        </tbody>
      </table>

      <AccountBalances transactions={transactions} />

      <h2 className="text-lg font-semibold mt-8 mb-2">Add New Transaction</h2>
      
      <TransactionForm />
    </div>
  );
}
