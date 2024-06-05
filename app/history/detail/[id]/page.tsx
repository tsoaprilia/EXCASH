// app/history/detail/[id]/page.tsx
import { getTransactionById } from '@/lib/data';
import { notFound } from 'next/navigation';
import TransactionDetail from '@/components/transactionsDetail';

const TransactionDetailPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const transaction = await getTransactionById(id);

  if (!transaction) {
    notFound(); // Return 404 if transaction not found
  }

  return (
    <div className="flex-1 pt-20 ml-10 pl-60 mr-10">
    <h1 className="mb-10 font-bold text-2xl">Detail Transaction</h1>
    <div className="p-8 border border-gray-300 rounded-md">
      <TransactionDetail transaction={transaction} />
    </div>
    </div>
  );
};

export default TransactionDetailPage;
