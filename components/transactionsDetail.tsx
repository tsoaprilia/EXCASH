// components/TransactionDetail.tsx
'use client'; // This directive ensures this is a client component

const TransactionDetail = ({ transaction }: { transaction: any }) => {
  if (!transaction) {
    return <div>Loading...</div>;
  }

  // Use the same formatting logic
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date(transaction.createdAt));

  return (
    <div className="bg-white shadow-md rounded-lg p-8">
      <div className="mb-6">
        <div className="mb-2">
          <p className="text-Black-700"><strong>Transaction ID:</strong> {transaction.id}</p>
        </div>
        <hr className="border-Black-300 my-4" />
        <div className="mb-2">
          <p className="text-Black-700"><strong>Date:</strong> {formattedDate}</p>
        </div>
        <div className="mb-2">
          <p className="text-Black-700"><strong>Total:</strong> ${transaction.total.toFixed(2)}</p>
        </div>
        <div className="mb-2">
          <p className="text-Black-700"><strong>Nominal Payment:</strong> ${transaction.nominalPayment.toFixed(2)}</p>
        </div>
        <div className="mb-2">
          <p className="text-Black-700"><strong>Change:</strong> ${transaction.change.toFixed(2)}</p>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold mt-6 mb-4">Products</h2>
        <ul className="space-y-4">
          {transaction.transactionDetails.map((detail: any, index: number) => (
            <li key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center">
                <p className="text-gray-700">{detail.product.nameProduct}</p>
                <p className="text-gray-700">${detail.price.toFixed(2)} x {detail.quantity}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TransactionDetail;
