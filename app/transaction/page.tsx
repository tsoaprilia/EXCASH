'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { saveTransaction } from '@/lib/transactions'; // Import the server-side function

interface Product {
  id: string;
  nameProduct: string;
  quantity: number;
  price: number;
  total: number;
}

const TransactionDetail = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [payment, setPayment] = useState<number>(0);
  const [change, setChange] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('selectedProducts') || '[]');
    setProducts(storedProducts);
    const totalAmount = storedProducts.reduce((sum: number, product: Product) => sum + product.total, 0);
    setTotal(totalAmount);
  }, []);

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const paymentValue = Number(e.target.value);
    setPayment(paymentValue);
    setChange(paymentValue - total);
  };

  const handleCompleteTransaction = async () => {
    console.log('handleCompleteTransaction triggered');
    const transactionDetails = products.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      price: product.price,
    }));

    console.log('Submitting transaction with details:', { transactionDetails, nominalPayment: payment });

    try {
      // Call the server-side function directly
      const transaction = await saveTransaction(transactionDetails, payment);

      console.log('Transaction successful');
      localStorage.removeItem('selectedProducts');
      router.push('/history');
    } catch (error) {
      console.error('Transaction error:', error);
    }
  };

  return (
    <div className="flex-1 pt-20 ml-10 pl-60 mr-10">
      <h1 className="mb-10 font-bold text-2xl">TRANSACTION DETAIL</h1>
      <table className="w-full table-auto border-collapse">
    <thead className="text-sm text-gray-700 uppercase border-b border-gray-300">
          <tr>
          <th className="py-3 px-6 text-left">Product</th>
      <th className="py-3 px-6 text-left">Quantity</th>
      <th className="py-3 px-6 text-left">Price</th>
      <th className="py-3 px-6 text-left">Total</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="bg-white border-b">
              <td className="py-3 px-6">{product.nameProduct}</td>
              <td className="py-3 px-6">{product.quantity}</td>
              <td className="py-3 px-6">{product.price}</td>
              <td className="py-3 px-6">{product.price * product.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-12 mr-6">
        <div className="text-xl">Total: {total}</div>
        <div>
          <input type="number" value={payment} onChange={handlePaymentChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 p-2.5" placeholder="Payment" />
        </div>
      </div>
      <div className="flex justify-between mt-5">
        <div className="text-xl">Change: {change}</div>
      </div>
      <div className="mt-5">
        <button className="bg-black text-white px-4 py-2 rounded-sm w-full" onClick={handleCompleteTransaction}>
          Selesai
        </button>
      </div>
    </div>
  );
};

export default TransactionDetail;
