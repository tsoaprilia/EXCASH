// /pages/history.tsx
import { getTransactionRecords } from '@/lib/data';

const TransactionHistory = async () => {
  const transactions = await getTransactionRecords();
  
  return (
    <div className="flex-1 pt-20 ml-10 pl-60 mr-6">
    <h1 className="mb-10 font-bold text-2xl">TRANSACTION</h1>
    <table className="w-full table-auto border-collapse">
    <thead className="text-sm text-gray-700 uppercase border-b border-gray-300">
          <tr>
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Total</th>
            <th className="py-3 px-6 text-left">Payment</th>
            <th className="py-3 px-6 text-left">Change</th>
            <th className="py-3 px-6 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={transaction.id} className="bg-white border-b">
              <td className="py-3 px-6">{index + 1}</td>
              <td className="py-3 px-6">{transaction.total}</td>
              <td className="py-3 px-6">{transaction.nominalPayment}</td>
              <td className="py-3 px-6">{transaction.change}</td>
              <td className="py-3 px-6">{new Date(transaction.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
